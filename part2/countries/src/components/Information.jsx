import axios from "axios";
import { useEffect, useState } from "react";

const weather_key = import.meta.env.VITE_WEATHER_API_KEY;

const Information = ({ country }) => {
  console.log("info received country", country);
  console.log("API Key:", weather_key);
  const [capitalWeather, setCapitalWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${weather_key}`,
      )
      .then((response) => setCapitalWeather(response.data));
  }, [country]);

  return (
    <div>
      <h1>{country.name}</h1>
      <h3>Capital: {country.capital[0]}</h3>
      <h3>Area: {country.area}</h3>
      <h1>Languages</h1>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <span className="flag">{country.flag}</span>
      {capitalWeather && (
        <div>
          <h1>Weather in ${capitalWeather.capital}</h1>
          <h3>Temperature ${capitalWeather.main.temp}</h3>
          <span></span>
          <h3>Wind ${capitalWeather.wind.speed}</h3>
        </div>
      )}
    </div>
  );
};

export default Information;
