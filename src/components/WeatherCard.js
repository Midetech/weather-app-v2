import React from "react";
import { FaRegStar, GrFormClose } from "react-icons/all";
import { Link } from "react-router-dom";

const WeatherCard = ({
  temp,
  city,
  color,
  thermo,
  favoriteHandler,
  link,
  iconColor,
  removeTopCity
}) => {
 
  return (
    <div className="card" style={{ background: color, cursor: "pointer" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <div>{thermo}</div>
        <div>
          <FaRegStar color={iconColor} onClick={favoriteHandler} />
          <GrFormClose onClick={removeTopCity} />
        </div>
      </div>

      <p className="temp">
        {temp} <sup>o</sup>
      </p>



      <Link to={link}>
        <p className="city">{city}</p>
      </Link>
    </div>
  );
};

export default WeatherCard;
