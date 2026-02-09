// src/services/api.ts
import axios, {type AxiosInstance, AxiosError } from "axios";
import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Hook to get authenticated API client
export const useApi = () => {
  const { getToken } = useAuth();

  // Add auth token to all requests
  apiClient.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return apiClient;
};

// API Types
export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface Scenario {
  code: string;
  name: string;
  description: string;
  icon: string;
}

export interface DifficultyLevel {
  code: string;
  name: string;
  description: string;
  icon: string;
}

export interface UserStats {
  userId: string;
  geminiCallsToday: number;
  geminiCallsLimit: number;
  totalGeminiCalls: number;
  activeSessions: number;
  sessionLimit: number;
  totalSessions: number;
  lastActivity: number;
}

export interface UserProgress {
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

export interface Session {
  id: string;
  userId: string;
  language: string;
  difficulty: string;
  scenario: string;
  active: boolean;
  startTime: string;
  endTime?: string;
  duration?: number;
  messageCount: number;
  geminiCallCount: number;
}

export interface Correction {
  id: string;
  sessionId: string;
  type: string;
  severity: string;
  originalText: string;
  correctedText: string;
  explanation: string;
  timestamp: string;
}

// API Functions
export const api = {
  // Public endpoints
  async getLanguages() {
    const response = await apiClient.get<{
      success: boolean;
      languages: Language[];
    }>("/api/languages");
    return response.data.languages;
  },

  async getScenarios() {
    const response = await apiClient.get<{
      success: boolean;
      scenarios: Scenario[];
    }>("/api/scenarios");
    return response.data.scenarios;
  },

  async getDifficultyLevels() {
    const response = await apiClient.get<{
      success: boolean;
      levels: DifficultyLevel[];
    }>("/api/difficulty-levels");
    return response.data.levels;
  },

  async getHealth() {
    const response = await apiClient.get("/api/health");
    return response.data;
  },

  // Auth endpoints (protected)
  async getCurrentUser() {
    const response = await apiClient.get("/api/auth/me");
    return response.data;
  },

  async getUserUsage() {
    const response = await apiClient.get<{
      success: boolean;
      usage: UserStats;
    }>("/api/auth/usage");
    return response.data.usage;
  },

  async getUserSessions(active?: boolean, limit = 10) {
    const params = new URLSearchParams();
    if (active !== undefined) params.append("active", String(active));
    params.append("limit", String(limit));

    const response = await apiClient.get(`/api/auth/sessions?${params}`);
    return response.data;
  },

  async getUserProgress() {
    const response = await apiClient.get<{
      success: boolean;
      progress: UserProgress[];
    }>("/api/auth/progress");
    return response.data.progress;
  },

  async getUserCorrections(type?: string, limit = 50) {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    params.append("limit", String(limit));

    const response = await apiClient.get(`/api/auth/corrections?${params}`);
    return response.data;
  },

  // Session endpoints
  async startSession(language: string, difficulty: string, scenario: string) {
    const response = await apiClient.post<{
      success: boolean;
      sessionId: string;
      language: string;
      difficulty: string;
      scenario: string;
      userId: string;
      authenticated: boolean;
    }>("/api/start-session", {
      language,
      difficulty,
      scenario,
    });
    return response.data;
  },

  async endSession(sessionId: string) {
    const response = await apiClient.post("/api/end-session", { sessionId });
    return response.data;
  },

  async getSession(sessionId: string) {
    const response = await apiClient.get<{
      success: boolean;
      session: Session;
    }>(`/api/session/${sessionId}`);
    return response.data.session;
  },

  async getSessionHistory(sessionId: string) {
    const response = await apiClient.get(`/api/session/${sessionId}/history`);
    return response.data;
  },

  // Progress endpoints
  async getSessionSummary(sessionId: string) {
    const response = await apiClient.get(
      `/api/progress/session-summary/${sessionId}`,
    );
    return response.data;
  },
};

// Error handler
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      error?: string;
      message?: string;
    }>;

    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }

    if (axiosError.response?.data?.error) {
      return axiosError.response.data.error;
    }

    if (axiosError.response?.status === 401) {
      return "Authentication required. Please log in.";
    }

    if (axiosError.response?.status === 403) {
      return "Access forbidden. You do not have permission.";
    }

    if (axiosError.response?.status === 404) {
      return "Resource not found.";
    }

    if (axiosError.response?.status === 429) {
      return "Too many requests. Please try again later.";
    }

    if (axiosError.response?.status === 500) {
      return "Server error. Please try again later.";
    }

    return axiosError.message || "An unexpected error occurred";
  }

  return "An unexpected error occurred";
};

export default apiClient;
