import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Upload,
  FileText,
  Image as ImageIcon,
  Video,
  Mic,
  Link as LinkIcon,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  name: string;
  type: string;
  size: number;
  url: string;
  category: string;
}

const ReportIncident = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [category, setCategory] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    "Phishing",
    "Malware / Ransomware",
    "Honeytrap / Social Engineering",
    "Espionage Attempt",
    "OPSEC Risk",
    "Fraud / Financial Scam",
    "Unauthorized Access",
    "Other Cyber Threat",
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newFile: UploadedFile = {
          name: file.name,
          type: file.type,
          size: file.size,
          url: event.target?.result as string,
          category,
        };
        setUploadedFiles((prev) => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });

    toast({
      title: "Evidence uploaded",
      description: `${files.length} file(s) added successfully`,
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    if (uploadedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Evidence Required",
        description: "Please upload at least one piece of evidence before analysis",
      });
      return;
    }

    setAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
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
      });
      setAnalyzing(false);
    }, 3000);
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
              <h1 className="text-lg font-bold">Report Cyber Incident</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Threat Analysis</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard/personnel")}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold mb-6">Incident Details</h2>

              <div className="space-y-6">
                {/* Category Selection */}
                <div className="space-y-2">
                  <Label>Threat Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-input">
                      <SelectValue placeholder="Select threat type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Incident Description</Label>
                  <Textarea
                    placeholder="Describe what happened, when you noticed it, and any suspicious behavior..."
                    className="bg-input min-h-[100px]"
                  />
                </div>

                {/* Evidence Upload */}
                <div className="space-y-3">
                  <Label className="text-destructive">Upload Evidence (Required *)</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "general")}
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 justify-start"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FileText className="w-4 h-4" />
                      Text / SMS
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 justify-start"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <LinkIcon className="w-4 h-4" />
                      URL / Link
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 justify-start"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.multiple = true;
                        input.onchange = (e) => handleFileUpload(e as any, "screenshot");
                        input.click();
                      }}
                    >
                      <ImageIcon className="w-4 h-4" />
                      Screenshot
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 justify-start"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "video/*";
                        input.multiple = true;
                        input.onchange = (e) => handleFileUpload(e as any, "video");
                        input.click();
                      }}
                    >
                      <Video className="w-4 h-4" />
                      Video
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 justify-start"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "audio/*";
                        input.multiple = true;
                        input.onchange = (e) => handleFileUpload(e as any, "audio");
                        input.click();
                      }}
                    >
                      <Mic className="w-4 h-4" />
                      Audio
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 justify-start"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4" />
                      File Upload
                    </Button>
                  </div>

                  {/* Uploaded Files Display */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <Label>Uploaded Evidence ({uploadedFiles.length})</Label>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border"
                          >
                            {file.type.startsWith("image/") ? (
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            ) : (
                              <FileText className="w-12 h-12 text-muted-foreground" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(2)} KB • {file.category}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="flex-1 bg-gradient-primary"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      "Analyze Threat"
                    )}
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Analysis Panel */}
          <div className="space-y-6">
            {!analysisResult && !analyzing && (
              <Card className="p-6 bg-muted/50 border-border">
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Fill in the incident details and click "Analyze Threat" for instant AI-powered
                    security assessment
                  </p>
                </div>
              </Card>
            )}

            {analyzing && (
              <Card className="p-6 bg-card border-primary animate-pulse-glow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="font-semibold">AI Analysis in Progress...</span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                      Scanning threat indicators
                    </p>
                    <p className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                      Matching against threat database
                    </p>
                    <p className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                      Generating security recommendations
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {analysisResult && (
              <Card
                className={`p-6 border-2 animate-fade-in ${
                  analysisResult.status === "MALICIOUS"
                    ? "border-destructive bg-destructive/5"
                    : "border-success bg-success/5"
                }`}
              >
                <div className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center gap-3">
                    {analysisResult.status === "MALICIOUS" ? (
                      <XCircle className="w-8 h-8 text-destructive" />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-success" />
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">AI Analysis Result</p>
                      <p
                        className={`text-xl font-bold ${
                          analysisResult.status === "MALICIOUS" ? "text-destructive" : "text-success"
                        }`}
                      >
                        {analysisResult.status}
                      </p>
                    </div>
                  </div>

                  {/* Threat Type */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Identified Threat</p>
                    <Badge variant="destructive" className="text-sm">
                      {analysisResult.threatType}
                    </Badge>
                  </div>

                  {/* Confidence Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">Confidence Level</p>
                      <span className="text-sm font-bold">{analysisResult.confidence}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-2">
                      <div
                        className="bg-destructive h-2 rounded-full"
                        style={{ width: `${analysisResult.confidence}%` }}
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
                      {analysisResult.indicators.map((indicator: string, idx: number) => (
                        <li key={idx} className="text-xs text-muted-foreground flex gap-2">
                          <span className="text-destructive">•</span>
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-gradient-danger">
                    Submit to CERT-Army
                  </Button>
                </div>
              </Card>
            )}

            {/* Info Card */}
            <Card className="p-4 bg-muted/30 border-border">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Note:</strong> All submissions are encrypted
                and analyzed in real-time. CERT-Army analysts will review high-priority threats
                immediately.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportIncident;
