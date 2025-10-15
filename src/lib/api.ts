// Mock API service for demonstration purposes
// In a real application, these would be actual API calls

export interface ApiIncident {
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

export interface ApiStats {
  totalReports: number;
  pendingReview: number;
  criticalAlerts: number;
  resolvedToday: number;
}

// Mock data
const mockIncidents: ApiIncident[] = [
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

const mockStats: ApiStats = {
  totalReports: 47,
  pendingReview: 8,
  criticalAlerts: 2,
  resolvedToday: 5
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Get recent incidents
  async getRecentIncidents(): Promise<{ incidents: ApiIncident[]; stats: ApiStats }> {
    await delay(800); // Simulate network delay
    return {
      incidents: mockIncidents,
      stats: mockStats
    };
  },

  // Submit new incident
  async submitIncident(formData: FormData): Promise<{ success: boolean; incidentId: string }> {
    await delay(2000); // Simulate upload time
    
    // Generate new incident ID
    const incidentId = `INC-2024-${String(mockIncidents.length + 1).padStart(3, '0')}`;
    
    // In a real app, this would process the FormData and save to database
    console.log('Submitting incident:', {
      category: formData.get('category'),
      description: formData.get('description'),
      files: Array.from(formData.entries()).filter(([key]) => key.startsWith('evidence_')),
      urls: Array.from(formData.entries()).filter(([key]) => key.startsWith('url_')),
    });

    return {
      success: true,
      incidentId
    };
  },

  // Get incident by ID
  async getIncidentById(id: string): Promise<ApiIncident | null> {
    await delay(300);
    return mockIncidents.find(incident => incident.id === id) || null;
  },

  // Update incident status (for analysts)
  async updateIncidentStatus(id: string, status: ApiIncident['status']): Promise<boolean> {
    await delay(500);
    const incident = mockIncidents.find(i => i.id === id);
    if (incident) {
      incident.status = status;
      return true;
    }
    return false;
  },

  // Assign incident to analyst
  async assignIncident(id: string, analyst: string, notes?: string): Promise<boolean> {
    await delay(800);
    const incident = mockIncidents.find(i => i.id === id);
    if (incident) {
      incident.assignedAnalyst = analyst;
      incident.status = "Under Review";
      if (notes) {
        incident.notes = notes;
      }
      return true;
    }
    return false;
  },

  // Start investigation
  async startInvestigation(id: string, notes?: string): Promise<boolean> {
    await delay(600);
    const incident = mockIncidents.find(i => i.id === id);
    if (incident) {
      incident.status = "Investigating";
      if (notes) {
        incident.notes = incident.notes ? `${incident.notes}\n\n${notes}` : notes;
      }
      return true;
    }
    return false;
  },

  // Get analyst incidents (for analyst dashboard)
  async getAnalystIncidents(): Promise<{ incidents: ApiIncident[]; stats: any }> {
    await delay(1000);
    
    const analystIncidents = [
      ...mockIncidents,
      {
        id: "INC-2024-005",
        category: "Unauthorized Access",
        status: "Pending" as const,
        date: "2024-01-11",
        time: "22:30",
        submittedBy: "Sgt. ****",
        risk: "High" as const,
        description: "Multiple failed login attempts detected on secure system. Potential brute force attack.",
        evidence: [
          { name: "login_logs.txt", type: "text", url: "/evidence/login_logs.txt" },
          { name: "network_traffic.pcap", type: "file", url: "/evidence/network_traffic.pcap" },
        ],
        playbook: [
          "Analyze login attempt patterns",
          "Check for compromised credentials",
          "Implement account lockout policies",
          "Monitor for lateral movement"
        ]
      }
    ];
    
    const analystStats = {
      critical: analystIncidents.filter(i => i.risk === "Critical").length,
      high: analystIncidents.filter(i => i.risk === "High").length,
      today: analystIncidents.filter(i => i.date === "2024-01-15").length,
      activeUsers: 1247
    };
    
    return {
      incidents: analystIncidents,
      stats: analystStats
    };
  }
};

// Mock fetch interceptor for demo purposes
// This intercepts fetch calls to /api/* and returns mock data
const originalFetch = window.fetch;

window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const url = typeof input === 'string' ? input : input.toString();
  
  // Intercept API calls
  if (url.startsWith('/api/complaints/recent')) {
    const data = await apiService.getRecentIncidents();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (url.startsWith('/api/complaints') && init?.method === 'POST') {
    const data = await apiService.submitIncident(init.body as FormData);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (url.startsWith('/api/analyst/incidents')) {
    const data = await apiService.getAnalystIncidents();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (url.includes('/assign') && init?.method === 'POST') {
    const body = await (init.body as any)?.text();
    const { analyst, notes } = JSON.parse(body || '{}');
    const incidentId = url.split('/')[3]; // Extract ID from URL
    const success = await apiService.assignIncident(incidentId, analyst, notes);
    return new Response(JSON.stringify({ success }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (url.includes('/investigate') && init?.method === 'POST') {
    const body = await (init.body as any)?.text();
    const { notes } = JSON.parse(body || '{}');
    const incidentId = url.split('/')[3]; // Extract ID from URL
    const success = await apiService.startInvestigation(incidentId, notes);
    return new Response(JSON.stringify({ success }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Fall back to original fetch for other requests
  return originalFetch(input, init);
};