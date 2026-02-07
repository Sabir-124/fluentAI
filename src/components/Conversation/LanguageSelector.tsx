import { combinedLanguages } from "@/data/languages";
import { usePreference } from "@/store/usePreferences";

const LanguageSelector = () => {
  const { selectedLanguage, setSelectedLanguage } = usePreference();
  return (
    <div>
      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">
        Language
      </label>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="w-full bg-[#2D3748] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C47FF] focus:outline-none transition-colors custom-scroll"
      >
        {combinedLanguages.sort().map((l) => (
          <option>{l.name}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
