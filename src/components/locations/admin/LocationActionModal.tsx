/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { X, ChevronDown, MapPin, Building2, Globe } from "lucide-react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null; // Pass location object to Edit, null to Create
  onSave: (data: any) => void;
}

export const LocationActionModal = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}: LocationModalProps) => {
  const [formData, setFormData] = useState({
    studioName: initialData?.name || "",
    streetAddress: initialData?.address || "",
    cityState: initialData?.city || "",
    status: initialData?.status || "Active",
  });

  if (!isOpen) return null;

  const isEditMode = !!initialData;

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#0D0D0D] border border-[#262626] rounded-[32px] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center bg-[#0D0D0D]">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isEditMode ? "Edit Location" : "Create New Location"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Studio Name *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.studioName}
                onChange={(e) =>
                  setFormData({ ...formData, studioName: e.target.value })
                }
                placeholder="e.g. Ink Empire — Northside"
                className="w-full bg-black border border-[#262626] rounded-xl p-3.5 pl-10 text-sm text-white focus:border-[#404040] outline-none transition-colors"
              />
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Street Address *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.streetAddress}
                onChange={(e) =>
                  setFormData({ ...formData, streetAddress: e.target.value })
                }
                placeholder="e.g. 500 W Belmont Ave"
                className="w-full bg-black border border-[#262626] rounded-xl p-3.5 pl-10 text-sm text-white focus:border-[#404040] outline-none"
              />
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              City, State
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.cityState}
                onChange={(e) =>
                  setFormData({ ...formData, cityState: e.target.value })
                }
                placeholder="e.g. Chicago, IL"
                className="w-full bg-black border border-[#262626] rounded-xl p-3.5 pl-10 text-sm text-white focus:border-[#404040] outline-none"
              />
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Status
            </label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full bg-black border border-[#262626] rounded-xl p-3.5 text-sm text-white outline-none appearance-none cursor-pointer focus:border-[#404040]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#1A1A1A] flex gap-3 bg-[#0D0D0D]">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-[#262626] text-white rounded-2xl font-bold hover:bg-[#1A1A1A] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-white text-black rounded-2xl font-bold hover:bg-gray-200 shadow-lg transition-colors"
          >
            {isEditMode ? "Update Location" : "Create Location"}
          </button>
        </div>
      </div>
    </div>
  );
};
