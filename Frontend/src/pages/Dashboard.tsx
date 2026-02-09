// src/pages/Dashboard.tsx
import WelcomeSection from "@/components/Dashboard/WelcomeSection";
import QuickActions from "@/components/Dashboard/QuickActions";
import RecentSessions from "@/components/Dashboard/RecentSessions";
import RecommendedSection from "@/components/Dashboard/RecommendedSection";
import CurrentStreakCard from "@/components/Dashboard/CurrentStreakCard";
import DailyProgress from "@/components/Dashboard/DailyProgress";
import Milestones from "@/components/Dashboard/Milestones";
import Achievements from "@/components/Dashboard/Achievements";
import { DashboardProvider } from "@/context/DashboardContext";

export default function Dashboard() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-[#0F1419] text-white">
        {/* Main Content */}
        <div className="pt-20">
          {/* Welcome Section */}
          <WelcomeSection />

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Actions */}
                <QuickActions />

                {/* Recent Sessions */}
                <RecentSessions />

                {/* Recommended Practice */}
                <RecommendedSection />
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Current Streak Card */}
                <CurrentStreakCard />

                {/* Daily Goal Progress */}
                <DailyProgress />

                {/* Upcoming Milestones */}
                <Milestones />

                {/* Recent Achievements */}
                <Achievements />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
