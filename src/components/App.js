import React, { useState } from "react";
import './../styles/App.css';
import axios from "axios";

const API_KEY = "ed4d31dd300b25a056d846b625caf1b0";

const App = () => {
  const [query,setQuery] = useState("");
  const [weatherData,setWeatherData] = useState(null);
  const [error,setError] = useState(null);

   const handleSearch = async (e) => {
     try {
       const res = await axios.get(
         `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
       );
       const fahrenheitTemp = ((res.data.main.temp - 273.15) * 9) / 5 + 32;
       res.data.main.temp = fahrenheitTemp.toFixed(2);
       setWeatherData(res.data);
       setError(null);
       setQuery("");
     } catch (error) {
       setError("city not found");
       setWeatherData(null);
     }
   };

  return (
    <div>
      <div>
        <input
          className="search"
          onChange={(e)=>setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Enter a city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="weather">
        {weatherData ? (
          <div>
            <h2>{weatherData.name}</h2>
            <h2>{weatherData.main.temp} °F</h2>
            <p>{weatherData.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          null
        )
        }
      </div>
    </div>
  );
}

export default App
