/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit2, Trash2, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const LocationTable = ({
  locations,
  onEdit,
}: {
  locations: any[];
  onEdit: (loc: any) => void;
}) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="text-gray-600 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
          <th className="px-6 py-5">Location</th>
          <th className="px-6 py-5">Address</th>
          <th className="px-6 py-5">City</th>
          <th className="px-6 py-5">Staff</th>
          <th className="px-6 py-5">Status</th>
          <th className="px-6 py-5 text-right">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#1A1A1A]">
        {locations.map((loc) => (
          <tr key={loc.id} className="hover:bg-white/2 transition-all group">
            <td className="px-6 py-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#262626] flex items-center justify-center bg-[#0D0D0D]">
                <MapPin size={16} className="text-gray-500" />
              </div>
              <span className="text-white text-sm font-bold">{loc.name}</span>
            </td>
            <td className="px-6 py-6 text-gray-500 text-sm">{loc.address}</td>
            <td className="px-6 py-6 text-gray-500 text-sm">{loc.city}</td>
            <td className="px-6 py-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Users size={14} /> {loc.staffCount}
              </div>
            </td>
            <td className="px-6 py-6">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    loc.status === "Active"
                      ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                      : "bg-red-500",
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium",
                    loc.status === "Active"
                      ? "text-emerald-500"
                      : "text-red-500",
                  )}
                >
                  {loc.status}
                </span>
              </div>
            </td>
            <td className="px-6 py-6 text-right">
              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(loc)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
