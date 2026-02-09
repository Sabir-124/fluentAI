// src/components/Dashboard/Header.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  MessageSquare,
  BarChart3,
  User as UserIcon,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import Logo from "../../component_Factory/Logo";

const DashboardItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: Home,
  },
  {
    name: "Conversation",
    link: "/conversation",
    icon: MessageSquare,
  },
  {
    name: "Progress",
    link: "/progress",
    icon: BarChart3,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: UserIcon,
  },
];

const UserHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { user, isLoaded } = useUser();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";

    const firstName = user.firstName || "";
    const lastName = user.lastName || "";

    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    } else if (firstName) {
      return firstName.substring(0, 2).toUpperCase();
    } else if (user.emailAddresses[0]) {
      return user.emailAddresses[0].emailAddress[0].toUpperCase();
    }

    return "U";
  };

  const getUserName = () => {
    if (!user) return "User";

    const firstName = user.firstName || "";
    const lastName = user.lastName || "";

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (user.emailAddresses[0]) {
      return user.emailAddresses[0].emailAddress.split("@")[0];
    }

    return "User";
  };

  const handleSignOut = async () => {
    try {
      console.log("🚪 Signing out...");
      await signOut();
      console.log("✅ Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("❌ Error signing out:", error);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false);
    };

    if (showUserMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showUserMenu]);

  if (!isLoaded) {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-20 border-b border-b-[rgba(255,255,255,0.1)] bg-[rgba(15,20,25,0.85)] backdrop-blur-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] px-5">
        <div className="h-full w-full flex justify-between items-center">
          <Logo />
          <div className="w-10 h-10 rounded-full bg-[#1A1F2E] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-20 border-b border-b-[rgba(255,255,255,0.1)] bg-[rgba(15,20,25,0.85)] backdrop-blur-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] px-5">
      <div className="h-full w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Left section - Logo */}
        <div className="flex items-center gap-4">
          <Logo />
        </div>

        {/* Mobile Sidebar Overlay */}
        <div
          onClick={() => setShowSidebar(false)}
          className={`bg-black/70 fixed top-0 left-0 right-0 bottom-0 h-screen z-50 ${
            showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition lg:hidden`}
        />

        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-0 bottom-0 h-screen z-50 w-[90vw] sm:w-80 bg-[#0F1419] p-5 flex flex-col gap-4 justify-between ${
            showSidebar ? "left-0" : "-left-full"
          } transition-all duration-500 lg:hidden`}
        >
          <div>
            <div className="flex justify-between items-center mb-8">
              <Logo />
              <button
                onClick={() => setShowSidebar(false)}
                className="w-10 h-10 rounded-lg bg-[#1A1F2E] flex items-center justify-center hover:bg-[#2D3748] transition-colors"
              >
                <X size={20} className="text-[#E8ECEF]/70" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex flex-col gap-2">
              {DashboardItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.link;
                return (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={() => setShowSidebar(false)}
                    className={`p-3 rounded-md transition-all flex items-center gap-3 ${
                      isActive
                        ? "bg-[#272f46] text-white border-2 border-[#6C47FF]"
                        : "bg-[#1A1F2E] hover:bg-[#272f46] text-white/50 hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User Profile Section */}
          <div className="space-y-3">
            <Link
              to="/profile"
              onClick={() => setShowSidebar(false)}
              className="flex items-center gap-3 bg-[#1A1F2E] hover:bg-[#272f46] p-3 rounded-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center font-bold text-white">
                {getUserInitials()}
              </div>
              <div className="flex-1">
                <div className="text-sm text-white font-medium">
                  {getUserName()}
                </div>
                <div className="text-xs text-white/50">View Profile</div>
              </div>
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 p-3 rounded-md transition-all"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Desktop Navigation Items */}
        <div className="hidden lg:flex flex-1 justify-center gap-8">
          {DashboardItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.link;
            return (
              <Link
                key={item.name}
                to={item.link}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "text-[#6C47FF] bg-[#6C47FF]/10"
                    : "text-[#E8ECEF] hover:text-[#6C47FF] hover:bg-[#1A1F2E]"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right section - User Menu */}
        <div className="flex items-center gap-4">
          {/* Desktop User Menu */}
          <div className="hidden lg:block relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
              }}
              className="flex items-center gap-3 bg-[#1A1F2E] hover:bg-[#2D3748] px-4 py-2 rounded-lg transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center font-bold text-white text-sm">
                {getUserInitials()}
              </div>
              <span className="text-white font-medium">{getUserName()}</span>
              <ChevronDown
                size={16}
                className={`text-white/50 transition-transform ${
                  showUserMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-lg shadow-xl py-2 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.1)]">
                  <div className="text-white font-medium">{getUserName()}</div>
                  <div className="text-xs text-white/50 mt-1">
                    {user?.emailAddresses[0]?.emailAddress}
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#272f46] transition-colors text-white/70 hover:text-white"
                >
                  <UserIcon size={18} />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#272f46] transition-colors text-white/70 hover:text-white"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>

                <hr className="my-2 border-[rgba(255,255,255,0.1)]" />

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors text-red-400 hover:text-red-300"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden w-10 h-10 rounded-lg bg-[#1A1F2E] flex items-center justify-center hover:bg-[#2D3748] transition-colors"
          >
            <Menu size={20} className="text-[#E8ECEF]/70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
