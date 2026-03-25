import { cn } from "@/lib/utils";

const PunctualityTable = ({ data }: { data: any[] }) => (
  <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl overflow-hidden">
    <div className="p-6 flex justify-between items-center">
      <h3 className="text-white font-bold">Staff Punctuality</h3>
      <div className="bg-[#1A1A1A] p-1 rounded-lg flex gap-1">
        {["Week", "Month", "Quarter"].map((t) => (
          <button
            key={t}
            className={cn(
              "px-3 py-1 text-[10px] rounded-md transition-all",
              t === "Month" ? "bg-white text-black" : "text-gray-500",
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
    <table className="w-full text-left">
      <thead>
        <tr className="text-gray-600 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
          <th className="px-6 py-4">Staff Member</th>
          <th className="px-6 py-4">On-time Rate</th>
          <th className="px-6 py-4 text-center">Tasks Done</th>
          <th className="px-6 py-4 text-center">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#1A1A1A]">
        {data.map((staff, i) => (
          <tr key={i} className="hover:bg-[#111111] transition-colors">
            <td className="px-6 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold">
                {staff.initials}
              </div>
              <div>
                <p className="text-white text-xs font-bold">{staff.name}</p>
                <p className="text-gray-600 text-[10px]">{staff.location}</p>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#1A1A1A] h-1 rounded-full w-24">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${staff.onTime}%` }}
                  />
                </div>
                <span className="text-emerald-500 text-xs font-bold">
                  {staff.onTime}%
                </span>
              </div>
            </td>
            <td className="px-6 py-4 text-center text-xs text-white">
              {staff.tasks}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    staff.status === "Good" ? "bg-emerald-500" : "bg-amber-500",
                  )}
                />
                <span className="text-gray-400 text-xs">{staff.status}</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PunctualityTable;
