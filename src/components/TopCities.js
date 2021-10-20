/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { RiTempHotLine, CgMicrosoft, IoIosClose } from "react-icons/all";
import "../style/topcities.styles.css";
import WeatherCard from "./WeatherCard";

const TopCities = (props) => {
  console.log(props.favorites);
  const tops = ["tokyo", "delhi",  "shanghai", "sao paulo", "mexico city"];


  const bgColors = [
    "linear-gradient(154.6deg, #ffd6c9 2.33%, rgba(255, 255, 255, 0) 83.9%), #ffffff",
    "linear-gradient(154.6deg, #C9E5FF 2.33%, rgba(255, 255, 255, 0) 83.9%), #FFFFFF",
    "linear-gradient(154.6deg, #FFF0CA 2.33%, rgba(255, 255, 255, 0) 83.9%), #FFFFFF",
    "#ffffff",
  ];

  const iconColors = ["#F05454", "#0085FF", "#F0A500", "#C4C4C4"];
  const [citiesWeather, setCitiesWeather] = useState([]);
  // const [favorites, setFavorites] = useState(props.favorites);

  useEffect(() => {
    const getTopCitiesWeather = async () => {
      tops.sort();
      await Promise.all(
        tops.map((top) =>
          fetch(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${top}&aqi=no`
          )
        )
      )
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((result) => setCitiesWeather(result));
    };

    getTopCitiesWeather();
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
  };

  const findWeatherIndex = (cityName) => {
    const favs = [...props.favorites]
    console.log(favs, cityName);
    return favs.findIndex(({ location }) => location.name === cityName);
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CgMicrosoft color="red" size="28px" /> <h1 style={{paddingLeft: '10px'}}>Top Cities</h1>
      </div>

      <div className="top-list">
        <div className="city-weather">
          {citiesWeather.map((city, i) => (
            <WeatherCard
              removeTopCity={
                <IoIosClose onClick={() => removeCity(i)} color="red" />
              }
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
