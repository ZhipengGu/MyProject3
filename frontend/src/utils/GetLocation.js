export const defaultLocation = {lat: -36.848461, lng: 174.763336}

export const getUserLocation = (setLocation, setLocationSuccessful) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setLocationSuccessful(true);
            },
            (error) => {
                console.error('Error getting user location:', error);
                setLocation(defaultLocation);
                setLocationSuccessful(false);
            }
        );
    }
};