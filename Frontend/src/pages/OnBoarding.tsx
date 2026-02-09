"use client";
import { useState } from "react";
import {
  Globe,
  Target,
  Zap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { goals, proficiencyLevels, scenarios } from "@/data/onBoarding";
import Header from "@/components/Boarding/Header";
import ProgressBar from "@/components/Boarding/ProgressBar";
import StepsTitles from "@/components/Boarding/StepsTitles";
import Selector from "@/components/Boarding/Selector";
import { usePreference } from "@/store/usePreferences";
import Picker from "@/components/Boarding/Picker";

const languages = [
  { name: "Spanish", native: "Español", flag: "🇪🇸", popular: true },
  { name: "French", native: "Français", flag: "🇫🇷", popular: true },
  { name: "German", native: "Deutsch", flag: "🇩🇪", popular: true },
  { name: "Japanese", native: "日本語", flag: "🇯🇵", popular: true },
  { name: "Mandarin", native: "中文", flag: "🇨🇳", popular: true },
  { name: "Korean", native: "한국어", flag: "🇰🇷", popular: true },
  { name: "Italian", native: "Italiano", flag: "🇮🇹" },
  { name: "Portuguese", native: "Português", flag: "🇵🇹" },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    selectedLanguage,
    selectedLevel,
    learningGoals,
    prefferedScenarios,
    setSelectedLanguage,
    setSelectedLevel,
    setLearningGoals,
    setPrefferedScenarios,
    setSelectedScenario,
  } = usePreference();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedLanguage !== "";
      case 2:
        return selectedLevel !== "";
      case 3:
        return learningGoals.length > 0;
      case 4:
        return prefferedScenarios.length >= 2;
      default:
        return false;
    }
  };

  const handleFinish = () => {
    setSelectedScenario(prefferedScenarios[0]);
    // Redirect to conversation page
    window.location.href = "/conversation";
  };

  return (
    <div className="min-h-screen bg-[#0F1419] flex flex-col">
      {/* Header */}
      <Header currentStep={currentStep} totalSteps={totalSteps} />

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {/* Step 1: Choose Language */}
          {currentStep === 1 && (
            <div>
              <StepsTitles
                Icon={Globe}
                title="Choose Your Language"
                subTitle="Which language would you like to learn?"
                from="#6C47FF"
                to="#00D9C0"
              />

              {/* Popular Languages */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                  Most Popular
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {languages
                    .filter((l) => l.popular)
                    .map((lang) => (
                      <>
                        <Picker
                          currentStep={1}
                          title={lang.name}
                          subTitle={lang.native}
                          onChange={setSelectedLanguage}
                          onChangeProp={lang.name}
                          isSelected={selectedLanguage === lang.name}
                          flag={lang.flag}
                          popular={true}
                        />
                      </>
                    ))}
                </div>
              </div>

              {/* Other Languages */}
              <div>
                <h3 className="text-white font-semibold mb-4">
                  More Languages
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {languages
                    .filter((l) => !l.popular)
                    .map((lang) => (
                      <>
                        <Picker
                          currentStep={1}
                          title={lang.name}
                          subTitle={lang.native}
                          onChange={setSelectedLanguage}
                          onChangeProp={lang.name}
                          isSelected={selectedLanguage === lang.name}
                          flag={lang.flag}
                        />
                      </>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Proficiency Level */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <StepsTitles
                Icon={Target}
                title=" What's Your Level?"
                subTitle={`Tell us about your ${selectedLanguage} proficiency`}
                from="#FF6B9D"
                to="#6C47FF"
              />

              <div className="max-w-3xl mx-auto space-y-4">
                {proficiencyLevels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Selector
                      key={item.level}
                      onChangeProp={item.level}
                      onChange={setSelectedLevel}
                      selectedState={item.level}
                      state={selectedLevel}
                      iconID={item.iconGradient.id}
                      iconGradientFrom={item.iconGradient.from}
                      iconGradientTo={item.iconGradient.to}
                      Icon={Icon}
                      description={item.description}
                      details={item.details}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Learning Goals */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <StepsTitles
                Icon={Zap}
                title="What Are Your Goals?"
                subTitle="Select all that apply (choose at least one)"
                from="#00D9C0"
                to="#10B981"
              />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {goals.map((goal) => {
                  const isSelected = learningGoals.includes(goal.id);
                  const Icon = goal.icon;
                  return (
                    <Picker
                      currentStep={3}
                      title={goal.label}
                      onChange={setLearningGoals}
                      onChangeProp={goal.id}
                      isSelected={isSelected}
                      Icon={Icon}
                      iconID={goal.id}
                      iconGradientFrom={goal.iconColor}
                      iconGradientTo={goal.iconColorDark}
                    />
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-[#E8ECEF] opacity-50">
                  Selected: {learningGoals.length}{" "}
                  {learningGoals.length === 1 ? "goal" : "goals"}
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Preferred Scenarios */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <StepsTitles
                Icon={Sparkles}
                title="Choose Practice Scenarios"
                subTitle="Pick at least 2 scenarios you'd like to practice"
                from="#6C47FF"
                to="#FF6B9D"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {scenarios.map((scenario) => {
                  const isSelected = prefferedScenarios.includes(scenario.id);
                  const Icon = scenario.icon;

                  return (
                    <Picker
                      currentStep={4}
                      title={scenario.label}
                      subTitle={scenario.description}
                      onChange={setPrefferedScenarios}
                      onChangeProp={scenario.id}
                      isSelected={isSelected}
                      Icon={Icon}
                      iconID={scenario.id}
                      iconGradientFrom={scenario.iconColor}
                      iconGradientTo={scenario.iconColorDark}
                    />
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-[#E8ECEF] opacity-50">
                  Selected: {prefferedScenarios.length}{" "}
                  {prefferedScenarios.length === 1 ? "scenario" : "scenarios"}
                  {prefferedScenarios.length < 2 && " (select at least 2)"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="sticky bottom-0 bg-[#0F1419] border-t border-[rgba(255,255,255,0.1)] p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1
                ? "opacity-0 pointer-events-none"
                : "text-[#E8ECEF] hover:text-white hover:bg-[#1A1F2E]"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Progress Dots */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step === currentStep
                    ? "w-8 bg-linear-to-r from-[#6C47FF] to-[#00D9C0]"
                    : step < currentStep
                      ? "bg-[#00D9C0]"
                      : "bg-[#2D3748]"
                }`}
              ></div>
            ))}
          </div>

          {/* Next/Finish Button */}
          {currentStep < totalSteps ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                canProceed()
                  ? "bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] text-white hover:scale-105 hover:shadow-[0_12px_32px_rgba(108,71,255,0.6)]"
                  : "bg-[#2D3748] text-[#E8ECEF] opacity-50 cursor-not-allowed"
              }`}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                canProceed()
                  ? "bg-linear-to-br from-[#00D9C0] to-[#10B981] text-white hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,217,192,0.6)]"
                  : "bg-[#2D3748] text-[#E8ECEF] opacity-50 cursor-not-allowed"
              }`}
            >
              Start Learning 🎉
              <Sparkles className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
