"use client";

import React from "react";
import { ProfileInfo } from "./ProfileInfo";
import { ChangePassword } from "./ChangePassword";
import { useAppSelector } from "@/redux/store";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetProfileQuery,
  useUpdateProfilePhotoMutation,
} from "@/redux/services/profile/profileApi";
import { Loader2 } from "lucide-react";

export default function AdminProfile() {
  // Get token from Redux
  const token = useAppSelector(selectCurrentToken);

  // Profile Query
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useGetProfileQuery(undefined, { skip: !token });

  // Photo Mutation
  const [updateProfilePhoto, { isLoading: isUpdatingPhoto }] =
    useUpdateProfilePhotoMutation();

  // Automatically refetch when token becomes available
  React.useEffect(() => {
    if (token && !profileLoading) {
      refetchProfile();
    }
  }, [token, refetchProfile, profileLoading]);

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#968B79]/10">
        <Loader2 size={32} className="animate-spin text-white" />
      </div>
    );
  }

  if (profileError || !profileData) {
    return (
      <div className="space-y-8 p-4  bg-[#968B79]/10 min-h-screen text-white">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Profile Settings
          </h1>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
          <p className="text-red-400 text-sm">
            Failed to load profile. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 bg-black min-h-screen text-white">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold tracking-widest italic">
          Manage your account settings and security preferences.
        </p>
      </div>

      <div className="space-y-8">
        <ProfileInfo
          data={profileData}
          onUpdatePhoto={updateProfilePhoto}
          isUpdatingPhoto={isUpdatingPhoto}
          onRefresh={refetchProfile}
        />
        <ChangePassword />
      </div>
    </div>
  );
}
