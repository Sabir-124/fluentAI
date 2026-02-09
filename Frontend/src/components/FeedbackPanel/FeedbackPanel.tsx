import { useState } from "react";
import Corrections from "./Corrections";
import Context from "./Context";
import Progress from "./Progress";

const FeedbackPanel = () => {
  const [activeTab, setActiveTab] = useState("corrections");
  return (
    <div className="w-96 bg-[#1A1F2E] border-l border-white/10 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {[
          { id: "corrections", label: "Corrections" },
          { id: "context", label: "Context" },
          { id: "progress", label: "Progress" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "text-[#6C47FF] border-b-2 border-[#6C47FF]"
                : "text-[#E8ECEF]/60 hover:text-[#E8ECEF]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "corrections" && <Corrections />}

        {activeTab === "context" && <Context />}

        {activeTab === "progress" && <Progress />}
      </div>
    </div>
  );
};

export default FeedbackPanel;
