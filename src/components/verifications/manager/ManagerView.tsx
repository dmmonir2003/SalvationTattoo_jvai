/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
// import { useAppSelector } from "@/redux/store";
// import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { StatSummary } from "./StatSummary";
import { VerificationCard } from "./VerificationCard";
import TaskDetailsModal from "./TaskDetailsModal";
import RejectModal from "./RejectModal";

// Import the new components we built

// Mock Data updated to match the Card UI requirements
const VerificationData = [
  {
    id: 1,
    taskName: "Clean & sterilize all workstations",
    description: "All stations sterilized and logged in the binder.",
    employeeName: "Sofia Delgado",
    employeeInitials: "SD",
    role: "Tattoo Artist",
    location: "Ink Empire — Midtown",
    submittedTime: "Feb 25, 8:45 AM",
    dueDate: "Feb 25, 2026",
    status: "pending",
    imageUrl:
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    taskName: "Restock aftercare supplies",
    description: "Restocked. Low on wrap — order submitted.",
    employeeName: "Jake Morrow",
    employeeInitials: "JM",
    role: "Staff",
    location: "Ink Empire — Midtown",
    submittedTime: "Feb 25, 9:10 AM",
    dueDate: "Feb 25, 2026",
    status: "pending",
    imageUrl:
      "https://images.unsplash.com/photo-1512412023212-f09dfb1c28ee?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    taskName: "Update appointment schedule board",
    description: "Restocked. Low on wrap — order submitted.",
    employeeName: "Camille Osei",
    employeeInitials: "CO",
    role: "Front Desk",
    location: "Ink Empire — Midtown",
    submittedTime: "Feb 25, 7:55 AM",
    dueDate: "Feb 25, 2026",
    status: "pending",
    imageUrl: null, // Tests the "No photo required" state
  },
  {
    id: 4,
    taskName: "Update appointment schedule board",
    description: "Restocked. Low on wrap — order submitted.",
    employeeName: "Camille Osei",
    employeeInitials: "CO",
    role: "Front Desk",
    location: "Ink Empire — Midtown",
    submittedTime: "Feb 25, 7:55 AM",
    dueDate: "Feb 25, 2026",
    status: "resolved",
    imageUrl: null, // Tests the "No photo required" state
  },
];

export default function VerificationsManager() {
  // const user = useAppSelector(selectCurrentUser);
  const [selectedTab, setSelectedTab] = useState<"pending" | "resolved">(
    "pending",
  );

  // Modal States
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReject, setShowReject] = useState(false);

  // Filter logic based on tabs
  const filteredTasks = VerificationData.filter((task) =>
    selectedTab === "pending"
      ? task.status === "pending"
      : task.status === "resolved",
  );

  return (
    <div className="space-y-8 p-2">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Task Verifications</h1>
        <p className="text-muted-foreground text-sm">
          Review submitted tasks and approve or reject them.
        </p>
      </div>

      {/* 1. Stats Grid (Using new StatSummary) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatSummary label="Awaiting Review" count={3} color="blue" />
        <StatSummary label="Approved" count={42} color="green" />
        <StatSummary label="Rejected" count={3} color="red" />
      </div>

      {/* 2. Custom Tabs Styling */}
      <div className="flex gap-1 p-1 bg-[#0A0A0A] border border-[#262626] rounded-xl w-fit">
        <button
          onClick={() => setSelectedTab("pending")}
          className={cn(
            "px-6 py-2 text-xs font-bold rounded-lg transition-all",
            selectedTab === "pending"
              ? "bg-white text-black"
              : "text-gray-500 hover:text-gray-300",
          )}
        >
          Pending
        </button>
        <button
          onClick={() => setSelectedTab("resolved")}
          className={cn(
            "px-6 py-2 text-xs font-bold rounded-lg transition-all",
            selectedTab === "resolved"
              ? "bg-white text-black"
              : "text-gray-500 hover:text-gray-300",
          )}
        >
          Resolved
        </button>
      </div>

      {/* 3. Task Cards Grid (Replacing the Table) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <VerificationCard
            key={task.id}
            data={task}
            isResolved={selectedTab === "resolved"}
            onClick={() => {
              setSelectedTask(task);
              setShowDetail(true);
            }}
            onApprove={(e: any) => {
              e.stopPropagation();
              console.log("Approved", task.id);
            }}
            onReject={(e: any) => {
              e.stopPropagation();
              setSelectedTask(task);
              setShowReject(true);
            }}
          />
        ))}
      </div>

      {/* 4. Modals integration */}
      {selectedTask && (
        <>
          <TaskDetailsModal
            isOpen={showDetail}
            onClose={() => setShowDetail(false)}
            data={selectedTask}
          />
          <RejectModal
            isOpen={showReject}
            onClose={() => setShowReject(false)}
            onConfirm={(reason) => {
              console.log("Rejected with reason:", reason);
              setShowReject(false);
            }}
          />
        </>
      )}
    </div>
  );
}
