import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  UserPlus,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Loader2,
  RefreshCw,
  SortAsc,
  SortDesc,
  Calendar,
  MapPin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalystIncident {
  id: string;
  type: string;
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Pending" | "Under Review" | "Resolved" | "Investigating";
  assignedTo: string;
  unit: string;
  timestamp: string;
  date: string;
  aiScore: number;
  submittedBy: string;
  description: string;
  evidence: { name: string; type: string; url?: string }[];
  notes?: string;
  priority: number;
}

interface FilterState {
  search: string;
  severity: string;
  status: string;
  assignedTo: string;
  unit: string;
  dateRange: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const DashboardAnalyst = () => {
  const { toast } = useToast();
  const [incidents, setIncidents] = useState<AnalystIncident[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<AnalystIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<AnalystIncident | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [investigateDialogOpen, setInvestigateDialogOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [assignmentData, setAssignmentData] = useState({ analyst: "", priority: "Medium", notes: "" });
  const [investigationNotes, setInvestigationNotes] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    severity: "all",
    status: "all",
    assignedTo: "all",
    unit: "all",
    dateRange: "all",
    sortBy: "priority",
    sortOrder: "desc"
  });

  const analysts = [
    "CERT-A-001 (Senior Analyst)",
    "CERT-A-002 (Malware Specialist)", 
    "CERT-A-003 (Network Security)",
    "CERT-A-004 (Forensics Expert)",
    "CERT-A-005 (Threat Intelligence)"
  ];

  const units = [
    "Northern Command", "Southern Command", "Eastern Command", "Western Command",
    "12 Corps", "14 Corps", "15 Corps", "16 Corps",
    "Army HQ", "Navy HQ", "Air Force HQ"
  ];

  // Mock incident data
  const mockIncidents: AnalystIncident[] = [
    {
      id: "INC-2024-001",
      type: "Phishing Campaign",
      category: "Phishing",
      severity: "Critical",
      status: "Pending",
      assignedTo: "Unassigned",
      unit: "12 Corps",
      timestamp: "15:30 IST",
      date: "2024-01-15",
      aiScore: 98,
      submittedBy: "Maj. ****",
      description: "Suspicious email received claiming to be from Defence Portal with login request.",
      evidence: [
        { name: "email_screenshot.png", type: "image" },
        { name: "email_headers.txt", type: "text" }
      ],
      priority: 1
    },
    {
      id: "INC-2024-002",
      type: "Malware Detected",
      category: "Malware / Ransomware",
      severity: "Critical",
      status: "Resolved",
      assignedTo: "CERT-A-002",
      unit: "Northern Command",
      timestamp: "09:15 IST",
      date: "2024-01-14",
      aiScore: 98,
      submittedBy: "Lt. ****",
      description: "Detected ransomware attempt via USB device.",
      evidence: [
        { name: "malware_sample.bin", type: "file" },
        { name: "system_logs.txt", type: "text" }
      ],
      notes: "Incident contained successfully. No data loss detected.",
      priority: 1
    },
    {
      id: "INC-2024-003",
      type: "Honeytrap Attempt",
      category: "Honeytrap / Social Engineering",
      severity: "High",
      status: "Under Review",
      assignedTo: "CERT-A-001",
      unit: "Eastern Command",
      timestamp: "12:45 IST",
      date: "2024-01-13",
      aiScore: 95,
      submittedBy: "Col. ****",
      description: "Suspected social engineering attempt targeting senior officers.",
      evidence: [
        { name: "conversation_log.txt", type: "text" },
        { name: "profile_analysis.pdf", type: "application/pdf" }
      ],
      priority: 2
    },
    {
      id: "INC-2024-004",
      type: "OPSEC Breach",
      category: "OPSEC Risk",
      severity: "Medium",
      status: "Investigating",
      assignedTo: "CERT-A-003",
      unit: "Southern Command",
      timestamp: "11:20 IST",
      date: "2024-01-12",
      aiScore: 72,
      submittedBy: "Cpt. ****",
      description: "Potential information leak on social media platform.",
      evidence: [
        { name: "social_media_post.png", type: "image" }
      ],
      priority: 3
    },
    {
      id: "INC-2024-005",
      type: "Unauthorized Access",
      category: "Unauthorized Access",
      severity: "High",
      status: "Pending",
      assignedTo: "Unassigned",
      unit: "Western Command",
      timestamp: "22:30 IST",
      date: "2024-01-11",
      aiScore: 89,
      submittedBy: "Sgt. ****",
      description: "Multiple failed login attempts detected on secure system.",
      evidence: [
        { name: "login_logs.txt", type: "text" },
        { name: "network_traffic.pcap", type: "file" }
      ],
      priority: 2
    }
  ];

  // Fetch incidents
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/analyst/incidents');
        if (response.ok) {
          const data = await response.json();
          setIncidents(data.incidents);
        } else {
          // Fallback to mock data
          setIncidents(mockIncidents);
        }
      } catch (error) {
        // Fallback to mock data
        setIncidents(mockIncidents);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...incidents];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(incident => 
        incident.id.toLowerCase().includes(searchLower) ||
        incident.type.toLowerCase().includes(searchLower) ||
        incident.unit.toLowerCase().includes(searchLower) ||
        incident.submittedBy.toLowerCase().includes(searchLower)
      );
    }

    // Severity filter
    if (filters.severity !== "all") {
      filtered = filtered.filter(incident => incident.severity === filters.severity);
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter(incident => incident.status === filters.status);
    }

    // Assignment filter
    if (filters.assignedTo !== "all") {
      if (filters.assignedTo === "unassigned") {
        filtered = filtered.filter(incident => incident.assignedTo === "Unassigned");
      } else {
        filtered = filtered.filter(incident => incident.assignedTo.includes(filters.assignedTo));
      }
    }

    // Unit filter
    if (filters.unit !== "all") {
      filtered = filtered.filter(incident => incident.unit === filters.unit);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case "priority":
          aValue = a.priority;
          bValue = b.priority;
          break;
        case "aiScore":
          aValue = a.aiScore;
          bValue = b.aiScore;
          break;
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "severity":
          const severityOrder = { "Critical": 4, "High": 3, "Medium": 2, "Low": 1 };
          aValue = severityOrder[a.severity];
          bValue = severityOrder[b.severity];
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (filters.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredIncidents(filtered);
  }, [incidents, filters]);

  const handleAssign = async () => {
    if (!selectedIncident || !assignmentData.analyst) {
      toast({
        variant: "destructive",
        title: "Assignment Failed",
        description: "Please select an analyst"
      });
      return;
    }

    try {
      const response = await fetch(`/api/incidents/${selectedIncident.id}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analyst: assignmentData.analyst,
          notes: assignmentData.notes
        })
      });

      if (response.ok) {
        // Update local state
        setIncidents(prev => prev.map(incident => 
          incident.id === selectedIncident.id 
            ? { 
                ...incident, 
                assignedTo: assignmentData.analyst,
                status: "Under Review" as const,
                notes: assignmentData.notes || incident.notes
              }
            : incident
        ));

        toast({
          title: "Incident Assigned",
          description: `${selectedIncident.id} assigned to ${assignmentData.analyst}`
        });
      } else {
        throw new Error('Assignment failed');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Assignment Failed",
        description: "Failed to assign incident. Please try again."
      });
    }

    setAssignDialogOpen(false);
    setAssignmentData({ analyst: "", priority: "Medium", notes: "" });
  };

  const handleInvestigate = async () => {
    if (!selectedIncident) return;

    try {
      const response = await fetch(`/api/incidents/${selectedIncident.id}/investigate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: investigationNotes
        })
      });

      if (response.ok) {
        // Update local state
        setIncidents(prev => prev.map(incident => 
          incident.id === selectedIncident.id 
            ? { 
                ...incident, 
                status: "Investigating" as const,
                notes: investigationNotes ? 
                  (incident.notes ? `${incident.notes}\n\n${investigationNotes}` : investigationNotes) 
                  : incident.notes
              }
            : incident
        ));

        toast({
          title: "Investigation Started",
          description: `Investigation initiated for ${selectedIncident.id}`
        });
      } else {
        throw new Error('Investigation start failed');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Investigation Failed",
        description: "Failed to start investigation. Please try again."
      });
    }

    setInvestigateDialogOpen(false);
    setInvestigationNotes("");
  };

  const refreshIncidents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analyst/incidents');
      if (response.ok) {
        const data = await response.json();
        setIncidents(data.incidents);
        toast({
          title: "Data Refreshed",
          description: "Incident queue updated"
        });
      } else {
        throw new Error('Refresh failed');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Refresh Failed",
        description: "Failed to refresh data. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved": return <CheckCircle className="w-4 h-4 text-success" />;
      case "Under Review": return <Clock className="w-4 h-4 text-warning" />;
      case "Investigating": return <Eye className="w-4 h-4 text-info" />;
      case "Pending": return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive";
      case "High": return "default";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const stats = {
    critical: incidents.filter(i => i.severity === "Critical").length,
    high: incidents.filter(i => i.severity === "High").length,
    today: incidents.filter(i => i.date === "2024-01-15").length,
    activeUsers: 1247
  };

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
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-4 bg-gradient-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="w-4 h-4 rounded" />
                </div>
                <Skeleton className="h-8 w-8 mb-1" />
                <Skeleton className="h-3 w-24" />
              </Card>
            ))
          ) : (
            <>
              <Card className="p-4 bg-gradient-card border-destructive/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Critical</p>
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                </div>
                <p className="text-3xl font-bold text-destructive">{stats.critical}</p>
                <p className="text-xs text-muted-foreground mt-1">Requires immediate action</p>
              </Card>

              <Card className="p-4 bg-gradient-card border-warning/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">High</p>
                  <TrendingUp className="w-4 h-4 text-warning" />
                </div>
                <p className="text-3xl font-bold text-warning">{stats.high}</p>
                <p className="text-xs text-muted-foreground mt-1">Active investigations</p>
              </Card>

              <Card className="p-4 bg-gradient-card border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Today</p>
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <p className="text-3xl font-bold text-primary">{stats.today}</p>
                <p className="text-xs text-muted-foreground mt-1">Incidents reported</p>
              </Card>

              <Card className="p-4 bg-gradient-card border-accent/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Active Users</p>
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <p className="text-3xl font-bold text-accent">{stats.activeUsers}</p>
                <p className="text-xs text-muted-foreground mt-1">Defence personnel online</p>
              </Card>
            </>
          )}
        </div>

        {/* Filters & Search */}
        <Card className="p-4 mb-6 bg-card border-border">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents, IDs, units, personnel..."
                className="pl-10 bg-input"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                    {Object.values(filters).some(v => v !== "all" && v !== "" && v !== "desc" && v !== "priority") && (
                      <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">!</Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Filters</h4>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setFilters({
                          search: "",
                          severity: "all",
                          status: "all",
                          assignedTo: "all",
                          unit: "all",
                          dateRange: "all",
                          sortBy: "priority",
                          sortOrder: "desc"
                        })}
                      >
                        Clear All
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Severity</label>
                        <Select value={filters.severity} onValueChange={(value) => setFilters(prev => ({ ...prev, severity: value }))}>
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Severities</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Status</label>
                        <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Under Review">Under Review</SelectItem>
                            <SelectItem value="Investigating">Investigating</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Assignment</label>
                        <Select value={filters.assignedTo} onValueChange={(value) => setFilters(prev => ({ ...prev, assignedTo: value }))}>
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Assignments</SelectItem>
                            <SelectItem value="unassigned">Unassigned</SelectItem>
                            <SelectItem value="CERT-A-001">CERT-A-001</SelectItem>
                            <SelectItem value="CERT-A-002">CERT-A-002</SelectItem>
                            <SelectItem value="CERT-A-003">CERT-A-003</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Unit</label>
                        <Select value={filters.unit} onValueChange={(value) => setFilters(prev => ({ ...prev, unit: value }))}>
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Units</SelectItem>
                            {units.map(unit => (
                              <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Sort By</label>
                      <div className="flex gap-2">
                        <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                          <SelectTrigger className="flex-1 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="severity">Severity</SelectItem>
                            <SelectItem value="aiScore">AI Score</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFilters(prev => ({ 
                            ...prev, 
                            sortOrder: prev.sortOrder === "asc" ? "desc" : "asc" 
                          }))}
                        >
                          {filters.sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button variant="outline" size="sm" onClick={refreshIncidents} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {Object.entries(filters).some(([key, value]) => 
            key !== "search" && key !== "sortBy" && key !== "sortOrder" && value !== "all" && value !== ""
          ) && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Active filters:</span>
              {Object.entries(filters).map(([key, value]) => {
                if (key === "search" || key === "sortBy" || key === "sortOrder" || value === "all" || value === "") return null;
                return (
                  <Badge key={key} variant="secondary" className="text-xs">
                    {key}: {value}
                    <button 
                      className="ml-1 hover:text-destructive"
                      onClick={() => setFilters(prev => ({ ...prev, [key]: "all" }))}
                    >
                      ×
                    </button>
                  </Badge>
                );
              })}
            </div>
          )}
        </Card>

        {/* Incident Queue */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Priority Incident Queue</h2>
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `${filteredIncidents.length} of ${incidents.length} incidents`}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-4 bg-card border-l-4 border-l-muted">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j}>
                          <Skeleton className="h-3 w-12 mb-1" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </Card>
            ))
          ) : filteredIncidents.length === 0 ? (
            <Card className="p-8 bg-muted/50 border-border text-center">
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No incidents match your current filters</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => setFilters({
                  search: "",
                  severity: "all",
                  status: "all",
                  assignedTo: "all",
                  unit: "all",
                  dateRange: "all",
                  sortBy: "priority",
                  sortOrder: "desc"
                })}
              >
                Clear Filters
              </Button>
            </Card>
          ) : (
            filteredIncidents.map((incident) => (
              <Card
                key={incident.id}
                className={`p-4 bg-card border-l-4 hover:shadow-tactical transition-all cursor-pointer ${
                  incident.severity === "Critical"
                    ? "border-l-destructive"
                    : incident.severity === "High"
                    ? "border-l-warning"
                    : incident.severity === "Medium"
                    ? "border-l-primary"
                    : "border-l-muted"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-sm font-mono text-primary font-bold">
                        {incident.id}
                      </code>
                      <Badge variant={getSeverityColor(incident.severity) as any}>
                        {incident.severity}
                      </Badge>
                      <Badge variant="outline">{incident.category}</Badge>
                      {getStatusIcon(incident.status)}
                      <span className="text-xs text-muted-foreground">{incident.status}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Unit
                        </p>
                        <p className="font-medium">{incident.unit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <User className="w-3 h-3" /> Assigned To
                        </p>
                        <p className={`font-medium ${
                          incident.assignedTo === "Unassigned" ? "text-warning" : "text-foreground"
                        }`}>
                          {incident.assignedTo}
                        </p>
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
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Date
                        </p>
                        <p className="font-medium">{incident.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Evidence</p>
                        <p className="font-medium">{incident.evidence.length} files</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground truncate">
                      <strong>Submitted by:</strong> {incident.submittedBy} • {incident.description}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedIncident(incident);
                        setAssignDialogOpen(true);
                      }}
                      disabled={incident.assignedTo !== "Unassigned"}
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      {incident.assignedTo === "Unassigned" ? "Assign" : "Assigned"}
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-gradient-primary"
                      onClick={() => {
                        setSelectedIncident(incident);
                        setInvestigateDialogOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Investigate
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Assignment Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Incident</DialogTitle>
            <DialogDescription>
              Assign {selectedIncident?.id} to a CERT analyst for investigation
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Analyst</label>
              <Select 
                value={assignmentData.analyst} 
                onValueChange={(value) => setAssignmentData(prev => ({ ...prev, analyst: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an analyst" />
                </SelectTrigger>
                <SelectContent>
                  {analysts.map(analyst => (
                    <SelectItem key={analyst} value={analyst}>{analyst}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Priority Level</label>
              <Select 
                value={assignmentData.priority} 
                onValueChange={(value) => setAssignmentData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Critical">Critical - Immediate Action</SelectItem>
                  <SelectItem value="High">High - Within 2 hours</SelectItem>
                  <SelectItem value="Medium">Medium - Within 8 hours</SelectItem>
                  <SelectItem value="Low">Low - Within 24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Assignment Notes</label>
              <Textarea 
                placeholder="Add any specific instructions or context for the analyst..."
                value={assignmentData.notes}
                onChange={(e) => setAssignmentData(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!assignmentData.analyst}>
              Assign Incident
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Investigation Dialog */}
      <Dialog open={investigateDialogOpen} onOpenChange={setInvestigateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Investigate Incident - {selectedIncident?.id}</DialogTitle>
            <DialogDescription>
              Review incident details and start investigation process
            </DialogDescription>
          </DialogHeader>
          
          {selectedIncident && (
            <div className="space-y-4">
              {/* Incident Summary */}
              <Card className="p-4 bg-muted/50">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Incident Type</p>
                    <p className="font-medium">{selectedIncident.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Severity</p>
                    <Badge variant={getSeverityColor(selectedIncident.severity) as any}>
                      {selectedIncident.severity}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Submitted By</p>
                    <p className="font-medium">{selectedIncident.submittedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Unit</p>
                    <p className="font-medium">{selectedIncident.unit}</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm">{selectedIncident.description}</p>
                </div>
              </Card>
              
              {/* Evidence */}
              <div>
                <h4 className="font-medium mb-2">Evidence Files ({selectedIncident.evidence.length})</h4>
                <div className="space-y-2">
                  {selectedIncident.evidence.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-muted rounded border">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm flex-1">{file.name}</span>
                      <Badge variant="outline" className="text-xs">{file.type}</Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Investigation Notes */}
              <div>
                <label className="text-sm font-medium mb-2 block">Investigation Notes</label>
                <Textarea 
                  placeholder="Document your investigation findings, next steps, and any observations..."
                  value={investigationNotes}
                  onChange={(e) => setInvestigationNotes(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              
              {/* Existing Notes */}
              {selectedIncident.notes && (
                <div>
                  <h4 className="font-medium mb-2">Previous Notes</h4>
                  <Card className="p-3 bg-muted/30">
                    <p className="text-sm text-muted-foreground">{selectedIncident.notes}</p>
                  </Card>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvestigateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvestigate} className="bg-gradient-primary">
              Start Investigation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardAnalyst;
