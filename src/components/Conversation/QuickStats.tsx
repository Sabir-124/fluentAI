import { Award, MessageSquare, TrendingUp } from "lucide-react";

const quickStats = [
  {
    icon: MessageSquare,
    iconColor: "#6C47FF",
    text: "Words Spoken",
    value: 142,
    valueColor: "#00D9C0",
  },
  {
    icon: Award,
    iconColor: "#FF6B9D",
    text: "Corrections",
    value: 3,
    valueColor: "#F59E0B",
  },
  {
    icon: TrendingUp,
    iconColor: "#10B981",
    text: "Fluency",
    value: "87%",
    valueColor: "#10B981",
  },
];

const QuickStats = () => {
  return (
    <div className="space-y-3">
      {quickStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div className="flex items-center justify-between p-3 bg-[#2D3748] rounded-lg">
            <div className="flex items-center gap-2">
              <Icon size={16} style={{ color: stat.iconColor }} />
              <span className="text-sm text-[#E8ECEF]/70">{stat.text}</span>
            </div>
            <span className="font-bold" style={{ color: stat.valueColor }}>
              {stat.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;
