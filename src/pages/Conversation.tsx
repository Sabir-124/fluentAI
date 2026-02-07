import { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Pause,
  Square,
  Globe,
  TrendingUp,
  Award,
  Clock,
  MessageSquare,
} from "lucide-react";

export default function Conversation() {
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState("corrections");
  const [sessionTime, setSessionTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (isRecording) {
        setSessionTime((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isRecording]);

  // Simulate audio level animation
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const scenarios = [
    { id: "restaurant", label: "Restaurant", icon: "🍽️" },
    { id: "travel", label: "Travel", icon: "✈️" },
    { id: "interview", label: "Interview", icon: "💼" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "medical", label: "Medical", icon: "🏥" },
    { id: "social", label: "Social", icon: "👥" },
  ];

  const corrections = [
    {
      type: "grammar",
      original: "I go to store yesterday",
      corrected: "I went to the store yesterday",
      explanation: 'Use past tense "went" for past actions',
      color: "#F59E0B",
    },
    {
      type: "pronunciation",
      word: "restaurant",
      ipa: "/ˈrestərɑːnt/",
      tip: "Emphasize the first syllable: RES-tuh-rahnt",
      color: "#3B82F6",
    },
    {
      type: "vocabulary",
      used: "big",
      better: "spacious, enormous, vast",
      context: "For describing rooms or spaces",
      color: "#10B981",
    },
  ];

  const messages = [
    {
      sender: "ai",
      text: "Hello! Let's practice ordering at a restaurant. I'll be your waiter today.",
    },
    { sender: "user", text: "Hi, I'd like to see the menu please." },
    {
      sender: "ai",
      text: "Of course! Here's our menu. What would you like to order?",
    },
    { sender: "user", text: "Can I have the pasta carbonara?" },
  ];

  return (
    <div className="min-h-screen bg-[#0F1419] text-white flex flex-col">
      {/* Header */}
      <header className="h-20 bg-[#0F1419]/80 backdrop-blur-lg border-b border-white/10 flex items-center px-6">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] bg-clip-text text-transparent">
            FluentAI
          </div>
          <span className="text-[#E8ECEF]/50">|</span>
          <span className="text-[#E8ECEF]/80">Conversation Practice</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Control Panel */}
        <div className="w-80 bg-[#1A1F2E] border-r border-white/10 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Language Selector */}
            <div>
              <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">
                Language
              </label>
              <select className="w-full bg-[#2D3748] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C47FF] focus:outline-none transition-colors">
                <option>🇪🇸 Spanish</option>
                <option>🇫🇷 French</option>
                <option>🇩🇪 German</option>
                <option>🇯🇵 Japanese</option>
                <option>🇨🇳 Mandarin</option>
              </select>
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">
                Difficulty
              </label>
              <div className="flex gap-2">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <button
                    key={level}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      level === "Intermediate"
                        ? "bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] text-white"
                        : "bg-[#2D3748] text-[#E8ECEF]/70 hover:bg-[#2D3748]/70"
                    }`}
                  >
                    {level.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Selection */}
            <div>
              <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">
                Scenario
              </label>
              <div className="grid grid-cols-2 gap-2">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    className={`p-3 rounded-lg border transition-all ${
                      scenario.id === "restaurant"
                        ? "border-[#6C47FF] bg-[#6C47FF]/10"
                        : "border-white/10 bg-[#2D3748] hover:border-[#6C47FF]/50"
                    }`}
                  >
                    <div className="text-2xl mb-1">{scenario.icon}</div>
                    <div className="text-xs text-[#E8ECEF]/80">
                      {scenario.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Session Timer */}
            <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] rounded-2xl p-6 text-center">
              <Clock className="mx-auto mb-2 text-[#00D9C0]" size={24} />
              <div className="text-4xl font-bold mb-1">
                {formatTime(sessionTime)}
              </div>
              <div className="text-xs text-[#E8ECEF]/50">Session Duration</div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#2D3748] rounded-lg">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#6C47FF]" />
                  <span className="text-sm text-[#E8ECEF]/70">
                    Words Spoken
                  </span>
                </div>
                <span className="font-bold text-[#00D9C0]">142</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#2D3748] rounded-lg">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-[#FF6B9D]" />
                  <span className="text-sm text-[#E8ECEF]/70">Corrections</span>
                </div>
                <span className="font-bold text-[#F59E0B]">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#2D3748] rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#10B981]" />
                  <span className="text-sm text-[#E8ECEF]/70">Fluency</span>
                </div>
                <span className="font-bold text-[#10B981]">87%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Area - Conversation Display */}
        <div className="flex-1 flex flex-col bg-[#0F1419]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-6 py-4 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D]"
                      : "bg-[#1A1F2E]"
                  }`}
                  style={{
                    animation: `slideIn 0.3s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <p className="text-white leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Audio Visualizer */}
          <div className="h-20 bg-[#1A1F2E]/50 border-t border-white/10 flex items-center justify-center px-6">
            <div className="flex items-center gap-1 h-12">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-[#00D9C0] to-[#6C47FF] rounded-full transition-all duration-100"
                  style={{
                    height: isRecording ? `${Math.random() * 100}%` : "10%",
                    opacity: isRecording ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="h-28 bg-[#1A1F2E] border-t border-white/10 flex items-center justify-center gap-4 px-6">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`w-18 h-18 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording
                  ? "bg-[#00D9C0] shadow-[0_0_30px_rgba(0,217,192,0.5)] animate-pulse"
                  : "bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] hover:scale-110"
              }`}
            >
              {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
            </button>
            <button className="w-12 h-12 rounded-full bg-[#2D3748] flex items-center justify-center hover:bg-[#2D3748]/70 transition-all">
              <Pause size={20} />
            </button>
            <button className="w-12 h-12 rounded-full bg-[#EF4444] flex items-center justify-center hover:bg-[#EF4444]/80 transition-all">
              <Square size={20} />
            </button>
          </div>
        </div>

        {/* Right Sidebar - Feedback Panel */}
        <div className="w-96 bg-[#1A1F2E] border-l border-white/10 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {[
              { id: "corrections", label: "Corrections" },
              { id: "context", label: "Context" },
              { id: "progress", label: "Progress" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "text-[#6C47FF] border-b-2 border-[#6C47FF]"
                    : "text-[#E8ECEF]/60 hover:text-[#E8ECEF]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "corrections" && (
              <div className="space-y-4">
                {corrections.map((correction, idx) => (
                  <div
                    key={idx}
                    className="bg-[#2D3748] rounded-xl p-4 border-l-4"
                    style={{ borderLeftColor: correction.color }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: correction.color }}
                      />
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: correction.color }}
                      >
                        {correction.type}
                      </span>
                    </div>

                    {correction.type === "grammar" && (
                      <>
                        <div className="text-sm text-[#E8ECEF]/50 line-through mb-1">
                          {correction.original}
                        </div>
                        <div className="text-sm text-[#10B981] font-medium mb-2">
                          {correction.corrected}
                        </div>
                        <p className="text-xs text-[#E8ECEF]/70">
                          {correction.explanation}
                        </p>
                      </>
                    )}

                    {correction.type === "pronunciation" && (
                      <>
                        <div className="text-lg font-bold mb-1">
                          {correction.word}
                        </div>
                        <div className="text-sm text-[#3B82F6] mb-2">
                          {correction.ipa}
                        </div>
                        <p className="text-xs text-[#E8ECEF]/70">
                          {correction.tip}
                        </p>
                      </>
                    )}

                    {correction.type === "vocabulary" && (
                      <>
                        <div className="text-sm mb-1">
                          <span className="text-[#E8ECEF]/50">Used: </span>
                          <span className="font-medium">{correction.used}</span>
                        </div>
                        <div className="text-sm mb-2">
                          <span className="text-[#E8ECEF]/50">Better: </span>
                          <span className="text-[#10B981] font-medium">
                            {correction.better}
                          </span>
                        </div>
                        <p className="text-xs text-[#E8ECEF]/70">
                          {correction.context}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "context" && (
              <div className="space-y-4">
                <div className="bg-[#2D3748] rounded-xl p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Globe size={18} className="text-[#00D9C0]" />
                    Cultural Tip
                  </h3>
                  <p className="text-sm text-[#E8ECEF]/70 leading-relaxed">
                    In Spanish restaurants, it's common to say "la cuenta, por
                    favor" when asking for the check, rather than making a
                    writing gesture.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "progress" && (
              <div className="space-y-6">
                {/* Circular Progress */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#2D3748"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56 * 0.87} ${2 * Math.PI * 56}`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#00D9C0" />
                          <stop offset="100%" stopColor="#6C47FF" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">87%</span>
                    </div>
                  </div>
                  <div className="text-sm text-[#E8ECEF]/60">
                    Overall Fluency
                  </div>
                </div>

                {/* Skill Bars */}
                <div className="space-y-4">
                  {[
                    { skill: "Grammar", value: 92, color: "#F59E0B" },
                    { skill: "Pronunciation", value: 78, color: "#3B82F6" },
                    { skill: "Vocabulary", value: 85, color: "#10B981" },
                    { skill: "Fluency", value: 90, color: "#00D9C0" },
                  ].map((item) => (
                    <div key={item.skill}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-[#E8ECEF]/80">
                          {item.skill}
                        </span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: item.color }}
                        >
                          {item.value}%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2D3748] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${item.value}%`,
                            background: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
