const DailyProgress = () => {
  return (
    <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Daily Goal</h3>
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-32 h-32 mb-3">
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
              stroke="url(#gradient-daily)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56 * 0.6} ${2 * Math.PI * 56}`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="gradient-daily"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00D9C0" />
                <stop offset="100%" stopColor="#6C47FF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">60%</span>
          </div>
        </div>
        <p className="text-sm text-center text-[#E8ECEF]/70 mb-1">
          Practice 20 minutes today
        </p>
        <p className="text-xs text-center text-[#00D9C0] font-semibold">
          12 minutes completed • 8 to go!
        </p>
      </div>
    </div>
  );
};

export default DailyProgress;
