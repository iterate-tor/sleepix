import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Moon, Sparkles } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    sleepGoal: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store user data (in real app, this would go to backend)
    localStorage.setItem("sleepfix-user", JSON.stringify(formData));

    onComplete();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sleep-blue-50 via-background to-lavender-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-lavender-500 p-3 rounded-2xl">
              <Moon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to SleepFix.ai
          </h1>
          <p className="text-muted-foreground text-lg">
            Your personal sleep assistant for better rest and productivity
          </p>
        </div>

        <Card className="border-border/50 shadow-lg backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-lavender-500" />
              Let's get started
            </CardTitle>
            <CardDescription>
              Tell us a bit about yourself to personalize your sleep journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your work email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium">
                  Gender
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your gender" />
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
                <Label htmlFor="sleepGoal" className="text-sm font-medium">
                  Sleep Goal{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Select
                  value={formData.sleepGoal}
                  onValueChange={(value) =>
                    handleInputChange("sleepGoal", value)
                  }
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="What's your main sleep goal?" />
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

              <Button
                type="submit"
                className="w-full h-12 bg-lavender-500 hover:bg-lavender-600 text-white font-medium text-base"
                disabled={isSubmitting || !formData.name || !formData.email}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Setting up your profile...
                  </div>
                ) : (
                  "Start My Sleep Journey"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-lavender-600 hover:text-lavender-700 font-medium underline underline-offset-2"
            >
              Sign in instead
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Are you a manager or HR admin?{" "}
            <a
              href="/admin/login"
              className="text-lavender-600 hover:text-lavender-700 font-medium underline underline-offset-2"
            >
              Sign in to Admin Dashboard
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
