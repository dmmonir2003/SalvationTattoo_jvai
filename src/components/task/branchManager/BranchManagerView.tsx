/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChevronDown,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TaskItem from "./TaskItem";
import { useState } from "react";
import { TaskActionModal } from "../admin/TaskActionModal";

export default function BranchManagerView() {
  // const user = useAppSelector(selectCurrentUser);
  // const role = useAppSelector(selectUserRole);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<any | null>(null);

  const handleOpenCreate = () => {
    setTaskToEdit(null); // Reset for creation
    setIsActionModalOpen(true);
  };

  const handleSaveTask = (formData: any) => {
    if (taskToEdit) {
      console.log("Updating existing task:", formData);
    } else {
      console.log("Creating new task:", formData);
    }
    // Add logic here to update your tasks array or call API
  };

  return (
    <div className="space-y-6">
      <div className="min-h-screen bg-black p-8 font-sans text-white">
        {/* 1. Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Task Management</h1>
            <p className="text-gray-500 text-sm">
              Create and assign tasks across all locations
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 flex items-center gap-2"
          >
            <Plus size={18} /> Create Task
          </button>
        </div>

        {/* 2. Controls Section (Search & Filter) */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full bg-[#0A0A0A] border border-[#968B79]/60 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* 3. Tasks List */}
        <div className="border border-[#1A1A1A] rounded-2xl overflow-hidden bg-black">
          <TaskItem
            title="Clean & sterilize all workstations"
            description="Ensure all tattoo stations are fully sterilized and documented before opening."
            assignee="Sofia Delgado"
            dueDate="2026-02-25"
            submittedDate="2/25/2026"
            status="Pending"
            onEdit={() => console.log("Edit click")}
            onDelete={() => console.log("Delete click")}
          />
          <TaskItem
            title="Portfolio review & client showcase update"
            description="Add latest completed work to the studio portfolio display"
            assignee="Aria Thompson"
            dueDate="2026-02-28"
            submittedDate="2/28/2026"
            status="Pending"
          />
        </div>

        {/* 4. Pagination Section */}
        <div className="flex items-center justify-between pt-6 border-t border-[#1A1A1A]">
          <p className="text-gray-500 text-sm">Showing 1 to 5 of 24 results</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-[#262626] rounded-lg text-gray-500 hover:text-white">
              <ChevronLeft size={18} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-9 h-9 rounded-lg border text-sm transition-all ${page === 1 ? "border-[#403E39] bg-[#1C1C1A] text-white" : "border-[#262626] text-gray-500 hover:text-white"}`}
              >
                {page}
              </button>
            ))}
            <span className="text-gray-500 mx-1">...</span>
            <button className="w-9 h-9 rounded-lg border border-[#262626] text-sm text-gray-500">
              10
            </button>
            <button className="p-2 border border-[#262626] rounded-lg text-gray-500 hover:text-white">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      );
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
