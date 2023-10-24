import back_icon from '../images/back_icon.png';
import twitter from '../images/twitter.png';
import facebook from '../images/facebook.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ShowMoreText from './ShowMoreText';
import FavoriteIcon from './FavouriteIcon';

const Detail = ({ event, close }) => {

    const [venue, setVenue] = useState(false);
    const [eventData, setEventData] = useState([])
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        axios
            .post('http://127.0.0.1:8000/api/event_details/', { id: event["id"] }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setEventData(response.data["data"]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    const backArrow = {
        width: '10px',
        height: '10px',
        marginRight: '5px'
    }

    const detailContainer = {
        width: "60%",
        borderRadius: '10px',
        padding: '10px 10px 25px 10px',
        marginTop: '100px',
        marginBottom: '10%',
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        backdropFilter: 'blur(100px)',
        paddingBottom: '25px'
    }

    const backContainer = {
        display: 'flex',
        marginLeft: '10px',
        alignItems: 'center'
    }

    const eventHeading = {
        color: 'white',
        textAlign: 'center',
        fontSize: '25px',
        marginTop: '20px',
        marginBottom: '30px',
        fontWeigh: 'bold'
    }

    const feature = {
        color: 'white',
        fontSize: '20px',
        paddingBottom: '20px',
    }

    const featureContainer = {
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
        paddingTop: '20px',
        backgroundColor: '#008067'
    }

    const horizontalLine = {
        border: '2px solid blue',
        width: "100%"
    }

    const eventContainer = {
        display: "flex",
        justifyContent: 'center',
        paddingTop: "20px",
    }

    const eventItem = {
        color: 'white',
        fontSize: '15px'
    }

    const statusContainer = {
        padding: '10px',
        backgroundColor: 'green',
        width: '20%',
        textAlign: 'ceter',
        marginTop: '10px',
        paddingTop: '10px'
    }

    const setStatusBackground = (status) => {
        let backgroundColor;

        switch (status) {
            case 'On sale':
                backgroundColor = 'green';
                break;
            case 'Off sale':
                backgroundColor = 'red';
                break;
            case 'Canceled':
                backgroundColor = 'black';
                break;
            case 'Postponed':
                backgroundColor = 'orange';
                break;
            case 'Rescheduled':
                backgroundColor = 'orange';
                break;
            default:
                backgroundColor = 'gray';
        }

        const statusContainerStyle = {
            ...statusContainer,
            backgroundColor: backgroundColor
        };
        return statusContainerStyle
    }

    const shareOnContainer = {
        textAlign: 'center',
        color: 'white',
        marginTop: '2%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const modalStyle = {
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const modalContentStyle = {
        backgroundColor: 'white',
        width: "40%",
        display: 'flex',
        justifyContent: 'ceter',
        height: '600px',
        // alignItems: 'center',
        padding: '0px 20px 20px 20px',
        gap: '40px',
        flexDirection: 'column',
        borderRadius: '7px'
    };

    const handleFacebookClick = (ticketmasterLink) => {
        const facebookPostURL = `https://www.facebook.com/sharer/sharer.php?u=${ticketmasterLink}`;
        window.open(facebookPostURL, '_blank');
    };

    const handleTwitterClick = (ticketmasterLink) => {
        const tweetText = `Check on Ticketmaster: ${ticketmasterLink}`;
        const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(twitterURL, '_blank');
    };

    return (
        <>
            {!showMap ? (eventData == [] || eventData === null || eventData === undefined || eventData.length == 0 ? '' : (
                <div style={detailContainer}>
                    <div style={backContainer} onClick={() => close(false)}>
                        <img src={back_icon} style={backArrow} />
                        <div style={{ color: 'white' }}>
                            Back
                        </div>
                    </div>
                    <div style={{ ...eventHeading, display: "flex", justifyContent: 'center', alignItems: 'center' }} >
                        {event["name"]} &nbsp; <FavoriteIcon event={event} id={event["id"]} />
                    </div>
                    <div style={featureContainer}>
                        <div style={{ cursor: 'pointer' }} onClick={() => setVenue(false)}>
                            <div style={feature}>
                                Events
                            </div>
                            {!venue ? (<div style={horizontalLine}></div>) : ''}
                        </div>
                        <div style={{ cursor: 'pointer' }} onClick={() => setVenue(true)}>
                            <div style={feature}>
                                Venue
                            </div>
                            {venue ? (<div style={horizontalLine}></div>) : ''}
                        </div>
                    </div>
                    {!venue ? (<div>
                        <div style={eventContainer}>
                            <div style={{ width: '40%', textAlign: 'center' }}>
                                <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                    Date
                                </div>
                                <div style={eventItem}>
                                    {eventData["dates"]["start"]["localDate"]} &nbsp; {eventData["dates"]["start"]["localTime"]}
                                </div>
                                {eventData["promoters"] && (
                                    <div>
                                        <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                            Artist/Team
                                        </div>
                                        <div style={{...eventItem, color:'#68cfff'}}>
                                            {eventData["promoters"].map((promoter, index) => (
                                                promoter["url"] ? <a style={{textDecoration:'none'}} href={promoter["url"]}>{promoter["name"]} | </a> : promoter["name"]+" | "
                                            ))}
                                            {eventData["_embedded"]["attractions"] && (
                                                eventData["_embedded"]["attractions"].map((attraction, index) => (
                                                    attraction["url"] ? <a style={{color:'inherit'}} href={attraction["url"]}>{attraction["name"]} | </a> : attraction["name"]+" | "
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                    Venue
                                </div>
                                <div style={eventItem}>
                                    {eventData["_embedded"]["venues"][0]["name"]}
                                </div>
                                {eventData["classifications"] && eventData["classifications"][0]["segment"]["name"] && eventData["classifications"][0]["genre"]["name"] && eventData["classifications"][0]["subGenre"]["name"] && (<div>
                                    <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                        Genres
                                    </div>
                                    <div style={eventItem}>
                                        {eventData["classifications"][0]["segment"]["name"]} &nbsp; | &nbsp; {eventData["classifications"][0]["genre"]["name"]} &nbsp; | &nbsp; {eventData["classifications"][0]["subGenre"]["name"]}
                                    </div>
                                </div>)}
                                {eventData["priceRanges"] && eventData["priceRanges"][0]["min"] && (<div>
                                    <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                        Price Ranges
                                    </div>
                                    <div style={eventItem}>
                                        {eventData["priceRanges"][0]["min"]} &nbsp; - &nbsp; {eventData["priceRanges"][0]["max"]} &nbsp; USD
                                    </div>
                                </div>)}
                                <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                    Ticket Status
                                </div>
                                <div style={{ ...eventItem, display: 'flex', justifyContent: 'center' }}>
                                    <div style={setStatusBackground(eventData["dates"]["status"]["code"])}>
                                        {eventData["dates"]["status"]["code"]}
                                    </div>
                                </div>
                                <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px'}}>
                                    Buy Ticket At:
                                </div>
                                <div style={eventItem}>
                                    <a href={eventData["url"]} style={{ color: '#68cfff' }}>Tickemaster</a>
                                </div>
                            </div>
                            {eventData["seatmap"] && eventData["seatmap"]["staticUrl"] && (<div style={{ width: '60%', textAlign: 'center' }}>
                                <img style={{ width: '80%' }} src={eventData["seatmap"]["staticUrl"]} />
                            </div>)}
                        </div>
                        <div style={shareOnContainer}>
                            Share on :
                            <button style={{ background: 'none', border: 'none' }} onClick={() => handleTwitterClick(eventData["url"])}>
                                <img style={{ width: '20px' }} src={twitter} />
                            </button>
                            <button style={{ background: 'none', border: 'none' }} onClick={() => handleFacebookClick(eventData["url"])}>
                                <img style={{ width: '20px' }} src={facebook} />
                            </button>
                        </div>
                    </div>) : (
                        <div>
                            <div style={eventContainer}>
                                <div style={{ width: '40%', textAlign: 'center' }}>
                                    <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                        Name
                                    </div>
                                    <div style={eventItem}>
                                        {eventData["_embedded"]["venues"][0]["name"]}
                                    </div>
                                    <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                        Address
                                    </div>
                                    <div style={eventItem}>
                                        {eventData["_embedded"]["venues"][0]["address"]["line1"]} , {eventData["_embedded"]["venues"][0]["city"]["name"]} , {eventData["_embedded"]["venues"][0]["state"]["name"]}
                                    </div>
                                    <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                        Venue
                                    </div>
                                    <div style={eventItem}>
                                        {eventData["_embedded"]["venues"][0]["name"]}
                                    </div>
                                </div>
                                <div style={{ width: '40%', textAlign: 'center' }}>
                                    {eventData["_embedded"]["venues"][0]["boxOfficeInfo"] && eventData["_embedded"]["venues"][0]["boxOfficeInfo"]["openHoursDetail"] && (<div>
                                        <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                            Open Hours
                                        </div>
                                        <div style={eventItem}>
                                            <ShowMoreText text={eventData["_embedded"]["venues"][0]["boxOfficeInfo"]["openHoursDetail"]} maxLength={100} />
                                        </div>
                                    </div>)}
                                    {eventData["_embedded"]["venues"][0]["generalInfo"] && eventData["_embedded"]["venues"][0]["generalInfo"]["generalRule"] && (<div>
                                        <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                            General Rule
                                        </div>
                                        <div style={eventItem}>
                                            <ShowMoreText text={eventData["_embedded"]["venues"][0]["generalInfo"]["generalRule"]} maxLength={100} />
                                        </div>
                                    </div>)}
                                    {eventData["_embedded"]["venues"][0]["generalInfo"] && eventData["_embedded"]["venues"][0]["generalInfo"]["childRule"] && (<div>
                                        <div style={{ ...eventItem, fontWeight: 'bold', paddingTop: '10px' }}>
                                            Child Rule
                                        </div>
                                        <div style={eventItem}>
                                            <ShowMoreText text={eventData["_embedded"]["venues"][0]["generalInfo"]["childRule"]} maxLength={100} />
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                            {showMap ? '' : (
                                <div>
                                    <div style={{ ...eventItem, display: 'flex', justifyContent: 'center', paddingTop: '10px', cursor: 'pointer' }} onClick={() => setShowMap(!showMap)}>
                                        <div style={{ ...statusContainer, width: '25%', borderRadius: '5px' }}>
                                            Show Venue on Google map
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )) : (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>
                            Event Venue
                        </p>
                        <MapContainer
                            center={[
                                eventData["_embedded"]["venues"][0]["location"]["latitude"],
                                eventData["_embedded"]["venues"][0]["location"]["longitude"]
                            ]}
                            zoom={13}
                            style={{ width: '100%', height: '400px' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <CircleMarker
                                radius={8}
                                color="red"
                                center={[
                                    eventData["_embedded"]["venues"][0]["location"]["latitude"],
                                    eventData["_embedded"]["venues"][0]["location"]["longitude"]
                                ]}
                            >
                                <Popup>
                                    A marker with coordinates (
                                    {eventData["_embedded"]["venues"][0]["location"]["latitude"]},{' '}
                                    {eventData["_embedded"]["venues"][0]["location"]["longitude"]}).
                                </Popup>
                            </CircleMarker>
                        </MapContainer>
                        <div style={{ ...eventItem, paddingTop: '10px', cursor: 'pointer' }} onClick={() => setShowMap(false)}>
                            <div style={{ ...statusContainer, width: '7%', borderRadius: '5px', color: 'white', background: 'black' }}>
                                Close
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

export default Detail;