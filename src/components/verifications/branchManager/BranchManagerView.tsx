/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import {
//   ClipboardCheck,
//   CheckCircle,
//   XCircle,
//   Clock,
//   User,
//   FileText,
//   ArrowUpRight,
// } from "lucide-react";
// import { useAppSelector } from "@/redux/store";
// import {
//   selectCurrentUser,
//   selectUserRole,
// } from "@/redux/features/auth/authSlice";
// import { useState } from "react";

// // Mock data for BranchManager verifications
// const BranchManagerVerificationStatsData = [
//   {
//     title: "Pending",
//     value: "5",
//     icon: Clock,
//     color: "text-amber-500",
//     bgColor: "bg-amber-500/10",
//   },
//   {
//     title: "Approved",
//     value: "42",
//     change: "+8",
//     icon: CheckCircle,
//     color: "text-green-500",
//     bgColor: "bg-green-500/10",
//   },
//   {
//     title: "Rejected",
//     value: "3",
//     change: "-1",
//     icon: XCircle,
//     color: "text-red-500",
//     bgColor: "bg-red-500/10",
//   },
//   {
//     title: "Total Processed",
//     value: "50",
//     icon: ClipboardCheck,
//     color: "text-blue-500",
//     bgColor: "bg-blue-500/10",
//   },
// ];

// const BranchManagerPendingVerificationsData = [
//   {
//     id: 1,
//     type: "Leave Request",
//     requester: "Alex Johnson",
//     department: "Frontend",
//     date: "2024-01-15",
//     status: "pending",
//     priority: "high",
//   },
//   {
//     id: 2,
//     type: "Expense Claim",
//     requester: "Maria Garcia",
//     department: "Backend",
//     date: "2024-01-14",
//     status: "pending",
//     priority: "low",
//   },
//   {
//     id: 3,
//     type: "Overtime Request",
//     requester: "James Wilson",
//     department: "Frontend",
//     date: "2024-01-14",
//     status: "pending",
//     priority: "medium",
//   },
//   {
//     id: 4,
//     type: "Equipment Request",
//     requester: "Lisa Anderson",
//     department: "Backend",
//     date: "2024-01-13",
//     status: "pending",
//     priority: "low",
//   },
// ];

// const BranchManagerRecentVerificationsData = [
//   {
//     id: 101,
//     type: "Leave Request",
//     requester: "Emily Thomas",
//     department: "Frontend",
//     date: "2024-01-12",
//     status: "approved",
//     processedBy: "BranchManager",
//   },
//   {
//     id: 102,
//     type: "Expense Claim",
//     requester: "David Lee",
//     department: "Backend",
//     date: "2024-01-12",
//     status: "approved",
//     processedBy: "BranchManager",
//   },
//   {
//     id: 103,
//     type: "Overtime Request",
//     requester: "Sarah Martinez",
//     department: "Frontend",
//     date: "2024-01-11",
//     status: "rejected",
//     processedBy: "BranchManager",
//   },
//   {
//     id: 104,
//     type: "Leave Request",
//     requester: "Michael Brown",
//     department: "Backend",
//     date: "2024-01-10",
//     status: "approved",
//     processedBy: "BranchManager",
//   },
// ];

// export default function VerificationsBranchManager() {
//   const user = useAppSelector(selectCurrentUser);
//   const role = useAppSelector(selectUserRole);
//   const [selectedTab, setSelectedTab] = useState<
//     "pending" | "approved" | "rejected"
//   >("pending");

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "high":
//         return "text-red-400 bg-red-500/10";
//       case "medium":
//         return "text-amber-400 bg-amber-500/10";
//       case "low":
//         return "text-blue-400 bg-blue-500/10";
//       default:
//         return "text-muted-foreground bg-muted";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">
//             Verifications Dashboard
//           </h1>
//           <p className="text-muted-foreground">
//             Manage verification requests from your team.
//           </p>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {BranchManagerVerificationStatsData.map((stat, index) => (
//           <Card
//             key={index}
//             className="bg-card border-border hover:border-primary/30 transition-colors"
//           >
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className={cn("p-3 rounded-lg", stat.bgColor)}>
//                   <stat.icon className={cn("w-6 h-6", stat.color)} />
//                 </div>
//                 {stat.change && (
//                   <span className="text-xs font-medium text-green-500">
//                     {stat.change}
//                   </span>
//                 )}
//               </div>
//               <div className="mt-4">
//                 <p className="text-2xl font-bold text-foreground">
//                   {stat.value}
//                 </p>
//                 <p className="text-sm text-muted-foreground">{stat.title}</p>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 border-b border-border">
//         <button
//           onClick={() => setSelectedTab("pending")}
//           className={cn(
//             "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
//             selectedTab === "pending"
//               ? "border-primary text-foreground"
//               : "border-transparent text-muted-foreground hover:text-foreground",
//           )}
//         >
//           Pending ({BranchManagerPendingVerificationsData.length})
//         </button>
//         <button
//           onClick={() => setSelectedTab("approved")}
//           className={cn(
//             "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
//             selectedTab === "approved"
//               ? "border-primary text-foreground"
//               : "border-transparent text-muted-foreground hover:text-foreground",
//           )}
//         >
//           Approved
//         </button>
//         <button
//           onClick={() => setSelectedTab("rejected")}
//           className={cn(
//             "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
//             selectedTab === "rejected"
//               ? "border-primary text-foreground"
//               : "border-transparent text-muted-foreground hover:text-foreground",
//           )}
//         >
//           Rejected
//         </button>
//       </div>

//       {/* Pending Verifications */}
//       {selectedTab === "pending" && (
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold text-foreground">
//               Pending Verifications
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border">
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Type
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Requester
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Department
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Date
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Priority
//                     </th>
//                     <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {BranchManagerPendingVerificationsData.map((row) => (
//                     <tr
//                       key={row.id}
//                       className="border-b border-border hover:bg-muted/50 transition-colors"
//                     >
//                       <td className="py-3 px-4">
//                         <div className="flex items-center gap-2">
//                           <FileText className="w-4 h-4 text-muted-foreground" />
//                           <span className="text-sm text-foreground">
//                             {row.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="flex items-center gap-2">
//                           <User className="w-4 h-4 text-muted-foreground" />
//                           <span className="text-sm text-foreground">
//                             {row.requester}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4 text-sm text-muted-foreground">
//                         {row.department}
//                       </td>
//                       <td className="py-3 px-4 text-sm text-muted-foreground">
//                         {row.date}
//                       </td>
//                       <td className="py-3 px-4">
//                         <span
//                           className={cn(
//                             "px-2 py-1 text-xs font-medium rounded-full",
//                             getPriorityColor(row.priority),
//                           )}
//                         >
//                           {row.priority}
//                         </span>
//                       </td>
//                       <td className="py-3 px-4 text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <button className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors">
//                             <CheckCircle className="w-4 h-4" />
//                           </button>
//                           <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
//                             <XCircle className="w-4 h-4" />
//                           </button>
//                           <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
//                             <ArrowUpRight className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Approved Verifications */}
//       {selectedTab === "approved" && (
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold text-foreground">
//               Approved Verifications
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border">
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Type
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Requester
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Department
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Date
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Processed By
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {BranchManagerRecentVerificationsData.filter(
//                     (r) => r.status === "approved",
//                   ).map((row) => (
//                     <tr
//                       key={row.id}
//                       className="border-b border-border hover:bg-muted/50 transition-colors"
//                     >
//                       <td className="py-3 px-4">
//                         <div className="flex items-center gap-2">
//                           <FileText className="w-4 h-4 text-muted-foreground" />
//                           <span className="text-sm text-foreground">
//                             {row.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="flex items-center gap-2">
//                           <User className="w-4 h-4 text-muted-foreground" />
//                           <span className="text-sm text-foreground">
//                             {row.requester}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4 text-sm text-muted-foreground">
//                         {row.department}
//                       </td>
//                       <td className="py-3 px-4 text-sm text-muted-foreground">
//                         {row.date}
//                       </td>
//                       <td className="py-3 px-4 text-sm text-muted-foreground">
//                         {row.processedBy}
//                       </td>
//                       <td className="py-3 px-4">
//                         <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400">
//                           Approved
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Rejected Verifications */}
//       {selectedTab === "rejected" && (
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold text-foreground">
//               Rejected Verifications
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border">
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Type
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Requester
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Department
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Date
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Processed By
//                     </th>
//                     <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {BranchManagerRecentVerificationsData.filter(
//                     (r) => r.status === "rejected",
//                   ).map((row) => (
//                     <tr
//                       key={row.id}
//                       className="border-b border-border hover:bg-muted/50 transition-colors"
//                     >
//                       <td className="py-3 px-4">
//                         <div className="flex items-center gap-2">
//                           <FileText className="w-4 h-4 text-muted-foreground" />
//                           <span className="text-sm text-foreground">
//                             {row.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="flex items-center gap-2">
//                           <User className="w-4 h-4 text-muted-foreground" />
//                           <span className="text-sm text-foreground">
//                             {row.requester}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4 text-sm text-muted-foreground">
//                         {row.department}
//                       </td>
//                       <td className="py-3 px-4 text-sm text-muted-foreground">
//                         {row.date}
//                       </td>
//                       <td className="py-3 px-4 text-sm text-muted-foreground">
//                         {row.processedBy}
//                       </td>
//                       <td className="py-3 px-4">
//                         <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400">
//                           Rejected
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
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

export default function VerificationsBranchManager() {
  const user = useAppSelector(selectCurrentUser);
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
