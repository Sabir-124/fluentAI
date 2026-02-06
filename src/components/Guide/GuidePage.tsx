// Route: /guides (or /pronunciation, /culture)

import { BookOpen } from "lucide-react";

export default function LearningGuidesPage() {
  return (
    <div className="min-h-screen bg-[#0F1419]">
      {/* Hero */}
      <section className="py-20 pt-40 px-[5%] bg-linear-to-b from-[#1A1F2E] to-[#0F1419]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-linear-to-br from-[#6C47FF] to-[#00D9C0] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold text-white mb-6">
            Learning Guides
          </h1>
          <p className="text-xl text-[#E8ECEF] opacity-80">
            Comprehensive guides to help you master any language
          </p>
        </div>
      </section>

      {/* Guides by Language */}
      <section className="py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          {/* Language Filter */}
          <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
            {["All", "Spanish", "French", "German", "Japanese", "Mandarin"].map(
              (lang) => (
                <button
                  key={lang}
                  className="px-6 py-3 bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-xl text-white font-semibold hover:border-[#6C47FF] transition-all whitespace-nowrap"
                >
                  {lang}
                </button>
              ),
            )}
          </div>

          {/* Guide Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Spanish Grammar Essentials",
                language: "Spanish",
                duration: "10 min read",
                level: "Beginner",
                topics: ["Verb conjugation", "Gender rules", "Common mistakes"],
              },
              {
                title: "French Pronunciation Mastery",
                language: "French",
                duration: "15 min read",
                level: "Intermediate",
                topics: ["Nasal sounds", "Silent letters", "Liaison"],
              },
              // More guides...
            ].map((guide, index) => (
              <div
                key={index}
                className="bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 hover:border-[#6C47FF] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📚</span>
                  <div>
                    <span className="text-[#00D9C0] text-sm font-semibold">
                      {guide.language}
                    </span>
                    <div className="text-[#E8ECEF] opacity-60 text-xs">
                      {guide.duration}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {guide.title}
                </h3>

                <div className="mb-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      guide.level === "Beginner"
                        ? "bg-[#10B981] bg-opacity-20 text-[#10B981]"
                        : guide.level === "Intermediate"
                          ? "bg-[#F59E0B] bg-opacity-20 text-[#F59E0B]"
                          : "bg-[#EF4444] bg-opacity-20 text-[#EF4444]"
                    }`}
                  >
                    {guide.level}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {guide.topics.map((topic, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-[#E8ECEF] opacity-70 flex items-center gap-2"
                    >
                      <span className="text-[#00D9C0]">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-[#2D3748] border border-[rgba(255,255,255,0.1)] text-white font-semibold py-3 rounded-lg hover:bg-linear-to-br hover:from-[#6C47FF] hover:to-[#00D9C0] transition-all">
                  Read Guide
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-[5%] bg-[#1A1F2E]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to put this knowledge into practice?
          </h2>
          <p className="text-[#E8ECEF] opacity-70 mb-8">
            Start speaking with AI and apply what you've learned
          </p>
          <button className="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] text-white font-bold px-10 py-4 rounded-xl hover:scale-105 transition-all">
            Start Practicing Now
          </button>
        </div>
      </section>
    </div>
  );
}
