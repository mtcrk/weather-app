import React, { useState } from 'react';

const WeatherForm = ({ onGetWeather }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGetWeather(city);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default WeatherForm;
