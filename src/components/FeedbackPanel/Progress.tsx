const Progress = () => {
  return (
    <div className="space-y-6">
      {/* Circular Progress */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#2D3748"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56 * 0.87} ${2 * Math.PI * 56}`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9C0" />
                <stop offset="100%" stopColor="#6C47FF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">87%</span>
          </div>
        </div>
        <div className="text-sm text-[#E8ECEF]/60">Overall Fluency</div>
      </div>

      {/* Skill Bars */}
      <div className="space-y-4">
        {[
          { skill: "Grammar", value: 92, color: "#F59E0B" },
          { skill: "Pronunciation", value: 78, color: "#3B82F6" },
          { skill: "Vocabulary", value: 85, color: "#10B981" },
          { skill: "Fluency", value: 90, color: "#00D9C0" },
        ].map((item) => (
          <div key={item.skill}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#E8ECEF]/80">{item.skill}</span>
              <span
                className="text-sm font-semibold"
                style={{ color: item.color }}
              >
                {item.value}%
              </span>
            </div>
            <div className="h-2 bg-[#2D3748] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${item.value}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
