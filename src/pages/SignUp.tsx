// Signup.tsx
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
  Loader2,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import MainLogo from "../assets/icons/mainLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn, useSignUp, useAuth } from "@clerk/clerk-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, setActive: setActiveSignIn } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const { getToken } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ NEW: Sync user with backend database
  // Replace the syncUserWithBackend function with this:
  // Signup.tsx - UPDATED syncUserWithBackend function

  const syncUserWithBackend = async (retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(
          `🔄 Syncing user with backend (attempt ${attempt}/${retries})...`,
        );

        const token = await getToken();

        if (!token) {
          console.error("❌ No token available - waiting for Clerk session...");
          // Wait a bit and retry
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }

        console.log("✅ Token obtained, calling backend...");

        const response = await fetch(
          "http://localhost:5002/api/auth/sync-user",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        console.log(`📡 Backend response status: ${response.status}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ Backend error response:", errorText);

          if (attempt < retries) {
            console.log(`⏳ Retrying in ${attempt} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
            continue;
          }
          throw new Error(
            `Failed to sync user: ${response.status} ${errorText}`,
          );
        }

        const data = await response.json();

        if (data.success) {
          console.log("✅ User successfully synced with backend!");
          console.log("📊 User data:", data.user);
          return data;
        } else {
          console.error("⚠️ Sync returned success:false", data);
          if (attempt < retries) {
            await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
            continue;
          }
          throw new Error(data.error || "Unknown sync error");
        }
      } catch (error) {
        console.error(`❌ Sync attempt ${attempt} failed:`, error);

        if (attempt === retries) {
          console.error(
            "❌ All sync attempts failed - user may not be in database!",
          );
          // Show error to user but don't block login
          setError(
            "Warning: Some features may not work properly. Please refresh the page.",
          );
          return null;
        }

        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }

    return null;
  };

  // Handle email/password sign up
  // Update handleSignUp - Add logging and wait for sync
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      if (!signUp) {
        setError("Sign up is not available");
        setIsLoading(false);
        return;
      }

      console.log("📝 Creating user account...");

      // Create the user with Clerk
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: firstName,
        lastName: lastName,
      });

      console.log("✅ Clerk account created:", result.status);

      // Send email verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      console.log("📧 Verification email sent");

      // Set session active
      if (
        result.status === "complete" ||
        result.status === "missing_requirements"
      ) {
        await setActiveSignUp({ session: result.createdSessionId });
        console.log("✅ Clerk session activated");

        // ✅ CRITICAL: Wait for sync to complete before navigating
        console.log("🔄 Starting backend sync...");
        const syncResult = await syncUserWithBackend();

        if (syncResult) {
          console.log("✅ Backend sync successful!");
        } else {
          console.warn("⚠️ Backend sync failed, but continuing anyway");
        }

        // Navigate to dashboard
        console.log("🚀 Redirecting to dashboard...");
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("❌ Sign up error:", err);

      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].longMessage || err.errors[0].message;
        setError(errorMessage);
      } else {
        setError(err.message || "Failed to sign up. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email/password sign in
  // Update handleSignIn - Add sync after login too
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!signIn) {
        setError("Sign in is not available");
        setIsLoading(false);
        return;
      }

      console.log("🔐 Logging in...");

      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      console.log("✅ Login successful:", result.status);

      if (result.status === "complete") {
        await setActiveSignIn({ session: result.createdSessionId });
        console.log("✅ Session activated");

        // ✅ Sync user with backend (in case they signed up elsewhere)
        console.log("🔄 Syncing user with backend...");
        const syncResult = await syncUserWithBackend();

        if (syncResult) {
          console.log("✅ User synced successfully!");
        } else {
          console.warn("⚠️ Sync failed, but continuing...");
        }

        console.log("🚀 Redirecting to dashboard...");
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("❌ Sign in error:", err);

      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].longMessage || err.errors[0].message;
        setError(errorMessage);
      } else {
        setError(err.message || "Failed to sign in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  // Handle form submission based on login/signup mode
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isLogin) {
      await handleSignIn(e);
    } else {
      await handleSignUp(e);
    }
  };

  // Handle social authentication (Google)
  const handleSocialAuth = async (provider: string) => {
    setError("");
    setIsLoading(true);

    try {
      if (provider === "google") {
        if (isLogin) {
          if (!signIn) {
            setError("Sign in is not available");
            setIsLoading(false);
            return;
          }

          await signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/dashboard",
          });
        } else {
          if (!signUp) {
            setError("Sign up is not available");
            setIsLoading(false);
            return;
          }

          await signUp.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/dashboard",
          });
        }
      }
    } catch (err: any) {
      console.error("Social auth error:", err);
      setError(err.message || "Failed to authenticate with Google");
      setIsLoading(false);
    }
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
              onClick={() => {
                setIsLogin(true);
                setError("");
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className={`flex-1 py-3 font-semibold relative z-20 transition-all ${
                isLogin
                  ? "text-white"
                  : "text-[#E8ECEF] opacity-70 hover:opacity-100"
              }`}
              disabled={isLoading}
            >
              Login
              <span
                className={`absolute bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] rounded-lg w-full -z-10 top-0 bottom-0 ${isLogin ? "left-0" : "left-full"} transition-all duration-500`}
              ></span>
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError("");
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all z-50 ${
                !isLogin
                  ? "text-white"
                  : "text-[#E8ECEF] opacity-70 hover:opacity-100"
              }`}
              disabled={isLoading}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-50 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth("google")}
              disabled={isLoading}
              className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
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
                </>
              )}
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
                    disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E8ECEF] opacity-50 hover:opacity-100 transition-opacity"
                  disabled={isLoading}
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
                    disabled={isLoading}
                    minLength={8}
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
                    disabled={isLoading}
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
                  disabled={isLoading}
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
              disabled={isLoading}
              className="w-full bg-linear-to-br from-[#6C47FF] to-[#FF6B9D] text-white font-bold py-4 rounded-xl hover:scale-105 hover:shadow-[0_12px_32px_rgba(108,71,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isLogin ? "Logging in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {isLogin ? "Login to FluentAI" : "Create Account"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <p className="mt-6 text-center text-[#E8ECEF] opacity-70">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className="text-[#6C47FF] hover:text-[#00D9C0] font-semibold transition-colors"
              disabled={isLoading}
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
