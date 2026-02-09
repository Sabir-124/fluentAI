import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";
import * as api from "../utils/api";

/**
 * Custom hook for authenticated API calls
 * Automatically includes Clerk token in all requests
 */
export function useApi() {
  const { getToken } = useAuth();

  // User & Auth endpoints
  const verifyToken = useCallback(async () => {
    return api.verifyToken(getToken);
  }, [getToken]);

  const getMe = useCallback(async () => {
    return api.getMe(getToken);
  }, [getToken]);

  const getUsage = useCallback(async () => {
    return api.getUsage(getToken);
  }, [getToken]);

  const getProgress = useCallback(async () => {
    return api.getProgress(getToken);
  }, [getToken]);

  const getSessions = useCallback(
    async (params?: { active?: boolean; limit?: number }) => {
      return api.getSessions(getToken, params);
    },
    [getToken],
  );

  const getCorrections = useCallback(
    async (params?: { type?: string; limit?: number }) => {
      return api.getCorrections(getToken, params);
    },
    [getToken],
  );

  // Corrections endpoints
  const getFeedback = useCallback(
    async (data: {
      text: string;
      language: string;
      difficulty: string;
      scenario: string;
      sessionId?: string;
    }) => {
      return api.getFeedback(getToken, data);
    },
    [getToken],
  );

  const getCulturalContext = useCallback(
    async (data: { phrase: string; language: string; scenario: string }) => {
      return api.getCulturalContext(getToken, data);
    },
    [getToken],
  );

  const getPhrasingSuggestions = useCallback(
    async (data: { text: string; context: string; language: string }) => {
      return api.getPhrasingSuggestions(getToken, data);
    },
    [getToken],
  );

  // Progress endpoints
  const getSessionSummary = useCallback(
    async (sessionId: string) => {
      return api.getSessionSummary(sessionId, getToken);
    },
    [getToken],
  );

  const getUserProgressDetailed = useCallback(
    async (userId: string) => {
      return api.getUserProgressDetailed(userId, getToken);
    },
    [getToken],
  );

  // Public endpoints (no auth needed)
  const getLanguages = useCallback(async () => {
    return api.getLanguages();
  }, []);

  const getScenarios = useCallback(async () => {
    return api.getScenarios();
  }, []);

  const getDifficultyLevels = useCallback(async () => {
    return api.getDifficultyLevels();
  }, []);

  const getLanguageTips = useCallback(async (language: string) => {
    return api.getLanguageTips(language);
  }, []);

  const getHealth = useCallback(async () => {
    return api.getHealth();
  }, []);

  const getStats = useCallback(async () => {
    return api.getStats();
  }, []);
  const syncUser = useCallback(async () => {
    return api.syncUser(getToken);
  }, [getToken]);

  const startSession = useCallback(
    async (data: {
      language: string;
      difficulty: string;
      scenario: string;
    }) => {
      return api.startSession(getToken, data);
    },
    [getToken],
  );

  const endSession = useCallback(
    async (sessionId: string) => {
      return api.endSession(getToken, sessionId);
    },
    [getToken],
  );

  const getSession = useCallback(
    async (sessionId: string) => {
      return api.getSession(getToken, sessionId);
    },
    [getToken],
  );

  const getSessionHistory = useCallback(
    async (sessionId: string) => {
      return api.getSessionHistory(getToken, sessionId);
    },
    [getToken],
  );

  const getUserSummaries = useCallback(
    async (userId: string, limit: number = 10) => {
      return api.getUserSummaries(getToken, userId, limit);
    },
    [getToken],
  );
  return {
    // Auth & User
    verifyToken,
    getMe,
    getUsage,
    getProgress,
    getSessions,
    getCorrections,

    // Corrections
    getFeedback,
    getCulturalContext,
    getPhrasingSuggestions,

    // Progress
    getSessionSummary,
    getUserProgressDetailed,

    // Public
    getLanguages,
    getScenarios,
    getDifficultyLevels,
    getLanguageTips,
    getHealth,
    getStats,

    syncUser,
    startSession,
    endSession,
    getSession,
    getSessionHistory,
    getUserSummaries,
  };
}

/**
 * Example usage:
 *
 * function MyComponent() {
 *   const api = useApi();
 *
 *   useEffect(() => {
 *     async function loadData() {
 *       const user = await api.getCurrentUser();
 *       const progress = await api.getUserProgress();
 *       const languages = await api.getLanguages();
 *     }
 *     loadData();
 *   }, []);
 * }
 */
