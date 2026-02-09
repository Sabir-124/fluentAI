// src/components/Conversation/SessionInfo.tsx
import { useConversation } from "@/store/useConversation";
import { useRecording } from "@/store/useRecording";
import { Globe, Target, BookOpen } from "lucide-react";

const SessionInfo = () => {
  const { language, difficulty, scenario, isActive } = useConversation();
  const { isSessionActive } = useRecording();

  if (!isSessionActive || !isActive) return null;

  return (
    <div className="bg-[#1A1F2E] border-b border-white/10 px-6 py-3">
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-[#00D9C0]" />
          <span className="text-[#E8ECEF]/60">Language:</span>
          <span className="font-semibold text-white capitalize">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Target size={16} className="text-[#6C47FF]" />
          <span className="text-[#E8ECEF]/60">Level:</span>
          <span className="font-semibold text-white capitalize">
            {difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-[#FF6B9D]" />
          <span className="text-[#E8ECEF]/60">Scenario:</span>
          <span className="font-semibold text-white capitalize">
            {scenario}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;
