// src/hooks/useUserData.ts
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as api from "../utils/api";

interface UserProgress {
  language: string;
  totalSessions: number;
  totalDuration: number;
  totalMessages: number;
  totalCorrections: number;
  averageAccuracy: number;
  currentDifficulty: string;
  vocabularyLearned: string[];
  mistakePatterns: Record<string, number>;
  lastSessionDate: string | null;
}

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
  conversationHistory: any[];
  corrections: any[];
}

interface Usage {
  geminiCallsToday: number;
  geminiCallsLimit: number;
  totalGeminiCalls: number;
  activeSessions: number;
  sessionLimit: number;
  totalSessions: number;
  lastActivity: string;
}

interface UserData {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
  } | null;
  usage: Usage | null;
  progress: UserProgress[];
  recentSessions: Session[];
  activeSessions: number;
}

export const useUserData = () => {
  const { getToken, isSignedIn } = useAuth();
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Sync user first
      await api.syncUser(getToken);

      // Fetch all user data in parallel
      const [meResponse, sessionsResponse, progressResponse] =
        await Promise.all([
          api.getMe(getToken),
          api.getSessions(getToken, { limit: 10 }),
          api.getProgress(getToken),
        ]);

      console.log("✅ User data fetched:", meResponse);

      setData({
        user: meResponse.user,
        usage: meResponse.usage?.combined || null,
        progress: progressResponse.progress || [],
        recentSessions: sessionsResponse.sessions?.combined || [],
        activeSessions: meResponse.activeSessions?.database || 0,
      });
    } catch (err: any) {
      console.error("❌ Error fetching user data:", err);
      setError(err.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isSignedIn]);

  return { data, loading, error, refetch: fetchUserData };
};
