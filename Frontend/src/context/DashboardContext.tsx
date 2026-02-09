// src/contexts/DashboardContext.tsx
import React, { createContext, useContext, type ReactNode } from "react";
import { useUserData } from "@/hooks/useUserData";

interface DashboardContextType {
  data: ReturnType<typeof useUserData>["data"];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, loading, error, refetch } = useUserData();

  return (
    <DashboardContext.Provider value={{ data, loading, error, refetch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};
