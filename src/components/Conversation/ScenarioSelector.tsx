import IconGradientDefs from "@/component_Factory/IconGradientDefs";
import { scenarios } from "@/data/onBoarding";
import { usePreference } from "@/store/usePreferences";

const ScenarioSelector = () => {
  const { setSelectedScenario, selectedScenario } = usePreference();
  return (
    <div>
      <label className="block text-sm font-medium text-[#E8ECEF]/70 mb-2">
        Scenario
      </label>
      <div className="grid grid-cols-2 gap-2">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.label)}
              className={`p-3 rounded-lg border transition-all flex flex-col items-center ${
                scenario.label === selectedScenario
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
    </div>
  );
};

export default ScenarioSelector;
