import {
  faMicrophone,
  faCheckDouble,
  faGlobe,
  faMapMarkedAlt,
  faTrophy,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { GlareCard } from "../ui/glare-card";

export const keyFeatures = [
  {
    id: 1,
    title: "Real-Time Voice Conversations",
    description: "Practice speaking with instant voice interaction",
    icon: faMicrophone,
    gradient: {
      from: "#7B2FF7", // Purple
      to: "#1FD1C1", // Teal
    },
  },
  {
    id: 2,
    title: "Instant Corrections",
    description: "Get immediate feedback with smart corrections",
    icon: faCheckDouble,
    gradient: {
      from: "#FF6F61", // Coral
      to: "#7B2FF7", // Purple
    },
  },
  {
    id: 3,
    title: "Cultural Context",
    description:
      "Understand idioms, customs, and etiquette for natural communication",
    icon: faGlobe,
    gradient: {
      from: "#1FD1C1", // Teal
      to: "#2ECC71", // Green
    },
  },
  {
    id: 4,
    title: "Scenario-Based Learning",
    description: "Practice real-world situations and conversations",
    icon: faMapMarkedAlt,
    gradient: {
      from: "#7B2FF7", // Purple
      to: "#FF6F61", // Coral
    },
  },
  {
    id: 5,
    title: "Progress Tracking",
    description: "Track achievements and learning milestones",
    icon: faTrophy,
    gradient: {
      from: "#2ECC71", // Green
      to: "#1FD1C1", // Teal
    },
  },
  {
    id: 6,
    title: "Adaptive Difficulty",
    description:
      "AI adjusts complexity in real-time based on your fluency level",
    icon: faSlidersH,
    gradient: {
      from: "#3498DB", // Blue
      to: "#7B2FF7", // Purple
    },
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-25 pt-35 px-5">
      <div className="w-full max-w-350 m-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-10">
          <span>Why Choose</span>{" "}
          <PointerHighlight
            rectangleClassName="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] dark:bg-linear-to-br dark:from-[#6C47FF] dark:to-[#FF6B9D]  border-neutral-300 dark:border-neutral-600 leading-loose"
            pointerClassName="text-yellow-500 h-3 w-3"
            containerClassName="inline-block mr-1"
          >
            <span className="relative z-10">FluentAI</span>
          </PointerHighlight>
        </h2>
        <p className="md:text-xl text-[#E8ECEF] opacity-70 text-center mb-15">
          Everything you need to master any language through natural
          conversation
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {keyFeatures.map((feature) => (
            <GlareCard key={feature.id} className="h-full">
              <div className="h-full rounded-2xl p-10 cursor-pointer flex flex-col gap-3 text-white group">
                <div
                  className="w-16 h-16 rounded-xl bg-linear-to-br from-[#6C47FF] to-[#00D9C0]
          group-hover:rotate-6 group-hover:scale-105 transition duration-300
          flex items-center justify-center mb-6"
                >
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="text-white text-[32px]"
                  />
                </div>

                <h1 className="text-[30px] font-bold">{feature.title}</h1>
                <p className="text-[#E8ECEF]/70">{feature.description}</p>
              </div>
            </GlareCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
