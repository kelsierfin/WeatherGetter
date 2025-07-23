import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch {
      setError("City not found.");
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🌤️ Weather Getter</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡️ Temp: {weather.main.temp}°C</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>☁️ {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
