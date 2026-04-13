/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Shield,
  Clock,
  Globe,
  Camera,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { ProfileType } from "@/redux/services/profile/profileApi";

interface ProfileInfoProps {
  data: ProfileType;
  onUpdatePhoto: (formData: FormData) => Promise<any>;
  isUpdatingPhoto: boolean;
  onRefresh: () => void;
}

export const ProfileInfo = ({
  data,
  onUpdatePhoto,
  isUpdatingPhoto,
  onRefresh,
}: ProfileInfoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fullName = `${data.first_name} ${data.last_name}`;
  const memberSince = new Date(data.member_since).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const lastLogin = data.last_login_at
    ? new Date(data.last_login_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never";

  const detailItems = [
    { label: "Email Address", value: data.email, icon: Mail },
    { label: "Role & Permissions", value: data.role_display, icon: Shield },
    { label: "Member Since", value: memberSince, icon: Clock },
    { label: "Last Login", value: lastLogin, icon: Globe },
  ];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setError(null);
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSavePhoto = async () => {
    if (!selectedFile) {
      setError("Please select an image to save");
      return;
    }

    try {
      setError(null);
      const formData = new FormData();
      formData.append("profile_photo", selectedFile);

      await onUpdatePhoto(formData);

      setSuccess("Profile photo updated successfully!");
      setPreviewUrl(null);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => {
        onRefresh();
        setSuccess(null);
      }, 500);
    } catch (err: any) {
      setError(
        err?.data?.detail ||
          err?.data?.error ||
          "Failed to update profile photo",
      );
    }
  };

  const handleCancelPhoto = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-[#968B79]/10 border border-[#968B79]/60 rounded-[32px] p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex gap-3 items-start">
          <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-red-400 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex gap-3 items-start">
          <div className="w-4 h-4 rounded-full bg-emerald-500 mt-1 shrink-0" />
          <p className="text-emerald-400 text-sm font-medium">{success}</p>
        </div>
      )}

      {/* Header with Avatar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-[#141414] border border-[#262626] rounded-2xl flex items-center justify-center relative overflow-hidden">
            {previewUrl || data.profile_photo ? (
              <Image
                src={previewUrl || data.profile_photo || ""}
                alt={fullName}
                fill
                className="object-cover"
              />
            ) : (
              <User size={32} className="text-gray-500" />
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {fullName}
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              {data.role_display}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                {data.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Photo Upload Button/Form */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {previewUrl ? (
          <div className="flex gap-2">
            <button
              onClick={handleSavePhoto}
              disabled={isUpdatingPhoto}
              className="bg-white text-black px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUpdatingPhoto ? (
                <>
                  <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Camera size={14} /> Save Photo
                </>
              )}
            </button>
            <button
              onClick={handleCancelPhoto}
              disabled={isUpdatingPhoto}
              className="bg-[#111] border border-[#262626] text-gray-400 px-6 py-2.5 rounded-xl text-xs font-bold hover:text-white hover:bg-[#1A1A1A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleUploadClick}
            disabled={isUpdatingPhoto}
            className="bg-[#111] border border-[#262626] text-gray-400 px-6 py-2.5 rounded-xl text-xs font-bold hover:text-white hover:bg-[#1A1A1A] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Camera size={14} /> Upload Photo
          </button>
        )}
      </div>

      {/* Details List */}
      <div className="space-y-1">
        {detailItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border-b border-[#141414] last:border-0 hover:bg-white/1 transition-colors rounded-xl"
          >
            <div className="w-10 h-10 bg-[#111] rounded-xl flex items-center justify-center border border-white/5">
              <item.icon size={16} className="text-gray-500" />
            </div>
            <div>
              <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">
                {item.label}
              </p>
              <p className="text-gray-300 text-sm font-medium mt-0.5">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
