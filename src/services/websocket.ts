// src/services/websocket.ts - UPDATED FOR FREE SPEECH RECOGNITION
import { io, Socket } from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";

const WS_URL = import.meta.env.VITE_WS_URL || "http://localhost:5002";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface Correction {
  type: string;
  severity: string;
  original: string;
  corrected: string;
  explanation: string;
  timestamp: number;
}

export interface SessionConfig {
  language: string;
  difficulty: string;
  scenario: string;
}

export interface SessionStartedData {
  sessionId: string;
  language: string;
  difficulty: string;
  scenario: string;
  starterMessage: string;
  userId: string;
  authenticated: boolean;
  speechRecognitionMode?: string; // NEW
  timestamp: number;
}

export interface AIResponseData {
  response: string;
  language: string;
  corrections?: {
    hasErrors: boolean;
    corrections: Correction[];
    culturalNotes: string[];
    encouragement: string;
  } | null;
  fromSpeech?: boolean; // NEW
  timestamp: number;
}

export interface SessionEndedData {
  sessionId: string;
  duration: number;
  messageCount: number;
  userMessages: number;
  aiMessages: number;
  corrections: number;
  vocabularyLearned: string[];
  mistakePatterns: Record<string, number>;
  summary: any;
  timestamp: number;
  saved: boolean;
}

type EventListener = (...args: any[]) => void;

class WebSocketService {
  private socket: Socket | null = null;
  private token: string | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private eventListeners: Map<string, Set<EventListener>> = new Map();

  /**
   * Initialize WebSocket connection with authentication
   */
  async connect(getToken: () => Promise<string | null>): Promise<boolean> {
    try {
      this.token = await getToken();

      if (!this.token) {
        console.error("❌ No authentication token available");
        throw new Error("Authentication required");
      }

      console.log("🔌 Connecting to WebSocket server...");

      this.socket = io(WS_URL, {
        auth: {
          token: this.token,
        },
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });

      this.setupEventHandlers();

      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Connection timeout"));
        }, 10000);

        this.socket!.once("connected", (data) => {
          clearTimeout(timeout);
          console.log("✅ WebSocket connected:", data);

          // Check if using free speech recognition
          if (data.speechRecognitionMode === "frontend") {
            console.log("💡 Using FREE browser speech recognition!");
          }

          this.reconnectAttempts = 0;
          resolve(true);
        });

        this.socket!.once("connect_error", (error) => {
          clearTimeout(timeout);
          console.error("❌ Connection error:", error);
          reject(error);
        });
      });
    } catch (error) {
      console.error("❌ WebSocket connection failed:", error);
      throw error;
    }
  }

  /**
   * Setup all event handlers
   */
  private setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("✅ Socket connected");
      this.emit("connection-status", { connected: true });
    });

    this.socket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
      this.emit("connection-status", { connected: false, reason });
    });

    this.socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error);
      this.emit("connection-error", error);
    });

    this.socket.on("session-started", (data: SessionStartedData) => {
      console.log("▶️ Session started:", data);
      this.emit("session-started", data);
    });

    this.socket.on("session-ended", (data: SessionEndedData) => {
      console.log("⏹️ Session ended:", data);
      this.emit("session-ended", data);
    });

    this.socket.on("ai-response", (data: AIResponseData) => {
      console.log("🤖 AI response received");
      this.emit("ai-response", data);
    });

    this.socket.on("ai-processing", (data) => {
      console.log("⏳ AI processing...");
      this.emit("ai-processing", data);
    });

    this.socket.on("usage-stats", (data) => {
      console.log("📊 Usage stats:", data);
      this.emit("usage-stats", data);
    });

    this.socket.on("error", (error) => {
      console.error("❌ Socket error:", error);
      this.emit("error", error);
    });

    this.socket.on("warning", (warning) => {
      console.warn("⚠️ Socket warning:", warning);
      this.emit("warning", warning);
    });
  }

  /**
   * Start a learning session
   */
  startSession(config: SessionConfig): void {
    if (!this.socket?.connected) {
      throw new Error("Socket not connected");
    }

    console.log("▶️ Starting session:", config);
    this.socket.emit("start-session", config);
  }
  

  /**
   * Send a text message (typed)
   */
  sendMessage(message: string): void {
    if (!this.socket?.connected) {
      throw new Error("Socket not connected");
    }

    console.log("💬 Sending message:", message.substring(0, 50) + "...");
    this.socket.emit("message", { message, role: "user" });
  }

  /**
   * 🔥 NEW: Send speech transcript (from browser speech recognition)
   * This replaces audio chunk sending - completely FREE!
   */
  sendSpeechTranscript(transcript: string): void {
    if (!this.socket?.connected) {
      throw new Error("Socket not connected");
    }

    console.log(
      "🎤 Sending speech transcript:",
      transcript.substring(0, 50) + "...",
    );
    this.socket.emit("speech-transcribed", { transcript });
  }

  /**
   * DEPRECATED: No longer needed with browser speech recognition
   */
  sendAudioChunk(audioData: ArrayBuffer | string): void {
    console.warn(
      "⚠️  sendAudioChunk is deprecated - using browser speech recognition",
    );
  }

  /**
   * DEPRECATED: No longer needed
   */
  processAudio(): void {
    console.warn(
      "⚠️  processAudio is deprecated - using browser speech recognition",
    );
  }

  /**
   * End the current session
   */
  endSession(): void {
    if (!this.socket?.connected) {
      throw new Error("Socket not connected");
    }

    console.log("⏹️ Ending session...");
    this.socket.emit("end-session");
  }

  /**
   * Get usage statistics
   */
  getUsage(): void {
    if (!this.socket?.connected) {
      throw new Error("Socket not connected");
    }

    this.socket.emit("get-usage");
  }

  /**
   * Subscribe to an event
   */
  on(event: string, callback: EventListener): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }

    this.eventListeners.get(event)!.add(callback);

    return () => {
      this.eventListeners.get(event)?.delete(callback);
    };
  }

  /**
   * Emit event to all listeners
   */
  private emit(event: string, ...args: any[]): void {
    this.eventListeners.get(event)?.forEach((callback) => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }

  /**
   * Disconnect socket
   */
  disconnect(): void {
    if (this.socket) {
      console.log("🔌 Disconnecting WebSocket...");
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  /**
   * Get socket ID
   */
  getSocketId(): string | undefined {
    return this.socket?.id;
  }
}

export const wsService = new WebSocketService();

export const useWebSocket = () => {
  const { getToken } = useAuth();

  const connect = async () => {
    return await wsService.connect(getToken);
  };

  return {
    connect,
    disconnect: () => wsService.disconnect(),
    startSession: (config: SessionConfig) => wsService.startSession(config),
    sendMessage: (message: string) => wsService.sendMessage(message),
    sendSpeechTranscript: (transcript: string) =>
      wsService.sendSpeechTranscript(transcript), // NEW
    endSession: () => wsService.endSession(),
    getUsage: () => wsService.getUsage(),
    on: (event: string, callback: EventListener) =>
      wsService.on(event, callback),
    isConnected: () => wsService.isConnected(),
    getSocketId: () => wsService.getSocketId(),
  };
};
