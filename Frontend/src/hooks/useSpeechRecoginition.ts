// src/hooks/useSpeechRecognition.ts - NEW
import { useEffect, useRef, useState } from "react";

interface UseSpeechRecognitionProps {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export const useSpeechRecognition = ({
  lang = "en-US",
  continuous = true,
  interimResults = true,
}: UseSpeechRecognitionProps = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  // Check if speech recognition is supported
  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    if (!isSupported) {
      console.warn("Speech recognition not supported");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = continuous;
    recognitionRef.current.interimResults = interimResults;
    recognitionRef.current.lang = lang;

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimText += transcript;
        }
      }

      if (finalTranscript) {
        setTranscript((prev) => (prev + " " + finalTranscript).trim());
        setInterimTranscript("");
      } else {
        setInterimTranscript(interimText);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        console.error("Microphone permission denied");
      }
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        // Auto-restart if still supposed to be listening
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error("Failed to restart recognition:", error);
          setIsListening(false);
        }
      } else {
        setIsListening(false);
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [lang, continuous, interimResults, isSupported]);

  const startListening = () => {
    if (!isSupported || !recognitionRef.current) {
      console.error("Speech recognition not available");
      return;
    }

    try {
      setTranscript("");
      setInterimTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const resetTranscript = () => {
    setTranscript("");
    setInterimTranscript("");
  };

  return {
    isListening,
    transcript: transcript || interimTranscript,
    finalTranscript: transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  };
};
