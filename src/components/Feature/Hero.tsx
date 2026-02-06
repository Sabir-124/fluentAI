const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center px-[5%] bg-[#0F1419] z-20 bg-linear-to-b from-[#1A1F2E] to-[#0F1419]">
      {/* Background Gradient */}
      {/* <div className="absolute inset-0 bg-linear-to-b from-[#1A1F2E] to-[#0F1419] opacity-50"></div> */}

      {/* Blobs */}
      <div
        className="absolute w-125 h-125 -top-50 -left-50 
    bg-[#6C47FF] rounded-full blur-[100px] opacity-40 
    animate-float -z-10"
      ></div>

      <div
        className="absolute w-100 h-100 top-1/2 -right-37.5 
    bg-[#FF6B9D] rounded-full blur-[100px] opacity-40 
    animate-float-delayed -z-10"
      ></div>

      <div
        className="absolute w-87.5 h-87.5 -bottom-25 left-[30%] 
    bg-[#00D9C0] rounded-full blur-[100px] opacity-40 
    animate-float-delayed-more -z-10"
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-block bg-linear-to-r from-[#6C47FF] to-[#00D9C0] text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
          Powered by Gemini AI
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Everything You Need to{" "}
          <span className="bg-linear-to-r from-[#6C47FF] via-[#FF6B9D] to-[#00D9C0] bg-clip-text text-transparent">
            Master Any Language
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-[#E8ECEF] opacity-80 mb-10 max-w-3xl mx-auto">
          AI-powered features designed for real conversations and rapid progress
        </p>

        <button className="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] text-white font-bold px-10 py-4 text-lg rounded-xl hover:scale-105 hover:shadow-[0_12px_32px_rgba(108,71,255,0.6)] transition-all duration-300">
          Explore
        </button>
      </div>
    </section>
  );
};

export default Hero;
