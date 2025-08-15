import { useState } from "react";
import TermsAcceptance from "@/components/TermsAcceptance";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [currentView, setCurrentView] = useState<"terms" | "admin-login" | "admin-dashboard">("terms");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdminAuthenticated(true);
      setCurrentView("admin-dashboard");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView("terms");
  };

  if (currentView === "admin-login") {
    return <AdminLogin onLogin={handleAdminLogin} onBack={() => setCurrentView("terms")} />;
  }

  if (currentView === "admin-dashboard" && isAdminAuthenticated) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  return (
    <div className="relative">
      <TermsAcceptance />
      
      {/* Admin Access Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setCurrentView("admin-login")}
          className="brutal-box-hover h-12 px-4 brutal-text font-bold uppercase bg-card hover:bg-card text-foreground border-2 border-foreground"
        >
          ADMIN
        </Button>
      </div>
    </div>
  );
};

export default Index;
