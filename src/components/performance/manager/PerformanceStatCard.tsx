import { cn } from "@/lib/utils";

const PerformanceStatCard = ({
  location,
  percentage,
  color,
}: {
  location: string;
  percentage: number;
  color: string;
}) => (
  <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl p-6 flex flex-col gap-4 flex-1 min-w-[240px]">
    <div className="flex items-center gap-2">
      <div className={cn("w-2 h-2 rounded-full", color)} />
      <span className="text-gray-500 text-xs font-medium">{location}</span>
    </div>
    <h2 className="text-3xl font-bold text-white tracking-tight">
      {percentage}%
    </h2>
    <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">
      Task completion
    </p>
    <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full mt-2">
      <div
        className={cn("h-full rounded-full transition-all duration-500", color)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export default PerformanceStatCard;
