"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import {
  selectCurrentUser,
  selectUserRole,
} from "@/redux/features/auth/authSlice";
import { getFilteredSidebarItems, type SidebarItem } from "@/types/rbac";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckSquare,
  ClipboardCheck,
  BarChart3,
  Users,
  MapPin,
  Bell,
  FileText,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  QrCode,
  LogOut,
  Smartphone,
  User,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  CheckSquare,
  ClipboardCheck,
  BarChart3,
  Users,
  MapPin,
  Bell,
  FileText,
  TrendingUp,
  QrCode,
  Smartphone,
  User,
};

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({
  collapsed: controlledCollapsed,
  onToggle: controlledOnToggle,
}: SidebarProps) {
  // Internal state for sidebar collapse (desktop)
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const collapsed = controlledCollapsed ?? internalCollapsed;

  const handleToggle = () => {
    if (controlledOnToggle) {
      controlledOnToggle();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  const pathname = usePathname();
  // const user = useAppSelector(selectCurrentUser);
  const role = useAppSelector(selectUserRole);

  const sidebarItems = role ? getFilteredSidebarItems(role) : [];

  // Desktop Sidebar
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 hidden lg:block",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <SidebarContent
        items={sidebarItems}
        collapsed={collapsed}
        pathname={pathname}
        onToggle={handleToggle}
        iconMap={iconMap}
      />
    </aside>
  );
}

interface SidebarContentProps {
  items: SidebarItem[];
  collapsed: boolean;
  pathname: string;
  onToggle: () => void;
  iconMap: Record<string, React.ComponentType<{ className?: string }>>;
}

function SidebarContent({
  items,
  collapsed,
  pathname,
  onToggle,
  iconMap,
}: SidebarContentProps) {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center h-16 border-b border-sidebar-border px-4",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        {!collapsed && (
          <h1 className="text-lg font-bold text-foreground">
            Salvation<span className="text-primary">Tattoo</span>
          </h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info at Bottom */}
      <div className="border-t border-sidebar-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            // Dispatch logout action or redirect
            window.location.href = "/auth/signin";
          }}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
            collapsed && "justify-center px-2",
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
