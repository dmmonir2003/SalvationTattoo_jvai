"use client";

import React, { useState, useEffect } from "react";
import { QrCode, RefreshCw, CheckCircle } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface QRCode {
  id: string;
  code: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export default function QRAttendeeView() {
  const user = useAppSelector(selectCurrentUser);
  const [currentQR, setCurrentQR] = useState<QRCode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching the current active QR code from admin
    // In real implementation, this would be an API call to get the active QR code
    const fetchCurrentQR = async () => {
      try {
        setLoading(true);
        // Mock data - replace with actual API call
        const mockQR: QRCode = {
          id: "qr_001",
          code: "data:image/png;base64,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",
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
          isActive: true,
        };
        setTimeout(() => {
          setCurrentQR(mockQR);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch QR code:", error);
        setLoading(false);
      }
    };

    fetchCurrentQR();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-8 font-sans">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-[#c4a47c] animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading your QR code...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQR) {
    return (
      <div className="min-h-screen bg-black p-8 font-sans">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <QrCode className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No active QR code available</p>
            <p className="text-gray-600 text-sm mt-2">
              Please contact your administrator
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8 font-sans space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Your QR Code
        </h1>
        <p className="text-gray-500 text-sm">
          Use this code to check in at your location
        </p>
      </div>

      {/* QR Code Display */}
      <div className="max-w-md mx-auto bg-[#0D0D0D] border border-[#262626] rounded-2xl p-8 space-y-6">
        {/* Status */}
        <div className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg py-2 px-4">
          <CheckCircle size={16} className="text-green-500" />
          <span className="text-sm font-medium text-green-500">Active</span>
        </div>

        {/* QR Code Image */}
        <div className="flex justify-center">
          {currentQR.code.startsWith("data:image") ? (
            <img
              src={currentQR.code}
              alt="QR Code"
              className="w-64 h-64 border-4 border-[#262626] rounded-lg p-4 bg-white"
            />
          ) : (
            <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center border-4 border-[#262626]">
              <QrCode size={48} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Employee Info */}
        <div className="space-y-2 text-center">
          <p className="text-2xl font-bold text-white">{user?.username}</p>
          <p className="text-sm text-gray-400">{user?.role_display}</p>
        </div>

        {/* Time Info */}
        <div className="space-y-2 text-xs text-gray-500">
          <p>Created: {new Date(currentQR.createdAt).toLocaleString()}</p>
          {currentQR.expiresAt && (
            <p>Expires: {new Date(currentQR.expiresAt).toLocaleString()}</p>
          )}
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#121214] border border-[#2a2a2d] rounded-lg hover:border-[#c4a47c]/30 text-gray-300 hover:text-[#c4a47c] transition-all text-sm"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Instructions */}
      <div className="max-w-md mx-auto bg-[#0D0D0D] border border-[#262626] rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold mb-3">How to Use</h3>
        <ol className="space-y-3 text-sm text-gray-400">
          <li className="flex gap-3">
            <span className="text-[#c4a47c] font-bold">1.</span>
            <span>Show your QR code to the scanner at your location</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#c4a47c] font-bold">2.</span>
            <span>Your check-in will be automatically recorded</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#c4a47c] font-bold">3.</span>
            <span>Your attendance will be synced to the system</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
