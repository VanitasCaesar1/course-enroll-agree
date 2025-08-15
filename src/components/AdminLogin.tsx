import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Temporary hardcoded auth - will be replaced with Supabase
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "admin123") {
        toast({
          title: "ACCESS GRANTED",
          description: "Admin authentication successful.",
        });
        onLogin(true);
      } else {
        toast({
          title: "ACCESS DENIED",
          description: "Invalid credentials. Try again.",
          variant: "destructive"
        });
        onLogin(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen brutal-grid bg-background flex items-center justify-center">
      <div className="brutal-box p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
            ADMIN ACCESS
          </h1>
          <div className="h-1 w-16 bg-brutal-warning mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="brutal-text font-bold block mb-2">
              USERNAME
            </label>
            <Input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="brutal-input h-12"
              placeholder="Enter admin username"
              required
            />
          </div>

          <div>
            <label className="brutal-text font-bold block mb-2">
              PASSWORD
            </label>
            <Input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
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
            AUTHORIZED PERSONNEL ONLY<br/>
            <span className="text-brutal-warning font-bold">
              Demo: admin / admin123
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;