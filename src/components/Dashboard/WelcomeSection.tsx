import { user } from "@/pages/Dashboard";
import { Clock, Flame, MessageSquare, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Flame,
    gradient: {
      from: "#F59E0B",
      to: "#EF4444",
    },
    stat: "7 Days",
    description: "Days practiced consecutively",
  },
  {
    icon: Clock,
    gradient: {
      from: "#00D9C0",
      to: "#6C47FF",
    },
    stat: "12h 34m",
    description: "All-time practice duration",
  },
  {
    icon: TrendingUp,
    gradient: {
      from: "#10B981",
      to: "#00D9C0",
    },
    stat: "75%",
    description: "Overall language proficiency",
  },
  {
    icon: MessageSquare,
    gradient: {
      from: "#6C47FF",
      to: "#FF6B9D",
    },
    stat: "5 Sessions",
    description: "Practice sessions completed",
  },
];

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
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.stat}
                className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-linear-to-r from-[${stat.gradient.from}] to-[${stat.gradient.to}] mb-4`}
                >
                  <Icon size={24} />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.stat}</div>
                <div className="text-sm text-[#E8ECEF]/60">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
