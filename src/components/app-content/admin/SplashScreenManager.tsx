"use client";

import React, { useState, useRef } from "react";
import Image from "next/image"; // Import Next.js Image component
import { Upload } from "lucide-react";

export const SplashScreenManager = ({
  currentImage,
}: {
  currentImage: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create a local URL to preview the image before saving
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
          <div className="w-70 h-112.5 rounded-[32px] overflow-hidden border border-[#262626] bg-[#0A0A0A] shadow-2xl relative">
            <Image
              src={previewUrl || currentImage} // Use preview if exists, otherwise current
              alt="Splash Preview"
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              priority
            />
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
          disabled={!selectedFile}
          className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Changes
        </button>
        <button
          onClick={handleCancel}
          className="bg-black border border-[#262626] text-gray-500 px-8 py-3 rounded-xl font-bold hover:text-white transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
