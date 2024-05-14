import React, {useState, useEffect} from 'react';
import {GoogleMap, useLoadScript, MarkerF, InfoWindowF} from '@react-google-maps/api';
import 'react-datepicker/dist/react-datepicker.css';
import EventInfoPreview from './EventInfoPreview';
import {defaultLocation} from "../utils/GetLocation.js";
import {AppContext} from "../context/AppContextProvider";
import {useContext} from "react";

const userIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
const upcomingIcon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
const ongoingIcon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";

const libraries = ['places'];
const mapContainerStyle = {
    width: '100%',
    height: '100vh',
    position: 'relative'
};

const lngLatFromEvent = (event) => {
    if (event?.address?.location?.coordinates) {
        return {lng: event.address.location.coordinates[0], lat: event.address.location.coordinates[1]};
    }
    return null;
}


const MapComponent = ({events}) => {
    const {userLocation, locationSuccessful} = useContext(AppContext);
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [clickedEvent, setClickedEvent] = useState(null);

    const mapCenter = locationSuccessful ? userLocation : defaultLocation;

    const closeInfoWindow = () => {
        setShowInfoWindow(false);
    };


    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div>

            <div style={mapContainerStyle}>
                <GoogleMap className="relative h-full z-10"
                           mapContainerStyle={mapContainerStyle}
                           zoom={15}
                           center={{lat: mapCenter.lat, lng: mapCenter.lng}}
                           onClick={closeInfoWindow}
                           options={{gestureHandling: "none", zoomControl: false}}
                           clickableIcons={false}
                >
                    {locationSuccessful ?
                        <MarkerF
                            position={userLocation}
                            icon={userIcon}
                        /> : <></>
                    }
                    {events && events.map((event, index) => (
                        <MarkerF
                            key={index}
                            position={lngLatFromEvent(event)}
                            onClick={(e) => {
                                setClickedEvent(event);
                                setShowInfoWindow(true)
                            }}
                            icon={event.startTime > new Date() ? upcomingIcon : ongoingIcon}
                        >
                        </MarkerF>
                    ))
                    }
                    {showInfoWindow && (
                        <InfoWindowF
                            position={lngLatFromEvent(clickedEvent)}
                            onCloseClick={closeInfoWindow}
                        >
                            <div>
                                <EventInfoPreview event={clickedEvent}></EventInfoPreview>
                               
                            </div>
                        </InfoWindowF>
                    )}

                </GoogleMap>

            </div>
        </div>
    );
};

export default MapComponent;