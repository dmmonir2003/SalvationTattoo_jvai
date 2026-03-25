/* eslint-disable @typescript-eslint/no-explicit-any */
export const AttendanceLog = ({ data }: { data: any[] }) => (
  <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl overflow-hidden">
    <div className="p-6 border-b border-[#1A1A1A]">
      <h3 className="text-white font-bold text-lg">Attendance Log</h3>
      <p className="text-gray-500 text-xs mt-1 italic">
        Synced from employee mobile app
      </p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Location</th>
            <th className="px-6 py-4">Present</th>
            <th className="px-6 py-4">Absent</th>
            <th className="px-6 py-4">Late</th>
            <th className="px-6 py-4 text-right">Rate</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A1A1A]">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-white/1 transition-colors">
              <td className="px-6 py-5 text-gray-400 text-sm">{row.date}</td>
              <td className="px-6 py-5 text-gray-500 text-sm">
                {row.location}
              </td>
              <td className="px-6 py-5 text-emerald-500 font-bold text-sm">
                {row.present}
              </td>
              <td className="px-6 py-5 text-red-900 font-bold text-sm">
                {row.absent}
              </td>
              <td className="px-6 py-5 text-amber-600 font-bold text-sm">
                {row.late}
              </td>
              <td className="px-6 py-5 text-right font-bold text-amber-500 text-sm">
                {row.rate}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
