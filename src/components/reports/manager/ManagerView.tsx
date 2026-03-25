"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  LayoutDashboard,
  Users as UsersIcon,
  CheckSquare,
  TrendingUp,
  FileText,
} from "lucide-react";

import TopPerformers from "./TopPerformers";
import AttendanceComparison from "./AttendanceComparison";
import TasksByCategory from "./TasksByCategory";
import LocationSummaryTable from "./LocationSummaryTable";
import EmployeePerformanceTable from "./EmployeePerformanceTable";
import OnTimeRateChart from "./OnTimeRateChart";

export default function ReportsManager() {
  const [activeTab, setActiveTab] = useState<"overview" | "employee">(
    "overview",
  );
  const [timeRange, setTimeRange] = useState("Month");

  // --- MOCK DATA ---
  const comparisonData = [
    { name: "Downtown", completion: 78, attendance: 92 },
    { name: "Westside", completion: 61, attendance: 85 },
    { name: "Northgate", completion: 55, attendance: 88 },
    { name: "East", completion: 84, attendance: 95 },
  ];

  const categoriesData = [
    { name: "Health & Safety", value: 2 },
    { name: "Administration", value: 1 },
    { name: "Marketing", value: 2 },
    { name: "Maintenance", value: 1 },
    { name: "Training", value: 1 },
    { name: "Inventory", value: 1 },
  ];

  const summaryData = [
    {
      name: "Downtown Ink",
      dotColor: "bg-indigo-500",
      staff: 3,
      tasksDone: "9/12",
      completion: 78,
      attendance: 92,
      overdue: 1,
    },
    {
      name: "Westside Studio",
      dotColor: "bg-amber-500",
      staff: 3,
      tasksDone: "8/14",
      completion: 61,
      attendance: 85,
      overdue: 3,
    },
    {
      name: "Northgate Tattoo",
      dotColor: "bg-emerald-500",
      staff: 3,
      tasksDone: "6/11",
      completion: 55,
      attendance: 88,
      overdue: 4,
    },
    {
      name: "East End Parlor",
      dotColor: "bg-red-500",
      staff: 3,
      tasksDone: "8/10",
      completion: 84,
      attendance: 95,
      overdue: 0,
    },
  ];

  const employeeData = [
    {
      id: 1,
      name: "Marcus Chen",
      role: "Artist",
      initials: "MC",
      score: 94,
      onTimeRate: 96,
      location: "Downtown Ink",
      tasks: "18/20",
      lateArrivals: 1,
    },
    {
      id: 2,
      name: "Sofia Rivera",
      role: "Receptionist",
      initials: "SR",
      score: 89,
      onTimeRate: 88,
      location: "Downtown Ink",
      tasks: "14/16",
      lateArrivals: 3,
    },
    {
      id: 3,
      name: "Jordan Blake",
      role: "Apprentice",
      initials: "JB",
      score: 88,
      onTimeRate: 92,
      location: "Downtown Ink",
      tasks: "10/12",
      lateArrivals: 2,
    },
  ];

  return (
    <div className="space-y-8 p-2">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Reports
          </h1>
          <p className="text-gray-500 text-sm">
            District performance reports and analytics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0A0A0A] border border-[#262626] p-1 rounded-xl flex gap-1">
            {["Week", "Month", "Quarter"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  timeRange === t
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-500 hover:text-gray-300",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-3 bg-[#0A0A0A] border border-[#262626] px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-[#111111]">
            All Location <ChevronDown size={14} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* 2. Tab Switcher */}
      <div className="bg-[#0A0A0A] border border-[#262626] p-1 rounded-2xl flex gap-1 w-fit">
        <button
          onClick={() => setActiveTab("overview")}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
            activeTab === "overview"
              ? "bg-white text-black shadow-xl"
              : "text-gray-500 hover:text-gray-300",
          )}
        >
          <LayoutDashboard size={16} /> Overview
        </button>
        <button
          onClick={() => setActiveTab("employee")}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
            activeTab === "employee"
              ? "bg-white text-black shadow-xl"
              : "text-gray-500 hover:text-gray-300",
          )}
        >
          <UsersIcon size={16} /> Employee Performance
        </button>
      </div>

      {/* 3. Main Content Rendering */}
      {activeTab === "overview" ? (
        <OverviewSection
          comparisonData={comparisonData}
          categoriesData={categoriesData}
          summaryData={summaryData}
        />
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TopPerformers
                performers={employeeData.map((d, i) => ({ ...d, rank: i + 1 }))}
              />
            </div>
            <div className="lg:col-span-2">
              <OnTimeRateChart data={employeeData} />
            </div>
          </div>
          <EmployeePerformanceTable data={employeeData} />
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS DECLARED OUTSIDE TO PREVENT RENDER ERRORS ---

function OverviewSection({ comparisonData, categoriesData, summaryData }: any) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ReportStatCard
          title="70%"
          subtitle="Task Completion"
          icon={CheckSquare}
          iconColor="text-blue-500"
        />
        <ReportStatCard
          title="90%"
          subtitle="Avg Attendance"
          icon={UsersIcon}
          iconColor="text-emerald-500"
        />
        <ReportStatCard
          title="10"
          subtitle="Overdue Task"
          icon={FileText}
          iconColor="text-amber-500"
        />
        <ReportStatCard
          title="46"
          subtitle="Late Arrival"
          icon={TrendingUp}
          iconColor="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceComparison data={comparisonData} />
        </div>
        <div className="lg:col-span-1">
          <TasksByCategory data={categoriesData} />
        </div>
      </div>

      <LocationSummaryTable data={summaryData} />
    </div>
  );
}

function ReportStatCard({ title, subtitle, icon: Icon, iconColor }: any) {
  return (
    <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl p-6 hover:border-[#404040] transition-colors group">
      <div
        className={cn(
          "w-10 h-10 rounded-xl bg-black border border-[#262626] flex items-center justify-center mb-4 group-hover:border-[#404040]",
          iconColor,
        )}
      >
        <Icon size={20} />
      </div>
      <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">
        {title}
      </h2>
      <p className="text-gray-400 text-sm font-medium">{subtitle}</p>
      <p className="text-gray-600 text-[10px] mt-1 font-bold tracking-widest uppercase">
        Avg across locations
      </p>
    </div>
  );
}
