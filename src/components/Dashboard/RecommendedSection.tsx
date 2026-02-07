import { Target } from "lucide-react";

// Recommended practice
const recommendations = [
  {
    title: "Practice Past Tense Verbs",
    reason: "You had 5 past tense mistakes yesterday",
    estimatedTime: "10-15 minutes",
    difficulty: "Intermediate",
  },
  {
    title: "Pronunciation: Rolling Rs",
    reason: "Improve your Spanish pronunciation",
    estimatedTime: "8-10 minutes",
    difficulty: "Beginner",
  },
];

const RecommendedSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-linear-to-r from-[#00D9C0] to-[#6C47FF] flex items-center justify-center shrink-0">
                <Target size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{rec.title}</h3>
                <p className="text-sm text-[#E8ECEF]/70 mb-3">{rec.reason}</p>
                <div className="flex items-center gap-3 text-xs text-[#E8ECEF]/50">
                  <span>⏱️ {rec.estimatedTime}</span>
                  <span>•</span>
                  <span>{rec.difficulty}</span>
                </div>
              </div>
            </div>
            <button className="w-full py-2 bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] rounded-lg text-sm font-semibold hover:scale-105 transition-transform">
              Start Practice
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;
