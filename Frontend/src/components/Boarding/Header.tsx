import Logo from "@/component_Factory/Logo";

const Header = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  return (
    <header className="p-6 border-b border-[rgba(255,255,255,0.1)]">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Logo />

        <div className="text-[#E8ECEF] opacity-70 text-sm">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    </header>
  );
};

export default Header;
