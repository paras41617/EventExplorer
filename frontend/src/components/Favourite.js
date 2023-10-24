import { useState, useEffect } from "react";
import delete_icon from '../images/delete_icon.png';

const Favourite = () => {

    const [likedEvents, setLikedEvents] = useState([]);

    const form = {
        marginTop: '60px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '20px'
    };

    const noResult = {
        background: "white",
        width: "60%",
        borderRadius: '7px',
        padding: '2px',
        fontWeight: 'bold',
        marginBottom: '10%'
    }

    const resultContainer = {
        background: 'white',
        width: "60%",
        borderRadius: '7px',
        padding: '10px 5px 1px 5px',
        marginTop: '10px',
        marginBottom: '10%'
    }

    const resultHeaderColumn = {
        display: 'flex',
        alignItems: 'center'
    }

    const resultItem = {
        color: 'black',
        textAlign: 'center'
    }

    const horizontalLine = {
        border: '1px solid grey',
        width: "100%",
        marginTop: '5px'
    }

    const favouriteContainer = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }

    const remove_favourite = (id) => {
        const updatedLikedEvents = likedEvents.filter((e) => e.id !== id);
        setLikedEvents(updatedLikedEvents);
        const new_liked_events = updatedLikedEvents;
        localStorage.setItem('likedEvents', JSON.stringify(new_liked_events));
        alert("Event removed from the favourite")
    }

    useEffect(() => {
        const storedLikedEvents = JSON.parse(localStorage.getItem('likedEvents')) || [];
        setLikedEvents(storedLikedEvents);
    }, []);

    return (
        <>
            {likedEvents != [] && likedEvents.length != 0 ? (<div style={favouriteContainer}>
                <div style={{ color: 'white', marginTop: '60px' }}>
                    List of your favourite events
                </div>
                <div style={resultContainer}>
                    <div style={resultHeaderColumn}>
                        <div style={{ ...resultItem, fontWeight: 'bold', width: '5%' }}>
                            #
                        </div>
                        <div style={{ ...resultItem, fontWeight: 'bold', width: '20%' }}>
                            Date/Time
                        </div>
                        <div style={{ ...resultItem, fontWeight: 'bold', width: '23%' }}>
                            Event
                        </div>
                        <div style={{ ...resultItem, fontWeight: 'bold', width: '20%' }}>
                            Category
                        </div>
                        <div style={{ ...resultItem, fontWeight: 'bold', width: '20%' }}>
                            Venue
                        </div>
                        <div style={{ ...resultItem, fontWeight: 'bold', width: '12%' }}>
                            Favourite
                        </div>
                    </div>
                    <div style={horizontalLine}></div>
                    <div>
                        {likedEvents.map((event, index) => (
                            <div key={index}>
                                <div style={resultHeaderColumn}>
                                    <div style={{ ...resultItem, fontWeight: 'bold', width: '5%' }}>
                                        {index + 1}
                                    </div>
                                    <div style={{ ...resultItem, fontWeight: 'bold', width: '20%' }}>
                                        {event["date"]}
                                    </div>
                                    <div style={{ ...resultItem, fontWeight: 'bold', width: '23%' }}>
                                        {event["name"]}
                                    </div>
                                    <div style={{ ...resultItem, fontWeight: 'bold', width: '20%' }}>
                                        {event["category"]}
                                    </div>
                                    <div style={{ ...resultItem, fontWeight: 'bold', width: '20%' }}>
                                        {event["venue"]}
                                    </div>
                                    <div onClick={() => remove_favourite(event["id"])} style={{ ...resultItem, fontWeight: 'bold', width: '12%' }}>
                                        <img style={{ width: '50px', height: '50px' }} src={delete_icon} />
                                    </div>
                                </div>
                                <div style={horizontalLine}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            ) : (<div style={{display:'flex', justifyContent:'center'}}>
                <div style={{ ...form, ...noResult }}>
                    <div style={{ color: 'red' }}>
                        No Favourites available
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default Favourite;