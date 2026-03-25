"use client";

import { ProfileInfo } from "./ProfileInfo";
import { ChangePassword } from "./ChangePassword";

export default function AdminProfile() {
  // --- DUMMY DATA ---
  const adminData = {
    name: "Super Admin",
    role: "Super Administrator",
    status: "Active",
    email: "superadmin@inkempire.com",
    memberSince: "January 15, 2024",
    lastLogin: "March 11, 2026 - 09:30 AM",
  };

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
        <ProfileInfo data={adminData} />
        <ChangePassword />
      </div>
    </div>
  );
}
