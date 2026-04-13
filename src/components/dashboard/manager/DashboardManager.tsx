"use client";

import { useAppSelector } from "@/redux/store";
import {
  selectCurrentUser,
  // selectUserRole,
} from "@/redux/features/auth/authSlice";

import {
  Users,
  MapPin,
  Calendar,
  ClipboardCheck,
  AlertTriangle,
} from "lucide-react";
import StatCard from "./StatCard";
import LocationPerformanceCard from "./LocationPerformanceCard";
import AttendanceTable from "./AttendanceTable";
import TaskActivityChart from "./TaskActivityChart";

// Mock data for the dashboard
const stats = [
  {
    title: "Active Locations",
    value: "4",
    description: "All locations operational",
    icon: MapPin,
    iconBgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Task Completion",
    value: "66%",
    description: "31/47 tasks done",
    icon: ClipboardCheck,
    iconBgColor: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
  },
  {
    title: "Avg Attendance",
    value: "90%",
    description: "Across all locations",
    icon: Users,
    iconBgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    title: "Overdue Tasks",
    value: "8",
    description: "Requires attention",
    icon: AlertTriangle,
    iconBgColor: "bg-red-500/10",
    iconColor: "text-red-500",
  },
];

const locations = [
  {
    name: "Downtown Ink",
    location: "New York",
    status: "Active" as const,
    taskCompletion: 78,
    attendance: 92,
    staffCount: 3,
    overdueCount: 1,
  },
  {
    name: "Westside Studio",
    location: "Brooklyn",
    status: "Active" as const,
    taskCompletion: 61,
    attendance: 85,
    staffCount: 3,
    overdueCount: 3,
  },
  // ... add more as needed
];

export default function DashboardManager() {
  const user = useAppSelector(selectCurrentUser);
  // const role = useAppSelector(selectUserRole);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Dashboard Overview
          </h1>
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
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="pt-6">
        <h2 className="text-white text-xl font-bold mb-6">
          Location Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((loc, idx) => (
            <LocationPerformanceCard key={idx} {...loc} />
          ))}
        </div>
      </div>

      {/* Attendance Summary Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <TaskActivityChart />
        <AttendanceTable />
      </div>
    </div>
  );
}
