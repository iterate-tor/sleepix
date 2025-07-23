import { useState } from "react";
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
import { Moon, Eye, EyeOff, User } from "lucide-react";

interface EmployeeLoginProps {
  onLogin: () => void;
}

export function EmployeeLogin({ onLogin }: EmployeeLoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simple demo authentication
    if (
      formData.email === "employee@company.com" &&
      formData.password === "employee123"
    ) {
      // Store user data to simulate login
      localStorage.setItem(
        "sleepfix-user",
        JSON.stringify({
          name: "John Employee",
          email: formData.email,
          gender: "male",
          sleepGoal: "better-quality",
        }),
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onLogin();
    } else {
      setError("Invalid email or password");
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sleep-blue-50 via-background to-lavender-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-lavender-500 p-3 rounded-2xl">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-lg">
            Sign in to continue your sleep journey
          </p>
        </div>

        <Card className="border-border/50 shadow-lg backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
              <Moon className="h-5 w-5 text-lavender-500" />
              SleepFix.ai
            </CardTitle>
            <CardDescription>
              Access your personal sleep assistant and wellness programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="employee@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-start">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded" />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-lavender-500 hover:bg-lavender-600 text-white font-medium text-base"
                disabled={isSubmitting || !formData.email || !formData.password}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                Email: employee@company.com
              </p>
              <p className="text-xs text-muted-foreground">
                Password: employee123
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="/onboarding"
              className="text-lavender-600 hover:text-lavender-700 font-medium underline underline-offset-2"
            >
              Sign up for free
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Are you an admin?{" "}
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
