import React from "react";
import { Pencil, Trash2, CheckSquare } from "lucide-react";

interface TaskProps {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  submittedDate?: string; // New prop for the image design
  status: "Completed" | "In Progress" | "Pending" | "Overdue";
  onEdit?: () => void;
  onDelete?: () => void;
}

const TaskItem = ({
  title,
  description,
  assignee,
  dueDate,
  submittedDate,
  status,
  onEdit,
  onDelete,
}: TaskProps) => {
  // Define status-specific badge styles
  const statusStyles = {
    Completed: "border-emerald-500/50 text-emerald-500",
    "In Progress": "border-blue-500/50 text-blue-500",
    Pending: "border-indigo-500/50 text-indigo-500",
    Overdue: "border-red-500/50 text-red-500",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-black border-b border-[#1A1A1A] hover:bg-[#050505] transition-colors group">
      <div className="flex items-start gap-4">
        {/* Leading Icon Container */}
        <div className="mt-1 flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
          <CheckSquare size={20} />
        </div>

        {/* Content Area */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h3 className="text-gray-200 font-bold text-sm underline decoration-gray-600 underline-offset-4 cursor-pointer hover:text-white">
              {title}
            </h3>
            <span
              className={`px-3 py-0.5 rounded border text-[10px] font-medium bg-transparent ${statusStyles[status]}`}
            >
              {status}
            </span>
          </div>

          <p className="text-gray-500 text-xs mt-1">{description}</p>

          {/* Metadata Row */}
          <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400 font-medium">
            <span className="underline cursor-pointer hover:text-white">
              {assignee}
            </span>
            <span className="text-gray-700">:</span>
            <span>Due {dueDate}</span>
            {submittedDate && (
              <>
                <span className="text-gray-700">:</span>
                <span>Submitted {submittedDate}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons (Right Side) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="p-2 text-gray-400 hover:text-white border border-[#262626] rounded-lg transition-all"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-500/80 hover:text-red-500 border border-red-900/30 rounded-lg transition-all hover:bg-red-500/5"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
