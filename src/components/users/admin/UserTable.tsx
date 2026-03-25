/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure cn is imported

interface UserTableProps {
  users: any[];
  onEdit: (user: any) => void; // Added this line
}

export const UserTable = ({ users, onEdit }: UserTableProps) => (
  <div className="overflow-x-auto mt-8">
    <table className="w-full text-left">
      <thead>
        <tr className="text-gray-600 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
          <th className="px-4 py-4">User</th>
          <th className="px-4 py-4">Role</th>
          <th className="px-4 py-4">Location</th>
          <th className="px-4 py-4">Joined</th>
          <th className="px-4 py-4">Status</th>
          <th className="px-4 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#1A1A1A]">
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-white/5 transition-all group">
            <td className="px-4 py-5 flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white",
                  user.avatarColor,
                )}
              >
                {user.initials}
              </div>
              <div>
                <p className="text-white text-sm font-bold">{user.name}</p>
                <p className="text-gray-600 text-xs italic">{user.handle}</p>
              </div>
            </td>
            <td className="px-4 py-5">
              <span className="bg-[#1A1A1A] text-gray-400 text-[10px] px-3 py-1 rounded-full border border-[#262626]">
                {user.role}
              </span>
            </td>
            <td className="px-4 py-5 text-gray-500 text-xs">{user.location}</td>
            <td className="px-4 py-5 text-gray-500 text-xs">{user.joined}</td>
            <td className="px-4 py-5">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    user.status === "Active"
                      ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                      : "bg-gray-600",
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium",
                    user.status === "Active"
                      ? "text-emerald-500"
                      : "text-gray-600",
                  )}
                >
                  {user.status}
                </span>
              </div>
            </td>
            <td className="px-4 py-5 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(user)} // Trigger the edit modal
                className="p-2 text-gray-500 hover:text-white transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
