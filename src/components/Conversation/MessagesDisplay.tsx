// src/components/Conversation/MessagesDisplay.tsx
import { useConversation } from "@/store/useConversation";
import { useEffect, useRef } from "react";
import { Info, Loader2 } from "lucide-react";

const MessagesDisplay = () => {
  const { messages, isAiTyping, isResponseFetched } = useConversation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-[#E8ECEF]/50">
            <p className="text-lg mb-2">👋 Ready to start practicing?</p>
            <p className="text-sm">
              Click the Play button to begin your session
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-6 py-4 ${
                  msg.role === "user"
                    ? "bg-linear-to-r from-[#6C47FF] to-[#FF6B9D]"
                    : "bg-[#1A1F2E]"
                }`}
                style={{
                  animation: `slideIn 0.3s ease-out ${idx * 0.05}s both`,
                }}
              >
                <p className="text-white leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
                <div className="text-xs text-white/40 mt-2">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {/* AI Typing Indicator */}
          {isAiTyping && isResponseFetched && (
            <div className="flex justify-start">
              <div className="bg-[#1A1F2E] rounded-2xl px-6 py-4 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#6C47FF]" />
                <span className="text-white/60 text-sm">AI is thinking...</span>
              </div>
            </div>
          )}

          {/* Response indicator */}
          {!isResponseFetched && (
            <div className="flex justify-start">
              <div className="bg-red-400/50 rounded-2xl ring-1 ring-red-400 px-6 py-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-sm">
                  API Limit reached. Please try again later.
                </span>
              </div>
            </div>
          )}
        </>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesDisplay;
