import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";


function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
 


  const success = (info) => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const APIKEY = "3509400e3fe059790cd8162f8a162fc9";

  

  useEffect(() => {
    if (coords) {
      const APIKEY = "3509400e3fe059790cd8162f8a162fc9";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = ((9 / 5) * celsius + 32).toFixed(1);
          setTemp({
            celsius,
            fahrenheit,
          });
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [coords]);

  
  




  return (
    <div className="app">
      {isLoading ? <Loader /> : <WeatherCard weather={weather} temp={temp} />}
      
    </div>

  );
}

export default App;
