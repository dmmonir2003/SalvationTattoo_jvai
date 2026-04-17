/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, RotateCcw, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetLocationsQuery } from "@/redux/services/location/locationApi";
import { useGetEmployeesForDropdownQuery } from "@/redux/services/tasks/taskApi";

interface TaskActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null; // Pass task data for Edit, null for Create
  onSave: (data: any) => void;
  isLoading?: boolean;
}

export const TaskActionModal = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  isLoading = false,
}: TaskActionModalProps) => {
  const isEditMode = !!initialData;

  // Get token from Redux
  const token = useAppSelector(selectCurrentToken);

  // Fetch active locations from API - skip if no token
  const { data: locationsResponse } = useGetLocationsQuery(undefined, {
    skip: !token,
  });
  const activeLocations =
    locationsResponse?.locations?.filter((loc) => loc.status === "active") ||
    [];

  console.log("Active Locations Loaded:", activeLocations);

  const [formData, setFormData] = useState({
    title: initialData?.taskName || "",
    description: initialData?.description || "",
    location: initialData?.location || "", // Store location name for display
    locationId: 0, // Store location ID for API calls
    assignTo: initialData?.assignedTo || "", // Employee name for display
    assignToId: 0, // Employee ID for backend
    dueDate: initialData?.dueDate || "",
    isRecurring: initialData?.isRecurring || false,
    // Add frequency here
    frequency: initialData?.frequency || "today",
    requirePhoto: initialData?.requirePhoto || false,
  });

  // Fetch employees for selected location using locationId
  const {
    data: employeesResponse,
    isLoading: isLoadingEmployees,
    error: employeeError,
  } = useGetEmployeesForDropdownQuery(formData.locationId, {
    skip: !formData.locationId, // Skip query if no location ID selected
  });

  const employees = employeesResponse?.employees || [];

  // Debug logging
  useEffect(() => {
    console.log("Form Data:", {
      location: formData.location,
      locationId: formData.locationId,
      activeLocationsCount: activeLocations.length,
    });
    console.log("Employees Response:", employeesResponse);
    console.log("Employee Error:", employeeError);
    console.log("Loading Employees:", isLoadingEmployees);
  }, [
    formData.locationId,
    employeesResponse,
    employeeError,
    isLoadingEmployees,
    activeLocations.length,
  ]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Validate required fields
    if (!formData.title.trim()) {
      alert("Task title is required");
      return;
    }
    if (!formData.location) {
      alert("Location is required");
      return;
    }
    if (!formData.assignTo) {
      alert("Assign to is required");
      return;
    }
    if (!formData.dueDate) {
      alert("Due date is required");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#0D0D0D] border border-[#262626] rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center bg-[#0D0D0D] sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {isEditMode ? "Edit Task" : "Create Task"}
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              {isEditMode
                ? "Update task details and assignments"
                : "Create a new task assignment"}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-white transition-colors bg-[#1A1A1A] rounded-full disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Task Title */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Task Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Sanitize Tattoo Stations"
              disabled={isLoading}
              className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white focus:border-[#404040] outline-none transition-all disabled:opacity-50"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe what needs to be done..."
              disabled={isLoading}
              className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white min-h-[100px] resize-none outline-none focus:border-[#404040] disabled:opacity-50"
            />
          </div>

          {/* Location Select - Real Locations from API */}
          <div className="space-y-1.5 relative">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Select Store *
            </label>
            <div className="relative">
              <select
                value={formData.location}
                onChange={(e) => {
                  const selectedLocationName = e.target.value;
                  const selectedLocation = activeLocations.find(
                    (loc) => loc.name === selectedLocationName,
                  );
                  console.log("Location Changed:", {
                    selectedLocationName,
                    selectedLocation,
                    allLocations: activeLocations,
                  });
                  setFormData({
                    ...formData,
                    location: selectedLocationName,
                    locationId: selectedLocation?.id || 0,
                    assignTo: "", // Reset assignee when location changes
                  });
                }}
                disabled={isLoading}
                className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white appearance-none outline-none cursor-pointer pr-10 disabled:opacity-50"
              >
                <option value="">Select a location...</option>
                {activeLocations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          {/* Two Column Row: Date & Assignee */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
                Due Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  disabled={isLoading}
                  className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white outline-none focus:border-[#404040] [color-scheme:dark] disabled:opacity-50"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
                Assign To *
              </label>
              <div className="relative">
                <select
                  value={formData.assignTo}
                  onChange={(e) => {
                    const selectedEmployeeName = e.target.value;
                    const selectedEmployee = employees.find(
                      (emp) =>
                        `${emp.first_name} ${emp.last_name}` ===
                        selectedEmployeeName,
                    );
                    setFormData({
                      ...formData,
                      assignTo: selectedEmployeeName,
                      assignToId: selectedEmployee?.id || 0,
                    });
                  }}
                  disabled={isLoading || !formData.location}
                  className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white appearance-none outline-none cursor-pointer pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {formData.location
                      ? "Select employee..."
                      : "Select location first"}
                  </option>
                  {employees.map((emp) => (
                    <option
                      key={emp.id}
                      value={`${emp.first_name} ${emp.last_name}`}
                    >
                      {emp.first_name} {emp.last_name} (
                      {emp.role_display || emp.role})
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-3 pt-2">
            {/* Recurring Task */}
            {/* <div
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer",
                formData.isRecurring
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-black border-[#262626]",
              )}
              onClick={() =>
                !isLoading &&
                setFormData({ ...formData, isRecurring: !formData.isRecurring })
              }
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center border border-white/5">
                  <RotateCcw size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Recurring Task</p>
                  <p className="text-xs text-gray-500">Repeat automatically</p>
                </div>
              </div>
              <div
                className={cn(
                  "w-12 h-6 rounded-full relative transition-colors duration-300",
                  formData.isRecurring ? "bg-white" : "bg-[#262626]",
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full transition-all duration-300 shadow-sm",
                    formData.isRecurring
                      ? "left-7 bg-black"
                      : "left-1 bg-gray-500",
                  )}
                />
              </div>
            </div> */}
            {/* Recurring Task Toggle */}
            <div
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer",
                formData.isRecurring
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-black border-[#262626]",
              )}
              onClick={() =>
                !isLoading &&
                setFormData({ ...formData, isRecurring: !formData.isRecurring })
              }
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center border border-white/5">
                  <RotateCcw size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Recurring Task</p>
                  <p className="text-xs text-gray-500">Repeat automatically</p>
                </div>
              </div>
              <div
                className={cn(
                  "w-12 h-6 rounded-full relative transition-colors duration-300",
                  formData.isRecurring ? "bg-emerald-500" : "bg-[#262626]", // Using emerald to match your toggle image
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full transition-all duration-300 shadow-sm",
                    formData.isRecurring
                      ? "left-7 bg-black"
                      : "left-1 bg-gray-500",
                  )}
                />
              </div>
            </div>

            {/* Frequency Selection - Only shows if isRecurring is true */}
            {formData.isRecurring && (
              <div className="grid grid-cols-3 gap-2 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                {["today", "weekly", "monthly"].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, frequency: freq as any })
                    }
                    className={cn(
                      "py-3 rounded-xl text-xs font-bold capitalize transition-all border",
                      formData.frequency === freq
                        ? "bg-[#A39171] text-white border-[#A39171]" // Brownish/Gold color from your image
                        : "bg-transparent text-gray-500 border-[#262626] hover:border-[#404040]",
                    )}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            )}

            {/* Photo Verification */}
            <div
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer",
                formData.requirePhoto
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-black border-[#262626]",
              )}
              onClick={() =>
                !isLoading &&
                setFormData({
                  ...formData,
                  requirePhoto: !formData.requirePhoto,
                })
              }
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center border border-white/5">
                  <Camera size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Require Photo Verification
                  </p>
                  <p className="text-xs text-gray-500">
                    Employee must submit a photo to complete
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "w-12 h-6 rounded-full relative transition-colors duration-300",
                  formData.requirePhoto ? "bg-white" : "bg-[#262626]",
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full transition-all duration-300 shadow-sm",
                    formData.requirePhoto
                      ? "left-7 bg-black"
                      : "left-1 bg-gray-500",
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#1A1A1A] flex gap-3 bg-[#0D0D0D]">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-4 border border-[#262626] text-white rounded-2xl font-bold hover:bg-[#1A1A1A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 py-4 bg-white text-black rounded-2xl font-bold hover:bg-gray-200 shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Processing..."
              : isEditMode
                ? "Update Task"
                : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};
