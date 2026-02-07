import ControlPanel from "@/components/Conversation/ControlPanel";
import ConversationDisplay from "@/components/Conversation/ConversationDisplay";
import FeedbackPanel from "@/components/FeedbackPanel/FeedbackPanel";

export default function Conversation() {
  return (
    <div className="min-h-screen bg-[#0F1419] text-white flex flex-col pt-20">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Control Panel */}
        <ControlPanel />

        {/* Center Area - Conversation Display */}
        <ConversationDisplay />

        {/* Right Sidebar - Feedback Panel */}
        <FeedbackPanel />
      </div>
    </div>
  );
}
