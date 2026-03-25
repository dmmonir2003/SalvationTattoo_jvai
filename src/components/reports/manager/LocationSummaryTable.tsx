const LocationSummaryTable = ({ data }: { data: any[] }) => (
  <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl overflow-hidden mt-6">
    <div className="p-6">
      <h3 className="text-white font-bold">Location Summary</h3>
    </div>
    <table className="w-full text-left">
      <thead>
        <tr className="text-gray-600 text-[10px] uppercase border-b border-[#1A1A1A]">
          <th className="px-6 py-4">Location</th>
          <th className="px-6 py-4">Tasks Done</th>
          <th className="px-6 py-4">Completion</th>
          <th className="px-6 py-4 text-center">Overdue</th>
        </tr>
      </thead>
      <tbody>
        {data.map((loc, i) => (
          <tr
            key={i}
            className="border-b border-[#1A1A1A] hover:bg-[#111111] transition-all"
          >
            <td className="px-6 py-4 text-white text-xs font-bold">
              {loc.name}
            </td>
            <td className="px-6 py-4 text-gray-500 text-xs">{loc.tasksDone}</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="w-16 bg-[#1A1A1A] h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-yellow-500 h-full"
                    style={{ width: `${loc.completion}%` }}
                  />
                </div>
                <span className="text-yellow-500 text-[10px] font-bold">
                  {loc.completion}%
                </span>
              </div>
            </td>
            <td className="px-6 py-4 flex justify-center">
              {loc.overdue > 0 ? (
                <span className="bg-red-500/10 text-red-500 text-[8px] px-2 py-1 rounded font-bold">
                  {loc.overdue} tasks
                </span>
              ) : (
                <span className="bg-emerald-500/10 text-emerald-500 text-[8px] px-2 py-1 rounded font-bold">
                  None
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LocationSummaryTable;
