// "use client";

// import { useAppSelector } from "@/store";
// import { selectCurrentUser, selectUserRole } from "@/features/auth/authSlice";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import {
//   Users,
//   CheckSquare,
//   MapPin,
//   TrendingUp,
//   Clock,
//   Calendar,
//   ArrowUpRight,
//   ArrowDownRight,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";

// // Mock data for the dashboard
// const statsData = [
//   {
//     title: "Total Employees",
//     value: "156",
//     change: "+12%",
//     trend: "up",
//     icon: Users,
//     color: "text-blue-500",
//     bgColor: "bg-blue-500/10",
//   },
//   {
//     title: "Tasks Completed",
//     value: "1,234",
//     change: "+8%",
//     trend: "up",
//     icon: CheckSquare,
//     color: "text-green-500",
//     bgColor: "bg-green-500/10",
//   },
//   {
//     title: "Active Locations",
//     value: "12",
//     change: "+2",
//     trend: "up",
//     icon: MapPin,
//     color: "text-purple-500",
//     bgColor: "bg-purple-500/10",
//   },
//   {
//     title: "Performance Rate",
//     value: "94.5%",
//     change: "+2.3%",
//     trend: "up",
//     icon: TrendingUp,
//     color: "text-amber-500",
//     bgColor: "bg-amber-500/10",
//   },
// ];

// const attendanceData = [
//   { day: "Mon", present: 145, absent: 11, late: 5 },
//   { day: "Tue", present: 150, absent: 6, late: 3 },
//   { day: "Wed", present: 148, absent: 8, late: 4 },
//   { day: "Thu", present: 152, absent: 4, late: 2 },
//   { day: "Fri", present: 146, absent: 10, late: 6 },
//   { day: "Sat", present: 89, absent: 12, late: 3 },
//   { day: "Sun", present: 45, absent: 20, late: 2 },
// ];

// const weeklyTasksData = [
//   { day: "Mon", completed: 45, pending: 12 },
//   { day: "Tue", completed: 52, pending: 8 },
//   { day: "Wed", completed: 48, pending: 15 },
//   { day: "Thu", completed: 61, pending: 10 },
//   { day: "Fri", completed: 55, pending: 14 },
//   { day: "Sat", completed: 32, pending: 8 },
//   { day: "Sun", completed: 18, pending: 5 },
// ];

// export default function DashboardPage() {
//   const user = useAppSelector(selectCurrentUser);
//   const role = useAppSelector(selectUserRole);

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">
//             Welcome back, {user?.name || "User"}!
//           </h1>
//           <p className="text-muted-foreground">
//             Here's what's happening at Salvation Tattoo Lounge today.
//           </p>
//         </div>
//         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//           <Calendar className="w-4 h-4" />
//           <span>
//             {new Date().toLocaleDateString("en-US", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </span>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {statsData.map((stat, index) => (
//           <Card
//             key={index}
//             className="bg-card border-border hover:border-primary/30 transition-colors"
//           >
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className={cn("p-3 rounded-lg", stat.bgColor)}>
//                   <stat.icon className={cn("w-6 h-6", stat.color)} />
//                 </div>
//                 <div
//                   className={cn(
//                     "flex items-center gap-1 text-xs font-medium",
//                     stat.trend === "up" ? "text-green-500" : "text-red-500",
//                   )}
//                 >
//                   {stat.trend === "up" ? (
//                     <ArrowUpRight className="w-3 h-3" />
//                   ) : (
//                     <ArrowDownRight className="w-3 h-3" />
//                   )}
//                   {stat.change}
//                 </div>
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

//       {/* Charts Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Weekly Task Activity */}
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold text-foreground">
//               Weekly Task Activity
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={weeklyTasksData} barGap={8}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
//                   <XAxis
//                     dataKey="day"
//                     stroke="#A1A1A1"
//                     fontSize={12}
//                     tickLine={false}
//                   />
//                   <YAxis
//                     stroke="#A1A1A1"
//                     fontSize={12}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#161616",
//                       border: "1px solid #2A2A2A",
//                       borderRadius: "8px",
//                     }}
//                     labelStyle={{ color: "#FAFAFA" }}
//                   />
//                   <Bar
//                     dataKey="completed"
//                     name="Completed"
//                     fill="#00AEEF"
//                     radius={[4, 4, 0, 0]}
//                   />
//                   <Bar
//                     dataKey="pending"
//                     name="Pending"
//                     fill="#404040"
//                     radius={[4, 4, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Attendance Overview */}
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold text-foreground">
//               Attendance Overview
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={attendanceData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
//                   <XAxis
//                     dataKey="day"
//                     stroke="#A1A1A1"
//                     fontSize={12}
//                     tickLine={false}
//                   />
//                   <YAxis
//                     stroke="#A1A1A1"
//                     fontSize={12}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#161616",
//                       border: "1px solid #2A2A2A",
//                       borderRadius: "8px",
//                     }}
//                     labelStyle={{ color: "#FAFAFA" }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="present"
//                     name="Present"
//                     stroke="#10B981"
//                     strokeWidth={2}
//                     dot={{ fill: "#10B981", strokeWidth: 0 }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="absent"
//                     name="Absent"
//                     stroke="#EF4444"
//                     strokeWidth={2}
//                     dot={{ fill: "#EF4444", strokeWidth: 0 }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="late"
//                     name="Late"
//                     stroke="#F59E0B"
//                     strokeWidth={2}
//                     dot={{ fill: "#F59E0B", strokeWidth: 0 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Attendance Summary Table */}
//       <Card className="bg-card border-border">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold text-foreground">
//             Attendance Summary
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-border">
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
//                     Day
//                   </th>
//                   <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
//                     Present
//                   </th>
//                   <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
//                     Absent
//                   </th>
//                   <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
//                     Late
//                   </th>
//                   <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
//                     Total
//                   </th>
//                   <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
//                     Attendance %
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {attendanceData.map((day, index) => {
//                   const total = day.present + day.absent + day.late;
//                   const attendanceRate = Math.round(
//                     (day.present / total) * 100,
//                   );

//                   return (
//                     <tr
//                       key={index}
//                       className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
//                     >
//                       <td className="py-3 px-4 text-sm font-medium text-foreground">
//                         {day.day}
//                       </td>
//                       <td className="py-3 px-4 text-center">
//                         <span className="inline-flex items-center gap-1.5 text-sm text-green-500">
//                           <span className="w-2 h-2 rounded-full bg-green-500"></span>
//                           {day.present}
//                         </span>
//                       </td>
//                       <td className="py-3 px-4 text-center">
//                         <span className="inline-flex items-center gap-1.5 text-sm text-red-500">
//                           <span className="w-2 h-2 rounded-full bg-red-500"></span>
//                           {day.absent}
//                         </span>
//                       </td>
//                       <td className="py-3 px-4 text-center">
//                         <span className="inline-flex items-center gap-1.5 text-sm text-amber-500">
//                           <span className="w-2 h-2 rounded-full bg-amber-500"></span>
//                           {day.late}
//                         </span>
//                       </td>
//                       <td className="py-3 px-4 text-center text-sm text-foreground">
//                         {total}
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="flex items-center justify-center gap-2">
//                           <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
//                             <div
//                               className={cn(
//                                 "h-full rounded-full",
//                                 attendanceRate >= 90
//                                   ? "bg-green-500"
//                                   : attendanceRate >= 75
//                                     ? "bg-amber-500"
//                                     : "bg-red-500",
//                               )}
//                               style={{ width: `${attendanceRate}%` }}
//                             />
//                           </div>
//                           <span className="text-sm text-muted-foreground">
//                             {attendanceRate}%
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import {
  selectUserRole,
  // selectCurrentUser,
} from "@/redux/features/auth/authSlice";

import { Loader2 } from "lucide-react";

import { useAppSelector } from "@/redux/store";
import DashboardAdmin from "@/components/dashboard/admin/AdminDashboard";
import DashboardManager from "@/components/dashboard/manager/DashboardManager";
import DashboardBranchManager from "@/components/dashboard/branchManager/DashboardBranchManager";

export default function DashboardPage() {
  const role = useAppSelector(selectUserRole);
  // const user = useAppSelector(selectCurrentUser);

  if (!role) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Dispatcher Logic
  switch (role) {
    case "super_admin":
      return <DashboardAdmin />;
    case "manager":
      return <DashboardManager />;
    case "branch_manager":
      return <DashboardBranchManager />;
    default:
      return <div>Access Denied: Role not recognized.</div>;
  }
}
