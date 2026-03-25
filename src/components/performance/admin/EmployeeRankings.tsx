/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";

export const EmployeeRankings = ({ rankings }: { rankings: any[] }) => (
  <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl overflow-hidden mt-8">
    <div className="p-8 border-b border-[#1A1A1A]">
      <h3 className="text-white font-bold text-lg">Employee Rankings</h3>
      <p className="text-gray-500 text-xs mt-1">
        Performance breakdown for all employees
      </p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
            <th className="px-8 py-5">Rank</th>
            <th className="px-8 py-5">Employee</th>
            <th className="px-8 py-5 text-center">Tasks Completed</th>
            <th className="px-8 py-5 text-center">Overdue</th>
            <th className="px-8 py-5">Attendance</th>
            <th className="px-8 py-5">Completion Rate</th>
            <th className="px-8 py-5 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A1A1A]">
          {rankings.map((emp) => (
            <tr
              key={emp.rank}
              className="hover:bg-white/1 transition-all group"
            >
              <td className="px-8 py-6 font-bold text-amber-500">
                #{emp.rank} {emp.rank <= 3 && "🏆"}
              </td>
              <td className="px-8 py-6 flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white",
                    emp.avatarColor,
                  )}
                >
                  {emp.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-bold">{emp.name}</p>
                  <p className="text-gray-600 text-xs italic">{emp.email}</p>
                </div>
              </td>
              <td className="px-8 py-6 text-center">
                <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg font-bold text-xs">
                  {emp.tasks}
                </span>
              </td>
              <td className="px-8 py-6 text-center text-red-500/50 text-xs font-bold">
                {emp.overdue || "—"}
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: `${emp.attendance}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-xs font-bold">
                    {emp.attendance}%
                  </span>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: `${emp.completion}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-xs font-bold">
                    {emp.completion}%
                  </span>
                </div>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      emp.status === "Good"
                        ? "bg-emerald-500"
                        : emp.status === "Monitor"
                          ? "bg-amber-500"
                          : "bg-red-500",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase",
                      emp.status === "Good"
                        ? "text-emerald-500"
                        : emp.status === "Monitor"
                          ? "text-amber-500"
                          : "text-red-500",
                    )}
                  >
                    {emp.status}
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
