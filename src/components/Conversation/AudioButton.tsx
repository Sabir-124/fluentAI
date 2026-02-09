// src/components/Conversation/AudioButton.tsx - FIXED VERSION
import { useRecording } from "@/store/useRecording";
import { useConversation } from "@/store/useConversation";
import { useWebSocket } from "@/services/websocket";
import { Mic, MicOff, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any)
    | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const AudioButton = () => {
  const { isMicActive, isSessionActive } = useRecording();
  const { addMessage, language } = useConversation();
  const ws = useWebSocket();

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const shouldRestartRef = useRef(true); // 🆕 Track if we should auto-restart
  const [isSupported, setIsSupported] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState("");

  // Check browser support
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      console.error("❌ Speech Recognition not supported in this browser");
      toast.error(
        "Speech recognition not supported. Please use Chrome, Edge, or Safari.",
        { duration: 5000 },
      );
    } else {
      console.log("✅ Speech Recognition supported!");
    }
  }, []);

  // Map language codes
  const getLanguageCode = (lang: string): string => {
    const languageCodes: Record<string, string> = {
      spanish: "es-ES",
      french: "fr-FR",
      german: "de-DE",
      japanese: "ja-JP",
      chinese: "zh-CN",
      italian: "it-IT",
      portuguese: "pt-PT",
      korean: "ko-KR",
      russian: "ru-RU",
      arabic: "ar-SA",
      hindi: "hi-IN",
      english: "en-US",
    };
    return languageCodes[lang.toLowerCase()] || "en-US";
  };

  // 🆕 START - Initialize speech recognition when mic is activated
  useEffect(() => {
    if (!isSupported) return;

    if (isMicActive && isSessionActive) {
      // START microphone
      console.log("🎤 Starting microphone...");
      shouldRestartRef.current = true; // Enable auto-restart
      startSpeechRecognition();
    } else {
      // STOP microphone
      console.log("🛑 Stopping microphone...");
      shouldRestartRef.current = false; // Disable auto-restart
      stopSpeechRecognition();
    }

    // Cleanup on unmount
    return () => {
      shouldRestartRef.current = false;
      stopSpeechRecognition();
    };
  }, [isMicActive, isSessionActive, isSupported, language]);

  const startSpeechRecognition = () => {
    // If already running, don't start again
    if (recognitionRef.current) {
      console.log("⚠️ Speech recognition already running");
      return;
    }

    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      // Configure
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = getLanguageCode(language);
      recognition.maxAlternatives = 1;

      console.log(`🎤 Speech recognition language: ${recognition.lang}`);

      // Handle results
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        setInterimTranscript(interim);

        if (final) {
          console.log(`🎤 Final: "${final}"`);
          handleTranscript(final);
          setInterimTranscript(""); // Clear interim after final
        }
      };

      // Handle errors
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("❌ Speech error:", event.error);

        if (event.error === "no-speech") {
          // Don't show toast for no-speech, just continue listening
          console.log("ℹ️ No speech detected, continuing...");
        } else if (event.error === "audio-capture") {
          toast.error("Microphone not accessible");
          useRecording.getState().stopMic();
        } else if (event.error === "not-allowed") {
          toast.error("Microphone permission denied");
          useRecording.getState().stopMic();
        } else if (event.error === "network") {
          toast.error("Network error during speech recognition");
        } else {
          console.error(`Speech error: ${event.error}`);
        }
      };

      // Handle start
      recognition.onstart = () => {
        console.log("✅ Speech recognition started");
        toast.success(`🎤 Listening in ${language}...`, { duration: 2000 });
      };

      // 🆕 Handle end - ONLY restart if shouldRestartRef is true
      recognition.onend = () => {
        console.log("⏹️ Speech recognition ended");
        recognitionRef.current = null;

        // Only restart if:
        // 1. shouldRestartRef is true (user didn't manually stop)
        // 2. isMicActive is still true
        // 3. isSessionActive is still true
        if (
          shouldRestartRef.current &&
          useRecording.getState().isMicActive &&
          useRecording.getState().isSessionActive
        ) {
          console.log("🔄 Auto-restarting speech recognition...");
          // Small delay before restart to avoid conflicts
          setTimeout(() => {
            if (shouldRestartRef.current) {
              startSpeechRecognition();
            }
          }, 100);
        } else {
          console.log("✋ Not restarting (manually stopped or session ended)");
        }
      };

      // Start
      recognition.start();
      recognitionRef.current = recognition;
      console.log("🎤 Recognition initialized and started");
    } catch (error) {
      console.error("Failed to initialize speech recognition:", error);
      toast.error("Failed to start speech recognition");
      useRecording.getState().stopMic();
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      console.log("🛑 Stopping speech recognition...");

      try {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      } catch (error) {
        console.error("Error stopping recognition:", error);
      }

      setInterimTranscript("");
      console.log("✅ Speech recognition stopped");
    }
  };

  // Send transcript to backend
  const handleTranscript = (transcript: string) => {
    const trimmed = transcript.trim();
    if (!trimmed) return;

    console.log(`📤 Sending: "${trimmed}"`);

    // Add to UI
    addMessage({
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    });

    // Send to backend
    if (ws.isConnected()) {
      ws.sendMessage(trimmed);
    } else {
      toast.error("Not connected to server");
    }
  };

  // 🆕 Toggle microphone on/off
  const handleClick = () => {
    if (!isSupported) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    if (!isSessionActive) {
      toast.error("Start a session first!");
      return;
    }

    // Toggle microphone
    if (isMicActive) {
      console.log("👤 User clicked to STOP mic");
      shouldRestartRef.current = false; // Prevent auto-restart
      useRecording.getState().stopMic();
      toast.info("Microphone stopped");
    } else {
      console.log("👤 User clicked to START mic");
      shouldRestartRef.current = true; // Enable auto-restart
      useRecording.getState().startMic();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={!isSessionActive || !isSupported}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all relative group ${
          isMicActive
            ? "bg-linear-to-r from-[#00D9C0] to-[#6C47FF] animate-pulse shadow-lg shadow-[#6C47FF]/50"
            : "bg-[#2D3748] hover:bg-[#2D3748]/70"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isMicActive ? (
          <>
            <Mic size={24} className="text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </>
        ) : (
          <MicOff size={24} className="text-white/60" />
        )}

        <span className="opacity-0 translate-y-0 group-hover:opacity-100 group-hover:-translate-y-2 absolute -top-[60px] left-[50%] -translate-x-1/2 bg-[#2D3748] w-max px-3 py-2 text-xs rounded transition pointer-events-none whitespace-nowrap z-10">
          {!isSupported ? (
            "❌ Not supported"
          ) : !isSessionActive ? (
            "Start session first"
          ) : isMicActive ? (
            <>
              🔴 Click to STOP mic
              <br />
              <span className="text-[10px] text-white/60">
                Session continues
              </span>
            </>
          ) : (
            <>
              🎤 Click to START mic
              <br />
              <span className="text-[10px] text-white/60">
                100% FREE - Browser speech API
              </span>
            </>
          )}
        </span>
      </button>

      {/* Interim transcript */}
      {interimTranscript && (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap max-w-xs overflow-hidden text-ellipsis border border-[#6C47FF]/50">
          <span className="text-white/60">Listening: </span>
          <span className="text-[#00D9C0]">{interimTranscript}</span>
        </div>
      )}

      {/* Browser warning */}
      {!isSupported && (
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-max max-w-sm">
          <div className="bg-red-500/10 border border-red-500 rounded-lg px-3 py-2 flex items-center gap-2 text-xs">
            <AlertCircle size={16} className="text-red-500 shrink-0" />
            <span className="text-red-500">Use Chrome, Edge, or Safari</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioButton;
