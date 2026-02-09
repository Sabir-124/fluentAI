// src/pages/Conversation.tsx
import ControlPanel from "@/components/ControlPanel/ControlPanel";
import ConversationDisplay from "@/components/Conversation/ConversationDisplay";
import FeedbackPanel from "@/components/FeedbackPanel/FeedbackPanel";
import { useWebSocket } from "@/services/websocket";
import { useConversation } from "@/store/useConversation";
import { useRecording } from "@/store/useRecording";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast}  from "sonner";

export default function Conversation() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const ws = useWebSocket();
  const { reset: resetConversation } = useConversation();
  const { stopSession } = useRecording();

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Please sign in to continue");
      navigate("/");
    }
  }, [isSignedIn, isLoaded, navigate]);

  // Connect WebSocket on mount
  useEffect(() => {
    let connected = false;

    const connectWS = async () => {
      try {
        if (!ws.isConnected()) {
          toast.loading("Connecting...", { id: "ws-connect" });
          await ws.connect();
          connected = true;
          toast.success("Connected!", { id: "ws-connect" });
        }
      } catch (error: any) {
        console.error("WebSocket connection failed:", error);
        toast.error(error.message || "Failed to connect", { id: "ws-connect" });
      }
    };

    connectWS();

    // Cleanup on unmount
    return () => {
      if (connected && ws.isConnected()) {
        // End active session if any
        if (useRecording.getState().isSessionActive) {
          ws.endSession();
        }
        ws.disconnect();
      }

      // Reset stores
      resetConversation();
      stopSession();
    };
  }, []);

  // Handle beforeunload (user closing tab)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (useRecording.getState().isSessionActive) {
        e.preventDefault();
        e.returnValue = "";
        return "You have an active session. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-[#0F1419] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6C47FF]/30 border-t-[#6C47FF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#E8ECEF]/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1419] text-white flex flex-col pt-20">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Control Panel */}
        <ControlPanel />

        {/* Center Area - Conversation Display */}
        <ConversationDisplay />

        {/* Right Sidebar - Feedback Panel */}
        <FeedbackPanel />
      </div>
    </div>
  );
}
