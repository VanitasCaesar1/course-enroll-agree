import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { adminService } from "@/utils/supabase";

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onBack?: () => void;
}

const AdminLogin = ({ onLogin, onBack }: AdminLoginProps) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await adminService.authenticate(
        credentials.username,
        credentials.password
      );

      if (result.success) {
        toast({
          title: "ACCESS GRANTED",
          description: "Admin authentication successful.",
        });
        onLogin(true);
      } else {
        toast({
          title: "ACCESS DENIED",
          description: "Invalid credentials. Try again.",
          variant: "destructive",
        });
        onLogin(false);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "AUTHENTICATION ERROR",
        description: "Unable to verify credentials. Try again.",
        variant: "destructive",
      });
      onLogin(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen brutal-grid bg-background flex items-center justify-center">
      {/* Back Button */}
      {onBack && (
        <div className="fixed top-6 left-6">
          <Button
            onClick={onBack}
            className="brutal-box-hover h-12 px-6 brutal-text font-bold uppercase bg-card hover:bg-card text-foreground border-2 border-foreground"
          >
            ← BACK TO TERMS
          </Button>
        </div>
      )}

      <div className="brutal-box p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
            ADMIN ACCESS
          </h1>
          <div className="h-1 w-16 bg-brutal-warning mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="brutal-text font-bold block mb-2">USERNAME</label>
            <Input
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="brutal-input h-12"
              placeholder="Enter admin username"
              required
            />
          </div>

          <div>
            <label className="brutal-text font-bold block mb-2">PASSWORD</label>
            <Input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="brutal-input h-12"
              placeholder="Enter admin password"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full brutal-box-hover h-14 brutal-text font-black text-lg uppercase bg-foreground hover:bg-foreground text-background"
          >
            {isLoading ? "AUTHENTICATING..." : "ACCESS SYSTEM"}
          </Button>
        </form>

        <div className="mt-6 p-4 border-2 border-brutal-warning bg-brutal-warning/10">
          <p className="brutal-text text-xs text-center">
            AUTHORIZED PERSONNEL ONLY
            <br />
            <span className="text-brutal-warning font-bold">
              Please contact Admin for any issues.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
