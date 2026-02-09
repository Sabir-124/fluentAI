import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#6C47FF] animate-spin mx-auto mb-4" />
          <p className="text-[#E8ECEF] opacity-70">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth page if not signed in
  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
}
