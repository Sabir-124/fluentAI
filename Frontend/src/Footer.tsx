import { Twitter, Linkedin, Github } from "lucide-react";
import MainLogo from "./assets/icons/mainLogo.png";
import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Features", href: "/features" },
  { name: "Languages", href: "/languages" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
];

export default function FooterMinimal() {
  const { pathname } = useLocation();

  return (
    <footer
      className={`bg-[#0F1419] relative z-20 border-t border-[rgba(255,255,255,0.1)] ${pathname === "/sign" ? "hidden" : "block"}`}
    >
      <div className="max-w-7xl mx-auto px-[5%] py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <Link to={"/"} className="text-center group">
            <img
              src={MainLogo}
              alt="Logo"
              className="w-24 transition-all duration-300
      group-hover:drop-shadow-[0_0_20px_#6C47FF]"
            />
            <div className="text-2xl font-bold bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] bg-clip-text text-transparent">
              FluentAI
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-8">
            {links.map((link) => (
              <Link
                to={link.href}
                key={link.name}
                className="text-[#E8ECEF] opacity-70 hover:opacity-100 hover:text-[#6C47FF] transition-all duration-300 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  to={social.href}
                  key={social.name}
                  className="text-[#E8ECEF] opacity-70 hover:opacity-100 hover:text-[#6C47FF] transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#E8ECEF] opacity-50 text-sm">
            © 2026 FluentAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              to={"/privacy"}
              className="text-[#E8ECEF] opacity-50 hover:opacity-100 transition-opacity"
            >
              Privacy
            </Link>
            <Link
              to={"/terms"}
              className="text-[#E8ECEF] opacity-50 hover:opacity-100 transition-opacity"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
