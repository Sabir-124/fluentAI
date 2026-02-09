import { useRecording } from "@/store/useRecording";

const AudioVisualizer = () => {
  const { isMicActive, isSessionActive, isPaused } = useRecording();

  const isAnimating = isSessionActive && isMicActive && !isPaused;

  return (
    <div className="h-20 bg-[#1A1F2E]/50 border-t border-white/10 flex items-center justify-center px-6">
      <div className="flex items-center gap-1 h-12">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-linear-to-t from-[#00D9C0] to-[#6C47FF] rounded-full transition-all duration-100"
            style={{
              height: isAnimating ? `${20 + Math.random() * 80}%` : "10%",
              opacity: isAnimating ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
