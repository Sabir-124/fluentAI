// src/components/Dashboard/RecentSessions.tsx
import { ChevronRight, MessageSquare } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { useNavigate } from "react-router-dom";

const getLanguageFlag = (language: string): string => {
  const flags: Record<string, string> = {
    spanish: "🇪🇸",
    french: "🇫🇷",
    german: "🇩🇪",
    italian: "🇮🇹",
    portuguese: "🇵🇹",
    japanese: "🇯🇵",
    chinese: "🇨🇳",
    korean: "🇰🇷",
    russian: "🇷🇺",
    arabic: "🇸🇦",
    hindi: "🇮🇳",
    english: "🇬🇧",
  };
  return flags[language.toLowerCase()] || "🌐";
};

const getLanguageName = (language: string): string => {
  const names: Record<string, string> = {
    spanish: "Spanish",
    french: "French",
    german: "German",
    italian: "Italian",
    portuguese: "Portuguese",
    japanese: "Japanese",
    chinese: "Chinese",
    korean: "Korean",
    russian: "Russian",
    arabic: "Arabic",
    hindi: "Hindi",
    english: "English",
  };
  return names[language.toLowerCase()] || language;
};

const getScenarioName = (scenario: string): string => {
  return scenario.charAt(0).toUpperCase() + scenario.slice(1);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `Today, ${displayHours}:${displayMinutes} ${ampm}`;
  } else if (diffDays === 1) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `Yesterday, ${displayHours}:${displayMinutes} ${ampm}`;
  } else {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} ${date.getHours() >= 12 ? "PM" : "AM"}`;
  }
};

const formatDuration = (milliseconds: number | null): string => {
  if (!milliseconds) return "0 min";

  const totalMinutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
};

const calculateFluencyScore = (
  messageCount: number,
  corrections: number,
): number => {
  if (messageCount === 0) return 0;
  const userMessages = Math.floor(messageCount / 2);
  if (userMessages === 0) return 0;
  const accuracy = Math.max(0, 100 - (corrections / userMessages) * 100);
  return Math.round(accuracy);
};

const getGradientForIndex = (index: number): string => {
  const gradients = [
    "from-[#6C47FF] to-[#FF6B9D]",
    "from-[#00D9C0] to-[#10B981]",
    "from-[#FF6B9D] to-[#6C47FF]",
    "from-[#F59E0B] to-[#EF4444]",
    "from-[#3B82F6] to-[#8B5CF6]",
  ];
  return gradients[index % gradients.length];
};

const RecentSessions = () => {
  const { data, loading } = useDashboard();
  const navigate = useNavigate();

  const recentSessions =
    data?.recentSessions?.filter((s) => s.endTime)?.slice(0, 5) || [];

  const handleViewDetails = (sessionId: string) => {
    navigate(`/session/${sessionId}`);
  };

  const handlePracticeAgain = (session: any) => {
    navigate("/conversation", {
      state: {
        language: session.language,
        difficulty: session.difficulty,
        scenario: session.scenario,
      },
    });
  };

  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Sessions</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 animate-pulse"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-[#2D3748]" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-[#2D3748] rounded w-1/3" />
                  <div className="h-4 bg-[#2D3748] rounded w-1/4" />
                  <div className="h-3 bg-[#2D3748] rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (recentSessions.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Sessions</h2>
        </div>
        <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-12 text-center">
          <MessageSquare size={48} className="mx-auto mb-4 text-[#6C47FF]/50" />
          <h3 className="text-xl font-semibold mb-2">No sessions yet</h3>
          <p className="text-[#E8ECEF]/60 mb-6">
            Start your first conversation to begin learning!
          </p>
          <button
            onClick={() => navigate("/conversation")}
            className="px-6 py-3 bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Start Learning
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Sessions</h2>
        <button
          onClick={() => navigate("/sessions")}
          className="text-[#6C47FF] hover:text-[#FF6B9D] transition-colors text-sm font-medium flex items-center gap-1"
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {recentSessions.map((session, index) => {
          const wordsSpoken = Math.floor(session.messageCount / 2) * 12; // Estimate
          const corrections = session.corrections?.length || 0;
          const fluencyScore = calculateFluencyScore(
            session.messageCount,
            corrections,
          );

          return (
            <div
              key={session.id}
              className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all"
            >
              <div className="flex items-center gap-6 flex-wrap">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-linear-to-r ${getGradientForIndex(index)} flex items-center justify-center shrink-0`}
                >
                  <MessageSquare size={28} />
                </div>

                {/* Session Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">
                    {getLanguageFlag(session.language)}{" "}
                    {getLanguageName(session.language)} -{" "}
                    {getScenarioName(session.scenario)}
                  </h3>
                  <p className="text-sm text-[#E8ECEF]/60">
                    {formatDate(session.startTime)} •{" "}
                    {formatDuration(session.duration)}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                    <span className="text-[#E8ECEF]/50">
                      {wordsSpoken} words
                    </span>
                    <span className="text-[#F59E0B]">
                      {corrections} corrections
                    </span>
                    <span className="text-[#10B981] font-semibold">
                      {fluencyScore}% accuracy
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleViewDetails(session.id)}
                    className="px-4 py-2 bg-[#2D3748] hover:bg-[#6C47FF] rounded-lg text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handlePracticeAgain(session)}
                    className="px-4 py-2 bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] hover:scale-105 rounded-lg text-sm font-medium transition-transform"
                  >
                    Practice Again
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentSessions;
