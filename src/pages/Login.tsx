import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, User } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [serviceNumber, setServiceNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtp) {
      setShowOtp(true);
    } else {
      // Simulate role-based login
      const role = serviceNumber.includes("CERT") ? "analyst" : "personnel";
      navigate(`/dashboard/${role}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-card border border-border rounded-lg shadow-tactical p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 animate-pulse-glow">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              DEFENCE CYBER PORTAL
            </h1>
            <p className="text-sm text-muted-foreground">
              Secure Authentication System
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="service-number" className="text-sm font-medium">
                Service Number / Defence ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="service-number"
                  type="text"
                  placeholder="Enter service number"
                  value={serviceNumber}
                  onChange={(e) => setServiceNumber(e.target.value)}
                  className="pl-10 bg-input border-border"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Secure Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-input border-border"
                  required
                />
              </div>
            </div>

            {showOtp && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="otp" className="text-sm font-medium">
                  Two-Factor Authentication (OTP)
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="bg-input border-border text-center text-lg tracking-widest"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  OTP sent to your registered device
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {showOtp ? "Verify & Login" : "Continue to MFA"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              Classified System • Authorized Access Only
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-xs text-success">Secure Connection Active</span>
            </div>
          </div>
        </div>

        {/* Quick role selection for demo */}
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-center text-muted-foreground mb-2">Demo Access:</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => navigate("/dashboard/personnel")}
            >
              Personnel View
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => navigate("/dashboard/analyst")}
            >
              Analyst View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
