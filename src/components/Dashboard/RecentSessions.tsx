import { ChevronRight, MessageSquare } from "lucide-react";

// Recent sessions data
const recentSessions = [
  {
    id: 1,
    language: "🇪🇸 Spanish",
    scenario: "Restaurant",
    date: "Today, 10:30 AM",
    duration: "15 min",
    wordsSpoken: 142,
    corrections: 8,
    fluencyScore: 87,
    gradient: "from-[#6C47FF] to-[#FF6B9D]",
  },
  {
    id: 2,
    language: "🇫🇷 French",
    scenario: "Travel",
    date: "Yesterday, 4:20 PM",
    duration: "12 min",
    wordsSpoken: 98,
    corrections: 12,
    fluencyScore: 72,
    gradient: "from-[#00D9C0] to-[#10B981]",
  },
  {
    id: 3,
    language: "🇪🇸 Spanish",
    scenario: "Shopping",
    date: "Feb 5, 2:15 PM",
    duration: "18 min",
    wordsSpoken: 156,
    corrections: 6,
    fluencyScore: 91,
    gradient: "from-[#FF6B9D] to-[#6C47FF]",
  },
];

const RecentSessions = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Sessions</h2>
        <a
          href="#"
          className="text-[#6C47FF] hover:text-[#FF6B9D] transition-colors text-sm font-medium flex items-center gap-1"
        >
          View All <ChevronRight size={16} />
        </a>
      </div>

      <div className="space-y-4">
        {recentSessions.map((session) => (
          <div
            key={session.id}
            className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all"
          >
            <div className="flex items-center gap-6">
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-xl bg-linear-to-r ${session.gradient} flex items-center justify-center shrink-0`}
              >
                <MessageSquare size={28} />
              </div>

              {/* Session Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1">
                  {session.language} - {session.scenario}
                </h3>
                <p className="text-sm text-[#E8ECEF]/60">
                  {session.date} • {session.duration}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="text-[#E8ECEF]/50">
                    {session.wordsSpoken} words
                  </span>
                  <span className="text-[#F59E0B]">
                    {session.corrections} corrections
                  </span>
                  <span className="text-[#10B981] font-semibold">
                    {session.fluencyScore}% fluency
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 shrink-0">
                <button className="px-4 py-2 bg-[#2D3748] hover:bg-[#6C47FF] rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] hover:scale-105 rounded-lg text-sm font-medium transition-transform">
                  Practice Again
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentSessions;
