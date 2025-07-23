import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Shield,
  TrendingUp,
  Users,
  Moon,
  Clock,
  Target,
  Plus,
  MessageCircle,
  MoreVertical,
  LogOut,
  Settings,
  Upload,
  HelpCircle,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  Bell,
  Send,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Heart,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Award,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

interface DepartmentData {
  name: string;
  avgSleepScore: number;
  productivity: number;
  burnoutRisk: "low" | "moderate" | "high";
  employees: number;
  trend: "up" | "down" | "stable";
}

interface BurnoutData {
  low: number;
  moderate: number;
  high: number;
}

interface ProductivityTrend {
  week: string;
  productivity: number;
  sleepHours: number;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInterventionOpen, setIsInterventionOpen] = useState(false);
  const [interventionStep, setInterventionStep] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [interventionData, setInterventionData] = useState({
    // Step 1: Trigger/Issue Selection
    trigger: "",
    issueType: "",
    severity: "medium" as "low" | "medium" | "high",
    description: "",

    // Step 2: Intervention Goal
    goal: "",
    interventionType: "",
    expectedOutcome: "",
    timeline: "",

    // Step 3: Recipients & Campaign
    recipients: [] as string[],
    departments: [] as string[],
    specificEmployees: [] as string[],
    messageType: "notification" as "notification" | "email" | "both",
    message: "",
    schedule: "now" as "now" | "1hour" | "tomorrow" | "custom",
    customDate: "",

    // Campaign linking
    linkToCampaign: false,
    selectedCampaign: "",
    createNewCampaign: false,
    newCampaignName: "",
    newCampaignType: "",
    newCampaignDuration: "",
  });

  // Enhanced KPI Data
  const kpiData = {
    avgSleepScore: 7.8,
    sleepDebtPercentage: 23,
    campaignParticipation: 87,
    activeUsers: 156,
    teamProductivityIncrease: 15.3,
  };

  // Burnout Risk Data
  const burnoutData: BurnoutData = {
    low: 67, // 67% of employees at low risk
    moderate: 23, // 23% at moderate risk
    high: 10, // 10% at high risk
  };

  // Department Performance Data
  const departmentData: DepartmentData[] = [
    {
      name: "Engineering",
      avgSleepScore: 7.6,
      productivity: 85,
      burnoutRisk: "moderate",
      employees: 45,
      trend: "down",
    },
    {
      name: "Sales",
      avgSleepScore: 7.2,
      productivity: 78,
      burnoutRisk: "high",
      employees: 32,
      trend: "down",
    },
    {
      name: "Marketing",
      avgSleepScore: 7.9,
      productivity: 88,
      burnoutRisk: "low",
      employees: 28,
      trend: "up",
    },
    {
      name: "HR",
      avgSleepScore: 8.4,
      productivity: 92,
      burnoutRisk: "low",
      employees: 15,
      trend: "stable",
    },
    {
      name: "Finance",
      avgSleepScore: 8.1,
      productivity: 90,
      burnoutRisk: "low",
      employees: 22,
      trend: "up",
    },
  ];

  // Productivity Trends Data
  const productivityTrends: ProductivityTrend[] = [
    { week: "Week 1", productivity: 78, sleepHours: 6.8 },
    { week: "Week 2", productivity: 82, sleepHours: 7.1 },
    { week: "Week 3", productivity: 85, sleepHours: 7.3 },
    { week: "Week 4", productivity: 88, sleepHours: 7.6 },
    { week: "Week 5", productivity: 91, sleepHours: 7.8 },
    { week: "Week 6", productivity: 89, sleepHours: 7.5 },
  ];

  // Key Insights
  const keyInsights = [
    {
      id: 1,
      type: "warning",
      title: "Sales Team Burnout Risk",
      description:
        "Sales department shows 68% high burnout risk with declining sleep scores.",
      action: "Schedule Team Intervention",
      priority: "high",
      affectedEmployees: 22,
    },
    {
      id: 2,
      type: "success",
      title: "Marketing Team Excellence",
      description:
        "Marketing team achieved 15% productivity increase with improved sleep habits.",
      action: "Replicate Success Pattern",
      priority: "medium",
      affectedEmployees: 28,
    },
    {
      id: 3,
      type: "info",
      title: "Overall Positive Trend",
      description:
        "Company-wide sleep scores improved by 12% over the last quarter.",
      action: "Continue Current Programs",
      priority: "low",
      affectedEmployees: 156,
    },
  ];

  const handleCampaignCreate = () => {
    navigate("/admin/campaigns");
  };

  const handleUserManagement = () => {
    navigate("/admin/users");
  };

  const handleLogout = () => {
    localStorage.setItem("adminAuthenticated", "false");
    navigate("/admin/login");
  };

  const handleSettings = () => {
    navigate("/admin/settings");
  };

  const handleScheduleIntervention = (insight?: any) => {
    setInterventionStep(1);
    if (insight) {
      setInterventionData({
        ...interventionData,
        trigger: insight.title,
        issueType:
          insight.type === "warning"
            ? "burnout"
            : insight.type === "success"
              ? "replication"
              : "general",
        severity:
          insight.priority === "high"
            ? "high"
            : insight.priority === "medium"
              ? "medium"
              : "low",
        description: insight.description,
        message: `Regarding: ${insight.title}. ${insight.description}`,
      });
    } else {
      // Reset intervention data for fresh start
      setInterventionData({
        trigger: "",
        issueType: "",
        severity: "medium",
        description: "",
        goal: "",
        interventionType: "",
        expectedOutcome: "",
        timeline: "",
        recipients: [],
        departments: [],
        specificEmployees: [],
        messageType: "notification",
        message: "",
        schedule: "now",
        customDate: "",
        linkToCampaign: false,
        selectedCampaign: "",
        createNewCampaign: false,
        newCampaignName: "",
        newCampaignType: "",
        newCampaignDuration: "",
      });
    }
    setIsInterventionOpen(true);
  };

  const handleNextStep = () => {
    if (interventionStep < 3) {
      setInterventionStep(interventionStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (interventionStep > 1) {
      setInterventionStep(interventionStep - 1);
    }
  };

  const handleSendIntervention = async () => {
    // Validate final step
    if (!interventionData.message || interventionData.recipients.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let campaignAction = "";
    if (interventionData.createNewCampaign) {
      campaignAction = `\n\nNew Campaign Created: "${interventionData.newCampaignName}" (${interventionData.newCampaignType}, ${interventionData.newCampaignDuration})`;
    } else if (
      interventionData.linkToCampaign &&
      interventionData.selectedCampaign
    ) {
      campaignAction = `\n\nLinked to existing campaign: "${interventionData.selectedCampaign}"`;
    }

    toast({
      title: "Intervention Scheduled Successfully!",
      description: `Trigger: ${interventionData.trigger} | Goal: ${interventionData.goal} | Recipients: ${interventionData.recipients.join(", ")} | The intervention will be executed and tracked automatically.`,
      variant: "success",
    });

    // Reset and close
    setIsInterventionOpen(false);
    setInterventionStep(1);
  };

  const isStep1Valid = () => {
    return (
      interventionData.trigger &&
      interventionData.issueType &&
      interventionData.description
    );
  };

  const isStep2Valid = () => {
    return (
      interventionData.goal &&
      interventionData.interventionType &&
      interventionData.timeline
    );
  };

  const isStep3Valid = () => {
    return interventionData.recipients.length > 0 && interventionData.message;
  };

  const mockChatMessage = (query: string) => {
    const responses = {
      "employees with sleep debt":
        "I found 36 employees with consistent sleep debt (>2 hours). Top affected departments: Sales (12), Engineering (11), Marketing (8). Would you like me to create a targeted campaign for these teams?",
      "burnout analysis":
        "Current burnout analysis: 10% high risk (16 employees), 23% moderate risk (36 employees), 67% low risk (104 employees). Sales and Engineering departments show highest concern levels. Recommend immediate intervention for high-risk individuals.",
      "productivity trends":
        "Productivity has increased 15.3% over the last 6 weeks, strongly correlating with improved sleep hours (6.8 → 7.8 average). Marketing leads with 22% improvement, while Sales needs attention with 3% decline.",
      "department insights":
        "Department analysis: HR leads (8.4 sleep score, 92% productivity), followed by Finance (8.1, 90%). Sales struggles with 7.2 sleep score and 78% productivity. Engineering shows moderate concerns. Marketing demonstrates best improvement trajectory.",
      "intervention recommendations":
        "Recommended interventions: (1) Immediate: Sales team stress management workshop, (2) This week: Engineering sleep hygiene training, (3) Next month: Company-wide sleep challenge based on Marketing's success model.",
      default:
        "I can help you analyze burnout risks, productivity trends, department performance, and recommend interventions. Try asking about 'burnout analysis', 'productivity trends', 'department insights', or 'intervention recommendations'.",
    };

    const key = Object.keys(responses).find((k) =>
      query.toLowerCase().includes(k),
    );
    return responses[key as keyof typeof responses] || responses.default;
  };

  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; content: string; role: "user" | "assistant" }>
  >([
    {
      id: "1",
      content:
        "Hello! I'm your enhanced SleepFix.ai admin assistant. I can analyze burnout risks, productivity trends, department performance, and recommend targeted interventions. What insights would you like to explore?",
      role: "assistant" as const,
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: chatInput,
      role: "user" as const,
    };

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      content: mockChatMessage(chatInput),
      role: "assistant" as const,
    };

    setChatMessages((prev) => [...prev, userMessage, assistantMessage]);
    setChatInput("");
  };

  const getBurnoutColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600";
      case "moderate":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <MoreVertical className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredDepartments =
    selectedDepartment === "all"
      ? departmentData
      : departmentData.filter(
          (d) => d.name.toLowerCase() === selectedDepartment,
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sleep-blue-50 via-background to-lavender-50">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-sleep-blue-600 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-foreground">
                SleepFix.ai Admin
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                Wellness Program Dashboard
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Button
              onClick={handleUserManagement}
              variant="outline"
              size="sm"
              className="text-muted-foreground"
            >
              <Upload className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Manage Users</span>
              <span className="lg:hidden">Users</span>
            </Button>

            <Button
              onClick={handleCampaignCreate}
              size="sm"
              className="bg-lavender-500 hover:bg-lavender-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">New Campaign</span>
              <span className="lg:hidden">Campaign</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSettings}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-white/90 backdrop-blur-sm">
            <div className="px-4 py-2 space-y-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleUserManagement();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                <Upload className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleCampaignCreate();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
              <div className="border-t border-border/50 pt-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleSettings();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-muted-foreground"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-muted-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Enhanced KPI Cards */}
        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Average Sleep Score */}
            <Card className="relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Sleep Score
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="font-medium mb-1">Sleep Score Definition</p>
                      <p className="text-sm mb-2">
                        A composite metric ranging from 0-10 based on:
                      </p>
                      <ul className="text-xs space-y-1">
                        <li>• Sleep Duration (7-9 hours optimal)</li>
                        <li>
                          • Sleep Efficiency (time asleep vs. time in bed)
                        </li>
                        <li>• Sleep Consistency (regular bedtime/wake time)</li>
                        <li>• Sleep Quality (deep sleep & REM cycles)</li>
                      </ul>
                      <p className="text-xs mt-2 font-medium">Score Ranges:</p>
                      <p className="text-xs">
                        9-10: Excellent | 7-8: Good | 5-6: Fair | {"<"}5: Poor
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <TrendingUp className="h-4 w-4 text-lavender-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl lg:text-3xl font-bold text-lavender-600">
                  {kpiData.avgSleepScore}
                </div>
                <p className="text-xs text-muted-foreground">
                  +0.3 from last week
                </p>
                <div className="mt-2">
                  <div className="text-xs text-muted-foreground mb-1">
                    Company Benchmark
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-lavender-500 h-1.5 rounded-full"
                      style={{
                        width: `${(kpiData.avgSleepScore / 10) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Burnout Risk */}
            <Card className="relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium">
                    Burnout Risk
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="font-medium mb-1">
                        Burnout Risk Assessment
                      </p>
                      <p className="text-sm mb-2">
                        Based on sleep patterns, engagement, and productivity
                        trends
                      </p>
                      <p className="text-xs mb-2">
                        Factors: Sleep debt, declining scores, missed check-ins,
                        low engagement
                      </p>
                      <p className="text-xs font-medium">Risk Levels:</p>
                      <p className="text-xs">
                        High: Immediate intervention needed | Moderate: Monitor
                        closely | Low: Healthy patterns
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-600">High Risk</span>
                    <span className="text-sm font-bold text-red-600">
                      {burnoutData.high}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-yellow-600">Moderate</span>
                    <span className="text-sm font-bold text-yellow-600">
                      {burnoutData.moderate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-600">Low Risk</span>
                    <span className="text-sm font-bold text-green-600">
                      {burnoutData.low}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Productivity Increase */}
            <Card className="relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium">
                    Productivity Gain
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="font-medium mb-1">
                        Team Productivity Increase
                      </p>
                      <p className="text-sm mb-2">
                        Percentage improvement in team productivity metrics over
                        selected period
                      </p>
                      <p className="text-xs mb-2">
                        Measured via: Task completion, quality scores,
                        collaboration metrics, meeting effectiveness
                      </p>
                      <p className="text-xs font-medium">
                        Correlation with sleep improvement shows strong positive
                        relationship.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <BarChart3 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl lg:text-3xl font-bold text-green-600">
                  +{kpiData.teamProductivityIncrease}%
                </div>
                <p className="text-xs text-muted-foreground">
                  vs. previous quarter
                </p>
                <div className="mt-2">
                  <div className="text-xs text-muted-foreground mb-1">
                    Target: +20%
                  </div>
                  <Progress
                    value={(kpiData.teamProductivityIncrease / 20) * 100}
                    className="h-1.5"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Campaign Participation */}
            <Card className="relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium">
                    Campaign Participation
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="font-medium mb-1">
                        Campaign Participation Rate
                      </p>
                      <p className="text-sm mb-2">
                        Percentage of eligible employees actively participating
                        in wellness campaigns
                      </p>
                      <p className="text-xs mb-2">
                        Includes: Challenge enrollment, activity completion, and
                        sustained engagement
                      </p>
                      <p className="text-xs font-medium">
                        Participation Benchmarks:
                      </p>
                      <p className="text-xs">
                        85%+: Excellent | 70-84%: Good | 50-69%: Average | {"<"}
                        50%: Needs Improvement
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Target className="h-4 w-4 text-sleep-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl lg:text-3xl font-bold text-sleep-blue-600">
                  {kpiData.campaignParticipation}%
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
                <div className="mt-2">
                  <div className="text-xs text-muted-foreground mb-1">
                    Engagement Quality
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1 bg-green-200 h-1.5 rounded"></div>
                    <div className="flex-1 bg-green-200 h-1.5 rounded"></div>
                    <div className="flex-1 bg-green-200 h-1.5 rounded"></div>
                    <div className="flex-1 bg-gray-200 h-1.5 rounded"></div>
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    High Engagement
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Users */}
            <Card className="relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium">
                    Active Users
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="font-medium mb-1">
                        Active Users Definition
                      </p>
                      <p className="text-sm mb-2">
                        Employees who have engaged with the platform in the last
                        30 days
                      </p>
                      <p className="text-xs mb-2">
                        Activities: Sleep data sync, chat interactions,
                        assessments, campaigns
                      </p>
                      <p className="text-xs font-medium">Activity Levels:</p>
                      <p className="text-xs">
                        Daily: Regular engagement | Weekly: 2-3x/week | Monthly:
                        Sporadic usage
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Users className="h-4 w-4 text-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl lg:text-3xl font-bold">
                  {kpiData.activeUsers}
                </div>
                <p className="text-xs text-muted-foreground">
                  +8 new this week
                </p>
                <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
                  <div className="text-center">
                    <div className="font-medium text-green-600">Daily</div>
                    <div className="text-muted-foreground">89</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-600">Weekly</div>
                    <div className="text-muted-foreground">45</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-600">Monthly</div>
                    <div className="text-muted-foreground">22</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TooltipProvider>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Charts and Analytics */}
          <div className="xl:col-span-2 space-y-6">
            {/* Productivity Trends Chart */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Sleep vs Productivity Trends
                    </CardTitle>
                    <CardDescription>
                      Weekly correlation between sleep hours and team
                      productivity
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedPeriod}
                      onValueChange={setSelectedPeriod}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="1m">Last month</SelectItem>
                        <SelectItem value="3m">Last 3 months</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 lg:h-80">
                  {/* Mock Chart Visualization */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-lavender-500 mx-auto mb-4" />
                      <h3 className="font-medium text-lg mb-2">
                        Interactive Chart
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sleep hours correlate with +15.3% productivity increase
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-white p-2 rounded">
                          <div className="text-blue-600 font-medium">
                            Avg Sleep
                          </div>
                          <div className="text-lg font-bold">7.8h</div>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <div className="text-green-600 font-medium">
                            Productivity
                          </div>
                          <div className="text-lg font-bold">+15.3%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Performance Analysis */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Department Performance Analysis
                    </CardTitle>
                    <CardDescription>
                      Sleep scores, productivity, and burnout risk by department
                    </CardDescription>
                  </div>
                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDepartments.map((dept) => (
                    <div
                      key={dept.name}
                      className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{dept.name}</h4>
                            <Badge
                              variant="secondary"
                              className={`${
                                dept.burnoutRisk === "high"
                                  ? "bg-red-100 text-red-800"
                                  : dept.burnoutRisk === "moderate"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {dept.burnoutRisk} risk
                            </Badge>
                            {getTrendIcon(dept.trend)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {dept.employees} employees
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 text-center">
                          <div>
                            <div className="text-sm text-muted-foreground">
                              Sleep Score
                            </div>
                            <div className="text-lg font-bold text-lavender-600">
                              {dept.avgSleepScore}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">
                              Productivity
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              {dept.productivity}%
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleScheduleIntervention({
                              title: `${dept.name} Department Support`,
                              description: `Department showing ${dept.burnoutRisk} burnout risk with ${dept.avgSleepScore} sleep score`,
                              affectedEmployees: dept.employees,
                            })
                          }
                          className="whitespace-nowrap"
                        >
                          Schedule Intervention
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Insights & Recommended Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Key Insights & Recommended Actions
                </CardTitle>
                <CardDescription>
                  AI-generated insights based on current data trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keyInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className={`border rounded-lg p-4 ${
                        insight.type === "warning"
                          ? "border-red-200 bg-red-50"
                          : insight.type === "success"
                            ? "border-green-200 bg-green-50"
                            : "border-blue-200 bg-blue-50"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {insight.type === "warning" && (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            )}
                            {insight.type === "success" && (
                              <Award className="h-4 w-4 text-green-600" />
                            )}
                            {insight.type === "info" && (
                              <Activity className="h-4 w-4 text-blue-600" />
                            )}
                            <h4 className="font-medium">{insight.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {insight.priority} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {insight.description}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Affects {insight.affectedEmployees} employees
                          </div>
                        </div>

                        <Button
                          onClick={() => handleScheduleIntervention(insight)}
                          className={`whitespace-nowrap ${
                            insight.type === "warning"
                              ? "bg-red-600 hover:bg-red-700"
                              : insight.type === "success"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {insight.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Chat Assistant */}
          <div className="xl:col-span-1">
            <Card className="h-[600px] xl:h-[calc(100vh-12rem)]">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Enhanced AI Assistant
                </CardTitle>
                <CardDescription>
                  Advanced analytics and intervention recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-full">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg text-sm ${
                        message.role === "user"
                          ? "bg-lavender-500 text-white ml-4"
                          : "bg-muted mr-4"
                      }`}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Ask about burnout analysis, productivity trends..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleChatSubmit()
                      }
                      className="flex-1"
                    />
                    <Button
                      onClick={handleChatSubmit}
                      size="sm"
                      className="bg-lavender-500 hover:bg-lavender-600"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Campaigns - Mobile Optimized */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>
              Current wellness initiatives across your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between p-3 lg:p-4 border border-border rounded-lg gap-3 lg:gap-4 hover:bg-muted/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm lg:text-base">
                    7 Days to Better Sleep
                  </h4>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    87% participation • 156 employees enrolled
                  </p>
                </div>
                <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6">
                  <div className="text-center">
                    <p className="text-xs lg:text-sm font-medium">Day 3 of 7</p>
                    <div className="w-20 lg:w-24 bg-secondary rounded-full h-2 mt-1">
                      <div className="bg-lavender-500 h-2 rounded-full w-[43%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between p-3 lg:p-4 border border-border rounded-lg gap-3 lg:gap-4 hover:bg-muted/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm lg:text-base">
                    Power Nap Challenge
                  </h4>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    64% participation • 98 employees enrolled
                  </p>
                </div>
                <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6">
                  <div className="text-center">
                    <p className="text-xs lg:text-sm font-medium">
                      Week 2 of 4
                    </p>
                    <div className="w-20 lg:w-24 bg-secondary rounded-full h-2 mt-1">
                      <div className="bg-sleep-blue-500 h-2 rounded-full w-[50%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced 3-Step Intervention Wizard */}
      <Dialog open={isInterventionOpen} onOpenChange={setIsInterventionOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Schedule Intervention - Step {interventionStep} of 3
            </DialogTitle>
            <DialogDescription>
              {interventionStep === 1 &&
                "Identify the trigger and performance issue"}
              {interventionStep === 2 &&
                "Define intervention goal and strategy"}
              {interventionStep === 3 &&
                "Select recipients and link to campaigns"}
            </DialogDescription>
          </DialogHeader>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === interventionStep
                        ? "bg-lavender-500 text-white"
                        : step < interventionStep
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step < interventionStep ? "✓" : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        step < interventionStep ? "bg-green-500" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Tabs value={`step${interventionStep}`} className="space-y-6">
            {/* Step 1: Trigger & Issue Selection */}
            <TabsContent value="step1" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Step 1: Identify Trigger & Issue
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Performance Trigger *
                    </label>
                    <Input
                      placeholder="e.g., Sales Team Burnout Alert"
                      value={interventionData.trigger}
                      onChange={(e) =>
                        setInterventionData({
                          ...interventionData,
                          trigger: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Issue Type *</label>
                    <Select
                      value={interventionData.issueType}
                      onValueChange={(value) =>
                        setInterventionData({
                          ...interventionData,
                          issueType: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="burnout">🔥 Burnout Risk</SelectItem>
                        <SelectItem value="sleep-debt">
                          😴 Sleep Debt
                        </SelectItem>
                        <SelectItem value="productivity">
                          📉 Low Productivity
                        </SelectItem>
                        <SelectItem value="engagement">
                          👥 Low Engagement
                        </SelectItem>
                        <SelectItem value="wellness">
                          🏥 Health Concerns
                        </SelectItem>
                        <SelectItem value="replication">
                          🎯 Success Replication
                        </SelectItem>
                        <SelectItem value="general">
                          📋 General Support
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Severity Level</label>
                  <div className="flex gap-2">
                    {(["low", "medium", "high"] as const).map((level) => (
                      <Button
                        key={level}
                        variant={
                          interventionData.severity === level
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setInterventionData({
                            ...interventionData,
                            severity: level,
                          })
                        }
                        className={`flex-1 ${
                          level === "high"
                            ? "border-red-500 text-red-700"
                            : level === "medium"
                              ? "border-yellow-500 text-yellow-700"
                              : "border-green-500 text-green-700"
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Issue Description *
                  </label>
                  <Textarea
                    placeholder="Describe the performance issue, data trends, and impact..."
                    value={interventionData.description}
                    onChange={(e) =>
                      setInterventionData({
                        ...interventionData,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Step 2: Intervention Goal */}
            <TabsContent value="step2" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Step 2: Define Intervention Goal
                </h3>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Intervention Goal *
                  </label>
                  <Input
                    placeholder="e.g., Reduce burnout risk by 30% in Sales team"
                    value={interventionData.goal}
                    onChange={(e) =>
                      setInterventionData({
                        ...interventionData,
                        goal: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Intervention Type *
                    </label>
                    <Select
                      value={interventionData.interventionType}
                      onValueChange={(value) =>
                        setInterventionData({
                          ...interventionData,
                          interventionType: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select intervention type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education">
                          ��� Education/Training
                        </SelectItem>
                        <SelectItem value="coaching">
                          🎯 Personal Coaching
                        </SelectItem>
                        <SelectItem value="campaign">
                          🏆 Wellness Campaign
                        </SelectItem>
                        <SelectItem value="policy">
                          📋 Policy Changes
                        </SelectItem>
                        <SelectItem value="resources">
                          🛠️ Resource Provision
                        </SelectItem>
                        <SelectItem value="assessment">
                          📊 Assessment/Evaluation
                        </SelectItem>
                        <SelectItem value="support">
                          🤝 Peer Support Groups
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Timeline</label>
                    <Select
                      value={interventionData.timeline}
                      onValueChange={(value) =>
                        setInterventionData({
                          ...interventionData,
                          timeline: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">
                          ⚡ Immediate (1-3 days)
                        </SelectItem>
                        <SelectItem value="short">
                          📅 Short-term (1-2 weeks)
                        </SelectItem>
                        <SelectItem value="medium">
                          📆 Medium-term (1 month)
                        </SelectItem>
                        <SelectItem value="long">
                          🗓️ Long-term (2-3 months)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Expected Outcome
                  </label>
                  <Textarea
                    placeholder="Describe the expected results and success metrics..."
                    value={interventionData.expectedOutcome}
                    onChange={(e) =>
                      setInterventionData({
                        ...interventionData,
                        expectedOutcome: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Step 3: Recipients & Campaign */}
            <TabsContent value="step3" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Step 3: Assign Recipients & Link Campaign
                </h3>

                {/* Recipients Selection */}
                <div className="space-y-4">
                  <h4 className="font-medium">Select Recipients *</h4>

                  <Tabs defaultValue="departments" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="departments">
                        By Department
                      </TabsTrigger>
                      <TabsTrigger value="individuals">
                        Specific Individuals
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="departments" className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {[
                          "Sales",
                          "Engineering",
                          "Marketing",
                          "HR",
                          "Finance",
                          "All Departments",
                        ].map((dept) => (
                          <Button
                            key={dept}
                            variant={
                              interventionData.recipients.includes(dept)
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => {
                              const newRecipients =
                                interventionData.recipients.includes(dept)
                                  ? interventionData.recipients.filter(
                                      (r) => r !== dept,
                                    )
                                  : [...interventionData.recipients, dept];
                              setInterventionData({
                                ...interventionData,
                                recipients: newRecipients,
                              });
                            }}
                            className="justify-start"
                          >
                            {dept}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="individuals" className="space-y-3">
                      <Input
                        placeholder="Search and select specific employees..."
                        onChange={(e) => {
                          // In real implementation, this would search employee database
                          const value = e.target.value;
                          if (
                            value &&
                            !interventionData.recipients.includes(value)
                          ) {
                            setInterventionData({
                              ...interventionData,
                              recipients: [
                                ...interventionData.recipients,
                                value,
                              ],
                            });
                          }
                        }}
                      />
                    </TabsContent>
                  </Tabs>

                  {interventionData.recipients.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {interventionData.recipients.map((recipient) => (
                        <Badge
                          key={recipient}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {recipient}
                          <button
                            onClick={() => {
                              const newRecipients =
                                interventionData.recipients.filter(
                                  (r) => r !== recipient,
                                );
                              setInterventionData({
                                ...interventionData,
                                recipients: newRecipients,
                              });
                            }}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Campaign Linking */}
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-medium">
                    Campaign Integration (Optional)
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="linkToCampaign"
                        checked={interventionData.linkToCampaign}
                        onChange={(e) =>
                          setInterventionData({
                            ...interventionData,
                            linkToCampaign: e.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      <label
                        htmlFor="linkToCampaign"
                        className="text-sm font-medium"
                      >
                        Link to existing campaign
                      </label>
                    </div>

                    {interventionData.linkToCampaign && (
                      <Select
                        value={interventionData.selectedCampaign}
                        onValueChange={(value) =>
                          setInterventionData({
                            ...interventionData,
                            selectedCampaign: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select existing campaign" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7-days-sleep">
                            7 Days to Better Sleep
                          </SelectItem>
                          <SelectItem value="power-nap">
                            Power Nap Challenge
                          </SelectItem>
                          <SelectItem value="mindful-evenings">
                            Mindful Evenings
                          </SelectItem>
                          <SelectItem value="morning-energy">
                            Morning Energy Boost
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="createNewCampaign"
                        checked={interventionData.createNewCampaign}
                        onChange={(e) =>
                          setInterventionData({
                            ...interventionData,
                            createNewCampaign: e.target.checked,
                            linkToCampaign: e.target.checked
                              ? false
                              : interventionData.linkToCampaign,
                          })
                        }
                        className="rounded"
                      />
                      <label
                        htmlFor="createNewCampaign"
                        className="text-sm font-medium"
                      >
                        Create new campaign from this intervention
                      </label>
                    </div>

                    {interventionData.createNewCampaign && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ml-6">
                        <Input
                          placeholder="Campaign name"
                          value={interventionData.newCampaignName}
                          onChange={(e) =>
                            setInterventionData({
                              ...interventionData,
                              newCampaignName: e.target.value,
                            })
                          }
                        />
                        <Select
                          value={interventionData.newCampaignType}
                          onValueChange={(value) =>
                            setInterventionData({
                              ...interventionData,
                              newCampaignType: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sleep-hygiene">
                              Sleep Hygiene
                            </SelectItem>
                            <SelectItem value="stress-management">
                              Stress Management
                            </SelectItem>
                            <SelectItem value="exercise">Exercise</SelectItem>
                            <SelectItem value="nutrition">Nutrition</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={interventionData.newCampaignDuration}
                          onValueChange={(value) =>
                            setInterventionData({
                              ...interventionData,
                              newCampaignDuration: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7-days">7 Days</SelectItem>
                            <SelectItem value="2-weeks">2 Weeks</SelectItem>
                            <SelectItem value="1-month">1 Month</SelectItem>
                            <SelectItem value="3-months">3 Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Configuration */}
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-medium">Message Configuration</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Delivery Method
                      </label>
                      <Select
                        value={interventionData.messageType}
                        onValueChange={(
                          value: "notification" | "email" | "both",
                        ) =>
                          setInterventionData({
                            ...interventionData,
                            messageType: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="notification">
                            📱 In-App Notification
                          </SelectItem>
                          <SelectItem value="email">📧 Email</SelectItem>
                          <SelectItem value="both">📱📧 Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Schedule</label>
                      <Select
                        value={interventionData.schedule}
                        onValueChange={(
                          value: "now" | "1hour" | "tomorrow" | "custom",
                        ) =>
                          setInterventionData({
                            ...interventionData,
                            schedule: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">⚡ Send Now</SelectItem>
                          <SelectItem value="1hour">🕐 In 1 Hour</SelectItem>
                          <SelectItem value="tomorrow">
                            🌅 Tomorrow 9 AM
                          </SelectItem>
                          <SelectItem value="custom">
                            📅 Custom Date/Time
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {interventionData.schedule === "custom" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Custom Date/Time
                      </label>
                      <Input
                        type="datetime-local"
                        value={interventionData.customDate}
                        onChange={(e) =>
                          setInterventionData({
                            ...interventionData,
                            customDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Message Content *
                    </label>
                    <Textarea
                      placeholder="Craft your intervention message..."
                      value={interventionData.message}
                      onChange={(e) =>
                        setInterventionData({
                          ...interventionData,
                          message: e.target.value,
                        })
                      }
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex gap-2 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setIsInterventionOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>

            {interventionStep > 1 && (
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="flex-1"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}

            {interventionStep < 3 ? (
              <Button
                onClick={handleNextStep}
                disabled={
                  (interventionStep === 1 && !isStep1Valid()) ||
                  (interventionStep === 2 && !isStep2Valid())
                }
                className="flex-1 bg-lavender-500 hover:bg-lavender-600"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSendIntervention}
                disabled={!isStep3Valid()}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Schedule Intervention
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
