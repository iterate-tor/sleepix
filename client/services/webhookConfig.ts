// Webhook Configuration and Management System
// This file provides webhook setup, testing, and management capabilities

export interface WebhookEvent {
  id: string;
  name: string;
  description: string;
  eventType: string;
  payload: any;
  timestamp: string;
}

export interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: string[];
  active: boolean;
  retryPolicy: {
    maxRetries: number;
    retryDelay: number;
    backoffMultiplier: number;
  };
  headers: Record<string, string>;
  createdAt: string;
  lastTriggered?: string;
  successCount: number;
  failureCount: number;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  eventId: string;
  attempt: number;
  status: "pending" | "success" | "failed" | "retrying";
  statusCode?: number;
  responseTime?: number;
  errorMessage?: string;
  requestHeaders: Record<string, string>;
  responseHeaders?: Record<string, string>;
  payload: any;
  timestamp: string;
}

// Predefined webhook events that the system can trigger
export const WEBHOOK_EVENTS = {
  // User Events
  USER_REGISTERED: "user.registered",
  USER_UPDATED: "user.updated",
  USER_DELETED: "user.deleted",
  USER_SLEEP_DATA_UPDATED: "user.sleep_data.updated",
  USER_DEVICE_CONNECTED: "user.device.connected",
  USER_DEVICE_DISCONNECTED: "user.device.disconnected",

  // Campaign Events
  CAMPAIGN_CREATED: "campaign.created",
  CAMPAIGN_LAUNCHED: "campaign.launched",
  CAMPAIGN_PAUSED: "campaign.paused",
  CAMPAIGN_COMPLETED: "campaign.completed",
  CAMPAIGN_USER_JOINED: "campaign.user.joined",
  CAMPAIGN_USER_LEFT: "campaign.user.left",
  CAMPAIGN_MILESTONE_REACHED: "campaign.milestone.reached",

  // Assessment Events
  ASSESSMENT_COMPLETED: "assessment.completed",
  ASSESSMENT_SCORE_UPDATED: "assessment.score.updated",
  ASSESSMENT_REMINDER_SENT: "assessment.reminder.sent",

  // Alert Events
  BURNOUT_RISK_DETECTED: "alert.burnout_risk.detected",
  SLEEP_DEBT_THRESHOLD_REACHED: "alert.sleep_debt.threshold_reached",
  LOW_ENGAGEMENT_DETECTED: "alert.engagement.low",
  PRODUCTIVITY_DECLINE_DETECTED: "alert.productivity.decline",

  // Intervention Events
  INTERVENTION_SCHEDULED: "intervention.scheduled",
  INTERVENTION_SENT: "intervention.sent",
  INTERVENTION_DELIVERED: "intervention.delivered",
  INTERVENTION_RESPONDED: "intervention.responded",

  // System Events
  SYSTEM_MAINTENANCE_STARTED: "system.maintenance.started",
  SYSTEM_MAINTENANCE_COMPLETED: "system.maintenance.completed",
  SYSTEM_BACKUP_COMPLETED: "system.backup.completed",
  SYSTEM_ERROR_OCCURRED: "system.error.occurred",

  // Integration Events
  DEVICE_SYNC_COMPLETED: "integration.device.sync.completed",
  DEVICE_SYNC_FAILED: "integration.device.sync.failed",
  API_RATE_LIMIT_REACHED: "integration.api.rate_limit.reached",
  WEBHOOK_DELIVERY_FAILED: "integration.webhook.delivery.failed",
} as const;

// Event payload schemas
export const WEBHOOK_SCHEMAS = {
  [WEBHOOK_EVENTS.USER_REGISTERED]: {
    user: {
      id: "string",
      name: "string",
      email: "string",
      department: "string",
      joinDate: "string",
    },
    timestamp: "string",
  },

  [WEBHOOK_EVENTS.USER_SLEEP_DATA_UPDATED]: {
    user: {
      id: "string",
      name: "string",
      email: "string",
    },
    sleepData: {
      date: "string",
      duration: "number",
      quality: "number",
      bedtime: "string",
      wakeTime: "string",
      deepSleep: "number",
      remSleep: "number",
      lightSleep: "number",
    },
    source: "string", // device name or manual entry
    timestamp: "string",
  },

  [WEBHOOK_EVENTS.CAMPAIGN_USER_JOINED]: {
    campaign: {
      id: "string",
      name: "string",
      type: "string",
      status: "string",
    },
    user: {
      id: "string",
      name: "string",
      email: "string",
      department: "string",
    },
    joinDate: "string",
    timestamp: "string",
  },

  [WEBHOOK_EVENTS.BURNOUT_RISK_DETECTED]: {
    user: {
      id: "string",
      name: "string",
      email: "string",
      department: "string",
    },
    riskLevel: "low | medium | high",
    riskFactors: "string[]",
    sleepData: {
      averageHours: "number",
      qualityScore: "number",
      sleepDebt: "number",
    },
    recommendations: "string[]",
    timestamp: "string",
  },

  [WEBHOOK_EVENTS.INTERVENTION_SENT]: {
    intervention: {
      id: "string",
      type: "string",
      trigger: "string",
      goal: "string",
    },
    recipients: "string[]",
    message: "string",
    deliveryMethod: "notification | email | both",
    scheduledAt: "string",
    sentAt: "string",
    timestamp: "string",
  },
} as const;

// Webhook management service
export class WebhookService {
  private static instance: WebhookService;
  private webhooks: Map<string, WebhookEndpoint> = new Map();
  private deliveryQueue: WebhookDelivery[] = [];
  private retryQueue: WebhookDelivery[] = [];

  public static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }

  // Register a new webhook endpoint
  async registerWebhook(
    webhookData: Omit<
      WebhookEndpoint,
      "id" | "createdAt" | "successCount" | "failureCount"
    >,
  ): Promise<{ success: boolean; webhookId?: string; error?: string }> {
    try {
      // Validate webhook URL
      const url = new URL(webhookData.url);
      if (!["http:", "https:"].includes(url.protocol)) {
        return { success: false, error: "Invalid URL protocol" };
      }

      // Test webhook endpoint
      const testResult = await this.testWebhookEndpoint(
        webhookData.url,
        webhookData.headers,
      );
      if (!testResult.success) {
        return {
          success: false,
          error: `Webhook test failed: ${testResult.error}`,
        };
      }

      const webhookId = `webhook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const webhook: WebhookEndpoint = {
        ...webhookData,
        id: webhookId,
        createdAt: new Date().toISOString(),
        successCount: 0,
        failureCount: 0,
      };

      this.webhooks.set(webhookId, webhook);

      // Store in backend
      await this.saveWebhookToBackend(webhook);

      return { success: true, webhookId };
    } catch (error) {
      return {
        success: false,
        error: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  // Test a webhook endpoint
  async testWebhookEndpoint(
    url: string,
    headers: Record<string, string> = {},
  ): Promise<{ success: boolean; responseTime?: number; error?: string }> {
    const startTime = Date.now();

    try {
      const testPayload = {
        event: "webhook.test",
        timestamp: new Date().toISOString(),
        data: {
          message: "This is a test webhook from SleepFix.ai",
          testId: `test_${Date.now()}`,
        },
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "SleepFix-Webhook/1.0",
          ...headers,
        },
        body: JSON.stringify(testPayload),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        return { success: true, responseTime };
      } else {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return {
        success: false,
        responseTime,
        error: `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  // Trigger a webhook event
  async triggerEvent(
    eventType: string,
    payload: any,
    metadata: {
      userId?: string;
      campaignId?: string;
      interventionId?: string;
    } = {},
  ): Promise<void> {
    const event: WebhookEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: eventType,
      description: this.getEventDescription(eventType),
      eventType,
      payload: {
        ...payload,
        metadata,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };

    // Find webhooks that should receive this event
    const relevantWebhooks = Array.from(this.webhooks.values()).filter(
      (webhook) => webhook.active && webhook.events.includes(eventType),
    );

    // Queue deliveries for all relevant webhooks
    for (const webhook of relevantWebhooks) {
      const delivery: WebhookDelivery = {
        id: `delivery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        webhookId: webhook.id,
        eventId: event.id,
        attempt: 1,
        status: "pending",
        requestHeaders: {
          "Content-Type": "application/json",
          "User-Agent": "SleepFix-Webhook/1.0",
          "X-SleepFix-Event": eventType,
          "X-SleepFix-Delivery": `delivery_${Date.now()}`,
          "X-SleepFix-Signature": this.generateSignature(
            webhook.secret,
            JSON.stringify(event.payload),
          ),
          ...webhook.headers,
        },
        payload: event.payload,
        timestamp: new Date().toISOString(),
      };

      this.deliveryQueue.push(delivery);
    }

    // Process delivery queue
    this.processDeliveryQueue();
  }

  // Process webhook delivery queue
  private async processDeliveryQueue(): Promise<void> {
    if (this.deliveryQueue.length === 0) return;

    const delivery = this.deliveryQueue.shift()!;
    const webhook = this.webhooks.get(delivery.webhookId);

    if (!webhook) {
      console.error(`Webhook not found: ${delivery.webhookId}`);
      return;
    }

    try {
      const startTime = Date.now();

      const response = await fetch(webhook.url, {
        method: "POST",
        headers: delivery.requestHeaders,
        body: JSON.stringify(delivery.payload),
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        // Success
        delivery.status = "success";
        delivery.statusCode = response.status;
        delivery.responseTime = responseTime;
        delivery.responseHeaders = Object.fromEntries(response.headers);

        webhook.successCount++;
        webhook.lastTriggered = new Date().toISOString();
      } else {
        // HTTP error
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      // Failure - add to retry queue if retries are available
      delivery.status = "failed";
      delivery.errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (delivery.attempt < webhook.retryPolicy.maxRetries) {
        delivery.status = "retrying";
        delivery.attempt++;
        this.scheduleRetry(delivery, webhook.retryPolicy);
      } else {
        webhook.failureCount++;
      }
    }

    // Save delivery record
    await this.saveDeliveryRecord(delivery);

    // Continue processing queue
    if (this.deliveryQueue.length > 0) {
      // Small delay to prevent overwhelming the target server
      setTimeout(() => this.processDeliveryQueue(), 100);
    }
  }

  // Schedule a retry for failed webhook delivery
  private scheduleRetry(
    delivery: WebhookDelivery,
    retryPolicy: WebhookEndpoint["retryPolicy"],
  ): void {
    const delay =
      retryPolicy.retryDelay *
      Math.pow(retryPolicy.backoffMultiplier, delivery.attempt - 1);

    setTimeout(() => {
      this.retryQueue.push(delivery);
      this.processRetryQueue();
    }, delay);
  }

  // Process retry queue
  private async processRetryQueue(): Promise<void> {
    if (this.retryQueue.length === 0) return;

    const delivery = this.retryQueue.shift()!;
    this.deliveryQueue.push(delivery);
    this.processDeliveryQueue();
  }

  // Generate webhook signature for security
  private generateSignature(secret: string, payload: string): string {
    // In a real implementation, use HMAC-SHA256
    const encoder = new TextEncoder();
    const data = encoder.encode(secret + payload);
    return btoa(String.fromCharCode(...data)).slice(0, 32);
  }

  // Get human-readable event description
  private getEventDescription(eventType: string): string {
    const descriptions: Record<string, string> = {
      [WEBHOOK_EVENTS.USER_REGISTERED]: "A new user has registered",
      [WEBHOOK_EVENTS.USER_SLEEP_DATA_UPDATED]:
        "User sleep data has been updated",
      [WEBHOOK_EVENTS.CAMPAIGN_LAUNCHED]: "A campaign has been launched",
      [WEBHOOK_EVENTS.BURNOUT_RISK_DETECTED]: "Burnout risk detected for user",
      [WEBHOOK_EVENTS.INTERVENTION_SENT]: "An intervention has been sent",
      // Add more descriptions as needed
    };

    return descriptions[eventType] || `Event: ${eventType}`;
  }

  // Save webhook to backend (placeholder)
  private async saveWebhookToBackend(webhook: WebhookEndpoint): Promise<void> {
    // In a real implementation, this would save to the database
    console.log("Saving webhook to backend:", webhook.id);
  }

  // Save delivery record (placeholder)
  private async saveDeliveryRecord(delivery: WebhookDelivery): Promise<void> {
    // In a real implementation, this would save to the database
    console.log("Saving delivery record:", delivery.id, delivery.status);
  }

  // Public methods for webhook management
  async getWebhooks(): Promise<WebhookEndpoint[]> {
    return Array.from(this.webhooks.values());
  }

  async getWebhook(webhookId: string): Promise<WebhookEndpoint | null> {
    return this.webhooks.get(webhookId) || null;
  }

  async updateWebhook(
    webhookId: string,
    updates: Partial<WebhookEndpoint>,
  ): Promise<{ success: boolean; error?: string }> {
    const webhook = this.webhooks.get(webhookId);
    if (!webhook) {
      return { success: false, error: "Webhook not found" };
    }

    const updatedWebhook = { ...webhook, ...updates };
    this.webhooks.set(webhookId, updatedWebhook);

    await this.saveWebhookToBackend(updatedWebhook);
    return { success: true };
  }

  async deleteWebhook(webhookId: string): Promise<{ success: boolean }> {
    const deleted = this.webhooks.delete(webhookId);
    return { success: deleted };
  }

  // Get webhook delivery statistics
  async getWebhookStats(webhookId: string): Promise<{
    totalDeliveries: number;
    successRate: number;
    averageResponseTime: number;
    lastDelivery?: string;
  } | null> {
    const webhook = this.webhooks.get(webhookId);
    if (!webhook) return null;

    const totalDeliveries = webhook.successCount + webhook.failureCount;
    const successRate =
      totalDeliveries > 0 ? (webhook.successCount / totalDeliveries) * 100 : 0;

    return {
      totalDeliveries,
      successRate,
      averageResponseTime: 150, // Placeholder - would calculate from actual delivery records
      lastDelivery: webhook.lastTriggered,
    };
  }
}

// Export singleton instance
export const webhookService = WebhookService.getInstance();

// Webhook testing utilities
export class WebhookTester {
  static async validateUrl(url: string): Promise<boolean> {
    try {
      const urlObj = new URL(url);
      return ["http:", "https:"].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }

  static async checkEndpointHealth(
    url: string,
    timeout = 5000,
  ): Promise<{
    healthy: boolean;
    responseTime?: number;
    error?: string;
  }> {
    const startTime = Date.now();

    try {
      const response = await fetch(url, {
        method: "HEAD",
        signal: AbortSignal.timeout(timeout),
      });

      const responseTime = Date.now() - startTime;

      return {
        healthy: response.ok,
        responseTime,
        error: response.ok ? undefined : `HTTP ${response.status}`,
      };
    } catch (error) {
      return {
        healthy: false,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  static generateTestPayload(eventType: string): any {
    const basePayload = {
      event: eventType,
      timestamp: new Date().toISOString(),
      environment: "test",
    };

    switch (eventType) {
      case WEBHOOK_EVENTS.USER_REGISTERED:
        return {
          ...basePayload,
          user: {
            id: "test_user_123",
            name: "Test User",
            email: "test@example.com",
            department: "Testing",
            joinDate: new Date().toISOString(),
          },
        };

      case WEBHOOK_EVENTS.BURNOUT_RISK_DETECTED:
        return {
          ...basePayload,
          user: {
            id: "test_user_123",
            name: "Test User",
            email: "test@example.com",
            department: "Testing",
          },
          riskLevel: "medium",
          riskFactors: ["sleep_debt", "low_quality_sleep"],
          sleepData: {
            averageHours: 5.2,
            qualityScore: 6.1,
            sleepDebt: 8.4,
          },
          recommendations: [
            "Increase sleep duration",
            "Improve sleep environment",
          ],
        };

      default:
        return {
          ...basePayload,
          data: {
            message: "This is a test webhook payload",
            testId: `test_${Date.now()}`,
          },
        };
    }
  }
}

// Webhook event builders for common scenarios
export class WebhookEventBuilder {
  static userRegistered(user: any): void {
    webhookService.triggerEvent(WEBHOOK_EVENTS.USER_REGISTERED, { user });
  }

  static userSleepDataUpdated(user: any, sleepData: any, source: string): void {
    webhookService.triggerEvent(WEBHOOK_EVENTS.USER_SLEEP_DATA_UPDATED, {
      user,
      sleepData,
      source,
    });
  }

  static campaignUserJoined(campaign: any, user: any): void {
    webhookService.triggerEvent(WEBHOOK_EVENTS.CAMPAIGN_USER_JOINED, {
      campaign,
      user,
      joinDate: new Date().toISOString(),
    });
  }

  static burnoutRiskDetected(
    user: any,
    riskLevel: string,
    riskFactors: string[],
    sleepData: any,
    recommendations: string[],
  ): void {
    webhookService.triggerEvent(WEBHOOK_EVENTS.BURNOUT_RISK_DETECTED, {
      user,
      riskLevel,
      riskFactors,
      sleepData,
      recommendations,
    });
  }

  static interventionSent(
    intervention: any,
    recipients: string[],
    message: string,
    deliveryMethod: string,
  ): void {
    webhookService.triggerEvent(WEBHOOK_EVENTS.INTERVENTION_SENT, {
      intervention,
      recipients,
      message,
      deliveryMethod,
      scheduledAt: intervention.scheduledAt,
      sentAt: new Date().toISOString(),
    });
  }
}

// Event constants and schemas are already exported above
