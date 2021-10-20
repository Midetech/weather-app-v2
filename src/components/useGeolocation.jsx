import { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {
      lat: '',
      lng: ''
    }
  });

  const onSuccess = async (location) => {
    setLocation({
        loaded: true,
        coordinates: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        },
    });

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.REACT_APP_API_KEY}`
    );

    const result = await res.json();
    if (result.status === "OK") {
      const currentCity = result.plus_code.compound_code.split(" ")[1];

      // window.location.replace(`/weather/${currentCity}`)
      console.log(currentCity);

    }

  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  localStorage.setItem("location", JSON.stringify(location));
  return location;
};

export default useGeoLocation;
