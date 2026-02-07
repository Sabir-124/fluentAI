import { usePreference } from "@/store/usePreferences";

const LevelSelector = () => {
  const { selectedLevel, setSelectedLevel } = usePreference();
  return (
    <div>
      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">
        Difficulty
      </label>
      <div className="flex gap-2">
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              level === selectedLevel
                ? "bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] text-white"
                : "bg-[#2D3748] text-[#E8ECEF]/70 hover:bg-[#2D3748]/70"
            }`}
          >
            {level.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
