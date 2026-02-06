import {
  faGlobe,
  faMapPin,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PointerHighlight } from "../ui/pointer-highlight";
import { useState } from "react";

const steps = [
  {
    number: "01",
    icon: faGlobe,
    title: "Choose Your Language & Level",
    description: "Select from 20+ languages and set your proficiency",
    gradient: "from-[#6C47FF] to-[#00D9C0]",
  },
  {
    number: "02",
    icon: faMapPin,
    title: "Pick a Scenario",
    description: "Choose real-world situations to practice",
    gradient: "from-[#FF6B9D] to-[#6C47FF]",
  },
  {
    number: "03",
    icon: faMicrophone,
    title: "Start Speaking",
    description: "Practice with AI and get instant feedback",
    gradient: "from-[#00D9C0] to-[#10B981]",
  },
];

export default function HowItWorksTimeline() {
  const [hoveredStep, setHoveredStep] = useState(0);

  return (
    <section className="py-25 px-[5%]">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Start Speaking in{" "}
          <PointerHighlight
            rectangleClassName="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] dark:bg-linear-to-br dark:from-[#6C47FF] dark:to-[#FF6B9D]  border-neutral-300 dark:border-neutral-600 leading-loose"
            pointerClassName="text-yellow-500 h-3 w-3"
            containerClassName="inline-block mr-1"
          >
            <span className="relative z-10">3 Simple Steps</span>
          </PointerHighlight>
        </h2>
        <p className="text-lg md:text-xl text-[#E8ECEF] opacity-70 max-w-2xl mx-auto">
          Get fluent faster with AI-powered conversations
        </p>
      </div>

      {/* Timeline Container */}
      <div className="max-w-5xl mx-auto">
        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block relative">
          {/* Connecting Line */}
          <div className="absolute top-16 left-[10%] right-[10%] h-1 bg-linear-to-r from-[#6C47FF] via-[#FF6B9D] to-[#00D9C0] opacity-30"></div>

          {/* fill bar */}
          <div
            style={{
              width: hoveredStep === 2 ? "80%" : hoveredStep === 1 ? "40%" : 0,
            }}
            className="absolute top-16 left-[10%] h-1 bg-linear-to-r from-[#6C47FF] via-[#FF6B9D] to-[#00D9C0] transition-all duration-500"
          ></div>

          <div
            onMouseLeave={() => setHoveredStep(0)}
            className="flex justify-between items-start relative z-10"
          >
            {steps.map((step, index) => {
              return (
                <div key={index} className="flex flex-col items-center w-[30%]">
                  {/* Icon Circle */}
                  <div
                    onMouseEnter={() => setHoveredStep(index)}
                    className={`w-32 h-32 rounded-full bg-linear-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-[0_12px_32px_rgba(108,71,255,0.3)] hover:scale-110 transition-transform duration-300 relative`}
                  >
                    <FontAwesomeIcon
                      icon={step.icon}
                      size="2x"
                      className="w-16 h-16 text-white"
                    />

                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <span className="text-[#6C47FF] text-lg font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#E8ECEF] opacity-70 text-center">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => {
            return (
              <div key={index} className="flex gap-6 items-start">
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-xl bg-linear-to-br ${step.gradient} flex items-center justify-center shrink-0 relative`}
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={step.icon}
                    className="w-8 h-8 text-white"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                    <span className="text-[#6C47FF] text-sm font-bold">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#E8ECEF] opacity-70">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] px-12 py-4 text-lg font-semibold text-white rounded-xl shadow-[0_8px_24px_rgba(108,71,255,0.4)] hover:scale-105 hover:shadow-[0_12px_32px_rgba(108,71,255,0.6)] transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
