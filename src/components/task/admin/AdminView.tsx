/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
// import { useAppSelector } from "@/redux/store";
// import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  CheckSquare,
  Clock,
  ListTodo,
  Search,
  Plus,
  Eye,
  Check,
  X as RejectIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import RejectModal from "./RejectModal";
import TaskDetailsModal from "./TaskDetailsModal";
import { TaskActionModal } from "./TaskActionModal";

// --- DUMMY DATA ---
const taskStats = [
  {
    label: "All Tasks",
    value: 10,
    icon: ListTodo,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Pending",
    value: 5,
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    label: "Completed",
    value: 3,
    icon: CheckSquare,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Approved",
    value: 2,
    icon: Check,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const tasksDummyData = [
  {
    id: 1,
    taskName: "Sanitize Workstations",
    description:
      "Wipe down and sanitize all tattoo workstations using approved medical grade cleaners.",
    assignedTo: "Alex Kim",
    employeeInitials: "AK",
    role: "Employees",
    location: "Downtown",
    dueDate: "Feb 25, 2026",
    status: "Approved",
    imageUrl:
      "https://images.unsplash.com/photo-1581594658553-359bc39031c1?q=80&w=500",
  },
  {
    id: 2,
    taskName: "Weekly Equipment Inventory",
    description:
      "Count and log all needle packs, ink bottles, and disposable supplies.",
    assignedTo: "Sarah Chen",
    employeeInitials: "SC",
    role: "Managers",
    location: "Midtown",
    dueDate: "Feb 28, 2026",
    status: "Awaiting Review",
    imageUrl: null,
  },
  {
    id: 3,
    taskName: "Client Consent Form Audit",
    description:
      "Ensure all client consent forms for the last 7 days are properly filled and filed.",
    assignedTo: "Priya Sharma",
    employeeInitials: "PS",
    role: "Employees",
    location: "Wicker Park",
    dueDate: "Feb 26, 2026",
    status: "Awaiting Review",
    imageUrl: null,
  },
  {
    id: 4,
    taskName: "Instagram Content Upload",
    description:
      "Post 3 healed tattoo photos with proper captions and hashtags.",
    assignedTo: "Priya Sharma",
    employeeInitials: "PS",
    role: "Managers",
    location: "Midtown",
    dueDate: "Feb 25, 2026",
    status: "Overdue",
    imageUrl: null,
  },
  {
    id: 5,
    taskName: "Autoclav Sterilization Log",
    description:
      "Run and record autoclave sterilization cycles for all reusable tools.",
    assignedTo: "Priya Sharma",
    employeeInitials: "PS",
    role: "Employees",
    location: "Downtown",
    dueDate: "Feb 25, 2026",
    status: "Awaiting Review",
    imageUrl: null,
  },
];

export default function AdminView() {
  // const user = useAppSelector(selectCurrentUser);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<any | null>(null);

  const handleOpenCreate = () => {
    setTaskToEdit(null); // Reset for creation
    setIsActionModalOpen(true);
  };

  // const handleOpenEdit = (task: any) => {
  //   setTaskToEdit(task); // Set specific task for editing
  //   setIsActionModalOpen(true);
  // };

  const handleSaveTask = (formData: any) => {
    if (taskToEdit) {
      console.log("Updating existing task:", formData);
    } else {
      console.log("Creating new task:", formData);
    }
    // Add logic here to update your tasks array or call API
  };

  // Modal States

  const handleViewDetails = (task: any) => {
    // Transform table data to match TaskDetailsModal structure
    const detailData = {
      employeeName: task.assignedTo,
      employeeInitials: task.employeeInitials,
      role: task.role,
      location: `SALVATION — ${task.location}`,
      taskName: task.taskName,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      imageUrl: task.imageUrl,
    };
    setSelectedTask(detailData);
    setIsDetailsOpen(true);
  };

  const handleOpenReject = (task: any) => {
    setSelectedTask(task);
    setIsRejectOpen(true);
  };

  return (
    <div className="space-y-8 p-4 bg-black min-h-screen text-white">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-gray-500 text-xs mt-1 uppercase font-bold tracking-widest italic">
            Salvation Tattoo Lounge · Admin Panel
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 flex items-center gap-2"
        >
          <Plus size={18} /> Create Task
        </button>
      </div>

      {/* 2. Search & Stats */}
      <div className="space-y-6">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
            size={18}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full bg-[#0D0D0D] border border-[#262626] rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#404040]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {taskStats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
              </div>
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                  stat.bg,
                )}
              >
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Task Table */}
      <div className="bg-[#0A0A0A] border border-[#262626] rounded-[32px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
                <th className="px-6 py-5">Task</th>
                <th className="px-6 py-5">Assigned To</th>
                <th className="px-6 py-5">Due Date</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]">
              {tasksDummyData.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-white/[0.01] transition-all group"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center border border-[#262626]",
                          task.status === "Overdue"
                            ? "bg-red-500/10"
                            : "bg-[#141414]",
                        )}
                      >
                        <CheckSquare
                          size={18}
                          className={
                            task.status === "Overdue"
                              ? "text-red-500"
                              : "text-gray-500"
                          }
                        />
                      </div>
                      <div>
                        <p className="text-white text-sm font-bold">
                          {task.taskName}
                        </p>
                        <p className="text-gray-500 text-[10px] uppercase tracking-tighter max-w-[200px] truncate">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div>
                      <p className="text-gray-300 text-xs font-bold">
                        {task.assignedTo}
                      </p>
                      <p className="text-gray-600 text-[10px] uppercase">
                        {task.role}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p
                      className={cn(
                        "text-xs font-medium",
                        task.status === "Overdue"
                          ? "text-red-500"
                          : "text-gray-500",
                      )}
                    >
                      {task.dueDate}
                    </p>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-center">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border",
                          task.status === "Approved"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : task.status === "Awaiting Review"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20",
                        )}
                      >
                        {task.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {task.status === "Awaiting Review" && (
                        <>
                          <button className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors">
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenReject(task)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <RejectIcon size={16} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleViewDetails(task)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <TaskDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        data={selectedTask}
      />

      <RejectModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={(reason) =>
          console.log(`Rejected task with reason: ${reason}`)
        }
      />

      {/* REUSABLE MODAL */}
      <TaskActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        initialData={taskToEdit}
        onSave={handleSaveTask}
      />
    </div>
  );
}
