// src/pages/SessionDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageSquare,
  TrendingUp,
  BookOpen,
  Award,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Correction {
  type: string;
  original: string;
  corrected: string;
  explanation: string;
  timestamp: string;
}

interface SessionData {
  id: string;
  language: string;
  difficulty: string;
  scenario: string;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  messageCount: number;
  active: boolean;
  conversationHistory: Message[];
  corrections: Correction[];
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
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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

export default function SessionDetails() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const api = useApi();

  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"conversation" | "corrections">(
    "conversation",
  );

  useEffect(() => {
    if (sessionId) {
      loadSessionDetails();
    }
  }, [sessionId]);

  const loadSessionDetails = async () => {
    try {
      setLoading(true);
      const response = await api.getSession(sessionId!);

      if (response.success) {
        setSession(response.session || response.data);
      } else {
        toast.error("Failed to load session details");
      }
    } catch (error: any) {
      console.error("Error loading session:", error);
      toast.error(error.message || "Failed to load session");
    } finally {
      setLoading(false);
    }
  };

  const handlePracticeAgain = () => {
    if (session) {
      navigate("/conversation", {
        state: {
          language: session.language,
          difficulty: session.difficulty,
          scenario: session.scenario,
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1419] text-white pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#1A1F2E] rounded w-1/3" />
            <div className="h-64 bg-[#1A1F2E] rounded" />
            <div className="h-96 bg-[#1A1F2E] rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0F1419] text-white pt-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <AlertCircle size={64} className="mx-auto mb-4 text-red-500" />
          <h1 className="text-3xl font-bold mb-4">Session Not Found</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-[#6C47FF] hover:bg-[#5A3DD9] rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#0F1419] text-white pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#E8ECEF]/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Session Header */}
        <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-8 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {getLanguageFlag(session.language)}{" "}
                {session.language.charAt(0).toUpperCase() +
                  session.language.slice(1)}{" "}
                -{" "}
                {session.scenario.charAt(0).toUpperCase() +
                  session.scenario.slice(1)}
              </h1>
              <p className="text-[#E8ECEF]/60">
                {session.difficulty.charAt(0).toUpperCase() +
                  session.difficulty.slice(1)}{" "}
                Level
              </p>
            </div>
            <button
              onClick={handlePracticeAgain}
              className="px-6 py-3 bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Practice Again
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#0F1419] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-[#6C47FF]" />
                <span className="text-sm text-[#E8ECEF]/60">Date</span>
              </div>
              <p className="font-semibold">{formatDate(session.startTime)}</p>
            </div>

            <div className="bg-[#0F1419] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-[#00D9C0]" />
                <span className="text-sm text-[#E8ECEF]/60">Duration</span>
              </div>
              <p className="font-semibold">
                {formatDuration(session.duration)}
              </p>
            </div>

            <div className="bg-[#0F1419] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={18} className="text-[#FF6B9D]" />
                <span className="text-sm text-[#E8ECEF]/60">Messages</span>
              </div>
              <p className="font-semibold">{session.messageCount}</p>
            </div>

            <div className="bg-[#0F1419] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-[#10B981]" />
                <span className="text-sm text-[#E8ECEF]/60">Accuracy</span>
              </div>
              <p className="font-semibold">{Math.round(fluencyScore)}%</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("conversation")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "conversation"
                ? "bg-[#6C47FF] text-white"
                : "bg-[#1A1F2E] text-[#E8ECEF]/60 hover:text-white"
            }`}
          >
            <MessageSquare size={18} className="inline mr-2" />
            Conversation ({session.conversationHistory?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("corrections")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "corrections"
                ? "bg-[#6C47FF] text-white"
                : "bg-[#1A1F2E] text-[#E8ECEF]/60 hover:text-white"
            }`}
          >
            <BookOpen size={18} className="inline mr-2" />
            Corrections ({session.corrections?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "conversation" && (
          <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MessageSquare size={24} className="text-[#6C47FF]" />
              Conversation History
            </h2>

            {session.conversationHistory &&
            session.conversationHistory.length > 0 ? (
              <div className="space-y-4">
                {session.conversationHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] text-white"
                          : "bg-[#0F1419] border border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold opacity-80">
                          {message.role === "user" ? "You" : "AI Tutor"}
                        </span>
                        <span className="text-xs opacity-60">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare
                  size={48}
                  className="mx-auto mb-4 text-[#E8ECEF]/30"
                />
                <p className="text-[#E8ECEF]/60">
                  No conversation history available
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "corrections" && (
          <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen size={24} className="text-[#F59E0B]" />
              Corrections & Feedback
            </h2>

            {session.corrections && session.corrections.length > 0 ? (
              <div className="space-y-4">
                {session.corrections.map((correction, index) => (
                  <div
                    key={index}
                    className="bg-[#0F1419] border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center shrink-0">
                        <Award size={18} className="text-[#F59E0B]" />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] rounded-full text-xs font-semibold mb-2">
                          {correction.type}
                        </span>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-[#E8ECEF]/60">
                              Original:
                            </span>
                            <p className="text-red-400 line-through">
                              {correction.original}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-[#E8ECEF]/60">
                              Corrected:
                            </span>
                            <p className="text-green-400 font-semibold">
                              {correction.corrected}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-[#E8ECEF]/60">
                              Explanation:
                            </span>
                            <p className="text-[#E8ECEF]/90">
                              {correction.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award size={48} className="mx-auto mb-4 text-[#E8ECEF]/30" />
                <p className="text-[#E8ECEF]/60">
                  No corrections needed - Great job! 🎉
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
