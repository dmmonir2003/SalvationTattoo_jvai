"use client";

import React, { useState, useRef } from "react";
import Image from "next/image"; // Import Next.js Image component
import { Upload, AlertCircle } from "lucide-react";
import { useUpdateSplashScreenMutation } from "@/redux/services/appContent/appContentApi";

export const SplashScreenManager = ({
  currentImage,
  onRefresh,
}: {
  currentImage: string;
  onRefresh?: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mutation hook
  const [updateSplashScreen, { isLoading: isSaving }] =
    useUpdateSplashScreenMutation();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setError(null);
      setSelectedFile(file);
      // Create a local URL to preview the image before saving
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      setError("Please select an image to save");
      return;
    }

    try {
      setError(null);
      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Call the mutation
      await updateSplashScreen(formData).unwrap();

      setSuccess("Splash screen updated successfully!");
      setPreviewUrl(null);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Refresh parent data
      if (onRefresh) {
        setTimeout(onRefresh, 500);
      }

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(
        err?.data?.detail ||
          err?.data?.error ||
          "Failed to update splash screen",
      );
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex gap-3 items-start">
          <AlertCircle
            size={18}
            className="text-red-500 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex gap-3 items-start">
          <div className="w-4 h-4 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
          <p className="text-emerald-400 text-sm font-medium">{success}</p>
        </div>
      )}

      <div className="space-y-1">
        <h3 className="text-white font-bold text-lg">Splash Screen Image</h3>
        <p className="text-gray-500 text-xs">
          Upload a splash screen image that will appear when the mobile app
          launches.
          <br />
          Recommended portrait image format for mobile screens.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Hidden Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="relative group">
          <div className="w-70 h-112.5 rounded-[32px] overflow-hidden border border-[#262626] bg-[#0A0A0A] shadow-2xl relative flex items-center justify-center">
            {previewUrl || currentImage ? (
              <Image
                src={previewUrl || currentImage}
                alt="Splash Preview"
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                priority
              />
            ) : (
              <div className="text-center space-y-2">
                <p className="text-gray-500 text-xs">No image uploaded yet</p>
                <p className="text-gray-600 text-[10px]">
                  Upload an image to get started
                </p>
              </div>
            )}
            {previewUrl && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-bold bg-black/60 px-3 py-1 rounded-full border border-white/10">
                  Preview Mode
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleUploadClick}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all shadow-lg active:scale-95"
          >
            <Upload size={18} /> Upload Image
          </button>

          {previewUrl && (
            <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
              New image ready to save
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-8 border-t border-[#1A1A1A]">
        <button
          onClick={handleSave}
          disabled={!selectedFile || isSaving}
          className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className="bg-black border border-[#262626] text-gray-500 px-8 py-3 rounded-xl font-bold hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
