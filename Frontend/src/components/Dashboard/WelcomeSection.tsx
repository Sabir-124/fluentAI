// src/components/Dashboard/WelcomeSection.tsx
import { Clock, Flame, MessageSquare, TrendingUp } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { useUser } from "@clerk/clerk-react";

const formatDuration = (milliseconds: number): string => {
  const totalMinutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

const WelcomeSection = () => {
  const { data, loading } = useDashboard();
  const { user } = useUser();

  // Calculate total duration from all progress
  const totalDuration =
    data?.progress?.reduce((sum, p) => sum + (p.totalDuration || 0), 0) || 0;

  // Calculate average accuracy across all languages
  const averageAccuracy = data?.progress?.length
    ? Math.round(
        data.progress.reduce((sum, p) => sum + (p.averageAccuracy || 0), 0) /
          data.progress.length,
      )
    : 0;

  // Calculate streak from recent sessions
  const calculateStreak = (): number => {
    if (!data?.recentSessions || data.recentSessions.length === 0) return 0;

    const sortedSessions = [...data.recentSessions]
      .filter((s) => s.endTime)
      .sort(
        (a, b) =>
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
      );

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedSessions.length; i++) {
      const sessionDate = new Date(sortedSessions[i].startTime);
      sessionDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const currentStreak = calculateStreak();
  const totalSessions = data?.usage?.totalSessions || 0;

  const stats = [
    {
      icon: Flame,
      gradient: {
        from: "#F59E0B",
        to: "#EF4444",
      },
      stat: loading
        ? "..."
        : `${currentStreak} ${currentStreak === 1 ? "Day" : "Days"}`,
      description: "Current practice streak",
    },
    {
      icon: Clock,
      gradient: {
        from: "#00D9C0",
        to: "#6C47FF",
      },
      stat: loading ? "..." : formatDuration(totalDuration),
      description: "All-time practice duration",
    },
    {
      icon: TrendingUp,
      gradient: {
        from: "#10B981",
        to: "#00D9C0",
      },
      stat: loading ? "..." : `${averageAccuracy}%`,
      description: "Average accuracy",
    },
    {
      icon: MessageSquare,
      gradient: {
        from: "#6C47FF",
        to: "#FF6B9D",
      },
      stat: loading
        ? "..."
        : `${totalSessions} ${totalSessions === 1 ? "Session" : "Sessions"}`,
      description: "Practice sessions completed",
    },
  ];

  const getUserName = () => {
    if (!user) return "User";

    const firstName = user.firstName || "";
    const lastName = user.lastName || "";

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (user.emailAddresses[0]) {
      return user.emailAddresses[0].emailAddress.split("@")[0];
    }

    return "User";
  };

  const getCurrentDate = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const now = new Date();
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();

    return `${dayName}, ${monthName} ${day}, ${year}`;
  };

  return (
    <section className="bg-linear-to-b from-[#1A1F2E] to-[#0F1419] py-10 px-6 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {getUserName()}! 👋
          </h1>
          <p className="text-[#E8ECEF]/70 text-lg">
            {getCurrentDate()} • Keep up the great work!
          </p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 hover:border-[#6C47FF] transition-all"
              >
                <div
                  className="inline-flex p-3 rounded-xl mb-4"
                  style={{
                    background: `linear-gradient(to right, ${stat.gradient.from}, ${stat.gradient.to})`,
                  }}
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
