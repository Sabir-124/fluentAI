// src/components/Dashboard/CurrentStreakCard.tsx
import { useDashboard } from "@/context/DashboardContext";

const CurrentStreakCard = () => {
  const { data, loading } = useDashboard();

  // Calculate streak from recent sessions
  const calculateStreak = (): number => {
    if (!data?.recentSessions || data.recentSessions.length === 0) return 0;

    const sortedSessions = [...data.recentSessions]
      .filter((s) => s.endTime)
      .sort(
        (a, b) =>
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
      );

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedSessions.length; i++) {
      const sessionDate = new Date(sortedSessions[i].startTime);
      sessionDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const currentStreak = calculateStreak();
  const daysToMilestone = 30 - currentStreak;
  const progressPercentage = (currentStreak / 30) * 100;

  if (loading) {
    return (
      <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 animate-pulse">
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">🔥</div>
          <div className="h-12 bg-[#2D3748] rounded w-20 mx-auto mb-2" />
          <div className="h-4 bg-[#2D3748] rounded w-24 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6">
      <div className="text-center mb-4">
        <div className="text-6xl mb-2">🔥</div>
        <div className="text-5xl font-bold mb-1">{currentStreak}</div>
        <div className="text-sm text-[#E8ECEF]/60">Day Streak</div>
      </div>
      <div className="h-2 bg-[#2D3748] rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-linear-to-r from-[#F59E0B] to-[#EF4444] rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-xs text-center text-[#E8ECEF]/50">
        {daysToMilestone > 0
          ? `${daysToMilestone} more days to reach 30-day milestone!`
          : "🎉 You've reached the 30-day milestone!"}
      </p>
    </div>
  );
};

export default CurrentStreakCard;
