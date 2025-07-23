import { useState } from "react";
import { Button } from "../components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
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
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle,
  Play,
  Star,
  Calendar,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Assessment {
  id: string;
  name: string;
  acronym: string;
  description: string;
  duration: string;
  questions: number;
  type: "sleep-quality" | "insomnia" | "chronotype" | "general";
  difficulty: "beginner" | "intermediate" | "advanced";
  lastTaken?: string;
  score?: number;
  maxScore: number;
  interpretation?: string;
}

interface AssessmentResult {
  id: string;
  assessmentId: string;
  score: number;
  dateTaken: string;
  interpretation: string;
  recommendations: string[];
}

export function EmployeeAssessments() {
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] =
    useState<Assessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  // Mock assessment data
  const assessments: Assessment[] = [
    {
      id: "psqi",
      name: "Pittsburgh Sleep Quality Index",
      acronym: "PSQI",
      description:
        "Comprehensive assessment of sleep quality and patterns over the past month",
      duration: "5-7 minutes",
      questions: 9,
      type: "sleep-quality",
      difficulty: "beginner",
      lastTaken: "2024-01-10",
      score: 6,
      maxScore: 21,
      interpretation: "Fair sleep quality",
    },
    {
      id: "isi",
      name: "Insomnia Severity Index",
      acronym: "ISI",
      description:
        "Evaluate the nature, severity and impact of insomnia symptoms",
      duration: "3-5 minutes",
      questions: 7,
      type: "insomnia",
      difficulty: "beginner",
      maxScore: 28,
    },
    {
      id: "mctq",
      name: "Munich Chronotype Questionnaire",
      acronym: "MCTQ",
      description:
        "Determine your natural sleep-wake rhythm and chronotype preferences",
      duration: "8-10 minutes",
      questions: 12,
      type: "chronotype",
      difficulty: "intermediate",
      lastTaken: "2024-01-05",
      score: 3.2,
      maxScore: 5,
      interpretation: "Moderate evening type",
    },
    {
      id: "ess",
      name: "Epworth Sleepiness Scale",
      acronym: "ESS",
      description: "Measure your general level of daytime sleepiness",
      duration: "2-3 minutes",
      questions: 8,
      type: "general",
      difficulty: "beginner",
      maxScore: 24,
    },
  ];

  // Mock assessment results history
  const assessmentResults: AssessmentResult[] = [
    {
      id: "1",
      assessmentId: "psqi",
      score: 6,
      dateTaken: "2024-01-10",
      interpretation: "Fair sleep quality",
      recommendations: [
        "Maintain consistent sleep schedule",
        "Create a relaxing bedtime routine",
        "Limit screen time before bed",
      ],
    },
    {
      id: "2",
      assessmentId: "mctq",
      score: 3.2,
      dateTaken: "2024-01-05",
      interpretation: "Moderate evening type",
      recommendations: [
        "Consider later bedtime on weekends",
        "Use bright light therapy in morning",
        "Avoid late evening activities",
      ],
    },
  ];

  // Mock questions for demonstration
  const sampleQuestions = [
    {
      question:
        "During the past month, what time have you usually gone to bed at night?",
      type: "time",
      options: [],
    },
    {
      question:
        "During the past month, how long (in minutes) has it usually taken you to fall asleep each night?",
      type: "number",
      options: [],
    },
    {
      question:
        "During the past month, how would you rate your sleep quality overall?",
      type: "scale",
      options: [
        { value: 0, label: "Very good" },
        { value: 1, label: "Fairly good" },
        { value: 2, label: "Fairly bad" },
        { value: 3, label: "Very bad" },
      ],
    },
  ];

  const getAssessmentTypeColor = (type: Assessment["type"]) => {
    switch (type) {
      case "sleep-quality":
        return "bg-blue-100 text-blue-800";
      case "insomnia":
        return "bg-red-100 text-red-800";
      case "chronotype":
        return "bg-purple-100 text-purple-800";
      case "general":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: Assessment["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStartAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers({});
    setIsAssessmentOpen(true);
  };

  const handleAnswerChange = (questionIndex: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (selectedAssessment?.questions || 0) - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Complete assessment
      alert("Assessment completed! Results would be calculated and saved.");
      setIsAssessmentOpen(false);
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
              className="mr-2 md:mr-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="bg-blue-500 p-2 rounded-xl">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">
                Sleep Assessments
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                Track your sleep patterns and quality
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Welcome {getUserName()}!
            </CardTitle>
            <CardDescription>
              Regular sleep assessments help us understand your patterns and
              provide personalized recommendations. Complete assessments to
              unlock detailed insights and track your progress over time.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {assessments.filter((a) => a.lastTaken).length}
              </div>
              <p className="text-xs text-muted-foreground">
                of {assessments.length} assessments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Last Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-lavender-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lavender-600">
                {assessmentResults[0]?.score || "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                PSQI Sleep Quality
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-sleep-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sleep-blue-600">2</div>
              <p className="text-xs text-muted-foreground">Assessments taken</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Available Assessments</CardTitle>
            <CardDescription>
              Choose from validated sleep assessment tools to evaluate different
              aspects of your sleep health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {assessments.map((assessment) => (
                <Card
                  key={assessment.id}
                  className="relative transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">
                            {assessment.acronym}
                          </CardTitle>
                          {assessment.lastTaken && (
                            <Badge
                              variant="outline"
                              className="text-green-600 border-green-600"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">
                          {assessment.name}
                        </h4>
                        <CardDescription className="text-sm">
                          {assessment.description}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge
                        variant="secondary"
                        className={getAssessmentTypeColor(assessment.type)}
                      >
                        {assessment.type.replace("-", " ")}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={getDifficultyColor(assessment.difficulty)}
                      >
                        {assessment.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{assessment.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{assessment.questions} questions</span>
                        </div>
                      </div>

                      {assessment.lastTaken && (
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              Last Result
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(
                                assessment.lastTaken,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-lavender-600">
                              {assessment.score}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              / {assessment.maxScore}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {assessment.interpretation}
                          </p>
                        </div>
                      )}

                      <Button
                        onClick={() => handleStartAssessment(assessment)}
                        className="w-full bg-lavender-500 hover:bg-lavender-600 focus:ring-2 focus:ring-lavender-300 focus:ring-offset-2"
                        aria-label={`${assessment.lastTaken ? "Retake" : "Start"} ${assessment.name} assessment`}
                      >
                        <Play className="h-4 w-4 mr-2" aria-hidden="true" />
                        {assessment.lastTaken
                          ? "Retake Assessment"
                          : "Start Assessment"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        {assessmentResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Results
              </CardTitle>
              <CardDescription>
                View your assessment history and track improvements over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessmentResults.map((result) => {
                  const assessment = assessments.find(
                    (a) => a.id === result.assessmentId,
                  );
                  return (
                    <div
                      key={result.id}
                      className="border border-border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{assessment?.acronym}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(result.dateTaken).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-lavender-600">
                            {result.score} / {assessment?.maxScore}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.interpretation}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <Progress
                          value={
                            (result.score / (assessment?.maxScore || 1)) * 100
                          }
                          className="h-2"
                        />
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-2">
                          Recommendations:
                        </h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-lavender-500 mt-1">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Assessment Dialog */}
      <Dialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedAssessment?.acronym} - Question {currentQuestion + 1} of{" "}
              {selectedAssessment?.questions}
            </DialogTitle>
            <DialogDescription>
              Take your time to answer each question honestly for the most
              accurate results.
            </DialogDescription>
          </DialogHeader>

          {selectedAssessment && (
            <div className="space-y-6">
              <Progress
                value={
                  ((currentQuestion + 1) / selectedAssessment.questions) * 100
                }
                className="h-2"
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {
                    sampleQuestions[
                      Math.min(currentQuestion, sampleQuestions.length - 1)
                    ]?.question
                  }
                </h3>

                {sampleQuestions[
                  Math.min(currentQuestion, sampleQuestions.length - 1)
                ]?.type === "scale" && (
                  <div className="space-y-2">
                    {sampleQuestions[
                      Math.min(currentQuestion, sampleQuestions.length - 1)
                    ]?.options.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={option.value}
                          onChange={(e) =>
                            handleAnswerChange(
                              currentQuestion,
                              parseInt(e.target.value),
                            )
                          }
                          className="h-4 w-4"
                        />
                        <Label>{option.label}</Label>
                      </div>
                    ))}
                  </div>
                )}

                {sampleQuestions[
                  Math.min(currentQuestion, sampleQuestions.length - 1)
                ]?.type === "time" && (
                  <Input
                    type="time"
                    onChange={(e) =>
                      handleAnswerChange(
                        currentQuestion,
                        parseInt(e.target.value.replace(":", "")),
                      )
                    }
                  />
                )}

                {sampleQuestions[
                  Math.min(currentQuestion, sampleQuestions.length - 1)
                ]?.type === "number" && (
                  <Input
                    type="number"
                    placeholder="Enter number of minutes"
                    onChange={(e) =>
                      handleAnswerChange(
                        currentQuestion,
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                )}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentQuestion(Math.max(0, currentQuestion - 1))
                  }
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>

                <Button
                  onClick={handleNextQuestion}
                  disabled={!(currentQuestion in answers)}
                  className="bg-lavender-500 hover:bg-lavender-600"
                >
                  {currentQuestion === selectedAssessment.questions - 1
                    ? "Complete"
                    : "Next"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
