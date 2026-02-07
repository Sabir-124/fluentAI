import { Clock } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import ScenarioSelector from "./ScenarioSelector";
import LevelSelector from "./LevelSelector";
import { useEffect, useState } from "react";
import { useRecording } from "@/store/useRecording";
import QuickStats from "./QuickStats";

const ControlPanel = () => {
  const [sessionTime, setSessionTime] = useState(0);
  const { isRecording } = useRecording();

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (isRecording) {
        setSessionTime((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-80 bg-[#1A1F2E] border-r border-white/10 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Language Selector */}
        <LanguageSelector />

        {/* Difficulty Level */}
        <LevelSelector />

        {/* Scenario Selection */}
        <ScenarioSelector />

        {/* Session Timer */}
        <div className="bg-linear-to-br from-[#1A1F2E] to-[#0F1419] rounded-2xl p-6 text-center">
          <Clock className="mx-auto mb-2 text-[#00D9C0]" size={24} />
          <div className="text-4xl font-bold mb-1">
            {formatTime(sessionTime)}
          </div>
          <div className="text-xs text-[#E8ECEF]/50">Session Duration</div>
        </div>

        {/* Quick Stats */}
        <QuickStats />
      </div>
    </div>
  );
};

export default ControlPanel;
