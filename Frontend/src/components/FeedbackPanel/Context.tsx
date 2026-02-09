// src/components/FeedbackPanel/Context.tsx
import { useConversation } from "@/store/useConversation";
import { Globe } from "lucide-react";

const Context = () => {
  const { culturalTips, scenario, language } = useConversation();

  const getDefaultTip = () => {
    const tips: Record<string, Record<string, string>> = {
      spanish: {
        restaurant:
          "In Spanish restaurants, it's common to say 'la cuenta, por favor' when asking for the check.",
        casual:
          "Use 'tú' for informal conversations and 'usted' for formal situations.",
        travel: "In Spain, 'vale' is commonly used to say 'okay' or 'alright'.",
      },
      french: {
        restaurant:
          "In France, say 'l'addition, s'il vous plaît' to ask for the bill.",
        casual:
          "Use 'tu' for friends and 'vous' for formal or professional settings.",
      },
      // Add more languages and scenarios...
    };

    return tips[language]?.[scenario] || "Practice makes perfect! Keep going!";
  };

  return (
    <div className="space-y-4">
      {culturalTips.length > 0 ? (
        culturalTips.map((tip, idx) => (
          <div key={idx} className="bg-[#2D3748] rounded-xl p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Globe size={18} className="text-[#00D9C0]" />
              Cultural Tip
            </h3>
            <p className="text-sm text-[#E8ECEF]/70 leading-relaxed">{tip}</p>
          </div>
        ))
      ) : (
        <div className="bg-[#2D3748] rounded-xl p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Globe size={18} className="text-[#00D9C0]" />
            Cultural Tip
          </h3>
          <p className="text-sm text-[#E8ECEF]/70 leading-relaxed">
            {getDefaultTip()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Context;
