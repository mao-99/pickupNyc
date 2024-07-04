"use client";
import React, { useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
import Script from "next/script";

const LocationInput = ({ className, onAddressChange }) => {
    const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState(null);

    const loadedMapsApi = () => {
        console.log("Maps API loaded");
    }

    const loadedMapsApiError = () => {
        console.error("Error loading Maps API");
    }

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
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            setAddress(value); // Update address to selected value
            setCoordinates(latLng);
            onAddressChange(latLng, value);
        } catch (error) {
            console.error("Error fetching geocode data: ", error);
        }
    }

    useEffect(() => {
        // console.log("Coordinates: ", coordinates);
        // console.log("Address: ", address);
    }, [coordinates, address]);

    return (
        <>
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${mapsKey}&libraries=places&loading=async`}
                strategy="beforeInteractive"
                onLoad={loadedMapsApi}
                onError={loadedMapsApiError}
            />
            <label htmlFor="location">Location</label>
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
                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </>
    );
};

export default LocationInput;
