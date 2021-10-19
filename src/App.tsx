import "./App.css";
import LandingPage from "./pages/landing-page";
import {  BrowserRouter as Switch, Route } from "react-router-dom";
import WeatherInfo from "./pages/weather-info";



function App() {

  return (

      <div className="App">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/weather/:name" exact component={WeatherInfo} />

        </Switch>

      </div>
 
  );
}

export default App;
