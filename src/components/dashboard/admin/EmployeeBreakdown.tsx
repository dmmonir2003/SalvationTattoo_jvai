import React, { useState } from "react";
import { MapPin, Clock, ChevronDown } from "lucide-react";
import {
  EmployeeBreakdownResponse,
  TaskByLocation,
} from "@/redux/services/dashboard/adminDashboardApi";

interface Props {
  breakdown: EmployeeBreakdownResponse;
  locations: TaskByLocation[];
  selectedLocation: string;
  onLocationChange: (id: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const EmployeeBreakdown = ({
  breakdown,
  locations,
  selectedLocation,
  onLocationChange,
  currentPage,
  onPageChange,
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemsPerPage = 10; // Based on your API's default limit
  const totalPages = Math.ceil(breakdown.count / itemsPerPage);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "late":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "absent":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const currentLocName =
    selectedLocation === "all"
      ? "All Locations"
      : locations.find((l) => l.location_id.toString() === selectedLocation)
          ?.location_name || "Location";

  return (
    <div className="bg-black">
      <div className="mx-auto">
        <div className="bg-black/40 border border-[#333333] rounded-lg p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-gray-500" />
              <h2 className="text-lg font-semibold text-white">
                Today&apos;s Employee Breakdown
              </h2>
            </div>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-lg text-sm text-white flex items-center gap-2"
              >
                {currentLocName} <ChevronDown size={14} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#404040] rounded-lg shadow-xl z-50">
                  <button
                    onClick={() => {
                      onLocationChange("all");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-gray-400 hover:text-white hover:bg-[#252525]"
                  >
                    All Locations
                  </button>
                  {locations.map((loc) => (
                    <button
                      key={loc.location_id}
                      onClick={() => {
                        onLocationChange(loc.location_id.toString());
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-gray-400 hover:text-white hover:bg-[#252525]"
                    >
                      {loc.location_name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-2 pb-4 border-b border-[#333333]">
            <div className="col-span-4 text-xs text-gray-500">Employee</div>
            <div className="col-span-3 text-xs text-gray-500">Role</div>
            <div className="col-span-3 text-xs text-gray-500">Location</div>
            <div className="col-span-2 text-xs text-gray-500 text-right">
              Status
            </div>
          </div>

          {/* Employees from API */}
          <div className="space-y-3 mt-3">
            {breakdown.results.map((employee) => (
              <div
                key={employee.id}
                className="grid grid-cols-12 gap-4 items-center px-2 py-3 rounded-lg hover:bg-[#1a1a1a]"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-indigo-600/20 text-indigo-400 border border-indigo-600/30">
                    {getInitials(employee.name)}
                  </div>
                  <span className="text-white">{employee.name}</span>
                </div>

                <div className="col-span-3 text-gray-400">
                  {employee.role_display}
                </div>

                <div className="col-span-3 flex items-center gap-2 text-gray-400">
                  <MapPin size={14} />
                  {employee.location_name}
                </div>

                <div className="col-span-2 flex justify-end">
                  <div
                    className={`px-3 py-1 text-xs border rounded capitalize ${getStatusStyles(employee.today_status)}`}
                  >
                    {employee.today_status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {breakdown.results.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              No employees found
            </div>
          )}

          {/* Pagination UI */}
          {breakdown.count > itemsPerPage && (
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!breakdown.previous}
                className="px-3 py-1 text-sm border border-[#404040] rounded text-gray-300 disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!breakdown.next}
                className="px-3 py-1 text-sm border border-[#404040] rounded text-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeBreakdown;
