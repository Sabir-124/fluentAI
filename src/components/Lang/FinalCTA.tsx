const FinalCTA = () => {
  return (
    <section className="py-20 px-[5%] bg-linear-to-br from-[#6C47FF] via-[#FF6B9D] to-[#00D9C0]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Your Language Journey?
        </h2>
        <p className="text-xl text-white opacity-90 mb-8">
          Choose your language and start speaking with confidence today
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-[#6C47FF] font-bold px-10 py-4 text-lg rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
            Start Learning
          </button>
          <button className="bg-transparent border-2 border-white text-white font-semibold px-10 py-4 text-lg rounded-xl hover:bg-white hover:text-[#6C47FF] transition-all duration-300">
            Browse All Languages
          </button>
        </div>
        <p className="text-white opacity-75 text-sm mt-6">
          No payment required • 20+ languages
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
