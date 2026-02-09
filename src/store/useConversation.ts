// src/store/useConversation.ts
import { create } from "zustand";
import type { Message, Correction } from "@/services/websocket";

interface ConversationState {
  // Session info
  sessionId: string | null;
  language: string;
  difficulty: string;
  scenario: string;
  isActive: boolean;

  // Messages
  messages: Message[];
  isAiTyping: boolean;
  isResponseFetched: boolean;

  // Corrections & Feedback
  corrections: Correction[];
  culturalTips: string[];
  vocabularyLearned: string[];

  // Progress
  sessionDuration: number;
  messageCount: number;
  accuracyScore: number;
  mistakePatterns: Record<string, number>;

  // Actions
  setSessionId: (id: string) => void;
  setSessionConfig: (
    language: string,
    difficulty: string,
    scenario: string,
  ) => void;
  setIsActive: (active: boolean) => void;

  addMessage: (message: Message) => void;
  setIsAiTyping: (typing: boolean) => void;

  setIsResponseFetched: (bool: boolean) => void;

  addCorrection: (correction: Correction) => void;
  addCulturalTip: (tip: string) => void;
  addVocabulary: (word: string) => void;

  updateProgress: (data: Partial<ConversationState>) => void;

  reset: () => void;
}

const initialState = {
  sessionId: null,
  language: "spanish",
  difficulty: "beginner",
  scenario: "casual",
  isActive: false,

  messages: [],
  isAiTyping: false,
  isResponseFetched: true,

  corrections: [],
  culturalTips: [],
  vocabularyLearned: [],

  sessionDuration: 0,
  messageCount: 0,
  accuracyScore: 100,
  mistakePatterns: {},
};

export const useConversation = create<ConversationState>((set, get) => ({
  ...initialState,

  setSessionId: (id) => set({ sessionId: id }),

  setSessionConfig: (language, difficulty, scenario) =>
    set({ language, difficulty, scenario }),

  setIsActive: (active) => set({ isActive: active }),

  addMessage: (message) =>
    set((state) => {
      const newMessageCount = state.messageCount + 1;
      const userMessages = Math.floor(newMessageCount / 2);
      const totalCorrections = state.corrections.length;

      // Calculate accuracy: (messages without errors / total messages) * 100
      const newAccuracy =
        userMessages > 0
          ? Math.max(
              0,
              Math.min(
                100,
                ((userMessages - totalCorrections) / userMessages) * 100,
              ),
            )
          : 100;

      return {
        messages: [...state.messages, message],
        messageCount: newMessageCount,
        accuracyScore: newAccuracy,
      };
    }),

  setIsAiTyping: (typing) => set({ isAiTyping: typing }),
  setIsResponseFetched: (bool) => set({ isResponseFetched: bool }),

  addCorrection: (correction) =>
    set((state) => {
      const mistakePatterns = { ...state.mistakePatterns };
      mistakePatterns[correction.type] =
        (mistakePatterns[correction.type] || 0) + 1;

      const totalCorrections = state.corrections.length + 1;
      const userMessages = Math.floor(state.messageCount / 2);

      // Recalculate accuracy
      const newAccuracy =
        userMessages > 0
          ? Math.max(
              0,
              Math.min(
                100,
                ((userMessages - totalCorrections) / userMessages) * 100,
              ),
            )
          : 100;

      return {
        corrections: [...state.corrections, correction],
        mistakePatterns,
        accuracyScore: newAccuracy,
      };
    }),

  addCulturalTip: (tip) =>
    set((state) => ({
      culturalTips: [...state.culturalTips, tip],
    })),

  addVocabulary: (word) =>
    set((state) => {
      if (state.vocabularyLearned.includes(word)) {
        return state;
      }
      return { vocabularyLearned: [...state.vocabularyLearned, word] };
    }),

  updateProgress: (data) => set((state) => ({ ...state, ...data })),

  reset: () => set(initialState),
}));
