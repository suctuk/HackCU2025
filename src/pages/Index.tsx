
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import LoadingScreen from "@/components/LoadingScreen";
import AppSidebar from "@/components/AppSidebar";
import SleepDashboard from "@/components/SleepDashboard";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = () => {
    setLoading(false);
    // Add a small delay before showing dashboard content for a smoother transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      <LoadingScreen onLoadComplete={handleLoadComplete} />

      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 bg-sleep-50/50">
            <SleepDashboard show={showContent} />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Index;
