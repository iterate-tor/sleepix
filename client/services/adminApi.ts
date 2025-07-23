// Comprehensive Admin API Service Layer
// This file contains all API endpoint placeholders for backend integration

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  joinDate: string;
  status: "active" | "inactive";
  sleepScore: number;
  lastActive: string;
  deviceConnected: boolean;
  campaignParticipation: number;
}

export interface Campaign {
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
}

export interface InterventionData {
  trigger: string;
  issueType: string;
  severity: "low" | "medium" | "high";
  description: string;
  goal: string;
  interventionType: string;
  expectedOutcome: string;
  timeline: string;
  recipients: string[];
  messageType: "notification" | "email" | "both";
  message: string;
  schedule: "now" | "1hour" | "tomorrow" | "custom";
  customDate?: string;
  linkToCampaign: boolean;
  selectedCampaign?: string;
  createNewCampaign: boolean;
  newCampaignName?: string;
  newCampaignType?: string;
  newCampaignDuration?: string;
}

export interface DeviceIntegration {
  id: string;
  name: string;
  type: "wearable" | "sleep-tracker" | "fitness" | "smart-home";
  status: "connected" | "disconnected" | "syncing" | "error";
  lastSync?: string;
  dataPoints?: number;
  users?: number;
  apiEndpoint?: string;
}

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  secret?: string;
  lastTriggered?: string;
  deliveryCount?: number;
}

// API Base Configuration
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://api.sleepfix.ai/v1";
const API_TIMEOUT = 10000; // 10 seconds

// Auth headers helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("admin-token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Generic API request wrapper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `HTTP error! status: ${response.status}`,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("API Request Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// =====================================
// ADMIN DASHBOARD ANALYTICS
// =====================================

export const AdminAnalyticsAPI = {
  // Get comprehensive dashboard metrics
  async getDashboardMetrics(): Promise<
    ApiResponse<{
      kpi: {
        avgSleepScore: number;
        sleepDebtPercentage: number;
        campaignParticipation: number;
        activeUsers: number;
      };
      burnoutData: {
        low: number;
        moderate: number;
        high: number;
      };
      departmentData: Array<{
        name: string;
        avgSleepScore: number;
        productivity: number;
        burnoutRisk: "low" | "moderate" | "high";
        employees: number;
        trend: "up" | "down" | "stable";
      }>;
      productivityTrends: Array<{
        week: string;
        productivity: number;
        sleepHours: number;
      }>;
    }>
  > {
    return apiRequest("/admin/analytics/dashboard");
  },

  // Export dashboard data
  async exportDashboardData(
    format: "csv" | "pdf" | "xlsx",
  ): Promise<ApiResponse<Blob>> {
    return apiRequest(`/admin/analytics/export?format=${format}`, {
      method: "GET",
    });
  },

  // Get real-time metrics
  async getRealTimeMetrics(): Promise<
    ApiResponse<{
      activeUsers: number;
      ongoingAssessments: number;
      campaignActivity: number;
      systemHealth: "good" | "warning" | "critical";
    }>
  > {
    return apiRequest("/admin/analytics/realtime");
  },
};

// =====================================
// USER MANAGEMENT
// =====================================

export const AdminUserAPI = {
  // Get all users with pagination and filters
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<
    ApiResponse<{
      users: User[];
      total: number;
      page: number;
      totalPages: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/admin/users?${queryParams.toString()}`);
  },

  // Get single user details
  async getUser(userId: string): Promise<
    ApiResponse<
      User & {
        sleepHistory: Array<{ date: string; score: number; duration: number }>;
        campaignHistory: Array<{
          id: string;
          name: string;
          status: string;
          progress: number;
        }>;
        deviceData: Array<{ device: string; lastSync: string; status: string }>;
      }
    >
  > {
    return apiRequest(`/admin/users/${userId}`);
  },

  // Create new user
  async createUser(
    userData: Omit<User, "id" | "lastActive">,
  ): Promise<ApiResponse<User>> {
    return apiRequest("/admin/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Update user
  async updateUser(
    userId: string,
    userData: Partial<User>,
  ): Promise<ApiResponse<User>> {
    return apiRequest(`/admin/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  // Delete user
  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/users/${userId}`, {
      method: "DELETE",
    });
  },

  // Bulk operations
  async bulkUpdateUsers(
    userIds: string[],
    updates: Partial<User>,
  ): Promise<ApiResponse<void>> {
    return apiRequest("/admin/users/bulk", {
      method: "PUT",
      body: JSON.stringify({ userIds, updates }),
    });
  },

  // Sync device data for user
  async syncUserDeviceData(userId: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/users/${userId}/sync`, {
      method: "POST",
    });
  },

  // Get user sleep analytics
  async getUserSleepAnalytics(
    userId: string,
    timeRange: "7d" | "30d" | "90d" | "1y",
  ): Promise<
    ApiResponse<{
      averageScore: number;
      sleepDebt: number;
      trends: Array<{ date: string; score: number; duration: number }>;
      insights: string[];
    }>
  > {
    return apiRequest(`/admin/users/${userId}/analytics?range=${timeRange}`);
  },
};

// =====================================
// CAMPAIGN MANAGEMENT
// =====================================

export const AdminCampaignAPI = {
  // Get all campaigns
  async getCampaigns(params?: {
    status?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<
    ApiResponse<{
      campaigns: Campaign[];
      total: number;
      page: number;
      totalPages: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/admin/campaigns?${queryParams.toString()}`);
  },

  // Get campaign details with analytics
  async getCampaign(campaignId: string): Promise<
    ApiResponse<
      Campaign & {
        analytics: {
          dailyEngagement: Array<{ date: string; engagement: number }>;
          departmentBreakdown: Array<{
            department: string;
            participants: number;
            engagement: number;
          }>;
          feedbackScore: number;
          completionRate: number;
          avgSleepImprovement: number;
          totalPoints: number;
        };
        activities: Array<{
          id: string;
          title: string;
          description: string;
          type: "daily" | "weekly" | "milestone";
          points: number;
          completionRate: number;
        }>;
        participants: Array<{
          userId: string;
          name: string;
          department: string;
          progress: number;
          points: number;
          joinDate: string;
        }>;
      }
    >
  > {
    return apiRequest(`/admin/campaigns/${campaignId}`);
  },

  // Create new campaign
  async createCampaign(
    campaignData: Omit<
      Campaign,
      "id" | "participants" | "engagement" | "avgImprovementScore"
    >,
  ): Promise<ApiResponse<Campaign>> {
    return apiRequest("/admin/campaigns", {
      method: "POST",
      body: JSON.stringify(campaignData),
    });
  },

  // Update campaign
  async updateCampaign(
    campaignId: string,
    campaignData: Partial<Campaign>,
  ): Promise<ApiResponse<Campaign>> {
    return apiRequest(`/admin/campaigns/${campaignId}`, {
      method: "PUT",
      body: JSON.stringify(campaignData),
    });
  },

  // Delete campaign
  async deleteCampaign(campaignId: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/campaigns/${campaignId}`, {
      method: "DELETE",
    });
  },

  // Duplicate campaign
  async duplicateCampaign(
    campaignId: string,
    newName: string,
  ): Promise<ApiResponse<Campaign>> {
    return apiRequest(`/admin/campaigns/${campaignId}/duplicate`, {
      method: "POST",
      body: JSON.stringify({ name: newName }),
    });
  },

  // Launch campaign
  async launchCampaign(campaignId: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/campaigns/${campaignId}/launch`, {
      method: "POST",
    });
  },

  // Pause/Resume campaign
  async pauseCampaign(campaignId: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/campaigns/${campaignId}/pause`, {
      method: "POST",
    });
  },

  async resumeCampaign(campaignId: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/campaigns/${campaignId}/resume`, {
      method: "POST",
    });
  },

  // Get campaign analytics
  async getCampaignAnalytics(campaignId: string): Promise<
    ApiResponse<{
      engagement: Array<{ date: string; value: number }>;
      completion: Array<{ activity: string; rate: number }>;
      demographics: Array<{ department: string; participation: number }>;
      feedback: Array<{ rating: number; comment: string; date: string }>;
    }>
  > {
    return apiRequest(`/admin/campaigns/${campaignId}/analytics`);
  },

  // Export campaign data
  async exportCampaignData(
    campaignId: string,
    format: "csv" | "pdf" | "xlsx",
  ): Promise<ApiResponse<Blob>> {
    return apiRequest(`/admin/campaigns/${campaignId}/export?format=${format}`);
  },
};

// =====================================
// INTERVENTION MANAGEMENT
// =====================================

export const AdminInterventionAPI = {
  // Schedule intervention
  async scheduleIntervention(interventionData: InterventionData): Promise<
    ApiResponse<{
      id: string;
      status: "scheduled" | "sent" | "failed";
      scheduledFor: string;
      estimatedReach: number;
    }>
  > {
    return apiRequest("/admin/interventions", {
      method: "POST",
      body: JSON.stringify(interventionData),
    });
  },

  // Get intervention history
  async getInterventions(params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<
    ApiResponse<{
      interventions: Array<{
        id: string;
        trigger: string;
        goal: string;
        recipients: string[];
        status: "scheduled" | "sent" | "failed";
        scheduledFor: string;
        sentAt?: string;
        reachCount: number;
        engagementRate?: number;
        createdBy: string;
        createdAt: string;
      }>;
      total: number;
      page: number;
      totalPages: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/admin/interventions?${queryParams.toString()}`);
  },

  // Get intervention details
  async getIntervention(interventionId: string): Promise<
    ApiResponse<{
      id: string;
      data: InterventionData;
      status: "scheduled" | "sent" | "failed";
      scheduledFor: string;
      sentAt?: string;
      reachCount: number;
      engagementRate?: number;
      responses: Array<{ userId: string; action: string; timestamp: string }>;
      analytics: {
        deliveryRate: number;
        openRate: number;
        clickRate: number;
        responseRate: number;
      };
    }>
  > {
    return apiRequest(`/admin/interventions/${interventionId}`);
  },

  // Cancel scheduled intervention
  async cancelIntervention(interventionId: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/interventions/${interventionId}/cancel`, {
      method: "POST",
    });
  },

  // Get intervention templates
  async getInterventionTemplates(): Promise<
    ApiResponse<
      Array<{
        id: string;
        name: string;
        category: string;
        template: Partial<InterventionData>;
      }>
    >
  > {
    return apiRequest("/admin/interventions/templates");
  },

  // Create intervention template
  async createInterventionTemplate(templateData: {
    name: string;
    category: string;
    template: Partial<InterventionData>;
  }): Promise<ApiResponse<void>> {
    return apiRequest("/admin/interventions/templates", {
      method: "POST",
      body: JSON.stringify(templateData),
    });
  },
};

// =====================================
// DEVICE INTEGRATION MANAGEMENT
// =====================================

export const AdminDeviceAPI = {
  // Get all device integrations
  async getDeviceIntegrations(): Promise<ApiResponse<DeviceIntegration[]>> {
    return apiRequest("/admin/integrations/devices");
  },

  // Add new device integration
  async addDeviceIntegration(deviceData: {
    name: string;
    type: string;
    apiEndpoint: string;
    authMethod: "api_key" | "oauth" | "webhook";
    credentials: Record<string, string>;
  }): Promise<ApiResponse<DeviceIntegration>> {
    return apiRequest("/admin/integrations/devices", {
      method: "POST",
      body: JSON.stringify(deviceData),
    });
  },

  // Update device integration
  async updateDeviceIntegration(
    deviceId: string,
    deviceData: Partial<DeviceIntegration>,
  ): Promise<ApiResponse<DeviceIntegration>> {
    return apiRequest(`/admin/integrations/devices/${deviceId}`, {
      method: "PUT",
      body: JSON.stringify(deviceData),
    });
  },

  // Remove device integration
  async removeDeviceIntegration(deviceId: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/integrations/devices/${deviceId}`, {
      method: "DELETE",
    });
  },

  // Test device connection
  async testDeviceConnection(deviceId: string): Promise<
    ApiResponse<{
      status: "success" | "failed";
      latency: number;
      lastDataPoint?: string;
      errorMessage?: string;
    }>
  > {
    return apiRequest(`/admin/integrations/devices/${deviceId}/test`, {
      method: "POST",
    });
  },

  // Sync all device data
  async syncAllDeviceData(): Promise<
    ApiResponse<{
      totalDevices: number;
      syncedDevices: number;
      failedDevices: number;
      syncDuration: number;
    }>
  > {
    return apiRequest("/admin/integrations/devices/sync-all", {
      method: "POST",
    });
  },

  // Get device integration summary
  async getDeviceIntegrationSummary(): Promise<
    ApiResponse<{
      totalIntegrations: number;
      activeIntegrations: number;
      totalUsers: number;
      connectedUsers: number;
      syncHealth: "good" | "warning" | "critical";
      lastSyncTime: string;
    }>
  > {
    return apiRequest("/admin/integrations/devices/summary");
  },
};

// =====================================
// WEBHOOK MANAGEMENT
// =====================================

export const AdminWebhookAPI = {
  // Get all webhooks
  async getWebhooks(): Promise<ApiResponse<WebhookConfig[]>> {
    return apiRequest("/admin/webhooks");
  },

  // Create webhook
  async createWebhook(
    webhookData: Omit<WebhookConfig, "id" | "lastTriggered" | "deliveryCount">,
  ): Promise<ApiResponse<WebhookConfig>> {
    return apiRequest("/admin/webhooks", {
      method: "POST",
      body: JSON.stringify(webhookData),
    });
  },

  // Update webhook
  async updateWebhook(
    webhookId: string,
    webhookData: Partial<WebhookConfig>,
  ): Promise<ApiResponse<WebhookConfig>> {
    return apiRequest(`/admin/webhooks/${webhookId}`, {
      method: "PUT",
      body: JSON.stringify(webhookData),
    });
  },

  // Delete webhook
  async deleteWebhook(webhookId: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/webhooks/${webhookId}`, {
      method: "DELETE",
    });
  },

  // Test webhook
  async testWebhook(webhookId: string): Promise<
    ApiResponse<{
      status: "success" | "failed";
      responseTime: number;
      statusCode?: number;
      errorMessage?: string;
    }>
  > {
    return apiRequest(`/admin/webhooks/${webhookId}/test`, {
      method: "POST",
    });
  },

  // Get webhook delivery logs
  async getWebhookLogs(
    webhookId: string,
    params?: {
      page?: number;
      limit?: number;
      status?: "success" | "failed";
    },
  ): Promise<
    ApiResponse<{
      logs: Array<{
        id: string;
        timestamp: string;
        status: "success" | "failed";
        responseTime: number;
        statusCode?: number;
        payload: any;
        errorMessage?: string;
      }>;
      total: number;
      page: number;
      totalPages: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(
      `/admin/webhooks/${webhookId}/logs?${queryParams.toString()}`,
    );
  },
};

// =====================================
// SETTINGS & CONFIGURATION
// =====================================

export const AdminSettingsAPI = {
  // Get system settings
  async getSystemSettings(): Promise<
    ApiResponse<{
      organization: {
        name: string;
        timezone: string;
        workingHours: { start: string; end: string };
        departments: string[];
      };
      notifications: {
        emailEnabled: boolean;
        slackEnabled: boolean;
        webhookEnabled: boolean;
        alertThresholds: Record<string, number>;
      };
      privacy: {
        dataRetentionDays: number;
        anonymizeData: boolean;
        gdprCompliance: boolean;
      };
      security: {
        sessionTimeout: number;
        twoFactorRequired: boolean;
        passwordPolicy: {
          minLength: number;
          requireSpecialChars: boolean;
          requireNumbers: boolean;
        };
      };
    }>
  > {
    return apiRequest("/admin/settings");
  },

  // Update system settings
  async updateSystemSettings(settings: any): Promise<ApiResponse<void>> {
    return apiRequest("/admin/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
  },

  // Get API usage statistics
  async getApiUsage(timeRange: "24h" | "7d" | "30d"): Promise<
    ApiResponse<{
      totalRequests: number;
      successfulRequests: number;
      failedRequests: number;
      averageResponseTime: number;
      topEndpoints: Array<{ endpoint: string; requests: number }>;
      usage: Array<{ timestamp: string; requests: number; errors: number }>;
    }>
  > {
    return apiRequest(`/admin/settings/api-usage?range=${timeRange}`);
  },

  // Generate new API key
  async generateApiKey(
    name: string,
    permissions: string[],
  ): Promise<
    ApiResponse<{
      keyId: string;
      key: string;
      name: string;
      permissions: string[];
      createdAt: string;
      expiresAt?: string;
    }>
  > {
    return apiRequest("/admin/settings/api-keys", {
      method: "POST",
      body: JSON.stringify({ name, permissions }),
    });
  },

  // Revoke API key
  async revokeApiKey(keyId: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/settings/api-keys/${keyId}`, {
      method: "DELETE",
    });
  },

  // Get system health
  async getSystemHealth(): Promise<
    ApiResponse<{
      status: "healthy" | "degraded" | "down";
      uptime: number;
      version: string;
      services: Array<{
        name: string;
        status: "up" | "down" | "degraded";
        responseTime?: number;
        lastCheck: string;
      }>;
      metrics: {
        cpuUsage: number;
        memoryUsage: number;
        diskUsage: number;
        activeConnections: number;
      };
    }>
  > {
    return apiRequest("/admin/system/health");
  },
};

// =====================================
// REAL-TIME FEATURES (WebSocket)
// =====================================

export class AdminWebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;
  private listeners: Map<string, Function[]> = new Map();

  constructor() {
    this.connect();
  }

  private connect() {
    const token = localStorage.getItem("admin-token");
    const wsUrl = `${process.env.REACT_APP_WS_URL || "wss://api.sleepfix.ai/ws"}/admin?token=${token}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log("Admin WebSocket connected");
      this.reconnectAttempts = 0;
      this.emit("connection", { status: "connected" });
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit(data.type, data.payload);
      } catch (error) {
        console.error("WebSocket message parse error:", error);
      }
    };

    this.ws.onclose = () => {
      console.log("Admin WebSocket disconnected");
      this.emit("connection", { status: "disconnected" });
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error("Admin WebSocket error:", error);
      this.emit("error", { error });
    };
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
      );
      setTimeout(() => this.connect(), this.reconnectInterval);
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event) || [];
    eventListeners.forEach((listener) => listener(data));
  }

  public on(event: string, listener: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  public off(event: string, listener: Function) {
    const eventListeners = this.listeners.get(event) || [];
    const index = eventListeners.indexOf(listener);
    if (index > -1) {
      eventListeners.splice(index, 1);
    }
  }

  public send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Export default instance
export const adminWebSocket = new AdminWebSocketService();

// =====================================
// UTILITY FUNCTIONS
// =====================================

// Rate limiting utility
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  isAllowed(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];

    // Filter out old requests
    const validRequests = requests.filter((time) => now - time < windowMs);

    if (validRequests.length >= limit) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

// Error handling utility
export function handleApiError(
  error: any,
  fallbackMessage = "An unexpected error occurred",
) {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return fallbackMessage;
}

// Data export utility
export async function exportData(
  data: any[],
  filename: string,
  format: "csv" | "json" | "xlsx",
) {
  try {
    let blob: Blob;
    let mimeType: string;

    switch (format) {
      case "csv":
        const csvContent = convertToCSV(data);
        blob = new Blob([csvContent], { type: "text/csv" });
        mimeType = "text/csv";
        break;
      case "json":
        blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        mimeType = "application/json";
        break;
      case "xlsx":
        // In a real implementation, you'd use a library like xlsx
        blob = new Blob([JSON.stringify(data)], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        mimeType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      default:
        throw new Error("Unsupported format");
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export error:", error);
    throw error;
  }
}

function convertToCSV(data: any[]): string {
  if (!data.length) return "";

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          return typeof value === "string"
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        })
        .join(","),
    ),
  ];

  return csvRows.join("\n");
}

// Cache utility for API responses
export class ApiCache {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> =
    new Map();

  set(key: string, data: any, ttlMs = 300000) {
    // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    this.cache.delete(key);
  }
}

export const apiCache = new ApiCache();
