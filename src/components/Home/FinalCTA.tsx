import { Play, Globe, Mic, Brain } from "lucide-react";
import { DottedGlowBackground } from "../ui/dotted-glow-background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const stats = [
  { icon: Mic, value: "Real-time", label: "Voice Practice" },
  { icon: Globe, value: "20+", label: "Languages" },
  { icon: Brain, value: "AI-Powered", label: "Corrections" },
];

export default function FinalCTASplit() {
  return (
    <section className="py-20 px-[5%] bg-linear-to-b from-[#0F1419] to-[#1A1F2E] shadow-[0_-30px_50px_50px_#10151A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center">
            <DottedGlowBackground
              className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
              opacity={1}
              gap={10}
              radius={1.6}
              colorLightVar="--color-white"
              glowColorLightVar="--color-white"
              colorDarkVar="--color-white"
              glowColorDarkVar="--color-white"
              backgroundOpacity={1}
              speedMin={0.3}
              speedMax={1.6}
              speedScale={1}
            />

            <div className="relative z-10">
              <div className="inline-block bg-linear-to-r from-[#00D9C0] to-[#10B981] text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
                <FontAwesomeIcon icon={faStar} /> Start Today
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Your AI Language Partner Awaits
              </h2>

              <p className="text-lg text-[#E8ECEF] opacity-80 mb-8">
                Stop studying. Start speaking. Join our community of language
                learners who are achieving fluency through real conversations
                with AI.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="w-8 h-8 text-[#00D9C0] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[#E8ECEF] opacity-70">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] text-white font-bold px-10 py-4 text-lg rounded-xl hover:scale-105 hover:shadow-[0_12px_32px_rgba(108,71,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2">
                  Start Learning
                </button>
                <button className="group bg-transparent border-2 border-[#6C47FF] text-white font-semibold px-10 py-4 text-lg rounded-xl hover:bg-[#6C47FF] transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative">
            {/* Gradient Circle Background */}
            <div className="absolute inset-0 bg-linear-to-br from-[#6C47FF] to-[#00D9C0] opacity-20 rounded-full blur-3xl"></div>

            {/* Main Visual Card */}
            <div className="relative bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 shadow-2xl">
              {/* Mock Conversation Interface */}
              <div className="space-y-4">
                {/* AI Message */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#6C47FF] to-[#00D9C0] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <div className="bg-[#2D3748] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-white text-sm">
                      Bonjour! Comment allez-vous?
                    </p>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] bg-opacity-20 border border-[#6C47FF] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-white text-sm">Je vais bien, merci!</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#FF6B9D] to-[#6C47FF] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">You</span>
                  </div>
                </div>

                {/* Correction Badge */}
                <div className="bg-[#10B981] bg-opacity-20 border border-[#10B981] rounded-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">
                    Perfect pronunciation! 🎉
                  </span>
                </div>
              </div>

              {/* Microphone Button */}
              <div className="mt-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#6C47FF] to-[#00D9C0] flex items-center justify-center shadow-[0_8px_24px_rgba(108,71,255,0.5)] animate-pulse">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
