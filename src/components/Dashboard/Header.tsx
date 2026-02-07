import Logo from "@/component_Factory/Logo";
import { user } from "@/pages/Dashboard";
import { useLinkStore } from "@/store/useStore";
import {
  Bell,
  Menu,
  Search,
  LayoutDashboard,
  MessagesSquare,
  BarChart3,
  HelpCircle,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DashBoardLinks = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Conversation",
    link: "/conversation",
    icon: MessagesSquare,
  },
  {
    name: "Progress",
    link: "/progress",
    icon: BarChart3,
  },
  {
    name: "Help",
    link: "/help",
    icon: HelpCircle,
  },
];
const Routes = [
  "/dashboard",
  "/conversation",
  "/progress",
  "/profile",
  "/help",
];

const UserHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { currentLink } = useLinkStore();
  const { pathname } = useLocation();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 bg-[#0F1419] border-b border-white/10 ${Routes.some((route) => route === pathname) ? "block" : "hidden"}`}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* left section */}
        <div className="flex items-center gap-4">
          {/* burger icon */}
          <div className="block lg:hidden">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="w-10 h-10 rounded-lg bg-[#1A1F2E] flex items-center justify-center hover:bg-[#2D3748] transition-colors relative"
            >
              <Menu size={20} className="text-[#E8ECEF]/70" />
            </button>
          </div>
          {/* Logo */}
          <Logo />
        </div>

        {/* User Sidebar */}
        <div
          onClick={() => setShowSidebar(false)}
          className={`bg-black/70 fixed inset-0 z-50 ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"} transition`}
        ></div>
        <aside
          className={`fixed top-0 bottom-0 z-50 w-[90vw] sm:w-90 bg-[#0F1419] p-5 flex flex-col gap-4 justify-between ${showSidebar ? "right-0" : "-right-full"} transition-all duration-500`}
        >
          <div>
            <div className="flex justify-between items-center mb-8">
              <Logo />
              <button
                onClick={() => setShowSidebar(false)}
                className="w-10 h-10 rounded-lg bg-[#1A1F2E] flex items-center justify-center hover:bg-[#2D3748] transition-colors relative"
              >
                <X size={20} className="text-[#E8ECEF]/70" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {DashBoardLinks.map((i) => {
                const Icon = i.icon;
                return (
                  <Link
                    to={i.link}
                    style={{
                      color: currentLink === i.name ? "white" : "",
                      border: currentLink === i.name ? "2px solid #6C47FF" : "",
                      background: currentLink === i.name ? "#272f46" : "",
                    }}
                    onClick={() => setShowSidebar(false)}
                    className="bg-[#1A1F2E] hover:bg-[#272f46] text-white/50 hover:text-white p-3 rounded-md transition-all flex items-center gap-3"
                  >
                    <Icon />
                    <span>{i.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Profile */}
          <Link
            to={"/profile"}
            onClick={() => setShowSidebar(false)}
            className="flex items-center gap-3 bg-[#1A1F2E] hover:bg-[#272f46] p-3 rounded-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center font-bold">
              {user.avatar}
            </div>
            <div>
              <div className="text-sm text-white/50 group-hover:text-white font-medium transition">
                {user.name}
              </div>
            </div>
          </Link>
        </aside>

        {/* Main Navigation */}
        <nav className="lg:flex flex-1 justify-center gap-10 hidden">
          {DashBoardLinks.map((i) => (
            <Link
              to={i.link}
              key={i.name}
              style={{ color: currentLink === i.name ? "#6C47FF" : "" }}
              className="text-[16px] font-medium text-[#E8ECEF] hover:text-[#6C47FF] transition group relative cursor-pointer"
            >
              {i.name}
              <div className="absolute group-hover:w-full top-[115%] w-0 left-0 bg-[#6C47FF] h-0.5 rounded-full transition-all duration-300"></div>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button className="w-10 h-10 rounded-lg bg-[#1A1F2E] flex items-center justify-center hover:bg-[#2D3748] transition-colors">
            <Search size={20} className="text-[#E8ECEF]/70" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-lg bg-[#1A1F2E] flex items-center justify-center hover:bg-[#2D3748] transition-colors relative"
            >
              <Bell size={20} className="text-[#E8ECEF]/70" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
            </button>
          </div>

          {/* Profile Dropdown */}
          <Link
            to={"/profile"}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center font-bold">
              {user.avatar}
            </div>
            <div className="hidden lg:block">
              <div className="text-sm text-white/50 group-hover:text-white transition font-medium">
                {user.name}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
