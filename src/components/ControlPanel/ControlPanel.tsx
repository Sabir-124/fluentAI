// src/components/ControlPanel/ControlPanel.tsx
import { Clock } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import ScenarioSelector from "./ScenarioSelector";
import LevelSelector from "./LevelSelector";
import { useEffect, useState } from "react";
import { useRecording } from "@/store/useRecording";
import { useConversation } from "@/store/useConversation";
import QuickStats from "./QuickStats";

const ControlPanel = () => {
  const [sessionTime, setSessionTime] = useState(0);
  const { isSessionActive, isPaused, sessionStartTime } = useRecording();
  const { language, difficulty, scenario, setSessionConfig } =
    useConversation();

  // Update session time
  useEffect(() => {
    if (!isSessionActive || isPaused || !sessionStartTime) {
      return;
    }

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
      setSessionTime(elapsed);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSessionActive, isPaused, sessionStartTime]);

  // Reset timer when session ends
  useEffect(() => {
    if (!isSessionActive) {
      setSessionTime(0);
    }
  }, [isSessionActive]);

  // Sync selectors with conversation store
  const handleLanguageChange = (newLanguage: string) => {
    if (!isSessionActive) {
      // Ensure lowercase for backend
      setSessionConfig(newLanguage.toLowerCase(), difficulty, scenario);
    }
  };

  const handleDifficultyChange = (newDifficulty: string) => {
    if (!isSessionActive) {
      // Ensure lowercase for backend
      setSessionConfig(language, newDifficulty.toLowerCase(), scenario);
    }
  };

  const handleScenarioChange = (newScenario: string) => {
    if (!isSessionActive) {
      // Ensure lowercase for backend
      setSessionConfig(language, difficulty, newScenario.toLowerCase());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-80 bg-[#1A1F2E] border-r border-white/10 p-6 overflow-y-auto custom-scroll">
      <div className="space-y-6">
        {/* Language Selector */}
        <LanguageSelector
          value={language}
          onChange={handleLanguageChange}
          disabled={isSessionActive}
        />

        {/* Difficulty Level */}
        <LevelSelector
          value={difficulty}
          onChange={handleDifficultyChange}
          disabled={isSessionActive}
        />

        {/* Scenario Selection */}
        <ScenarioSelector
          value={scenario}
          onChange={handleScenarioChange}
          disabled={isSessionActive}
        />

        {/* Session Timer */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] rounded-2xl p-6 text-center border border-white/5">
          <Clock
            className={`mx-auto mb-2 transition-colors ${
              isSessionActive ? "text-[#00D9C0]" : "text-[#E8ECEF]/30"
            }`}
            size={24}
          />
          <div
            className={`text-4xl font-bold mb-1 transition-colors ${
              isSessionActive ? "text-white" : "text-[#E8ECEF]/30"
            }`}
          >
            {formatTime(sessionTime)}
          </div>
          <div className="text-xs text-[#E8ECEF]/50">
            {isSessionActive ? "Session Duration" : "Ready to Start"}
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats />
      </div>
    </div>
  );
};

export default ControlPanel;
