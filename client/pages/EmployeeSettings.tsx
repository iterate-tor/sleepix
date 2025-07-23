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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import {
  ArrowLeft,
  Settings,
  User,
  Bell,
  Moon,
  Smartphone,
  Save,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EmployeeSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // Get user data from localStorage
  const getUserData = () => {
    const userData = localStorage.getItem("sleepfix-user");
    if (userData) {
      return JSON.parse(userData);
    }
    return {
      name: "John Employee",
      email: "employee@company.com",
      gender: "male",
      sleepGoal: "better-quality",
    };
  };

  const [settings, setSettings] = useState({
    // Profile settings
    ...getUserData(),

    // Sleep preferences
    bedtimeReminder: true,
    bedtimeHour: "22:00",
    wakeupReminder: true,
    wakeupHour: "06:30",
    sleepGoalHours: "8",

    // Notifications
    dailyCheckIns: true,
    campaignUpdates: true,
    weeklyReports: true,
    achievementNotifications: true,

    // Privacy
    shareDataWithTeam: true,
    includeInAggregates: true,
    dataVisibility: "anonymous",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    // Update localStorage with new profile data
    const userData = {
      name: settings.name,
      email: settings.email,
      gender: settings.gender,
      sleepGoal: settings.sleepGoal,
    };
    localStorage.setItem("sleepfix-user", JSON.stringify(userData));
    alert("Settings saved successfully!");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "sleep", label: "Sleep", icon: Moon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Smartphone },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={settings.name}
                    onChange={(e) =>
                      handleSettingChange("name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      handleSettingChange("email", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <Select
                    value={settings.gender}
                    onValueChange={(value) =>
                      handleSettingChange("gender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sleep Goal</label>
                  <Select
                    value={settings.sleepGoal}
                    onValueChange={(value) =>
                      handleSettingChange("sleepGoal", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fall-asleep-faster">
                        Fall asleep faster
                      </SelectItem>
                      <SelectItem value="sleep-longer">Sleep longer</SelectItem>
                      <SelectItem value="better-quality">
                        Improve sleep quality
                      </SelectItem>
                      <SelectItem value="consistent-schedule">
                        Maintain consistent schedule
                      </SelectItem>
                      <SelectItem value="reduce-fatigue">
                        Reduce daytime fatigue
                      </SelectItem>
                      <SelectItem value="stress-management">
                        Better stress management
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Current Password
                  </label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>
              <Button variant="outline" className="mt-4">
                Update Password
              </Button>
            </div>
          </div>
        );

      case "sleep":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Sleep Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Bedtime Reminder</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when it's time to wind down
                      </p>
                    </div>
                    <Switch
                      checked={settings.bedtimeReminder}
                      onCheckedChange={(checked) =>
                        handleSettingChange("bedtimeReminder", checked)
                      }
                    />
                  </div>
                  {settings.bedtimeReminder && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Bedtime Hour
                      </label>
                      <Select
                        value={settings.bedtimeHour}
                        onValueChange={(value) =>
                          handleSettingChange("bedtimeHour", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="20:30">8:30 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="21:30">9:30 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                          <SelectItem value="22:30">10:30 PM</SelectItem>
                          <SelectItem value="23:00">11:00 PM</SelectItem>
                          <SelectItem value="23:30">11:30 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Wake-up Reminder</p>
                      <p className="text-sm text-muted-foreground">
                        Morning motivation and sleep summary
                      </p>
                    </div>
                    <Switch
                      checked={settings.wakeupReminder}
                      onCheckedChange={(checked) =>
                        handleSettingChange("wakeupReminder", checked)
                      }
                    />
                  </div>
                  {settings.wakeupReminder && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Wake-up Hour
                      </label>
                      <Select
                        value={settings.wakeupHour}
                        onValueChange={(value) =>
                          handleSettingChange("wakeupHour", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="05:30">5:30 AM</SelectItem>
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                          <SelectItem value="06:30">6:30 AM</SelectItem>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="07:30">7:30 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="08:30">8:30 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Sleep Goals</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Target Sleep Duration
                  </label>
                  <Select
                    value={settings.sleepGoalHours}
                    onValueChange={(value) =>
                      handleSettingChange("sleepGoalHours", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="6.5">6.5 hours</SelectItem>
                      <SelectItem value="7">7 hours</SelectItem>
                      <SelectItem value="7.5">7.5 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="8.5">8.5 hours</SelectItem>
                      <SelectItem value="9">9 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Recommended: 7-9 hours for adults
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Moon className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Sleep Tips</h4>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• Maintain consistent sleep and wake times</li>
                        <li>• Create a relaxing bedtime routine</li>
                        <li>• Avoid screens 1 hour before bed</li>
                        <li>• Keep your bedroom cool and dark</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">
                Notification Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Check-ins</p>
                    <p className="text-sm text-muted-foreground">
                      Daily prompts to log your sleep and mood
                    </p>
                  </div>
                  <Switch
                    checked={settings.dailyCheckIns}
                    onCheckedChange={(checked) =>
                      handleSettingChange("dailyCheckIns", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Campaign Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Notifications about new campaigns and challenges
                    </p>
                  </div>
                  <Switch
                    checked={settings.campaignUpdates}
                    onCheckedChange={(checked) =>
                      handleSettingChange("campaignUpdates", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">
                      Your weekly sleep summary and insights
                    </p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) =>
                      handleSettingChange("weeklyReports", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Achievement Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Celebrate your sleep improvement milestones
                    </p>
                  </div>
                  <Switch
                    checked={settings.achievementNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("achievementNotifications", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Data Privacy</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Share Data with Team</p>
                    <p className="text-sm text-muted-foreground">
                      Allow your anonymized data to contribute to team insights
                    </p>
                  </div>
                  <Switch
                    checked={settings.shareDataWithTeam}
                    onCheckedChange={(checked) =>
                      handleSettingChange("shareDataWithTeam", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Include in Aggregates</p>
                    <p className="text-sm text-muted-foreground">
                      Include your data in company-wide sleep statistics
                    </p>
                  </div>
                  <Switch
                    checked={settings.includeInAggregates}
                    onCheckedChange={(checked) =>
                      handleSettingChange("includeInAggregates", checked)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Visibility</label>
                  <Select
                    value={settings.dataVisibility}
                    onValueChange={(value) =>
                      handleSettingChange("dataVisibility", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">
                        Private - Only you can see your data
                      </SelectItem>
                      <SelectItem value="anonymous">
                        Anonymous - Data used for insights only
                      </SelectItem>
                      <SelectItem value="team">
                        Team - Share with your immediate team
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Control how your sleep data is shared and used
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">
                    Privacy Information
                  </h4>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• Your personal sleep data is always encrypted</li>
                    <li>• Individual data is never shared with managers</li>
                    <li>• You can export or delete your data anytime</li>
                    <li>
                      • Only aggregated, anonymous insights are used for
                      reporting
                    </li>
                  </ul>
                  <Button variant="link" className="text-yellow-700 p-0 mt-2">
                    Read our full Privacy Policy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="bg-lavender-500 p-2 rounded-xl">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">
                Manage your account and preferences
              </p>
            </div>
          </div>

          <Button
            onClick={handleSaveSettings}
            className="bg-lavender-500 hover:bg-lavender-600"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                          activeTab === tab.id
                            ? "bg-lavender-50 text-lavender-700 border-r-2 border-lavender-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {tabs.find((tab) => tab.id === activeTab)?.label}
                </CardTitle>
                <CardDescription>
                  {activeTab === "profile" &&
                    "Update your personal information and sleep goals"}
                  {activeTab === "sleep" &&
                    "Configure your sleep schedule and preferences"}
                  {activeTab === "notifications" &&
                    "Choose when and how you receive notifications"}
                  {activeTab === "privacy" &&
                    "Control your data privacy and sharing settings"}
                </CardDescription>
              </CardHeader>
              <CardContent>{renderTabContent()}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
