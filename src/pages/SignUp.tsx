import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import MainLogo from "../assets/icons/mainLogo.png";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}`);
    // Handle social authentication
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:py-15 bg-[#0F1419]">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <Link to={"/"} className="flex items-center gap-2 mb-2 w-fit">
              <div className="h-12">
                <img className="w-full h-full" src={MainLogo} alt="" />
              </div>
              <span className="text-3xl font-bold bg-linear-to-r from-[#6C47FF] to-[#FF6B9D] bg-clip-text text-transparent">
                FluentAI
              </span>
            </Link>
            <p className="text-[#E8ECEF] opacity-70">
              Start speaking with confidence
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex mb-8 bg-[#1A1F2E] p-1 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 font-semibold relative z-20 transition-all ${
                isLogin
                  ? "text-white"
                  : "text-[#E8ECEF] opacity-70 hover:opacity-100"
              }`}
            >
              Login
              <span
                className={`absolute bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] rounded-lg w-full -z-10 top-0 bottom-0 ${isLogin ? "left-0" : "left-full"} transition-all duration-500`}
              ></span>
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all z-50 ${
                !isLogin
                  ? "text-white"
                  : "text-[#E8ECEF] opacity-70 hover:opacity-100"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth("google")}
              className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(255,255,255,0.1)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0F1419] text-[#E8ECEF] opacity-50">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label className="block text-white font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E8ECEF] opacity-50" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#E8ECEF] placeholder-opacity-50 focus:outline-none focus:border-[#6C47FF] transition-colors"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-white font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E8ECEF] opacity-50" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#E8ECEF] placeholder-opacity-50 focus:outline-none focus:border-[#6C47FF] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E8ECEF] opacity-50" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-xl pl-12 pr-12 py-3 text-white placeholder-[#E8ECEF] placeholder-opacity-50 focus:outline-none focus:border-[#6C47FF] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E8ECEF] opacity-50 hover:opacity-100 transition-opacity"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label className="block text-white font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E8ECEF] opacity-50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full bg-[#1A1F2E] border border-[rgba(255,255,255,0.1)] rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#E8ECEF] placeholder-opacity-50 focus:outline-none focus:border-[#6C47FF] transition-colors"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password (Login Only) */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[rgba(255,255,255,0.1)] bg-[#1A1F2E] text-[#6C47FF] focus:ring-[#6C47FF] focus:ring-offset-0"
                  />
                  <span className="text-sm text-[#E8ECEF] opacity-70">
                    Remember me
                  </span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-[#6C47FF] hover:text-[#00D9C0] transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Terms & Conditions (Sign Up Only) */}
            {!isLogin && (
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 rounded border-[rgba(255,255,255,0.1)] bg-[#1A1F2E] text-[#6C47FF] focus:ring-[#6C47FF] focus:ring-offset-0"
                  required
                />
                <span className="text-sm text-[#E8ECEF] opacity-70">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-[#6C47FF] hover:text-[#00D9C0]"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-[#6C47FF] hover:text-[#00D9C0]"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] text-white font-bold py-4 rounded-xl hover:scale-105 hover:shadow-[0_12px_32px_rgba(108,71,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLogin ? "Login to FluentAI" : "Create Account"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Toggle Link */}
          <p className="mt-6 text-center text-[#E8ECEF] opacity-70">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#6C47FF] hover:text-[#00D9C0] font-semibold transition-colors"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Gradient Background with Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#6C47FF] via-[#FF6B9D] to-[#00D9C0] p-12 flex-col justify-center relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-white mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Join FluentAI & Start Speaking with Confidence
            </h2>
            <p className="text-xl text-white opacity-90">
              Master any language through real AI-powered conversations
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-6">
            {[
              {
                icon: CheckCircle,
                title: "Real-Time Voice Practice",
                description:
                  "Practice speaking naturally with instant AI responses",
              },
              {
                icon: CheckCircle,
                title: "Instant Corrections",
                description:
                  "Get feedback on grammar and pronunciation as you speak",
              },
              {
                icon: CheckCircle,
                title: "20+ Languages",
                description: "Learn Spanish, French, Japanese, and more",
              },
              {
                icon: CheckCircle,
                title: "Track Your Progress",
                description: "See your improvement with detailed analytics",
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-[#FF6B9D]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-white opacity-80">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Signals */}
          <div className="mt-12 pt-8 border-t border-white border-opacity-20">
            <div className="flex items-center gap-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">
                  <FontAwesomeIcon icon={faBrain}></FontAwesomeIcon>
                </div>
                <div className="text-white opacity-80 text-sm flex gap-1">
                  AI Powered
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-white opacity-80 text-sm">Languages</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1M+</div>
                <div className="text-white opacity-80 text-sm">
                  Conversations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
