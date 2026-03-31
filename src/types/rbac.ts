import { UserRole, Permission, RolePermissions } from "./index";

// RBAC Configuration - Role-based permissions for Salvation Tattoo Lounge
export const ROLE_PERMISSIONS: RolePermissions[] = [
  {
    role: "super_admin",
    permissions: [
      // Dashboard
      "dashboard:view",
      // Tasks
      "tasks:view",
      "tasks:create",
      "tasks:edit",
      "tasks:delete",
      // Verifications
      // "verifications:view",
      // "verifications:approve",
      // "verifications:reject",
      // Reports
      "reports:view",
      "reports:export",
      // Users
      "users:view",
      "users:create",
      "users:edit",
      "users:delete",
      // Locations
      "locations:view",
      "locations:create",
      "locations:edit",
      "locations:delete",
      // Notifications
      "notifications:view",
      "notifications:manage",
      // Instructions
      "instructions:view",
      "instructions:manage",
      // Performance
      "performance:view",

      "app-content",
      // Settings
      "settings:manage",
      "profile",
    ],
  },
  {
    role: "district_manager",
    permissions: [
      // Dashboard
      "dashboard:view",
      // Tasks
      "tasks:view",
      "tasks:create",
      "tasks:edit",
      // Verifications
      "verifications:view",
      "verifications:approve",
      "verifications:reject",
      // Reports
      "reports:view",
      "reports:export",
      // Performance
      "performance:view",
      "qr-section",
      "profile",
    ],
  },
  {
    role: "branch_manager",
    permissions: [
      // Dashboard
      "dashboard:view",
      // Tasks
      "tasks:view",
      "tasks:create",
      "tasks:edit",

      // Verifications
      "verifications:view",
      "verifications:approve",
      "verifications:reject",
      // Reports
      "reports:view",

      // Performance
      // "performance:view",

      "qr-section",
      "profile",
    ],
  },
];

// Helper function to check if a role has a specific permission
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const roleConfig = ROLE_PERMISSIONS.find((rp) => rp.role === role);
  return roleConfig?.permissions.includes(permission) ?? false;
}

// Helper function to get all permissions for a role
export function getPermissions(role: UserRole): Permission[] {
  const roleConfig = ROLE_PERMISSIONS.find((rp) => rp.role === role);
  return roleConfig?.permissions ?? [];
}

// Sidebar navigation items based on permissions
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  permission?: Permission;
  children?: SidebarItem[];
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
    permission: "dashboard:view",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: "CheckSquare",
    href: "/tasks",
    permission: "tasks:view",
  },
  {
    id: "verifications",
    label: "Verifications",
    icon: "ClipboardCheck",
    href: "/verifications",
    permission: "verifications:view",
  },
  {
    id: "reports",
    label: "Reports",
    icon: "BarChart3",
    href: "/reports",
    permission: "reports:view",
  },
  {
    id: "users",
    label: "Users",
    icon: "Users",
    href: "/users",
    permission: "users:view",
  },
  {
    id: "locations",
    label: "Locations",
    icon: "MapPin",
    href: "/locations",
    permission: "locations:view",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "Bell",
    href: "/notifications",
    permission: "notifications:view",
  },
  {
    id: "instructions",
    label: "Instructions",
    icon: "FileText",
    href: "/instructions",
    permission: "instructions:view",
  },
  {
    id: "performance",
    label: "Performance",
    icon: "TrendingUp",
    href: "/performance",
    permission: "performance:view",
  },
  {
    id: "qr-section",
    label: "QR Section",
    icon: "QrCode",
    href: "/qr-section",
    permission: "qr-section",
  },
  {
    id: "app-content",
    label: "App Content",
    icon: "Smartphone",
    href: "/app-content",
    permission: "app-content",
  },
  {
    id: "profile",
    label: "Profile",
    icon: "User",
    href: "/profile",
    permission: "profile",
  },
];

// Filter sidebar items based on user role
export function getFilteredSidebarItems(role: UserRole): SidebarItem[] {
  return SIDEBAR_ITEMS.filter((item) => {
    if (!item.permission) return true;
    return hasPermission(role, item.permission);
  });
}
