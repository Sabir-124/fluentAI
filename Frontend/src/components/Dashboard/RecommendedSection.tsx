// src/components/Dashboard/RecommendedSection.tsx
import { Target } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { useNavigate } from "react-router-dom";

const RecommendedSection = () => {
  const { data, loading } = useDashboard();
  const navigate = useNavigate();

  // Analyze corrections to generate recommendations
  const getRecommendations = () => {
    if (!data?.progress || data.progress.length === 0) {
      return [
        {
          title: "Start Your First Conversation",
          reason: "Begin your language learning journey",
          estimatedTime: "10-15 minutes",
          difficulty: "Beginner",
          action: () => navigate("/conversation"),
        },
      ];
    }

    const recommendations = [];

    // Check for common mistake patterns
    data.progress.forEach((progress) => {
      const patterns = progress.mistakePatterns || {};

      if (patterns.grammar && patterns.grammar > 5) {
        recommendations.push({
          title: `Practice ${progress.language.charAt(0).toUpperCase() + progress.language.slice(1)} Grammar`,
          reason: `You had ${patterns.grammar} grammar mistakes recently`,
          estimatedTime: "10-15 minutes",
          difficulty:
            progress.currentDifficulty.charAt(0).toUpperCase() +
            progress.currentDifficulty.slice(1),
          action: () =>
            navigate("/conversation", {
              state: {
                language: progress.language,
                difficulty: progress.currentDifficulty,
                scenario: "casual",
              },
            }),
        });
      }

      if (patterns.vocabulary && patterns.vocabulary > 3) {
        recommendations.push({
          title: "Expand Your Vocabulary",
          reason: `Review ${progress.vocabularyLearned?.length || 0} learned words`,
          estimatedTime: "8-10 minutes",
          difficulty:
            progress.currentDifficulty.charAt(0).toUpperCase() +
            progress.currentDifficulty.slice(1),
          action: () => navigate("/vocabulary"),
        });
      }
    });

    // If no specific recommendations, suggest continuing practice
    if (recommendations.length === 0) {
      recommendations.push({
        title: "Continue Your Practice",
        reason: "Keep building your language skills",
        estimatedTime: "15-20 minutes",
        difficulty: "Intermediate",
        action: () => navigate("/conversation"),
      });
    }

    return recommendations.slice(0, 2);
  };

  const recommendations = getRecommendations();

  if (loading) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 animate-pulse"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#2D3748]" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-[#2D3748] rounded w-3/4" />
                  <div className="h-4 bg-[#2D3748] rounded w-full" />
                  <div className="h-3 bg-[#2D3748] rounded w-1/2" />
                </div>
              </div>
              <div className="h-10 bg-[#2D3748] rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

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
            <button
              onClick={rec.action}
              className="w-full py-2 bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] rounded-lg text-sm font-semibold hover:scale-105 transition-transform"
            >
              Start Practice
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;
