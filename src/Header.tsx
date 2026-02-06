import { Link, useLocation } from "react-router-dom";
import { useLinkStore } from "./store/useStore";
import { ArrowRight } from "lucide-react";
import Logo from "./component_Factory/Logo";

const Items = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Features",
    link: "/features",
  },
  {
    name: "Languages",
    link: "/languages",
  },
  {
    name: "About",
    link: "/about",
  },
];

const Routes = ["/sign", "/onboarding", "/conversation"];

const Header = () => {
  const { currentLink } = useLinkStore();
  const { pathname } = useLocation();

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 h-16 md:h-20 border-b border-b-[rgba(255,255,255,0.1)] bg-[rgba(15,20,25,0.85)] backdrop-blur-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] justify-center lg:justify-start items-center md:px-5 px-2 ${Routes.some((path) => path === pathname) ? "hidden" : "flex"}`}
    >
      {/* main logo */}
      <Logo />

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

      {/* Sign up button */}
      <Link
        to={"/sign"}
        className="group relative bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] text-white font-bold px-10 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(108,71,255,0.6)] hidden lg:flex items-center justify-center gap-2"
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
    </div>
  );
};

export default Header;
