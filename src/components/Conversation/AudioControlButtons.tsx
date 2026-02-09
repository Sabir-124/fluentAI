// src/components/Conversation/AudioControlButtons.tsx - WITH ERROR HANDLING
import { useRecording } from "@/store/useRecording";
import { useConversation } from "@/store/useConversation";
import { useWebSocket } from "@/services/websocket";
import { Pause, Play, Square } from "lucide-react";
import AudioButton from "./AudioButton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AudioControlButtons = () => {
  const {
    isSessionActive,
    isPaused,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    startMic,
    stopMic,
    isProcessing,
  } = useRecording();

  const { language, difficulty, scenario, setIsActive, setSessionId, reset } =
    useConversation();

  const ws = useWebSocket();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle WebSocket events
  useEffect(() => {
    // Session started
    const unsubSessionStarted = ws.on("session-started", (data) => {
      console.log("✅ Session started:", data);
      setIsActive(true);
      setSessionId(data.sessionId);
      startSession();
      toast.success("Session started!");

      // Add starter message
      useConversation.getState().addMessage({
        role: "assistant",
        content: data.starterMessage,
        timestamp: data.timestamp,
      });
    });

    // AI processing
    const unsubAiProcessing = ws.on("ai-processing", () => {
      console.log("⏳ AI is processing...");
      useConversation.getState().setIsAiTyping(true);
    });

    // AI response
    const unsubAiResponse = ws.on("ai-response", (data) => {
      console.log("🤖 AI response:", data);

      // Turn off typing indicator
      useConversation.getState().setIsAiTyping(false);

      // Add AI message
      useConversation.getState().addMessage({
        role: "assistant",
        content: data.response,
        timestamp: data.timestamp,
      });

      // Process corrections
      if (data.corrections?.hasErrors && data.corrections.corrections) {
        data.corrections.corrections.forEach((correction: any) => {
          useConversation.getState().addCorrection(correction);
        });
      }

      // Add cultural notes
      if (data.corrections?.culturalNotes) {
        data.corrections.culturalNotes.forEach((note: any) => {
          useConversation.getState().addCulturalTip(note);
        });
      }
    });

    // Session ended
    const unsubSessionEnded = ws.on("session-ended", (data) => {
      console.log("⏹️ Session ended:", data);
      setIsSaving(false);
      setIsActive(false);
      stopSession();

      // Turn off typing indicator
      useConversation.getState().setIsAiTyping(false);

      // Update progress
      useConversation.getState().updateProgress({
        sessionDuration: data.duration,
        messageCount: data.messageCount,
        mistakePatterns: data.mistakePatterns,
      });

      // Add vocabulary
      if (data.vocabularyLearned) {
        data.vocabularyLearned.forEach((word: any) => {
          useConversation.getState().addVocabulary(word);
        });
      }

      // Show summary toast
      toast.success(
        `Session saved! ${data.messageCount} messages, ${data.corrections} corrections`,
        { duration: 5000 },
      );

      // Ask user if they want to view summary
      setTimeout(() => {
        const viewSummary = window.confirm(
          "Session completed!\n\n" +
            `Duration: ${Math.floor(data.duration / 60000)}m ${Math.floor((data.duration % 60000) / 1000)}s\n` +
            `Messages: ${data.messageCount}\n` +
            `Corrections: ${data.corrections}\n` +
            `Vocabulary: ${data.vocabularyLearned?.length || 0} words\n\n` +
            "View session summary?",
        );

        if (viewSummary) {
          navigate("/progress");
        } else {
          // Reset conversation for new session
          reset();
        }
      }, 1000);
    });

    // 🆕 ERROR HANDLER - Show errors as AI messages
    const unsubError = ws.on("error", (error) => {
      console.error("❌ WebSocket error:", error);

      // Turn off typing indicator
      useConversation.getState().setIsAiTyping(false);

      // Determine error message based on error type
      let errorMessage = "";
      let shouldEndSession = false;

      switch (error.type) {
        case "session-limit-exceeded":
          errorMessage =
            "⚠️ You've reached the maximum number of concurrent sessions. Please end an existing session first.";
          shouldEndSession = true;
          break;

        case "api-limit-reached":
          errorMessage =
            "⚠️ You've reached your daily API limit. Please try again tomorrow or upgrade your plan.";
          shouldEndSession = true;
          break;

        case "message-limit-reached":
          errorMessage =
            "⚠️ You've reached the maximum number of messages for this session. Please start a new session.";
          shouldEndSession = true;
          break;

        case "message-processing-error":
          errorMessage =
            "😔 I'm sorry, I couldn't process your message. Could you please try saying that again?";
          break;

        case "audio-processing-error":
          errorMessage =
            "🎤 I had trouble understanding the audio. Could you please speak more clearly?";
          break;

        case "session-not-found":
          errorMessage =
            "⚠️ Session not found. Your session may have expired. Please start a new session.";
          shouldEndSession = true;
          break;

        case "unauthorized":
          errorMessage =
            "🔒 Authentication error. Please log out and log back in.";
          shouldEndSession = true;
          break;

        case "authentication-required":
        case "authentication-failed":
          errorMessage = "🔒 Authentication failed. Please log in again.";
          shouldEndSession = true;
          // Redirect to login
          setTimeout(() => {
            navigate("/auth");
          }, 2000);
          break;

        default:
          errorMessage =
            error.message || "😔 I encountered an error. Let's try that again!";
      }

      // 🆕 Add error message as AI message in chat
      useConversation.getState().addMessage({
        role: "assistant",
        content: errorMessage,
        timestamp: Date.now(),
      });

      // Show toast notification
      toast.error(error.message || "An error occurred", { duration: 5000 });

      // End session if needed
      if (shouldEndSession) {
        console.log("🛑 Ending session due to error...");
        stopSession();
        stopMic();
        setIsActive(false);
        setIsSaving(false);
      }
    });

    // 🆕 WARNING HANDLER - Show warnings as AI messages
    const unsubWarning = ws.on("warning", (warning) => {
      console.warn("⚠️ Warning:", warning);

      // Turn off typing indicator
      useConversation.getState().setIsAiTyping(false);

      // Add warning as AI message
      const warningMessage =
        warning.message || "⚠️ Something needs your attention.";

      useConversation.getState().addMessage({
        role: "assistant",
        content: `⚠️ ${warningMessage}`,
        timestamp: Date.now(),
      });

      // Show toast
      toast.warning(warning.message || "Warning", { duration: 4000 });
    });

    // 🆕 CONNECTION STATUS - Handle disconnections
    const unsubConnectionStatus = ws.on("connection-status", (status) => {
      if (!status.connected) {
        console.log("🔌 Disconnected from server");

        // Turn off typing indicator
        useConversation.getState().setIsAiTyping(false);

        // Add disconnection message
        useConversation.getState().addMessage({
          role: "assistant",
          content:
            "🔌 Connection lost. Please check your internet connection and try again.",
          timestamp: Date.now(),
        });

        toast.error("Disconnected from server", { duration: 5000 });

        // Stop session if active
        if (isSessionActive) {
          stopSession();
          stopMic();
          setIsActive(false);
        }
      }
    });

    // Cleanup
    return () => {
      unsubSessionStarted();
      unsubAiProcessing();
      unsubAiResponse();
      unsubSessionEnded();
      unsubError();
      unsubWarning();
      unsubConnectionStatus();
    };
  }, [
    ws,
    setIsActive,
    setSessionId,
    startSession,
    stopSession,
    navigate,
    reset,
    isSessionActive,
    stopMic,
  ]);

  // PLAY button - Starts session AND microphone
  const handlePlay = async () => {
    if (!isSessionActive) {
      // START NEW SESSION
      setIsConnecting(true);

      try {
        // Connect WebSocket if needed
        if (!ws.isConnected()) {
          toast.loading("Connecting...", { id: "connecting" });
          await ws.connect();
          toast.dismiss("connecting");
          toast.success("Connected!");
        }

        // Start session on server
        console.log("▶️ Starting session:", { language, difficulty, scenario });
        ws.startSession({
          language,
          difficulty,
          scenario,
        });

        // Start microphone automatically
        startMic();
      } catch (error: any) {
        console.error("Failed to start session:", error);

        // 🆕 Add connection error as AI message
        useConversation.getState().addMessage({
          role: "assistant",
          content:
            "😔 I couldn't connect to the server. Please check your internet connection and try again.",
          timestamp: Date.now(),
        });

        toast.error(error.message || "Failed to start session");
      } finally {
        setIsConnecting(false);
      }
    } else if (isPaused) {
      // RESUME PAUSED SESSION
      resumeSession();
      startMic();
      toast.success("Session resumed");
    }
  };

  // PAUSE button - Pauses session (stops mic too)
  const handlePause = () => {
    stopMic();
    pauseSession();
    toast.info("Session paused");
  };

  // STOP button - Ends session and saves to database
  const handleStop = async () => {
    if (!isSessionActive) return;

    // Confirm if user wants to end
    const confirm = window.confirm(
      "Are you sure you want to end this session?\n\n" +
        "Your progress will be saved.",
    );

    if (!confirm) return;

    setIsSaving(true);
    stopMic();

    try {
      toast.loading("Saving session...", { id: "saving" });

      // End session on server
      if (ws.isConnected()) {
        ws.endSession();
      } else {
        // If disconnected, just stop locally
        toast.dismiss("saving");
        toast.warning("Disconnected - session not saved to server");

        // Add disconnection message
        useConversation.getState().addMessage({
          role: "assistant",
          content:
            "⚠️ Session ended locally. Could not save to server (disconnected).",
          timestamp: Date.now(),
        });

        stopSession();
        setIsActive(false);
        setIsSaving(false);
      }
    } catch (error: any) {
      console.error("Error ending session:", error);
      toast.dismiss("saving");
      toast.error("Failed to save session");

      // 🆕 Add error message to chat
      useConversation.getState().addMessage({
        role: "assistant",
        content:
          "😔 There was an error saving your session. Your local progress is still available.",
        timestamp: Date.now(),
      });

      stopSession();
      setIsActive(false);
      setIsSaving(false);
    }
  };

  return (
    <div className="h-28 bg-[#1A1F2E] border-t border-white/10 flex items-center justify-center gap-4 px-6">
      {/* Microphone Button */}
      <AudioButton />

      {/* Play/Pause Button */}
      <button
        onClick={isSessionActive && !isPaused ? handlePause : handlePlay}
        disabled={isConnecting || isProcessing || isSaving}
        className="w-12 h-12 rounded-full bg-[#2D3748] flex items-center justify-center hover:bg-[#2D3748]/70 transition-all relative group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting || isProcessing ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : isSessionActive && !isPaused ? (
          <Pause size={20} />
        ) : (
          <Play size={20} />
        )}
        <span className="opacity-0 translate-y-0 group-hover:opacity-100 group-hover:-translate-y-2 absolute -top-[50%] left-[50%] -translate-x-1/2 bg-[#2D3748] w-max px-2 py-1 text-xs rounded transition pointer-events-none">
          {isSessionActive && !isPaused
            ? "Pause Session"
            : isPaused
              ? "Resume Session"
              : "Start Session"}
        </span>
      </button>

      {/* Stop/End Button */}
      <button
        onClick={handleStop}
        disabled={!isSessionActive || isConnecting || isSaving}
        className="w-12 h-12 rounded-full bg-[#EF4444] flex items-center justify-center hover:bg-[#EF4444]/80 transition-all relative group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Square size={20} />
        )}
        <span className="opacity-0 translate-y-0 group-hover:opacity-100 group-hover:-translate-y-2 absolute -top-[50%] left-[50%] -translate-x-1/2 bg-[#2D3748] w-max px-2 py-1 text-xs rounded transition pointer-events-none">
          End Session
        </span>
      </button>
    </div>
  );
};

export default AudioControlButtons;
