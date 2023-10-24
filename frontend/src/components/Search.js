import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Results from "./Results";

const Search = () => {

    const [inputValues, setInputValues] = useState({
        keyword: '',
        distance: 0,
        category: 'default',
        location: '',
        detect: false
    });

    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [events, setEvents] = useState("false")
    const keywordInputRef = useRef(null);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setInputValues({
                ...inputValues,
                [name]: checked,
            });
        } else {
            setInputValues({
                ...inputValues,
                [name]: value,
            });
        }
        if (name == "keyword") {
            setShowDropdown(true);
        }
    };

    const handleClear = () => {
        setInputValues({
            keyword: '',
            distance: 0,
            category: 'default',
            location: '',
            detect: false
        });
        setSuggestions([]);
        setEvents("false");
        window.location.reload();
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValues({
            ...inputValues,
            keyword: suggestion,
        });
        setShowDropdown(false);
        keywordInputRef.current.value = suggestion;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://127.0.0.1:8000/api/search/', inputValues, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setEvents(response.data["data"])
            })
            .catch((error) => {
                console.error('Error:', error);
                setEvents([])
            });

    };

    useEffect(() => {
        if (inputValues.keyword && inputValues.keyword != '') {
            fetchSuggestions(inputValues.keyword);
        } else {
            setSuggestions([]);
        }
    }, [inputValues.keyword]);

    const fetchSuggestions = async (keyword) => {
        await axios
            .get(`http://127.0.0.1:8000/api/suggestions/?keyword=${keyword}`)
            .then((response) => {
                const fetchedSuggestions = response.data.suggestions;
                setSuggestions(fetchedSuggestions);
            })
            .catch((error) => {
                console.error('Error fetching suggestions:', error);
            });
    };


    const form = {
        marginTop: '60px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '20px'
    };

    const formContainer = {
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        width: '40%',
        borderRadius: '10px',
        backdropFilter: 'blur(100px)'
    }

    const searchHeading = {
        fontSize: "20px",
        color: 'white',
        textAlign: 'center',
    }

    const horizontalLine = {
        border: '1px solid white', 
        margin: '10px 0',
        width: "80%"
    }

    const fieldTitle = {
        color: '#82c4ff',
    }

    const asterik = {
        color: 'red'
    }

    const fieldContainer = {
        paddingLeft: '10%',
        marginTop: '10px'
    }

    const inputField = {
        width: '88%',
        borderRadius: '8px',
        height: '30px',
        marginTop: '10px',
        border: 'None'
    }

    const categoryDropdown = {
        height: '30px',
        marginTop: '10px'
    }

    const buttonBaseStyle = {
        color: 'white',
        background: 'red',
        padding: '5px 10px 5px 10px',
        borderRadius: '5px',
        textDecoration: 'none',
        border: 'none',
    }

    const buttonContainer = {
        marginTop: '10px',
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
    }

    const noResult = {
        background: "white",
        width: "60%",
        borderRadius: '7px',
        padding: '2px',
        fontWeight: 'bold',
        marginBottom: '10%'
    }

    const dropdown = {
        borderRadius: '5px',
        background: 'white',
        position: 'absolute',
        width: '80%'
    }

    return (
        <>
            <form onSubmit={handleSubmit} onClick={() => setShowDropdown(false)} style={form}>
                <div style={formContainer}>
                    <p style={searchHeading}>
                        Events Search
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <hr style={horizontalLine}></hr>
                    </div>
                    <div style={fieldContainer}>
                        <div>
                            <span style={fieldTitle}>Keyword</span><span style={asterik}>*</span>
                        </div>
                        <input ref={keywordInputRef} required name="keyword" onChange={handleInputChange} style={inputField} type='text' />
                        {showDropdown && (
                            <div style={dropdown}>
                                {suggestions.map((suggestion, index) => (
                                    <p key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={fieldContainer}>
                            <div>
                                <span style={fieldTitle}>Distance (in miles)</span><span style={asterik}>*</span>
                            </div>
                            <input required name="distance" onChange={handleInputChange} style={{ ...inputField, width: "100%" }} type='number' />
                        </div>
                        <div style={fieldContainer}>
                            <div>
                                <span style={fieldTitle}>Category</span><span style={asterik}>*</span>
                            </div>
                            <select required name="category" onChange={handleInputChange} style={categoryDropdown}>
                                <option value="default">Default</option>
                                <option value="music">Music</option>
                                <option value="Sports">Sports</option>
                                <option value="artsandtheatre">Arts & Theatre</option>
                                <option value="film">Film</option>
                                <option value="miscellaneous">Miscellaneous</option>
                            </select>

                        </div>
                    </div>
                    <div style={fieldContainer}>
                        <div>
                            <span style={fieldTitle}>Location</span><span style={asterik}>*</span>
                        </div>
                        {inputValues.detect ? (<input name="location" onChange={handleInputChange} style={inputField} type='text' />) : (<input required name="location" onChange={handleInputChange} style={inputField} type='text' />)}
                    </div>
                    <div style={fieldContainer}>
                        <input name="detect" onChange={handleInputChange} type="checkbox" id="myCheckbox" />
                        <label style={fieldTitle} htmlFor="detect">Auto-Detect your location</label>
                    </div>
                    <div style={buttonContainer}>
                        <button type="submit" style={buttonBaseStyle}>Submit</button>
                        <button style={{ ...buttonBaseStyle, background: "blue", padding: '10px 15px 10px 15px' }} onClick={handleClear}>Clear</button>
                    </div>
                </div>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {events != [] && events.length != 0 && events !== "false" ? (
                    <Results events_={events} />
                ) : (
                    events !== "false" ? (
                        <div style={{ ...form, ...noResult }}>
                            <div style={{ color: 'red' }}>
                                No results available
                            </div>
                        </div>
                    ) : ''
                )}
            </div>
        </>
    )
}

export default Search;