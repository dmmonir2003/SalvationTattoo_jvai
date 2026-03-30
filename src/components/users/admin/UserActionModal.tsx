/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  X,
  Clock,
  Calendar as CalendarIcon,
  ChevronDown,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null;
  onSave: (data: any) => void;
}

const DEFAULT_SCHEDULE = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
  (day) => ({
    day,
    enabled: true,
    start: "8 AM",
    end: "8 PM",
  }),
);

const TIME_OPTIONS = [
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
];

export const UserActionModal = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}: UserActionModalProps) => {
  const [formData, setFormData] = useState({
    fullName: initialData?.name || "",
    email: initialData?.email || "",
    password: "", // Initialized as empty
    role: initialData?.role || "",
    location: initialData?.location || "",
  });

  const [schedule, setSchedule] = useState(
    initialData?.schedule || DEFAULT_SCHEDULE,
  );

  const [activePicker, setActivePicker] = useState<{
    index: number;
    field: "start" | "end";
  } | null>(null);

  if (!isOpen) return null;

  const isEditMode = !!initialData;
  const showSchedule = formData.role !== "" && formData.location !== "";

  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].enabled = !newSchedule[index].enabled;
    setSchedule(newSchedule);
  };

  const handleTimeChange = (
    index: number,
    field: "start" | "end",
    newVal: string,
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = newVal;
    setSchedule(newSchedule);
    setActivePicker(null);
  };

  const handleSubmit = () => {
    onSave({ ...formData, schedule });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-[#0D0D0D] border border-[#262626] rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center bg-[#0D0D0D] sticky top-0 z-10">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isEditMode ? "Edit User Profile" : "Create New User"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white focus:border-[#404040] outline-none"
                placeholder="e.g. Jordan Smith"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white focus:border-[#404040] outline-none"
                placeholder="e.g. jsmith@example.com"
              />
            </div>

            {/* PASSWORD FIELD */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
                {isEditMode
                  ? "New Password (Leave blank to keep current)"
                  : "Password *"}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-black border border-[#262626] rounded-xl p-3.5 pl-10 text-sm text-white focus:border-[#404040] outline-none"
                  placeholder={isEditMode ? "••••••••" : "Enter password"}
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5 relative">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
                Role *
              </label>
              <div className="relative">
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Artist">Tattoo Artist</option>
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
            <div className="space-y-1.5 relative">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
                Location Assignment *
              </label>
              <div className="relative">
                <select
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  <option value="Downtown">Downtown</option>
                  <option value="Wicker Park">Wicker Park</option>
                  <option value="Midtown">Midtown</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          {/* Weekly Working Schedule */}
          {showSchedule && (
            <div className="pt-4 space-y-4 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-2 text-gray-500">
                <CalendarIcon size={14} />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  Weekly Working Schedule
                </span>
              </div>
              <div className="space-y-2">
                {schedule.map((item: any, index: number) => (
                  <div
                    key={item.day}
                    className={cn(
                      "flex items-center justify-between p-3 border rounded-2xl transition-all",
                      item.enabled
                        ? "bg-black border-[#262626]"
                        : "bg-[#080808] border-transparent opacity-40",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={() => toggleDay(index)}
                        className="w-4 h-4 rounded border-[#262626] bg-black checked:bg-white cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-300 w-8">
                        {item.day}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-2 relative",
                        !item.enabled && "pointer-events-none",
                      )}
                    >
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActivePicker({ index, field: "start" })
                          }
                          className="bg-[#111] border border-[#262626] px-3 py-1.5 rounded-lg text-[11px] text-white hover:bg-[#161616] flex items-center gap-2 min-w-17.5"
                        >
                          <Clock size={12} className="text-gray-600" />{" "}
                          {item.start}
                        </button>
                        {activePicker?.index === index &&
                          activePicker?.field === "start" && (
                            <TimeDropdown
                              onSelect={(val) =>
                                handleTimeChange(index, "start", val)
                              }
                              onClose={() => setActivePicker(null)}
                            />
                          )}
                      </div>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setActivePicker({ index, field: "end" })
                          }
                          className="bg-[#111] border border-[#262626] px-3 py-1.5 rounded-lg text-[11px] text-white hover:bg-[#161616] flex items-center gap-2 min-w-[70px]"
                        >
                          <Clock size={12} className="text-gray-600" />{" "}
                          {item.end}
                        </button>
                        {activePicker?.index === index &&
                          activePicker?.field === "end" && (
                            <TimeDropdown
                              onSelect={(val) =>
                                handleTimeChange(index, "end", val)
                              }
                              onClose={() => setActivePicker(null)}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-[#1A1A1A] flex gap-3 bg-[#0D0D0D]">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 border border-[#262626] text-white rounded-2xl font-bold hover:bg-[#1A1A1A] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3.5 bg-white text-black rounded-2xl font-bold hover:bg-gray-200 shadow-lg"
          >
            {isEditMode ? "Update User" : "Create User"}
          </button>
        </div>
      </div>
    </div>
  );
};

const TimeDropdown = ({
  onSelect,
  onClose,
}: {
  onSelect: (v: string) => void;
  onClose: () => void;
}) => (
  <>
    <div className="fixed inset-0 z-[110]" onClick={onClose} />
    <div className="absolute right-0 top-full mt-2 w-28 max-h-48 overflow-y-auto bg-[#111] border border-[#262626] rounded-xl shadow-2xl z-[120] custom-scrollbar">
      {TIME_OPTIONS.map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          className="w-full text-left px-4 py-2 text-[10px] text-gray-400 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0"
        >
          {t}
        </button>
      ))}
    </div>
  </>
);
