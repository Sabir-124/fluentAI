// src/components/FeedbackPanel/Corrections.tsx
import { useConversation } from "@/store/useConversation";

const Corrections = () => {
  const { corrections } = useConversation();

  if (corrections.length === 0) {
    return (
      <div className="text-center text-[#E8ECEF]/50 py-8">
        <p>No corrections yet!</p>
        <p className="text-sm mt-2">Start speaking to get feedback</p>
      </div>
    );
  }

  const getColorByType = (type: string) => {
    const colors: Record<string, string> = {
      grammar: "#F59E0B",
      pronunciation: "#3B82F6",
      vocabulary: "#10B981",
      cultural: "#8B5CF6",
      phrasing: "#EC4899",
    };
    return colors[type] || "#6B7280";
  };

  return (
    <div className="space-y-4">
      {corrections.map((correction, idx) => (
        <div
          key={idx}
          className="bg-[#2D3748] rounded-xl p-4 border-l-4"
          style={{ borderLeftColor: getColorByType(correction.type) }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getColorByType(correction.type) }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: getColorByType(correction.type) }}
            >
              {correction.type}
            </span>
            <span className="ml-auto text-xs text-[#E8ECEF]/40">
              {new Date(correction.timestamp).toLocaleTimeString()}
            </span>
          </div>

          <div className="text-sm text-[#E8ECEF]/50 line-through mb-1">
            {correction.original}
          </div>

          {correction.corrected && (
            <div className="text-sm text-[#10B981] font-medium mb-2">
              {correction.corrected}
            </div>
          )}

          <p className="text-xs text-[#E8ECEF]/70">{correction.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default Corrections;
