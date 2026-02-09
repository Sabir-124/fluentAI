// App.tsx
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
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
import AuthPage from "./pages/SignUp"; // Your existing auth page or use the new one
import OnboardingPage from "./pages/OnBoarding";
import Conversation from "./pages/Conversation";
import Profile from "./pages/Profile";
import ProgressOverview from "./pages/ProgressOverview";
import Dashboard from "./pages/Dashboard";
import UserHeader from "./components/Dashboard/Header";// Import protected route
import SSOCallback from "./components/SSOCallback";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";

const App = () => {
  const { pathname } = useLocation();
  const { setCurrentLink } = useLinkStore();
  const { isSignedIn, isLoaded } = useAuth();
 
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "FluentAI - Master Languages Through Real AI Conversations",
      "/features": "Features | FluentAI",
      "/languages": "Languages | FluentAI",
      "/about": "About Us | FluentAI",
      "/contact": "Contacts | FluentAI",
      "/guides": "Learning Guides | FluentAI",
      "/auth": "Sign In | FluentAI",
      "/sign": "Sign In | FluentAI",
      "/onboarding": "Get Started | FluentAI",
      "/dashboard": "Dashboard | FluentAI",
      "/conversation": "Conversation | FluentAI",
      "/progress": "Progress | FluentAI",
      "/profile": "Profile | FluentAI",
      "/help": "Help | FluentAI",
    };

    document.title =
      titles[pathname] ||
      "FluentAI - Master Languages Through Real AI Conversations";

    if (pathname === "/") setCurrentLink("Home");
    else if (pathname === "/features") setCurrentLink("Features");
    else if (pathname === "/languages") setCurrentLink("Languages");
    else if (pathname === "/about") setCurrentLink("About");
    else if (pathname === "/dashboard") setCurrentLink("Dashboard");
    else if (pathname === "/conversation") setCurrentLink("Conversation");
    else if (pathname === "/progress") setCurrentLink("Progress");
    else if (pathname === "/help") setCurrentLink("Help");
    else if (pathname === "/profile") setCurrentLink("Profile");
  }, [pathname, setCurrentLink]);

  // Determine which header to show
  const shouldShowUserHeader =
    isLoaded &&
    isSignedIn &&
    [
      "/dashboard",
      "/conversation",
      "/profile",
      "/progress",
      "/onboarding",
    ].includes(pathname);

  const shouldShowPublicHeader =
    !isSignedIn ||
    [
      "/",
      "/features",
      "/languages",
      "/about",
      "/guides",
      "/auth",
      "/sign",
    ].includes(pathname);

  return (
    <div>
      <Toaster position="top-right" richColors />
      {/* Show appropriate header based on auth state and route */}
      {shouldShowPublicHeader && <Header />}
      {shouldShowUserHeader && <UserHeader />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/about" element={<About />} />
        <Route path="/guides" element={<LearningGuidesPage />} />
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/sign" element={<AuthPage />} />{" "}
        {/* Keeping your existing route */}
        <Route path="/sso-callback" element={<SSOCallback />} />
        {/* Protected Routes - Require Authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<ProgressOverview />} />
        </Route>
      </Routes>

      {/* Only show footer on public pages */}
      {shouldShowPublicHeader && <FooterMinimal />}
    </div>
  );
};

export default App;
