"use client";
import { Calendar, Users, ClipboardCheck } from "lucide-react";
import StatCard from "./StatCard";

import { StaffList, TaskActivity } from "./DashboardLists";
import { useAppSelector } from "@/redux/store";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function DashboardBranchManager() {
  const user = useAppSelector(selectCurrentUser);

  // MOCK DATA
  const stats = [
    {
      title: "Total Employees",
      value: 45,
      subtitle: "At this location",
      icon: Users,
      iconColor: "text-indigo-400",
      iconBg: "bg-indigo-500/10",
    },
    {
      title: "Pending Verifications",
      value: 3,
      subtitle: "Awaiting your review",
      icon: ClipboardCheck,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Today's Attendance",
      value: 45,
      subtitle: "44 present · 1 late · 1 absent",
      icon: Calendar,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
      progressData: [
        { color: "bg-emerald-500", percent: 80 },
        { color: "bg-amber-500", percent: 10 },
        { color: "bg-red-500", percent: 10 },
      ],
    },
  ];

  const todayStaff = [
    {
      initials: "SD",
      name: "Sofia Delgado",
      role: "Tattoo Artist",
      status: "Present",
    },
    {
      initials: "JM",
      name: "Jake Morrow",
      role: "Tattoo Artist",
      status: "Present",
    },
    {
      initials: "PN",
      name: "Priya Nair",
      role: "Piercing Specialist",
      status: "Late",
      time: "20 Minutes",
    },
    {
      initials: "DW",
      name: "Deon Wallace",
      role: "Tattoo Artist",
      status: "Absent",
    },
  ];

  const recentTasks = [
    {
      title: "Clean & sterilize all workstations",
      assignee: "Sofia Delgado",
      due: "2026-02-25",
      status: "Awaiting Review",
    },
    {
      title: "Restock aftercare supplies",
      assignee: "Jake Morrow",
      due: "2026-02-25",
      status: "Awaiting Review",
    },
    {
      title: "Deep clean piercing room",
      assignee: "Priya Nair",
      due: "2026-02-24",
      status: "Overdue",
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-black min-h-screen">
      {/* Header section code remains same as your snippet */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Good morning, {user?.username || "Marcus"} 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Wednesday, February 25, 2026 — Inkhaus Studio
          </p>
        </div>
      </div>

      {/* 1. Stats Row */}
      <div className="flex flex-wrap gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* 2. Overdue Banner
      <OverdueBanner count={2} /> */}

      {/* 3. Lists Row */}
      <div className="flex flex-col lg:flex-row gap-6">
        <StaffList staff={todayStaff} />
        <TaskActivity tasks={recentTasks} />
      </div>
    </div>
  );
}
