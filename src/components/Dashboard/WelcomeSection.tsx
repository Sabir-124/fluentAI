import { user } from "@/pages/DashBoard";
import { Clock, Flame, MessageSquare, TrendingUp } from "lucide-react";

const WelcomeSection = () => {
  return (
    <section className="bg-linear-to-b from-[#1A1F2E] to-[#0F1419] py-10 px-6 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-[#E8ECEF]/70 text-lg">
            Friday, February 7, 2026 • Keep up the great work!
          </p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Current Streak */}
          <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all">
            <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-[#F59E0B] to-[#EF4444] mb-4">
              <Flame size={24} />
            </div>
            <div className="text-3xl font-bold mb-1">
              🔥 {user.stats.currentStreak} Days
            </div>
            <div className="text-sm text-[#E8ECEF]/60">
              Days practiced consecutively
            </div>
          </div>

          {/* Total Practice Time */}
          <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all">
            <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-[#00D9C0] to-[#6C47FF] mb-4">
              <Clock size={24} />
            </div>
            <div className="text-3xl font-bold mb-1">
              ⏱️ {user.stats.totalPracticeTime}
            </div>
            <div className="text-sm text-[#E8ECEF]/60">
              All-time practice duration
            </div>
          </div>

          {/* Fluency Score */}
          <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all">
            <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-[#10B981] to-[#00D9C0] mb-4">
              <TrendingUp size={24} />
            </div>
            <div className="text-3xl font-bold mb-1">
              📊 {user.stats.fluencyScore}%
            </div>
            <div className="text-sm text-[#E8ECEF]/60">
              Overall language proficiency
            </div>
          </div>

          {/* Sessions This Week */}
          <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all">
            <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] mb-4">
              <MessageSquare size={24} />
            </div>
            <div className="text-3xl font-bold mb-1">
              💬 {user.stats.sessionsThisWeek} Sessions
            </div>
            <div className="text-sm text-[#E8ECEF]/60">
              Practice sessions completed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
