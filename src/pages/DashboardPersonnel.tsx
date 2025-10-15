import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  Download,
  Eye,
  Image as ImageIcon,
  Video,
  Mic,
  Link as LinkIcon,
  FileIcon,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Incident {
  id: string;
  category: string;
  status: "Pending" | "Under Review" | "Resolved";
  date: string;
  time: string;
  submittedBy: string;
  risk: "Critical" | "High" | "Medium" | "Low";
  description: string;
  analysisResult?: {
    status: string;
    threatType: string;
    confidence: number;
    indicators: string[];
    recommendation: string;
  };
  evidence: { name: string; type: string; url?: string }[];
  assignedAnalyst?: string;
  notes?: string;
  playbook?: string[];
}

interface DashboardStats {
  totalReports: number;
  pendingReview: number;
  criticalAlerts: number;
  resolvedToday: number;
}

const DashboardPersonnel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch incidents from API
  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/complaints/recent');
      
      if (response.ok) {
        const data = await response.json();
        setIncidents(data.incidents);
        setStats(data.stats);
      } else {
        throw new Error('Failed to fetch incidents');
      }
    } catch (error) {
      // Fallback to mock data for demo
      const mockIncidents: Incident[] = [
        {
          id: "INC-2024-001",
          category: "Phishing",
          status: "Under Review",
          date: "2024-01-15",
          time: "14:30",
          submittedBy: "Maj. ****",
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
            { name: "email_screenshot.png", type: "image", url: "/evidence/email_screenshot.png" },
            { name: "email_headers.txt", type: "text", url: "/evidence/email_headers.txt" },
            { name: "def-portal.xyz", type: "url", url: "https://def-portal.xyz" },
          ],
          assignedAnalyst: "CERT-A-001",
          notes: "High priority - potential APT campaign targeting military personnel",
          playbook: [
            "Immediately block suspicious domain def-portal[.]xyz",
            "Scan all systems for similar phishing indicators",
            "Alert all personnel about this phishing campaign",
            "Monitor network traffic for C2 communications",
            "Update email security filters"
          ]
        },
        {
          id: "INC-2024-002",
          category: "Malware / Ransomware",
          status: "Resolved",
          date: "2024-01-14",
          time: "09:15",
          submittedBy: "Lt. ****",
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
            { name: "malware_sample.bin", type: "file", url: "/evidence/malware_sample.bin" },
            { name: "system_logs.txt", type: "text", url: "/evidence/system_logs.txt" },
            { name: "usb_forensics.pdf", type: "application/pdf", url: "/evidence/usb_forensics.pdf" },
          ],
          assignedAnalyst: "CERT-A-002",
          notes: "Incident contained successfully. No data loss detected.",
          playbook: [
            "Isolate affected system immediately",
            "Run full system scan and cleanup",
            "Update antivirus signatures",
            "Implement USB device restrictions",
            "Conduct security awareness training"
          ]
        },
        {
          id: "INC-2024-003",
          category: "OPSEC Risk",
          status: "Pending",
          date: "2024-01-13",
          time: "16:45",
          submittedBy: "Cpt. ****",
          risk: "Medium",
          description: "Potential information leak on social media platform. Personnel may have disclosed sensitive operational details.",
          evidence: [
            { name: "social_media_post.png", type: "image", url: "/evidence/social_media_post.png" },
          ],
          playbook: [
            "Review social media post for sensitive information",
            "Contact personnel for clarification",
            "Assess operational security impact",
            "Implement additional OPSEC training if needed"
          ]
        },
        {
          id: "INC-2024-004",
          category: "Unauthorized Access",
          status: "Under Review",
          date: "2024-01-12",
          time: "22:30",
          submittedBy: "Sgt. ****",
          risk: "High",
          description: "Multiple failed login attempts detected on secure system. Potential brute force attack.",
          evidence: [
            { name: "login_logs.txt", type: "text", url: "/evidence/login_logs.txt" },
            { name: "network_traffic.pcap", type: "file", url: "/evidence/network_traffic.pcap" },
          ],
          assignedAnalyst: "CERT-A-003",
          playbook: [
            "Analyze login attempt patterns",
            "Check for compromised credentials",
            "Implement account lockout policies",
            "Monitor for lateral movement"
          ]
        }
      ];
      
      const mockStats: DashboardStats = {
        totalReports: 47,
        pendingReview: 8,
        criticalAlerts: 2,
        resolvedToday: 5
      };
      
      setIncidents(mockIncidents);
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/') || type === 'image') return <ImageIcon className="w-4 h-4" />;
    if (type.startsWith('video/') || type === 'video') return <Video className="w-4 h-4" />;
    if (type.startsWith('audio/') || type === 'audio') return <Mic className="w-4 h-4" />;
    if (type === 'url') return <LinkIcon className="w-4 h-4" />;
    if (type.includes('pdf') || type === 'application/pdf') return <FileIcon className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'destructive';
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'Under Review': return <Clock className="w-5 h-5 text-warning" />;
      case 'Pending': return <AlertTriangle className="w-5 h-5 text-muted-foreground" />;
      default: return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-6 bg-gradient-card border-border">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                  <Skeleton className="w-8 h-8 rounded" />
                </div>
              </Card>
            ))
          ) : (
            <>
              <Card className="p-6 bg-gradient-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Reports</p>
                    <p className="text-3xl font-bold">{stats?.totalReports || 0}</p>
                  </div>
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
                    <p className="text-3xl font-bold">{stats?.pendingReview || 0}</p>
                  </div>
                  <Clock className="w-8 h-8 text-warning" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Critical Alerts</p>
                    <p className="text-3xl font-bold">{stats?.criticalAlerts || 0}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Resolved Today</p>
                    <p className="text-3xl font-bold">{stats?.resolvedToday || 0}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </Card>
            </>
          )}
        </div>

        {/* Recent Incidents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Incident Reports</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={fetchIncidents} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
              </Button>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-4 bg-card border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                </Card>
              ))
            ) : incidents.length === 0 ? (
              <Card className="p-8 bg-muted/50 border-border text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No incidents reported yet</p>
              </Card>
            ) : (
              incidents.map((incident) => (
                <Card
                  key={incident.id}
                  className="p-4 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedIncident(incident)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="text-sm font-mono text-primary">{incident.id}</code>
                        <Badge variant={getRiskColor(incident.risk) as any}>
                          {incident.risk}
                        </Badge>
                        <Badge variant="outline">{incident.category}</Badge>
                        {getStatusIcon(incident.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Status: {incident.status}</span>
                        <span>•</span>
                        <span>{incident.date} at {incident.time}</span>
                        <span>•</span>
                        <span>By: {incident.submittedBy}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIncident(incident);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </Card>
              ))
            )}
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
              {/* Status & Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedIncident.status)}
                    <span className="text-sm font-medium">Status: {selectedIncident.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedIncident.category}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p><strong>Submitted:</strong> {selectedIncident.date} at {selectedIncident.time}</p>
                    <p><strong>By:</strong> {selectedIncident.submittedBy}</p>
                    {selectedIncident.assignedAnalyst && (
                      <p><strong>Assigned Analyst:</strong> {selectedIncident.assignedAnalyst}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Badge variant={getRiskColor(selectedIncident.risk) as any} className="text-lg px-4 py-2">
                    {selectedIncident.risk} Risk
                  </Badge>
                </div>
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
                <h3 className="font-semibold mb-2">Uploaded Evidence ({selectedIncident.evidence.length})</h3>
                <div className="space-y-2">
                  {selectedIncident.evidence.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border"
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-background rounded border">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{file.type}</p>
                      </div>
                      <div className="flex gap-2">
                        {file.url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (file.type === 'url') {
                                window.open(file.url, '_blank');
                              } else {
                                // Simulate file download
                                toast({
                                  title: "Download Started",
                                  description: `Downloading ${file.name}`,
                                });
                              }
                            }}
                          >
                            {file.type === 'url' ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                          </Button>
                        )}
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

              {/* Playbook / Mitigation Steps */}
              {selectedIncident.playbook && selectedIncident.playbook.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Recommended Mitigation Steps
                  </h3>
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <ul className="space-y-2">
                      {selectedIncident.playbook.map((step, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-primary font-bold mt-1">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              )}

              {/* Notes */}
              {selectedIncident.notes && (
                <div>
                  <h3 className="font-semibold mb-2">Analyst Notes</h3>
                  <Card className="p-3 bg-muted/50">
                    <p className="text-sm text-muted-foreground">{selectedIncident.notes}</p>
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
