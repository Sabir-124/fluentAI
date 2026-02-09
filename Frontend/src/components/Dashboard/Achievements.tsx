import { Award } from "lucide-react";

// Recent achievements
const achievements = [
  { name: "First Week", date: "2 days ago", color: "#10B981" },
  { name: "Quick Learner", date: "5 days ago", color: "#F59E0B" },
  { name: "Pronunciation Pro", date: "1 week ago", color: "#3B82F6" },
];

const Achievements = () => {
  return (
    <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Recent Achievements</h3>
      <div className="space-y-3">
        {achievements.map((achievement, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${achievement.color}20` }}
            >
              <Award size={20} style={{ color: achievement.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{achievement.name}</div>
              <div className="text-xs text-[#E8ECEF]/50">
                {achievement.date}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-sm text-[#6C47FF] hover:text-[#FF6B9D] transition-colors font-medium">
        View All Achievements
      </button>
    </div>
  );
};

export default Achievements;
