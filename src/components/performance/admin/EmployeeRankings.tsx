// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { cn } from "@/lib/utils";

// export const EmployeeRankings = ({ rankings }: { rankings: any[] }) => (
//   <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl overflow-hidden mt-8">
//     <div className="p-8 border-b border-[#1A1A1A]">
//       <h3 className="text-white font-bold text-lg">Employee Rankings</h3>
//       <p className="text-gray-500 text-xs mt-1">
//         Performance breakdown for all employees
//       </p>
//     </div>
//     <div className="overflow-x-auto">
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr className="text-gray-600 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
//             <th className="px-8 py-5">Rank</th>
//             <th className="px-8 py-5">Employee</th>
//             <th className="px-8 py-5 text-center">Tasks Completed</th>
//             <th className="px-8 py-5 text-center">Overdue</th>
//             <th className="px-8 py-5">Attendance</th>
//             <th className="px-8 py-5">Completion Rate</th>
//             <th className="px-8 py-5 text-right">Status</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-[#1A1A1A]">
//           {rankings.map((emp) => (
//             <tr
//               key={emp.rank}
//               className="hover:bg-white/1 transition-all group"
//             >
//               <td className="px-8 py-6 font-bold text-amber-500">
//                 #{emp.rank} {emp.rank <= 3 && "🏆"}
//               </td>
//               <td className="px-8 py-6 flex items-center gap-3">
//                 <div
//                   className={cn(
//                     "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white",
//                     emp.avatarColor,
//                   )}
//                 >
//                   {emp.initials}
//                 </div>
//                 <div>
//                   <p className="text-white text-sm font-bold">{emp.name}</p>
//                   <p className="text-gray-600 text-xs italic">{emp.email}</p>
//                 </div>
//               </td>
//               <td className="px-8 py-6 text-center">
//                 <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg font-bold text-xs">
//                   {emp.tasks}
//                 </span>
//               </td>
//               <td className="px-8 py-6 text-center text-red-500/50 text-xs font-bold">
//                 {emp.overdue || "—"}
//               </td>
//               <td className="px-8 py-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-24 bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
//                     <div
//                       className="bg-blue-500 h-full"
//                       style={{ width: `${emp.attendance}%` }}
//                     />
//                   </div>
//                   <span className="text-gray-400 text-xs font-bold">
//                     {emp.attendance}%
//                   </span>
//                 </div>
//               </td>
//               <td className="px-8 py-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-24 bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
//                     <div
//                       className="bg-emerald-500 h-full"
//                       style={{ width: `${emp.completion}%` }}
//                     />
//                   </div>
//                   <span className="text-gray-400 text-xs font-bold">
//                     {emp.completion}%
//                   </span>
//                 </div>
//               </td>
//               <td className="px-8 py-6 text-right">
//                 <div className="flex items-center justify-end gap-2">
//                   <div
//                     className={cn(
//                       "w-1.5 h-1.5 rounded-full",
//                       emp.status === "Good"
//                         ? "bg-emerald-500"
//                         : emp.status === "Monitor"
//                           ? "bg-amber-500"
//                           : "bg-red-500",
//                     )}
//                   />
//                   <span
//                     className={cn(
//                       "text-[10px] font-bold uppercase",
//                       emp.status === "Good"
//                         ? "text-emerald-500"
//                         : emp.status === "Monitor"
//                           ? "text-amber-500"
//                           : "text-red-500",
//                     )}
//                   >
//                     {emp.status}
//                   </span>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";

export const EmployeeRankings = ({ rankings }: { rankings: any[] }) => (
  <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-[2rem] overflow-hidden mt-8">
    {/* Header */}
    <div className="p-6 md:p-8 border-b border-[#1A1A1A]">
      <h3 className="text-white font-bold text-lg">Employee Rankings</h3>
      <p className="text-gray-500 text-xs mt-1">
        Performance breakdown for all employees
      </p>
    </div>

    {/* --- Desktop Table View --- */}
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-white text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
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
              className="hover:bg-white/2 transition-all group"
            >
              <td className="px-8 py-6 font-bold text-amber-500">
                #{emp.rank} {emp.rank <= 3 && "🏆"}
              </td>
              <td className="px-8 py-6 flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0",
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
                <ProgressBar value={emp.attendance} color="bg-blue-500" />
              </td>
              <td className="px-8 py-6">
                <ProgressBar value={emp.completion} color="bg-emerald-500" />
              </td>
              <td className="px-8 py-6 text-right">
                <StatusIndicator status={emp.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* --- Mobile Card View --- */}
    <div className="lg:hidden divide-y divide-[#1A1A1A]">
      {rankings.map((emp) => (
        <div key={emp.rank} className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-black text-lg">
                #{emp.rank}
              </span>
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white",
                    emp.avatarColor,
                  )}
                >
                  {emp.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">
                    {emp.name}
                  </p>
                  <p className="text-gray-600 text-[10px] italic">
                    {emp.email}
                  </p>
                </div>
              </div>
            </div>
            {emp.rank <= 3 && <span className="text-lg">🏆</span>}
          </div>

          <div className="grid grid-cols-2 gap-4 bg-[#111] p-4 rounded-2xl border border-[#1A1A1A]">
            <div className="space-y-1">
              <p className="text-gray-600 text-[9px] uppercase font-bold tracking-widest">
                Tasks Done
              </p>
              <p className="text-emerald-500 font-bold text-sm">{emp.tasks}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-[9px] uppercase font-bold tracking-widest">
                Overdue
              </p>
              <p className="text-red-500/60 font-bold text-sm">
                {emp.overdue || "0"}
              </p>
            </div>
            <div className="col-span-2 space-y-2 pt-1">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-[9px] uppercase font-bold">
                  Attendance / Completion
                </p>
                <StatusIndicator status={emp.status} />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: `${emp.attendance}%` }}
                  />
                </div>
                <div className="flex-1 h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${emp.completion}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Sub-components to keep code DRY
 */

const ProgressBar = ({ value, color }: { value: number; color: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-24 bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
      <div className={cn("h-full", color)} style={{ width: `${value}%` }} />
    </div>
    <span className="text-gray-400 text-xs font-bold">{value}%</span>
  </div>
);

const StatusIndicator = ({ status }: { status: string }) => {
  const config: any = {
    Good: "bg-emerald-500 text-emerald-500",
    Monitor: "bg-amber-500 text-amber-500",
    Alert: "bg-red-500 text-red-500",
  };
  const style = config[status] || config.Alert;

  return (
    <div className="flex items-center justify-end gap-2">
      <div className={cn("w-1.5 h-1.5 rounded-full", style.split(" ")[0])} />
      <span
        className={cn("text-[10px] font-bold uppercase", style.split(" ")[1])}
      >
        {status}
      </span>
    </div>
  );
};
