import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    if (city.trim() === '') {
      // If city name is empty, clear weather data
      setWeather(null);
      return;
    }

    const apiKey = 'b7fa62c0ad28400195495053241406';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim() === '') {
      toast.error('Please enter a city name!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fetchWeather();
    }
  };

  let backgroundColor = '';
  let textColor = '';

  if (weather) {
    const isDaytime = weather.current.is_day === 1;

    switch (weather.current.condition.code) {
      case 1000:
        backgroundColor = isDaytime ? '#ffe066' : '#000'; // clear
        textColor = isDaytime ? '#000' : '#fff'; // black text for day, white for night
        break;
      case 1003:
      case 1006:
      case 1009:
        backgroundColor = isDaytime ? '#8cdfff' : '#666'; // partly cloudy
        textColor = isDaytime ? '#000' : '#fff'; // black text for day, white for night
        break;
      case 1030:
      case 1135:
        backgroundColor = '#ddd'; // mist
        textColor = '#000'; // black text
        break;
      case 1063:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
      case 1192:
      case 1195:
      case 1198:
      case 1201:
      case 1240:
      case 1243:
      case 1246:
        backgroundColor = isDaytime ? '#85d7ff' : '#666'; // light rain
        textColor = '#000'; // black text
        break;
      case 1066:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1222:
      case 1225:
      case 1237:
      case 1255:
      case 1258:
      case 1261:
      case 1264:
      case 1273:
      case 1276:
        backgroundColor = '#7bb4ff'; // snow
        textColor = '#000'; // black text
        break;
      case 1069:
      case 1150:
      case 1153:
      case 1168:
      case 1171:
      case 1198:
      case 1240:
        backgroundColor = isDaytime ? '#ffd700' : '#666'; // thunderstorm
        textColor = '#000'; // black text
        break;
      default:
        backgroundColor = '#fff';
        textColor = '#000'; // black text
        break;
    }
  }

  return (
    <div className="App" style={{ background: backgroundColor, color: textColor }}>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {weather && (
        <div className="weather-container flex">
          <div className="weather-info flex-1">
            <h2 className="font-bold text-3xl mb-4">
              <span className="font-bold text-4xl">{weather.location.name}</span>
            </h2>
            <img src={`http:${weather.current.condition.icon}`} alt={weather.current.condition.text} className="ml-4" />
            <div className="weather-details mt-4">
              <p className="font-bold">Local Time: {weather.location.localtime}</p>
              <p className="font-bold">Condition: {weather.current.condition.text}</p>
              <p className="font-bold">Pressure: {weather.current.pressure_mb} mb</p>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
