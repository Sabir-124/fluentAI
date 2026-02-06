import {
  faBriefcase,
  faLightbulb,
  faPlane,
  faShoppingBag,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Mic,
  CheckCircle,
  Globe,
  MapPin,
  TrendingUp,
  Sliders,
  ArrowRight,
  Sparkles,
  Volume2,
  MessageSquare,
  Brain,
  Target,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: Mic,
    title: "Real-Time Voice Conversations",
    tagline: "Practice speaking naturally with AI",
    description:
      "Experience the future of language learning with live, interactive conversations powered by Gemini AI. Our advanced speech recognition technology understands your voice in real-time, creating natural dialogue flows that mimic real-world conversations.",
    gradient: "from-[#6C47FF] to-[#00D9C0]",
    benefits: [
      {
        icon: Volume2,
        title: "Natural Conversation Flow",
        text: "AI responds instantly to your speech, creating realistic back-and-forth dialogue",
      },
      {
        icon: MessageSquare,
        title: "Context-Aware Responses",
        text: "Gemini AI remembers conversation context and builds on previous topics",
      },
      {
        icon: Brain,
        title: "Adaptive Speaking Speed",
        text: "AI adjusts its pace to match your proficiency level for comfortable learning",
      },
      {
        icon: Target,
        title: "Topic Diversity",
        text: "Discuss anything from daily activities to complex professional topics",
      },
    ],
    stats: [
      { value: "< 100ms", label: "Response Time" },
      { value: "95%+", label: "Speech Recognition Accuracy" },
      { value: "24/7", label: "Always Available" },
    ],
    imageType: "conversation", // placeholder for image/animation
  },
  {
    id: 2,
    icon: CheckCircle,
    title: "Instant Corrections & Feedback",
    tagline: "Learn from every mistake, instantly",
    description:
      "Get real-time feedback on grammar, pronunciation, and vocabulary as you speak. Our AI doesn't just correct you—it explains why, helping you understand and remember the right way to express yourself.",
    gradient: "from-[#FF6B9D] to-[#6C47FF]",
    benefits: [
      {
        icon: CheckCircle,
        title: "Grammar Corrections",
        text: "Immediate feedback on sentence structure, verb tenses, and word order",
      },
      {
        icon: Volume2,
        title: "Pronunciation Guide",
        text: "Audio examples of correct pronunciation with visual phonetic breakdowns",
      },
      {
        icon: Sparkles,
        title: "Vocabulary Enhancement",
        text: "Suggestions for better word choices and more natural expressions",
      },
      {
        icon: Brain,
        title: "Learning Explanations",
        text: "Detailed explanations of why corrections are needed, not just what's wrong",
      },
    ],
    stats: [
      { value: "Real-time", label: "Instant Feedback" },
      { value: "4 Types", label: "Correction Categories" },
      { value: "100%", label: "Mistakes Tracked" },
    ],
    imageType: "corrections",
  },
  {
    id: 3,
    icon: Globe,
    title: "Cultural Context & Nuances",
    tagline: "Speak like a local, not a textbook",
    description:
      "Understanding a language goes beyond grammar and vocabulary. Learn the cultural context, idioms, regional expressions, and social etiquette that make you sound like a native speaker.",
    gradient: "from-[#00D9C0] to-[#10B981]",
    benefits: [
      {
        icon: Globe,
        title: "Cultural Insights",
        text: "Understand customs, gestures, and social norms of native speakers",
      },
      {
        icon: MessageSquare,
        title: "Formal vs Informal",
        text: "Learn when to use casual language and when formality is required",
      },
      {
        icon: MapPin,
        title: "Regional Variations",
        text: "Discover differences between regional dialects and local expressions",
      },
      {
        icon: Sparkles,
        title: "Idiomatic Expressions",
        text: "Master common phrases and sayings that textbooks often miss",
      },
    ],
    stats: [
      { value: "500+", label: "Cultural Tips" },
      { value: "20+", label: "Regions Covered" },
      { value: "Daily", label: "New Insights" },
    ],
    imageType: "cultural",
  },
  {
    id: 4,
    icon: MapPin,
    title: "Scenario-Based Learning",
    tagline: "Practice real situations you'll actually encounter",
    description:
      "Stop memorizing phrases you'll never use. Practice real-world scenarios like ordering at restaurants, navigating airports, attending job interviews, or having casual conversations with friends.",
    gradient: "from-[#6C47FF] to-[#FF6B9D]",
    benefits: [
      {
        icon: MapPin,
        title: "50+ Real Scenarios",
        text: "Restaurant ordering, travel, shopping, medical, business, and social situations",
      },
      {
        icon: Target,
        title: "Contextual Vocabulary",
        text: "Learn words and phrases specific to each situation for practical use",
      },
      {
        icon: Brain,
        title: "Dynamic Conversations",
        text: "Each scenario adapts based on your responses for unique practice every time",
      },
      {
        icon: TrendingUp,
        title: "Progressive Difficulty",
        text: "Start simple and gradually tackle more complex situations as you improve",
      },
    ],
    stats: [
      { value: "50+", label: "Scenarios" },
      { value: "6", label: "Categories" },
      { value: "Unlimited", label: "Variations" },
    ],
    imageType: "scenarios",
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Progress Tracking & Analytics",
    tagline: "See your improvement with data-driven insights",
    description:
      "Track your language learning journey with detailed analytics, visual progress charts, and achievement milestones. Know exactly where you excel and where to focus your practice.",
    gradient: "from-[#10B981] to-[#00D9C0]",
    benefits: [
      {
        icon: TrendingUp,
        title: "Fluency Score",
        text: "Overall rating that improves as you practice and master new skills",
      },
      {
        icon: Target,
        title: "Skill Breakdown",
        text: "Separate scores for grammar, pronunciation, vocabulary, and fluency",
      },
      {
        icon: Brain,
        title: "Weak Area Detection",
        text: "AI identifies topics you struggle with and suggests targeted practice",
      },
      {
        icon: Sparkles,
        title: "Achievement Badges",
        text: "Earn rewards for streaks, milestones, and mastering difficult concepts",
      },
    ],
    stats: [
      { value: "4", label: "Skill Metrics" },
      { value: "Real-time", label: "Updates" },
      { value: "30+", label: "Achievements" },
    ],
    imageType: "progress",
  },
  {
    id: 6,
    icon: Sliders,
    title: "Adaptive Difficulty Levels",
    tagline: "Always challenged, never overwhelmed",
    description:
      "Our AI automatically adjusts conversation complexity based on your performance. Stay in the optimal learning zone where you're challenged enough to grow but not so much that you get frustrated.",
    gradient: "from-[#3B82F6] to-[#6C47FF]",
    benefits: [
      {
        icon: Sliders,
        title: "Auto-Adjustment",
        text: "AI analyzes your responses and adjusts difficulty in real-time",
      },
      {
        icon: Target,
        title: "Optimal Challenge",
        text: "Maintains the perfect balance between too easy and too hard",
      },
      {
        icon: TrendingUp,
        title: "Gradual Progression",
        text: "Smoothly increases complexity as your skills improve over time",
      },
      {
        icon: Brain,
        title: "Personalized Path",
        text: "Creates a unique learning journey tailored to your pace and style",
      },
    ],
    stats: [
      { value: "5", label: "Difficulty Levels" },
      { value: "Dynamic", label: "Adjustments" },
      { value: "100%", label: "Personalized" },
    ],
    imageType: "adaptive",
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-[#0F1419] min-h-screen">
      {/* Detailed Feature Sections - Alternating Layout */}
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isEven = index % 2 === 0;

        return (
          <section
            key={feature.id}
            className={`py-20 px-[5%] ${
              index % 2 === 0 ? "bg-[#0F1419]" : "bg-[#1A1F2E]"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content Side */}
                <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 rounded-2xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-[0_12px_32px_rgba(108,71,255,0.3)]`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {feature.title}
                  </h2>

                  {/* Tagline */}
                  <p className="text-xl text-[#00D9C0] font-semibold mb-6">
                    {feature.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-lg text-[#E8ECEF] opacity-80 leading-relaxed mb-8">
                    {feature.description}
                  </p>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {feature.benefits.map((benefit, idx) => {
                      const BenefitIcon = benefit.icon;
                      return (
                        <div
                          key={idx}
                          className="bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 hover:border-[#6C47FF] transition-colors duration-300"
                        >
                          <BenefitIcon className="w-6 h-6 text-[#00D9C0] mb-2" />
                          <h4 className="text-white font-semibold mb-1 text-sm">
                            {benefit.title}
                          </h4>
                          <p className="text-[#E8ECEF] opacity-70 text-xs leading-relaxed">
                            {benefit.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6">
                    {feature.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div
                          className={`text-3xl font-bold bg-linear-to-r ${feature.gradient} bg-clip-text text-transparent mb-1`}
                        >
                          {stat.value}
                        </div>
                        <div className="text-sm text-[#E8ECEF] opacity-60">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Side */}
                <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative">
                    {/* Gradient Background Blob */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-20 blur-3xl rounded-full`}
                    ></div>

                    {/* Feature Visual Card */}
                    <div className="relative bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 shadow-2xl">
                      {/* Mock Interface based on feature type */}
                      {feature.imageType === "conversation" && (
                        <div className="space-y-4">
                          {/* AI Message */}
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-12 h-12 rounded-full bg-linear-to-br ${feature.gradient} flex items-center justify-center shrink-0`}
                            >
                              <Mic className="w-6 h-6 text-white" />
                            </div>
                            <div className="bg-[#2D3748] rounded-2xl rounded-tl-sm px-5 py-4 max-w-[80%]">
                              <p className="text-white">¿Cómo estás hoy?</p>
                              <p className="text-[#E8ECEF] opacity-60 text-sm mt-1">
                                How are you today?
                              </p>
                            </div>
                          </div>

                          {/* User Message */}
                          <div className="flex items-start gap-3 justify-end">
                            <div className="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] bg-opacity-20 border border-[#6C47FF] rounded-2xl rounded-tr-sm px-5 py-4 max-w-[80%]">
                              <p className="text-white">Estoy bien, gracias</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#FF6B9D] to-[#6C47FF] flex items-center justify-center shrink-0">
                              <span className="text-white font-bold text-sm">
                                You
                              </span>
                            </div>
                          </div>

                          {/* Waveform Animation */}
                          <div className="flex items-center justify-center gap-1 py-6">
                            {[...Array(20)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-1 bg-linear-to-t ${feature.gradient} rounded-full animate-pulse`}
                                style={{
                                  height: `${Math.random() * 40 + 10}px`,
                                  animationDelay: `${i * 0.1}s`,
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      )}

                      {feature.imageType === "corrections" && (
                        <div className="space-y-4">
                          {/* Message with Correction */}
                          <div className="bg-[#2D3748] rounded-xl p-4">
                            <p className="text-white mb-2">
                              I{" "}
                              <span className="border-b-2 border-dashed border-[#F59E0B] cursor-pointer pb-0.5">
                                go
                              </span>{" "}
                              to school yesterday
                            </p>
                            <div className="bg-[#F59E0B] bg-opacity-20 border border-[#F59E0B] rounded-lg p-3 mt-3">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-white font-semibold text-sm mb-1">
                                    Grammar Correction
                                  </p>
                                  <p className="text-white text-sm mb-2">
                                    <span className="line-through opacity-60">
                                      go
                                    </span>{" "}
                                    →{" "}
                                    <span className="font-semibold">went</span>
                                  </p>
                                  <p className="text-[#E8ECEF] opacity-70 text-xs">
                                    Use past tense "went" when talking about
                                    actions that happened in the past.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Stats Summary */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#10B981] bg-opacity-10 border border-[#10B981] rounded-lg p-3 text-center">
                              <div className="text-2xl font-bold text-white">
                                12
                              </div>
                              <div className="text-xs text-[#E8ECEF] opacity-90">
                                Corrections
                              </div>
                            </div>
                            <div className="bg-[#00D9C0] bg-opacity-10 border border-[#00D9C0] rounded-lg p-3 text-center">
                              <div className="text-2xl font-bold text-white">
                                85%
                              </div>
                              <div className="text-xs text-[#E8ECEF] opacity-90">
                                Accuracy
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {feature.imageType === "cultural" && (
                        <div className="space-y-4">
                          <div className="bg-[#2D3748] rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <Globe className="w-6 h-6 text-[#00D9C0]" />
                              <h4 className="text-white font-semibold">
                                Cultural Tip
                              </h4>
                            </div>
                            <p className="text-[#E8ECEF] opacity-90 text-sm mb-3">
                              In France, it's customary to greet with "Bonjour"
                              when entering shops, even if you're just browsing.
                            </p>
                            <div className="bg-[#00D9C0] bg-opacity-10 border border-[#00D9C0] rounded-lg p-3">
                              <p className="text-white text-sm font-medium mb-1">
                                <FontAwesomeIcon
                                  icon={faLightbulb}
                                  color="#f5a623"
                                />{" "}
                                Try saying:
                              </p>
                              <p className="text-white font-semibold">
                                "Bonjour, je regarde simplement"
                              </p>
                              <p className="text-[#E8ECEF] opacity-90 text-xs mt-1">
                                "Hello, I'm just looking"
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-lg p-3">
                              <div className="text-[#10B981] text-sm font-semibold mb-1">
                                ✓ Formal
                              </div>
                              <p className="text-white text-xs">Vous êtes...</p>
                            </div>
                            <div className="bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-lg p-3">
                              <div className="text-[#F59E0B] text-sm font-semibold mb-1">
                                ✓ Casual
                              </div>
                              <p className="text-white text-xs">Tu es...</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {feature.imageType === "scenarios" && (
                        <div className="space-y-4">
                          <div className="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] bg-opacity-10 border border-[#6C47FF] rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center">
                                <span className="text-2xl">
                                  <FontAwesomeIcon
                                    icon={faUtensils}
                                    color="white"
                                  />
                                </span>
                              </div>
                              <div>
                                <h4 className="text-white font-semibold">
                                  Restaurant Scenario
                                </h4>
                                <p className="text-[#E8ECEF] opacity-60 text-xs">
                                  Ordering dinner
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="bg-[#1A1F2E] rounded-lg p-3">
                                <p className="text-[#00D9C0] text-xs font-semibold mb-1">
                                  Step 1
                                </p>
                                <p className="text-white text-sm">
                                  Greet the waiter
                                </p>
                              </div>
                              <div className="bg-[#1A1F2E] rounded-lg p-3">
                                <p className="text-[#00D9C0] text-xs font-semibold mb-1">
                                  Step 2
                                </p>
                                <p className="text-white text-sm">
                                  Order your meal
                                </p>
                              </div>
                              <div className="bg-[#1A1F2E] rounded-lg p-3 opacity-50">
                                <p className="text-[#00D9C0] text-xs font-semibold mb-1">
                                  Step 3
                                </p>
                                <p className="text-white text-sm">
                                  Request the bill
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { name: "Travel", icon: faPlane },
                              { name: "Business", icon: faBriefcase },
                              { name: "Shopping", icon: faShoppingBag },
                            ].map((scenario, i) => (
                              <div
                                key={i}
                                className="bg-[#2D3748] rounded-lg p-2 text-center flex gap-2 justify-center items-center"
                              >
                                <FontAwesomeIcon
                                  icon={scenario.icon}
                                  color="pink"
                                />
                                <p className="text-white text-xs">
                                  {scenario.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {feature.imageType === "progress" && (
                        <div className="space-y-4">
                          {/* Circular Progress */}
                          <div className="flex justify-center mb-6">
                            <div className="relative w-32 h-32">
                              <svg className="w-full h-full transform -rotate-90">
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
                                  strokeDasharray="351.68"
                                  strokeDashoffset="87.92"
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
                                    <stop offset="100%" stopColor="#10B981" />
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-white">
                                  75%
                                </span>
                                <span className="text-xs text-[#E8ECEF] opacity-60">
                                  Fluency
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Skill Bars */}
                          <div className="space-y-3">
                            {[
                              {
                                skill: "Grammar",
                                value: 82,
                                color: "from-[#6C47FF] to-[#00D9C0]",
                              },
                              {
                                skill: "Pronunciation",
                                value: 68,
                                color: "from-[#FF6B9D] to-[#6C47FF]",
                              },
                              {
                                skill: "Vocabulary",
                                value: 75,
                                color: "from-[#00D9C0] to-[#10B981]",
                              },
                            ].map((item, i) => (
                              <div key={i}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-white text-sm font-medium">
                                    {item.skill}
                                  </span>
                                  <span className="text-[#00D9C0] text-sm font-semibold">
                                    {item.value}%
                                  </span>
                                </div>
                                <div className="w-full h-2 bg-[#2D3748] rounded-full overflow-hidden">
                                  <div
                                    className={`h-full bg-linear-to-r ${item.color} rounded-full transition-all duration-1000`}
                                    style={{ width: `${item.value}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {feature.imageType === "adaptive" && (
                        <div className="space-y-4">
                          <div className="text-center mb-4">
                            <div className="inline-flex items-center gap-2 bg-[#2D3748] rounded-full px-4 py-2">
                              <Sliders className="w-4 h-4 text-[#00D9C0]" />
                              <span className="text-white text-sm font-semibold">
                                Auto-Adjusting
                              </span>
                            </div>
                          </div>

                          {/* Difficulty Levels */}
                          <div className="space-y-2">
                            {[
                              { level: "Beginner", active: false },
                              { level: "Intermediate", active: true },
                              { level: "Advanced", active: false },
                            ].map((item, i) => (
                              <div
                                key={i}
                                className={`p-4 rounded-lg border transition-all duration-300 ${
                                  item.active
                                    ? "bg-linear-to-r from-[#3B82F6] to-[#6C47FF] bg-opacity-20 border-[#6C47FF] scale-105"
                                    : "bg-[#2D3748] border-[rgba(255,255,255,0.1)]"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`font-semibold ${item.active ? "text-white" : "text-[#E8ECEF] opacity-50"}`}
                                  >
                                    {item.level}
                                  </span>
                                  {item.active && (
                                    <span className="text-[#00D9C0] text-xs font-bold">
                                      CURRENT
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="bg-[#00D9C0] bg-opacity-10 border border-[#00D9C0] rounded-lg p-4 text-center">
                            <TrendingUp className="w-6 h-6 text-white mx-auto mb-2" />
                            <p className="text-white text-sm font-medium">
                              Ready to level up!
                            </p>
                            <p className="text-[#E8ECEF] opacity-90 text-xs mt-1">
                              Keep practicing to unlock Advanced
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Comparison Table Section */}
      <section className="py-20 px-[5%] bg-[#1A1F2E]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              FluentAI vs Traditional Methods
            </h2>
            <p className="text-lg text-[#E8ECEF] opacity-70">
              See why AI-powered learning is the future
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.1)]">
                  <th className="text-left p-4 text-white font-semibold">
                    Feature
                  </th>
                  <th className="p-4 text-center">
                    <div className="bg-linear-to-br from-[#6C47FF] to-[#00D9C0] text-white font-bold py-2 px-4 rounded-lg inline-block">
                      FluentAI
                    </div>
                  </th>
                  <th className="p-4 text-center text-[#E8ECEF] opacity-70">
                    Traditional Tutors
                  </th>
                  <th className="p-4 text-center text-[#E8ECEF] opacity-70">
                    Other Apps
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "24/7 Availability",
                    fluentai: "✓",
                    tutors: "✗",
                    apps: "~",
                  },
                  {
                    feature: "Instant Feedback",
                    fluentai: "✓",
                    tutors: "✓",
                    apps: "~",
                  },
                  {
                    feature: "Voice Practice",
                    fluentai: "✓",
                    tutors: "✓",
                    apps: "✗",
                  },
                  {
                    feature: "Cultural Context",
                    fluentai: "✓",
                    tutors: "✓",
                    apps: "~",
                  },
                  {
                    feature: "Progress Tracking",
                    fluentai: "✓",
                    tutors: "~",
                    apps: "✓",
                  },
                  {
                    feature: "Adaptive Difficulty",
                    fluentai: "✓",
                    tutors: "~",
                    apps: "~",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[rgba(255,255,255,0.05)]"
                  >
                    <td className="p-4 text-white">{row.feature}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`${
                          row.feature === "Cost per Month"
                            ? "text-[#00D9C0] font-bold"
                            : "text-[#10B981] text-2xl"
                        }`}
                      >
                        {row.fluentai}
                      </span>
                    </td>
                    <td className="p-4 text-center text-[#E8ECEF] opacity-60">
                      {row.tutors}
                    </td>
                    <td className="p-4 text-center text-[#E8ECEF] opacity-60">
                      {row.apps}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm space-x-2 text-[#E8ECEF] opacity-50 mt-6">
            <span>✓ Full support</span> • <span> ~ Partial support</span> •{" "}
            <span>✗ Not available</span>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-[5%] bg-linear-to-br from-[#6C47FF] via-[#FF6B9D] to-[#00D9C0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience All Features By Signing up
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Start speaking with confidence today.
          </p>
          <button className="bg-white text-[#6C47FF] font-bold px-12 py-5 text-lg rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3">
            Sign up
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
