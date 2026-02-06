import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/spotlight";

const HeroSection = () => {
  return (
    <div className="relative flex h-[95vh] shadow-[0_30px_50px_20px_#000] w-full overflow-hidden bg-black/96 antialiased items-center justify-center px-5">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-size-[40px_40px] select-none",
          "bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight className="top-0 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-7xl pt-20 space-y-4">
        {/* headline */}
        <h1 className="text-[35px] sm:text-[48px] md:text-[64px] font-bold text-white text-center z-10">
          Master Any Language Through Real Conversations
        </h1>

        <h1 className="sm:text-[20px] text-[#E8ECEF] opacity-80 text-center z-10">
          Practice real conversations with AI. Get instant feedback. Speak
          fluently.
        </h1>

        {/* CTA buttons */}
        <div className="flex justify-center gap-2 sm:gap-5 text-sm sm:text-[18px] z-10">
          <button className="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] px-9 sm:px-12 py-2 sm:py-4 font-semibold rounded-xl shadow-[0_8px_24px_rgba(108,71,255,0.4)] hover:scale-105 hover:shadow-[0_12px_32px_rgba(108,71,255,0.6)] transition-all duration-300 cursor-pointer">
            Start Learning
          </button>

          <button className="bg-transparent px-9 sm:px-12 py-2 sm:py-4 font-medium rounded-xl border-2 border-white/70 hover:border-[#6C47FF] transition duration-300 text-white hover:text-[#6C47FF] cursor-pointer">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
