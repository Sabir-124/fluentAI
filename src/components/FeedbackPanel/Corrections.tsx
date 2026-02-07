const corrections = [
  {
    type: "grammar",
    original: "I go to store yesterday",
    corrected: "I went to the store yesterday",
    explanation: 'Use past tense "went" for past actions',
    color: "#F59E0B",
  },
  {
    type: "pronunciation",
    word: "restaurant",
    ipa: "/ˈrestərɑːnt/",
    tip: "Emphasize the first syllable: RES-tuh-rahnt",
    color: "#3B82F6",
  },
  {
    type: "vocabulary",
    used: "big",
    better: "spacious, enormous, vast",
    context: "For describing rooms or spaces",
    color: "#10B981",
  },
];

const Corrections = () => {
  return (
    <div className="space-y-4">
      {corrections.map((correction, idx) => (
        <div
          key={idx}
          className="bg-[#2D3748] rounded-xl p-4 border-l-4"
          style={{ borderLeftColor: correction.color }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: correction.color }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: correction.color }}
            >
              {correction.type}
            </span>
          </div>

          {correction.type === "grammar" && (
            <>
              <div className="text-sm text-[#E8ECEF]/50 line-through mb-1">
                {correction.original}
              </div>
              <div className="text-sm text-[#10B981] font-medium mb-2">
                {correction.corrected}
              </div>
              <p className="text-xs text-[#E8ECEF]/70">
                {correction.explanation}
              </p>
            </>
          )}

          {correction.type === "pronunciation" && (
            <>
              <div className="text-lg font-bold mb-1">{correction.word}</div>
              <div className="text-sm text-[#3B82F6] mb-2">
                {correction.ipa}
              </div>
              <p className="text-xs text-[#E8ECEF]/70">{correction.tip}</p>
            </>
          )}

          {correction.type === "vocabulary" && (
            <>
              <div className="text-sm mb-1">
                <span className="text-[#E8ECEF]/50">Used: </span>
                <span className="font-medium">{correction.used}</span>
              </div>
              <div className="text-sm mb-2">
                <span className="text-[#E8ECEF]/50">Better: </span>
                <span className="text-[#10B981] font-medium">
                  {correction.better}
                </span>
              </div>
              <p className="text-xs text-[#E8ECEF]/70">{correction.context}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Corrections;
