import { ClipboardList, MapPin, UserCheck, Users } from "lucide-react";
import AdminStatCard from "./AdminStatCard";
import { AttendanceChart } from "./AttendanceChart";
import { TaskStatus } from "./TaskStatus";
import { ActivityFeed } from "./ActivityFeed";

export default function AdminDashboard() {
  const attendanceData = [
    { date: "Feb 19", present: 35, absent: 2, late: 1 },
    { date: "Feb 20", present: 38, absent: 1, late: 0 },
    { date: "Feb 21", present: 34, absent: 4, late: 2 },
    { date: "Feb 22", present: 36, absent: 2, late: 1 },
    { date: "Feb 23", present: 39, absent: 1, late: 0 },
    { date: "Feb 24", present: 40, absent: 0, late: 1 },
    { date: "Feb 25", present: 37, absent: 2, late: 2 },
  ];

  const locationTaskData = [
    { name: "Downtown", approved: 80, pending: 100, rejected: 40 },
    { name: "Midtown", approved: 60, pending: 90, rejected: 60 },
    { name: "Wicker Park", approved: 50, pending: 70, rejected: 80 },
    { name: "Logan Sq.", approved: 0, pending: 0, rejected: 0 }, // New location/Empty state
  ];

  const activities = [
    {
      type: "completed",
      user: "Alex Kim",
      action: "completed",
      target: "Sanitize Workstations",
      time: "12 min ago",
    },
    {
      type: "assigned",
      user: "Task",
      action: "Flash Design Update",
      target: "assigned to Ravi Patel",
      time: "1 hr ago",
    },
    {
      type: "due",
      user: "Client Consent Form Audit",
      action: "is",
      target: "due tomorrow",
      time: "2 hrs ago",
    },
    {
      type: "new",
      user: "New employee",
      action: "Tia Jackson",
      target: "added to Midtown",
      time: "3 hrs ago",
    },
    {
      type: "overdue",
      user: "Instagram Content Upload",
      action: "is",
      target: "overdue",
      time: "5 hrs ago",
    },
  ];

  const adminStats = [
    {
      title: "Total Employees",
      value: "12",
      icon: Users,
      iconColor: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
    },
    {
      title: "Total Locations",
      value: "4",
      icon: MapPin,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Pending Tasks",
      value: "6",
      icon: ClipboardList,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Today's Attendance",
      value: "81%",
      icon: UserCheck,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="space-y-6 p-8 bg-black min-h-screen">
      {/* 1. Metric Cards Grid (Same as Branch Manager but for All Locations) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => (
          <AdminStatCard key={index} {...stat} />
        ))}
      </div>

      {/* 2. Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceChart data={attendanceData} />
        </div>
        <div className="lg:col-span-1">
          <TaskStatus data={locationTaskData} />
        </div>
      </div>

      {/* 3. Feed Row */}
      <ActivityFeed activities={activities} />
    </div>
  );
}
