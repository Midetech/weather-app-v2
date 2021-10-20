/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import  {useHistory} from 'react-router'

const useGeoLocation = () => {
  const history = useHistory();
  const [location, setLocation] = useState({
    loaded: false,
    currentLoaction: ''
  });

  const onSuccess = async (location) => {
    setLocation({
        loaded: true,
        coordinates: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        },
    });

    if (localStorage.getItem('currentCity')) {
      return;
    }

    const YOUR_API_KEY = "AIzaSyAUzQUF_UzMdyrNLOwTL8xllfMw1yZaS_s";
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${YOUR_API_KEY}`
    );

    const result = await res.json();
    console.log(result);
    if (result.status === "OK") {
      const currentCity = result.plus_code.compound_code.split(" ")[1];
      

     history.push(`/weather/${currentCity}`);

      localStorage.setItem("currentCity", JSON.stringify(currentCity));

     
    }
  };

  const onError = (error) => {
    localStorage.removeItem('currentCity');
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

  return location;
};

export default useGeoLocation;
