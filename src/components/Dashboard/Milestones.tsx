import { BookOpen, Flame, MessageSquare } from "lucide-react";

// Milestones
const milestones = [
  { name: "100 Conversations", current: 87, total: 100, icon: MessageSquare },
  { name: "30-Day Streak", current: 7, total: 30, icon: Flame },
  { name: "Grammar Master", current: 82, total: 100, icon: BookOpen },
];

const Milestones = () => {
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
                  width: `${(milestone.current / milestone.total) * 100}%`,
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
