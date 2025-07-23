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
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { format } from "date-fns";
import {
  Shield,
  Moon,
  Eye,
  EyeOff,
  Calendar as CalendarIcon,
  Clock,
  Mail,
  CheckCircle,
} from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Demo request state
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoData, setDemoData] = useState({
    email: "",
    company: "",
    employees: "",
    selectedDate: undefined as Date | undefined,
    selectedTime: "",
  });
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simple demo authentication
    if (
      formData.email === "admin@company.com" &&
      formData.password === "admin123"
    ) {
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

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemoSubmitting(true);

    // Simulate API call for demo request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would integrate with your backend API
    console.log("Demo request submitted:", {
      ...demoData,
      selectedDate: demoData.selectedDate?.toISOString(),
    });

    setDemoSuccess(true);
    setIsDemoSubmitting(false);

    // Close modal after success message
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setDemoSuccess(false);
      setDemoData({
        email: "",
        company: "",
        employees: "",
        selectedDate: undefined,
        selectedTime: "",
      });
    }, 2000);
  };

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Exclude weekends
  };

  const isFormValid =
    demoData.email &&
    demoData.company &&
    demoData.employees &&
    demoData.selectedDate &&
    demoData.selectedTime;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sleep-blue-50 via-background to-lavender-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-sleep-blue-600 p-2 sm:p-3 rounded-2xl">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg px-2">
            Manage your organization's sleep wellness program
          </p>
        </div>

        <Card className="border-border/50 shadow-lg backdrop-blur-sm">
          <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl font-semibold flex items-center justify-center gap-2">
              <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-sleep-blue-600" />
              SleepFix.ai Admin
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Sign in to access organizational sleep analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base"
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
                    className="h-10 sm:h-11 pr-10 text-sm sm:text-base"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-10 sm:h-11 px-2 sm:px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-10 sm:h-12 bg-sleep-blue-600 hover:bg-sleep-blue-700 text-white font-medium text-sm sm:text-base"
                disabled={isSubmitting || !formData.email || !formData.password}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-xs sm:text-sm">Signing in...</span>
                  </div>
                ) : (
                  <span className="text-sm sm:text-base">
                    Sign In to Admin Dashboard
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                <strong>Demo Credentials:</strong>
              </p>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground break-all">
                  Email: admin@company.com
                </p>
                <p className="text-xs text-muted-foreground">
                  Password: admin123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-4 sm:mt-6 px-2 space-y-3">
          {/* Request Demo Button */}
          <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-10 sm:h-12 border-2 border-lavender-200 hover:border-lavender-300 text-lavender-700 hover:bg-lavender-50 font-medium text-sm sm:text-base mb-3"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Request a Demo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Shield className="h-5 w-5 text-sleep-blue-600" />
                  Schedule Your Demo
                </DialogTitle>
                <DialogDescription>
                  Book a personalized demo to see how SleepFix.ai can transform
                  your organization's productivity through better sleep
                  wellness.
                </DialogDescription>
              </DialogHeader>

              {demoSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <h3 className="text-xl font-semibold text-green-700">
                    Demo Scheduled!
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    We've received your request and will send you a calendar
                    invitation shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="demo-email">Work Email *</Label>
                      <Input
                        id="demo-email"
                        type="email"
                        placeholder="you@company.com"
                        value={demoData.email}
                        onChange={(e) =>
                          setDemoData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        required
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demo-company">Company Name *</Label>
                      <Input
                        id="demo-company"
                        placeholder="Your Company"
                        value={demoData.company}
                        onChange={(e) =>
                          setDemoData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        required
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="demo-employees">Company Size *</Label>
                    <Select
                      value={demoData.employees}
                      onValueChange={(value) =>
                        setDemoData((prev) => ({ ...prev, employees: value }))
                      }
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select number of employees" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-50">10-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">
                          201-500 employees
                        </SelectItem>
                        <SelectItem value="501-1000">
                          501-1000 employees
                        </SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Select Demo Date & Time *
                    </Label>

                    <div className="space-y-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal h-10"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {demoData.selectedDate
                              ? format(demoData.selectedDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={demoData.selectedDate}
                            onSelect={(date) =>
                              setDemoData((prev) => ({
                                ...prev,
                                selectedDate: date,
                              }))
                            }
                            disabled={(date) =>
                              date < new Date() || !isWeekday(date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      {demoData.selectedDate && (
                        <Select
                          value={demoData.selectedTime}
                          onValueChange={(value) =>
                            setDemoData((prev) => ({
                              ...prev,
                              selectedTime: value,
                            }))
                          }
                        >
                          <SelectTrigger className="w-full h-10">
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time} (EST)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>

                  <div className="bg-sleep-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sleep-blue-900 mb-2">
                      What to expect:
                    </h4>
                    <ul className="text-sm text-sleep-blue-700 space-y-1">
                      <li>• 30-minute personalized walkthrough</li>
                      <li>• Live demo of admin dashboard & analytics</li>
                      <li>• Discussion of your specific needs</li>
                      <li>• Custom pricing and implementation plan</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-sleep-blue-600 hover:bg-sleep-blue-700 text-white font-medium"
                    disabled={!isFormValid || isDemoSubmitting}
                  >
                    {isDemoSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Scheduling Demo...</span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Schedule Demo
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <p className="text-xs sm:text-sm text-muted-foreground">
            Looking for the employee interface?{" "}
            <a
              href="/login"
              className="text-lavender-600 hover:text-lavender-700 font-medium underline underline-offset-2 break-words"
            >
              Employee Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
