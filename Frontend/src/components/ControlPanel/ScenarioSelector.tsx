// src/components/ControlPanel/ScenarioSelector.tsx
import IconGradientDefs from "@/component_Factory/IconGradientDefs";
import { scenarios } from "@/data/onBoarding";
import { lucideIconMap } from "@/utils/lucideIconMap";
interface ScenarioSelectorProps {
  value: string;
  onChange: (scenario: string) => void;
  disabled?: boolean;
}
  
interface scenario{
  id:string
  label:string,
  iconColor:string,
  iconColorDark:string
  description:string,
  icon:string
}
const ScenarioSelector = ({
  value,
  onChange,
  disabled,
}: ScenarioSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">
        Scenario
      </label>
      <div className="grid grid-cols-2 gap-2">
        {scenarios.map((scenario:scenario) => {
          const Icon = lucideIconMap[scenario.icon]; // ✅ string → component
          if (!Icon) return null; // safety fallback

          const scenarioValue = scenario.label.toLowerCase();
          const isSelected = scenarioValue === value;

          return (
            <button
              key={scenario.id}
              onClick={() => onChange(scenarioValue)}
              disabled={disabled}
              className={`p-3 rounded-lg border transition-all flex flex-col items-center ${
                isSelected
                  ? "border-[#6C47FF] bg-[#6C47FF]/10"
                  : "border-white/10 bg-[#2D3748] hover:border-[#6C47FF]/50"
              }`}
            >
              <div className="mb-4">
                <IconGradientDefs
                  id={scenario.id}
                  from={scenario.iconColor}
                  to={scenario.iconColorDark}
                />
                <Icon
                  stroke={`url(#${scenario.id})`}
                  strokeWidth={2}
                  className="w-8 h-8"
                />
              </div>
              <div className="text-xs text-[#E8ECEF]/80">{scenario.label}</div>
            </button>
          );
        })}
      </div>
      {disabled && (
        <p className="text-xs text-[#E8ECEF]/40 mt-1">
          Cannot change during active session
        </p>
      )}
    </div>
  );
};

export default ScenarioSelector;
