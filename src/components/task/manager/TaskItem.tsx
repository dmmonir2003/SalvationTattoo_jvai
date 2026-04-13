import React from "react";
import {
  Circle,
  User,
  Briefcase,
  Calendar,
  Pencil,
  Trash2,
  MapPin,
} from "lucide-react";

interface TaskProps {
  title: string;
  description: string;
  assignee: string;
  role: string;
  dueDate: string;
  location?: string;
  status: "Pending";
}

const TaskItem = ({
  title,
  description,
  assignee,
  role,
  dueDate,
  location = "Downtown",
  status,
}: TaskProps) => {
  // Define status-specific styles
  const statusConfig = {
    Pending: {
      icon: <Circle className="text-gray-400" size={20} />,
      badge: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="group flex items-center justify-between bg-[#0A0A0A] p-5 border border-[#262626] rounded-2xl transition-all hover:border-[#404040]">
      <div className="flex items-start gap-4">
        {/* Left Side: Status Icon */}
        <div className="mt-1 p-2 bg-[#1A1A1A] rounded-lg">{config?.icon}</div>

        {/* Center: Content */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h3 className="text-white font-semibold text-lg">{title}</h3>
            {/* The Status Badge (Requested Comment Area) */}
            <button
              className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config?.badge} transition-opacity hover:opacity-80`}
            >
              {status}
            </button>
          </div>

          <p className="text-gray-500 text-sm max-w-xl">{description}</p>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <User size={14} /> {assignee}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Briefcase size={14} /> {role}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar size={14} /> Due {dueDate}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <MapPin size={14} /> {location}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Action Buttons (From Screenshot) */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-white border border-[#262626] rounded-lg transition-colors">
          <Pencil size={18} />
        </button>
        <button className="p-2 text-red-500 hover:bg-red-500/10 border border-red-500/50 rounded-lg transition-colors">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
