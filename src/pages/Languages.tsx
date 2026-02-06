import {
  Search,
  Globe,
  Users,
  Star,
  ArrowRight,
  BookOpen,
  Map,
  Clock,
  Zap,
} from "lucide-react";
import { useState } from "react";
import FinalCTA from "@/components/Lang/FinalCTA";
import Resources from "@/components/Lang/Resources";
import {
  allLanguages,
  comingSoonLanguages,
  popularLanguages,
} from "@/data/languages";

export default function LanguagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  // Filter languages based on search and difficulty
  const filteredLanguages = allLanguages.filter((lang) => {
    const matchesSearch =
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      lang.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-[#10B981]";
      case "medium":
        return "text-[#F59E0B]";
      case "hard":
        return "text-[#EF4444]";
      default:
        return "text-[#E8ECEF]";
    }
  };

  return (
    <div className="bg-[#0F1419] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-[5%] h-screen flex flex-col justify-center">
        {/* Background Gradient Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#6C47FF] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00D9C0] opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#6C47FF] to-[#00D9C0] text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
            <Globe className="w-4 h-4" />
            20+ Languages Available
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Learn Any of{" "}
            <span className="bg-linear-to-r from-[#6C47FF] via-[#FF6B9D] to-[#00D9C0] bg-clip-text text-transparent">
              20+ Languages
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#E8ECEF] opacity-80 mb-10 max-w-3xl mx-auto">
            From Spanish to Mandarin, practice conversations in the language you
            love with AI-powered tutoring
          </p>

          {/* Search and Filter Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E8ECEF] opacity-50" />
                <input
                  type="text"
                  placeholder="Search for a language..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#E8ECEF] placeholder-opacity-50 focus:outline-none focus:border-[#6C47FF] transition-colors"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="flex gap-2 self-center">
                {["all", "easy", "medium", "hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(level)}
                    className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      selectedDifficulty === level
                        ? "bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] text-white"
                        : "bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] text-[#E8ECEF] hover:border-[#6C47FF]"
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Languages - Detailed Cards */}
      <section className="py-20 px-[5%] bg-[#0F1419]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Star className="w-8 h-8 text-[#F59E0B] fill-[#F59E0B]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Most Popular Languages
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {popularLanguages.map((language, index) => (
              <div
                key={index}
                className="bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden hover:border-[#6C47FF] hover:shadow-[0_20px_40px_rgba(108,71,255,0.2)] transition-all duration-300 group"
              >
                {/* Card Header with Gradient */}
                <div
                  className={`bg-linear-to-br ${language.gradient} p-6 relative overflow-hidden`}
                >
                  <div className="absolute -top-8 -right-5 w-40 opacity-30">
                    <img src={language.flag} alt="" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <img className="w-20" src={language.flag} alt="" />
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-1">
                            {language.name}
                          </h3>
                          <p className="text-xl text-white opacity-80">
                            {language.nativeName}
                          </p>
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-blue-950 font-semibold text-sm">
                          {language.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#0F1419]" />
                        <span className="text-[#0F1419] text-sm font-medium">
                          {language.learners} learners
                        </span>
                      </div>
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#0F1419]" />
                        <span className="text-[#0F1419] text-sm font-medium">
                          {language.speakers}
                        </span>
                      </div>
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                        <Map className="w-4 h-4 text-[#0F1419]" />
                        <span className="text-[#0F1419] text-sm font-medium">
                          {language.countries}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Why Learn */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#00D9C0]" />
                      Why Learn {language.name}?
                    </h4>
                    <p className="text-[#E8ECEF] opacity-70 text-sm leading-relaxed">
                      {language.whyLearn}
                    </p>
                  </div>

                  {/* Fun Facts */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#F59E0B]" />
                      Quick Facts
                    </h4>
                    <ul className="space-y-2">
                      {language.funFacts.map((fact, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-[#E8ECEF] opacity-70"
                        >
                          <span className="text-[#00D9C0] mt-1">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practice Scenarios */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 text-sm">
                      Practice Scenarios:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {language.scenarios.map((scenario, idx) => (
                        <span
                          key={idx}
                          className="bg-[#2D3748] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-1 text-xs text-[#E8ECEF]"
                        >
                          {scenario}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full bg-linear-to-br ${language.gradient} text-white font-semibold py-3 rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(108,71,255,0.3)]`}
                  >
                    Start Learning {language.name}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Languages Grid - Compact */}
      <section className="py-20 px-[5%] bg-[#1A1F2E]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Globe className="w-8 h-8 text-[#6C47FF]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              All Languages
            </h2>
          </div>

          {filteredLanguages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredLanguages.map((language, index) => (
                <div
                  key={index}
                  className="bg-[#0F1419] border border-[rgba(255,255,255,0.1)] rounded-xl p-5 hover:border-[#6C47FF] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(108,71,255,0.15)] transition-all duration-300 cursor-pointer group"
                >
                  {/* Flag and Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-12 group-hover:scale-110 transition-transform duration-300">
                      <img src={language.flag} alt="" />
                    </span>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-white mb-0.5">
                        {language.name}
                      </h4>
                      <p className="text-xs text-[#E8ECEF] opacity-60">
                        {language.nativeName}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <div className="flex items-center gap-1 text-[#E8ECEF] opacity-60">
                      <Users className="w-3 h-3" />
                      <span>{language.learners}</span>
                    </div>
                    <div
                      className={`font-semibold ${getDifficultyColor(language.difficulty)}`}
                    >
                      {language.difficulty}
                    </div>
                  </div>

                  {/* Speakers */}
                  <div className="text-xs text-[#E8ECEF] opacity-50 mb-3">
                    {language.speakers} speakers
                  </div>

                  {/* Start Button */}
                  <button className="w-full bg-[#2D3748] border border-[rgba(255,255,255,0.1)] text-white text-sm font-semibold py-2 rounded-lg hover:bg-linear-to-br hover:from-[#6C47FF] hover:to-[#00D9C0] hover:border-transparent transition-all duration-300">
                    Start Learning
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-[#E8ECEF] opacity-30 mx-auto mb-4" />
              <p className="text-xl text-[#E8ECEF] opacity-50">
                No languages found matching your search
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Languages */}
      <section className="py-20 px-[5%] bg-[#0F1419]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Clock className="w-8 h-8 text-[#F59E0B]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Coming Soon
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comingSoonLanguages.map((language, index) => (
              <div
                key={index}
                className="bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] border-dashed rounded-xl p-5 text-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-20 mb-3 inline-flex">
                  <img src={language.flag} alt="" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  {language.name}
                </h4>
                <p className="text-sm text-[#E8ECEF] opacity-60 mb-3">
                  {language.nativeName}
                </p>
                <div className="bg-[#F59E0B] bg-opacity-20 border border-[#F59E0B] rounded-lg px-3 py-1 inline-block">
                  <span className="text-white text-xs font-semibold">
                    {language.eta}
                  </span>
                </div>
                <button className="w-full mt-3 bg-transparent border border-[rgba(255,255,255,0.1)] text-[#E8ECEF] text-sm font-medium py-2 rounded-lg hover:border-[#6C47FF] hover:text-[#6C47FF] transition-all duration-300">
                  Notify Me
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language Resources */}
      <Resources />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}
