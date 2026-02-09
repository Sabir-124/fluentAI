// src/components/Dashboard/DailyProgress.tsx
import { useDashboard } from "@/context/DashboardContext";

const DailyProgress = () => {
  const { data, loading } = useDashboard();

  // Calculate today's practice time
  const calculateTodayPractice = (): number => {
    if (!data?.recentSessions) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySessions = data.recentSessions.filter((session) => {
      const sessionDate = new Date(session.startTime);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() === today.getTime() && session.duration;
    });

    const totalMilliseconds = todaySessions.reduce(
      (sum, session) => sum + (session.duration || 0),
      0,
    );
    return Math.floor(totalMilliseconds / 60000); // Convert to minutes
  };

  const dailyGoal = 20; // 20 minutes
  const minutesCompleted = calculateTodayPractice();
  const progressPercentage = Math.min(
    (minutesCompleted / dailyGoal) * 100,
    100,
  );
  const minutesRemaining = Math.max(dailyGoal - minutesCompleted, 0);

  if (loading) {
    return (
      <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-[#2D3748] rounded w-24 mb-4" />
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-[#2D3748] mb-3" />
          <div className="h-4 bg-[#2D3748] rounded w-40 mb-1" />
          <div className="h-3 bg-[#2D3748] rounded w-48" />
        </div>
      </div>
    );
  }

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
              strokeDasharray={`${2 * Math.PI * 56 * (progressPercentage / 100)} ${2 * Math.PI * 56}`}
              strokeLinecap="round"
              className="transition-all duration-500"
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
            <span className="text-3xl font-bold">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
        <p className="text-sm text-center text-[#E8ECEF]/70 mb-1">
          Practice {dailyGoal} minutes today
        </p>
        <p className="text-xs text-center text-[#00D9C0] font-semibold">
          {minutesCompleted} minutes completed
          {minutesRemaining > 0 && ` • ${minutesRemaining} to go!`}
          {minutesRemaining === 0 && " • Goal reached! 🎉"}
        </p>
      </div>
    </div>
  );
};

export default DailyProgress;
