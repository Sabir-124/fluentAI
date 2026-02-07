import { CheckCircle, type LucideIcon } from "lucide-react";
import IconGradientDefs from "../../component_Factory/IconGradientDefs";

interface PickerProps {
  currentStep: number;
  title: string;
  subTitle?: string;
  onChange: (input: string) => void;
  onChangeProp: string;
  isSelected: boolean;
  flag?: string;
  popular?: boolean;
  Icon?: LucideIcon;
  iconID?: string;
  iconGradientFrom?: string;
  iconGradientTo?: string;
}

const Picker = ({
  currentStep,
  title,
  subTitle,
  onChange,
  onChangeProp,
  isSelected,
  flag,
  popular,
  Icon,
  iconID,
  iconGradientFrom,
  iconGradientTo,
}: PickerProps) => {
  return (
    <button
      key={title}
      onClick={() => onChange(onChangeProp)}
      className={`${popular || currentStep !== 1 ? "p-6 rounded-2xl" : "p-4 rounded-xl"} border-2 transition-all duration-300 ${
        isSelected
          ? " border-[#00D9C0] scale-105"
          : "bg-[#1A1F2E] border-[rgba(255,255,255,0.1)] hover:border-[#6C47FF] hover:scale-105"
      } flex flex-col justify-center ${currentStep !== 4 ? "items-center" : "items-start"}`}
    >
      {currentStep === 1 && (
        <div className={`${popular ? "text-5xl mb-3" : "text-3xl mb-2"}`}>
          {flag}
        </div>
      )}

      {(currentStep === 3 || currentStep === 4) && (
        <div>
          {isSelected && (
            <div className="absolute top-3 right-3">
              <CheckCircle className="w-6 h-6 text-[#00D9C0]" />
            </div>
          )}
          <div className="text-5xl mb-4">
            <IconGradientDefs
              id={iconID}
              from={iconGradientFrom}
              to={iconGradientTo}
            />
            {Icon && (
              <Icon
                stroke={`url(#${iconID})`}
                strokeWidth={2}
                className="w-13 h-13"
              />
            )}
          </div>
        </div>
      )}

      <h4
        className={`${popular || currentStep !== 1 ? "text-xl" : "text-sm"} font-bold text-white mb-1`}
      >
        {title}
      </h4>

      {subTitle && (
        <p
          className={`${popular || currentStep !== 1 ? "text-sm" : "text-xs"} text-[#E8ECEF] opacity-60`}
        >
          {subTitle}
        </p>
      )}
    </button>
  );
};

export default Picker;
