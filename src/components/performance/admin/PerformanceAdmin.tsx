"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Award, Target, Clock, Users, Calendar } from "lucide-react";
import { TopPerformer } from "./TopPerformer";
import { EmployeeRankings } from "./EmployeeRankings";

export default function PerformanceAdmin() {
  const [timeframe, setTimeframe] = useState("Weekly");

  // --- DUMMY DATA ---
  const kpis = [
    {
      title: "Avg Completion Rate",
      value: "91%",
      icon: Target,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Avg Attendance Rate",
      value: "92%",
      icon: Clock,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Tasks Completed",
      value: "163",
      icon: Award,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Active Employees",
      value: "7",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  const topPerformerData = {
    name: "Plabon Khui",
    initials: "PK",
    score: 98,
    tasks: 26,
    attendance: 100,
    completion: 100,
  };

  const rankingsData = [
    {
      rank: 1,
      name: "Priya Sharma",
      initials: "PS",
      email: "psharma@gmail.com",
      tasks: 26,
      overdue: 0,
      attendance: 100,
      completion: 100,
      status: "Good",
      avatarColor: "bg-teal-600",
    },
    {
      rank: 2,
      name: "Alex Kim",
      initials: "AK",
      email: "akim@gmail.com",
      tasks: 28,
      overdue: 1,
      attendance: 97,
      completion: 96,
      status: "Good",
      avatarColor: "bg-red-600",
    },
    {
      rank: 3,
      name: "Ravi Patel",
      initials: "RP",
      email: "rpatel@gmail.com",
      tasks: 25,
      overdue: 1,
      attendance: 96,
      completion: 96,
      status: "Good",
      avatarColor: "bg-blue-600",
    },
    {
      rank: 4,
      name: "Jordan Watts",
      initials: "JW",
      email: "jwatts@gmail.com",
      tasks: 24,
      overdue: 2,
      attendance: 94,
      completion: 92,
      status: "Good",
      avatarColor: "bg-purple-600",
    },
    {
      rank: 5,
      name: "Tia Jackson",
      initials: "TJ",
      email: "tjackson@gmail.com",
      tasks: 23,
      overdue: 2,
      attendance: 92,
      completion: 92,
      status: "Monitor",
      avatarColor: "bg-emerald-600",
    },
    {
      rank: 6,
      name: "Chloe Martin",
      initials: "CM",
      email: "cmartin@gmail.com",
      tasks: 15,
      overdue: 5,
      attendance: 75,
      completion: 75,
      status: "At Risk",
      avatarColor: "bg-indigo-600",
    },
  ];

  return (
    <div className="space-y-8 p-4 bg-black min-h-screen text-white">
      {/* 1. Header & Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Performance Analytics
          </h1>
          <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold tracking-widest italic">
            Salvation Tattoo Lounge · Admin Panel
          </p>
          <div className="mt-8">
            <h2 className="text-xl font-bold">Employee Performance</h2>
            <p className="text-gray-500 text-xs">
              Track productivity and identify top performers
            </p>
          </div>
        </div>

        {/* Weekly/Monthly Toggle */}
        <div className="bg-[#0A0A0A] border border-[#262626] p-1 rounded-xl flex gap-1 h-fit">
          {["Weekly", "Monthly"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                timeframe === t
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-500 hover:text-gray-300",
              )}
            >
              <Calendar size={14} /> {t}
            </button>
          ))}
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((stat, i) => (
          <div
            key={i}
            className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-6"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-6",
                stat.bg,
              )}
            >
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <h2 className="text-3xl font-bold mb-1">{stat.value}</h2>
            <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* 3. Top Performer Spotlight */}
      <TopPerformer data={topPerformerData} />

      {/* 4. Employee Rankings Table */}
      <EmployeeRankings rankings={rankingsData} />
    </div>
  );
}
