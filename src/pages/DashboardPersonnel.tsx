import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, FileText, Clock, Plus, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardPersonnel = () => {
  const navigate = useNavigate();

  const recentIncidents = [
    {
      id: "INC-2025-001",
      type: "Phishing",
      status: "Under Review",
      severity: "High",
      date: "2025-01-15",
    },
    {
      id: "INC-2025-002",
      type: "Malware",
      status: "Resolved",
      severity: "Critical",
      date: "2025-01-10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold">DEFENCE CYBER PORTAL</h1>
              <p className="text-xs text-muted-foreground">Personnel Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Action */}
        <div className="mb-8">
          <Card className="bg-gradient-primary p-6 border-none shadow-glow-primary">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Report Cyber Incident</h2>
                <p className="text-sm opacity-90">
                  Instant AI-powered threat analysis & immediate security response
                </p>
              </div>
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90"
                onClick={() => navigate("/report")}
              >
                <Plus className="w-5 h-5 mr-2" />
                New Report
              </Button>
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Reports</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Critical Alerts</p>
                <p className="text-3xl font-bold">1</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </Card>
        </div>

        {/* Recent Incidents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Incident Reports</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {recentIncidents.map((incident) => (
              <Card key={incident.id} className="p-4 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-sm font-mono text-primary">{incident.id}</code>
                      <Badge variant={incident.severity === "Critical" ? "destructive" : "default"}>
                        {incident.severity}
                      </Badge>
                      <Badge variant="outline">{incident.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Status: {incident.status}</span>
                      <span>•</span>
                      <span>{incident.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <Card className="mt-8 p-6 bg-muted/50 border-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security Awareness
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Never share OTP or credentials with anyone, including superiors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Verify sender identity before clicking links or downloading attachments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Report suspicious activity immediately through this portal</span>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPersonnel;
