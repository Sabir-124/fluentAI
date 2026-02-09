// src/components/ControlPanel/LevelSelector.tsx
import { useEffect, useState } from "react";

interface LevelSelectorProps {
  value: string;
  onChange: (level: string) => void;
  disabled?: boolean;
}
const getLevels = async () => {
  const data = await fetch("http://localhost:5002/api/difficulty-levels");
  const result = await data.json();
  return result.levels;
};
interface level{
  code:string,
  name:string,
  description:string
}
const levels = await getLevels();
const LevelSelector = ({ value, onChange, disabled }: LevelSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">
        Difficulty
      </label>
      <div className="flex gap-2">
        {levels.map((level:level,idx:number) => (
          <button
            key={idx}
            onClick={() => onChange(level.name)}
            disabled={disabled}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              level.code === value
                ? "bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] text-white"
                : "bg-[#2D3748] text-[#E8ECEF]/70 hover:bg-[#2D3748]/70"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {level.name.slice(0, 3)}
          </button>
        ))}
      </div>
      {disabled && (
        <p className="text-xs text-[#E8ECEF]/40 mt-1">
          Cannot change during active session
        </p>
      )}
    </div>
  );
};

export default LevelSelector;
