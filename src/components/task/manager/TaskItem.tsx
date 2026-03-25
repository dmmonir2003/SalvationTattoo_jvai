import React from "react";
import {
  CheckCircle2,
  Clock,
  Circle,
  User,
  Briefcase,
  Calendar,
} from "lucide-react";

interface TaskProps {
  title: string;
  description: string;
  assignee: string;
  role: string;
  dueDate: string;
  status: "Completed" | "In Progress" | "Pending" | "Overdue";
}

const TaskItem = ({
  title,
  description,
  assignee,
  role,
  dueDate,
  status,
}: TaskProps) => {
  // Define status-specific styles
  const statusConfig = {
    Completed: {
      icon: <CheckCircle2 className="text-emerald-500" size={20} />,
      badge: "bg-emerald-500/10 text-emerald-500",
      bg: "bg-emerald-500/5",
    },
    "In Progress": {
      icon: <Clock className="text-blue-500" size={20} />,
      badge: "bg-blue-500/10 text-blue-500",
      bg: "bg-blue-500/5",
    },
    Pending: {
      icon: <Circle className="text-gray-500" size={20} />,
      badge: "bg-gray-500/10 text-gray-400",
      bg: "bg-transparent",
    },
    Overdue: {
      icon: <Circle className="text-red-500" size={20} />,
      badge: "bg-red-500/10 text-red-500",
      bg: "bg-red-500/5",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`group flex items-center justify-between p-5 border border-[#262626] rounded-2xl transition-all hover:border-[#404040] ${config.bg}`}
    >
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div className="mt-1">{config.icon}</div>

        <div className="space-y-2">
          <h3 className="text-white font-semibold text-base">{title}</h3>
          <p className="text-gray-500 text-sm max-w-xl">{description}</p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <User size={14} /> {assignee}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Briefcase size={14} /> {role}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar size={14} /> Due {dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div
        className={`px-4 py-1.5 rounded-lg text-xs font-medium ${config.badge}`}
      >
        {status}
      </div>
    </div>
  );
};

export default TaskItem;
