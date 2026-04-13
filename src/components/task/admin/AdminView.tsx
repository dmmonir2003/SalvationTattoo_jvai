/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback } from "react";
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
import { useAppSelector } from "@/redux/store";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import RejectModal from "./RejectModal";
import TaskDetailsModal from "./TaskDetailsModal";
import { TaskActionModal } from "./TaskActionModal";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useApproveTaskMutation,
  useRejectTaskMutation,
  Task,
} from "@/redux/services/tasks/taskApi";
import { useGetLocationsQuery } from "@/redux/services/location/locationApi";

// Get stat cards with real data
const getStatCards = (stats: any) => [
  {
    label: "All Tasks",
    value: stats?.all_tasks || 0,
    icon: ListTodo,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Pending",
    value: stats?.pending || 0,
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    label: "Completed",
    value: stats?.completed || 0,
    icon: CheckSquare,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Approved",
    value: stats?.approved || 0,
    icon: Check,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

// Map API task to UI format
const mapApiTaskToUI = (task: Task) => {
  // Defensive checks for task data

  return {
    id: task.id,
    taskName: task.title,
    description: task.description,
    assignedTo: task.assigned_to_name,
    employeeInitials: task.assigned_to_name
      ? `${task.assigned_to_name.charAt(0)}`
      : "U",
    role: task.assigned_to_role || "Employee",
    location: task.location_name || "Unassigned",
    dueDate: task.due_date
      ? new Date(task.due_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "No Due Date",
    status:
      task.status === "pending"
        ? "Awaiting Review"
        : task.status === "approved"
          ? "Approved"
          : task.status === "rejected"
            ? "Rejected"
            : "Completed",
    imageUrl: task.photo_url || null,
    apiData: task,
  };
};

export default function AdminView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Get token from Redux
  const token = useAppSelector(selectCurrentToken);

  // API hooks
  const {
    data: apiResponse,
    isLoading,
    error,
    refetch,
  } = useGetTasksQuery(
    {
      search: searchQuery,
      page: currentPage,
    },
    { skip: !token },
  );
  const [createTask, { isLoading: isCreateLoading }] = useCreateTaskMutation();
  const [approveTask] = useApproveTaskMutation();
  const [rejectTask] = useRejectTaskMutation();

  // Fetch locations for form
  const { data: locationsResponse, refetch: refetchLocations } =
    useGetLocationsQuery(undefined, { skip: !token });

  // Automatically refetch when token becomes available (after rehydration)
  React.useEffect(() => {
    if (token && !isLoading) {
      refetch();
      refetchLocations();
    }
  }, [token, refetch, refetchLocations, isLoading]);

  // Modal states
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<any | null>(null);
  const [rejectTaskId, setRejectTaskId] = useState<number | null>(null);

  // Map API tasks to UI format
  const tasks = (apiResponse?.tasks?.results || []).map((task) =>
    mapApiTaskToUI(task),
  );

  console.log(tasks, "sdfdfsdsf");

  // Handle search with pagination reset
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleOpenCreate = () => {
    setTaskToEdit(null);
    setIsActionModalOpen(true);
  };

  const handleSaveTask = useCallback(
    async (formData: any) => {
      try {
        // Get location ID from location name
        const locations = locationsResponse?.locations || [];
        const locationId = locations.find(
          (loc) => loc.name === formData.location,
        )?.id;

        if (!locationId) {
          console.error("Location not found");
          return;
        }

        await createTask({
          title: formData.title,
          description: formData.description,
          location: locationId,
          assigned_to: formData.assignToId,
          due_date: formData.dueDate,
          is_recurring: formData.isRecurring || false,
          frequency: formData.isRecurring
            ? formData.frequency || "daily"
            : "daily",
          requires_photo: formData.requirePhoto || false,
        }).unwrap();
        setIsActionModalOpen(false);
      } catch (err) {
        console.error("Create task failed:", err);
      }
    },
    [createTask, locationsResponse],
  );

  const handleViewDetails = (task: any) => {
    const detailData = {
      employeeName: task.assigned_to_name,
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
    setRejectTaskId(task.id);
    setIsRejectOpen(true);
  };

  const handleApproveTask = useCallback(
    async (taskId: number) => {
      try {
        await approveTask(taskId).unwrap();
      } catch (err) {
        console.error("Approve task failed:", err);
      }
    },
    [approveTask],
  );

  const handleConfirmReject = useCallback(
    async (reason: string) => {
      if (!rejectTaskId) return;
      try {
        await rejectTask({
          id: rejectTaskId,
          rejection_reason: reason,
        }).unwrap();
        setIsRejectOpen(false);
      } catch (err) {
        console.error("Reject task failed:", err);
      }
    },
    [rejectTaskId, rejectTask],
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-8 p-4 bg-black min-h-screen text-white">
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-[#1A1A1A] rounded-[32px]" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-[#1A1A1A] rounded-3xl" />
            ))}
          </div>
          <div className="h-80 bg-[#1A1A1A] rounded-[32px]" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-8 p-4 bg-black min-h-screen text-white">
        <div className="bg-red-500/10 border border-red-500/20 rounded-[32px] p-6 text-red-500">
          Failed to load tasks. Please try again.
        </div>
      </div>
    );
  }

  const taskStats = getStatCards(apiResponse?.stats);

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
          className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 flex items-center gap-2 w-full md:w-auto justify-center"
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
            className="w-full bg-[#0D0D0D] border border-[#968B79]/40 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#968B79]/60"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {taskStats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl p-6 flex items-center justify-between"
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

      {/* 3. Task Table / Responsive View */}
      <div className="space-y-4">
        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-[#0A0A0A] border border-[#968B79]/60 rounded-[32px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-white text-[10px] uppercase font-bold tracking-widest border-b border-[#1A1A1A]">
                  <th className="px-6 py-5">Task</th>
                  <th className="px-6 py-5">Assigned To</th>
                  <th className="px-6 py-5">Due Date</th>
                  <th className="px-6 py-5 text-center">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-white/2 transition-all group"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center border border-[#262626]",
                              task.status === "Rejected"
                                ? "bg-red-500/10"
                                : "bg-[#141414]",
                            )}
                          >
                            <CheckSquare
                              size={18}
                              className={
                                task.status === "Rejected"
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }
                            />
                          </div>
                          <div className="max-w-50">
                            <p className="text-white text-sm font-bold truncate">
                              {task.taskName}
                            </p>
                            <p className="text-gray-500 text-[10px] uppercase tracking-tighter truncate">
                              {task.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <p className="text-gray-300 text-xs font-bold">
                          {task.assignedTo}
                        </p>
                        <p className="text-gray-600 text-[10px] uppercase">
                          {task.role}
                        </p>
                      </td>
                      <td className="px-6 py-6">
                        <p
                          className={cn(
                            "text-xs font-medium",
                            task.status === "Rejected"
                              ? "text-red-500"
                              : "text-gray-500",
                          )}
                        >
                          {task.dueDate}
                        </p>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-center">
                          <StatusBadge status={task.status} />
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          {task.status === "Awaiting Review" && (
                            <>
                              <button
                                onClick={() => handleApproveTask(task.id)}
                                className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors"
                              >
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <p className="text-gray-500">No tasks found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl p-5 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center border border-[#968B79]/60 shrink-0",
                        task.status === "Rejected"
                          ? "bg-red-500/10"
                          : "bg-[#141414]",
                      )}
                    >
                      <CheckSquare
                        size={18}
                        className={
                          task.status === "Rejected"
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">
                        {task.taskName}
                      </p>
                      <StatusBadge status={task.status} />
                    </div>
                  </div>
                  <p
                    className={cn(
                      "text-[10px] font-bold",
                      task.status === "Rejected"
                        ? "text-red-500"
                        : "text-gray-500",
                    )}
                  >
                    {task.dueDate}
                  </p>
                </div>

                <div className="bg-[#0F0F0F] rounded-2xl p-3 border border-[#1A1A1A]">
                  <p className="text-gray-400 text-[11px] leading-relaxed mb-3 line-clamp-2">
                    {task.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-[9px] uppercase tracking-widest">
                        Assigned To
                      </p>
                      <p className="text-gray-300 text-xs font-bold">
                        {task.assignedTo}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-[9px] uppercase tracking-widest">
                        Role
                      </p>
                      <p className="text-gray-300 text-xs font-bold">
                        {task.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  {task.status === "Awaiting Review" && (
                    <>
                      <button
                        onClick={() => handleApproveTask(task.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500/10 text-emerald-500 rounded-xl text-xs font-bold"
                      >
                        <Check size={14} /> Approve
                      </button>
                      <button
                        onClick={() => handleOpenReject(task)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 rounded-xl text-xs font-bold"
                      >
                        <RejectIcon size={14} /> Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleViewDetails(task)}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 bg-[#1A1A1A] text-white rounded-xl text-xs font-bold",
                      task.status !== "Awaiting Review" ? "w-full" : "px-4",
                    )}
                  >
                    <Eye size={14} /> View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks found</p>
            </div>
          )}
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
        onConfirm={handleConfirmReject}
      />

      <TaskActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        initialData={taskToEdit}
        onSave={handleSaveTask}
        isLoading={isCreateLoading}
      />
    </div>
  );
}

// Sub-component for clean status logic
function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border",
        status === "Approved"
          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
          : status === "Awaiting Review"
            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
            : "bg-red-500/10 text-red-500 border-red-500/20",
      )}
    >
      {status}
    </span>
  );
}
