'use client'
import React, { useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
import Script from "next/script";

const LocationInput = ({ className, onAddressChange }) => {
    
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [borough, setBorough] = useState("");
    const [gmapsLoaded, setGmapsLoaded] = useState(false);
    
    const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // This is how you do componentDidMount() with React hooks
    useEffect(() => {
      window.initMap = () => setGmapsLoaded(true)
      const gmapScriptEl = document.createElement(`script`)
      gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${mapsKey}&libraries=places&callback=initMap&loading=async`;
      document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
    }, [])

    const handleChange = (value) => {
        setAddress(value);
        if (coordinates) {
            onAddressChange(coordinates, value);
        }
    }

    const handleSelect = async (value) => {
        if (value.trim() === "") {
            return;
        }

        try {
            if (value !== undefined && value !== null && value !== "") {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            setAddress(value); // Update address to selected value
            setCoordinates(latLng);
            console.log(results[0].address_components[2].long_name);
            onAddressChange(latLng, value, results[0].address_components[2].long_name);
            console.log(value)
            }
        } catch (error) {
            console.error("Error fetching geocode data: ", error);
        }
    }



    return (
        <>
            <label htmlFor="location">Location</label>
            {
                gmapsLoaded ? (
                <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>

                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div style={{ width: '100%' }}>
                            <input className={className} {...getInputProps({ placeholder: "Type address" })} />
                            <div>
                                {loading ? <div>...loading</div> : null}
    
                                {suggestions.map((suggestion) => {
                                    const style = {
                                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                        className: className
                                    };
                                    const {placeId, ...rest} = getSuggestionItemProps(suggestion, { style });
                                    return (
                                        <div key={suggestion.placeId} {...rest}>
                                            {suggestion.description}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                ) : (
                    <div>Loading Google Maps...</div>
                )
            }

        </>
    );
};

export default LocationInput;
