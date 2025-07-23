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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  ArrowLeft,
  Target,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar as CalendarIcon,
  Star,
  Flag,
  Moon,
  Timer,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Goal {
  id: string;
  title: string;
  description: string;
  category:
    | "sleep-duration"
    | "sleep-quality"
    | "bedtime"
    | "wake-time"
    | "habits"
    | "general";
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  priority: "low" | "medium" | "high";
  status: "active" | "completed" | "paused";
  createdAt: string;
  streakDays: number;
  notes?: string;
}

interface DailyProgress {
  date: string;
  goalId: string;
  value: number;
  notes?: string;
}

export function EmployeeGoals() {
  const navigate = useNavigate();
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    targetValue: 0,
    unit: "",
    deadline: "",
    priority: "medium" as Goal["priority"],
    notes: "",
  });

  // Load pending goals from campaigns and merge with existing goals
  const loadPendingGoals = () => {
    const pendingGoals = JSON.parse(
      localStorage.getItem("pending-goals") || "[]",
    );
    if (pendingGoals.length > 0) {
      const convertedGoals = pendingGoals.map((pg: any) => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: pg.title,
        description: pg.description,
        category: pg.category,
        targetValue: pg.targetValue,
        currentValue: 0,
        unit: pg.unit,
        deadline: pg.deadline,
        priority: pg.priority,
        status: "active" as const,
        createdAt: new Date().toISOString(),
        streakDays: 0,
        notes: "Converted from campaign",
      }));

      // Clear pending goals
      localStorage.removeItem("pending-goals");

      return convertedGoals;
    }
    return [];
  };

  // Mock goals data
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Get 8 Hours of Sleep",
      description:
        "Consistently sleep for 8 hours each night to improve energy and productivity",
      category: "sleep-duration",
      targetValue: 8,
      currentValue: 7.2,
      unit: "hours",
      deadline: "2024-02-15",
      priority: "high",
      status: "active",
      createdAt: "2024-01-01",
      streakDays: 5,
      notes: "Focus on getting to bed by 10 PM",
    },
    {
      id: "2",
      title: "Consistent Bedtime",
      description: "Go to bed at the same time every night",
      category: "bedtime",
      targetValue: 22,
      currentValue: 22.5,
      unit: "hours",
      deadline: "2024-02-01",
      priority: "medium",
      status: "active",
      createdAt: "2024-01-05",
      streakDays: 3,
    },
    {
      id: "3",
      title: "Improve Sleep Quality Score",
      description: "Achieve a sleep quality score of 85 or higher",
      category: "sleep-quality",
      targetValue: 85,
      currentValue: 78,
      unit: "score",
      deadline: "2024-03-01",
      priority: "high",
      status: "active",
      createdAt: "2024-01-10",
      streakDays: 7,
    },
    {
      id: "4",
      title: "No Screen Time Before Bed",
      description: "Avoid screens for 1 hour before bedtime",
      category: "habits",
      targetValue: 7,
      currentValue: 7,
      unit: "days/week",
      deadline: "2024-01-31",
      priority: "medium",
      status: "completed",
      createdAt: "2024-01-01",
      streakDays: 14,
    },
    ...loadPendingGoals(),
  ]);

  // Mock progress data
  const dailyProgress: DailyProgress[] = [
    {
      date: "2024-01-15",
      goalId: "1",
      value: 7.5,
      notes: "Felt well-rested",
    },
    {
      date: "2024-01-15",
      goalId: "2",
      value: 22,
      notes: "On time tonight",
    },
  ];

  const getCategoryIcon = (category: Goal["category"]) => {
    switch (category) {
      case "sleep-duration":
        return Timer;
      case "sleep-quality":
        return Star;
      case "bedtime":
      case "wake-time":
        return Clock;
      case "habits":
        return Zap;
      default:
        return Target;
    }
  };

  const getCategoryColor = (category: Goal["category"]) => {
    switch (category) {
      case "sleep-duration":
        return "bg-blue-100 text-blue-800";
      case "sleep-quality":
        return "bg-yellow-100 text-yellow-800";
      case "bedtime":
      case "wake-time":
        return "bg-purple-100 text-purple-800";
      case "habits":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: Goal["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: Goal["status"]) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateProgress = (goal: Goal) => {
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCreateGoal = () => {
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category as Goal["category"],
      targetValue: newGoal.targetValue,
      currentValue: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      priority: newGoal.priority,
      status: "active",
      createdAt: new Date().toISOString(),
      streakDays: 0,
      notes: newGoal.notes,
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: "",
      description: "",
      category: "",
      targetValue: 0,
      unit: "",
      deadline: "",
      priority: "medium",
      notes: "",
    });
    setIsCreateGoalOpen(false);
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter((g) => g.id !== goalId));
  };

  const handleEditGoal = () => {
    if (!editingGoal) return;

    setGoals(
      goals.map((g) =>
        g.id === editingGoal.id
          ? {
              ...editingGoal,
            }
          : g,
      ),
    );

    setEditingGoal(null);
    setIsEditGoalOpen(false);
  };

  const handleStartEdit = (goal: Goal) => {
    setEditingGoal({ ...goal });
    setIsEditGoalOpen(true);
  };

  const handleToggleGoalStatus = (goalId: string) => {
    setGoals(
      goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              status:
                g.status === "active"
                  ? "completed"
                  : g.status === "completed"
                    ? "active"
                    : g.status,
            }
          : g,
      ),
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

  const activeGoals = goals.filter((g) => g.status === "active");
  const completedGoals = goals.filter((g) => g.status === "completed");

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
            <div className="bg-green-500 p-2 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">
                Sleep Goals
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                Set and track your sleep improvement goals
              </p>
            </div>
          </div>

          <Dialog open={isCreateGoalOpen} onOpenChange={setIsCreateGoalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-lavender-500 hover:bg-lavender-600">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">New Goal</span>
                <span className="md:hidden">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>
                  Set a specific, measurable goal to improve your sleep habits
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Goal Title</label>
                    <Input
                      placeholder="e.g., Sleep 8 hours nightly"
                      value={newGoal.title}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) =>
                        setNewGoal({ ...newGoal, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sleep-duration">
                          Sleep Duration
                        </SelectItem>
                        <SelectItem value="sleep-quality">
                          Sleep Quality
                        </SelectItem>
                        <SelectItem value="bedtime">Bedtime</SelectItem>
                        <SelectItem value="wake-time">Wake Time</SelectItem>
                        <SelectItem value="habits">Sleep Habits</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe your goal and why it's important..."
                    value={newGoal.description}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Value</label>
                    <Input
                      type="number"
                      placeholder="8"
                      value={newGoal.targetValue || ""}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          targetValue: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Unit</label>
                    <Input
                      placeholder="hours, score, days/week"
                      value={newGoal.unit}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, unit: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select
                      value={newGoal.priority}
                      onValueChange={(value) =>
                        setNewGoal({
                          ...newGoal,
                          priority: value as Goal["priority"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Deadline</label>
                  <Input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, deadline: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Notes (Optional)
                  </label>
                  <Textarea
                    placeholder="Any additional notes or strategies..."
                    value={newGoal.notes}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, notes: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateGoalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateGoal}
                    disabled={
                      !newGoal.title ||
                      !newGoal.category ||
                      !newGoal.targetValue ||
                      !newGoal.unit
                    }
                    className="flex-1 bg-lavender-500 hover:bg-lavender-600"
                  >
                    Create Goal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Goals
              </CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {activeGoals.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {goals.length} total goals
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {completedGoals.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {goals.length > 0
                  ? Math.round((completedGoals.length / goals.length) * 100)
                  : 0}
                % completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {Math.max(...goals.map((g) => g.streakDays), 0)}
              </div>
              <p className="text-xs text-muted-foreground">days in a row</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <CalendarIcon className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">5</div>
              <p className="text-xs text-muted-foreground">goals updated</p>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-lavender-500" />
              Welcome back, {getUserName()}!
            </CardTitle>
            <CardDescription>
              Track your progress and stay motivated with personalized sleep
              goals. Small, consistent improvements lead to better sleep and
              increased productivity.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Active Goals</CardTitle>
              <CardDescription>
                Your current sleep improvement goals and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeGoals.map((goal) => {
                  const IconComponent = getCategoryIcon(goal.category);
                  const progress = calculateProgress(goal);
                  const daysLeft = getDaysUntilDeadline(goal.deadline);

                  return (
                    <div
                      key={goal.id}
                      className="border border-border rounded-lg p-4 hover:bg-muted/50 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                            <h4 className="font-medium">{goal.title}</h4>
                            <Badge
                              variant="secondary"
                              className={getCategoryColor(goal.category)}
                            >
                              {goal.category.replace("-", " ")}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={getPriorityColor(goal.priority)}
                            >
                              {goal.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {goal.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStartEdit(goal)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleGoalStatus(goal.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            Progress: {goal.currentValue} / {goal.targetValue}{" "}
                            {goal.unit}
                          </span>
                          <span className="font-medium">
                            {progress.toFixed(0)}%
                          </span>
                        </div>

                        <Progress value={progress} className="h-2" />

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {daysLeft > 0
                                ? `${daysLeft} days left`
                                : daysLeft === 0
                                  ? "Due today"
                                  : `${Math.abs(daysLeft)} days overdue`}
                            </span>
                            <span className="flex items-center gap-1">
                              <Flag className="h-3 w-3" />
                              {goal.streakDays} day streak
                            </span>
                          </div>
                          <span>
                            Created{" "}
                            {new Date(goal.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {goal.notes && (
                          <div className="bg-muted/50 p-2 rounded text-sm">
                            <strong>Notes:</strong> {goal.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Completed Goals
              </CardTitle>
              <CardDescription>
                Celebrate your achievements and see what you've accomplished
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedGoals.map((goal) => {
                  const IconComponent = getCategoryIcon(goal.category);

                  return (
                    <div
                      key={goal.id}
                      className="border border-green-200 bg-green-50 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="h-4 w-4 text-green-600" />
                        <h4 className="font-medium text-green-800">
                          {goal.title}
                        </h4>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-green-700 mb-2">
                        {goal.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-green-600">
                        <span>
                          Target: {goal.targetValue} {goal.unit}
                        </span>
                        <span>Streak: {goal.streakDays} days</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common goal templates to get you started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Sleep 8 Hours",
                  description: "Get consistent 8-hour sleep",
                  category: "sleep-duration",
                  icon: Timer,
                },
                {
                  title: "Fixed Bedtime",
                  description: "Go to bed at the same time",
                  category: "bedtime",
                  icon: Clock,
                },
                {
                  title: "No Screens Before Bed",
                  description: "Digital detox 1 hour before sleep",
                  category: "habits",
                  icon: Zap,
                },
              ].map((template, index) => {
                const IconComponent = template.icon;
                return (
                  <Card
                    key={index}
                    className="cursor-pointer hover:bg-muted/50 hover:shadow-md transition-all duration-200"
                    onClick={() => {
                      setNewGoal({
                        ...newGoal,
                        title: template.title,
                        description: template.description,
                        category: template.category,
                      });
                      setIsCreateGoalOpen(true);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-lavender-100 p-2 rounded-lg">
                          <IconComponent className="h-5 w-5 text-lavender-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{template.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Goal Dialog */}
      <Dialog open={isEditGoalOpen} onOpenChange={setIsEditGoalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>
              Update your goal details and progress
            </DialogDescription>
          </DialogHeader>

          {editingGoal && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Goal Title</label>
                  <Input
                    placeholder="e.g., Sleep 8 hours nightly"
                    value={editingGoal.title}
                    onChange={(e) =>
                      setEditingGoal({ ...editingGoal, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={editingGoal.status}
                    onValueChange={(value) =>
                      setEditingGoal({
                        ...editingGoal,
                        status: value as Goal["status"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe your goal..."
                  value={editingGoal.description}
                  onChange={(e) =>
                    setEditingGoal({
                      ...editingGoal,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Value</label>
                  <Input
                    type="number"
                    value={editingGoal.currentValue || ""}
                    onChange={(e) =>
                      setEditingGoal({
                        ...editingGoal,
                        currentValue: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Value</label>
                  <Input
                    type="number"
                    value={editingGoal.targetValue || ""}
                    onChange={(e) =>
                      setEditingGoal({
                        ...editingGoal,
                        targetValue: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select
                    value={editingGoal.priority}
                    onValueChange={(value) =>
                      setEditingGoal({
                        ...editingGoal,
                        priority: value as Goal["priority"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Deadline</label>
                <Input
                  type="date"
                  value={editingGoal.deadline}
                  onChange={(e) =>
                    setEditingGoal({ ...editingGoal, deadline: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes (Optional)</label>
                <Textarea
                  placeholder="Any additional notes or strategies..."
                  value={editingGoal.notes || ""}
                  onChange={(e) =>
                    setEditingGoal({ ...editingGoal, notes: e.target.value })
                  }
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditGoalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEditGoal}
                  disabled={!editingGoal.title || !editingGoal.targetValue}
                  className="flex-1 bg-lavender-500 hover:bg-lavender-600"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
