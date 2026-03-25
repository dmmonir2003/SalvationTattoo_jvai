"use client";

import React from "react";
import { useAppSelector } from "@/redux/store";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

import OverdueTasksBanner from "./OverdueTasksBanner";
import ComparisonBar from "./ComparisonBar";
import PerformanceRadial from "./PerformanceRadial";
import PunctualityTable from "./PunctualityTable";
import PerformanceStatCard from "./PerformanceStatCard";

// Import your new components

export default function PerformanceManager() {
  const user = useAppSelector(selectCurrentUser);

  const staffPerformanceData = [
    {
      id: 1,
      name: "Remy Castillo",
      initials: "RC",
      location: "East End Parlor",
      role: "Artist",
      onTimeRate: 97,
      tasksDone: "16/17",
      lateArrivals: 0,
      status: "Good",
    },
    {
      id: 2,
      name: "Marcus Chen",
      initials: "MC",
      location: "Downtown Ink",
      role: "Artist",
      onTimeRate: 96,
      tasksDone: "18/20",
      lateArrivals: 1,
      status: "Good",
    },
    {
      id: 3,
      name: "Nova Singh",
      initials: "NS",
      location: "East End Parlor",
      role: "Manager",
      onTimeRate: 95,
      tasksDone: "19/20",
      lateArrivals: 1,
      status: "Good",
    },
    {
      id: 4,
      name: "Tyler Woods",
      initials: "TW",
      location: "Northgate Tattoo",
      role: "Apprentice",
      onTimeRate: 94,
      tasksDone: "9/10",
      lateArrivals: 1,
      status: "Good",
    },
    {
      id: 5,
      name: "Jordan Blake",
      initials: "JB",
      location: "Downtown Ink",
      role: "Apprentice",
      onTimeRate: 92,
      tasksDone: "10/12",
      lateArrivals: 2,
      status: "Good",
    },
    {
      id: 6,
      name: "Kai Okafor",
      initials: "KO",
      location: "Westside Studio",
      role: "Artist",
      onTimeRate: 91,
      tasksDone: "17/20",
      lateArrivals: 2,
      status: "Good",
    },
    {
      id: 7,
      name: "Zoe Winters",
      initials: "ZW",
      location: "East End Parlor",
      role: "Apprentice",
      onTimeRate: 89,
      tasksDone: "8/9",
      lateArrivals: 2,
      status: "Monitor",
    },
    {
      id: 8,
      name: "Sofia Rivera",
      initials: "SR",
      location: "Downtown Ink",
      role: "Receptionist",
      onTimeRate: 88,
      tasksDone: "14/16",
      lateArrivals: 3,
      status: "Monitor",
    },
    {
      id: 9,
      name: "Leila Nassar",
      initials: "LN",
      location: "Northgate Tattoo",
      role: "Artist",
      onTimeRate: 87,
      tasksDone: "13/15",
      lateArrivals: 3,
      status: "Monitor",
    },
    {
      id: 10,
      name: "Aria Thompson",
      initials: "AT",
      location: "Westside Studio",
      role: "Artist",
      onTimeRate: 84,
      tasksDone: "15/19",
      lateArrivals: 4,
      status: "At Risk",
    },
    {
      id: 11,
      name: "Imani Diallo",
      initials: "ID",
      location: "Northgate Tattoo",
      role: "Receptionist",
      onTimeRate: 82,
      tasksDone: "11/14",
      lateArrivals: 4,
      status: "At Risk",
    },
    {
      id: 12,
      name: "Devon Park",
      initials: "DP",
      location: "Westside Studio",
      role: "Manager",
      onTimeRate: 80,
      tasksDone: "12/18",
      lateArrivals: 5,
      status: "At Risk",
    },
  ];

  // Example: Mapping your Redux/Mock data to the new UI
  const locations = [
    { name: "Downtown Ink", value: 78, color: "bg-indigo-500" },
    { name: "Westside Studio", value: 61, color: "bg-amber-500" },
    { name: "Northgate Tattoo", value: 55, color: "bg-emerald-500" },
    { name: "East End Parlor", value: 84, color: "bg-red-500" },
  ];

  return (
    <div className="p-8 bg-black min-h-screen space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Performance Monitoring
        </h1>
        <p className="text-gray-500 text-sm">
          Compare locations and monitor staff punctuality
        </p>
      </div>

      {/* 1. Top Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((loc) => (
          <PerformanceStatCard
            key={loc.name}
            location={loc.name}
            percentage={loc.value}
            color={loc.color}
          />
        ))}
      </div>

      {/* 3. Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Comparison (Bars) */}
        <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl p-6">
          <h3 className="text-white font-bold mb-1">Location Comparison</h3>
          <p className="text-gray-500 text-xs mb-6">
            Task completion vs attendance rates
          </p>
          <ComparisonBar
            label={locations[0].name}
            value={locations[0].value}
            color={locations[0].color}
          />
          <ComparisonBar
            label={locations[1].name}
            value={locations[1].value}
            color={locations[1].color}
          />
          <ComparisonBar
            label={locations[2].name}
            value={locations[2].value}
            color={locations[2].color}
          />
          <ComparisonBar
            label={locations[3].name}
            value={locations[3].value}
            color={locations[3].color}
          />
        </div>

        {/* Right: Overview (Radials) */}
        <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl p-6">
          <h3 className="text-white font-bold mb-1">
            Location Performance Overview
          </h3>
          <p className="text-gray-500 text-xs mb-6">
            All performance dimensions per location
          </p>
          <div className="grid grid-cols-3 gap-4">
            <PerformanceRadial label="Task Completion" value={70} />
            <PerformanceRadial label="Attendance Rate" value={90} />
            <PerformanceRadial label="Timeliness" value={81} />
          </div>
        </div>
      </div>

      {/* 2. Overdue Section */}
      <OverdueTasksBanner />

      {/* 4. Staff Punctuality Table */}
      <PunctualityTable data={staffPerformanceData} />
    </div>
  );
}
