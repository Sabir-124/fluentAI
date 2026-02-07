import { useRecording } from "@/store/useRecording";
import { Mic, MicOff, Pause, Play, Square } from "lucide-react";

const AudioControlButtons = () => {
  const { isRecording, setIsRecording } = useRecording();

  return (
    <div className="h-28 bg-[#1A1F2E] border-t border-white/10 flex items-center justify-center gap-4 px-6">
      <button
        onClick={() => setIsRecording(!isRecording)}
        className={`w-18 h-18 rounded-full flex items-center justify-center transition-all duration-300 ${
          isRecording
            ? "bg-[#00D9C0] shadow-[0_0_30px_rgba(0,217,192,0.5)] animate-pulse"
            : "bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] hover:scale-110"
        }`}
      >
        {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
      </button>
      <button
        onClick={() => setIsRecording(!isRecording)}
        className="w-12 h-12 rounded-full bg-[#2D3748] flex items-center justify-center hover:bg-[#2D3748]/70 transition-all"
      >
        {isRecording ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button className="w-12 h-12 rounded-full bg-[#EF4444] flex items-center justify-center hover:bg-[#EF4444]/80 transition-all">
        <Square size={20} />
      </button>
    </div>
  );
};

export default AudioControlButtons;
