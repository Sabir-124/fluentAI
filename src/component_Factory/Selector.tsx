import IconGradientDefs from "./IconGradientDefs";
import { CheckCircle, type LucideIcon } from "lucide-react";

interface SelectorProps {
  key: string;
  onChangeProp: string;
  onChange: (prop: string) => void;
  selectedState: string;
  state: string;
  iconID?: string;
  iconGradientFrom?: string;
  iconGradientTo?: string;
  Icon: LucideIcon;
  description: string;
  details: string;
}

const Selector = ({
  key,
  onChangeProp,
  onChange,
  selectedState,
  state,
  iconID,
  iconGradientFrom,
  iconGradientTo,
  Icon,
  description,
  details,
}: SelectorProps) => {
  return (
    <button
      key={key}
      onClick={() => onChange(onChangeProp)}
      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
        state === selectedState
          ? " border-[#7a5eea] scale-105"
          : "border-[rgba(255,255,255,0.1)] hover:border-[#6C47FF] hover:scale-102 bg-[#1A1F2E]"
      }`}
    >
      <div className="flex items-center gap-6">
        <div className="text-6xl">
          <IconGradientDefs
            id={iconID}
            from={iconGradientFrom}
            to={iconGradientTo}
          />
          <Icon
            className="w-13 h-13"
            stroke={`url(#${iconID})`}
            strokeWidth={2}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            {selectedState}
            {state === selectedState && (
              <CheckCircle className="w-6 h-6 text-[#00D9C0]" />
            )}
          </h3>
          <p className="text-[#E8ECEF] opacity-80 mb-1">{description}</p>
          <p className="text-sm text-[#E8ECEF] opacity-50">{details}</p>
        </div>
      </div>
    </button>
  );
};

export default Selector;
