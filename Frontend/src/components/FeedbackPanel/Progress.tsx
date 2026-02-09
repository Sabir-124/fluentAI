// src/components/FeedbackPanel/Progress.tsx
import { useConversation } from "@/store/useConversation";

const Progress = () => {
  const { accuracyScore, mistakePatterns, vocabularyLearned, messageCount } =
    useConversation();

  // Calculate individual skill scores based on corrections
  const calculateSkillScores = () => {
    const grammarErrors = mistakePatterns["grammar"] || 0;
    const vocabErrors = mistakePatterns["vocabulary"] || 0;
    const pronunciationErrors = mistakePatterns["pronunciation"] || 0;
    const phrasingErrors = mistakePatterns["phrasing"] || 0;

    const totalMessages = Math.max(messageCount / 2, 1); // Divide by 2 for user messages

    return {
      grammar: Math.max(
        0,
        Math.min(100, 100 - (grammarErrors / totalMessages) * 100),
      ),
      pronunciation: Math.max(
        0,
        Math.min(100, 100 - (pronunciationErrors / totalMessages) * 100),
      ),
      vocabulary: Math.max(
        0,
        Math.min(100, 100 - (vocabErrors / totalMessages) * 100),
      ),
      fluency: Math.max(
        0,
        Math.min(100, 100 - (phrasingErrors / totalMessages) * 100),
      ),
    };
  };

  const skillScores = calculateSkillScores();
  const overallScore = Math.round(
    (skillScores.grammar +
      skillScores.pronunciation +
      skillScores.vocabulary +
      skillScores.fluency) /
      4,
  );

  return (
    <div className="space-y-6">
      {/* Circular Progress */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#2D3748"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56 * (overallScore / 100)} ${2 * Math.PI * 56}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9C0" />
                <stop offset="100%" stopColor="#6C47FF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">{overallScore}%</span>
          </div>
        </div>
        <div className="text-sm text-[#E8ECEF]/60">Overall Fluency</div>
      </div>

      {/* Skill Bars */}
      <div className="space-y-4">
        {[
          {
            skill: "Grammar",
            value: Math.round(skillScores.grammar),
            color: "#F59E0B",
          },
          {
            skill: "Pronunciation",
            value: Math.round(skillScores.pronunciation),
            color: "#3B82F6",
          },
          {
            skill: "Vocabulary",
            value: Math.round(skillScores.vocabulary),
            color: "#10B981",
          },
          {
            skill: "Fluency",
            value: Math.round(skillScores.fluency),
            color: "#00D9C0",
          },
        ].map((item) => (
          <div key={item.skill}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#E8ECEF]/80">{item.skill}</span>
              <span
                className="text-sm font-semibold"
                style={{ color: item.color }}
              >
                {item.value}%
              </span>
            </div>
            <div className="h-2 bg-[#2D3748] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${item.value}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#00D9C0]">
            {vocabularyLearned.length}
          </div>
          <div className="text-xs text-[#E8ECEF]/60">Words Learned</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#6C47FF]">
            {Math.floor(messageCount / 2)}
          </div>
          <div className="text-xs text-[#E8ECEF]/60">Messages Sent</div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
