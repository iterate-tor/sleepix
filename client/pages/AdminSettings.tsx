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
  Shield,
  Bell,
  Database,
  Mail,
  Key,
  Save,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AdminSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    // Profile settings
    adminName: "Admin User",
    adminEmail: "admin@company.com",
    organization: "Acme Corporation",
    timezone: "America/New_York",

    // Notifications
    emailNotifications: true,
    weeklyReports: true,
    alertsEnabled: true,
    lowEngagementAlerts: true,

    // Privacy & Security
    dataRetention: "12-months",
    anonymizeData: true,
    twoFactorAuth: false,
    sessionTimeout: "8-hours",

    // Integration settings
    slackIntegration: false,
    teamsIntegration: false,
    emailIntegration: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "integrations", label: "Integrations", icon: Database },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={settings.adminName}
                    onChange={(e) =>
                      handleSettingChange("adminName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) =>
                      handleSettingChange("adminEmail", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization</label>
                  <Input
                    value={settings.organization}
                    onChange={(e) =>
                      handleSettingChange("organization", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timezone</label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) =>
                      handleSettingChange("timezone", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">
                        Eastern Time
                      </SelectItem>
                      <SelectItem value="America/Chicago">
                        Central Time
                      </SelectItem>
                      <SelectItem value="America/Denver">
                        Mountain Time
                      </SelectItem>
                      <SelectItem value="America/Los_Angeles">
                        Pacific Time
                      </SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
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

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about campaign performance
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("emailNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">
                      Get weekly summaries of sleep data and campaign progress
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
                    <p className="font-medium">System Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Important system notifications and updates
                    </p>
                  </div>
                  <Switch
                    checked={settings.alertsEnabled}
                    onCheckedChange={(checked) =>
                      handleSettingChange("alertsEnabled", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Low Engagement Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Notify when campaign engagement drops below threshold
                    </p>
                  </div>
                  <Switch
                    checked={settings.lowEngagementAlerts}
                    onCheckedChange={(checked) =>
                      handleSettingChange("lowEngagementAlerts", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Privacy & Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      handleSettingChange("twoFactorAuth", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Anonymize User Data</p>
                    <p className="text-sm text-muted-foreground">
                      Remove personally identifiable information from reports
                    </p>
                  </div>
                  <Switch
                    checked={settings.anonymizeData}
                    onCheckedChange={(checked) =>
                      handleSettingChange("anonymizeData", checked)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Retention</label>
                  <Select
                    value={settings.dataRetention}
                    onValueChange={(value) =>
                      handleSettingChange("dataRetention", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="12-months">12 Months</SelectItem>
                      <SelectItem value="24-months">24 Months</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    How long to retain user sleep data
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout</label>
                  <Select
                    value={settings.sessionTimeout}
                    onValueChange={(value) =>
                      handleSettingChange("sessionTimeout", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-hour">1 Hour</SelectItem>
                      <SelectItem value="4-hours">4 Hours</SelectItem>
                      <SelectItem value="8-hours">8 Hours</SelectItem>
                      <SelectItem value="24-hours">24 Hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Automatic logout after inactivity
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
                    Security Recommendations
                  </h4>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• Enable two-factor authentication</li>
                    <li>• Use a strong, unique password</li>
                    <li>• Regularly review access logs</li>
                    <li>• Keep data retention policies up to date</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case "integrations":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">
                Communication Integrations
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email Integration</p>
                      <p className="text-sm text-muted-foreground">
                        Send campaign invitations and updates via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailIntegration}
                    onCheckedChange={(checked) =>
                      handleSettingChange("emailIntegration", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Database className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Slack Integration</p>
                      <p className="text-sm text-muted-foreground">
                        Send wellness reminders and updates to Slack channels
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.slackIntegration}
                      onCheckedChange={(checked) =>
                        handleSettingChange("slackIntegration", checked)
                      }
                    />
                    {!settings.slackIntegration && (
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Microsoft Teams</p>
                      <p className="text-sm text-muted-foreground">
                        Integrate with Teams for seamless communication
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.teamsIntegration}
                      onCheckedChange={(checked) =>
                        handleSettingChange("teamsIntegration", checked)
                      }
                    />
                    {!settings.teamsIntegration && (
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">API Configuration</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">API Key</label>
                  <div className="flex gap-2">
                    <Input
                      value="sk-•••••••••••••••••••••••••••••••••••••••"
                      readOnly
                      className="font-mono"
                    />
                    <Button variant="outline">
                      <Key className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use this key for API integrations with external systems
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Webhook URL</label>
                  <Input
                    placeholder="https://your-webhook-endpoint.com/sleepfix"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Receive real-time updates about campaign events
                  </p>
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
            <div className="bg-sleep-blue-600 p-2 rounded-xl">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-foreground">
                Admin Settings
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                Manage your account and system preferences
              </p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex">
            <Button
              onClick={handleSaveSettings}
              className="bg-lavender-500 hover:bg-lavender-600"
            >
              <Save className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Save Changes</span>
              <span className="lg:hidden">Save</span>
            </Button>
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
                  handleSaveSettings();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
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
                    "Manage your personal information and account details"}
                  {activeTab === "notifications" &&
                    "Configure how and when you receive notifications"}
                  {activeTab === "security" &&
                    "Security settings and data privacy options"}
                  {activeTab === "integrations" &&
                    "Connect with external tools and services"}
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
