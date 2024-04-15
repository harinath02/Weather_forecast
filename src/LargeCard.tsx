// LargeCard.tsx
import React from "react";

interface LargeCardProps {
  title: string;
  num: string;
  desc: string;
  min?: number; // Add min prop
  max?: number; // Add max prop
  children?: React.ReactNode;
}

const LargeCard: React.FC<LargeCardProps> = ({ title, num, desc, min, max, children }) => {
  return (
    <div className="bg-darkblue rounded-xl p-6 flex flex-col justify-between">
      <div className="mx-4">
        <h4 className="text-white text-xl font-semibold">{title}</h4>
        <p className="text-gray-250">{desc}</p>
        <p className="text-gray-250 text-3xl mt-4 mb-2">{num}</p>
        {min && max && <p className="text-gray-250 font-bold">{`${min}° C / ${max}°`} C</p>} {/* Display min/max if provided */}
      </div>
      {children}
    </div>
  );
};

export default LargeCard;
