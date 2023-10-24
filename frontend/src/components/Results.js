import { useState } from "react";
import Detail from "./Detail";

const Results = ({ events_ }) => {

    const [detail, setDetail] = useState(false);
    const [detailIndex, setDetailIndex] = useState('');

    const noResult = {
        background: "white",
        width: "60%",
        borderRadius: '7px',
        padding: '2px',
        fontWeight: 'bold'
    }

    const resultContainer = {
        background: '#22222a',
        width: "60%",
        borderRadius: '7px',
        padding: '10px 5px 10px 5px',
        marginTop: '100px',
        marginBottom:'10%'
    }

    const resultItem = {
        color: 'white',
        textAlign: 'center'
    }

    const resultHeaderColumn = {
        display: 'flex',
        // justifyContent: 'space-around'
        // justifyContent:'center',
        // gap:'95px'
    }

    const icon = {
        width: '80px'
    }

    const singleResultContainer = {
        display: 'flex',
        // justifyContent:'space-evenly',
        // paddingTop:'5%',
        alignItems: 'center',
        padding: "20px 5px 20px 5px",
        cursor:'pointer'
    }

    return (
        <>
            {!detail ? (<div style={resultContainer}>
                <div style={resultHeaderColumn}>
                    <div style={{ ...resultItem, fontWeight: 'bold', width: '16%' }}>
                        Date/Time
                    </div>
                    <div style={{ ...resultItem, fontWeight: 'bold', width: '16%' }}>
                        Icon
                    </div>
                    <div style={{ ...resultItem, fontWeight: 'bold', width: '36%' }}>
                        Event
                    </div>
                    <div style={{ ...resultItem, fontWeight: 'bold', width: '16%' }}>
                        Genre
                    </div>
                    <div style={{ ...resultItem, fontWeight: 'bold', width: '16%' }}>
                        Venue
                    </div>
                </div>
                <div>
                    {
                        Object.entries(events_).map((event, index) => (
                            <div onClick={() => {
                                setDetail(true)
                                setDetailIndex(index)}} style={{ backgroundColor: index % 2 === 0 ? '#22222a' : '#292b2e', ...singleResultContainer }} key={index}>
                                <div style={{ ...resultItem, width: '16%' }}>
                                    {event[1]['dates']["start"]["localDate"]}
                                </div>
                                <div style={{ ...resultItem, width: '16%' }}>
                                    <img style={icon} src={event[1]["images"][0]["url"]} />
                                </div>
                                <div style={{ ...resultItem, width: '36%' }}>
                                    {event[1]["name"]}
                                </div>
                                <div style={{ ...resultItem, width: '16%' }}>
                                    {event[1]["classifications"][0]["segment"]["name"]}
                                </div>
                                <div style={{ ...resultItem, width: '16%' }}>
                                    {event[1]["_embedded"]["venues"][0]["name"]}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>) : <Detail event={events_[detailIndex]} close={setDetail} />}
        </>
    )
}

export default Results;