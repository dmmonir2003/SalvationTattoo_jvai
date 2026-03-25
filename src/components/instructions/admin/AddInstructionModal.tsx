"use client";

import React, { useState, useRef } from "react";
import { X, Upload, Users, Briefcase, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export const AddInstructionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for the entire form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedRole: "tattoo", // default selection
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Collect all data for the API call
    const finalData = {
      ...formData,
      file: selectedFile,
    };
    console.log("Submitting Instruction:", finalData);
    // Add your submit logic here (e.g., upload to Firebase/Server)
    onClose();
  };

  const roles = [
    {
      id: "tattoo",
      label: "Tattoo Artists",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      id: "piercers",
      label: "Body Piercers",
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      id: "staff",
      label: "Staff",
      icon: Briefcase,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#0D0D0D] border border-[#262626] rounded-[32px] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center bg-[#0D0D0D]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <FileText size={18} className="text-gray-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add Instruction</h2>
              <p className="text-gray-500 text-xs font-medium">
                Upload a new operational document
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* TITLE FIELD */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Health & Safety Protocol"
              className="w-full bg-black border border-[#262626] rounded-xl p-4 text-sm text-white outline-none focus:border-[#404040]"
            />
          </div>

          {/* DESCRIPTION FIELD (Added back) */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Short Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description of the instruction..."
              className="w-full bg-black border border-[#262626] rounded-xl p-4 text-sm text-white min-h-25 resize-none outline-none focus:border-[#404040]"
            />
          </div>

          {/* FILE UPLOAD SECTION */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Upload PDF File
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
            <div className="flex gap-2">
              <div className="flex-1 bg-black border border-[#262626] rounded-xl p-4 text-sm text-gray-400 italic truncate">
                {selectedFile ? selectedFile.name : "No file selected"}
              </div>
              <button
                type="button"
                onClick={handleBrowseClick}
                className="bg-[#111] border border-[#262626] px-6 rounded-xl text-xs font-bold text-white flex items-center gap-2 hover:bg-[#1A1A1A] transition-colors"
              >
                <Upload size={14} /> Browse
              </button>
            </div>
          </div>

          {/* ROLE VISIBILITY SELECTORS */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
              Role Visibility
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, selectedRole: role.id })
                  }
                  className={cn(
                    "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all",
                    formData.selectedRole === role.id
                      ? "bg-white/5 border-white/20"
                      : "bg-black border-[#262626] hover:border-white/10",
                  )}
                >
                  <role.icon size={18} className={role.color} />
                  <span className="text-[10px] font-bold text-gray-400">
                    {role.label}
                  </span>
                </button>
              ))}
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
            onClick={handleSubmit}
            className="flex-1 py-4 bg-white text-black rounded-2xl font-bold hover:bg-gray-200 shadow-lg active:scale-[0.98] transition-all"
          >
            Add Instruction
          </button>
        </div>
      </div>
    </div>
  );
};
