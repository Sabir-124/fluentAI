import Working from "@/components/Home/Working";
import FeaturesSection from "../components/Home/FeaturesSection";
import HeroSection from "../components/Home/HeroSection";
import LanguagesSection from "@/components/Home/LanguagesGrid";
import Blobs from "@/components/Home/Blobs";
import FinalCTASection from "@/components/Home/FinalCTA";

const Home = () => {
  return (
    <div className="bg-[#0F1419] relative z-20">
      <Blobs />
      <HeroSection />
      <FeaturesSection />
      <Working />
      <LanguagesSection />
      <FinalCTASection />
    </div>
  );
};

export default Home;
