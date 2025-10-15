import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Bell,
  User,
  Plus,
  XCircle,
} from "lucide-react";

interface Incident {
  id: string;
  category: string;
  status: "Pending" | "Under Review" | "Resolved";
  date: string;
  risk: "Critical" | "High" | "Medium" | "Low";
  description: string;
  analysisResult?: {
    status: string;
    threatType: string;
    confidence: number;
    indicators: string[];
    recommendation: string;
  };
  evidence: { name: string; type: string }[];
}

const DashboardPersonnel = () => {
  const navigate = useNavigate();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const recentIncidents: Incident[] = [
    {
      id: "INC-2024-001",
      category: "Phishing",
      status: "Under Review",
      date: "2024-01-15",
      risk: "High",
      description: "Suspicious email received claiming to be from Defence Portal with login request. Email contained link to def-portal[.]xyz domain.",
      analysisResult: {
        status: "MALICIOUS",
        threatType: "Advanced Phishing Campaign",
        confidence: 96,
        indicators: [
          "Suspicious domain detected: def-portal[.]xyz",
          "Email header manipulation detected",
          "Link mismatch: Display URL ≠ Actual URL",
          "Similar pattern to known APT campaign",
        ],
        recommendation: "CRITICAL",
      },
      evidence: [
        { name: "email_screenshot.png", type: "image" },
        { name: "email_headers.txt", type: "text" },
      ],
    },
    {
      id: "INC-2024-002",
      category: "Malware",
      status: "Resolved",
      date: "2024-01-14",
      risk: "Critical",
      description: "Detected ransomware attempt via USB device. System scan identified encrypted payload.",
      analysisResult: {
        status: "MALICIOUS",
        threatType: "Ransomware - LockBit Variant",
        confidence: 98,
        indicators: [
          "Known ransomware signature detected",
          "Encryption routine identified",
          "Command & control communication attempt",
          "File system manipulation detected",
        ],
        recommendation: "CRITICAL",
      },
      evidence: [
        { name: "malware_sample.bin", type: "file" },
        { name: "system_logs.txt", type: "text" },
      ],
    },
    {
      id: "INC-2024-003",
      category: "OPSEC Risk",
      status: "Pending",
      date: "2024-01-13",
      risk: "Medium",
      description: "Potential information leak on social media platform. Personnel may have disclosed sensitive operational details.",
      evidence: [
        { name: "social_media_post.png", type: "image" },
      ],
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
              <Card
                key={incident.id}
                className="p-4 bg-card border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-sm font-mono text-primary">{incident.id}</code>
                      <Badge
                        variant={
                          incident.risk === "Critical" || incident.risk === "High"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {incident.risk}
                      </Badge>
                      <Badge variant="outline">{incident.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Status: {incident.status}</span>
                      <span>•</span>
                      <span>{incident.date}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIncident(incident)}
                  >
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

      {/* Incident Detail Dialog */}
      <Dialog open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Incident Details - {selectedIncident?.id}</span>
              <Badge
                variant={
                  selectedIncident?.risk === "Critical" || selectedIncident?.risk === "High"
                    ? "destructive"
                    : "default"
                }
              >
                {selectedIncident?.risk} Risk
              </Badge>
            </DialogTitle>
            <DialogDescription>Submitted on {selectedIncident?.date}</DialogDescription>
          </DialogHeader>

          {selectedIncident && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {selectedIncident.status === "Resolved" ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : selectedIncident.status === "Under Review" ? (
                    <Clock className="w-5 h-5 text-warning" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium">Status: {selectedIncident.status}</span>
                </div>
                <Badge variant="outline">{selectedIncident.category}</Badge>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Incident Description</h3>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  {selectedIncident.description}
                </p>
              </div>

              {/* Evidence */}
              <div>
                <h3 className="font-semibold mb-2">Uploaded Evidence</h3>
                <div className="space-y-2">
                  {selectedIncident.evidence.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border"
                    >
                      <FileText className="w-8 h-8 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{file.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Analysis Result */}
              {selectedIncident.analysisResult && (
                <div>
                  <h3 className="font-semibold mb-2">AI Analysis Result</h3>
                  <Card
                    className={`p-4 border-2 ${
                      selectedIncident.analysisResult.status === "MALICIOUS"
                        ? "border-destructive bg-destructive/5"
                        : "border-success bg-success/5"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Status */}
                      <div className="flex items-center gap-3">
                        <XCircle className="w-8 h-8 text-destructive" />
                        <div>
                          <p className="text-sm text-muted-foreground">Threat Status</p>
                          <p className="text-xl font-bold text-destructive">
                            {selectedIncident.analysisResult.status}
                          </p>
                        </div>
                      </div>

                      {/* Threat Type */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Identified Threat</p>
                        <Badge variant="destructive">
                          {selectedIncident.analysisResult.threatType}
                        </Badge>
                      </div>

                      {/* Confidence */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-muted-foreground">Confidence Level</p>
                          <span className="text-sm font-bold">
                            {selectedIncident.analysisResult.confidence}%
                          </span>
                        </div>
                        <div className="bg-muted rounded-full h-2">
                          <div
                            className="bg-destructive h-2 rounded-full"
                            style={{ width: `${selectedIncident.analysisResult.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Indicators */}
                      <div>
                        <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          Threat Indicators
                        </p>
                        <ul className="space-y-1.5">
                          {selectedIncident.analysisResult.indicators.map((indicator, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex gap-2">
                              <span className="text-destructive">•</span>
                              <span>{indicator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPersonnel;
