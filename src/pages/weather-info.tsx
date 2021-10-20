import React, { FC, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import {
  FaMoon,
  RiTempHotLine,
  FaWind,
  FaSun,
  MdOutlineWaterDrop,
} from "react-icons/all";
import "../style/info.styles.css";
import { RouteComponentProps } from "react-router";
import icon from "../Vector.png";
import Note from "../components/Note";

interface MatchParams {
  name: string;
}
interface Date {
 
  getHours(): any;

  getMinutes(): any;

}

interface Response {
  current: {
    feelslike_c: string;
    cloud: string;
    last_updated: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };

    wind_dir: string;
    wind_degree: number;
    wind_mph: number;
    humidity: number;
    pressure_in: number;
    vis_km: number;
  };
  location: {
    name: string;
    country: string;
  };
}

const WeatherInfo: FC<RouteComponentProps<MatchParams>> = (props) => {
  const [info, setInfo] = useState<Response>();
  const [time, setTime] = useState<any>({
    hour: '',
    minute: '',
    ampm: ''
  });

  useEffect(() => {
    const getWeatherInfo = async () => {
      const req = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${
          props.location.search.split("=")[1] || props.match.params.name
        }&aqi=no`
      );
      const response = await req.json();
  
      setInfo(response);
    }; 
    getWeatherInfo();
    formatAMPM(new Date())
  }, [props.location.search, props.match.params.name ]);

 
function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();

  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  // minutes = minutes < 10 ? '0'+minutes : minutes;
  // var strTime = hours + ':' + minutes + ' ' + ampm;
 setTime({
   hour: hours,
   minute: minutes,
   ampm: ampm
 })
}



  return (
    <div className="container">
      <SearchBar />

      <div className="heading">
        <p className="country">
          {info?.location.name}, {info?.location.country}
        </p>
        <p className="updated">Last updated: {info?.current.last_updated}</p>
        <p className="time">
         {
           time.hour >= 18 && time.ampm === '' ?  <FaMoon /> : <FaSun/>
         } {`${time.hour}:${time.minute} ${time.ampm}`}
        </p>
      </div>
      <div className="weather-info">
        <div className="weather-info-container">
          <div>
            <p className="title">Weather</p>
            <div className="details">
              <img
                src={info?.current.condition.icon}
                height="170px"
                width="180px"
                alt={info?.current.condition.text}
              />
              <div className="text-details">
                <p className="condition">{info?.current.condition.text}</p>
                <p className="cover">Cloud cover - {info?.current?.cloud}</p>
                <p className="feels">
                  Feels like - {info?.current?.feelslike_c}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="title">Notes</p>
            <Note />
          </div>
        </div>

        <div className="other-details">
          <div className="temperature">
            <p className="title">Temperature</p>
            <div className="temperature__info">
              <div>
                <RiTempHotLine color="#F05454" size="40px" /> <p>Hot</p>
              </div>
              <p>
                {info?.current.temp_c}
                <sup>o</sup>
              </p>
            </div>
          </div>

          <div className="wind">
            <p className="title">Wind</p>
            <div className="wind__info">
              <div>
                <FaWind color="#00A3FF" size="40px" />
              </div>
              <div style={{ display: "inline-block", textAlign: "left" }}>
                <p>Speed - {info?.current.wind_mph}mph</p>
                <p>Direction - {info?.current.wind_dir} </p>
                <p>Angle - {info?.current.wind_degree} </p>
              </div>
            </div>
          </div>

          <div className="pressure">
            <p className="title">Pressure</p>
            <div className="pressure__info">
              <img src={icon} alt="icon" width="auto" height="30px" />
              <h1>{info?.current.pressure_in}</h1>
            </div>
          </div>

          <div className="humidity">
            <p className="title">Humidity</p>
            <div className="humidity__info">
              <div>
                <MdOutlineWaterDrop color="#00AC45" size="40px" />
              </div>
              <h1>{info?.current.humidity}</h1>
            </div>
          </div>

          <div className="visibility">
            <p className="title">Visibility</p>
            <div className="visibility__info">
              <img src={icon} alt="icon" width="auto" height="30px" />
              <h1>{info?.current.vis_km}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
