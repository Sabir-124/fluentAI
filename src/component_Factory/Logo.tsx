import { Link } from "react-router-dom";
import MainLogo from "../assets/icons/mainLogo.png";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2 cursor-pointer group">
      <img
        className="w-15 h-auto transition-all duration-300
      group-hover:drop-shadow-[0_0_15px_#6C47FF]"
        src={MainLogo}
        alt=""
      />
      <h1 className="bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] bg-clip-text text-transparent text-[28px] font-extrabold">
        FluentAI
      </h1>
    </Link>
  );
};

export default Logo;
