// src/components/FeedbackPanel/Progress.tsx
import { useConversation } from "@/store/useConversation";
import { TrendingUp, Award, Target } from "lucide-react";

const Progress = () => {
  const { accuracyScore, mistakePatterns, messageCount, corrections } =
    useConversation();

  const totalMistakes = Object.values(mistakePatterns).reduce(
    (a, b) => a + b,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Accuracy Score */}
      <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-[#E8ECEF]/60">Accuracy</span>
          <TrendingUp
            size={20}
            className={
              accuracyScore >= 80
                ? "text-[#10B981]"
                : accuracyScore >= 60
                  ? "text-[#F59E0B]"
                  : "text-[#EF4444]"
            }
          />
        </div>
        <div className="text-4xl font-bold text-white mb-2">
          {Math.round(accuracyScore)}%
        </div>
        <div className="w-full bg-[#2D3748] rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              accuracyScore >= 80
                ? "bg-gradient-to-r from-[#10B981] to-[#00D9C0]"
                : accuracyScore >= 60
                  ? "bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]"
                  : "bg-gradient-to-r from-[#EF4444] to-[#DC2626]"
            }`}
            style={{ width: `${accuracyScore}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#2D3748] rounded-lg p-4">
          <Target size={20} className="text-[#6C47FF] mb-2" />
          <div className="text-2xl font-bold text-white">{messageCount}</div>
          <div className="text-xs text-[#E8ECEF]/60">Messages</div>
        </div>

        <div className="bg-[#2D3748] rounded-lg p-4">
          <Award size={20} className="text-[#F59E0B] mb-2" />
          <div className="text-2xl font-bold text-white">
            {corrections.length}
          </div>
          <div className="text-xs text-[#E8ECEF]/60">Corrections</div>
        </div>
      </div>

      {/* Mistake Patterns */}
      {totalMistakes > 0 && (
        <div>
          <h3 className="text-sm font-medium text-[#E8ECEF]/70 mb-3">
            Areas to Improve
          </h3>
          <div className="space-y-2">
            {Object.entries(mistakePatterns)
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-[#E8ECEF]/80 capitalize">
                    {type}
                  </span>
                  <span className="text-sm font-medium text-[#6C47FF]">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
