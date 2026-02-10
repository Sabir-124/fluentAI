// src/components/Conversation/AudioVisualizer.tsx
import { useRecording } from "@/store/useRecording";
import { useConversation } from "@/store/useConversation";

const AudioVisualizer = () => {
  const { isSessionActive, isPaused, isMicActive } = useRecording();
  const { isAiTyping } = useConversation();

  if (!isSessionActive) {
    return null;
  }

  const bars = Array.from({ length: 40 });

  return (
    <div className="h-24 bg-[#1A1F2E] border-t border-white/10 flex items-center justify-center px-6">
      <div className="flex items-center gap-1 h-16">
        {bars.map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all ${
              !isPaused && (isMicActive || isAiTyping)
                ? "bg-gradient-to-t from-[#6C47FF] to-[#00D9C0]"
                : "bg-[#2D3748]"
            }`}
            style={{
              height:
                !isPaused && (isMicActive || isAiTyping)
                  ? `${Math.random() * 100}%`
                  : "20%",
              animation:
                !isPaused && (isMicActive || isAiTyping)
                  ? `pulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite`
                  : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
