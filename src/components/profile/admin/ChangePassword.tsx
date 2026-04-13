/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/services/profile/profileApi";

export const ChangePassword = () => {
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mutation hook
  const [changePassword, { isLoading: isChanging }] =
    useChangePasswordMutation();

  const inputClass =
    "w-full bg-black border  border-[#968B79]/40 rounded-xl p-4 pr-12 text-sm text-white focus:border-[#968B79]/60 outline-none transition-colors";

  const validateForm = () => {
    if (!formData.current_password.trim()) {
      setError("Current password is required");
      return false;
    }
    if (!formData.new_password.trim()) {
      setError("New password is required");
      return false;
    }
    if (formData.new_password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.new_password !== formData.confirm_password) {
      setError("New password and confirm password do not match");
      return false;
    }
    if (formData.current_password === formData.new_password) {
      setError("New password must be different from current password");
      return false;
    }
    return true;
  };

  const handleUpdatePassword = async () => {
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    try {
      await changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      });

      setSuccess("Password updated successfully!");
      setFormData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(
        err?.data?.detail ||
          err?.data?.current_password?.[0] ||
          err?.data?.non_field_errors?.[0] ||
          "Failed to change password",
      );
    }
  };

  return (
    <div className="bg-[#968B79]/10 border border-[#968B79]/60 rounded-[32px] p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#111] border border-[#968B79]/40 rounded-2xl flex items-center justify-center">
          <Lock size={20} className="text-gray-500" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Change Password</h3>
          <p className="text-gray-500 text-xs">
            Update your password to keep your account secure
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex gap-3 items-start">
          <AlertCircle
            size={18}
            className="text-red-500 mt-0.5 flex-shrink-0"
          />
          <p className="text-red-400 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex gap-3 items-start">
          <div className="w-4 h-4 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
          <p className="text-emerald-400 text-sm font-medium">{success}</p>
        </div>
      )}

      <div className="space-y-6 max-w-4xl">
        {/* Current Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPass.current ? "text" : "password"}
              placeholder="Enter current password"
              value={formData.current_password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  current_password: e.target.value,
                })
              }
              disabled={isChanging}
              className={inputClass}
            />
            <button
              onClick={() =>
                setShowPass({ ...showPass, current: !showPass.current })
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 disabled:opacity-50"
              disabled={isChanging}
            >
              {showPass.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPass.new ? "text" : "password"}
              placeholder="Enter new password"
              value={formData.new_password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  new_password: e.target.value,
                })
              }
              disabled={isChanging}
              className={inputClass}
            />
            <button
              onClick={() => setShowPass({ ...showPass, new: !showPass.new })}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 disabled:opacity-50"
              disabled={isChanging}
            >
              {showPass.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-[10px] text-gray-600 font-medium ml-1">
            Must be at least 8 characters long
          </p>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPass.confirm ? "text" : "password"}
              placeholder="Confirm new password"
              value={formData.confirm_password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirm_password: e.target.value,
                })
              }
              disabled={isChanging}
              className={inputClass}
            />
            <button
              onClick={() =>
                setShowPass({ ...showPass, confirm: !showPass.confirm })
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 disabled:opacity-50"
              disabled={isChanging}
            >
              {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          onClick={handleUpdatePassword}
          disabled={isChanging}
          className="bg-white text-black px-8 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-lg shadow-white/5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isChanging ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </div>
  );
};
