"use client";

import { selectUserRole } from "@/redux/features/auth/authSlice";

import { Loader2 } from "lucide-react";
import PerformanceAdmin from "@/components/performance/admin/PerformanceAdmin";
import PerformanceManager from "@/components/performance/manager/ManagerView";

import { useAppSelector } from "@/redux/store";

export default function PerformancePage() {
  const role = useAppSelector(selectUserRole);

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
      return <PerformanceAdmin />;
    case "manager":
      return <PerformanceManager />;
    // case "branch_manager":
    //   return <PerformanceBranchManager />;
    default:
      return <div>Access Denied: Role not recognized.</div>;
  }
}
