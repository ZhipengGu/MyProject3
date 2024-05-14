import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  paddingBottom:'50%',
};

const lngLatFromEvent = (event) => {
    if (event?.address?.location?.coordinates) {
        return { lng: event.address.location.coordinates[0], lat: event.address.location.coordinates[1] };
    }
    return null;
}

const SingleEventLocation = ({ event }) => {
  console.log("event", event)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if(isLoaded && event?.address?.location){
     
      const event_marker= lngLatFromEvent(event);
      setMarker(event_marker);
    }
  }, [isLoaded,event]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={lngLatFromEvent(event)}
                options={{gestureHandling: "none", zoomControl: false}}
            >
                {marker ? <MarkerF
                    position={marker}
                    onClick={() => setSelectedMarker(marker)}
                > {selectedMarker && (
                    <InfoWindowF
                        position={lngLatFromEvent(event)}
                        onCloseClick={() => setSelectedMarker(null)}
                    >
                        <div>
                            
                            {<p>{event.address.detailed_address}</p>}
                            <button
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedMarker.lat},${selectedMarker.lng}`)}>
                                Open Google Maps
                            </button>
                        </div>
                    </InfoWindowF>)}
                    </MarkerF> : null}


            </GoogleMap>

        </div>
    );
};

export default SingleEventLocation;
