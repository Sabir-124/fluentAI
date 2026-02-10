// src/pages/AllSessions.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import {
  ArrowLeft,
  Calendar,
  Filter,
  MessageSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface Session {
  id: string;
  language: string;
  difficulty: string;
  scenario: string;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  messageCount: number;
  active: boolean;
  corrections: any[];
}

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
  };
  return flags[language.toLowerCase()] || "🌐";
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

const formatDuration = (milliseconds: number | null): string => {
  if (!milliseconds) return "0 min";
  const totalMinutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes} min`;
};

export default function AllSessions() {
  const navigate = useNavigate();
  const api = useApi();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLanguage, setFilterLanguage] = useState<string>("all");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  useEffect(() => {
    loadAllSessions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [sessions, searchQuery, filterLanguage, filterDifficulty, showActiveOnly]);

  const loadAllSessions = async () => {
    try {
      setLoading(true);
      const response = await api.getSessions({ limit: 100 });

      if (response.success) {
        const sessionData =
          response.sessions?.combined ||
          response.sessions ||
          response.data ||
          [];
        setSessions(sessionData);
      } else {
        toast.error("Failed to load sessions");
      }
    } catch (error: any) {
      console.error("Error loading sessions:", error);
      toast.error(error.message || "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...sessions];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.scenario.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Language filter
    if (filterLanguage !== "all") {
      filtered = filtered.filter((s) => s.language === filterLanguage);
    }

    // Difficulty filter
    if (filterDifficulty !== "all") {
      filtered = filtered.filter((s) => s.difficulty === filterDifficulty);
    }

    // Active filter
    if (showActiveOnly) {
      filtered = filtered.filter((s) => s.active);
    } else {
      filtered = filtered.filter((s) => s.endTime); // Only completed sessions
    }

    setFilteredSessions(filtered);
  };

  const uniqueLanguages = Array.from(new Set(sessions.map((s) => s.language)));
  const uniqueDifficulties = Array.from(
    new Set(sessions.map((s) => s.difficulty)),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1419] text-white pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#1A1F2E] rounded w-1/4" />
            <div className="h-16 bg-[#1A1F2E] rounded" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-32 bg-[#1A1F2E] rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1419] text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-[#E8ECEF]/70 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold">All Sessions</h1>
            <p className="text-[#E8ECEF]/60 mt-2">
              {filteredSessions.length} session
              {filteredSessions.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8ECEF]/40"
              />
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0F1419] border border-white/10 rounded-lg focus:outline-none focus:border-[#6C47FF] transition-colors"
              />
            </div>

            {/* Language Filter */}
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="px-4 py-3 bg-[#0F1419] border border-white/10 rounded-lg focus:outline-none focus:border-[#6C47FF] transition-colors"
            >
              <option value="all">All Languages</option>
              {uniqueLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {getLanguageFlag(lang)}{" "}
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-4 py-3 bg-[#0F1419] border border-white/10 rounded-lg focus:outline-none focus:border-[#6C47FF] transition-colors"
            >
              <option value="all">All Levels</option>
              {uniqueDifficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
              ))}
            </select>

            {/* Active Sessions Toggle */}
            <label className="flex items-center gap-3 px-4 py-3 bg-[#0F1419] border border-white/10 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={showActiveOnly}
                onChange={(e) => setShowActiveOnly(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-[#1A1F2E] checked:bg-[#6C47FF]"
              />
              <span className="text-sm">Active Only</span>
            </label>
          </div>
        </div>

        {/* Sessions List */}
        {filteredSessions.length === 0 ? (
          <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-12 text-center">
            <Filter size={48} className="mx-auto mb-4 text-[#E8ECEF]/30" />
            <h3 className="text-xl font-semibold mb-2">No sessions found</h3>
            <p className="text-[#E8ECEF]/60">
              Try adjusting your filters or start a new conversation
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSessions.map((session) => {
              const fluencyScore =
                session.messageCount > 0
                  ? Math.max(
                      0,
                      100 -
                        ((session.corrections?.length || 0) /
                          Math.floor(session.messageCount / 2)) *
                          100,
                    )
                  : 0;

              return (
                <div
                  key={session.id}
                  className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Session Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2">
                        {getLanguageFlag(session.language)}{" "}
                        {session.language.charAt(0).toUpperCase() +
                          session.language.slice(1)}{" "}
                        -{" "}
                        {session.scenario.charAt(0).toUpperCase() +
                          session.scenario.slice(1)}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-[#E8ECEF]/60 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(session.startTime)}
                        </span>
                        <span>•</span>
                        <span>{formatDuration(session.duration)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={14} />
                          {session.messageCount} messages
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <TrendingUp size={14} />
                          {Math.round(fluencyScore)}% accuracy
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-[#6C47FF]/20 text-[#6C47FF] rounded-full text-xs font-semibold">
                          {session.difficulty.charAt(0).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                        {session.active && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                            Active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/session/${session.id}`)}
                        className="px-4 py-2 bg-[#2D3748] hover:bg-[#6C47FF] rounded-lg text-sm font-medium transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() =>
                          navigate("/conversation", {
                            state: {
                              language: session.language,
                              difficulty: session.difficulty,
                              scenario: session.scenario,
                            },
                          })
                        }
                        className="px-4 py-2 bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] hover:scale-105 rounded-lg text-sm font-medium transition-transform"
                      >
                        Practice Again
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
