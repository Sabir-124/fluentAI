import { BookOpen, Play, RotateCw } from "lucide-react";

const QuickActions = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Start New Conversation */}
        <button className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-6 hover:border-[#6C47FF] hover:-translate-y-1 transition-all text-left h-40 flex flex-col justify-between group">
          <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] w-fit">
            <Play size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-[#6C47FF] transition-colors">
              Start New Conversation
            </h3>
            <p className="text-sm text-[#E8ECEF]/60">Begin practicing now</p>
          </div>
        </button>

        {/* Continue Last Session */}
        <button className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-6 hover:border-[#6C47FF] hover:-translate-y-1 transition-all text-left h-40 flex flex-col justify-between group">
          <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-[#00D9C0] to-[#10B981] w-fit">
            <RotateCw size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-[#00D9C0] transition-colors">
              Continue Last Session
            </h3>
            <p className="text-sm text-[#E8ECEF]/60">Spanish - Restaurant</p>
          </div>
        </button>

        {/* Practice Vocabulary */}
        <button className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-6 hover:border-[#6C47FF] hover:-translate-y-1 transition-all text-left h-40 flex flex-col justify-between group">
          <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-[#FF6B9D] to-[#F59E0B] w-fit">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-[#FF6B9D] transition-colors">
              Practice Vocabulary
            </h3>
            <p className="text-sm text-[#E8ECEF]/60">Review recent words</p>
          </div>
        </button>
      </div>
    </section>
  );
};

export default QuickActions;
