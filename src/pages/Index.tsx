import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Zap, Eye, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Instant AI Analysis",
      description: "Real-time threat detection using advanced AI models",
    },
    {
      icon: Eye,
      title: "24/7 Monitoring",
      description: "Continuous surveillance of cyber threats across all commands",
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Secure dashboards for personnel, analysts, and administrators",
    },
    {
      icon: TrendingUp,
      title: "Threat Intelligence",
      description: "Pattern recognition and campaign detection capabilities",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Classified Defence System</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              AI-Driven Defence
              <br />
              <span className="text-primary">Cyber Incident Portal</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Advanced cybersecurity platform for Indian Defence Forces. Real-time threat analysis,
              instant AI-powered detection, and automated incident response.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
              <Button
                size="lg"
                className="bg-gradient-primary shadow-glow-primary hover:opacity-90"
                onClick={() => navigate("/login")}
              >
                <Lock className="w-5 h-5 mr-2" />
                Secure Login
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>

            {/* Security Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-lg shadow-tactical">
              <Shield className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-sm font-semibold">Military-Grade Security</p>
                <p className="text-xs text-muted-foreground">End-to-end encrypted • MFA enabled</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Core Capabilities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for defence personnel, veterans, and CERT-Army analysts to combat cyber
            threats effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all hover:shadow-tactical"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">98%</p>
              <p className="text-muted-foreground">Threat Detection Accuracy</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">&lt;2s</p>
              <p className="text-muted-foreground">Average Analysis Time</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">24/7</p>
              <p className="text-muted-foreground">Continuous Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold">Defence Cyber Portal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Classified System • Authorized Personnel Only • SIH 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
