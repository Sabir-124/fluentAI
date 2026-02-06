interface PickerProps {
  title: string;
  subTitle: string;
  onChange: (input: string) => void;
  onChangeProp: string;
  state: string;
  selectedState: string;
  flag?: string;
  popular?: boolean;
}

const Picker = ({
  title,
  subTitle,
  onChange,
  onChangeProp,
  state,
  selectedState,
  flag,
}: PickerProps) => {
  return (
    <button
      key={title}
      onClick={() => onChange(onChangeProp)}
      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
        selectedState === state
          ? " border-[#00D9C0] scale-105"
          : "bg-[#1A1F2E] border-[rgba(255,255,255,0.1)] hover:border-[#6C47FF] hover:scale-105"
      }`}
    >
      <div className="text-5xl mb-3">{flag}</div>
      <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
      <p className="text-sm text-[#E8ECEF] opacity-60">{subTitle}</p>
    </button>
  );
};

export default Picker;
