import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
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
import { Progress } from "../components/ui/progress";
import {
  Moon,
  ArrowLeft,
  Smartphone,
  Watch,
  Apple,
  Zap,
  CheckCircle,
  Settings,
  Key,
  Link,
  Smartphone as SmartphoneIcon,
  Wifi,
  Activity,
  AlertCircle,
  RefreshCw,
  Plus,
  ExternalLink,
} from "lucide-react";
import { redirectToWearableAuth } from "../services/wearables";

interface DeviceConnection {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "syncing" | "error";
  lastSync?: string;
  dataPoints?: number;
  batteryLevel?: number;
  apiKey?: string;
}

interface ApiIntegration {
  id: string;
  name: string;
  description: string;
  type: "oauth" | "api_key" | "webhook";
  status: "connected" | "disconnected" | "syncing";
  config?: Record<string, any>;
}

export function Integrations() {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");

  // Mock connected devices
  const [connectedDevices, setConnectedDevices] = useState<DeviceConnection[]>([
    {
      id: "apple-watch-1",
      name: "Apple Watch Series 8",
      status: "connected",
      lastSync: "2024-01-15T10:30:00Z",
      dataPoints: 1247,
      batteryLevel: 85,
      apiKey: "aw_*********************",
    },
    {
      id: "oura-ring-1",
      name: "Oura Ring Gen 3",
      status: "syncing",
      lastSync: "2024-01-15T09:15:00Z",
      dataPoints: 892,
      batteryLevel: 42,
      apiKey: "oura_*********************",
    },
  ]);

  // Mock API integrations
  const [apiIntegrations, setApiIntegrations] = useState<ApiIntegration[]>([
    {
      id: "webhook",
      name: "Webhook Integration",
      description: "Send sleep data to external systems via webhook",
      type: "webhook",
      status: "connected",
      config: { url: "https://api.yourcompany.com/webhook/sleep" },
    },
    {
      id: "zapier",
      name: "Zapier Automation",
      description: "Automate workflows based on sleep data",
      type: "oauth",
      status: "syncing",
    },
  ]);

  const integrations = [
    {
      name: "Apple Watch",
      description: "Track sleep patterns, heart rate, and activity levels",
      icon: Apple,
      status: "Available",
      connected: false,
      apiEndpoint: "https://api.apple.com/healthkit",
      authType: "oauth",
      setupInstructions:
        "Install the HealthKit companion app and authorize SleepFix.ai to access your sleep data.",
    },
    {
      name: "Fitbit",
      description: "Comprehensive sleep tracking and wellness metrics",
      icon: Watch,
      status: "Available",
      connected: false,
      apiEndpoint: "https://api.fitbit.com/1.2",
      authType: "oauth",
      setupInstructions:
        "Connect your Fitbit account through OAuth and grant sleep data permissions.",
    },
    {
      name: "Oura Ring",
      description: "Advanced sleep analysis and recovery tracking",
      icon: Zap,
      status: "Available",
      connected: false,
      apiEndpoint: "https://api.ouraring.com/v2",
      authType: "api_key",
      setupInstructions:
        "Generate a Personal Access Token from your Oura account settings.",
    },
    {
      name: "Garmin",
      description: "Sleep monitoring and stress tracking",
      icon: Watch,
      status: "Coming Soon",
      connected: false,
      apiEndpoint: "https://connectiq.garmin.com/api",
      authType: "oauth",
      setupInstructions:
        "Garmin integration will be available in the next update.",
    },
    {
      name: "Withings",
      description: "Sleep tracking and health monitoring",
      icon: Activity,
      status: "Available",
      connected: false,
      apiEndpoint: "https://wbsapi.withings.net/v2",
      authType: "oauth",
      setupInstructions:
        "Connect through Withings OAuth and enable sleep data sharing.",
    },
    {
      name: "Polar",
      description: "Heart rate and sleep pattern analysis",
      icon: Activity,
      status: "Available",
      connected: false,
      apiEndpoint: "https://www.polaraccesslink.com/v3",
      authType: "oauth",
      setupInstructions:
        "Register app with Polar Flow and authorize data access.",
    },
  ];

  const handleConnect = (integration: any) => {
    setSelectedDevice(integration);
  };

  const handleApiConnect = async () => {
    if (!selectedDevice) return;

    setIsConnecting(true);

    // Simulate API connection
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (selectedDevice.authType === "api_key" && apiKey) {
      // Simulate API key validation
      const newDevice: DeviceConnection = {
        id: `${selectedDevice.name.toLowerCase().replace(" ", "-")}-${Date.now()}`,
        name: selectedDevice.name,
        status: "connected",
        lastSync: new Date().toISOString(),
        dataPoints: Math.floor(Math.random() * 1000),
        batteryLevel: Math.floor(Math.random() * 100),
        apiKey: `${selectedDevice.name.toLowerCase().substring(0, 4)}_${apiKey.substring(0, 4)}*********************`,
      };

      setConnectedDevices((prev) => [...prev, newDevice]);
      alert(`${selectedDevice.name} connected successfully!`);
    } else if (selectedDevice.authType === "oauth") {
      // Simulate OAuth flow
      alert(
        `Opening OAuth flow for ${selectedDevice.name}...\n\nIn a real implementation, this would redirect to:\n${selectedDevice.apiEndpoint}/oauth/authorize`,
      );
    }

    setIsConnecting(false);
    setSelectedDevice(null);
    setApiKey("");
  };

  const handleDisconnect = (deviceId: string) => {
    setConnectedDevices((prev) => prev.filter((d) => d.id !== deviceId));
    alert("Device disconnected successfully!");
  };

  const handleSync = (deviceId: string) => {
    setConnectedDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId
          ? {
              ...d,
              status: "syncing" as const,
              lastSync: new Date().toISOString(),
            }
          : d,
      ),
    );

    // Simulate sync completion
    setTimeout(() => {
      setConnectedDevices((prev) =>
        prev.map((d) =>
          d.id === deviceId
            ? {
                ...d,
                status: "connected" as const,
                dataPoints:
                  (d.dataPoints || 0) + Math.floor(Math.random() * 50),
              }
            : d,
        ),
      );
    }, 3000);
  };

  const getStatusColor = (status: DeviceConnection["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800";
      case "syncing":
        return "bg-blue-100 text-blue-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "disconnected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sleep-blue-50 via-background to-lavender-50">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="bg-lavender-500 p-2 rounded-xl">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Device Integrations
              </h1>
              <p className="text-sm text-muted-foreground">
                Connect your wearables for better sleep tracking
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Device & API Integrations
          </h2>
          <p className="text-muted-foreground">
            Connect your wearable devices and set up API integrations to
            automatically sync sleep data. All connections are secure and
            encrypted.
          </p>
        </div>

        <Tabs defaultValue="devices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="devices">My Devices</TabsTrigger>
            <TabsTrigger value="available">Available Devices</TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-4">
            {/* Connected Devices */}
            {connectedDevices.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Connected Devices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {connectedDevices.map((device) => (
                    <Card key={device.id} className="relative">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-3 rounded-xl">
                              <SmartphoneIcon className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {device.name}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  className={getStatusColor(device.status)}
                                >
                                  {device.status}
                                </Badge>
                                {device.batteryLevel && (
                                  <Badge variant="outline" className="text-xs">
                                    {device.batteryLevel}% battery
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          {device.status === "connected" && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {device.status === "syncing" && (
                            <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Last Sync:
                            </span>
                            <p className="font-medium">
                              {device.lastSync
                                ? new Date(device.lastSync).toLocaleString()
                                : "Never"}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Data Points:
                            </span>
                            <p className="font-medium">
                              {device.dataPoints || 0}
                            </p>
                          </div>
                        </div>

                        {device.apiKey && (
                          <div className="bg-muted/50 p-2 rounded text-xs">
                            <span className="text-muted-foreground">
                              API Key:
                            </span>
                            <code className="ml-2">{device.apiKey}</code>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSync(device.id)}
                            disabled={device.status === "syncing"}
                            className="flex-1 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                            aria-label={`Sync ${device.name} data`}
                          >
                            <RefreshCw
                              className={`h-4 w-4 mr-2 ${device.status === "syncing" ? "animate-spin" : ""}`}
                              aria-hidden="true"
                            />
                            {device.status === "syncing"
                              ? "Syncing..."
                              : "Sync Now"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(device.id)}
                            className="flex-1"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No Devices Connected
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your first device to start tracking sleep data
                    automatically.
                  </p>
                  <Button
                    onClick={() => alert("Switch to Available Devices tab")}
                  >
                    Browse Devices
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <h3 className="text-lg font-semibold">Available Integrations</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration) => {
                const IconComponent = integration.icon;
                const isConnected = connectedDevices.some((d) =>
                  d.name.includes(integration.name),
                );

                return (
                  <Card
                    key={integration.name}
                    className="relative hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-lavender-100 to-sleep-blue-100 p-3 rounded-xl">
                            <IconComponent className="h-6 w-6 text-sleep-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {integration.name}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {integration.description}
                            </CardDescription>
                          </div>
                        </div>
                        {isConnected && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            integration.status === "Available"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            integration.status === "Available"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {integration.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {integration.authType?.toUpperCase()}
                        </Badge>
                      </div>

                      {integration.apiEndpoint && (
                        <div className="bg-muted/50 p-2 rounded text-xs">
                          <span className="text-muted-foreground">API:</span>
                          <code className="ml-2 text-xs">
                            {integration.apiEndpoint}
                          </code>
                        </div>
                      )}

                      <Button
                        onClick={() => handleConnect(integration)}
                        disabled={
                          integration.status !== "Available" || isConnected
                        }
                        className={
                          isConnected
                            ? "bg-green-500 hover:bg-green-600 w-full"
                            : "bg-lavender-500 hover:bg-lavender-600 w-full"
                        }
                      >
                        {isConnected ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Connected
                          </>
                        ) : integration.status === "Available" ? (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Connect
                          </>
                        ) : (
                          "Coming Soon"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Why Connect Devices?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-lavender-100 p-3 rounded-xl w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Watch className="h-6 w-6 text-lavender-600" />
                </div>
                <h4 className="font-medium mb-2">Automatic Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  No manual entry needed. Your sleep data syncs automatically.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-sleep-blue-100 p-3 rounded-xl w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-sleep-blue-600" />
                </div>
                <h4 className="font-medium mb-2">Personalized Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered recommendations based on your unique patterns.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-xl w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium mb-2">Better Accuracy</h4>
                <p className="text-sm text-muted-foreground">
                  Device data provides more accurate sleep stage analysis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Don't see your device? We're constantly adding new integrations.
            Contact support to request new device compatibility.
          </p>
          <Button variant="outline">Request New Integration</Button>
        </div>
      </div>

      {/* Device Connection Dialog */}
      <Dialog
        open={!!selectedDevice}
        onOpenChange={() => setSelectedDevice(null)}
      >
        <DialogContent className="max-w-md">
          {selectedDevice && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <selectedDevice.icon className="h-6 w-6" />
                  Connect {selectedDevice.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedDevice.setupInstructions}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {selectedDevice.authType === "api_key" && (
                  <div className="space-y-2">
                    <Label htmlFor="api-key">
                      API Key / Personal Access Token
                    </Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Generate this key from your {selectedDevice.name} account
                      settings
                    </p>
                  </div>
                )}

                {selectedDevice.authType === "oauth" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">
                          OAuth Authentication
                        </h4>
                        <p className="text-sm text-blue-700 mt-1">
                          You'll be redirected to {selectedDevice.name} to
                          authorize access to your sleep data. This is the most
                          secure way to connect your device.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-muted/50 p-3 rounded-lg text-xs">
                  <strong>API Endpoint:</strong>
                  <br />
                  <code>{selectedDevice.apiEndpoint}</code>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDevice(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleApiConnect}
                    disabled={
                      isConnecting ||
                      (selectedDevice.authType === "api_key" && !apiKey) ||
                      selectedDevice.status !== "Available"
                    }
                    className="flex-1 bg-lavender-500 hover:bg-lavender-600"
                  >
                    {isConnecting ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Link className="h-4 w-4 mr-2" />
                    )}
                    {isConnecting ? "Connecting..." : "Connect"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
