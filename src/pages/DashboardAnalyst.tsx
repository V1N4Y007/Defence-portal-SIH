import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Users,
  Activity,
  Bell,
  User,
} from "lucide-react";

const DashboardAnalyst = () => {
  const incidents = [
    {
      id: "INC-2025-045",
      type: "Phishing Campaign",
      severity: "Critical",
      assignedTo: "Unassigned",
      unit: "12 Corps",
      timestamp: "15:30 IST",
      aiScore: 98,
    },
    {
      id: "INC-2025-044",
      type: "Malware Detected",
      severity: "High",
      assignedTo: "Analyst-3",
      unit: "Northern Command",
      timestamp: "14:15 IST",
      aiScore: 87,
    },
    {
      id: "INC-2025-043",
      type: "Honeytrap Attempt",
      severity: "Critical",
      assignedTo: "Analyst-1",
      unit: "Eastern Command",
      timestamp: "12:45 IST",
      aiScore: 95,
    },
    {
      id: "INC-2025-042",
      type: "OPSEC Breach",
      severity: "Medium",
      assignedTo: "Analyst-2",
      unit: "Southern Command",
      timestamp: "11:20 IST",
      aiScore: 72,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center animate-pulse-glow">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold">CERT-ARMY COMMAND CENTER</h1>
              <p className="text-xs text-muted-foreground">Cyber Threat Analysis Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-xs text-success font-medium">SYSTEMS OPERATIONAL</span>
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-card border-destructive/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Critical</p>
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <p className="text-3xl font-bold text-destructive">8</p>
            <p className="text-xs text-muted-foreground mt-1">Requires immediate action</p>
          </Card>

          <Card className="p-4 bg-gradient-card border-warning/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">High</p>
              <TrendingUp className="w-4 h-4 text-warning" />
            </div>
            <p className="text-3xl font-bold text-warning">24</p>
            <p className="text-xs text-muted-foreground mt-1">Active investigations</p>
          </Card>

          <Card className="p-4 bg-gradient-card border-primary/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Today</p>
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">156</p>
            <p className="text-xs text-muted-foreground mt-1">Incidents reported</p>
          </Card>

          <Card className="p-4 bg-gradient-card border-accent/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Active Users</p>
              <Users className="w-4 h-4 text-accent" />
            </div>
            <p className="text-3xl font-bold text-accent">1,247</p>
            <p className="text-xs text-muted-foreground mt-1">Defence personnel online</p>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="p-4 mb-6 bg-card border-border">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents, IDs, units..."
                className="pl-10 bg-input"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Incident Queue */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3">Priority Incident Queue</h2>
        </div>

        <div className="space-y-3">
          {incidents.map((incident) => (
            <Card
              key={incident.id}
              className={`p-4 bg-card border-l-4 hover:shadow-tactical transition-all cursor-pointer ${
                incident.severity === "Critical"
                  ? "border-l-destructive"
                  : incident.severity === "High"
                  ? "border-l-warning"
                  : "border-l-primary"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <code className="text-sm font-mono text-primary font-bold">
                      {incident.id}
                    </code>
                    <Badge
                      variant={
                        incident.severity === "Critical"
                          ? "destructive"
                          : incident.severity === "High"
                          ? "default"
                          : "outline"
                      }
                    >
                      {incident.severity}
                    </Badge>
                    <Badge variant="outline">{incident.type}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Unit</p>
                      <p className="font-medium">{incident.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Assigned To</p>
                      <p className="font-medium">{incident.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">AI Confidence</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              incident.aiScore >= 90
                                ? "bg-destructive"
                                : incident.aiScore >= 75
                                ? "bg-warning"
                                : "bg-primary"
                            }`}
                            style={{ width: `${incident.aiScore}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-mono">{incident.aiScore}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                      <p className="font-medium">{incident.timestamp}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Assign
                  </Button>
                  <Button size="sm" className="bg-gradient-primary">
                    Investigate
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardAnalyst;
