// src/components/FeedbackPanel/Context.tsx
import { useConversation } from "@/store/useConversation";
import { Lightbulb } from "lucide-react";

const Context = () => {
  const { culturalTips, vocabularyLearned } = useConversation();

  return (
    <div className="space-y-6">
      {/* Cultural Tips */}
      <div>
        <h3 className="text-sm font-medium text-[#E8ECEF]/70 mb-3 flex items-center gap-2">
          <Lightbulb size={16} className="text-[#F59E0B]" />
          Cultural Insights
        </h3>

        {culturalTips.length === 0 ? (
          <p className="text-xs text-[#E8ECEF]/40">
            Cultural tips will appear here during your conversation
          </p>
        ) : (
          <div className="space-y-2">
            {culturalTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-[#2D3748] rounded-lg p-3 border border-[#F59E0B]/20"
              >
                <p className="text-sm text-[#E8ECEF]/80">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vocabulary */}
      <div>
        <h3 className="text-sm font-medium text-[#E8ECEF]/70 mb-3">
          Vocabulary Learned
        </h3>

        {vocabularyLearned.length === 0 ? (
          <p className="text-xs text-[#E8ECEF]/40">
            New words you learn will be saved here
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {vocabularyLearned.map((word, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gradient-to-r from-[#6C47FF]/20 to-[#00D9C0]/20 rounded-full text-xs text-[#00D9C0] border border-[#00D9C0]/30"
              >
                {word}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Context;
