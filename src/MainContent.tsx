import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LargeCard from "./LargeCard";


interface WeatherData {
  dt: number;
  main: {
    feels_like: number;
   
    temp_max: number;
    temp_min: number;
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}


const API_KEY = process.env.REACT_APP_API_KEY

const celsiusToFahrenheit = (temp: number) => {
  return (temp * 9/5) + 32;
};
interface MainProps {
  city:string
}
const MainContent:React.FC<MainProps> = ({ city }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
 
  const handleToggleUnit = () => {
    setIsCelsius((prev) => !prev); // Toggle between Celsius and Fahrenheit
  };
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(API_URL).then((response)=> {
          setCurrentWeather(response.data);
          setLoading(false);
        }).catch((error)=>{ console.log("Error: ", error);
        setError(error.message);
        setLoading(false);
        })
       
      } catch (error:any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className='text-white text-center '>City Name is Incorrect</div>;
  }

  if (!currentWeather) {
    return <div>No weather data available</div>;
  }
  else{
  console.log(currentWeather.dt); 

  const date = new Date(currentWeather.dt * 1000); // Multiply by 1000 to convert to milliseconds
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

 
  console.log(weekday); 
}

  return (<>{currentWeather ?
    <div className="text-gray-150 p-10 flex-grow">
      <div className="space-x-3 text-right">
        <button onClick={handleToggleUnit} className={`bg-gray-150 rounded-full w-10 h-10 text-darkblue font-bold text-xl ${isCelsius ? 'bg-blue-500' : 'bg-gray-500'}} `}>
          &deg;{isCelsius ? "C" : "F" }
        </button>
      </div>
     
      <div className="grid grid-cols-2 md:grid-cols-2 gap-5 justify-center">
      <div className="my-5 gap-10 justify-center">
        <div className="bg-darkblue rounded-xl p-8 flex flex-col justify-between">
              <div className="mx-4">
                  <h4 className="text-white text-xl font-semibold">{new Date(currentWeather.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "long",
                })}</h4> {city}
                  <p className="text-gray-250"></p>
                   <p className="text-gray-250 text-3xl mt-4 mb-2">{isCelsius ? `${Math.round(currentWeather.main.temp)}°C` : `${Math.round(celsiusToFahrenheit(currentWeather.main.temp))}°F`}</p>
              {Math.round(currentWeather.main.temp_min) && Math.round(currentWeather.main.temp_max) && <p className="text-gray-250 font-bold">{isCelsius ? `${Math.round(currentWeather.main.temp_min)}° C / ${Math.round(currentWeather.main.temp_max)}° C` : `${Math.round(celsiusToFahrenheit(currentWeather.main.temp_min))}° F / ${Math.round(celsiusToFahrenheit(currentWeather.main.temp_max))}° F`}</p> }
  
              </div>
           
       </div>
       </div>
       <div className="my-5 gap-10 justify-center">
       <div className="bg-darkblue rounded-xl p-6 flex flex-col justify-between">
       <div className="mx-4 ">
               <span className='font-bold text-xl'> {currentWeather.weather[0].description.charAt(0).toUpperCase() + currentWeather.weather[0].description.slice(1).toLowerCase()}</span>
                  <img
                    src={`/images/${currentWeather.weather[0].description}.svg`}
                    alt={currentWeather.weather[0].description}
                    className="w-20 h-20"
                  />
                      <p className='text-gray-150 font-bold'>Feels like: {currentWeather.main.feels_like} °C</p>
              </div>
              </div>
      
    </div>
    </div>
    

      <div className="my-10">
        <h3 className="text-2xl font-bold mb-5">Today's Highlights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
          <LargeCard title="Wind Speed" num={`${(currentWeather.wind.speed).toFixed(2)} m/s`} desc="">
            <div className="flex justify-between space-x-5 items-center">
              <div className="bg-gray-500 rounded-full w-[30px] h-[30px] mx-4 flex items-center">
                <i className="fas fa-location-arrow"></i>
              </div>
            </div>
          </LargeCard>

          <LargeCard title="Humidity" num={`${currentWeather.main.humidity} %`} desc="">
            <div className="self-stretch text-gray-250 text-xs space-y-1">
              <div className="flex justify-between space-x-5 items-center px-1">
                <p>0</p>
                <p>50</p>
                <p>100</p>
              </div>
              <div className="w-full h-2 bg-gray-150 rounded-full overflow-hidden">
                <div
                  className="bg-[#FFEC65] h-2"
                  style={{ width: `${currentWeather.main.humidity}%` }}
                ></div>
              </div>
              <p className="text-right">%</p>
            </div>
          </LargeCard>

          <LargeCard title="Air Pressure" num={`${currentWeather.main.pressure} hPa`} desc="" />
          <LargeCard title="Dew Point" num={`${(Math.round(currentWeather.main.temp)).toFixed(2)} °C`} desc="" />
          <LargeCard title="Sunrise Time" num={`${new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString()}`} desc="">
            <img src='/images/sunrise.svg' alt="Sunrise" className="w-12 h-12" />
          </LargeCard>

         <LargeCard title="Sunset Time" num={`${new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString()}`} desc="">
            <img src='/images/sunset.svg' alt="Sunset" className="w-12 h-12" />
          </LargeCard>

        </div>
      </div>
    </div>
    : <h1> City Not Found</h1>}
    </>
  );
};

export default MainContent;
