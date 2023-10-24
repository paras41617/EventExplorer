from django.http import HttpResponse
import json
import ipinfo
from geolib import geohash
import dotenv
import os

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests

dotenv.load_dotenv()
GeoCodingApiKey=os.getenv('GEOCODINGAPIKEY')
TicketMasterApiKey=os.getenv('TICKETMASTERAPIKEY')

@csrf_exempt
def submit_data(request):
    if request.method == 'POST':
        input_data = json.loads(request.body.decode('utf-8'))
            
        input_values = {
            'keyword': input_data.get('keyword', ''),
            'distance': input_data.get('distance', 0),
            'category': input_data.get('category', 'default'),
            'location': input_data.get('location', ''),
            'detect': input_data.get('detect', False)
        }

        if input_values['detect']:
            try:
                access_token = '1ec5d960c60b3c'
                handler = ipinfo.getHandler(access_token)
                details = handler.getDetails()  
                input_values['location'] = details.loc
            except Exception as e:
                return JsonResponse({'message': 'Error fetching geolocation', 'error': str(e)})
        else:
            url_ = f'http://api.positionstack.com/v1/forward?access_key={GeoCodingApiKey}&query={input_values["location"]}'
            response = requests.get(url=url_)
            if response.status_code == 200:
                data = response.json()
                input_values["location"] = str(data['data'][0]['latitude'])+','+str(data['data'][0]['longitude'])

        location_list = input_values['location'].split(',')
        geohash_ = geohash.encode(location_list[0], location_list[1],7)
        response = ''
        if(input_values['category'] == 'default' or input_values['category'] == 'Default'):
            response = requests.get(f'https://app.ticketmaster.com/discovery/v2/events.json?apikey={TicketMasterApiKey}&keyword={input_values["keyword"]}&radius={input_values["distance"]}&unit=miles&geoPoint={geohash_}')
        else:
            response = requests.get(f'https://app.ticketmaster.com/discovery/v2/events.json?apikey={TicketMasterApiKey}&keyword={input_values["keyword"]}&radius={input_values["distance"]}&unit=miles&geoPoint={geohash_}&category={input_values["category"]}') 
        if response.status_code == 200:
            data = response.json()
            try:
                result = data["_embedded"]["events"][0:20]
                return JsonResponse({'message': 'Data submitted successfully!', 'data': result})
            except:
                return JsonResponse({'message': 'Something Wrong Happened!', 'data': []})
    else:
        return JsonResponse({'message': 'Invalid request method'})
    
@csrf_exempt
def event_details(request):
    if request.method == 'POST':
        input_data = json.loads(request.body.decode('utf-8'))
        id = input_data.get('id', '')

        response = requests.get(f'https://app.ticketmaster.com/discovery/v2/events/{id}.json?apikey={TicketMasterApiKey}')
        if response.status_code == 200:
            event_data = response.json()
            return JsonResponse({'message': 'Data submitted successfully!', 'data': event_data})
        else:
            return JsonResponse({'message': 'Invalid request method'})

def get_suggestions(request):
    if request.method == 'GET':
        keyword = request.GET.get('keyword', '')
        if keyword:
            ticketmaster_suggestions = fetch_suggestions_from_ticketmaster(keyword)

            ans = ticketmaster_suggestions
            return JsonResponse({'suggestions': ans})

    return JsonResponse({'suggestions': []})

def fetch_suggestions_from_ticketmaster(keyword):
    response = requests.get(f'https://app.ticketmaster.com/discovery/v2/suggest?apikey={TicketMasterApiKey}&keyword=[{keyword}]')
    if response.status_code == 200:
        data = response.json()
        suggestions = [item['name'] for item in data.get('_embedded', {}).get('attractions', [])]
        return suggestions

    return []
