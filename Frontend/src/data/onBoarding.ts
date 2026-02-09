import {
  Sprout,
  Leaf,
  TreePine,
  BookOpen,
  Theater,
  PartyPopper,
  Utensils,
  Plane,
  ShoppingBag,
  Briefcase,
  Hospital,
  Users,
} from "lucide-react";

const whitePurpleIconGradient = {
  id: "white-purple",
  from: "#FFFFFF",
  to: "#6C47FF",
};

export const proficiencyLevels = [
  {
    level: "Beginner",
    description: "I'm just starting out or know very little",
    icon: Sprout,
    iconGradient: whitePurpleIconGradient,
    details: "Perfect for first-time learners",
  },
  {
    level: "Intermediate",
    description: "I can have basic conversations",
    icon: Leaf,
    iconGradient: whitePurpleIconGradient,
    details: "You know some phrases and grammar",
  },
  {
    level: "Advanced",
    description: "I'm fluent but want to improve",
    icon: TreePine,
    iconGradient: whitePurpleIconGradient,
    details: "Polish your skills to native level",
  },
];

export const goals = [
  {
    id: "travel",
    label: "Travel",
    icon: Plane,
    iconColor: "#BFF7EF", // light aqua
    iconColorDark: "#008F82", // deep teal
  },
  {
    id: "career",
    label: "Career",
    icon: Briefcase,
    iconColor: "#FFD1E1", // pastel pink
    iconColorDark: "#C0265C", // deep rose
  },
  {
    id: "education",
    label: "Education",
    icon: BookOpen,
    iconColor: "#CFFAEA", // mint
    iconColorDark: "#047857", // emerald dark
  },
  {
    id: "culture",
    label: "Culture",
    icon: Theater,
    iconColor: "#B7F3DC", // jade tint
    iconColorDark: "#065F46", // deep jade
  },
  {
    id: "family",
    label: "Family",
    icon: Users,
    iconColor: "#DCD4FF", // lavender
    iconColorDark: "#4C1D95", // deep purple
  },
  {
    id: "fun",
    label: "Just for Fun",
    icon: PartyPopper,
    iconColor: "#C7DDFF", // sky blue
    iconColorDark: "#1D4ED8", // royal blue
  },
];

const data = async () => {
  const rawData = await fetch("http://localhost:5002/api/scenarios");
  const result = await rawData.json();
  return result.scenarios;
};
 export const scenarios = await data();



