// import { Globe, Search } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="relative py-20 px-[5%] h-screen flex flex-col justify-center">
//       {/* Background Gradient Blobs */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-[#6C47FF] opacity-20 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00D9C0] opacity-20 rounded-full blur-3xl"></div>

//       <div className="relative z-10 max-w-5xl mx-auto text-center">
//         <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#6C47FF] to-[#00D9C0] text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
//           <Globe className="w-4 h-4" />
//           20+ Languages Available
//         </div>

//         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//           Learn Any of{" "}
//           <span className="bg-linear-to-r from-[#6C47FF] via-[#FF6B9D] to-[#00D9C0] bg-clip-text text-transparent">
//             20+ Languages
//           </span>
//         </h1>

//         <p className="text-xl md:text-2xl text-[#E8ECEF] opacity-80 mb-10 max-w-3xl mx-auto">
//           From Spanish to Mandarin, practice conversations in the language you
//           love with AI-powered tutoring
//         </p>

//         {/* Search and Filter Bar */}
//         <div className="max-w-3xl mx-auto">
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             {/* Search Input */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E8ECEF] opacity-50" />
//               <input
//                 type="text"
//                 placeholder="Search for a language..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#E8ECEF] placeholder-opacity-50 focus:outline-none focus:border-[#6C47FF] transition-colors"
//               />
//             </div>

//             {/* Difficulty Filter */}
//             <div className="flex gap-2">
//               {["all", "easy", "medium", "hard"].map((level) => (
//                 <button
//                   key={level}
//                   onClick={() => setSelectedDifficulty(level)}
//                   className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
//                     selectedDifficulty === level
//                       ? "bg-gradient-to-br from-[#6C47FF] to-[#FF6B9D] text-white"
//                       : "bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] text-[#E8ECEF] hover:border-[#6C47FF]"
//                   }`}
//                 >
//                   {level.charAt(0).toUpperCase() + level.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
