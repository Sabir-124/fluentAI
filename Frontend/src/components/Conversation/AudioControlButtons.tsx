// src/components/Conversation/AudioControlButtons.tsx - FIXED
import { useWebSocket } from "@/services/websocket";
import { useConversation } from "@/store/useConversation";
import { useRecording } from "@/store/useRecording";
import { useSpeechRecognition } from "@/hooks/useSpeechRecoginition";
import { Mic, MicOff, Play, Square, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

const AudioControlButtons = () => {
  const ws = useWebSocket();
  const {
    isSessionActive,
    isPaused,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
  } = useRecording();

  const {
    language,
    difficulty,
    scenario,
    sessionId,
    setSessionId,
    setIsActive,
    reset: resetConversation,
    isActive: conversationActive,
    addMessage,
    setIsAiTyping,
    addCorrection,
    addCulturalTip,
    addVocabulary,
    setIsResponseFetched,
  } = useConversation();

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported,
  } = useSpeechRecognition({
    lang:
      language === "chinese"
        ? "zh-CN"
        : language === "japanese"
          ? "ja-JP"
          : language === "korean"
            ? "ko-KR"
            : `${language.substring(0, 2)}-${language.substring(0, 2).toUpperCase()}`,
    continuous: true,
    interimResults: true,
  });

  const isEndingSession = useRef(false);
  const lastTranscriptSent = useRef("");

  // Handle speech recognition transcript
  useEffect(() => {
    if (
      transcript &&
      transcript.trim() &&
      transcript !== lastTranscriptSent.current &&
      isListening &&
      isSessionActive &&
      !isPaused
    ) {
      console.log("🎤 New transcript:", transcript);

      // Send to backend
      try {
        ws.sendSpeechTranscript(transcript);
        lastTranscriptSent.current = transcript;
        setIsResponseFetched(false);
      } catch (error: any) {
        console.error("Failed to send transcript:", error);
        toast.error(error.message || "Failed to send speech");
      }
    }
  }, [transcript, isListening, isSessionActive, isPaused]);

  // Setup WebSocket event listeners
  useEffect(() => {
    // Session started
    const unsubSessionStarted = ws.on("session-started", (data) => {
      console.log("✅ Session started:", data);
      setSessionId(data.sessionId);
      setIsActive(true);

      // Add AI's starter message
      addMessage({
        role: "assistant",
        content: data.starterMessage,
        timestamp: data.timestamp,
      });

      toast.success(`Session started in ${data.language}!`);
    });

    // AI response
    const unsubAiResponse = ws.on("ai-response", (data) => {
      console.log("🤖 AI response received");
      setIsAiTyping(false);
      setIsResponseFetched(true);

      // Add AI message
      addMessage({
        role: "assistant",
        content: data.response,
        timestamp: data.timestamp,
      });

      // Handle corrections
      if (data.corrections?.corrections) {
        data.corrections.corrections.forEach((correction:any) => {
          addCorrection(correction);
        });
      }

      // Handle cultural notes
      if (data.corrections?.culturalNotes) {
        data.corrections.culturalNotes.forEach((note:any) => {
          addCulturalTip(note);
        });
      }
    });

    // AI processing
    const unsubAiProcessing = ws.on("ai-processing", () => {
      setIsAiTyping(true);
    });

    // Session ended
    const unsubSessionEnded = ws.on("session-ended", (data) => {
      console.log("⏹️ Session ended:", data);

      // Add vocabulary learned
      if (data.vocabularyLearned) {
        data.vocabularyLearned.forEach((word:any) => {
          addVocabulary(word);
        });
      }

      // Show success message
      toast.success("Session saved successfully!", {
        description: `${data.messageCount} messages, ${data.corrections} corrections`,
      });

      // Stop recording
      stopSession();
      setIsActive(false);
      isEndingSession.current = false;
    });

    // Error handling
    const unsubError = ws.on("error", (error) => {
      console.error("❌ WebSocket error:", error);
      toast.error(error.message || "An error occurred");
      setIsAiTyping(false);
      setIsResponseFetched(true);
    });

    // Cleanup
    return () => {
      unsubSessionStarted();
      unsubAiResponse();
      unsubAiProcessing();
      unsubSessionEnded();
      unsubError();
    };
  }, []);

  const handleStartSession = async () => {
    if (!ws.isConnected()) {
      toast.error("Not connected to server");
      return;
    }

    if (!isSupported) {
      toast.error("Speech recognition not supported in your browser");
      return;
    }

    try {
      // Start session in backend
      ws.startSession({ language, difficulty, scenario });

      // Start local session
      startSession();

      // Start speech recognition
      startListening();
    } catch (error: any) {
      console.error("Failed to start session:", error);
      toast.error(error.message || "Failed to start session");
    }
  };

  const handleEndSession = async () => {
    if (isEndingSession.current) {
      console.log("⚠️ Already ending session, ignoring duplicate call");
      return;
    }

    if (!sessionId) {
      console.log("⚠️ No session ID, just stopping locally");
      stopSession();
      stopListening();
      resetConversation();
      return;
    }

    isEndingSession.current = true;

    const toastId = toast.loading("Saving session...");

    try {
      // Stop speech recognition first
      stopListening();

      // Send end session to backend
      console.log("📤 Sending end-session event");
      ws.endSession();

      // Note: We DON'T call stopSession() here
      // We wait for the "session-ended" event from backend
      // which will trigger the cleanup
    } catch (error: any) {
      console.error("Failed to end session:", error);
      toast.error(error.message || "Failed to end session", { id: toastId });

      // Fallback cleanup
      stopSession();
      setIsActive(false);
      isEndingSession.current = false;
    }
  };

  const handleTogglePause = () => {
    if (isPaused) {
      resumeSession();
      startListening();
      toast.info("Resumed");
    } else {
      pauseSession();
      stopListening();
      toast.info("Paused");
    }
  };

  if (!isSessionActive) {
    // Start Session Button
    return (
      <div className="p-6 border-t border-white/10 bg-[#1A1F2E]">
        <button
          onClick={handleStartSession}
          disabled={!ws.isConnected()}
          className="w-full bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Play size={20} />
          Start Session
        </button>
      </div>
    );
  }

  // Active Session Controls
  return (
    <div className="p-6 border-t border-white/10 bg-[#1A1F2E]">
      <div className="flex gap-3">
        {/* Mic Button */}
        <button
          onClick={handleTogglePause}
          className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            isPaused
              ? "bg-[#2D3748] text-[#E8ECEF]/70 hover:bg-[#2D3748]/80"
              : "bg-gradient-to-r from-[#00D9C0] to-[#10B981] text-white"
          }`}
        >
          {isPaused ? <MicOff size={20} /> : <Mic size={20} />}
          {isPaused ? "Resume" : "Speaking"}
        </button>

        {/* End Session Button */}
        <button
          onClick={handleEndSession}
          disabled={isEndingSession.current}
          className="flex-1 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEndingSession.current ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Ending...
            </>
          ) : (
            <>
              <Square size={20} />
              End Session
            </>
          )}
        </button>
      </div>

      {/* Live Transcript Preview */}
      {transcript && !isPaused && (
        <div className="mt-3 p-3 bg-[#2D3748] rounded-lg border border-[#00D9C0]/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-[#00D9C0] rounded-full animate-pulse"></div>
            <span className="text-xs text-[#E8ECEF]/60">Listening...</span>
          </div>
          <p className="text-sm text-[#E8ECEF]/80 italic">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default AudioControlButtons;
