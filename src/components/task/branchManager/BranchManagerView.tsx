"use client";

import { useAppSelector } from "@/redux/store";
import {
  selectCurrentUser,
  selectUserRole,
} from "@/redux/features/auth/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CheckSquare,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ListTodo,
  Users,
  AlertCircle,
  Building2,
  ChevronDown,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TaskItem from "./TaskItem";

// Mock data for task management (Branch Manager)
const taskStatsData = [
  {
    title: "Branch Tasks",
    value: "15",
    change: "+2",
    trend: "up",
    icon: Building2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Completed",
    value: "10",
    change: "+3",
    trend: "up",
    icon: CheckSquare,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "In Progress",
    value: "4",
    change: "+1",
    trend: "up",
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Overdue",
    value: "1",
    trend: "neutral",
    icon: AlertCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
];

const branchTasks = [
  {
    id: 1,
    title: "Daily branch opening checklist",
    status: "completed",
    dueDate: "2024-03-15",
    priority: "high",
  },
  {
    id: 2,
    title: "Inventory count for today",
    status: "in_progress",
    dueDate: "2024-03-15",
    priority: "high",
  },
  {
    id: 3,
    title: "Staff scheduling for next week",
    status: "pending",
    dueDate: "2024-03-18",
    priority: "medium",
  },
  {
    id: 4,
    title: "Customer feedback review",
    status: "completed",
    dueDate: "2024-03-14",
    priority: "low",
  },
  {
    id: 5,
    title: "Equipment maintenance check",
    status: "in_progress",
    dueDate: "2024-03-16",
    priority: "medium",
  },
];

const staffTasks = [
  {
    id: 1,
    title: "Prepare workstation",
    assignee: "John Doe",
    status: "completed",
    dueDate: "2024-03-15",
    priority: "high",
  },
  {
    id: 2,
    title: "Sanitize equipment",
    assignee: "Jane Smith",
    status: "completed",
    dueDate: "2024-03-15",
    priority: "high",
  },
  {
    id: 3,
    title: "Restock supplies",
    assignee: "Mike Johnson",
    status: "in_progress",
    dueDate: "2024-03-15",
    priority: "medium",
  },
  {
    id: 4,
    title: "Complete hygiene checklist",
    assignee: "Sarah Williams",
    status: "pending",
    dueDate: "2024-03-16",
    priority: "low",
  },
];

export default function BranchManagerView() {
  const user = useAppSelector(selectCurrentUser);
  const role = useAppSelector(selectUserRole);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-500";
      case "in_progress":
        return "bg-amber-500/20 text-amber-500";
      case "pending":
        return "bg-gray-500/20 text-gray-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Task Management
          </h1>
          <p className="text-muted-foreground">
            Manage branch tasks and staff assignments.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {taskStatsData.map((stat, index) => (
          <Card
            key={index}
            className="bg-card border-border hover:border-primary/30 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    stat.trend === "up"
                      ? "text-green-500"
                      : stat.trend === "down"
                        ? "text-red-500"
                        : "text-gray-500",
                  )}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : stat.trend === "down" ? (
                    <ArrowDownRight className="w-3 h-3" />
                  ) : null}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

     
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Branch Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Task
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                    Priority
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {branchTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-foreground">
                      {task.title}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          getStatusColor(task.status),
                        )}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={cn(
                          "text-sm font-medium capitalize",
                          getPriorityColor(task.priority),
                        )}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                      {task.dueDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

     
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Staff Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Task
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Assignee
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                    Priority
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-foreground">
                      {task.title}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {task.assignee}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          getStatusColor(task.status),
                        )}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={cn(
                          "text-sm font-medium capitalize",
                          getPriorityColor(task.priority),
                        )}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                      {task.dueDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card> */}
      <div className="min-h-screen bg-black p-8 font-sans text-white">
        {/* 1. Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Task Management</h1>
            <p className="text-gray-500 text-sm">
              Create and assign tasks across all locations
            </p>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <Plus size={18} /> Create Task
          </button>
        </div>

        {/* 2. Controls Section (Search & Filter) */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full bg-[#0A0A0A] border border-[#262626] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#262626] rounded-xl px-4 py-2.5 text-sm cursor-pointer min-w-[140px]">
              All Location{" "}
              <ChevronDown size={16} className="ml-auto text-gray-500" />
            </div>

            <div className="bg-[#0A0A0A] border border-[#262626] rounded-xl p-1 flex gap-1">
              {["All", "Pending", "In-Progress", "Completed", "Overdue"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === "All" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* 3. Tasks List */}
        <div className="space-y-3 mb-10">
          <TaskItem
            title="Complete weekly sterilization log"
            description="Document all sterilization equipment checks for the week"
            assignee="Marcus Chen"
            role="Tattoo Artist"
            dueDate="2026-02-22"
            status="Completed"
          />
          <TaskItem
            title="Update client consent forms"
            description="Ensure all consent forms are updated per new regulation"
            assignee="Marcus Chen"
            role="Staff"
            dueDate="2026-02-22"
            status="In Progress"
          />
          <TaskItem
            title="Portfolio review & client showcase update"
            description="Add latest completed work to the studio portfolio display"
            assignee="Aria Thompson"
            role="Staff"
            dueDate="2026-02-28"
            status="Pending"
          />
        </div>

        {/* 4. Pagination Section */}
        <div className="flex items-center justify-between pt-6 border-t border-[#1A1A1A]">
          <p className="text-gray-500 text-sm">Showing 1 to 5 of 24 results</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-[#262626] rounded-lg text-gray-500 hover:text-white">
              <ChevronLeft size={18} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-9 h-9 rounded-lg border text-sm transition-all ${page === 1 ? "border-[#403E39] bg-[#1C1C1A] text-white" : "border-[#262626] text-gray-500 hover:text-white"}`}
              >
                {page}
              </button>
            ))}
            <span className="text-gray-500 mx-1">...</span>
            <button className="w-9 h-9 rounded-lg border border-[#262626] text-sm text-gray-500">
              10
            </button>
            <button className="p-2 border border-[#262626] rounded-lg text-gray-500 hover:text-white">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      );
    </div>
  );
}
