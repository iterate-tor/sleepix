import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  ArrowLeft,
  Plus,
  Target,
  Calendar,
  Users,
  TrendingUp,
  MoreVertical,
  Play,
  Pause,
  Edit,
  Trash2,
  Menu,
  X,
  Eye,
  BarChart3,
  Copy,
  ChevronLeft,
  ChevronRight,
  Activity,
  Award,
  Clock,
  MessageSquare,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Campaign {
  id: string;
  name: string;
  description: string;
  type: "sleep-hygiene" | "exercise" | "nutrition" | "stress-management";
  status: "draft" | "active" | "paused" | "completed";
  startDate: string;
  endDate: string;
  participants: number;
  targetParticipants: number;
  engagement: number;
  avgImprovementScore: number;
  createdBy: string;
  departments: string[];
  activities: CampaignActivity[];
  analytics: CampaignAnalytics;
}

interface CampaignActivity {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "milestone";
  points: number;
  completionRate: number;
}

interface CampaignAnalytics {
  dailyEngagement: { date: string; engagement: number }[];
  departmentBreakdown: {
    department: string;
    participants: number;
    engagement: number;
  }[];
  feedbackScore: number;
  completionRate: number;
  avgSleepImprovement: number;
  totalPoints: number;
}

export function AdminCampaignManagement() {
  const navigate = useNavigate();
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isAnalyticsViewOpen, setIsAnalyticsViewOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    type: "",
    duration: "",
    targetDepartment: "",
    startDate: "",
    targetParticipants: 100,
  });

  // Mock campaign data with full analytics
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "7 Days to Better Sleep",
      description:
        "A comprehensive sleep improvement program focusing on sleep hygiene and bedtime routines",
      type: "sleep-hygiene",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-01-22",
      participants: 156,
      targetParticipants: 200,
      engagement: 87,
      avgImprovementScore: 1.2,
      createdBy: "Dr. Sarah Johnson",
      departments: ["Engineering", "Sales", "Marketing"],
      activities: [
        {
          id: "1",
          title: "Set Consistent Bedtime",
          description: "Go to bed at the same time every night",
          type: "daily",
          points: 10,
          completionRate: 89,
        },
        {
          id: "2",
          title: "No Screens 1 Hour Before Bed",
          description: "Digital detox before sleep",
          type: "daily",
          points: 15,
          completionRate: 76,
        },
        {
          id: "3",
          title: "Weekly Sleep Assessment",
          description: "Complete PSQI questionnaire",
          type: "weekly",
          points: 25,
          completionRate: 92,
        },
      ],
      analytics: {
        dailyEngagement: [
          { date: "2024-01-15", engagement: 45 },
          { date: "2024-01-16", engagement: 67 },
          { date: "2024-01-17", engagement: 78 },
          { date: "2024-01-18", engagement: 89 },
          { date: "2024-01-19", engagement: 87 },
        ],
        departmentBreakdown: [
          { department: "Engineering", participants: 67, engagement: 91 },
          { department: "Sales", participants: 45, engagement: 83 },
          { department: "Marketing", participants: 44, engagement: 85 },
        ],
        feedbackScore: 4.2,
        completionRate: 78,
        avgSleepImprovement: 1.2,
        totalPoints: 12480,
      },
    },
    {
      id: "2",
      name: "Power Nap Challenge",
      description:
        "Learn the art of effective power napping for increased afternoon productivity",
      type: "sleep-hygiene",
      status: "active",
      startDate: "2024-01-10",
      endDate: "2024-02-10",
      participants: 98,
      targetParticipants: 150,
      engagement: 64,
      avgImprovementScore: 0.8,
      createdBy: "Dr. Mike Chen",
      departments: ["All"],
      activities: [
        {
          id: "1",
          title: "Daily 15-min Power Nap",
          description: "Take strategic afternoon naps",
          type: "daily",
          points: 15,
          completionRate: 68,
        },
        {
          id: "2",
          title: "Nap Journal",
          description: "Track nap effectiveness",
          type: "daily",
          points: 5,
          completionRate: 45,
        },
      ],
      analytics: {
        dailyEngagement: [
          { date: "2024-01-10", engagement: 32 },
          { date: "2024-01-11", engagement: 48 },
          { date: "2024-01-12", engagement: 56 },
          { date: "2024-01-13", engagement: 64 },
          { date: "2024-01-14", engagement: 62 },
        ],
        departmentBreakdown: [
          { department: "All Departments", participants: 98, engagement: 64 },
        ],
        feedbackScore: 3.8,
        completionRate: 56,
        avgSleepImprovement: 0.8,
        totalPoints: 8750,
      },
    },
    {
      id: "3",
      name: "Mindful Evenings",
      description:
        "Stress reduction techniques for better sleep quality and mental wellness",
      type: "stress-management",
      status: "draft",
      startDate: "2024-02-01",
      endDate: "2024-02-14",
      participants: 0,
      targetParticipants: 100,
      engagement: 0,
      avgImprovementScore: 0,
      createdBy: "Dr. Lisa Wang",
      departments: ["HR", "Finance"],
      activities: [
        {
          id: "1",
          title: "5-min Evening Meditation",
          description: "Guided meditation before bed",
          type: "daily",
          points: 10,
          completionRate: 0,
        },
        {
          id: "2",
          title: "Gratitude Journaling",
          description: "Write 3 gratitudes daily",
          type: "daily",
          points: 5,
          completionRate: 0,
        },
      ],
      analytics: {
        dailyEngagement: [],
        departmentBreakdown: [],
        feedbackScore: 0,
        completionRate: 0,
        avgSleepImprovement: 0,
        totalPoints: 0,
      },
    },
    {
      id: "4",
      name: "Morning Energy Boost",
      description:
        "Exercise routines to improve sleep quality and morning energy levels",
      type: "exercise",
      status: "completed",
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      participants: 178,
      targetParticipants: 150,
      engagement: 92,
      avgImprovementScore: 1.8,
      createdBy: "Dr. Alex Kim",
      departments: ["Engineering", "Marketing", "Sales"],
      activities: [
        {
          id: "1",
          title: "15-min Morning Workout",
          description: "Quick energizing exercises",
          type: "daily",
          points: 20,
          completionRate: 94,
        },
        {
          id: "2",
          title: "Sleep Quality Check-in",
          description: "Rate your sleep quality",
          type: "daily",
          points: 5,
          completionRate: 87,
        },
        {
          id: "3",
          title: "Weekly Fitness Assessment",
          description: "Track energy and fitness levels",
          type: "weekly",
          points: 30,
          completionRate: 89,
        },
      ],
      analytics: {
        dailyEngagement: [
          { date: "2023-12-25", engagement: 89 },
          { date: "2023-12-26", engagement: 91 },
          { date: "2023-12-27", engagement: 94 },
          { date: "2023-12-28", engagement: 92 },
          { date: "2023-12-29", engagement: 95 },
        ],
        departmentBreakdown: [
          { department: "Engineering", participants: 89, engagement: 94 },
          { department: "Marketing", participants: 45, engagement: 89 },
          { department: "Sales", participants: 44, engagement: 91 },
        ],
        feedbackScore: 4.6,
        completionRate: 89,
        avgSleepImprovement: 1.8,
        totalPoints: 28950,
      },
    },
  ]);

  const handleCampaignAction = async (action: string, campaign: Campaign) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    switch (action) {
      case "View Details":
        setSelectedCampaign(campaign);
        setIsDetailViewOpen(true);
        break;
      case "View Analytics":
        setSelectedCampaign(campaign);
        setIsAnalyticsViewOpen(true);
        break;
      case "Edit":
        setEditingCampaign(campaign);
        setIsEditDialogOpen(true);
        break;
      case "Duplicate":
        const duplicatedCampaign = {
          ...campaign,
          id: Date.now().toString(),
          name: `${campaign.name} (Copy)`,
          status: "draft" as const,
          participants: 0,
          engagement: 0,
        };
        setCampaigns((prev) => [...prev, duplicatedCampaign]);
        alert(`Campaign "${campaign.name}" duplicated successfully!`);
        break;
      case "Delete":
        if (confirm(`Are you sure you want to delete "${campaign.name}"?`)) {
          setCampaigns((prev) => prev.filter((c) => c.id !== campaign.id));
          alert(`Campaign "${campaign.name}" deleted successfully!`);
        }
        break;
      case "Launch":
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === campaign.id ? { ...c, status: "active" } : c,
          ),
        );
        alert(`Campaign "${campaign.name}" launched successfully!`);
        break;
      case "Pause":
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === campaign.id ? { ...c, status: "paused" } : c,
          ),
        );
        alert(`Campaign "${campaign.name}" paused.`);
        break;
      case "Resume":
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === campaign.id ? { ...c, status: "active" } : c,
          ),
        );
        alert(`Campaign "${campaign.name}" resumed!`);
        break;
    }

    setIsLoading(false);
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.type || !newCampaign.duration) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      description: newCampaign.description,
      type: newCampaign.type as Campaign["type"],
      status: "draft",
      startDate:
        newCampaign.startDate || new Date().toISOString().split("T")[0],
      endDate: new Date(
        Date.now() + parseInt(newCampaign.duration) * 24 * 60 * 60 * 1000,
      )
        .toISOString()
        .split("T")[0],
      participants: 0,
      targetParticipants: newCampaign.targetParticipants,
      engagement: 0,
      avgImprovementScore: 0,
      createdBy: "Current Admin",
      departments:
        newCampaign.targetDepartment === "all"
          ? ["All"]
          : [newCampaign.targetDepartment],
      activities: [],
      analytics: {
        dailyEngagement: [],
        departmentBreakdown: [],
        feedbackScore: 0,
        completionRate: 0,
        avgSleepImprovement: 0,
        totalPoints: 0,
      },
    };

    setCampaigns((prev) => [...prev, campaign]);
    setIsCreateCampaignOpen(false);
    setNewCampaign({
      name: "",
      description: "",
      type: "",
      duration: "",
      targetDepartment: "",
      startDate: "",
      targetParticipants: 100,
    });
    setIsLoading(false);
    alert(`Campaign "${campaign.name}" created successfully!`);
  };

  const handleEditCampaign = async () => {
    if (!editingCampaign) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCampaigns((prev) =>
      prev.map((c) => (c.id === editingCampaign.id ? editingCampaign : c)),
    );

    setIsEditDialogOpen(false);
    setEditingCampaign(null);
    setIsLoading(false);
    alert("Campaign updated successfully!");
  };

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: Campaign["type"]) => {
    switch (type) {
      case "sleep-hygiene":
        return "🌙";
      case "exercise":
        return "🏃";
      case "nutrition":
        return "🥗";
      case "stress-management":
        return "🧘";
      default:
        return "📋";
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus =
      filterStatus === "all" || campaign.status === filterStatus;
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sleep-blue-50 via-background to-lavender-50">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/dashboard")}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="bg-lavender-500 p-2 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-foreground">
                Campaign Management
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                Create and manage wellness campaigns
              </p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? "List View" : "Grid View"}
            </Button>
            <Dialog
              open={isCreateCampaignOpen}
              onOpenChange={setIsCreateCampaignOpen}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-lavender-500 hover:bg-lavender-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">Create Campaign</span>
                  <span className="lg:hidden">Create</span>
                </Button>
              </DialogTrigger>
            </Dialog>
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
                  setIsCreateCampaignOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setViewMode(viewMode === "grid" ? "list" : "grid");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                {viewMode === "grid" ? "List View" : "Grid View"}
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Campaigns
              </CardTitle>
              <Target className="h-4 w-4 text-lavender-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-lavender-600">
                {campaigns.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {campaigns.filter((c) => c.status === "active").length} active
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Participants
              </CardTitle>
              <Users className="h-4 w-4 text-sleep-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-sleep-blue-600">
                {campaigns.reduce((acc, c) => acc + c.participants, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all campaigns
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Engagement
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-green-600">
                {Math.round(
                  campaigns.reduce((acc, c) => acc + c.engagement, 0) /
                    campaigns.filter((c) => c.status !== "draft").length || 0,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                Participation rate
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Improvement
              </CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-yellow-600">
                +
                {(
                  campaigns.reduce((acc, c) => acc + c.avgImprovementScore, 0) /
                    campaigns.filter((c) => c.status === "completed").length ||
                  0
                ).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                Sleep score points
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Campaigns List/Grid */}
        <Card>
          <CardHeader>
            <CardTitle>All Campaigns ({filteredCampaigns.length})</CardTitle>
            <CardDescription>
              Manage your organization's wellness initiatives
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No campaigns found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filters"
                    : "Get started by creating your first campaign"}
                </p>
                {!searchTerm && filterStatus === "all" && (
                  <Button
                    onClick={() => setIsCreateCampaignOpen(true)}
                    className="bg-lavender-500 hover:bg-lavender-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Campaign
                  </Button>
                )}
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {filteredCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className={`${
                      viewMode === "grid"
                        ? "p-4 border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                        : "flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-200 hover:shadow-md"
                    }`}
                    onClick={() =>
                      handleCampaignAction("View Details", campaign)
                    }
                  >
                    {viewMode === "grid" ? (
                      // Grid View
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="text-2xl">
                            {getTypeIcon(campaign.type)}
                          </div>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(campaign.status)}
                          >
                            {campaign.status}
                          </Badge>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-2">
                            {campaign.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {campaign.description}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Participants
                            </span>
                            <span className="font-medium">
                              {campaign.participants}/
                              {campaign.targetParticipants}
                            </span>
                          </div>
                          <Progress
                            value={
                              (campaign.participants /
                                campaign.targetParticipants) *
                              100
                            }
                            className="h-2"
                          />

                          {campaign.status !== "draft" && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Engagement
                              </span>
                              <span className="font-medium text-green-600">
                                {campaign.engagement}%
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCampaignAction("View Analytics", campaign);
                            }}
                            className="flex-1"
                          >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Analytics
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCampaignAction("Edit", campaign);
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCampaignAction("Duplicate", campaign);
                                }}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCampaignAction("Delete", campaign);
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <>
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="text-2xl flex-shrink-0">
                            {getTypeIcon(campaign.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                              <h4 className="font-medium text-lg">
                                {campaign.name}
                              </h4>
                              <Badge
                                variant="secondary"
                                className={getStatusColor(campaign.status)}
                              >
                                {campaign.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {campaign.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(
                                  campaign.startDate,
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                  campaign.endDate,
                                ).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {campaign.participants}/
                                {campaign.targetParticipants} participants
                              </span>
                              {campaign.status !== "draft" && (
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" />
                                  {campaign.engagement}% engagement
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 lg:mt-0 flex-shrink-0">
                          {campaign.status === "active" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCampaignAction("Pause", campaign);
                              }}
                              disabled={isLoading}
                            >
                              <Pause className="h-4 w-4" />
                            </Button>
                          )}
                          {campaign.status === "draft" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCampaignAction("Launch", campaign);
                              }}
                              disabled={isLoading}
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          {campaign.status === "paused" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCampaignAction("Resume", campaign);
                              }}
                              disabled={isLoading}
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCampaignAction("View Analytics", campaign);
                            }}
                          >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Analytics
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCampaignAction(
                                    "View Details",
                                    campaign,
                                  );
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCampaignAction("Edit", campaign);
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCampaignAction("Duplicate", campaign);
                                }}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCampaignAction("Delete", campaign);
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Campaign Dialog */}
      <Dialog
        open={isCreateCampaignOpen}
        onOpenChange={setIsCreateCampaignOpen}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Design a wellness campaign for your organization
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Name *</label>
                <Input
                  placeholder="e.g., 30-Day Sleep Challenge"
                  value={newCampaign.name}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Type *</label>
                <Select
                  value={newCampaign.type}
                  onValueChange={(value) =>
                    setNewCampaign({ ...newCampaign, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sleep-hygiene">
                      🌙 Sleep Hygiene
                    </SelectItem>
                    <SelectItem value="exercise">🏃 Exercise</SelectItem>
                    <SelectItem value="nutrition">🥗 Nutrition</SelectItem>
                    <SelectItem value="stress-management">
                      🧘 Stress Management
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe the campaign goals and activities..."
                value={newCampaign.description}
                onChange={(e) =>
                  setNewCampaign({
                    ...newCampaign,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration *</label>
                <Select
                  value={newCampaign.duration}
                  onValueChange={(value) =>
                    setNewCampaign({ ...newCampaign, duration: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="14">2 Weeks</SelectItem>
                    <SelectItem value="30">1 Month</SelectItem>
                    <SelectItem value="90">3 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={newCampaign.startDate}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Target Participants
                </label>
                <Input
                  type="number"
                  placeholder="100"
                  value={newCampaign.targetParticipants}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      targetParticipants: parseInt(e.target.value) || 100,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Department</label>
              <Select
                value={newCampaign.targetDepartment}
                onValueChange={(value) =>
                  setNewCampaign({
                    ...newCampaign,
                    targetDepartment: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCreateCampaignOpen(false)}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateCampaign}
                disabled={
                  isLoading ||
                  !newCampaign.name ||
                  !newCampaign.type ||
                  !newCampaign.duration
                }
                className="flex-1 bg-lavender-500 hover:bg-lavender-600"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </div>
                ) : (
                  "Create Campaign"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Campaign Detail View Dialog */}
      <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedCampaign && getTypeIcon(selectedCampaign.type)}
              {selectedCampaign?.name}
            </DialogTitle>
            <DialogDescription>
              Detailed view of campaign activities and progress
            </DialogDescription>
          </DialogHeader>

          {selectedCampaign && (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Campaign Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Status:
                        </span>
                        <Badge
                          className={`ml-2 ${getStatusColor(selectedCampaign.status)}`}
                        >
                          {selectedCampaign.status}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Duration:
                        </span>
                        <span className="ml-2 text-sm font-medium">
                          {new Date(
                            selectedCampaign.startDate,
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(
                            selectedCampaign.endDate,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Created by:
                        </span>
                        <span className="ml-2 text-sm font-medium">
                          {selectedCampaign.createdBy}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Departments:
                        </span>
                        <span className="ml-2 text-sm font-medium">
                          {selectedCampaign.departments.join(", ")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Progress Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Participants</span>
                          <span>
                            {selectedCampaign.participants}/
                            {selectedCampaign.targetParticipants}
                          </span>
                        </div>
                        <Progress
                          value={
                            (selectedCampaign.participants /
                              selectedCampaign.targetParticipants) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                      {selectedCampaign.status !== "draft" && (
                        <>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Engagement Rate</span>
                              <span>{selectedCampaign.engagement}%</span>
                            </div>
                            <Progress
                              value={selectedCampaign.engagement}
                              className="h-2"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-green-600">
                                {selectedCampaign.analytics.feedbackScore.toFixed(
                                  1,
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Feedback Score
                              </div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-blue-600">
                                +{selectedCampaign.avgImprovementScore}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Sleep Improvement
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedCampaign.description}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                <div className="space-y-3">
                  {selectedCampaign.activities.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium">{activity.title}</h5>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {activity.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">
                              Points: <strong>{activity.points}</strong>
                            </span>
                            <span className="text-muted-foreground">
                              Completion:{" "}
                              <strong>{activity.completionRate}%</strong>
                            </span>
                          </div>
                          <Progress
                            value={activity.completionRate}
                            className="w-20 h-2"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="participants" className="space-y-4">
                <div className="space-y-3">
                  {selectedCampaign.analytics.departmentBreakdown.map(
                    (dept) => (
                      <Card key={dept.department}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{dept.department}</h5>
                            <Badge variant="outline">
                              {dept.participants} participants
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Engagement: {dept.engagement}%
                            </span>
                            <Progress
                              value={dept.engagement}
                              className="w-24 h-2"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Campaign Analytics Dialog */}
      <Dialog open={isAnalyticsViewOpen} onOpenChange={setIsAnalyticsViewOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Campaign Analytics - {selectedCampaign?.name}
            </DialogTitle>
            <DialogDescription>
              Comprehensive analytics and performance metrics
            </DialogDescription>
          </DialogHeader>

          {selectedCampaign && selectedCampaign.status !== "draft" && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedCampaign.analytics.completionRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completion Rate
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedCampaign.analytics.feedbackScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Feedback Score
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedCampaign.analytics.totalPoints.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Points
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      +{selectedCampaign.analytics.avgSleepImprovement}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Sleep Improvement
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Department Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Department Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedCampaign.analytics.departmentBreakdown.map(
                      (dept) => (
                        <div
                          key={dept.department}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="font-medium">
                              {dept.department}
                            </span>
                            <Badge variant="outline">
                              {dept.participants} people
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {dept.engagement}% engagement
                            </span>
                            <Progress
                              value={dept.engagement}
                              className="w-24 h-2"
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Engagement Trend</CardTitle>
                  <CardDescription>
                    Daily participation over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end justify-between gap-2 p-4 bg-muted/30 rounded-lg">
                    {selectedCampaign.analytics.dailyEngagement.map(
                      (day, index) => (
                        <div
                          key={day.date}
                          className="flex flex-col items-center gap-1 flex-1"
                        >
                          <div
                            className="bg-blue-500 rounded-t min-w-[20px] transition-all duration-300"
                            style={{
                              height: `${(day.engagement / 100) * 120}px`,
                            }}
                          ></div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(day.date).getDate()}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    alert("Analytics export would be implemented here")
                  }
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAnalyticsViewOpen(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {selectedCampaign && selectedCampaign.status === "draft" && (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No Analytics Available
              </h3>
              <p className="text-muted-foreground">
                Analytics will be available once the campaign is launched and
                participants start engaging.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Update campaign details and settings
            </DialogDescription>
          </DialogHeader>

          {editingCampaign && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Name</label>
                  <Input
                    value={editingCampaign.name}
                    onChange={(e) =>
                      setEditingCampaign({
                        ...editingCampaign,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={editingCampaign.status}
                    onValueChange={(value: Campaign["status"]) =>
                      setEditingCampaign({ ...editingCampaign, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editingCampaign.description}
                  onChange={(e) =>
                    setEditingCampaign({
                      ...editingCampaign,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={editingCampaign.startDate}
                    onChange={(e) =>
                      setEditingCampaign({
                        ...editingCampaign,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={editingCampaign.endDate}
                    onChange={(e) =>
                      setEditingCampaign({
                        ...editingCampaign,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Target Participants
                </label>
                <Input
                  type="number"
                  value={editingCampaign.targetParticipants}
                  onChange={(e) =>
                    setEditingCampaign({
                      ...editingCampaign,
                      targetParticipants: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEditCampaign}
                  disabled={isLoading || !editingCampaign.name}
                  className="flex-1 bg-lavender-500 hover:bg-lavender-600"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
