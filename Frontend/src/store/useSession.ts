import { create } from "zustand";
import { persist } from "zustand/middleware";

// ========== INTERFACES ==========

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  translation?: string;
  timestamp: Date;
  hasError?: boolean;
  errorDetails?: {
    type: "grammar" | "pronunciation" | "vocabulary" | "cultural";
    original: string;
    corrected: string;
    explanation: string;
  };
}

interface Correction {
  id: string;
  type: "grammar" | "pronunciation" | "vocabulary" | "cultural";
  original: string;
  corrected: string;
  explanation: string;
  timestamp: Date;
}

interface ContextInsight {
  id: string;
  title: string;
  description: string;
  icon?: string;
  timestamp: Date;
}

interface SkillProgress {
  grammar: number; // 0-100
  pronunciation: number; // 0-100
  vocabulary: number; // 0-100
  fluency: number; // 0-100
}

interface Session {
  // Session Identity
  sessionID: string;
  userID: string;

  // Session Config
  selectedLanguage: string;
  selectedLevel: "Beginner" | "Intermediate" | "Advanced";
  selectedScenario: string;

  // Session Content
  chats: ChatMessage[];
  corrections: Correction[];
  contextInsights: ContextInsight[];

  // Session Stats
  startedAt: Date;
  endedAt?: Date; // Optional until session ends
  sessionDuration: number; // in seconds
  wordsSpoken: number;
  correctionsCount: number;

  // Progress Scores
  skillProgress: SkillProgress;
  overallFluency: number; // 0-100

  // Session Status
  isActive: boolean;
  isCompleted: boolean;
}

interface UserProfile {
  userID: string;
  firstname: string;
  lastName: string;
  bio: string;
  email: string;
  password: string;

  // Onboarding Data
  hasCompletedOnboarding: boolean;
  primaryLanguage?: string;
  proficiencyLevel?: string;
  learningGoals: string[];
  preferredScenarios: string[];

  // Overall Stats
  totalSessions: number;
  totalPracticeTime: number; // in seconds
  currentStreak: number;
  longestStreak: number;

  // Overall Skill Levels
  overallSkills: SkillProgress;

  // all sessions
  sessions: Session[];
}

// ========== STORE INTERFACE ==========

interface SessionStore {
  // User Profile
  user: UserProfile;

  // Current Active Session
  currentSession: Session | null;

  // All Past Sessions
  sessions: Session[];

  // ===== USER ACTIONS =====
  setUser: (user: Partial<UserProfile>) => void;
  completeOnboarding: (data: {
    primaryLanguage: string;
    proficiencyLevel: string;
    learningGoals: string[];
    preferredScenarios: string[];
  }) => void;

  // ===== SESSION ACTIONS =====

  // Start a new session
  startSession: (config: {
    language: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    scenario: string;
  }) => void;

  // End current session
  endSession: () => void;

  // Update session data
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  addCorrection: (correction: Omit<Correction, "id" | "timestamp">) => void;
  addContextInsight: (
    insight: Omit<ContextInsight, "id" | "timestamp">,
  ) => void;

  // Update session stats
  updateSessionDuration: (duration: number) => void;
  incrementWordsSpoken: (count?: number) => void;
  updateSkillProgress: (skills: Partial<SkillProgress>) => void;
  updateFluency: (fluency: number) => void;

  // ===== UTILITY ACTIONS =====
  clearCurrentSession: () => void;
  deleteSession: (sessionID: string) => void;
  getAllSessions: () => Session[];
  getSessionById: (sessionID: string) => Session | undefined;
  resetStore: () => void;
}

// ========== STORE IMPLEMENTATION ==========

const generateID = () =>
  `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      // ===== INITIAL STATE =====
      user: {
        userID: "",
        firstname: "",
        lastName: "",
        bio: "",
        email: "",
        password: "",
        hasCompletedOnboarding: false,
        learningGoals: [],
        preferredScenarios: [],
        totalSessions: 0,
        totalPracticeTime: 0,
        currentStreak: 0,
        longestStreak: 0,
        overallSkills: {
          grammar: 0,
          pronunciation: 0,
          vocabulary: 0,
          fluency: 0,
        },
        sessions: [],
      },

      currentSession: null,
      sessions: [],

      // ===== USER ACTIONS =====

      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      completeOnboarding: (data) =>
        set((state) => ({
          user: {
            ...state.user,
            hasCompletedOnboarding: true,
            primaryLanguage: data.primaryLanguage,
            proficiencyLevel: data.proficiencyLevel,
            learningGoals: data.learningGoals,
            preferredScenarios: data.preferredScenarios,
          },
        })),

      // ===== SESSION ACTIONS =====

      startSession: (config) => {
        const newSession: Session = {
          sessionID: generateID(),
          userID: get().user.userID,
          selectedLanguage: config.language,
          selectedLevel: config.level,
          selectedScenario: config.scenario,
          chats: [],
          corrections: [],
          contextInsights: [],
          startedAt: new Date(),
          sessionDuration: 0,
          wordsSpoken: 0,
          correctionsCount: 0,
          skillProgress: {
            grammar: 0,
            pronunciation: 0,
            vocabulary: 0,
            fluency: 0,
          },
          overallFluency: 0,
          isActive: true,
          isCompleted: false,
        };

        set({ currentSession: newSession });
      },

      endSession: () => {
        const current = get().currentSession;
        if (!current) return;

        const completedSession: Session = {
          ...current,
          endedAt: new Date(),
          isActive: false,
          isCompleted: true,
        };

        set((state) => ({
          currentSession: null,
          sessions: [...state.sessions, completedSession],
          user: {
            ...state.user,
            totalSessions: state.user.totalSessions + 1,
            totalPracticeTime:
              state.user.totalPracticeTime + current.sessionDuration,
          },
        }));
      },

      addMessage: (message) => {
        const current = get().currentSession;
        if (!current) return;

        const newMessage: ChatMessage = {
          ...message,
          id: generateID(),
          timestamp: new Date(),
        };

        set((state) => ({
          currentSession: state.currentSession
            ? {
                ...state.currentSession,
                chats: [...state.currentSession.chats, newMessage],
              }
            : null,
        }));
      },

      addCorrection: (correction) => {
        const current = get().currentSession;
        if (!current) return;

        const newCorrection: Correction = {
          ...correction,
          id: generateID(),
          timestamp: new Date(),
        };

        set((state) => ({
          currentSession: state.currentSession
            ? {
                ...state.currentSession,
                corrections: [
                  ...state.currentSession.corrections,
                  newCorrection,
                ],
                correctionsCount: state.currentSession.correctionsCount + 1,
              }
            : null,
        }));
      },

      addContextInsight: (insight) => {
        const current = get().currentSession;
        if (!current) return;

        const newInsight: ContextInsight = {
          ...insight,
          id: generateID(),
          timestamp: new Date(),
        };

        set((state) => ({
          currentSession: state.currentSession
            ? {
                ...state.currentSession,
                contextInsights: [
                  ...state.currentSession.contextInsights,
                  newInsight,
                ],
              }
            : null,
        }));
      },

      updateSessionDuration: (duration) =>
        set((state) => ({
          currentSession: state.currentSession
            ? { ...state.currentSession, sessionDuration: duration }
            : null,
        })),

      incrementWordsSpoken: (count = 1) =>
        set((state) => ({
          currentSession: state.currentSession
            ? {
                ...state.currentSession,
                wordsSpoken: state.currentSession.wordsSpoken + count,
              }
            : null,
        })),

      updateSkillProgress: (skills) =>
        set((state) => ({
          currentSession: state.currentSession
            ? {
                ...state.currentSession,
                skillProgress: {
                  ...state.currentSession.skillProgress,
                  ...skills,
                },
              }
            : null,
        })),

      updateFluency: (fluency) =>
        set((state) => ({
          currentSession: state.currentSession
            ? { ...state.currentSession, overallFluency: fluency }
            : null,
        })),

      // ===== UTILITY ACTIONS =====

      clearCurrentSession: () => set({ currentSession: null }),

      deleteSession: (sessionID) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.sessionID !== sessionID),
        })),

      getAllSessions: () => get().sessions,

      getSessionById: (sessionID) =>
        get().sessions.find((s) => s.sessionID === sessionID),

      resetStore: () =>
        set({
          user: {
            userID: "",
            firstname: "",
            lastName: "",
            bio: "",
            email: "",
            password: "",
            hasCompletedOnboarding: false,
            learningGoals: [],
            preferredScenarios: [],
            totalSessions: 0,
            totalPracticeTime: 0,
            currentStreak: 0,
            longestStreak: 0,
            overallSkills: {
              grammar: 0,
              pronunciation: 0,
              vocabulary: 0,
              fluency: 0,
            },
            sessions: [],
          },
          currentSession: null,
          sessions: [],
        }),
    }),
    {
      name: "fluentai-session-storage",
      version: 3,
    },
  ),
);
