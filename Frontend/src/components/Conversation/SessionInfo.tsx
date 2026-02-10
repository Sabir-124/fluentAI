// src/components/Conversation/SessionInfo.tsx
import { useConversation } from "@/store/useConversation";
import { MessageSquare } from "lucide-react";

const SessionInfo = () => {
  const { language, difficulty, scenario, isActive, messageCount } =
    useConversation();

  if (!isActive) {
    return null;
  }

  return (
    <div className="p-4 border-b border-white/10 bg-[#1A1F2E]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#00D9C0] rounded-full animate-pulse"></div>
          <div>
            <p className="text-sm font-medium text-white capitalize">
              {language} • {difficulty} • {scenario}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#E8ECEF]/60">
          <MessageSquare size={16} />
          <span className="text-sm">{messageCount} messages</span>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;
