import China from "../assets/icons/Flags/china.png";
import France from "../assets/icons/Flags/france.png";
import Germany from "../assets/icons/Flags/german.png";
import Japan from "../assets/icons/Flags/japan.png";
import Korea from "../assets/icons/Flags/korea.png";
import Spain from "../assets/icons/Flags/spain.png";
import Italy from "../assets/icons/Flags/italy.png";
import Portugal from "../assets/icons/Flags/portugal.png";
import Russia from "../assets/icons/Flags/russia.png";
import SaudiArabia from "../assets/icons/Flags/saudi-arabia.png";
import India from "../assets/icons/Flags/india.png";
import Netherlands from "../assets/icons/Flags/netherlands.png";
import Turkey from "../assets/icons/Flags/turkey.png";
import Poland from "../assets/icons/Flags/poland.png";
import Sweden from "../assets/icons/Flags/sweden.png";
import Greece from "../assets/icons/Flags/greece.png";
import Vietnam from "../assets/icons/Flags/vietnam.png";
import Thailand from "../assets/icons/Flags/thailand.png";
import Indonesia from "../assets/icons/Flags/indonesia.png";
import Norway from "../assets/icons/Flags/norway.png";
import Pakistan from "../assets/icons/Flags/pakistan.png";
import Kenya from "../assets/icons/Flags/kenya.png";
import Finland from "../assets/icons/Flags/finland.png";
import Czech from "../assets/icons/Flags/czech-republic.png";

export const popularLanguages = [
  {
    name: "Spanish",
    nativeName: "Español",
    flag: Spain,
    learners: "2.5M+",
    difficulty: "Easy",
    difficultyLevel: 1,
    countries: "20+ countries",
    speakers: "500M+ speakers",
    whyLearn:
      "Most spoken Romance language, essential for travel in Latin America and Spain",
    funFacts: [
      "Second most spoken native language worldwide",
      "Official language in 21 countries",
      "Growing rapidly in the United States",
    ],
    gradient: "from-[#6C47FF] to-[#00D9C0]",
    scenarios: ["Travel", "Business", "Social"],
  },
  {
    name: "French",
    nativeName: "Français",
    flag: France,
    learners: "1.8M+",
    difficulty: "Medium",
    difficultyLevel: 2,
    countries: "29 countries",
    speakers: "280M+ speakers",
    whyLearn:
      "Language of diplomacy, official in 5 continents, rich cultural heritage",
    funFacts: [
      "Official language of the UN, EU, and Olympics",
      "Spoken across 5 continents",
      "Second most learned language globally",
    ],
    gradient: "from-[#FF6B9D] to-[#6C47FF]",
    scenarios: ["Travel", "Culture", "Professional"],
  },
  {
    name: "German",
    nativeName: "Deutsch",
    flag: Germany,
    learners: "1.2M+",
    difficulty: "Medium",
    difficultyLevel: 2,
    countries: "6 countries",
    speakers: "130M+ speakers",
    whyLearn:
      "Strongest economy in Europe, important for business and engineering",
    funFacts: [
      "Most spoken native language in the EU",
      "Language of innovation and engineering",
      "Gateway to Austrian and Swiss cultures",
    ],
    gradient: "from-[#00D9C0] to-[#10B981]",
    scenarios: ["Business", "Academic", "Travel"],
  },
  {
    name: "Japanese",
    nativeName: "日本語",
    flag: Japan,
    learners: "1.5M+",
    difficulty: "Hard",
    difficultyLevel: 3,
    countries: "Japan",
    speakers: "125M+ speakers",
    whyLearn:
      "Gateway to unique culture, anime, manga, and advanced technology",
    funFacts: [
      "Three writing systems: Hiragana, Katakana, Kanji",
      "Rich pop culture influence worldwide",
      "Important for tech and automotive industries",
    ],
    gradient: "from-[#6C47FF] to-[#FF6B9D]",
    scenarios: ["Culture", "Business", "Entertainment"],
  },
  {
    name: "Mandarin",
    nativeName: "中文",
    flag: China,
    learners: "2.1M+",
    difficulty: "Hard",
    difficultyLevel: 3,
    countries: "Multiple regions",
    speakers: "1.1B+ speakers",
    whyLearn: "Most spoken language globally, crucial for business in Asia",
    funFacts: [
      "World's most spoken native language",
      "Tonal language with four main tones",
      "Essential for business in Asia-Pacific",
    ],
    gradient: "from-[#10B981] to-[#00D9C0]",
    scenarios: ["Business", "Travel", "Culture"],
  },
  {
    name: "Korean",
    nativeName: "한국어",
    flag: Korea,
    learners: "1.1M+",
    difficulty: "Hard",
    difficultyLevel: 3,
    countries: "South Korea, North Korea",
    speakers: "80M+ speakers",
    whyLearn: "K-pop, K-drama phenomenon, growing tech industry influence",
    funFacts: [
      "Hangul alphabet created by King Sejong",
      "Growing global pop culture influence",
      "Important for tech and entertainment",
    ],
    gradient: "from-[#3B82F6] to-[#6C47FF]",
    scenarios: ["Entertainment", "Culture", "Business"],
  },
];

export const allLanguages = [
  {
    name: "Italian",
    nativeName: "Italiano",
    flag: Italy,
    difficulty: "Easy",
    difficultyLevel: 1,
    learners: "950K+",
    speakers: "85M+",
  },
  {
    name: "Portuguese",
    nativeName: "Português",
    flag: Portugal,
    difficulty: "Easy",
    difficultyLevel: 1,
    learners: "890K+",
    speakers: "260M+",
  },
  {
    name: "Russian",
    nativeName: "Русский",
    flag: Russia,
    difficulty: "Hard",
    difficultyLevel: 3,
    learners: "780K+",
    speakers: "258M+",
  },
  {
    name: "Arabic",
    nativeName: "العربية",
    flag: SaudiArabia,
    difficulty: "Hard",
    difficultyLevel: 3,
    learners: "820K+",
    speakers: "420M+",
  },
  {
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: India,
    difficulty: "Medium",
    difficultyLevel: 2,
    learners: "650K+",
    speakers: "600M+",
  },
  {
    name: "Dutch",
    nativeName: "Nederlands",
    flag: Netherlands,
    difficulty: "Easy",
    difficultyLevel: 1,
    learners: "520K+",
    speakers: "25M+",
  },
  {
    name: "Turkish",
    nativeName: "Türkçe",
    flag: Turkey,
    difficulty: "Medium",
    difficultyLevel: 2,
    learners: "480K+",
    speakers: "80M+",
  },
  {
    name: "Polish",
    nativeName: "Polski",
    flag: Poland,
    difficulty: "Medium",
    difficultyLevel: 2,
    learners: "420K+",
    speakers: "45M+",
  },
  {
    name: "Swedish",
    nativeName: "Svenska",
    flag: Sweden,
    difficulty: "Easy",
    difficultyLevel: 1,
    learners: "380K+",
    speakers: "13M+",
  },
  {
    name: "Greek",
    nativeName: "Ελληνικά",
    flag: Greece,
    difficulty: "Medium",
    difficultyLevel: 2,
    learners: "350K+",
    speakers: "13M+",
  },
  {
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: Vietnam,
    difficulty: "Hard",
    difficultyLevel: 3,
    learners: "410K+",
    speakers: "95M+",
  },
  {
    name: "Thai",
    nativeName: "ไทย",
    flag: Thailand,
    difficulty: "Hard",
    difficultyLevel: 3,
    learners: "320K+",
    speakers: "60M+",
  },
  {
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: Indonesia,
    difficulty: "Easy",
    difficultyLevel: 1,
    learners: "290K+",
    speakers: "200M+",
  },
  {
    name: "Norwegian",
    nativeName: "Norsk",
    flag: Norway,
    difficulty: "Easy",
    difficultyLevel: 1,
    learners: "260K+",
    speakers: "5M+",
  },
];

export const comingSoonLanguages = [
  { name: "Urdu", nativeName: "اردو", flag: Pakistan, eta: "Q2 2026" },
  { name: "Swahili", nativeName: "Kiswahili", flag: Kenya, eta: "Q3 2026" },
  { name: "Finnish", nativeName: "Suomi", flag: Finland, eta: "Q3 2026" },
  { name: "Czech", nativeName: "Čeština", flag: Czech, eta: "Q4 2026" },
];

const language = async () => {
  const data = await fetch(`http://localhost:5002/api/languages`);
  const result = await data.json();
  return result.languages;
};

const languages = await language();

export interface languagesProps {
  code: string;
  name: string;
  nativeName: string;
}

export const combinedLanguages = languages.sort(
  (a: languagesProps, b: languagesProps) => a.name.localeCompare(b.name),
);
