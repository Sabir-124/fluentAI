import { persist } from "zustand/middleware";
import { create } from "zustand";

interface preferencesProps {
  selectedLanguage: string;
  selectedLevel: string;
  learningGoals: string[];
  prefferedScenarios: string[];
  selectedScenario: string;

  setSelectedLanguage: (lang: string) => void;
  setSelectedLevel: (level: string) => void;
  setLearningGoals: (goalID: string[] | string) => void;
  setPrefferedScenarios: (scene: string[] | string) => void;
  setSelectedScenario: (scenario: string) => void;
}

export const usePreference = create<preferencesProps>()(
  persist(
    (set) => ({
      selectedLanguage: "",
      selectedLevel: "",
      learningGoals: [],
      prefferedScenarios: [],
      selectedScenario: "",

      setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),

      setSelectedLevel: (level) => set({ selectedLevel: level }),

      setLearningGoals: (goalId) =>
        set((state) => {
          const goalIds = Array.isArray(goalId) ? goalId : [goalId];
          const exists = goalIds.every((id) =>
            state.learningGoals.includes(id),
          );

          return {
            learningGoals: exists
              ? state.learningGoals.filter((g) => !goalIds.includes(g))
              : [...state.learningGoals, ...goalIds],
          };
        }),

      setPrefferedScenarios: (scene) =>
        set((state) => {
          const scenarioIds = Array.isArray(scene) ? scene : [scene];
          const exists = scenarioIds.every((id) =>
            state.prefferedScenarios.includes(id),
          );

          return {
            prefferedScenarios: exists
              ? state.prefferedScenarios.filter((s) => !scenarioIds.includes(s))
              : [...state.prefferedScenarios, ...scenarioIds],
          };
        }),

      setSelectedScenario: (scenario) => set({ selectedScenario: scenario }),
    }),
    {
      name: "preferences-storage",
      version: 1,
    },
  ),
);
