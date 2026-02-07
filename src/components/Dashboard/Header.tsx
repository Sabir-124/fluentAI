import Logo from "@/component_Factory/Logo";
import { user } from "@/pages/Dashboard";
import { useLinkStore } from "@/store/useStore";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DashBoardLinks = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Conversation",
    link: "/conversation",
  },
  {
    name: "Progress",
    link: "/progress",
  },
  {
    name: "Help",
    link: "/help",
  },
];

const UserHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { currentLink } = useLinkStore();

  const Routes = ["/"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#0F1419] border-b border-white/10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Logo />

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
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center font-bold">
              {user.avatar}
            </div>
            <div className="hidden lg:block">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-[#E8ECEF]/60">Premium</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
