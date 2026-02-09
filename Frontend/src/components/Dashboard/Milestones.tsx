// src/components/Dashboard/Milestones.tsx
import { BookOpen, Flame, MessageSquare } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

const Milestones = () => {
  const { data, loading } = useDashboard();

  // Calculate streak
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

  const totalSessions = data?.usage?.totalSessions || 0;
  const currentStreak = calculateStreak();
  const averageAccuracy = data?.progress?.length
    ? Math.round(
        data.progress.reduce((sum, p) => sum + (p.averageAccuracy || 0), 0) /
          data.progress.length,
      )
    : 0;

  const milestones = [
    {
      name: "100 Conversations",
      current: totalSessions,
      total: 100,
      icon: MessageSquare,
    },
    {
      name: "30-Day Streak",
      current: currentStreak,
      total: 30,
      icon: Flame,
    },
    {
      name: "Grammar Master",
      current: averageAccuracy,
      total: 100,
      icon: BookOpen,
    },
  ];

  if (loading) {
    return (
      <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-[#2D3748] rounded w-40 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-4 bg-[#2D3748] rounded w-32 mb-2" />
              <div className="h-1.5 bg-[#2D3748] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Upcoming Milestones</h3>
      <div className="space-y-4">
        {milestones.map((milestone, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <milestone.icon size={16} className="text-[#6C47FF]" />
                <span className="text-sm font-medium">{milestone.name}</span>
              </div>
              <span className="text-xs text-[#E8ECEF]/60">
                {milestone.current}/{milestone.total}
              </span>
            </div>
            <div className="h-1.5 bg-[#2D3748] rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#00D9C0] to-[#6C47FF] rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min((milestone.current / milestone.total) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Milestones;
