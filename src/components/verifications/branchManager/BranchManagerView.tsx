/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { StatSummary } from "./StatSummary";
import { VerificationCard } from "./VerificationCard";
import TaskDetailsModal from "./TaskDetailsModal";
import RejectModal from "./RejectModal";

const VerificationData = [
  {
    id: 1,
    taskName: "Clean & sterilize all workstations",
    description: "All stations sterilized and logged in the binder.",
    employeeName: "Marcus Chen",
    role: "Tattoo Artist",
    location: "Midtown",
    submittedTime: "Feb 25, 8:45 AM",
    dueDate: "2026-02-22",
    status: "awaiting_review",
    assignBy: "Super Admin",
    imageUrl:
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    taskName: "Restock aftercare supplies",
    description: "Restocked. Low on wrap — order submitted.",
    employeeName: "Jake Morrow",
    role: "Staff",
    location: "Midtown",
    submittedTime: "Feb 25, 9:10 AM",
    dueDate: "2026-02-22",
    status: "approved",
    assignBy: "Super Admin",
    imageUrl:
      "https://images.unsplash.com/photo-1512412023212-f09dfb1c28ee?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    taskName: "Update appointment schedule",
    description: "Restocked. Low on wrap — order submitted.",
    employeeName: "Camille Osei",
    role: "Front Desk",
    location: "Midtown",
    submittedTime: "Feb 25, 7:55 AM",
    dueDate: "2026-02-22",
    status: "pending",
    assignBy: "Store Manager",
    imageUrl: null,
  },
  {
    id: 4,
    taskName: "Deep clean lobby area",
    description: "Focus on glass surfaces and floor.",
    employeeName: "Sofia Delgado",
    role: "Staff",
    location: "Midtown",
    submittedTime: "Feb 24, 6:00 PM",
    dueDate: "2026-02-22",
    status: "overdue",
    assignBy: "District Manager",
    imageUrl: null,
  },
  {
    id: 4,
    taskName: "Deep clean lobby area",
    description: "Focus on glass surfaces and floor.",
    employeeName: "Sofia Delgado",
    role: "Staff",
    location: "Midtown",
    submittedTime: "Feb 24, 6:00 PM",
    dueDate: "2026-02-22",
    status: "rejected",
    assignBy: "District Manager",
    imageUrl: null,
  },
];

type TabType =
  | "awaiting_review"
  | "approved"
  | "pending"
  | "overdue"
  | "rejected";

export default function VerificationsBranchManager() {
  const [selectedTab, setSelectedTab] = useState<TabType>("awaiting_review");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const filteredTasks = VerificationData.filter(
    (task) => task.status === selectedTab,
  );

  const tabs: { id: TabType; label: string }[] = [
    { id: "pending", label: "Pending" },
    { id: "awaiting_review", label: "Awaiting Review" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },

    { id: "overdue", label: "Overdue" },
  ];

  return (
    <div className="space-y-8 p-2">
      <div>
        <h1 className="text-2xl font-bold text-white">Task Verifications</h1>
        <p className="text-muted-foreground text-sm">
          Manage and review branch-level tasks.
        </p>
      </div>

      {/* 1. Stats Grid Updated to 4 items to match your image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatSummary label="Awaiting Review" count={3} color="blue" />
        <StatSummary label="Approved" count={2} color="green" />
        <StatSummary label="Pending" count={0} color="purple" />
        <StatSummary label="Overdue" count={0} color="red" />
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#0A0A0A] border border-[#262626] rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={cn(
              "px-6 py-2 text-xs font-bold rounded-xl transition-all",
              selectedTab === tab.id
                ? "bg-white text-black"
                : "text-gray-400 hover:text-gray-200",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <VerificationCard
            key={task.id}
            data={task}
            activeTab={selectedTab}
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

      {/* Modals */}
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
              console.log("Rejected:", reason);
              setShowReject(false);
            }}
          />
        </>
      )}
    </div>
  );
}
