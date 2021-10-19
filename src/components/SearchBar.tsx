import React from 'react';
import {FaSearch} from 'react-icons/fa'
import '../style/search.style.css';
import { Link } from "react-router-dom";





const SearchBar = (props: any) => {

  
    return (
        <div className="header">
            <div className="title">
               <Link to="/"> <h3>Weather App</h3></Link>
            </div>

            <div className="search">
           <form onSubmit={props.getWeather}>
      <div>
      <input type="text" name="place" placeholder="search for places" onChange={props.onChange}/>
            <button className="search-button"><FaSearch color="#fff" /></button>
      </div>
            
           </form>
           </div>

            <div className="units-selection">
               <button className="celcius">
                   <p>oC</p>
               </button>

               <button className="farenheit">
                   <p>oF</p>
               </button>
            </div>




        </div>
    )
};



export default SearchBar;
