import AudioControlButtons from "./AudioControlButtons";
import AudioVisualizer from "./AudioVisualizer";
import MessagesDisplay from "./MessagesDisplay";

const ConversationDisplay = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#0F1419]">
      {/* Messages */}
      <MessagesDisplay />

      {/* Audio Visualizer */}
      <AudioVisualizer />

      {/* Control Buttons */}
      <AudioControlButtons />
    </div>
  );
};

export default ConversationDisplay;
