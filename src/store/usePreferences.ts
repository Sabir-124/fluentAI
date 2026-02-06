import { create } from "zustand";

interface preferencesProps {
  selectedLanguage: string;
  selectedLevel: string;
  learningGoals: string[];
  prefferedScenarios: string[];

  setSelectedLanguage: (lang: string) => void;
  setSelectedLevel: (level: string) => void;
  setLearningGoals: (goalID: string[] | string) => void;
  setPrefferedScenarios: (scene: string[] | string) => void;
}

export const usePreference = create<preferencesProps>((set) => ({
  selectedLanguage: "",
  selectedLevel: "",
  learningGoals: [],
  prefferedScenarios: [],

  setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),
  setSelectedLevel: (level) => set({ selectedLevel: level }),

  setLearningGoals: (goalId) =>
    set((state) => {
      const goalIds = Array.isArray(goalId) ? goalId : [goalId];
      return {
        learningGoals: goalIds.every((id) => state.learningGoals.includes(id))
          ? state.learningGoals.filter((g) => !goalIds.includes(g))
          : [...state.learningGoals, ...goalIds],
      };
    }),

  setPrefferedScenarios: (scene) =>
    set((state) => {
      return {
        prefferedScenarios: [
          ...state.prefferedScenarios,
          ...(Array.isArray(scene) ? [...scene] : scene),
        ],
      };
    }),
}));
