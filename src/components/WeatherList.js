import React, { useState } from 'react';

const WeatherList = ({ weathers, onUpdateWeather, onDeleteWeather }) => {
  const [editingId, setEditingId] = useState(null);
  const [updatedWeather, setUpdatedWeather] = useState({
    location: '',
    temperature: '',
    windSpeed: '',
    cloud: '',
    date: '',
  });

  const handleEditClick = (id) => {
    setEditingId(id);

    const selectedWeather = weathers.find((weather) => weather.id === id);

    setUpdatedWeather({
      location: selectedWeather.location,
      temperature: selectedWeather.temperature.toString(),
      windSpeed: selectedWeather.windSpeed.toString(),
      cloud: selectedWeather.cloud.toString(),
      date: selectedWeather.date,
    });
  };

  const handleCancelEditClick = () => {
    setEditingId(null);
    setUpdatedWeather({
      location: '',
      temperature: '',
      windSpeed: '',
      cloud: '',
      date: '',
    });
  };

  const handleUpdateClick = (id) => {
    const updatedData = {
      ...updatedWeather,
      temperature: parseFloat(updatedWeather.temperature),
      windSpeed: parseFloat(updatedWeather.windSpeed),
      cloud: parseFloat(updatedWeather.cloud),
    };

    onUpdateWeather(id, updatedData);
    setEditingId(null);
    setUpdatedWeather({
      location: '',
      temperature: '',
      windSpeed: '',
      cloud: '',
      date: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedWeather((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Weather List</h2>
      <ul>
        {weathers.map((weather) => (
          <li key={weather.id}>
            {editingId === weather.id ? (
              <div>
                <strong>Location:</strong>
                <input type="text" name="location" value={updatedWeather.location} onChange={handleInputChange} />{' '}
                <strong>Temperature:</strong>
                <input type="text" name="temperature" value={updatedWeather.temperature} onChange={handleInputChange} />{' '}
                <strong>Wind Speed:</strong>
                <input type="text" name="windSpeed" value={updatedWeather.windSpeed} onChange={handleInputChange} />{' '}
                <strong>Cloud:</strong>
                <input type="text" name="cloud" value={updatedWeather.cloud} onChange={handleInputChange} />{' '}
                <strong>Date:</strong>
                <input type="text" name="date" value={updatedWeather.date} onChange={handleInputChange} />{' '}
                <button onClick={() => handleUpdateClick(weather.id)}>Save</button>{' '}
                <button onClick={handleCancelEditClick}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>Location:</strong> {weather.location} | <strong>Temperature:</strong> {weather.temperature} |{' '}
                <strong>Wind Speed:</strong> {weather.windSpeed} | <strong>Cloud:</strong> {weather.cloud} |{' '}
                <strong>Date:</strong> {new Date(weather.date).toLocaleString()}{' '}
                <button onClick={() => handleEditClick(weather.id)}>Edit</button>{' '}
                <button onClick={() => onDeleteWeather(weather.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherList;
