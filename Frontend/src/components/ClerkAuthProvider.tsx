import { ClerkProvider } from "@clerk/clerk-react";
import type { ReactNode } from "react";

// Get the publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

interface ClerkAuthProviderProps {
  children: ReactNode;
}

export default function ClerkAuthProvider({
  children,
}: ClerkAuthProviderProps) {
  return <ClerkProvider publishableKey={clerkPubKey}>{children}</ClerkProvider>;
}
