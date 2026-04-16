/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
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

// --- Types ---
export type Status =
  | "Approved"
  | "Overdue"
  | "Awaiting Review"
  | "Pending"
  | "Rejected";

// --- Dummy Data ---
const EMPLOYEES = [
  {
    id: "1",
    initials: "SD",
    name: "Sofia Delgado",
    role: "Tattoo Artist",
    presentCount: 90,
    absentCount: 4,
    lateCount: 6,
    completedCount: 54,
    overdueCount: 3,
    attendanceRate: 96,
    dailyRecords: [
      // April 2026 (30 days)
      { date: "2026-04-16", status: "Present" },
      { date: "2026-04-15", status: "Present" },
      { date: "2026-04-14", status: "Late" },
      { date: "2026-04-13", status: "Present" },
      { date: "2026-04-12", status: "Present" },
      { date: "2026-04-11", status: "Present" },
      { date: "2026-04-10", status: "Absent" },
      { date: "2026-04-09", status: "Present" },
      { date: "2026-04-08", status: "Present" },
      { date: "2026-04-07", status: "Late" },
      { date: "2026-04-06", status: "Present" },
      { date: "2026-04-05", status: "Present" },
      { date: "2026-04-04", status: "Present" },
      { date: "2026-04-03", status: "Present" },
      { date: "2026-04-02", status: "Absent" },
      { date: "2026-04-01", status: "Present" },
      // March 2026 (14 more days)
      { date: "2026-03-31", status: "Present" },
      { date: "2026-03-30", status: "Present" },
      { date: "2026-03-29", status: "Present" },
      { date: "2026-03-28", status: "Late" },
      { date: "2026-03-27", status: "Present" },
      { date: "2026-03-26", status: "Present" },
      { date: "2026-03-25", status: "Present" },
      { date: "2026-03-24", status: "Present" },
      { date: "2026-03-23", status: "Absent" },
      { date: "2026-03-22", status: "Present" },
      { date: "2026-03-21", status: "Present" },
      { date: "2026-03-20", status: "Present" },
      { date: "2026-03-19", status: "Present" },
      { date: "2026-03-18", status: "Present" },
    ],
  },
  {
    id: "2",
    initials: "JM",
    name: "Jake Morrow",
    role: "Tattoo Artist",
    presentCount: 80,
    absentCount: 8,
    lateCount: 10,
    completedCount: 44,
    overdueCount: 8,
    attendanceRate: 88,
    dailyRecords: [
      // April 2026
      { date: "2026-04-16", status: "Present" },
      { date: "2026-04-15", status: "Late" },
      { date: "2026-04-14", status: "Present" },
      { date: "2026-04-13", status: "Absent" },
      { date: "2026-04-12", status: "Present" },
      { date: "2026-04-11", status: "Present" },
      { date: "2026-04-10", status: "Absent" },
      { date: "2026-04-09", status: "Present" },
      { date: "2026-04-08", status: "Late" },
      { date: "2026-04-07", status: "Present" },
      { date: "2026-04-06", status: "Absent" },
      { date: "2026-04-05", status: "Present" },
      { date: "2026-04-04", status: "Late" },
      { date: "2026-04-03", status: "Present" },
      { date: "2026-04-02", status: "Present" },
      { date: "2026-04-01", status: "Absent" },
      // March 2026
      { date: "2026-03-31", status: "Present" },
      { date: "2026-03-30", status: "Late" },
      { date: "2026-03-29", status: "Present" },
      { date: "2026-03-28", status: "Present" },
      { date: "2026-03-27", status: "Absent" },
      { date: "2026-03-26", status: "Present" },
      { date: "2026-03-25", status: "Present" },
      { date: "2026-03-24", status: "Late" },
      { date: "2026-03-23", status: "Present" },
      { date: "2026-03-22", status: "Absent" },
      { date: "2026-03-21", status: "Present" },
      { date: "2026-03-20", status: "Present" },
      { date: "2026-03-19", status: "Late" },
      { date: "2026-03-18", status: "Present" },
    ],
  },
  {
    id: "3",
    initials: "PN",
    name: "Priya Nair",
    role: "Piercer",
    presentCount: 96,
    absentCount: 0,
    lateCount: 4,
    completedCount: 72,
    overdueCount: 0,
    attendanceRate: 96,
    dailyRecords: [
      // April 2026
      { date: "2026-04-16", status: "Present" },
      { date: "2026-04-15", status: "Present" },
      { date: "2026-04-14", status: "Late" },
      { date: "2026-04-13", status: "Present" },
      { date: "2026-04-12", status: "Present" },
      { date: "2026-04-11", status: "Present" },
      { date: "2026-04-10", status: "Present" },
      { date: "2026-04-09", status: "Present" },
      { date: "2026-04-08", status: "Present" },
      { date: "2026-04-07", status: "Present" },
      { date: "2026-04-06", status: "Present" },
      { date: "2026-04-05", status: "Late" },
      { date: "2026-04-04", status: "Present" },
      { date: "2026-04-03", status: "Present" },
      { date: "2026-04-02", status: "Present" },
      { date: "2026-04-01", status: "Present" },
      // March 2026
      { date: "2026-03-31", status: "Present" },
      { date: "2026-03-30", status: "Present" },
      { date: "2026-03-29", status: "Present" },
      { date: "2026-03-28", status: "Late" },
      { date: "2026-03-27", status: "Present" },
      { date: "2026-03-26", status: "Present" },
      { date: "2026-03-25", status: "Present" },
      { date: "2026-03-24", status: "Present" },
      { date: "2026-03-23", status: "Present" },
      { date: "2026-03-22", status: "Present" },
      { date: "2026-03-21", status: "Present" },
      { date: "2026-03-20", status: "Present" },
      { date: "2026-03-19", status: "Present" },
      { date: "2026-03-18", status: "Late" },
    ],
  },
  {
    id: "4",
    initials: "DW",
    name: "Deon Wallace",
    role: "Tattoo Artist",
    presentCount: 58,
    absentCount: 26,
    lateCount: 16,
    completedCount: 28,
    overdueCount: 12,
    attendanceRate: 64,
    dailyRecords: [
      // April 2026
      { date: "2026-04-16", status: "Absent" },
      { date: "2026-04-15", status: "Present" },
      { date: "2026-04-14", status: "Absent" },
      { date: "2026-04-13", status: "Late" },
      { date: "2026-04-12", status: "Present" },
      { date: "2026-04-11", status: "Absent" },
      { date: "2026-04-10", status: "Late" },
      { date: "2026-04-09", status: "Absent" },
      { date: "2026-04-08", status: "Present" },
      { date: "2026-04-07", status: "Absent" },
      { date: "2026-04-06", status: "Late" },
      { date: "2026-04-05", status: "Present" },
      { date: "2026-04-04", status: "Absent" },
      { date: "2026-04-03", status: "Late" },
      { date: "2026-04-02", status: "Present" },
      { date: "2026-04-01", status: "Absent" },
      // March 2026
      { date: "2026-03-31", status: "Late" },
      { date: "2026-03-30", status: "Absent" },
      { date: "2026-03-29", status: "Present" },
      { date: "2026-03-28", status: "Absent" },
      { date: "2026-03-27", status: "Late" },
      { date: "2026-03-26", status: "Absent" },
      { date: "2026-03-25", status: "Present" },
      { date: "2026-03-24", status: "Absent" },
      { date: "2026-03-23", status: "Late" },
      { date: "2026-03-22", status: "Absent" },
      { date: "2026-03-21", status: "Present" },
      { date: "2026-03-20", status: "Absent" },
      { date: "2026-03-19", status: "Late" },
      { date: "2026-03-18", status: "Present" },
    ],
  },
  {
    id: "5",
    initials: "CO",
    name: "Camille Osei",
    role: "Front Desk",
    presentCount: 100,
    absentCount: 0,
    lateCount: 0,
    completedCount: 80,
    overdueCount: 0,
    attendanceRate: 100,
    dailyRecords: [
      // April 2026
      { date: "2026-04-16", status: "Present" },
      { date: "2026-04-15", status: "Present" },
      { date: "2026-04-14", status: "Present" },
      { date: "2026-04-13", status: "Present" },
      { date: "2026-04-12", status: "Present" },
      { date: "2026-04-11", status: "Present" },
      { date: "2026-04-10", status: "Present" },
      { date: "2026-04-09", status: "Present" },
      { date: "2026-04-08", status: "Present" },
      { date: "2026-04-07", status: "Present" },
      { date: "2026-04-06", status: "Present" },
      { date: "2026-04-05", status: "Present" },
      { date: "2026-04-04", status: "Present" },
      { date: "2026-04-03", status: "Present" },
      { date: "2026-04-02", status: "Present" },
      { date: "2026-04-01", status: "Present" },
      // March 2026
      { date: "2026-03-31", status: "Present" },
      { date: "2026-03-30", status: "Present" },
      { date: "2026-03-29", status: "Present" },
      { date: "2026-03-28", status: "Present" },
      { date: "2026-03-27", status: "Present" },
      { date: "2026-03-26", status: "Present" },
      { date: "2026-03-25", status: "Present" },
      { date: "2026-03-24", status: "Present" },
      { date: "2026-03-23", status: "Present" },
      { date: "2026-03-22", status: "Present" },
      { date: "2026-03-21", status: "Present" },
      { date: "2026-03-20", status: "Present" },
      { date: "2026-03-19", status: "Present" },
      { date: "2026-03-18", status: "Present" },
    ],
  },
];

const TASKS: any[] = [
  // Today (2026-04-16)
  {
    id: 1,
    task: "Morning briefing attendance",
    assignedTo: "Sofia Delgado",
    assignedBy: "Super Admin",
    dueDate: "2026-04-16",
    status: "Pending",
  },
  {
    id: 2,
    task: "Stock tattoo ink supplies",
    assignedTo: "Jake Morrow",
    assignedBy: "District Manager",
    dueDate: "2026-04-16",
    status: "Approved",
  },
  {
    id: 3,
    task: "Client consultation setup",
    assignedTo: "Priya Nair",
    assignedBy: "Store Manager",
    dueDate: "2026-04-16",
    status: "Approved",
  },
  {
    id: 4,
    task: "Deep clean piercing bay",
    assignedTo: "Camille Osei",
    assignedBy: "Super Admin",
    dueDate: "2026-04-16",
    status: "Pending",
  },

  // Yesterday (2026-04-15)
  {
    id: 5,
    task: "Sterilize equipment",
    assignedTo: "Sofia Delgado",
    assignedBy: "Store Manager",
    dueDate: "2026-04-15",
    status: "Approved",
  },
  {
    id: 6,
    task: "Refresh supply inventory",
    assignedTo: "Jake Morrow",
    assignedBy: "District Manager",
    dueDate: "2026-04-15",
    status: "Approved",
  },
  {
    id: 7,
    task: "Update aftercare pamphlets",
    assignedTo: "Deon Wallace",
    assignedBy: "Super Admin",
    dueDate: "2026-04-15",
    status: "Rejected",
  },
  {
    id: 8,
    task: "Review appointment log",
    assignedTo: "Camille Osei",
    assignedBy: "Store Manager",
    dueDate: "2026-04-15",
    status: "Approved",
  },

  // Last Week (2026-04-10 to 2026-04-14)
  {
    id: 9,
    task: "Audit sterilization records",
    assignedTo: "Priya Nair",
    assignedBy: "Super Admin",
    dueDate: "2026-04-14",
    status: "Overdue",
  },
  {
    id: 10,
    task: "Restock piercing jewelry",
    assignedTo: "Sofia Delgado",
    assignedBy: "District Manager",
    dueDate: "2026-04-13",
    status: "Pending",
  },
  {
    id: 11,
    task: "Team performance review",
    assignedTo: "Jake Morrow",
    assignedBy: "Store Manager",
    dueDate: "2026-04-12",
    status: "Awaiting Review",
  },
  {
    id: 12,
    task: "Compliance check",
    assignedTo: "Priya Nair",
    assignedBy: "Super Admin",
    dueDate: "2026-04-11",
    status: "Overdue",
  },
  {
    id: 13,
    task: "Update client database",
    assignedTo: "Camille Osei",
    assignedBy: "District Manager",
    dueDate: "2026-04-10",
    status: "Overdue",
  },

  // Earlier This Month (2026-04-01 to 2026-04-09)
  {
    id: 14,
    task: "Monthly inventory count",
    assignedTo: "Deon Wallace",
    assignedBy: "Store Manager",
    dueDate: "2026-04-09",
    status: "Overdue",
  },
  {
    id: 15,
    task: "Sanitize workstations",
    assignedTo: "Sofia Delgado",
    assignedBy: "Super Admin",
    dueDate: "2026-04-08",
    status: "Approved",
  },
  {
    id: 16,
    task: "Process supply orders",
    assignedTo: "Jake Morrow",
    assignedBy: "District Manager",
    dueDate: "2026-04-07",
    status: "Approved",
  },
  {
    id: 17,
    task: "Safety training session",
    assignedTo: "Priya Nair",
    assignedBy: "Store Manager",
    dueDate: "2026-04-06",
    status: "Approved",
  },
  {
    id: 18,
    task: "April schedule planning",
    assignedTo: "Camille Osei",
    assignedBy: "Super Admin",
    dueDate: "2026-04-05",
    status: "Approved",
  },
  {
    id: 19,
    task: "Client feedback review",
    assignedTo: "Sofia Delgado",
    assignedBy: "District Manager",
    dueDate: "2026-04-04",
    status: "Approved",
  },
  {
    id: 20,
    task: "Tattoo machine maintenance",
    assignedTo: "Jake Morrow",
    assignedBy: "Store Manager",
    dueDate: "2026-04-03",
    status: "Rejected",
  },

  // Last Month (March 2026)
  {
    id: 21,
    task: "March performance summary",
    assignedTo: "Priya Nair",
    assignedBy: "Super Admin",
    dueDate: "2026-03-31",
    status: "Approved",
  },
  {
    id: 22,
    task: "Staff recognition planning",
    assignedTo: "Deon Wallace",
    assignedBy: "District Manager",
    dueDate: "2026-03-30",
    status: "Approved",
  },
  {
    id: 23,
    task: "Vendor contract review",
    assignedTo: "Sofia Delgado",
    assignedBy: "Store Manager",
    dueDate: "2026-03-29",
    status: "Approved",
  },
  {
    id: 24,
    task: "Customer satisfaction survey",
    assignedTo: "Camille Osei",
    assignedBy: "Super Admin",
    dueDate: "2026-03-28",
    status: "Approved",
  },
  {
    id: 25,
    task: "Product rotation check",
    assignedTo: "Jake Morrow",
    assignedBy: "District Manager",
    dueDate: "2026-03-27",
    status: "Approved",
  },
];

export default function ReportsBranchManager() {
  const [search, setSearch] = useState("");
  const [timeRange, setTimeRange] = useState("Today");
  const [taskStatus, setTaskStatus] = useState("All Status");

  // --- Helper: Get date range ---
  const getDateRange = (range: string) => {
    const today = new Date("2026-04-16");
    const endDate = new Date(today);
    let startDate = new Date(today);

    switch (range) {
      case "Today":
        startDate = new Date(today);
        break;
      case "Weekly":
        startDate = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
        break;
      case "Monthly":
        startDate = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);
        break;
      case "Yearly":
        startDate = new Date(today.getTime() - 364 * 24 * 60 * 60 * 1000);
        break;
    }

    return {
      start: startDate.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0],
    };
  };

  // --- Logic: Filtered Data for Tables & Charts ---
  const filteredEmployees = useMemo(() => {
    const dateRange = getDateRange(timeRange);

    // If search is empty, return all employees with summary data (no _records)
    if (search === "") {
      return EMPLOYEES.map((emp) => {
        const records = emp.dailyRecords.filter(
          (r: any) => r.date >= dateRange.start && r.date <= dateRange.end,
        );

        const presentCount = records.filter(
          (r: any) => r.status === "Present",
        ).length;
        const absentCount = records.filter(
          (r: any) => r.status === "Absent",
        ).length;
        const lateCount = records.filter(
          (r: any) => r.status === "Late",
        ).length;

        return {
          ...emp,
          presentCount,
          absentCount,
          lateCount,
          // Don't include _records for summary view
        };
      });
    }

    // If search has value, filter to matching employee(s) and include _records for daily view
    return EMPLOYEES.map((emp) => {
      const nameMatch = emp.name.toLowerCase().includes(search.toLowerCase());

      if (!nameMatch) return null;

      const records = emp.dailyRecords.filter(
        (r: any) => r.date >= dateRange.start && r.date <= dateRange.end,
      );

      const presentCount = records.filter(
        (r: any) => r.status === "Present",
      ).length;
      const absentCount = records.filter(
        (r: any) => r.status === "Absent",
      ).length;
      const lateCount = records.filter((r: any) => r.status === "Late").length;

      return {
        ...emp,
        presentCount,
        absentCount,
        lateCount,
        _records: records,
      };
    }).filter((emp: any) => emp !== null);
  }, [search, timeRange]);

  const filteredTasks = useMemo(() => {
    const dateRange = getDateRange(timeRange);

    return TASKS.filter((task) => {
      const nameMatch = task.assignedTo
        .toLowerCase()
        .includes(search.toLowerCase());
      const dateMatch =
        task.dueDate >= dateRange.start && task.dueDate <= dateRange.end;
      const statusMatch =
        taskStatus === "All Status" || task.status === taskStatus;

      return nameMatch && dateMatch && statusMatch;
    });
  }, [search, timeRange, taskStatus]);

  // --- Logic: Mapping Stats for Summary Cards ---
  const summaryStats = useMemo(() => {
    const totalCompleted = filteredEmployees.reduce(
      (acc: number, curr: any) => acc + curr.completedCount,
      0,
    );
    const totalOverdue = filteredEmployees.reduce(
      (acc: number, curr: any) => acc + curr.overdueCount,
      0,
    );
    const avgAttendance = Math.round(
      filteredEmployees.reduce(
        (acc: number, curr: any) => acc + curr.attendanceRate,
        0,
      ) / (filteredEmployees.length || 1),
    );

    return [
      {
        label: "Completed",
        value: totalCompleted.toString(),
        subtitle: "Approved tasks",
        type: "completed" as const,
      },
      {
        label: "Overdue",
        value: totalOverdue.toString(),
        subtitle: "Past due date",
        type: "overdue" as const,
      },
      {
        label: "In Progress",
        value: filteredTasks
          .filter(
            (t) => t.status === "Pending" || t.status === "Awaiting Review",
          )
          .length.toString(),
        subtitle: "Active tasks",
        type: "in-progress" as const,
      },
      {
        label: "Avg. Attendance",
        value: `${avgAttendance}%`,
        subtitle: `Based on ${timeRange}`,
        type: "attendance" as const,
      },
    ];
  }, [filteredEmployees, filteredTasks, timeRange]);

  return (
    <div className="space-y-8 p-6 bg-black min-h-screen text-white font-sans">
      {/* 1. Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Staff Performance
          </h1>
          <p className="text-gray-500 text-sm italic">
            Salvation Tattoo Lounge · Branch Manager
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className="w-full bg-[#0A0A0A] border border-[#968B79]/40 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#968B79] transition-all"
              placeholder="Filter by employee name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-[#0A0A0A] border border-[#968B79]/60 p-1 rounded-xl flex gap-1 h-fit">
            {["Today", "Weekly", "Monthly", "Yearly"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                  timeRange === t
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-500 hover:text-gray-300",
                )}
              >
                {t}
              </button>
            ))}
          </div>

           <div className="flex justify-end">
        <div className="bg-[#0A0A0A] border border-[#968B79]/60 p-1 rounded-xl flex gap-1 flex-wrap max-w-2xl">
          {[
            "All Status",
            "Approved",
            "Pending",
            "Awaiting Review",
            "Overdue",
            "Rejected",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setTaskStatus(status)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap",
                taskStatus === status
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-500 hover:text-gray-300",
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
        </div>
      </div>

      {/* 2. Summary Row (Mapped) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, i) => (
          <PerformanceSummaryCard key={i} {...stat} />
        ))}
      </div>

      {/* 3. Charts Section (Uncommented & Mapped) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Completion Bar Chart */}
        <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl p-6 h-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-white text-lg">Task Completion</h3>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">
                Completed vs Overdue
              </p>
            </div>
            <div className="flex gap-4 text-[9px] font-bold uppercase">
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
              data={filteredEmployees}
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
                tick={{ fill: "#4B5563", fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4B5563", fontSize: 10 }}
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
                dataKey="completedCount"
                name="Completed"
                fill="#6366F1"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
              <Bar
                dataKey="overdueCount"
                name="Overdue"
                fill="#991B1B"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Rate Bar Chart */}
        <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl p-6 h-100">
          <h3 className="font-bold text-white text-lg">Attendance Overview</h3>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1 mb-8">
            Efficiency Percentage
          </p>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              data={filteredEmployees}
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
                tick={{ fill: "#4B5563", fontSize: 10 }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4B5563", fontSize: 10 }}
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
              <Bar dataKey="attendanceRate" radius={[4, 4, 0, 0]} barSize={20}>
                {filteredEmployees.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry?.attendanceRate >= 90 ? "#8B5CF6" : "#4C1D95"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Task Status Filter Section */}
     

      {/* 5. Tables with Filtered Data */}
      <EmployeeBreakdown
        data={filteredEmployees}
        showDailyRecords={search !== ""}
      />
      <TaskLog data={filteredTasks} />
    </div>
  );
}
