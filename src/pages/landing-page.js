/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { FaRegStar, FaThermometerHalf } from "react-icons/all";
import TopCities from "../components/TopCities";
import WeatherCard from "../components/WeatherCard";
import "../style/topcities.styles.css";
import useGeoLocation from "../components/useGeolocation";
import { useHistory } from "react-router";

const LandingPage = () => {
  const history = useHistory();
  useGeoLocation();
  const favs = JSON.parse(localStorage.getItem("favs")) || [];

  const [favorites, setFavorites] = useState(favs);
  const [place, setPlace] = useState("");

  const handleInput = (e) => {
    setPlace(e.target.value);
  };

  const consolePlace = async (e) => {
    e.preventDefault();
    const req = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${place}&aqi=no`
    );

    const response = await req.json();
    history.push(`/weather/${response.location.name}`);
  };

  const addRemoveFavoriteHandler = async (data) => {
    const weatherIndex = await findWeatherIndex(data.location.name);
    if (weatherIndex > -1) {
      removeFromFavorites(weatherIndex);
    } else {
      addToFavorites(data);
    }
  };

  const addToFavorites = (data) => {
    const tempFavs = [...favorites];
    setFavorites((newFavs) => [...newFavs, data]);
    localStorage.setItem("favs", JSON.stringify([...tempFavs, data]));

    return;
  };

  const removeFromFavorites = (index) => {
    if (index > -1) {
      favorites.splice(index, 1);
      const newFavs = [...favorites];

      setFavorites(newFavs);
      localStorage.setItem("favs", JSON.stringify(newFavs));
    }
  };

  const findWeatherIndex = (cityName) => {
    return favorites.findIndex(({ location }) => location.name === cityName);
  };

  const bgColors = [
    "linear-gradient(154.6deg, #ffd6c9 2.33%, rgba(255, 255, 255, 0) 83.9%), #ffffff",
    "linear-gradient(154.6deg, #C9E5FF 2.33%, rgba(255, 255, 255, 0) 83.9%), #FFFFFF",
    "linear-gradient(154.6deg, #FFF0CA 2.33%, rgba(255, 255, 255, 0) 83.9%), #FFFFFF",
    "#ffffff",
  ];

  const iconColors = ["#F05454", "#0085FF", "#F0A500", "#C4C4C4"];

  return (
    <React.Fragment>
      <SearchBar onChange={handleInput} getWeather={consolePlace} />
      <div className="favorites">
        <div className="fav">
          <FaRegStar color="#F0A500" size="20px" />
          <p className="fav-title">Favourites</p>
        </div>

        <div className="favorite-list">
          {favorites?.length ? (
            <div className="top-list">
              <div className="city-weather">
                {favorites.map((city, i) => (
                  <WeatherCard
                    favoriteHandler={() => addRemoveFavoriteHandler(city)}
                    thermo={<FaThermometerHalf color={iconColors[i]} />}
                    key={i}
                    color={bgColors[i]}
                    temp={city?.current?.temp_c}
                    city={`${city?.location?.name}, ${city?.location?.country}`}
                    link={`/weather/${city?.location?.name}`}
                    iconColor="#F0A500"
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="no-fav">No favourites added Yet.</p>
          )}
        </div>

        <TopCities
          favorites={favorites}
          onAddRemoveFavorite={addRemoveFavoriteHandler}
          onRemoveFavorite={removeFromFavorites}
        />
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
