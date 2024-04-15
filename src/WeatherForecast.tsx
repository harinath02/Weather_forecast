import React, { useState, useEffect } from "react";
import LargeCard from "./LargeCard";

interface WeatherData {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    feels_like:number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

const API_KEY = process.env.REACT_APP_API_KEY



interface ForeCastProps {
  city:string
}

const WeatherForecast:React.FC<ForeCastProps> = ({ city }) => {
  const [forecastData, setForecastData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch forecast data");
        }
        const data = await response.json();
        const filteredData: WeatherData[] = data.list.filter(
          (item: any) => item.dt_txt.includes("12:00:00")
        );
        setForecastData(filteredData);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [city]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (<> 
    <div className="text-gray-150 p-10 flex-grow">
      <h3 className="text-2xl font-bold mb-5">5-Day Weather Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 justify-center">
        {forecastData.map((forecast, index) => (
          <LargeCard
            key={index}
            title={new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
              weekday: "long",
            })}
            num={`${Math.round((forecast.main.temp))}°C`}
            min={Math.round((forecast.main.temp_min))}
            max={Math.round((forecast.main.temp_max))}
            desc={forecast.weather[0].description}
          >
            <div className="mx-4 py-4">
              <img
                src={`/images/${forecast.weather[0].description}.svg`}
                alt={forecast.weather[0].description}
                className="w-20 h-20 m-8"
              />
              <p className="text-gray-150 font-bold">Wind Speed: {forecast.wind.speed} m/s</p>
              <p className="text-gray-150 font-bold">Humidity: {forecast.main.humidity}%</p>
              <p className="text-gray-150 font-bold">Pressure: {forecast.main.pressure} hPa</p>
              <p className="text-gray-150 font-bold">Feels like: {forecast.main.feels_like} °C</p>
            </div>
          </LargeCard>
        ))}
      </div>
    </div></>
  );
};

export default WeatherForecast;
