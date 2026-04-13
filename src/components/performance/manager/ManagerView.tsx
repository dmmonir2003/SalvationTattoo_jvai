"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/store";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { ChevronDown } from "lucide-react"; // Install lucide-react if you haven't

import OverdueTasksBanner from "./OverdueTasksBanner";
import ComparisonBar from "./ComparisonBar";
import PerformanceRadial from "./PerformanceRadial";
import PunctualityTable from "./PunctualityTable";
import PerformanceStatCard from "./PerformanceStatCard";

export default function PerformanceManager() {
  const user = useAppSelector(selectCurrentUser);

  // 1. Add State for the filter
  const [selectedLocation, setSelectedLocation] = useState("All Location");

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

  const locations = [
    {
      name: "Downtown Ink",
      taskCompletion: 78,
      attendanceRate: 92,
      timeliness: 85,
      ratingScore: 90,
      staffScore: 70,
      color: "#6366F1",
    }, // Blue
    {
      name: "Westside Studio",
      taskCompletion: 61,
      attendanceRate: 85,
      timeliness: 75,
      ratingScore: 95,
      staffScore: 60,
      color: "#F59E0B",
    }, // Orange
    {
      name: "Northgate Tattoo",
      taskCompletion: 55,
      attendanceRate: 88,
      timeliness: 80,
      ratingScore: 92,
      staffScore: 65,
      color: "#10B981",
    }, // Green
    {
      name: "East End Parlor",
      taskCompletion: 84,
      attendanceRate: 95,
      timeliness: 84,
      ratingScore: 95,
      staffScore: 69,
      color: "#EF4444",
    }, // Red
  ];

  // 2. Filter Logic
  const filteredStaffData =
    selectedLocation === "All Location"
      ? staffPerformanceData
      : staffPerformanceData.filter(
          (staff) => staff.location === selectedLocation,
        );

  const filteredLocations =
    selectedLocation === "All Location"
      ? locations
      : locations.filter((loc) => loc.name === selectedLocation);

  return (
    <div className="p-8 bg-black min-h-screen space-y-8">
      {/* --- Updated Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Performance Monitoring
          </h1>
          <p className="text-gray-500 text-sm">
            Compare locations and monitor staff punctuality
          </p>
        </div>

        {/* Styled Filter Dropdown */}
        <div className="relative inline-block">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="appearance-none bg-black text-white text-sm border border-[#968B79] rounded-lg px-4 py-2 pr-10 focus:outline-none cursor-pointer hover:bg-[#1A1A1A] transition-colors"
          >
            <option value="All Location">All Location</option>
            {locations.map((loc) => (
              <option key={loc.name} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#968B79]">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
      {/* ------------------------------ */}

      {/* 1. Top Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredLocations.map((loc) => (
          <PerformanceStatCard
            key={loc.name}
            location={loc.name}
            percentage={loc.taskCompletion}
            color={loc.color}
          />
        ))}
      </div>

      {/* 3. Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Comparison (Bars) */}
        <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-1 text-lg">
            Location Comparison
          </h3>
          <p className="text-gray-500 text-xs mb-8">
            Task completion vs attendance rates
          </p>

          {/* --- TASK COMPLETION SUB-SECTION --- */}
          <div className="mb-8">
            <h4 className="text-[10px] font-bold text-gray-400 tracking-widest mb-4 uppercase">
              Task Completion
            </h4>
            <div className="space-y-4">
              {filteredLocations.map((loc) => (
                <ComparisonBar
                  key={`${loc.name}-task`}
                  label={loc.name}
                  value={loc.taskCompletion}
                  color={loc.color}
                />
              ))}
            </div>
          </div>

          {/* Subtle Divider Line */}
          <div className="border-t border-gray-800/50 my-6" />

          {/* --- ATTENDANCE RATE SUB-SECTION --- */}
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 tracking-widest mb-4 uppercase">
              Attendance Rate
            </h4>
            <div className="space-y-4">
              {filteredLocations.map((loc) => (
                <ComparisonBar
                  key={`${loc.name}-attendance`}
                  label={loc.name}
                  value={loc.attendanceRate}
                  color={loc.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Overview (Radials) */}
        {/* Right: Overview (Multi-colored Radials) */}
        <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold mb-1 text-lg">
              Location Performance Overview
            </h3>
            <p className="text-gray-500 text-xs mb-10">
              All performance dimensions per location
            </p>

            {/* The 5-Chart Grid */}
            <div className="grid grid-cols-3 gap-y-12 gap-x-4 mb-12">
              <PerformanceRadial
                label="Task Completion"
                avgValue={70}
                locations={locations.map((l) => ({
                  name: l.name,
                  color:
                    l.color.replace("bg-", "") === l.color
                      ? l.color
                      : "#6366F1" /* Fallback if using tailwind classes */,
                }))}
              />
              <PerformanceRadial
                label="Attendance Rate"
                avgValue={90}
                locations={locations.map((l) => ({
                  name: l.name,
                  color: l.color,
                }))}
              />
              <PerformanceRadial
                label="Timeliness"
                avgValue={81}
                locations={locations.map((l) => ({
                  name: l.name,
                  color: l.color,
                }))}
              />
              <PerformanceRadial
                label="Rating Score"
                avgValue={93}
                locations={locations.map((l) => ({
                  name: l.name,
                  color: l.color,
                }))}
              />
              <PerformanceRadial
                label="Staff Score"
                avgValue={66}
                locations={locations.map((l) => ({
                  name: l.name,
                  color: l.color,
                }))}
              />
            </div>
          </div>

          {/* Legend at the bottom */}
          <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 pt-6 border-t border-gray-800/50">
            {locations.map((loc) => (
              <div key={loc.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: loc.color }}
                />
                <span className="text-gray-400 text-xs">{loc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Overdue Section */}
      <OverdueTasksBanner />

      {/* 4. Staff Punctuality Table */}
      <PunctualityTable data={filteredStaffData} />
    </div>
  );
}
