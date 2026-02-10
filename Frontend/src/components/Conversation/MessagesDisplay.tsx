// src/components/Conversation/MessagesDisplay.tsx
import { useConversation } from "@/store/useConversation";
import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";

const MessagesDisplay = () => {
  const { messages, isAiTyping } = useConversation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  if (messages.length === 0 && !isAiTyping) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#6C47FF]/20 to-[#00D9C0]/20 rounded-full flex items-center justify-center">
            <Bot size={40} className="text-[#6C47FF]" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Start Your Conversation
          </h3>
          <p className="text-[#E8ECEF]/60">
            Click "Start Session" below to begin practicing your language skills
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
      {messages.map((message, idx) => {
        const isUser = message.role === "user";
        return (
          <div
            key={idx}
            className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
          >
            {!isUser && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
            )}

            <div
              className={`max-w-[70%] rounded-2xl p-4 ${
                isUser
                  ? "bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] text-white"
                  : "bg-[#2D3748] text-[#E8ECEF]"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <span className="text-xs opacity-60 mt-2 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>

            {isUser && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D9C0] to-[#10B981] flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-white" />
              </div>
            )}
          </div>
        );
      })}

      {/* AI Typing Indicator */}
      {isAiTyping && (
        <div className="flex gap-3 justify-start">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div className="bg-[#2D3748] rounded-2xl p-4">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#6C47FF] rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-[#6C47FF] rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-[#6C47FF] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesDisplay;
