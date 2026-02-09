import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function SSOCallback() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Once auth is loaded and user is signed in, sync with backend
    if (isLoaded && isSignedIn) {
      syncUserWithBackend();
    }
  }, [isLoaded, isSignedIn]);

  const syncUserWithBackend = async () => {
    try {
      const token = await getToken();

      const response = await fetch("http://localhost:5002/api/auth/sync-user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ User synced with backend after OAuth:", data);
        // Navigate to dashboard after successful sync
        navigate("/dashboard");
      } else {
        console.error("⚠️ Failed to sync user:", data);
        // Still navigate to dashboard even if sync fails
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("❌ Error syncing user:", error);
      // Still navigate to dashboard even if sync fails
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#6C47FF] animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Completing Sign In...
        </h2>
        <p className="text-[#E8ECEF] opacity-70">
          Please wait while we set up your account
        </p>
      </div>

      {/* Clerk handles the OAuth callback */}
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
