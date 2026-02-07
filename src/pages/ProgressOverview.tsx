import React, { useState } from "react";
import {
  TrendingUp,
  Calendar,
  Award,
  Target,
  BarChart3,
  Clock,
  Flame,
  BookOpen,
} from "lucide-react";

export default function ProgressOverview() {
  const [timeRange, setTimeRange] = useState("week");

  const overallStats = [
    {
      label: "Total Sessions",
      value: "127",
      change: "+12%",
      icon: BookOpen,
      gradient: "from-[#6C47FF] to-[#FF6B9D]",
    },
    {
      label: "Practice Hours",
      value: "42.5",
      change: "+8%",
      icon: Clock,
      gradient: "from-[#00D9C0] to-[#10B981]",
    },
    {
      label: "Current Streak",
      value: "15 days",
      change: "+5 days",
      icon: Flame,
      gradient: "from-[#F59E0B] to-[#EF4444]",
    },
    {
      label: "Words Mastered",
      value: "1,234",
      change: "+156",
      icon: Target,
      gradient: "from-[#FF6B9D] to-[#6C47FF]",
    },
  ];

  const languageProgress = [
    {
      name: "Spanish",
      level: "Intermediate",
      overall: 65,
      skills: { grammar: 72, pronunciation: 58, vocabulary: 68, fluency: 62 },
    },
    {
      name: "French",
      level: "Beginner",
      overall: 35,
      skills: { grammar: 42, pronunciation: 28, vocabulary: 38, fluency: 32 },
    },
    {
      name: "German",
      level: "Advanced",
      overall: 85,
      skills: { grammar: 88, pronunciation: 82, vocabulary: 86, fluency: 84 },
    },
  ];

  const weeklyActivity = [
    { day: "Mon", sessions: 3, minutes: 45 },
    { day: "Tue", sessions: 2, minutes: 30 },
    { day: "Wed", sessions: 4, minutes: 60 },
    { day: "Thu", sessions: 2, minutes: 30 },
    { day: "Fri", sessions: 5, minutes: 75 },
    { day: "Sat", sessions: 3, minutes: 45 },
    { day: "Sun", sessions: 1, minutes: 15 },
  ];

  const recentAchievements = [
    {
      name: "Perfect Week",
      description: "Completed 7 days in a row",
      date: "2 days ago",
      color: "#10B981",
    },
    {
      name: "Grammar Master",
      description: "No grammar errors in 5 sessions",
      date: "1 week ago",
      color: "#F59E0B",
    },
    {
      name: "Pronunciation Pro",
      description: "Perfect pronunciation score",
      date: "1 week ago",
      color: "#3B82F6",
    },
    {
      name: "Vocabulary Champion",
      description: "Learned 100 new words",
      date: "2 weeks ago",
      color: "#00D9C0",
    },
  ];

  const learningInsights = [
    {
      title: "Best Learning Time",
      value: "6-8 PM",
      description: "You learn most effectively in the evening",
    },
    {
      title: "Strongest Skill",
      value: "Grammar",
      description: "88% average across all languages",
    },
    {
      title: "Improvement Area",
      value: "Pronunciation",
      description: "Focus on this to boost overall fluency",
    },
    {
      title: "Recommended Goal",
      value: "30 min/day",
      description: "Increase practice time for faster progress",
    },
  ];

  const maxMinutes = Math.max(...weeklyActivity.map((d) => d.minutes));

  return (
    <div className="min-h-screen bg-[#0F1419] text-white">
      {/* Header */}
      <header className="h-20 bg-[#0F1419]/80 backdrop-blur-lg border-b border-white/10 flex items-center px-6">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] bg-clip-text text-transparent">
            FluentAI
          </div>
          <span className="text-[#E8ECEF]/50">|</span>
          <span className="text-[#E8ECEF]/80">Progress Overview</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Title & Time Range Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Learning Journey</h1>
            <p className="text-[#E8ECEF]/70">
              Track your progress and celebrate achievements
            </p>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  timeRange === range
                    ? "bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D]"
                    : "bg-[#1A1F2E] text-[#E8ECEF]/70 hover:bg-[#2D3748]"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {overallStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-6 hover:border-[#6C47FF] transition-all"
              style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-4`}
              >
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-[#E8ECEF]/60 mb-2">{stat.label}</div>
              <div className="flex items-center gap-1 text-xs text-[#10B981]">
                <TrendingUp size={12} />
                <span>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <BarChart3 className="text-[#6C47FF]" />
              Weekly Activity
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#6C47FF]" />
                <span className="text-[#E8ECEF]/70">Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00D9C0]" />
                <span className="text-[#E8ECEF]/70">Minutes</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 h-64">
            {weeklyActivity.map((day, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-4"
              >
                {/* Minutes Bar */}
                <div className="w-full flex flex-col items-center">
                  <div className="text-xs text-[#00D9C0] mb-1 font-semibold">
                    {day.minutes}m
                  </div>
                  <div className="w-full bg-[#2D3748] rounded-t-lg overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-[#00D9C0] to-[#10B981] transition-all duration-1000"
                      style={{
                        height: `${(day.minutes / maxMinutes) * 200}px`,
                        minHeight: "10px",
                      }}
                    />
                  </div>
                </div>

                {/* Day Label */}
                <div className="text-sm font-medium text-[#E8ECEF]/70">
                  {day.day}
                </div>

                {/* Sessions Indicator */}
                <div className="flex gap-1">
                  {Array.from({ length: day.sessions }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#6C47FF]"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Progress */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Language Mastery</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {languageProgress.map((lang, idx) => (
              <div
                key={idx}
                className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-6 hover:border-[#6C47FF] transition-all"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${idx * 0.15}s both`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{lang.name}</h3>
                    <p className="text-sm text-[#E8ECEF]/60">{lang.level}</p>
                  </div>

                  {/* Circular Progress */}
                  <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#2D3748"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="url(#gradient-progress)"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28 * (lang.overall / 100)} ${2 * Math.PI * 28}`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="gradient-progress"
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
                      <span className="text-sm font-bold">{lang.overall}%</span>
                    </div>
                  </div>
                </div>

                {/* Skill Breakdown */}
                <div className="space-y-3">
                  {Object.entries(lang.skills).map(([skill, value]) => (
                    <div key={skill}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#E8ECEF]/70 capitalize">
                          {skill}
                        </span>
                        <span className="font-semibold text-[#00D9C0]">
                          {value}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#2D3748] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00D9C0] to-[#6C47FF] rounded-full transition-all duration-1000"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Insights & Recent Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Learning Insights */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Learning Insights</h2>
            <div className="space-y-4">
              {learningInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-[#1A1F2E] border border-white/10 rounded-xl p-5 hover:border-[#6C47FF] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center flex-shrink-0">
                      <TrendingUp size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[#E8ECEF]/60">
                          {insight.title}
                        </span>
                        <span className="text-lg font-bold text-[#00D9C0]">
                          {insight.value}
                        </span>
                      </div>
                      <p className="text-xs text-[#E8ECEF]/70">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Award className="text-[#F59E0B]" />
              Recent Achievements
            </h2>
            <div className="space-y-4">
              {recentAchievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="bg-[#1A1F2E] border border-white/10 rounded-xl p-5 hover:border-[#6C47FF] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${achievement.color}20` }}
                    >
                      <Award size={24} style={{ color: achievement.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{achievement.name}</h3>
                      <p className="text-sm text-[#E8ECEF]/70 mb-1">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-[#E8ECEF]/50">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="mt-12 bg-gradient-to-r from-[#1A1F2E] to-[#0F1419] border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Target className="text-[#00D9C0]" />
              Current Goals
            </h2>
            <button className="px-4 py-2 bg-gradient-to-r from-[#6C47FF] to-[#FF6B9D] rounded-lg text-sm font-semibold hover:scale-105 transition-transform">
              Set New Goal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                goal: "Reach Intermediate Level in Spanish",
                progress: 65,
                target: 100,
                unit: "%",
              },
              {
                goal: "Practice 30 minutes daily",
                progress: 23,
                target: 30,
                unit: "min",
              },
              {
                goal: "Complete 100 conversations",
                progress: 73,
                target: 100,
                unit: "",
              },
              {
                goal: "Master 2000 vocabulary words",
                progress: 1234,
                target: 2000,
                unit: "",
              },
            ].map((goal, idx) => (
              <div key={idx} className="bg-[#2D3748] rounded-xl p-5">
                <h3 className="font-semibold mb-3">{goal.goal}</h3>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-bold text-[#00D9C0]">
                    {goal.progress}
                    {goal.unit}
                  </span>
                  <span className="text-sm text-[#E8ECEF]/60">
                    / {goal.target}
                    {goal.unit}
                  </span>
                </div>
                <div className="h-2 bg-[#0F1419] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00D9C0] to-[#6C47FF] rounded-full transition-all duration-1000"
                    style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
