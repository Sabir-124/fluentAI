import { Link, useLocation } from "react-router-dom";
import { useLinkStore } from "./store/useStore";
import {
  ArrowRight,
  Home,
  Info,
  Languages,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import Logo from "./component_Factory/Logo";
import { useState } from "react";

const Items = [
  {
    name: "Home",
    link: "/",
    icon: Home,
  },
  {
    name: "Features",
    link: "/features",
    icon: Sparkles,
  },
  {
    name: "Languages",
    link: "/languages",
    icon: Languages,
  },
  {
    name: "About",
    link: "/about",
    icon: Info,
  },
];

const Routes = ["/", "/features", "/about", "/languages"];

const Header = () => {
  const { currentLink } = useLinkStore();
  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 h-20 border-b border-b-[rgba(255,255,255,0.1)] bg-[rgba(15,20,25,0.85)] backdrop-blur-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] px-5 ${Routes.some((path) => path === pathname) ? "block" : "hidden"}`}
    >
      <div className="h-full w-full flex justify-between items-center">
        {/* left section */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Logo />
        </div>

        <div
          onClick={() => setShowSidebar(false)}
          className={`bg-black/70 fixed top-0 left-0 right-0 bottom-0 h-screen z-50 ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"} transition`}
        ></div>
        <aside
          className={`fixed top-0 bottom-0 h-screen z-50 w-[90vw] sm:w-90 bg-[#0F1419] p-5 flex flex-col gap-4 justify-between ${showSidebar ? "left-0" : "-left-full"} transition-all duration-500`}
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
              {Items.map((i) => {
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

          <div>
            {/* Profile */}
            <Link
              to={"/sign"}
              className="group relative bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] text-white font-bold px-10 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(108,71,255,0.6)] flex items-center justify-center gap-2"
            >
              {/* Animated gradient overlay */}
              <span className="absolute inset-0 bg-linear-to-br from-[#FF6B9D] to-[#00D9C0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

              {/* Content */}
              <span className="relative z-10 flex items-center gap-2">
                Sign Up to Start
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>

              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent"></span>
            </Link>
            <Link
              to={"/dashboard"}
              onClick={() => setShowSidebar(false)}
              className="flex items-center gap-3 bg-[#1A1F2E] hover:bg-[#272f46] p-3 rounded-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] flex items-center justify-center font-bold">
                asdas
              </div>
              <div>
                <div className="text-sm text-white/50 group-hover:text-white font-medium transition">
                  dsada
                </div>
              </div>
            </Link>
          </div>
        </aside>

        {/* items */}
        <div className="lg:flex flex-1 justify-center gap-10 hidden">
          {Items.map((i) => (
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
        </div>

        <div className="flex items-center">
          {/* Sign up button */}
          <Link
            to={"/sign"}
            className="group relative bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] text-white font-bold px-10 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(108,71,255,0.6)] hidden md:flex items-center justify-center gap-2"
          >
            {/* Animated gradient overlay */}
            <span className="absolute inset-0 bg-linear-to-br from-[#FF6B9D] to-[#00D9C0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              Sign Up to Start
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>

            {/* Shimmer effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent"></span>
          </Link>

          {/* burger icon */}
          <div className="block lg:hidden">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="w-10 h-10 rounded-lg bg-[#1A1F2E] flex items-center justify-center hover:bg-[#2D3748] transition-colors relative"
            >
              <Menu size={20} className="text-[#E8ECEF]/70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
