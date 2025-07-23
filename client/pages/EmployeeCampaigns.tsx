import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
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
  ArrowLeft,
  Target,
  Users,
  Calendar,
  Trophy,
  Play,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Heart,
  Moon,
  Award,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Campaign {
  id: string;
  title: string;
  description: string;
  type: "challenge" | "education" | "habit-building" | "assessment";
  category: "sleep" | "wellness" | "productivity" | "stress";
  duration: number; // days
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants?: number;
  status: "upcoming" | "active" | "completed";
  difficulty: "beginner" | "intermediate" | "advanced";
  rewards: string[];
  activities: CampaignActivity[];
  userParticipation?: {
    isParticipating: boolean;
    progress: number;
    completedActivities: number;
    points: number;
    rank?: number;
  };
  organizer: string;
  tags: string[];
}

interface CampaignActivity {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "milestone" | "optional";
  points: number;
  completed?: boolean;
  dueDate?: string;
}

export function EmployeeCampaigns() {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Mock campaigns data with useState for dynamic updates
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "7 Days to Better Sleep",
      description:
        "Transform your sleep habits with daily challenges and expert guidance. Build a foundation for better rest and improved productivity.",
      type: "challenge",
      category: "sleep",
      duration: 7,
      startDate: "2024-01-15",
      endDate: "2024-01-22",
      participants: 156,
      maxParticipants: 200,
      status: "active",
      difficulty: "beginner",
      rewards: ["Sleep Quality Badge", "30 Wellness Points", "Custom Report"],
      organizer: "Sleep Wellness Team",
      tags: ["sleep-hygiene", "habits", "beginner-friendly"],
      userParticipation: {
        isParticipating: true,
        progress: 43,
        completedActivities: 3,
        points: 85,
        rank: 23,
      },
      activities: [
        {
          id: "1",
          title: "Set a Consistent Bedtime",
          description: "Choose a bedtime and stick to it for the entire week",
          type: "daily",
          points: 10,
          completed: true,
        },
        {
          id: "2",
          title: "Digital Sunset",
          description: "Turn off all screens 1 hour before your chosen bedtime",
          type: "daily",
          points: 15,
          completed: true,
        },
        {
          id: "3",
          title: "Create a Bedtime Routine",
          description: "Develop a 30-minute relaxing routine before sleep",
          type: "weekly",
          points: 25,
          completed: false,
        },
      ],
    },
    {
      id: "2",
      title: "Power Nap Mastery",
      description:
        "Learn the science and art of effective power napping to boost afternoon energy and productivity.",
      type: "education",
      category: "productivity",
      duration: 14,
      startDate: "2024-01-10",
      endDate: "2024-01-24",
      participants: 89,
      maxParticipants: 150,
      status: "active",
      difficulty: "intermediate",
      rewards: ["Nap Expert Badge", "50 Wellness Points", "Sleep Tracker"],
      organizer: "Productivity Team",
      tags: ["power-naps", "energy", "productivity"],
      userParticipation: {
        isParticipating: false,
        progress: 0,
        completedActivities: 0,
        points: 0,
      },
      activities: [
        {
          id: "1",
          title: "Understanding Nap Science",
          description:
            "Complete the educational module on optimal nap duration",
          type: "milestone",
          points: 20,
        },
        {
          id: "2",
          title: "Practice Short Naps",
          description: "Take 10-20 minute naps for 5 consecutive days",
          type: "daily",
          points: 15,
        },
      ],
    },
    {
      id: "3",
      title: "Mindful Evening Routine",
      description:
        "Develop mindfulness practices for better sleep and stress reduction through guided evening routines.",
      type: "habit-building",
      category: "wellness",
      duration: 21,
      startDate: "2024-02-01",
      endDate: "2024-02-22",
      participants: 67,
      status: "upcoming",
      difficulty: "intermediate",
      rewards: [
        "Mindfulness Master Badge",
        "75 Wellness Points",
        "Meditation Guide",
      ],
      organizer: "Wellness Team",
      tags: ["mindfulness", "stress-relief", "evening-routine"],
      activities: [
        {
          id: "1",
          title: "5-Minute Meditation",
          description: "Practice guided meditation before bed",
          type: "daily",
          points: 10,
        },
        {
          id: "2",
          title: "Gratitude Journaling",
          description: "Write 3 things you're grateful for each evening",
          type: "daily",
          points: 5,
        },
      ],
    },
    {
      id: "4",
      title: "Sleep Quality Assessment Challenge",
      description:
        "Complete comprehensive sleep assessments and track improvements over 30 days.",
      type: "assessment",
      category: "sleep",
      duration: 30,
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      participants: 203,
      status: "completed",
      difficulty: "beginner",
      rewards: [
        "Assessment Pro Badge",
        "100 Wellness Points",
        "Personal Sleep Report",
      ],
      organizer: "Sleep Research Team",
      tags: ["assessment", "tracking", "data-driven"],
      userParticipation: {
        isParticipating: true,
        progress: 100,
        completedActivities: 8,
        points: 180,
        rank: 15,
      },
      activities: [
        {
          id: "1",
          title: "Complete PSQI Assessment",
          description: "Take the Pittsburgh Sleep Quality Index",
          type: "milestone",
          points: 25,
          completed: true,
        },
        {
          id: "2",
          title: "Daily Sleep Logging",
          description: "Log your sleep data for 30 consecutive days",
          type: "daily",
          points: 5,
          completed: true,
        },
      ],
    },
  ]);

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: Campaign["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: Campaign["category"]) => {
    switch (category) {
      case "sleep":
        return Moon;
      case "wellness":
        return Heart;
      case "productivity":
        return Zap;
      case "stress":
        return Target;
      default:
        return Star;
    }
  };

  const handleJoinCampaign = (campaignId: string) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === campaignId
          ? {
              ...c,
              participants: c.participants + 1,
              userParticipation: {
                isParticipating: true,
                progress: 0,
                completedActivities: 0,
                points: 0,
              },
            }
          : c,
      ),
    );
    alert(`Successfully joined campaign! Welcome aboard!`);
  };

  const handleLeaveCampaign = (campaignId: string) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === campaignId
          ? {
              ...c,
              participants: Math.max(0, c.participants - 1),
              userParticipation: {
                isParticipating: false,
                progress: 0,
                completedActivities: 0,
                points: 0,
              },
            }
          : c,
      ),
    );
    alert(`Left campaign. You can rejoin anytime.`);
  };

  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDetailsOpen(true);
  };

  const handleConvertToGoal = (campaign: Campaign) => {
    const goal = {
      title: `Complete: ${campaign.title}`,
      description: `Personal goal based on campaign: ${campaign.description}`,
      category: campaign.category === "sleep" ? "sleep-duration" : "general",
      targetValue: campaign.duration,
      unit: "days",
      deadline: campaign.endDate,
      priority: "medium" as const,
    };

    // In a real app, this would navigate to goals page with pre-filled data
    // For now, we'll store it in localStorage and show a success message
    const existingGoals = JSON.parse(
      localStorage.getItem("pending-goals") || "[]",
    );
    existingGoals.push(goal);
    localStorage.setItem("pending-goals", JSON.stringify(existingGoals));

    alert(
      `Campaign "${campaign.title}" has been converted to a personal goal! \n\nYou can find it in your Goals page to customize and track.`,
    );
  };

  const getUserName = () => {
    const userData = localStorage.getItem("sleepfix-user");
    if (userData) {
      const user = JSON.parse(userData);
      return user.name.split(" ")[0];
    }
    return "User";
  };

  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const upcomingCampaigns = campaigns.filter((c) => c.status === "upcoming");
  const completedCampaigns = campaigns.filter((c) => c.status === "completed");
  const myCampaigns = campaigns.filter(
    (c) => c.userParticipation?.isParticipating,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sleep-blue-50 via-background to-lavender-50">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="mr-2 md:mr-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="bg-purple-500 p-2 rounded-xl">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">
                Wellness Campaigns
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                Join team challenges and track your progress
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Welcome and Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Welcome {getUserName()}!
            </CardTitle>
            <CardDescription>
              Join wellness campaigns to improve your sleep, build healthy
              habits, and compete with your colleagues in a fun, supportive
              environment.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                My Campaigns
              </CardTitle>
              <UserCheck className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {myCampaigns.length}
              </div>
              <p className="text-xs text-muted-foreground">Active campaigns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Points
              </CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {myCampaigns.reduce(
                  (total, c) => total + (c.userParticipation?.points || 0),
                  0,
                )}
              </div>
              <p className="text-xs text-muted-foreground">Wellness points</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Best Rank</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                #
                {Math.min(
                  ...myCampaigns
                    .filter((c) => c.userParticipation?.rank)
                    .map((c) => c.userParticipation!.rank!),
                  99,
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                In active campaigns
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {myCampaigns.filter((c) => c.status === "completed").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Finished campaigns
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="my">My Campaigns</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {campaigns.map((campaign) => {
                const IconComponent = getCategoryIcon(campaign.category);
                const isParticipating =
                  campaign.userParticipation?.isParticipating;

                return (
                  <Card
                    key={campaign.id}
                    className={`relative transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                      isParticipating ? "ring-2 ring-purple-200" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                            <CardTitle className="text-lg">
                              {campaign.title}
                            </CardTitle>
                          </div>
                          <CardDescription className="mb-3">
                            {campaign.description}
                          </CardDescription>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="secondary"
                          className={getStatusColor(campaign.status)}
                        >
                          {campaign.status}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={getDifficultyColor(campaign.difficulty)}
                        >
                          {campaign.difficulty}
                        </Badge>
                        <Badge variant="outline">{campaign.category}</Badge>
                        {isParticipating && (
                          <Badge className="bg-purple-100 text-purple-800">
                            Participating
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.duration} days</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {campaign.participants}
                            {campaign.maxParticipants &&
                              ` / ${campaign.maxParticipants}`}{" "}
                            participants
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(campaign.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.rewards.length} rewards</span>
                        </div>
                      </div>

                      {isParticipating && campaign.userParticipation && (
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              Your Progress
                            </span>
                            <span className="text-sm text-purple-600">
                              {campaign.userParticipation.progress}%
                            </span>
                          </div>
                          <Progress
                            value={campaign.userParticipation.progress}
                            className="h-2 mb-2"
                          />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>
                              {campaign.userParticipation.completedActivities}{" "}
                              activities completed
                            </span>
                            <span>
                              {campaign.userParticipation.points} points
                            </span>
                          </div>
                          {campaign.userParticipation.rank && (
                            <div className="text-sm font-medium text-purple-600 mt-1">
                              Rank #{campaign.userParticipation.rank}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleViewDetails(campaign)}
                            className="flex-1"
                          >
                            View Details
                          </Button>
                          {campaign.status === "active" && (
                            <>
                              {isParticipating ? (
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleLeaveCampaign(campaign.id)
                                  }
                                  className="flex-1"
                                >
                                  Leave
                                </Button>
                              ) : (
                                <Button
                                  onClick={() =>
                                    handleJoinCampaign(campaign.id)
                                  }
                                  className="flex-1 bg-purple-500 hover:bg-purple-600"
                                >
                                  <Play className="h-4 w-4 mr-2" />
                                  Join
                                </Button>
                              )}
                            </>
                          )}
                          {campaign.status === "upcoming" && (
                            <Button
                              variant="outline"
                              className="flex-1"
                              disabled
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              Coming Soon
                            </Button>
                          )}
                        </div>
                        {(campaign.status === "active" ||
                          campaign.status === "upcoming") && (
                          <Button
                            variant="outline"
                            onClick={() => handleConvertToGoal(campaign)}
                            className="w-full"
                          >
                            <Target className="h-4 w-4 mr-2" />
                            Convert to Personal Goal
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="my" className="space-y-4">
            {myCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {myCampaigns.map((campaign) => {
                  const IconComponent = getCategoryIcon(campaign.category);

                  return (
                    <Card
                      key={campaign.id}
                      className="ring-2 ring-purple-200 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="h-5 w-5 text-purple-600" />
                          <CardTitle className="text-lg">
                            {campaign.title}
                          </CardTitle>
                          <Badge className="bg-purple-100 text-purple-800">
                            Participating
                          </Badge>
                        </div>
                        <CardDescription>
                          {campaign.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {campaign.userParticipation && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Progress
                              </span>
                              <span className="text-sm text-purple-600">
                                {campaign.userParticipation.progress}%
                              </span>
                            </div>
                            <Progress
                              value={campaign.userParticipation.progress}
                              className="h-2"
                            />
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  Activities:
                                </span>{" "}
                                {campaign.userParticipation.completedActivities}
                                /{campaign.activities.length}
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Points:
                                </span>{" "}
                                {campaign.userParticipation.points}
                              </div>
                            </div>
                            {campaign.userParticipation.rank && (
                              <div className="text-center bg-purple-50 p-2 rounded-lg">
                                <span className="text-lg font-bold text-purple-600">
                                  Rank #{campaign.userParticipation.rank}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="space-y-2">
                          <Button
                            onClick={() => handleViewDetails(campaign)}
                            className="w-full bg-purple-500 hover:bg-purple-600"
                          >
                            Continue Campaign
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleConvertToGoal(campaign)}
                            className="w-full"
                          >
                            <Target className="h-4 w-4 mr-2" />
                            Convert to Personal Goal
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No Active Campaigns
                  </h3>
                  <p className="text-muted-foreground">
                    Join a campaign to start improving your wellness and compete
                    with colleagues!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="p-6">
                    <h3 className="font-medium">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {campaign.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      {campaign.participants} participants
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="p-6">
                    <h3 className="font-medium">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {campaign.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      Starts {new Date(campaign.startDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Campaign Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {(() => {
                    const IconComponent = getCategoryIcon(
                      selectedCampaign.category,
                    );
                    return <IconComponent className="h-6 w-6" />;
                  })()}
                  {selectedCampaign.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedCampaign.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Campaign Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Duration</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedCampaign.duration} days
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Participants</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedCampaign.participants}
                      {selectedCampaign.maxParticipants &&
                        ` / ${selectedCampaign.maxParticipants}`}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Organizer</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedCampaign.organizer}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Status</h4>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(selectedCampaign.status)}
                    >
                      {selectedCampaign.status}
                    </Badge>
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <h4 className="font-medium mb-3">Campaign Activities</h4>
                  <div className="space-y-3">
                    {selectedCampaign.activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="border border-border rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{activity.title}</h5>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {activity.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {activity.points} pts
                            </Badge>
                            {activity.completed && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rewards */}
                <div>
                  <h4 className="font-medium mb-3">Rewards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedCampaign.rewards.map((reward, index) => (
                      <div
                        key={index}
                        className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center"
                      >
                        <Award className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">{reward}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {selectedCampaign.status === "active" && (
                      <>
                        {selectedCampaign.userParticipation?.isParticipating ? (
                          <Button
                            variant="outline"
                            onClick={() => {
                              handleLeaveCampaign(selectedCampaign.id);
                              setIsDetailsOpen(false);
                            }}
                            className="flex-1"
                          >
                            Leave Campaign
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              handleJoinCampaign(selectedCampaign.id);
                              setIsDetailsOpen(false);
                            }}
                            className="flex-1 bg-purple-500 hover:bg-purple-600"
                          >
                            Join Campaign
                          </Button>
                        )}
                      </>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => setIsDetailsOpen(false)}
                      className="flex-1"
                    >
                      Close
                    </Button>
                  </div>
                  {(selectedCampaign.status === "active" ||
                    selectedCampaign.status === "upcoming") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleConvertToGoal(selectedCampaign);
                        setIsDetailsOpen(false);
                      }}
                      className="w-full"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Convert to Personal Goal
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
