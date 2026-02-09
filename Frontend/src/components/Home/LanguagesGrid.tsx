import { Globe, Star } from "lucide-react";
import France from "../../assets/icons/Flags/france.png";
import Germany from "../../assets/icons/Flags/german.png";
import Spain from "../../assets/icons/Flags/spain.png";
import Italy from "../../assets/icons/Flags/italy.png";
import Portugal from "../../assets/icons/Flags/portugal.png";
import Russia from "../../assets/icons/Flags/russia.png";
import SaudiArabia from "../../assets/icons/Flags/saudi-arabia.png";
import India from "../../assets/icons/Flags/india.png";
import Netherlands from "../../assets/icons/Flags/netherlands.png";
import Turkey from "../../assets/icons/Flags/turkey.png";
import Poland from "../../assets/icons/Flags/poland.png";

import { PointerHighlight } from "../ui/pointer-highlight";
import { Link } from "react-router-dom";

const popularLanguages = [
  {
    name: "Spanish",
    nativeName: "Español",
    flag: Spain,
    learners: "2.5M+",
    difficulty: "Easy",
    difficultyColor: "text-[#10B981]",
    popular: true,
  },
  {
    name: "French",
    nativeName: "Français",
    flag: France,
    learners: "1.8M+",
    difficulty: "Medium",
    difficultyColor: "text-[#F59E0B]",
    popular: true,
  },
  {
    name: "German",
    nativeName: "Deutsch",
    flag: Germany,
    learners: "1.2M+",
    difficulty: "Medium",
    difficultyColor: "text-[#F59E0B]",
    popular: true,
  },
];

const otherLanguages = [
  { name: "Italian", nativeName: "Italiano", flag: Italy, difficulty: "Easy" },
  {
    name: "Portuguese",
    nativeName: "Português",
    flag: Portugal,
    difficulty: "Easy",
  },
  { name: "Russian", nativeName: "Русский", flag: Russia, difficulty: "Hard" },
  {
    name: "Arabic",
    nativeName: "العربية",
    flag: SaudiArabia,
    difficulty: "Hard",
  },
  { name: "Hindi", nativeName: "हिन्दी", flag: India, difficulty: "Medium" },
  {
    name: "Dutch",
    nativeName: "Nederlands",
    flag: Netherlands,
    difficulty: "Easy",
  },
  { name: "Turkish", nativeName: "Türkçe", flag: Turkey, difficulty: "Medium" },
  { name: "Polish", nativeName: "Polski", flag: Poland, difficulty: "Medium" },
];

export default function LanguagesSection() {
  return (
    <section className="py-25 px-[5%]">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <span>Learn Any of</span>{" "}
          <PointerHighlight
            rectangleClassName="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] dark:bg-linear-to-br dark:from-[#6C47FF] dark:to-[#FF6B9D]  border-neutral-300 dark:border-neutral-600 leading-loose"
            pointerClassName="text-yellow-500 h-3 w-3"
            containerClassName="inline-block mr-1"
          >
            <span className="relative z-10">20+ Languages</span>
          </PointerHighlight>{" "}
        </h2>
        <p className="text-lg md:text-xl text-[#E8ECEF] opacity-70 max-w-2xl mx-auto">
          From Spanish to Mandarin, practice conversations in the language you
          love
        </p>
      </div>

      {/* Popular Languages Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-8">
          <Star className="w-6 h-6 text-[#F59E0B] fill-[#F59E0B]" />
          <h3 className="text-2xl font-bold text-white">
            Most Popular Languages
          </h3>
        </div>

        {/* Popular Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularLanguages.map((language, index) => (
            <div
              key={index}
              className="relative bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 hover:border-[#6C47FF] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(108,71,255,0.2)] transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col justify-center items-center"
            >
              {/* Popular Badge */}
              <div className="absolute -top-1 -right-1">
                <div className="bg-linear-to-br from-[#F59E0B] to-[#EF4444] text-white text-xs font-bold px-3 py-1 pt-2 rounded-bl-xl rounded-tr-xl">
                  POPULAR
                </div>
              </div>

              {/* Flag */}
              <div className="h-18 w-18 mb-4 group-hover:scale-110 transition-transform duration-300">
                <img className="h-full w-full" src={language.flag} alt="" />
              </div>

              {/* Language Name */}
              <h4 className="text-2xl font-bold text-white mb-1">
                {language.name}
              </h4>
              <p className="text-lg text-[#E8ECEF] opacity-60 mb-4">
                {language.nativeName}
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-between mb-4">
                {/* Difficulty Badge */}
                <div
                  className={`text-sm font-semibold ${language.difficultyColor}`}
                >
                  {language.difficulty}
                </div>
              </div>

              {/* Start Learning Button */}
              <button className="w-full bg-linear-to-br from-[#6C47FF] to-[#00D9C0] text-white font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-300 shadow-[0_4px_12px_rgba(108,71,255,0.3)]">
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Other Languages Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-2 mb-8">
          <Globe className="w-6 h-6 text-[#6C47FF]" />
          <h3 className="text-2xl font-bold text-white">More Languages</h3>
        </div>

        {/* Other Languages Grid - Compact Version */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {otherLanguages.map((language, index) => (
            <div
              key={index}
              className="bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 md:px-6 hover:border-[#6C47FF] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(108,71,255,0.15)] transition-all duration-300 cursor-pointer group"
            >
              {/* Flag and Name */}
              <div className="flex items-center sm:flex-row flex-col gap-3">
                <div className="md:h-13 h-10 md:w-13 w-10 group-hover:scale-110 transition-transform duration-300">
                  <img className="w-full h-full" src={language.flag} alt="" />
                </div>
                <div className="sm:text-left text-center">
                  <h4 className="font-bold text-white">{language.name}</h4>
                  <p className="text-xs text-[#E8ECEF] opacity-60">
                    {language.nativeName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All CTA */}
      <Link to={"/languages"} className="flex justify-center">
        <button className="bg-transparent border-2 border-[#6C47FF] text-white px-10 py-4 text-lg font-semibold rounded-xl hover:bg-[#6C47FF] hover:scale-105 transition-all duration-300">
          View All 20+ Languages
        </button>
      </Link>
    </section>
  );
}
