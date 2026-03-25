/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import PerformanceSummaryCard from "./SummaryCards";
import EmployeeBreakdown from "./EmployeeBreakdown";
import TaskLog from "./TaskLog";

export default function ReportsBranchManager() {
  const [timeRange, setTimeRange] = useState("Month");

  // --- MOCK DATA ---
  const summaryStats = [
    {
      label: "Completed",
      value: "2",
      subtitle: "Approved tasks",
      type: "completed" as const,
    },
    {
      label: "Overdue",
      value: "2",
      subtitle: "Past due date",
      type: "overdue" as const,
    },
    {
      label: "In Progress",
      value: "4",
      subtitle: "Pending or submitted",
      type: "in-progress" as const,
    },
    {
      label: "Avg. Attendance",
      value: "91%",
      subtitle: "This month",
      type: "attendance" as const,
    },
  ];

  const employeePerformance = [
    {
      initials: "SD",
      name: "Sofia Delgado",
      role: "Tattoo Artist",
      today: "Present",
      attendance: 96,
      completed: 14,
      overdue: 1,
      performance: 95,
    },
    {
      initials: "JM",
      name: "Jake Morrow",
      role: "Tattoo Artist",
      today: "Present",
      attendance: 88,
      completed: 11,
      overdue: 2,
      performance: 86,
    },
    {
      initials: "PN",
      name: "Priya Nair",
      role: "Piercing Specialist",
      today: "Late",
      attendance: 91,
      completed: 9,
      overdue: 0,
      performance: 95,
    },
    {
      initials: "DW",
      name: "Deon Wallace",
      role: "Tattoo Artist",
      today: "Absent",
      attendance: 78,
      completed: 7,
      overdue: 3,
      performance: 74,
    },
    {
      initials: "CO",
      name: "Camille Osei",
      role: "Front Desk",
      today: "Present",
      attendance: 100,
      completed: 18,
      overdue: 0,
      performance: 100,
    },
  ];

  const taskCompletionData = [
    { name: "Sofia", completed: 14, overdue: 1 },
    { name: "Jake", completed: 11, overdue: 2 },
    { name: "Priya", completed: 9, overdue: 0 },
    { name: "Deon", completed: 7, overdue: 3 },
    { name: "Camille", completed: 18, overdue: 0 },
  ];

  const attendanceRateData = [
    { name: "Sofia", rate: 96 },
    { name: "Jake", rate: 88 },
    { name: "Priya", rate: 91 },
    { name: "Deon", rate: 78 },
    { name: "Camille", rate: 100 },
  ];

  const taskLogData: any[] = [
    {
      id: 1,
      task: "Clean & sterilize all workstations",
      assignedTo: "Sofia Delgado",
      dueDate: "2026-02-25",
      status: "Awaiting Review",
    },
    {
      id: 2,
      task: "Restock aftercare supplies",
      assignedTo: "Jake Morrow",
      dueDate: "2026-02-25",
      status: "Awaiting Review",
    },
    {
      id: 3,
      task: "Update appointment schedule board",
      assignedTo: "Camille Osei",
      dueDate: "2026-02-25",
      status: "Awaiting Review",
    },
    {
      id: 4,
      task: "Check autoclave cycle log",
      assignedTo: "Priya Nair",
      dueDate: "2026-02-25",
      status: "Pending",
    },
    {
      id: 5,
      task: "Deep clean piercing room",
      assignedTo: "Priya Nair",
      dueDate: "2026-02-24",
      status: "Overdue",
    },
    {
      id: 6,
      task: "Social media content check-in",
      assignedTo: "Deon Wallace",
      dueDate: "2026-02-23",
      status: "Overdue",
    },
    {
      id: 7,
      task: "Client consultation room setup",
      assignedTo: "Sofia Delgado",
      dueDate: "2026-02-20",
      status: "Approved",
    },
    {
      id: 8,
      task: "Inventory ink supply count",
      assignedTo: "Jake Morrow",
      dueDate: "2026-02-22",
      status: "Approved",
    },
  ];

  return (
    <div className="space-y-8 p-6 bg-black min-h-screen text-white">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Staff Performance
          </h1>
          <p className="text-gray-500 text-sm">
            View attendance, task completion, and performance metrics.
          </p>
        </div>
        <button className="bg-[#121212] border border-[#262626] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1A1A1A] flex items-center gap-3 transition-colors">
          All Employees <ChevronDown size={14} className="text-gray-500" />
        </button>
      </div>

      {/* 2. Top Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, i) => (
          <PerformanceSummaryCard key={i} {...stat} />
        ))}
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Completion Bar Chart */}
        <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-6 h-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-white">
                Task Completion by Employee
              </h3>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">
                Completed vs overdue tasks
              </p>
            </div>
            <div className="flex gap-4 text-[9px] uppercase font-bold tracking-tighter">
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#6366F1]" /> Completed
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#991B1B]" /> Overdue
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              data={taskCompletionData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#1A1A1A"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4B5563", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4B5563", fontSize: 11 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.02)" }}
                contentStyle={{
                  backgroundColor: "#0D0D0D",
                  border: "1px solid #262626",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="completed"
                fill="#6366F1"
                radius={[4, 4, 0, 0]}
                barSize={14}
              />
              <Bar
                dataKey="overdue"
                fill="#991B1B"
                radius={[4, 4, 0, 0]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Rate Bar Chart */}
        <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-6 h-100">
          <h3 className="font-bold text-white mb-1">Attendance Rate</h3>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1 mb-8">
            Percentage this month
          </p>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              data={attendanceRateData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#1A1A1A"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4B5563", fontSize: 11 }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4B5563", fontSize: 11 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.02)" }}
                contentStyle={{
                  backgroundColor: "#0D0D0D",
                  border: "1px solid #262626",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="rate" radius={[4, 4, 0, 0]} barSize={24}>
                {attendanceRateData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.rate >= 90 ? "#8B5CF6" : "#4C1D95"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Time Range Selector */}
      <div className="flex justify-end mt-4">
        <div className="bg-[#0A0A0A] border border-[#262626] p-1 rounded-xl flex gap-1">
          {["Week", "Month", "Quarter"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                timeRange === t
                  ? "bg-white text-black"
                  : "text-gray-500 hover:text-gray-300",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Employee Breakdown & Task Log */}
      <EmployeeBreakdown data={employeePerformance} />
      <TaskLog data={taskLogData} />
    </div>
  );
}
