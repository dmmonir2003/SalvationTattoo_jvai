/* eslint-disable @typescript-eslint/no-explicit-any */

import { UsersIcon, CheckCircle2, AlertCircle } from "lucide-react";

export default function EmployeeBreakdown({ data }: { data: any[] }) {
  return (
    <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center gap-2 border-b border-[#1A1A1A]">
        <UsersIcon className="w-5 h-5 text-gray-500" />
        <h3 className="text-white font-bold">Employee Breakdown</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4 text-center">Total Present</th>
              <th className="px-6 py-4 text-center">Total Absent</th>
              <th className="px-6 py-4 text-center">Total Late</th>
              <th className="px-6 py-4 text-center">Completed</th>
              <th className="px-6 py-4 text-center">Overdue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {data.map((emp, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                {/* Employee Info */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1E1B2E] flex items-center justify-center text-[11px] font-bold text-[#9171F8]">
                    {emp.initials}
                  </div>
                  <div>
                    <p className="text-gray-200 text-xs font-bold">
                      {emp.name}
                    </p>
                    <p className="text-gray-500 text-[10px]">{emp.role}</p>
                  </div>
                </td>

                {/* Total Present */}
                <td className="px-6 py-4 text-center text-emerald-500 font-bold text-sm">
                  {emp.presentCount || 5}
                </td>

                {/* Total Absent */}
                <td className="px-6 py-4 text-center text-red-500 font-bold text-sm">
                  {emp.absentCount || 5}
                </td>

                {/* Total Late */}
                <td className="px-6 py-4 text-center text-amber-500 font-bold text-sm">
                  {emp.lateCount || 0}
                </td>

                {/* Completed */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>{emp.completedCount || 0}</span>
                  </div>
                </td>

                {/* Overdue */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                    {emp.overdueCount > 0 ? (
                      <>
                        <AlertCircle size={14} className="text-red-500" />
                        <span className="text-red-500">{emp.overdueCount}</span>
                      </>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
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
