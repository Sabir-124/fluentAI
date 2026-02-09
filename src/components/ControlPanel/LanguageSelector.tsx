// src/components/ControlPanel/LanguageSelector.tsx
import { combinedLanguages, type languagesProps } from "@/data/languages";

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  disabled?: boolean;
}

const LanguageSelector = ({
  value,
  onChange,
  disabled,
}: LanguageSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">
        Language
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full bg-[#2D3748] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C47FF] focus:outline-none transition-colors custom-scroll disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {combinedLanguages
          .map((lang:languagesProps) => (
            <option key={lang.name} value={lang.name.toLowerCase()}>
              {lang.name}
            </option>
          ))}
      </select>
      {disabled && (
        <p className="text-xs text-[#E8ECEF]/40 mt-1">
          Cannot change during active session
        </p>
      )}
    </div>
  );
};

export default LanguageSelector;
