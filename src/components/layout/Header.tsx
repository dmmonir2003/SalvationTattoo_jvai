"use client";

import { useAppSelector } from "@/redux/store";
import {
  selectCurrentUser,
  selectUserRole,
} from "@/redux/features/auth/authSlice";
import { cn } from "@/lib/utils";

export function Header() {
  const user = useAppSelector(selectCurrentUser);
  const role = useAppSelector(selectUserRole);

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Breadcrumb / Title */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Salvation Tattoo Lounge</span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <RoleBadge role={role || "branch_manager"} />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function RoleBadge({ role }: { role: string }) {
  const roleConfig: Record<string, { label: string; className: string }> = {
    admin: {
      label: "Admin",
      className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
    manager: {
      label: "Manager",
      className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    branch_manager: {
      label: "Branch Manager",
      className: "bg-green-500/20 text-green-400 border-green-500/30",
    },
  };

  const config = roleConfig[role] || roleConfig.branch_manager;

  return (
    <span
      className={cn(
        "px-2.5 py-1 text-xs font-medium rounded-full border",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}
