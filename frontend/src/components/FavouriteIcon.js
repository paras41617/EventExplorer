import React, { useState, useEffect } from 'react';
import empty_heart from '../images/empty_heart.png';
import full_heart from '../images/full_heart.png';

const FavoriteIcon = ({ event, id }) => {
    const [isFavorite, setFavorite] = useState(false);
    const [likedEvents, setLikedEvents] = useState([]);

    const toggleFavorite = () => {
        const eventIndex = likedEvents.findIndex((e) => e.id === id);
        let new_liked_events = likedEvents;
        if (eventIndex === -1) {
            let new_event = {
                "id": id,
                "date": String(event["dates"]["start"]["localDate"]) + " " + String(event["dates"]["start"]["localTime"]),
                "name": event["name"],
                "category": event["classifications"][0]["segment"]["name"] + " " + event["classifications"][0]["genre"]["name"] + " " + event["classifications"][0]["subGenre"]["name"],
                "venue": event["_embedded"]["venues"][0]["name"]
            }
            setLikedEvents([...likedEvents, new_event]);
            new_liked_events = [...likedEvents, new_event]
            alert("Event added to the favourite")

        } else {
            const updatedLikedEvents = likedEvents.filter((e) => e.id !== id);
            setLikedEvents(updatedLikedEvents);
            new_liked_events = updatedLikedEvents
            alert("Event removed to the favourite")
        }

        localStorage.setItem('likedEvents', JSON.stringify(new_liked_events));
        setFavorite(!isFavorite);
    };

    const favouriteContainer = {
        background: 'white',
        borderRadius: '50%',
        width: '75px',
        height: '75px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }

    useEffect(() => {
        const storedLikedEvents = JSON.parse(localStorage.getItem('likedEvents')) || [];
        setLikedEvents(storedLikedEvents);
        const eventIndex = storedLikedEvents.findIndex((e) => {
            return e.id === id;
          });
          
        if (eventIndex !== -1) {
            setFavorite(true)
        }
    }, []);

    return (
        <div>
            <div onClick={toggleFavorite} style={favouriteContainer}>
                {isFavorite ? <img src={full_heart} /> : <img src={empty_heart} />}
            </div>
        </div>
    );
}

export default FavoriteIcon;
