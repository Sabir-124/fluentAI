import AudioControlButtons from "./AudioControlButtons";
import AudioVisualizer from "./AudioVisualizer";
import MessagesDisplay from "./MessagesDisplay";
import SessionInfo from "./SessionInfo";

const ConversationDisplay = () => {
  return (
    <div className="flex-1 max-h-screen md:max-h-235 flex flex-col bg-[#0F1419]">
      {/* Messages */}
      <SessionInfo />
      <MessagesDisplay />

      {/* Audio Visualizer */}
      <AudioVisualizer />

      {/* Control Buttons */}
      <AudioControlButtons />
    </div>
  );
};

export default ConversationDisplay;
