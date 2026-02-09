const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="sticky top-0 z-20 bg-[#0F1419] border-b border-[rgba(255,255,255,0.1)]">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="w-full h-2 bg-[#1A1F2E] rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#6C47FF] via-[#FF6B9D] to-[#00D9C0] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
