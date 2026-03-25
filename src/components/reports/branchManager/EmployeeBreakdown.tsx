/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { UsersIcon } from "lucide-react";

export default function EmployeeBreakdown({ data }: { data: any[] }) {
  return (
    <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl overflow-hidden">
      <div className="p-6 flex items-center gap-2 border-b border-[#1A1A1A]">
        <UsersIcon className="w-5 h-5 text-gray-500" />
        <h3 className="text-white font-bold">Employee Breakdown</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-600 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Today</th>
              <th className="px-6 py-4">Attendance</th>
              <th className="px-6 py-4">Completed</th>
              <th className="px-6 py-4 text-center">Overdue</th>
              <th className="px-6 py-4 text-right">Performance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {data.map((emp, i) => (
              <tr key={i} className="hover:bg-white/2 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {emp.initials}
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">{emp.name}</p>
                    <p className="text-gray-500 text-[10px]">{emp.role}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold border",
                      emp.today === "Present"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : emp.today === "Late"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20",
                    )}
                  >
                    ● {emp.today}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#1A1A1A] h-1 rounded-full min-w-15">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${emp.attendance}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-xs">
                      {emp.attendance}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-300">
                  ✓ {emp.completed}
                </td>
                <td className="px-6 py-4 text-center text-xs text-red-500">
                  {emp.overdue || "—"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <div className="w-24 bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500"
                        style={{ width: `${emp.performance}%` }}
                      />
                    </div>
                    <span className="text-emerald-500 text-xs font-bold">
                      {emp.performance}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
