/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { X, ChevronDown, RotateCcw, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null; // Pass task data for Edit, null for Create
  onSave: (data: any) => void;
}

export const TaskActionModal = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}: TaskActionModalProps) => {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    title: initialData?.taskName || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    assignTo: initialData?.assignedTo || "",
    dueDate: initialData?.dueDate || "",
    isRecurring: initialData?.isRecurring || false,
    requirePhoto: initialData?.requirePhoto || false,
  });

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#0D0D0D] border border-[#262626] rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center bg-[#0D0D0D] sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {isEditMode ? "Edit Task" : "Cross-Location Task"}
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              {isEditMode
                ? "Update task details and assignments"
                : "Assign task across multiple locations"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white transition-colors bg-[#1A1A1A] rounded-full"
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
              className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white focus:border-[#404040] outline-none transition-all"
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
              className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white min-h-[100px] resize-none outline-none focus:border-[#404040]"
            />
          </div>

          {/* Location Select */}
          <div className="space-y-1.5 relative">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Select Store *
            </label>
            <div className="relative">
              <select
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white appearance-none outline-none cursor-pointer pr-10"
              >
                <option value="">Select one or more locations...</option>
                <option value="Downtown">Downtown</option>
                <option value="Midtown">Midtown</option>
                <option value="Wicker Park">Wicker Park</option>
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
                  className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white outline-none focus:border-[#404040] [color-scheme:dark]"
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
                  onChange={(e) =>
                    setFormData({ ...formData, assignTo: e.target.value })
                  }
                  className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white appearance-none outline-none cursor-pointer pr-10"
                >
                  <option value="">Select user...</option>
                  <option value="Alex Kim">Alex Kim</option>
                  <option value="Sarah Chen">Sarah Chen</option>
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
            <div
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer",
                formData.isRecurring
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-black border-[#262626]",
              )}
              onClick={() =>
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
            </div>

            {/* Photo Verification */}
            <div
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer",
                formData.requirePhoto
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-black border-[#262626]",
              )}
              onClick={() =>
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
            className="flex-1 py-4 border border-[#262626] text-white rounded-2xl font-bold hover:bg-[#1A1A1A] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-4 bg-white text-black rounded-2xl font-bold hover:bg-gray-200 shadow-lg active:scale-95 transition-all"
          >
            {isEditMode ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};
