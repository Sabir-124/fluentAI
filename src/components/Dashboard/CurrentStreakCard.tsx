import { user } from "@/pages/DashBoard";

const CurrentStreakCard = () => {
  return (
    <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6">
      <div className="text-center mb-4">
        <div className="text-6xl mb-2">🔥</div>
        <div className="text-5xl font-bold mb-1">
          {user.stats.currentStreak}
        </div>
        <div className="text-sm text-[#E8ECEF]/60">Day Streak</div>
      </div>
      <div className="h-2 bg-[#2D3748] rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-linear-to-r from-[#F59E0B] to-[#EF4444] rounded-full"
          style={{ width: "23%" }}
        />
      </div>
      <p className="text-xs text-center text-[#E8ECEF]/50">
        23 more days to reach 30-day milestone!
      </p>
    </div>
  );
};

export default CurrentStreakCard;
