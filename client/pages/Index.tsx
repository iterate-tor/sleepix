import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Moon, Shield, User, ArrowRight, Star } from "lucide-react";

export function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sleep-blue-50 via-background to-lavender-50">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-lavender-500 p-2 rounded-xl">
              <Moon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SleepFix.ai</h1>
              <p className="text-sm text-muted-foreground">
                AI-Powered Corporate Wellness
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <a href="/login">Employee Sign In</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/admin/login">Admin Portal</a>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-lavender-500 to-sleep-blue-500 p-4 rounded-2xl">
              <Moon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Transform Your Team's
            <span className="text-lavender-600"> Sleep & Productivity</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-powered sleep coaching and wellness campaigns that boost employee
            performance, reduce burnout, and create a healthier workplace
            culture.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-lavender-500 hover:bg-lavender-600 text-lg h-12 px-8"
              asChild
            >
              <a href="/onboarding">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg h-12 px-8"
              asChild
            >
              <a href="/admin/login">Book a Demo</a>
            </Button>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Choose Your Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Employee Card */}
            <Card className="border-2 hover:border-lavender-300 transition-colors cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lavender-100 p-4 rounded-2xl group-hover:bg-lavender-200 transition-colors">
                    <User className="h-10 w-10 text-lavender-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">I'm an Employee</CardTitle>
                <CardDescription className="text-lg">
                  Access your personal sleep assistant and wellness programs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-lavender-500" />
                    <span className="text-sm">Personal sleep coaching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-lavender-500" />
                    <span className="text-sm">Daily wellness check-ins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-lavender-500" />
                    <span className="text-sm">Campaign participation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-lavender-500" />
                    <span className="text-sm">Device integrations</span>
                  </li>
                </ul>
                <div className="pt-4 space-y-2">
                  <Button
                    className="w-full bg-lavender-500 hover:bg-lavender-600"
                    asChild
                  >
                    <a href="/onboarding">Start My Journey</a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/login">Sign In</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin Card */}
            <Card className="border-2 hover:border-sleep-blue-300 transition-colors cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-sleep-blue-100 p-4 rounded-2xl group-hover:bg-sleep-blue-200 transition-colors">
                    <Shield className="h-10 w-10 text-sleep-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">I'm an Admin</CardTitle>
                <CardDescription className="text-lg">
                  Manage employee wellness programs and view analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-sleep-blue-500" />
                    <span className="text-sm">Team sleep analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-sleep-blue-500" />
                    <span className="text-sm">Campaign management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-sleep-blue-500" />
                    <span className="text-sm">User administration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-sleep-blue-500" />
                    <span className="text-sm">ROI tracking</span>
                  </li>
                </ul>
                <div className="pt-4 space-y-2">
                  <Button
                    className="w-full bg-sleep-blue-600 hover:bg-sleep-blue-700"
                    asChild
                  >
                    <a href="/admin/login">Access Admin Portal</a>
                  </Button>
                  <Button variant="outline" className="w-full">
                    Request Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Why Choose SleepFix.ai?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-lavender-100 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Moon className="h-8 w-8 text-lavender-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-muted-foreground">
                Personalized recommendations based on sleep patterns and
                performance data
              </p>
            </div>
            <div className="text-center">
              <div className="bg-sleep-blue-100 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-sleep-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security with anonymous data aggregation and
                GDPR compliance
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-muted-foreground">
                15% average improvement in productivity and 23% reduction in
                sick days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-lavender-500 p-2 rounded-xl">
                <Moon className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-foreground">SleepFix.ai</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SleepFix.ai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
