import React, { useState, useEffect } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherList from './components/WeatherList';

function App() {
  const [weathers, setWeathers] = useState([]);

  useEffect(() => {
    getLatestWeather();
  }, []);

  const getLatestWeather = async () => {
    try {
      const response = await fetch('https://localhost:7096/weather/LastRecordedWeather');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setWeathers([data]);
    } catch (error) {
      console.error('Error fetching latest weather:', error);
    }
  };

  const getWeatherByCity = async (city) => {
    try {
      const response = await fetch(`https://localhost:7096/weather/GetCurrentWeatherAndSave/${city}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      getLatestWeather();
      setWeathers([...weathers, data]);
    } catch (error) {
      console.error('Error fetching weather by city:', error.message);
    }
  };

  const createWeather = async (newWeather) => {
    try {
      const response = await fetch('https://localhost:7096/weather/createWeather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWeather),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const createdData = await response.json();
      setWeathers((prevWeathers) => [...prevWeathers, createdData]);
    } catch (error) {
      console.error('Error creating weather:', error.message);
    }
  };
  
  const updateWeather = async (id, updatedWeather) => {
    try {
      const response = await fetch(`https://localhost:7096/weather/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWeather),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const updatedData = await response.json();
  
      setWeathers((prevWeathers) =>
        prevWeathers.map((weather) => (weather.id === id ? updatedData : weather))
      );
    } catch (error) {
      console.error('Error updating weather:', error.message);
    }
  };
  
  

  const deleteWeather = async (id) => {
    try {
      const response = await fetch(`https://localhost:7096/weather/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      getLatestWeather();
      setWeathers(weathers.filter((weather) => weather.id !== id));
    } catch (error) {
      console.error('Error deleting weather:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <WeatherForm onGetWeather={getWeatherByCity} onCreateWeather={createWeather} />
      <WeatherList weathers={weathers} onUpdateWeather={updateWeather} onDeleteWeather={deleteWeather} />
    </div>
  );
}

export default App;
