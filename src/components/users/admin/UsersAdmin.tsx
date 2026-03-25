/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { UserManagementHeader } from "./UserManagementHeader";
import { UserTable } from "./UserTable";
import { UserActionModal } from "./UserActionModal";
import { cn } from "@/lib/utils";

export default function UsersAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- DUMMY DATA ---
  const usersData = [
    {
      id: 1,
      name: "Marcus Rivera",
      handle: "@mrivera",
      role: "District Manager",
      location: "Downtown",
      joined: "Mar 15, 2022",
      status: "Active",
      initials: "MR",
      avatarColor: "bg-purple-600",
      schedule: null,
    },
    {
      id: 2,
      name: "Sarah Chen",
      handle: "@schen",
      role: "Manager",
      location: "Downtown",
      joined: "Aug 1, 2022",
      status: "Active",
      initials: "SC",
      avatarColor: "bg-cyan-600",
      schedule: null,
    },
    {
      id: 3,
      name: "Jake Thompson",
      handle: "@jthompson",
      role: "Manager",
      location: "Midtown",
      joined: "Jan 12, 2023",
      status: "Active",
      initials: "JT",
      avatarColor: "bg-emerald-600",
      schedule: null,
    },
    {
      id: 4,
      name: "Alex Kim",
      handle: "@akim",
      role: "Staff",
      location: "Downtown",
      joined: "Jun 1, 2023",
      status: "Active",
      initials: "AK",
      avatarColor: "bg-red-600",
      schedule: null,
    },
    {
      id: 5,
      name: "Jordan Watts",
      handle: "@jwatts",
      role: "Tattoo Artist",
      location: "Downtown",
      joined: "Jul 15, 2023",
      status: "Active",
      initials: "JW",
      avatarColor: "bg-indigo-600",
      schedule: null,
    },
    {
      id: 6,
      name: "Chloe Martin",
      handle: "@cmartin",
      role: "Employee",
      location: "Wicker Park",
      joined: "Nov 1, 2023",
      status: "Inactive",
      initials: "CM",
      avatarColor: "bg-blue-600",
      schedule: null,
    },
  ];

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const filteredUsers = usersData.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 p-4 bg-black min-h-screen">
      <UserManagementHeader onOpenModal={handleCreate} />

      {/* Search logic passed via local state */}
      <div className="relative -mt-4 mb-4">
        <input
          type="text"
          placeholder="Filter by name or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="hidden" // Internal logic only
        />
      </div>

      <div className="bg-[#0A0A0A] border border-[#262626] rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center">
          <h3 className="text-white font-bold">
            All Users ({filteredUsers.length})
          </h3>
        </div>

        {/* Pass handleEdit to Table */}
        <UserTable users={filteredUsers} onEdit={handleEdit} />

        <div className="p-6 flex justify-center gap-2 border-t border-[#1A1A1A]">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={cn(
                "w-8 h-8 rounded-lg border text-xs font-bold",
                p === 1
                  ? "bg-white text-black border-white"
                  : "border-[#1A1A1A] text-gray-500",
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL with KEY strategy: When selectedUser changes, modal resets perfectly */}
      <UserActionModal
        key={selectedUser?.id || "new-user"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedUser}
        onSave={(data) => {
          console.log("Saving User:", data);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
