import React from 'react'
import WeatherForecast from "./WeatherForecast";
import SearchLocation from "./SearchLocation";
import MainContent from "./MainContent";
import { useParams } from "react-router-dom";

export default function Home() {
    const { city } = useParams<{ city: string }>(); 
  return (
    <>
    <div className="bg-[#100E1D] flex flex-col lg:flex-row">
        <SearchLocation onClose={function (): void {
          throw new Error("Function not implemented.");
        } }></SearchLocation>
      {city ?   <MainContent city={city}/> :  <MainContent city="Lucknow" />}
      </div>
      <div className="bg-[#100E1D] flex flex-col lg:flex-row">
      {city ? <WeatherForecast city={city} /> : <WeatherForecast city='Lucknow'/>}
      </div>
     
      </>
  )
}
