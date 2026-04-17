// // "use client";

// // import React, { useState, useMemo } from "react";
// // import {
// //   Search,
// //   Plus,
// //   ChevronDown,
// //   Edit2,
// //   Trash2,
// //   ChevronLeft,
// //   ChevronRight,
// //   X,
// //   AlertCircle,
// // } from "lucide-react";

// // // --- Types ---
// // export type Status =
// //   | "Approved"
// //   | "Overdue"
// //   | "Awaiting Review"
// //   | "Pending"
// //   | "Rejected";

// // export interface Task {
// //   id: string;
// //   title: string;
// //   description: string;
// //   status: Status;
// //   assignedBy: string;
// //   dueDate: string;
// //   completedBy: string;
// //   role: string;
// //   location: string;
// // }

// // // --- Dummy Data ---
// // const ALL_TASKS: Task[] = [
// //   {
// //     id: "1",
// //     title: "Sanitize Workstations",
// //     description: "Wipe down and sanitize all tattoo workstations.",
// //     status: "Approved",
// //     assignedBy: "Super Admin",
// //     dueDate: "Feb 25, 2026",
// //     completedBy: "Alex Kim",
// //     role: "Staff",
// //     location: "Downtown",
// //   },
// //   {
// //     id: "2",
// //     title: "Weekly Equipment Inventory",
// //     description: "Count and log all needle packs and ink bottles.",
// //     status: "Overdue",
// //     assignedBy: "Super Admin",
// //     dueDate: "Feb 28, 2026",
// //     completedBy: "Sarah Chen",
// //     role: "Cleaner",
// //     location: "Midtown",
// //   },
// //   {
// //     id: "3",
// //     title: "Client Consent Form Audit",
// //     description: "Ensure all client consent forms are properly filed.",
// //     status: "Approved",
// //     assignedBy: "Super Admin",
// //     dueDate: "Feb 26, 2026",
// //     completedBy: "Priya Sharma",
// //     role: "Body Piercer",
// //     location: "Downtown",
// //   },
// //   {
// //     id: "4",
// //     title: "Instagram Content Upload",
// //     description: "Post 3 healed tattoo photos with proper captions.",
// //     status: "Awaiting Review",
// //     assignedBy: "Super Admin",
// //     dueDate: "Feb 25, 2026",
// //     completedBy: "Priya Sharma",
// //     role: "Staff",
// //     location: "Wicker Park",
// //   },
// //   {
// //     id: "5",
// //     title: "Autoclave Sterilization Log",
// //     description: "Run and record autoclave sterilization cycles.",
// //     status: "Pending",
// //     assignedBy: "District Manager",
// //     dueDate: "Feb 25, 2026",
// //     completedBy: "Priya Sharma",
// //     role: "Cleaner",
// //     location: "Midtown",
// //   },
// //   {
// //     id: "6",
// //     title: "Monthly Revenue Report",
// //     description: "Compile and submit monthly revenue figures.",
// //     status: "Rejected",
// //     assignedBy: "Super Admin",
// //     dueDate: "Mar 1, 2026",
// //     completedBy: "Priya Sharma",
// //     role: "Body Piercer",
// //     location: "Downtown",
// //   },
// //   {
// //     id: "7",
// //     title: "Health Code Compliance",
// //     description: "Walk through all areas and verify compliance.",
// //     status: "Pending",
// //     assignedBy: "Store Manager",
// //     dueDate: "Mar 5, 2026",
// //     completedBy: "Priya Sharma",
// //     role: "Staff",
// //     location: "Midtown",
// //   },
// //   {
// //     id: "8",
// //     title: "New Product Orientation",
// //     description: "Brief all artists on the new Eternal Ink line.",
// //     status: "Overdue",
// //     assignedBy: "Super Admin",
// //     dueDate: "Mar 3, 2026",
// //     completedBy: "Priya Sharma",
// //     role: "Cleaner",
// //     location: "Wicker Park",
// //   },
// //   // Adding more for pagination demo
// //   ...Array.from({ length: 12 }).map((_, i) => ({
// //     id: `extra-${i}`,
// //     title: `Additional Task ${i + 9}`,
// //     description: "Automated generated task description for pagination.",
// //     status: (["Approved", "Pending", "Overdue"] as Status[])[i % 3],
// //     assignedBy: "System",
// //     dueDate: "Mar 10, 2026",
// //     completedBy: "Staff Member",
// //     role: "General",
// //     location: "Midtown",
// //   })),
// // ];

// // // --- Main Component ---
// // export default function TaskManagementSystem() {
// //   const [tasks, setTasks] = useState<Task[]>(ALL_TASKS);
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// //   const [modalType, setModalType] = useState<"view" | "fire" | null>(null);

// //   const itemsPerPage = 5;

// //   // Logic: Filtering
// //   const filteredTasks = useMemo(() => {
// //     return tasks.filter(
// //       (t) =>
// //         t.title.toLowerCase().includes(search.toLowerCase()) ||
// //         t.location.toLowerCase().includes(search.toLowerCase()),
// //     );
// //   }, [search, tasks]);

// //   // Logic: Pagination
// //   const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
// //   const paginatedTasks = filteredTasks.slice(
// //     (currentPage - 1) * itemsPerPage,
// //     currentPage * itemsPerPage,
// //   );

// //   // Stats Calculation
// //   const stats = {
// //     all: tasks.length,
// //     overdue: tasks.filter((t) => t.status === "Overdue").length,
// //     completed: tasks.filter((t) => t.status === "Approved").length,
// //     rejected: tasks.filter((t) => t.status === "Rejected").length,
// //   };

// //   const handleAction = (task: Task, type: "view" | "fire") => {
// //     setSelectedTask(task);
// //     setModalType(type);
// //   };

// //   const confirmFire = () => {
// //     if (selectedTask) {
// //       setTasks(tasks.filter((t) => t.id !== selectedTask.id));
// //       setModalType(null);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#0a0a0b] text-[#e4e4e7] p-4 md:p-8 font-sans selection:bg-[#c4a47c]/30">
// //       {/* Header & Search */}
// //       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
// //         <div className="relative flex-1 max-w-xl">
// //           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
// //           <input
// //             className="w-full bg-[#121214] border border-[#2a2a2d] rounded-full py-3 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-[#c4a47c]/50 transition-all"
// //             placeholder="Search tasks..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>
// //         <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
// //           <FilterBtn label="Weekly" />
// //           <FilterBtn label="All Locations" />
// //           <FilterBtn label="All Status" />
// //           <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap hover:bg-gray-200 transition-all active:scale-95">
// //             <Plus className="w-4 h-4" /> Create Task
// //           </button>
// //         </div>
// //       </div>

// //       {/* Stats Grid */}
// //       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //         <StatCard
// //           label="All Tasks"
// //           val={stats.all}
// //           color="border-[#c4a47c]/20"
// //         />
// //         <StatCard
// //           label="Overdue"
// //           val={stats.overdue}
// //           color="border-[#f87171]/20"
// //           icon="clock"
// //         />
// //         <StatCard
// //           label="Completed"
// //           val={stats.completed}
// //           color="border-[#4ade80]/20"
// //           icon="check"
// //         />
// //         <StatCard
// //           label="Rejected"
// //           val={stats.rejected}
// //           color="border-[#f87171]/20"
// //           icon="x"
// //         />
// //       </div>

// //       {/* Task Table */}
// //       <div className="bg-[#121214] border border-[#2a2a2d] rounded-2xl overflow-hidden mb-6">
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-left">
// //             <thead className="bg-[#161618] border-b border-[#2a2a2d]">
// //               <tr className="text-[10px] uppercase tracking-[0.1em] text-gray-500 font-bold">
// //                 <th className="px-6 py-4">Task</th>
// //                 <th className="px-6 py-4">Assigned By</th>
// //                 <th className="px-6 py-4">Due Date</th>
// //                 <th className="px-6 py-4">Completed By</th>
// //                 <th className="px-6 py-4">Location</th>
// //                 <th className="px-6 py-4 text-center">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-[#1e1e20]">
// //               {paginatedTasks.map((task) => (
// //                 <tr
// //                   key={task.id}
// //                   className="hover:bg-white/[0.02] transition-colors group"
// //                 >
// //                   <td className="px-6 py-5 min-w-[300px]">
// //                     <div className="flex gap-4">
// //                       <StatusIcon status={task.status} />
// //                       <div>
// //                         <div className="flex items-center gap-2 mb-1">
// //                           <span className="font-semibold text-sm text-white">
// //                             {task.title}
// //                           </span>
// //                           <StatusBadge status={task.status} />
// //                         </div>
// //                         <p className="text-xs text-gray-500 line-clamp-1">
// //                           {task.description}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-5 text-sm">{task.assignedBy}</td>
// //                   <td
// //                     className={`px-6 py-5 text-sm ${task.status === "Overdue" ? "text-red-500 font-medium" : ""}`}
// //                   >
// //                     {task.dueDate}
// //                   </td>
// //                   <td className="px-6 py-5">
// //                     <div className="text-sm font-medium">
// //                       {task.completedBy}
// //                     </div>
// //                     <div className="text-[10px] text-gray-600 uppercase font-bold">
// //                       {task.role}
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-5 text-sm">{task.location}</td>
// //                   <td className="px-6 py-5">
// //                     <div className="flex justify-center gap-2">
// //                       {task.status === "Pending" ? (
// //                         <>
// //                           <button className="p-2 border border-[#2a2a2d] rounded-lg hover:bg-white/5">
// //                             <Edit2 className="w-3.5 h-3.5" />
// //                           </button>
// //                           <button className="p-2 border border-red-900/30 rounded-lg hover:bg-red-500/10 text-red-500">
// //                             <Trash2 className="w-3.5 h-3.5" />
// //                           </button>
// //                         </>
// //                       ) : (
// //                         <button
// //                           onClick={() =>
// //                             handleAction(
// //                               task,
// //                               task.status === "Overdue" ? "fire" : "view",
// //                             )
// //                           }
// //                           className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${
// //                             task.status === "Overdue"
// //                               ? "border-red-900/50 text-red-500 hover:bg-red-500/10"
// //                               : "border-[#c4a47c]/40 text-[#c4a47c] hover:bg-[#c4a47c]/10"
// //                           }`}
// //                         >
// //                           {task.status === "Overdue" ? "Fire" : "View"}
// //                         </button>
// //                       )}
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Pagination */}
// //       <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
// //         <p>
// //           Showing {Math.min(filteredTasks.length, itemsPerPage)} of{" "}
// //           {filteredTasks.length} results
// //         </p>
// //         <div className="flex items-center gap-2">
// //           <button
// //             disabled={currentPage === 1}
// //             onClick={() => setCurrentPage((p) => p - 1)}
// //             className="p-2 border border-[#2a2a2d] rounded-lg disabled:opacity-30 hover:bg-white/5"
// //           >
// //             <ChevronLeft className="w-4 h-4" />
// //           </button>
// //           {[...Array(totalPages)].map((_, i) => (
// //             <button
// //               key={i}
// //               onClick={() => setCurrentPage(i + 1)}
// //               className={`w-9 h-9 rounded-lg border transition-all ${currentPage === i + 1 ? "border-[#c4a47c] text-[#c4a47c] bg-[#c4a47c]/10" : "border-[#2a2a2d] hover:bg-white/5"}`}
// //             >
// //               {i + 1}
// //             </button>
// //           ))}
// //           <button
// //             disabled={currentPage === totalPages}
// //             onClick={() => setCurrentPage((p) => p + 1)}
// //             className="p-2 border border-[#2a2a2d] rounded-lg disabled:opacity-30 hover:bg-white/5"
// //           >
// //             <ChevronRight className="w-4 h-4" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* --- Modals --- */}
// //       {modalType && selectedTask && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
// //           <div className="bg-[#121214] border border-[#2a2a2d] w-full max-w-md rounded-2xl p-6 shadow-2xl">
// //             <div className="flex justify-between items-start mb-6">
// //               <h2 className="text-xl font-bold text-white">
// //                 {modalType === "view" ? "Task Details" : "Confirm Action"}
// //               </h2>
// //               <button
// //                 onClick={() => setModalType(null)}
// //                 className="p-1 hover:bg-white/10 rounded-full"
// //               >
// //                 <X className="w-5 h-5 text-gray-500" />
// //               </button>
// //             </div>

// //             {modalType === "view" ? (
// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="text-[10px] uppercase font-bold text-gray-500">
// //                     Task Title
// //                   </label>
// //                   <p className="text-white font-medium">{selectedTask.title}</p>
// //                 </div>
// //                 <div>
// //                   <label className="text-[10px] uppercase font-bold text-gray-500">
// //                     Description
// //                   </label>
// //                   <p className="text-gray-400 text-sm leading-relaxed">
// //                     {selectedTask.description}
// //                   </p>
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="text-[10px] uppercase font-bold text-gray-500">
// //                       Location
// //                     </label>
// //                     <p className="text-white text-sm">
// //                       {selectedTask.location}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="text-[10px] uppercase font-bold text-gray-500">
// //                       Due Date
// //                     </label>
// //                     <p className="text-white text-sm">{selectedTask.dueDate}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="text-center">
// //                 <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <AlertCircle className="w-8 h-8 text-red-500" />
// //                 </div>
// //                 <h3 className="text-lg font-bold text-white mb-2">
// //                   Remove this task?
// //                 </h3>
// //                 <p className="text-gray-400 text-sm mb-6">
// //                   Are you sure you want to &quot;fire&quot; this overdue task?
// //                   This action cannot be undone.
// //                 </p>
// //                 <div className="flex gap-3">
// //                   <button
// //                     onClick={() => setModalType(null)}
// //                     className="flex-1 px-4 py-2 border border-[#2a2a2d] rounded-xl font-bold hover:bg-white/5"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     onClick={confirmFire}
// //                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700"
// //                   >
// //                     Yes, Remove
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // --- Internal UI Components ---

// // function StatCard({
// //   label,
// //   val,
// //   color,
// // }: {
// //   label: string;
// //   val: number;
// //   color: string;
// //   icon?: string;
// // }) {
// //   return (
// //     <div
// //       className={`bg-[#121214] border ${color} p-5 rounded-2xl relative group hover:bg-[#161618] transition-all`}
// //     >
// //       <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">
// //         {label}
// //       </p>
// //       <h3 className="text-3xl font-bold text-white">{val}</h3>
// //       <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
// //         <div className="w-8 h-8 rounded-full border-2 border-current" />
// //       </div>
// //     </div>
// //   );
// // }

// // function StatusIcon({ status }: { status: Status }) {
// //   const styles = {
// //     Approved: "border-green-500/30 bg-green-500/10 text-green-500",
// //     Overdue: "border-red-500/30 bg-red-500/10 text-red-500",
// //     "Awaiting Review": "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
// //     Pending: "border-blue-500/30 bg-blue-500/10 text-blue-500",
// //     Rejected: "border-red-500/30 bg-red-500/10 text-red-500",
// //   };
// //   return (
// //     <div className={`mt-1 p-2 rounded-xl border shrink-0 ${styles[status]}`}>
// //       <div className="w-3.5 h-3.5 border-2 border-current rounded-sm" />
// //     </div>
// //   );
// // }

// // function StatusBadge({ status }: { status: Status }) {
// //   const styles = {
// //     Approved: "border-green-500/30 text-green-500 bg-green-500/5",
// //     Overdue: "border-red-500/30 text-red-500 bg-red-500/5",
// //     "Awaiting Review": "border-yellow-500/30 text-yellow-500 bg-yellow-500/5",
// //     Pending: "border-blue-500/30 text-blue-500 bg-blue-500/5",
// //     Rejected: "border-red-500/30 text-red-500 bg-red-500/5",
// //   };
// //   return (
// //     <span
// //       className={`text-[9px] px-2 py-0.5 rounded border font-bold uppercase tracking-wider ${styles[status]}`}
// //     >
// //       {status}
// //     </span>
// //   );
// // }

// // function FilterBtn({ label }: { label: string }) {
// //   return (
// //     <button className="flex items-center gap-4 px-4 py-2 bg-[#121214] border border-[#2a2a2d] rounded-xl text-xs font-medium hover:border-[#c4a47c]/50 transition-colors group">
// //       {label}{" "}
// //       <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-[#c4a47c]" />
// //     </button>
// //   );
// // }

// "use client";

// import React, { useState, useMemo, useRef, useEffect } from "react";
// import {
//   Search,
//   Plus,
//   ChevronDown,
//   Edit2,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   AlertCircle,
//   Check,
// } from "lucide-react";

// // --- Types ---
// export type Status =
//   | "Approved"
//   | "Overdue"
//   | "Awaiting Review"
//   | "Pending"
//   | "Rejected";

// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: Status;
//   assignedBy: string;
//   dueDate: string;
//   completedBy: string;
//   role: string;
//   location: string;
//   frequency?: string; // For filtering (Today, Weekly, etc)
// }

// // --- Dummy Data ---
// const ALL_TASKS: Task[] = [
//   {
//     id: "1",
//     title: "Sanitize Workstations",
//     description: "Wipe down and sanitize all tattoo workstations.",
//     status: "Approved",
//     assignedBy: "Super Admin",
//     dueDate: "Feb 25, 2026",
//     completedBy: "Alex Kim",
//     role: "Staff",
//     location: "Downtown",
//     frequency: "Today",
//   },
//   {
//     id: "2",
//     title: "Weekly Equipment Inventory",
//     description: "Count and log all needle packs and ink bottles.",
//     status: "Overdue",
//     assignedBy: "Super Admin",
//     dueDate: "Feb 28, 2026",
//     completedBy: "Sarah Chen",
//     role: "Cleaner",
//     location: "Midtown",
//     frequency: "Weekly",
//   },
//   {
//     id: "3",
//     title: "Client Consent Form Audit",
//     description: "Ensure all client consent forms are properly filed.",
//     status: "Approved",
//     assignedBy: "Super Admin",
//     dueDate: "Feb 26, 2026",
//     completedBy: "Priya Sharma",
//     role: "Body Piercer",
//     location: "Downtown",
//     frequency: "Monthly",
//   },
//   {
//     id: "4",
//     title: "Instagram Content Upload",
//     description: "Post 3 healed tattoo photos with proper captions.",
//     status: "Awaiting Review",
//     assignedBy: "Super Admin",
//     dueDate: "Feb 25, 2026",
//     completedBy: "Priya Sharma",
//     role: "Staff",
//     location: "Wicker Park",
//     frequency: "Today",
//   },
//   {
//     id: "5",
//     title: "Autoclave Sterilization Log",
//     description: "Run and record autoclave sterilization cycles.",
//     status: "Pending",
//     assignedBy: "District Manager",
//     dueDate: "Feb 25, 2026",
//     completedBy: "Priya Sharma",
//     role: "Cleaner",
//     location: "Midtown",
//     frequency: "Weekly",
//   },
//   {
//     id: "6",
//     title: "Monthly Revenue Report",
//     description: "Compile and submit monthly revenue figures.",
//     status: "Rejected",
//     assignedBy: "Super Admin",
//     dueDate: "Mar 1, 2026",
//     completedBy: "Priya Sharma",
//     role: "Body Piercer",
//     location: "Downtown",
//     frequency: "Monthly",
//   },
//   {
//     id: "7",
//     title: "Health Code Compliance",
//     description: "Walk through all areas and verify compliance.",
//     status: "Pending",
//     assignedBy: "Store Manager",
//     dueDate: "Mar 5, 2026",
//     completedBy: "Priya Sharma",
//     role: "Staff",
//     location: "Midtown",
//     frequency: "Yearly",
//   },
//   {
//     id: "8",
//     title: "New Product Orientation",
//     description: "Brief all artists on the new Eternal Ink line.",
//     status: "Rejected",
//     assignedBy: "Super Admin",
//     dueDate: "Mar 3, 2026",
//     completedBy: "Priya Sharma",
//     role: "Cleaner",
//     location: "Wicker Park",
//     frequency: "Weekly",
//   },
//   ...Array.from({ length: 8 }).map((_, i) => ({
//     id: `extra-${i}`,
//     title: `Additional Task ${i + 9}`,
//     description: "Automated generated task description for pagination.",
//     status: (["Approved", "Pending", "Overdue"] as Status[])[i % 3],
//     assignedBy: "System",
//     dueDate: "Mar 10, 2026",
//     completedBy: "Staff Member",
//     role: "General",
//     location: i % 2 === 0 ? "Downtown" : "Midtown",
//     frequency: "Weekly",
//   })),
// ];

// // --- Main Component ---
// export default function TaskManagementSystem() {
//   const [tasks, setTasks] = useState<Task[]>(ALL_TASKS);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [modalType, setModalType] = useState<"view" | "fire" | null>(null);

//   // Filter States
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [locationFilter, setLocationFilter] = useState("All Locations");
//   const [frequencyFilter, setFrequencyFilter] = useState("Weekly");

//   const itemsPerPage = 5;

//   // Logic: Combined Filtering
//   const filteredTasks = useMemo(() => {
//     return tasks.filter((t) => {
//       const matchesSearch =
//         t.title.toLowerCase().includes(search.toLowerCase()) ||
//         t.location.toLowerCase().includes(search.toLowerCase());
//       const matchesStatus =
//         statusFilter === "All Status" || t.status === statusFilter;
//       const matchesLocation =
//         locationFilter === "All Locations" || t.location === locationFilter;
//       const matchesFrequency =
//         frequencyFilter === "All" || t.frequency === frequencyFilter;

//       return (
//         matchesSearch && matchesStatus && matchesLocation && matchesFrequency
//       );
//     });
//   }, [search, tasks, statusFilter, locationFilter, frequencyFilter]);

//   // Logic: Pagination
//   const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
//   const paginatedTasks = filteredTasks.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, statusFilter, locationFilter, frequencyFilter]);

//   const confirmFire = () => {
//     if (selectedTask) {
//       setTasks(tasks.filter((t) => t.id !== selectedTask.id));
//       setModalType(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0b] text-[#e4e4e7] p-4 md:p-8 font-sans selection:bg-[#c4a47c]/30">
//       {/* Header & Search */}
//       <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
//         <div className="relative flex-1 max-w-xl">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//           <input
//             className="w-full bg-[#121214] border border-[#2a2a2d] rounded-full py-3 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-[#c4a47c]/50 transition-all text-sm"
//             placeholder="Search tasks..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="flex flex-wrap items-center gap-2">
//           <FilterDropdown
//             value={frequencyFilter}
//             onChange={setFrequencyFilter}
//             options={["Today", "Weekly", "Monthly", "Yearly"]}
//           />
//           <FilterDropdown
//             value={locationFilter}
//             onChange={setLocationFilter}
//             options={["All Locations", "Downtown", "Wicker Park", "Midtown"]}
//           />
//           <FilterDropdown
//             value={statusFilter}
//             onChange={setStatusFilter}
//             options={[
//               "All Status",
//               "Approved",
//               "Awaiting Review",
//               "Rejected",
//               "Overdue",
//               "Pending",
//             ]}
//           />
//           <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5">
//             <Plus className="w-4 h-4" /> Create Task
//           </button>
//         </div>
//       </div>

//       {/* Task Table & Pagination (Rest remains the same as previous logic but using filteredTasks) */}
//       <div className="bg-[#121214] border border-[#2a2a2d] rounded-2xl overflow-hidden mb-6">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-[#161618] border-b border-[#2a2a2d]">
//               <tr className="text-[10px] uppercase tracking-[0.1em] text-gray-500 font-bold">
//                 <th className="px-6 py-4">Task</th>
//                 <th className="px-6 py-4">Assigned By</th>
//                 <th className="px-6 py-4">Due Date</th>
//                 <th className="px-6 py-4">Completed By</th>
//                 <th className="px-6 py-4">Location</th>
//                 <th className="px-6 py-4 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-[#1e1e20]">
//               {paginatedTasks.length > 0 ? (
//                 paginatedTasks.map((task) => (
//                   <tr
//                     key={task.id}
//                     className="hover:bg-white/[0.02] transition-colors group"
//                   >
//                     <td className="px-6 py-5 min-w-[300px]">
//                       <div className="flex gap-4">
//                         <StatusIcon status={task.status} />
//                         <div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="font-semibold text-sm text-white">
//                               {task.title}
//                             </span>
//                             <StatusBadge status={task.status} />
//                           </div>
//                           <p className="text-xs text-gray-500 line-clamp-1">
//                             {task.description}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-5 text-sm">{task.assignedBy}</td>
//                     <td
//                       className={`px-6 py-5 text-sm ${task.status === "Overdue" ? "text-red-500 font-medium" : ""}`}
//                     >
//                       {task.dueDate}
//                     </td>
//                     <td className="px-6 py-5">
//                       <div className="text-sm font-medium">
//                         {task.completedBy}
//                       </div>
//                       <div className="text-[10px] text-gray-600 uppercase font-bold">
//                         {task.role}
//                       </div>
//                     </td>
//                     <td className="px-6 py-5 text-sm">{task.location}</td>
//                     <td className="px-6 py-5 text-center">
//                       <button
//                         onClick={() => setSelectedTask(task)}
//                         className="px-4 py-1.5 rounded-lg text-xs font-bold border border-[#c4a47c]/40 text-[#c4a47c] hover:bg-[#c4a47c]/10"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="px-6 py-20 text-center text-gray-500 italic"
//                   >
//                     No tasks found matching these filters.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
//         <p>
//           Showing {paginatedTasks.length} of {filteredTasks.length} results
//         </p>
//         <div className="flex items-center gap-2">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//             className="p-2 border border-[#2a2a2d] rounded-lg disabled:opacity-20"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`w-8 h-8 rounded-lg border ${currentPage === i + 1 ? "border-[#c4a47c] text-[#c4a47c]" : "border-[#2a2a2d]"}`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//             className="p-2 border border-[#2a2a2d] rounded-lg disabled:opacity-20"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Internal UI Components ---

// function FilterDropdown({
//   value,
//   onChange,
//   options,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   options: string[];
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       )
//         setIsOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center justify-between min-w-[140px] gap-4 px-4 py-2.5 bg-[#121214] border border-[#2a2a2d] rounded-xl text-xs font-medium hover:border-[#c4a47c]/50 transition-all group"
//       >
//         <span className={isOpen ? "text-[#c4a47c]" : "text-gray-300"}>
//           {value}
//         </span>
//         <ChevronDown
//           className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isOpen ? "rotate-180 text-[#c4a47c]" : ""}`}
//         />
//       </button>

//       {isOpen && (
//         <div className="absolute top-full left-0 mt-2 w-full min-w-[160px] bg-[#121214] border border-[#c4a47c]/30 rounded-xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2">
//           {options.map((option) => (
//             <button
//               key={option}
//               onClick={() => {
//                 onChange(option);
//                 setIsOpen(false);
//               }}
//               className={`w-full flex items-center justify-between px-4 py-3 text-left text-xs transition-colors hover:bg-[#c4a47c]/10 ${
//                 value === option
//                   ? "bg-[#c4a47c]/20 text-[#c4a47c] font-bold"
//                   : "text-gray-400"
//               }`}
//             >
//               {option}
//               {value === option && <Check className="w-3 h-3" />}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Status Helpers
// function StatusIcon({ status }: { status: Status }) {
//   const styles = {
//     Approved: "border-green-500/30 bg-green-500/10 text-green-500",
//     Overdue: "border-red-500/30 bg-red-500/10 text-red-500",
//     "Awaiting Review": "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
//     Pending: "border-blue-500/30 bg-blue-500/10 text-blue-500",
//     Rejected: "border-red-500/30 bg-red-500/10 text-red-500",
//   };
//   return (
//     <div className={`mt-1 p-2 rounded-xl border shrink-0 ${styles[status]}`}>
//       <div className="w-3.5 h-3.5 border-2 border-current rounded-sm" />
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: Status }) {
//   const styles = {
//     Approved: "border-green-500/30 text-green-500 bg-green-500/5",
//     Overdue: "border-red-500/30 text-red-500 bg-red-500/5",
//     "Awaiting Review": "border-yellow-500/30 text-yellow-500 bg-yellow-500/5",
//     Pending: "border-blue-500/30 text-blue-500 bg-blue-500/5",
//     Rejected: "border-red-500/30 text-red-500 bg-red-500/5",
//   };
//   return (
//     <span
//       className={`text-[9px] px-2 py-0.5 rounded border font-bold uppercase tracking-wider ${styles[status]}`}
//     >
//       {status}
//     </span>
//   );
// }

"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

// --- Import your Modal Components here ---
import { TaskActionModal } from "./TaskActionModal";
import TaskDetailsModal from "./TaskDetailsModal";
import FireUserModal from "./FireUserModal";

// --- Types ---
export type Status =
  | "Approved"
  | "Overdue"
  | "Awaiting Review"
  | "Pending"
  | "Rejected";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  assignedBy: string;
  dueDate: string;
  completedBy: string;
  role: string;
  location: string;
  frequency: string;
  email: string;
}

// --- Complete Dummy Data ---
const ALL_TASKS: Task[] = [
  {
    id: "1",
    title: "Sanitize Workstations",
    description: "Wipe down and sanitize all workstations.",
    status: "Approved",
    assignedBy: "Super Admin",
    dueDate: "Feb 25, 2026",
    completedBy: "Alex Kim",
    role: "Staff",
    location: "Downtown",
    frequency: "Today",
    email: "alex@studio.com",
  },
  {
    id: "2",
    title: "Weekly Equipment Inventory",
    description: "Count and log all needle packs.",
    status: "Overdue",
    assignedBy: "Super Admin",
    dueDate: "Feb 28, 2026",
    completedBy: "Sarah Chen",
    role: "Cleaner",
    location: "Midtown",
    frequency: "Weekly",
    email: "sarah@studio.com",
  },
  {
    id: "3",
    title: "Instagram Content Upload",
    description: "Post 3 healed tattoo photos.",
    status: "Awaiting Review",
    assignedBy: "Super Admin",
    dueDate: "Feb 25, 2026",
    completedBy: "Priya Sharma",
    role: "Staff",
    location: "Wicker Park",
    frequency: "Today",
    email: "priya@studio.com",
  },
  {
    id: "4",
    title: "Autoclave Sterilization Log",
    description: "Run and record autoclave cycles.",
    status: "Pending",
    assignedBy: "District Manager",
    dueDate: "Feb 25, 2026",
    completedBy: "Priya Sharma",
    role: "Cleaner",
    location: "Midtown",
    frequency: "Weekly",
    email: "priya@studio.com",
  },
  {
    id: "5",
    title: "Monthly Revenue Report",
    description: "Submit monthly revenue figures.",
    status: "Rejected",
    assignedBy: "Super Admin",
    dueDate: "Mar 1, 2026",
    completedBy: "Priya Sharma",
    role: "Body Piercer",
    location: "Downtown",
    frequency: "Monthly",
    email: "priya@studio.com",
  },
  // Generating more data so you can see pagination with 10 items per page
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `extra-${i}`,
    title: `Additional Task ${i + 6}`,
    description: "Automated generated task description for pagination testing.",
    status: (
      [
        "Approved",
        "Pending",
        "Overdue",
        "Rejected",
        "Awaiting Review",
      ] as Status[]
    )[i % 5],
    assignedBy: "Store Manager",
    dueDate: "Mar 10, 2026",
    completedBy: "Staff Member",
    role: "General",
    location: i % 2 === 0 ? "Downtown" : "Midtown",
    frequency: "Weekly",
    email: "staff@studio.com",
  })),
];

export default function TaskManagementSystem() {
  const [tasks, setTasks] = useState<Task[]>(ALL_TASKS);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // UPDATED: Set to 10 items per page
  const itemsPerPage = 10;

  // Filter States
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [frequencyFilter, setFrequencyFilter] = useState("Weekly");

  // Modal Control States
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFireOpen, setIsFireOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Helper: Map data to Modal format
  const mapTaskToModal = (task: Task | null) => {
    if (!task) return null;
    return {
      taskName: task.title,
      description: task.description,
      location: task.location,
      assignedTo: task.completedBy,
      dueDate: task.dueDate,
      employeeName: task.completedBy,
      employeeInitials: task.completedBy
        .split(" ")
        .map((n) => n[0])
        .join(""),
      role: task.role,
      status: task.status,
      imageUrl: null,
      email: task.email,
    };
  };

  // Logic: Filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.location.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" || t.status === statusFilter;
      const matchesLocation =
        locationFilter === "All Locations" || t.location === locationFilter;
      const matchesFrequency =
        frequencyFilter === "All" || t.frequency === frequencyFilter;
      return (
        matchesSearch && matchesStatus && matchesLocation && matchesFrequency
      );
    });
  }, [search, tasks, statusFilter, locationFilter, frequencyFilter]);

  // Logic: Pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, locationFilter, frequencyFilter]);

  // Handle Logic
  const handleActionClick = (task: Task) => {
    setSelectedTask(task);
    if (task.status === "Overdue") setIsFireOpen(true);
    else if (["Approved", "Awaiting Review", "Rejected"].includes(task.status))
      setIsDetailsOpen(true);
    else setIsActionOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this pending task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  const stats = {
    all: tasks.length,
    overdue: tasks.filter((t) => t.status === "Overdue").length,
    completed: tasks.filter((t) => t.status === "Approved").length,
    rejected: tasks.filter((t) => t.status === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e4e4e7] p-4 md:p-8 font-sans selection:bg-[#c4a47c]/30">
      {/* Header & Search */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 ">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            className="w-full bg-[#121214] border border-[#2a2a2d] rounded-full py-3 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-[#c4a47c]/50 transition-all text-sm"
            placeholder="Search by employee ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown
            value={frequencyFilter}
            onChange={setFrequencyFilter}
            options={["Today", "Weekly", "Monthly", "Yearly"]}
          />
          <FilterDropdown
            value={locationFilter}
            onChange={setLocationFilter}
            options={["All Locations", "Downtown", "Wicker Park", "Midtown"]}
          />
          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              "All Status",
              "Approved",
              "Awaiting Review",
              "Rejected",
              "Overdue",
              "Pending",
            ]}
          />

          <button
            onClick={() => {
              setSelectedTask(null);
              setIsActionOpen(true);
            }}
            className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5"
          >
            <Plus className="w-4 h-4" /> Create Task
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="All Tasks"
          val={stats.all}
          color="border-[#c4a47c]/20"
        />
        <StatCard
          label="Overdue"
          val={stats.overdue}
          color="border-[#f87171]/20"
        />
        <StatCard
          label="Completed"
          val={stats.completed}
          color="border-[#4ade80]/20"
        />
        <StatCard
          label="Rejected"
          val={stats.rejected}
          color="border-[#f87171]/20"
        />
      </div>

      {/* Task Table */}
      <div className="bg-[#121214] border border-[#2a2a2d] rounded-2xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#161618] border-b border-[#2a2a2d]">
              <tr className="text-[10px] uppercase tracking-[0.1em] text-gray-500 font-bold">
                <th className="px-6 py-4">Task</th>
                <th className="px-6 py-4">Assigned By</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Completed By</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e20]">
              {paginatedTasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-5 min-w-[300px]">
                    <div className="flex gap-4">
                      <StatusIcon status={task.status} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-white">
                            {task.title}
                          </span>
                          <StatusBadge status={task.status} />
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm">{task.assignedBy}</td>
                  <td
                    className={`px-6 py-5 text-sm ${task.status === "Overdue" ? "text-red-500 font-medium" : ""}`}
                  >
                    {task.dueDate}
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium">
                      {task.completedBy}
                    </div>
                    <div className="text-[10px] text-gray-600 uppercase font-bold">
                      {task.role}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm">{task.location}</td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center items-center gap-2">
                      {task.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleActionClick(task)}
                            className="p-2 border border-[#2a2a2d] rounded-lg text-gray-400 hover:text-[#c4a47c] hover:border-[#c4a47c]/40 transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-2 border border-[#2a2a2d] rounded-lg text-gray-400 hover:text-red-500 hover:border-red-500/40 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleActionClick(task)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            task.status === "Overdue"
                              ? "border-red-900/50 text-red-500 hover:bg-red-500/10"
                              : "border-[#c4a47c]/40 text-[#c4a47c] hover:bg-[#c4a47c]/10"
                          }`}
                        >
                          {task.status === "Overdue" ? "Fire" : "View"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>
          Showing {paginatedTasks.length} of {filteredTasks.length} results
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 border border-[#2a2a2d] rounded-lg disabled:opacity-20 transition-colors hover:bg-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-lg border transition-all ${currentPage === i + 1 ? "border-[#c4a47c] text-[#c4a47c] bg-[#c4a47c]/10" : "border-[#2a2a2d] hover:bg-white/5"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 border border-[#2a2a2d] rounded-lg disabled:opacity-20 transition-colors hover:bg-white/5"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <TaskActionModal
        isOpen={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        initialData={mapTaskToModal(selectedTask)}
        onSave={(data) => setIsActionOpen(false)}
      />
      <TaskDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        data={mapTaskToModal(selectedTask)}
      />
      <FireUserModal
        isOpen={isFireOpen}
        onClose={() => setIsFireOpen(false)}
        onConfirm={() => setIsFireOpen(false)}
        userData={
          selectedTask
            ? { name: selectedTask.completedBy, email: selectedTask.email }
            : null
        }
      />
    </div>
  );
}

// Design Components
function StatCard({
  label,
  val,
  color,
}: {
  label: string;
  val: number;
  color: string;
}) {
  return (
    <div
      className={`bg-[#121214] border ${color} p-5 rounded-2xl relative group hover:bg-[#161618] transition-all`}
    >
      <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">
        {label}
      </p>
      <h3 className="text-3xl font-bold text-white">{val}</h3>
      <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <div className="w-8 h-8 rounded-full border-2 border-current" />
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: Status }) {
  const styles = {
    Approved: "border-green-500/30 bg-green-500/10 text-green-500",
    Overdue: "border-red-500/30 bg-red-500/10 text-red-500",
    "Awaiting Review": "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
    Pending: "border-blue-500/30 bg-blue-500/10 text-blue-500",
    Rejected: "border-red-500/30 bg-red-500/10 text-red-500",
  };
  return (
    <div className={`mt-1 p-2 rounded-xl border shrink-0 ${styles[status]}`}>
      <div className="w-3.5 h-3.5 border-2 border-current rounded-sm" />
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    Approved: "border-green-500/30 bg-green-500/10 text-green-500",
    Overdue: "border-red-500/30 bg-red-500/10 text-red-500",
    "Awaiting Review": "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
    Pending: "border-blue-500/30 bg-blue-500/10 text-blue-500",
    Rejected: "border-red-500/30 bg-red-500/10 text-red-500",
  };
  return (
    <span
      className={`text-[9px] px-2 py-0.5 rounded border font-bold uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function FilterDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between min-w-[140px] gap-4 px-4 py-2.5 bg-[#121214] border border-[#2a2a2d] rounded-xl text-xs font-medium hover:border-[#c4a47c]/50 transition-all group"
      >
        <span className={isOpen ? "text-[#c4a47c]" : "text-gray-300"}>
          {value}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isOpen ? "rotate-180 text-[#c4a47c]" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[160px] bg-[#121214] border border-[#c4a47c]/30 rounded-xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-left text-xs transition-colors hover:bg-[#c4a47c]/10 ${value === option ? "bg-[#c4a47c]/20 text-[#c4a47c] font-bold" : "text-gray-400"}`}
            >
              {option}
              {value === option && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
