import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Moon,
  Send,
  MoreVertical,
  Settings,
  LogOut,
  Smartphone,
  TrendingUp,
  Clock,
  FileText,
  Target,
  Trophy,
  Menu,
  X,
  AlertTriangle,
  Brain,
  Zap,
  Heart,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your SleepFix.ai assistant. I'm here to help you improve your sleep and boost your productivity. How did you sleep last night?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string): string => {
    const responses = [
      "Thanks for sharing! Based on what you've told me, I'd recommend trying to maintain a consistent bedtime routine. Would you like me to help you create one?",
      "That's great progress! Your sleep patterns are improving. Let's do a quick sleep quality assessment - on a scale of 1-10, how refreshed did you feel this morning?",
      "I notice you mentioned feeling tired. Let's explore some factors that might be affecting your sleep. Have you had any caffeine after 2 PM recently?",
      "Excellent! It sounds like you're developing good sleep habits. Would you like to join our current wellness campaign 'Better Sleep in 7 Days'?",
      "I can help you track that. Based on your sleep data, I recommend aiming for 7-8 hours of sleep tonight. Shall I set a bedtime reminder for you?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getUserName = () => {
    const userData = localStorage.getItem("sleepfix-user");
    if (userData) {
      const user = JSON.parse(userData);
      return user.name.split(" ")[0];
    }
    return "User";
  };

  const handleLogout = () => {
    localStorage.removeItem("sleepfix-user");
    localStorage.setItem("userAuthenticated", "false");
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sleep-blue-50 via-background to-lavender-50">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-lavender-500 p-2 rounded-xl">
              <Moon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">
                SleepFix.ai
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                Welcome back, {getUserName()}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/assessments")}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              Assessments
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/goals")}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Target className="h-4 w-4 mr-2" />
              Goals
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/campaigns")}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Campaigns
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground"
              onClick={() => navigate("/integrations")}
            >
              <Smartphone className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Connect Device</span>
              <span className="lg:hidden">Devices</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSettings}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  navigate("/assessments");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                <FileText className="h-4 w-4 mr-2" />
                Assessments
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate("/goals");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                <Target className="h-4 w-4 mr-2" />
                Goals
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate("/campaigns");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Campaigns
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate("/integrations");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Connect Device
              </Button>
              <div className="border-t border-border/50 pt-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleSettings();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-muted-foreground"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-muted-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Quick Action Cards - Mobile */}
        <div className="md:hidden mb-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/assessments")}
              className="h-20 flex flex-col items-center justify-center gap-1"
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs">Assessments</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/goals")}
              className="h-20 flex flex-col items-center justify-center gap-1"
            >
              <Target className="h-5 w-5" />
              <span className="text-xs">Goals</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/campaigns")}
              className="h-20 flex flex-col items-center justify-center gap-1"
            >
              <Trophy className="h-5 w-5" />
              <span className="text-xs">Campaigns</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/integrations")}
              className="h-20 flex flex-col items-center justify-center gap-1"
            >
              <Smartphone className="h-5 w-5" />
              <span className="text-xs">Devices</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar with quick stats */}
          <div className="lg:w-80 space-y-4">
            {isLoading && (
              <Card className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            )}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Today's Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-lavender-100 p-2 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-lavender-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sleep Score</p>
                    <p className="text-2xl font-bold text-lavender-600">8.2</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-sleep-blue-100 p-2 rounded-lg">
                    <Clock className="h-4 w-4 text-sleep-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Night</p>
                    <p className="text-2xl font-bold text-sleep-blue-600">
                      7h 32m
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Sleep Risk Meter</CardTitle>
                <CardDescription>
                  Your current sleep health status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Risk Level</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Moderate
                  </Badge>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-3 rounded-full relative">
                    <div className="absolute top-0 left-[35%] w-3 h-3 bg-white border-2 border-yellow-500 rounded-full transform -translate-x-1/2"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on recent sleep patterns and duration
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Sleep Depth Score
                </CardTitle>
                <CardDescription>Quality of restorative sleep</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Activity className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">7.8</p>
                    <p className="text-xs text-muted-foreground">out of 10</p>
                  </div>
                </div>
                <Progress value={78} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  Good deep sleep phases detected
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  Productivity Impact
                </CardTitle>
                <CardDescription>How sleep affects your work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Week</span>
                    <span className="text-sm font-medium text-red-600">
                      -8%
                    </span>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <p className="text-xs text-red-700">
                        Poor sleep 3 days in a row may be affecting your focus
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommendation: Aim for 7-8 hours tonight
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Active Campaign</CardTitle>
                <CardDescription>7 Days to Better Sleep</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">Day 3 of 7</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-lavender-500 h-2 rounded-full w-[43%]"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1">
            <Card className="h-[calc(100vh-12rem)] lg:h-[calc(100vh-8rem)]">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-lavender-500 text-white text-sm">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base lg:text-lg">
                      Sleep Assistant
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Always here to help improve your sleep
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col h-full p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-2 lg:p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] lg:max-w-[80%] p-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-lavender-500 text-white ml-2 lg:ml-4"
                            : "bg-secondary text-foreground mr-2 lg:mr-4"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            message.role === "user"
                              ? "text-lavender-100"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-secondary text-foreground mr-2 lg:mr-4 p-3 rounded-2xl">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-border/50 p-2 lg:p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about your sleep, request assessments, or get wellness tips..."
                      className="flex-1 h-10 lg:h-11 text-sm lg:text-base"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-lavender-500 hover:bg-lavender-600 h-10 lg:h-11 px-3 lg:px-4"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
