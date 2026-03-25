import { cn } from "@/lib/utils";

const ComparisonBar = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-gray-500 text-xs w-24 truncate">{label}</span>
    <div className="flex-1 bg-[#141414] h-1.5 rounded-full overflow-hidden">
      <div
        className={cn("h-full rounded-full", color)}
        style={{ width: `${value}%` }}
      />
    </div>
    <span
      className={cn(
        "text-xs font-bold w-8 text-right",
        color.replace("bg-", "text-"),
      )}
    >
      {value}%
    </span>
  </div>
);

export default ComparisonBar;
