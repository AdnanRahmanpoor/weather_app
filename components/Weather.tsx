'use client';

import { useState } from 'react';
import axios from 'axios';

interface WeatherProps {}

const Weather: React.FC<WeatherProps> = () => {

  const [weather, setWeather] = useState<any | null>(null);
  const [city, setCity] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      setWeather(response.data)
      setError(null)
    } catch (err) {
      setWeather(null)
      setError('City not found.')
    }
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center max-w-[768px] mx-auto'>
      <h1 className='text-center text-6xl font-black m-20 '>Weather App</h1>
      <input
        type='text'
        placeholder='Enter City'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className='border-gray-600 border w-[400px] h-10 text-center rounded-lg focus:ring-blue-500 focus:border-blue-500'
      />
      <button
        onClick={getWeather}
        className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-5'
      >
        Get Weather
      </button>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temprature: {weather.main.temp} Celsius</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Weather;
