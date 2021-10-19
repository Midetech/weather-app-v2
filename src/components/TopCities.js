import React, { useEffect, useState } from "react";
import { RiTempHotLine, CgMicrosoft } from "react-icons/all";
import "../style/topcities.styles.css";
import WeatherCard from "./WeatherCard";

const TopCities = (props) => {
  const tops = ["tokyo", "delhi",  "shanghai", "sao paulo", "mexico city"];
  const API_KEY = "eff6f76ace84435fa71163542211710";

  const bgColors = [
    "linear-gradient(154.6deg, #ffd6c9 2.33%, rgba(255, 255, 255, 0) 83.9%), #ffffff",
    "linear-gradient(154.6deg, #C9E5FF 2.33%, rgba(255, 255, 255, 0) 83.9%), #FFFFFF",
    "linear-gradient(154.6deg, #FFF0CA 2.33%, rgba(255, 255, 255, 0) 83.9%), #FFFFFF",
    "#ffffff",
  ];

  const iconColors = ["#F05454", "#0085FF", "#F0A500", "#C4C4C4"];
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [favorites, setFavorites] = useState(props.favorites);


  const getTopCitiesWeather = async () => {
    tops.sort();
   await Promise.all(tops.map(top => fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${top}&aqi=no`))).then(responses => 
      Promise.all(responses.map(res => res.json() ))
    ).then(result => 
      setCitiesWeather(result)
    )
  };

  useEffect(() => {
    getTopCitiesWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favoriteHandler = async (data) => {
    props.onAddRemoveFavorite(data);
  };

  const removeCity = async (index) => {
    console.log(citiesWeather[index]);
    const favIndex = await findWeatherIndex(citiesWeather[index].location.name);
    props.onRemoveFavorite(favIndex);
    citiesWeather.splice(index, 1);
    setCitiesWeather([...citiesWeather])
    // setCitiesWeather([
    //   ...citiesWeather.slice(0, index),
    //   ...citiesWeather.slice(index + 1),
    // ]);
  };

  const findWeatherIndex = (cityName) => {
    console.log(favorites, cityName);
    return favorites.findIndex(({ location }) => location.name === cityName);
  };

  return (
    <div>
      <h1>
        <CgMicrosoft color="red" /> Top Cities
      </h1>

      <div className="top-list">
        <div className="city-weather">
          {citiesWeather.map((city, i) => (
            <WeatherCard
              removeTopCity={() => removeCity(i)}
              favoriteHandler={() => favoriteHandler(city)}
              thermo={<RiTempHotLine color={iconColors[i]} />}
              key={i}
              color={bgColors[i]}
              temp={city?.current?.temp_c}
              city={`${city?.location?.name}, ${city?.location?.country}`}
              link={`/weather/${city?.location?.name}`}
              iconColor="#9E9E9E"
            />

          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCities;
