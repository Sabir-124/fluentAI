// src/components/ControlPanel/QuickStats.tsx
import { Award, MessageSquare, TrendingUp } from "lucide-react";
import { useConversation } from "@/store/useConversation";

const QuickStats = () => {
  const { messageCount, corrections, vocabularyLearned, accuracyScore } =
    useConversation();

  // Calculate words spoken (approximate from messages)
  const wordsSpoken = Math.floor(messageCount / 2) * 8; // Rough estimate

  const quickStats = [
    {
      icon: MessageSquare,
      iconColor: "#6C47FF",
      text: "Words Spoken",
      value: wordsSpoken,
      valueColor: "#00D9C0",
    },
    {
      icon: Award,
      iconColor: "#FF6B9D",
      text: "Corrections",
      value: corrections.length,
      valueColor: "#F59E0B",
    },
    {
      icon: TrendingUp,
      iconColor: "#10B981",
      text: "Accuracy",
      value: `${Math.round(accuracyScore)}%`,
      valueColor: "#10B981",
    },
  ];

  return (
    <div className="space-y-3">
      {quickStats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-[#2D3748] rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Icon size={16} style={{ color: stat.iconColor }} />
              <span className="text-sm text-[#E8ECEF]/70">{stat.text}</span>
            </div>
            <span
              className="font-bold tabular-nums"
              style={{ color: stat.valueColor }}
            >
              {stat.value}
            </span>
          </div>
        );
      })}

      {/* Vocabulary Count */}
      {vocabularyLearned.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-[#2D3748] rounded-lg border border-[#00D9C0]/20">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <span className="text-sm text-[#E8ECEF]/70">New Words</span>
          </div>
          <span className="font-bold text-[#00D9C0] tabular-nums">
            {vocabularyLearned.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default QuickStats;
