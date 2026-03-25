import React from "react";
import { cn } from "@/lib/utils";

interface TaskEntry {
  id: number;
  task: string;
  assignedTo: string;
  dueDate: string;
  status: "Awaiting Review" | "Pending" | "Overdue" | "Approved";
}

export default function TaskLog({ data }: { data: TaskEntry[] }) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Awaiting Review":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Overdue":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Approved":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-transparent";
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-[#1A1A1A]">
        <h3 className="text-white font-bold text-lg">Task Log</h3>
        <p className="text-gray-500 text-xs mt-1">{data.length} tasks total</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
              <th className="px-6 py-4">Task</th>
              <th className="px-6 py-4">Assigned To</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-white/2 transition-colors group"
              >
                <td className="px-6 py-4 text-gray-200 text-sm font-medium">
                  {item.task}
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">
                  {item.assignedTo}
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {item.dueDate}
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold border inline-block min-w-25 text-center",
                      getStatusStyle(item.status),
                    )}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
