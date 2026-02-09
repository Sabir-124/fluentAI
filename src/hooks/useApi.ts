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
  const verifyAuth = useCallback(async () => {
    return api.verifyAuth(getToken);
  }, [getToken]);

  const getCurrentUser = useCallback(async () => {
    return api.getCurrentUser(getToken);
  }, [getToken]);

  const getUserUsage = useCallback(async () => {
    return api.getUserUsage(getToken);
  }, [getToken]);

  const getUserProgress = useCallback(async () => {
    return api.getUserProgress(getToken);
  }, [getToken]);

  const getUserSessions = useCallback(
    async (params?: { active?: boolean; limit?: number }) => {
      return api.getUserSessions(getToken, params);
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

  return {
    // Auth & User
    verifyAuth,
    getCurrentUser,
    getUserUsage,
    getUserProgress,
    getUserSessions,
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
