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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Search,
  Plus,
  MoreVertical,
  Users,
  Mail,
  Calendar,
  Download,
  Filter,
  Menu,
  X,
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  joinDate: string;
  status: "active" | "inactive";
  sleepScore: number;
  lastActive: string;
}

export function AdminUserManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock user data
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Engineering",
      joinDate: "2024-01-15",
      status: "active",
      sleepScore: 8.2,
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      department: "Sales",
      joinDate: "2024-02-10",
      status: "active",
      sleepScore: 6.8,
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      department: "Marketing",
      joinDate: "2024-01-22",
      status: "active",
      sleepScore: 7.5,
      lastActive: "3 hours ago",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@company.com",
      department: "Engineering",
      joinDate: "2023-11-08",
      status: "inactive",
      sleepScore: 7.1,
      lastActive: "1 week ago",
    },
    {
      id: "5",
      name: "Lisa Thompson",
      email: "lisa.thompson@company.com",
      department: "HR",
      joinDate: "2024-03-05",
      status: "active",
      sleepScore: 8.7,
      lastActive: "30 minutes ago",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleUserAction = (action: string, user: User) => {
    alert(`${action} action for ${user.name} would be implemented here`);
  };

  const handleExportUsers = () => {
    alert("Export functionality would be implemented here");
  };

  const getSleepScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 7) return "text-yellow-600";
    return "text-red-600";
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
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-foreground">
                User Management
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                Manage employee accounts and permissions
              </p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Button
              onClick={handleExportUsers}
              variant="outline"
              size="sm"
              className="text-muted-foreground"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Export</span>
            </Button>

            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-lavender-500 hover:bg-lavender-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Invite a new employee to join the wellness program
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input placeholder="employee@company.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Input placeholder="Enter department" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddUserOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        alert("User invitation would be sent");
                        setIsAddUserOpen(false);
                      }}
                      className="flex-1 bg-lavender-500 hover:bg-lavender-600"
                    >
                      Send Invitation
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                  handleExportUsers();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAddUserOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-muted-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-lavender-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-lavender-600">
                {users.length}
              </div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {users.filter((u) => u.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  (users.filter((u) => u.status === "active").length /
                    users.length) *
                    100,
                )}
                % of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Sleep Score
              </CardTitle>
              <Calendar className="h-4 w-4 text-sleep-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sleep-blue-600">
                {(
                  users.reduce((acc, user) => acc + user.sleepScore, 0) /
                  users.length
                ).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Across all users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Filter className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {new Set(users.map((u) => u.department)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Unique departments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Employee Directory</CardTitle>
                <CardDescription>
                  View and manage all employee accounts
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sleep Score</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      {new Date(user.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active" ? "default" : "secondary"
                        }
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${getSleepScoreColor(
                          user.sleepScore,
                        )}`}
                      >
                        {user.sleepScore}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastActive}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleUserAction("View Profile", user)
                            }
                          >
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUserAction("View Sleep Data", user)
                            }
                          >
                            View Sleep Data
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUserAction("Send Message", user)
                            }
                          >
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUserAction("Deactivate", user)}
                            className="text-destructive"
                          >
                            {user.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No users found matching your search.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
