/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { UsersIcon, CheckCircle2, AlertCircle } from "lucide-react";

// export default function EmployeeBreakdown({ data }: { data: any[] }) {
//   return (
//     <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl overflow-hidden">
//       {/* Header */}
//       <div className="p-6 flex items-center gap-2 border-b border-[#1A1A1A]">
//         <UsersIcon className="w-5 h-5 text-gray-500" />
//         <h3 className="text-white font-bold">Employee Breakdown</h3>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead className="text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
//             <tr>
//               <th className="px-6 py-4">Employee</th>
//               <th className="px-6 py-4 text-center">Total Present</th>
//               <th className="px-6 py-4 text-center">Total Absent</th>
//               <th className="px-6 py-4 text-center">Total Late</th>
//               <th className="px-6 py-4 text-center">Completed</th>
//               <th className="px-6 py-4 text-center">Overdue</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#1A1A1A]">
//             {data.map((emp, i) => (
//               <tr key={i} className="hover:bg-white/5 transition-colors">
//                 {/* Employee Info */}
//                 <td className="px-6 py-4 flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-full bg-[#1E1B2E] flex items-center justify-center text-[11px] font-bold text-[#9171F8]">
//                     {emp.initials}
//                   </div>
//                   <div>
//                     <p className="text-gray-200 text-xs font-bold">
//                       {emp.name}
//                     </p>
//                     <p className="text-gray-500 text-[10px]">{emp.role}</p>
//                   </div>
//                 </td>

//                 {/* Total Present */}
//                 <td className="px-6 py-4 text-center text-emerald-500 font-bold text-sm">
//                   {emp.presentCount || 5}
//                 </td>

//                 {/* Total Absent */}
//                 <td className="px-6 py-4 text-center text-red-500 font-bold text-sm">
//                   {emp.absentCount || 5}
//                 </td>

//                 {/* Total Late */}
//                 <td className="px-6 py-4 text-center text-amber-500 font-bold text-sm">
//                   {emp.lateCount || 0}
//                 </td>

//                 {/* Completed */}
//                 <td className="px-6 py-4">
//                   <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
//                     <CheckCircle2 size={14} className="text-emerald-500" />
//                     <span>{emp.completedCount || 0}</span>
//                   </div>
//                 </td>

//                 {/* Overdue */}
//                 <td className="px-6 py-4">
//                   <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
//                     {emp.overdueCount > 0 ? (
//                       <>
//                         <AlertCircle size={14} className="text-red-500" />
//                         <span className="text-red-500">{emp.overdueCount}</span>
//                       </>
//                     ) : (
//                       <span className="text-gray-600">—</span>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Present":
      return (
        <span className="px-2 py-1 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400">
          Present
        </span>
      );
    case "Absent":
      return (
        <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/20 text-red-400">
          Absent
        </span>
      );
    case "Late":
      return (
        <span className="px-2 py-1 rounded text-xs font-bold bg-amber-500/20 text-amber-400">
          Late
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 rounded text-xs font-bold bg-gray-500/20 text-gray-400">
          —
        </span>
      );
  }
};

interface EmployeeBreakdownProps {
  data: any[];
  showDailyRecords?: boolean;
}

export default function EmployeeBreakdown({
  data,
  showDailyRecords = false,
}: EmployeeBreakdownProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = showDailyRecords ? 10 : 5;

  // For today records view (when searching for specific employee)
  if (showDailyRecords) {
    const tableRows = data.flatMap((emp) => {
      if (!emp._records || emp._records.length === 0) return [];

      return emp._records.map((record: any, idx: number) => ({
        employeeName: emp.name,
        employeeInitials: emp.initials,
        employeeRole: emp.role,
        date: record.date,
        dayIndex: idx,
        status: record.status,
        completedCount: emp.completedCount,
        overdueCount: emp.overdueCount,
      }));
    });

    const totalPages = Math.ceil(tableRows.length / itemsPerPage);
    const paginatedRows = tableRows.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    };

    return (
      <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-[#1A1A1A]">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500" />
            <h3 className="text-white font-bold">
              Employee Breakdown (Today Records)
            </h3>
          </div>
        </div>

        {tableRows.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No employee data available
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
                  <tr>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Completed Tasks</th>
                    <th className="px-6 py-4 text-center">Overdue Tasks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]">
                  {paginatedRows.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      {/* Employee Info */}
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1E1B2E] flex items-center justify-center text-[11px] font-bold text-[#9171F8]">
                          {row.employeeInitials}
                        </div>
                        <div>
                          <p className="text-gray-200 text-xs font-bold">
                            {row.employeeName}
                          </p>
                          <p className="text-gray-500 text-[10px]">
                            {row.employeeRole}
                          </p>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-300 text-xs font-medium">
                        {formatDate(row.date)}
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4 text-center">
                        {getStatusBadge(row.status)}
                      </td>

                      {/* Completed Tasks */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-emerald-500 font-bold text-sm">
                          {row.completedCount}
                        </span>
                      </td>

                      {/* Overdue Tasks */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-500 font-bold text-sm">
                          {row.overdueCount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-[#1A1A1A] flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="p-1.5 border border-[#262626] rounded-lg disabled:opacity-30 hover:bg-white/5"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-1.5 border border-[#262626] rounded-lg disabled:opacity-30 hover:bg-white/5"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Summary view (when not searching)
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl overflow-hidden">
      <div className="p-6 flex items-center justify-between border-b border-[#1A1A1A]">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-500" />
          <h3 className="text-white font-bold">Employee Breakdown</h3>
        </div>
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
            {paginatedData.map((emp, i) => (
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
                  {emp.presentCount}
                </td>

                {/* Total Absent */}
                <td className="px-6 py-4 text-center text-red-500 font-bold text-sm">
                  {emp.absentCount}
                </td>

                {/* Total Late */}
                <td className="px-6 py-4 text-center text-amber-500 font-bold text-sm">
                  {emp.lateCount}
                </td>

                {/* Completed */}
                <td className="px-6 py-4 text-center">
                  <span className="text-white text-xs font-bold">
                    {emp.completedCount}
                  </span>
                </td>

                {/* Overdue */}
                <td className="px-6 py-4 text-center text-red-500 font-bold text-xs">
                  {emp.overdueCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-[#1A1A1A] flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-1.5 border border-[#262626] rounded-lg disabled:opacity-30 hover:bg-white/5"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-1.5 border border-[#262626] rounded-lg disabled:opacity-30 hover:bg-white/5"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
