import { ChevronDown, Filter } from "lucide-react";

export const ReportFilters = () => (
  <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl p-4 flex items-center gap-4">
    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mr-2">
      <Filter size={16} />
      <span>Filters:</span>
    </div>

    <div className="flex flex-wrap gap-3">
      {["All Location", "All User", "Last 7 Days"].map((filter) => (
        <button
          key={filter}
          className="bg-black border border-[#262626] px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-4 hover:border-[#404040] transition-all"
        >
          {filter} <ChevronDown size={14} className="text-gray-500" />
        </button>
      ))}
    </div>
  </div>
);
