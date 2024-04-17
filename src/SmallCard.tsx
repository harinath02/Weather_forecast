import React from "react";

interface SmallCardProps {
  dayTitle: string;
  img:
    | "Clear"
    | "Hail"
    | "HeavyCloud"
    | "HeavyRain"
    | "LightCloud"
    | "LightRain"
    | "Shower"
    | "Sleet"
    | "Snow"
    | "Thunderstorm";
  min: number;
  max: number;
  temp: string;
}

const SmallCard: React.FC<SmallCardProps> = ({
  dayTitle,
  img,
  min,
  max,
  temp,
}) => {
  return (
    <div className="bg-darkblue py-4 px-5 flex flex-col items-center space-y-4 rounded-2xl">
      <p className="text-white text-lg">{dayTitle}</p>
      <img src={`/images/${img}.svg`} alt="weather-icon" className="w-16 h-auto" />
      <div className="flex justify-between space-x-5">
        <p className="text-white">
          {max}&deg;{temp}
        </p>
        <p className="text-gray-250">
          {min}&deg;{temp}
        </p>
      </div>
    </div>
  );
};

export default SmallCard;
