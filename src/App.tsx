import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Home from "./pages/Home";
import FooterMinimal from "./Footer";
import Features from "./pages/Features";
import { useLinkStore } from "./store/useStore";
import { useEffect } from "react";
import Languages from "./pages/Languages";
import About from "./pages/About";
import LearningGuidesPage from "./components/Guide/GuidePage";
import AuthPage from "./pages/SignUp";
import OnboardingPage from "./pages/OnBoarding";

const App = () => {
  const { pathname } = useLocation();
  const { setCurrentLink } = useLinkStore();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "FluentAI - Master Languages Through Real AI Conversations",
      "/features": "Features | FluentAI",
      "/languages": "Languages | FluentAI",
      "/about": "About Us | FluentAI",
      "/contact": "Contacts | FluentAI",
    };

    document.title =
      titles[pathname] ||
      "FluentAI - Master Languages Through Real AI Conversations";

    if (pathname === "/") setCurrentLink("Home");
    else if (pathname === "/features") setCurrentLink("Features");
    else if (pathname === "/languages") setCurrentLink("Languages");
    else if (pathname === "/about") setCurrentLink("About");
  }, [pathname, setCurrentLink]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/about" element={<About />} />
        <Route path="/guides" element={<LearningGuidesPage />} />
        <Route path="/sign" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
      <FooterMinimal />
    </div>
  );
};

export default App;
