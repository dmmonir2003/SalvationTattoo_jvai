// "use client";

// import { useState } from "react";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";
// import { cn } from "@/lib/utils";

// interface DashboardClientLayoutProps {
//   children: React.ReactNode;
// }

// export function DashboardClientLayout({
//   children,
// }: DashboardClientLayoutProps) {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Desktop Sidebar */}
//       <Sidebar
//         collapsed={sidebarCollapsed}
//         onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
//       />

//       {/* Main Content */}
//       <div
//         className={cn(
//           "transition-all duration-300",
//           "lg:pl-64",
//           sidebarCollapsed && "lg:pl-16",
//         )}
//       >
//         {/* Header */}
//         <Header />

//         {/* Page Content */}
//         <main className="p-4 lg:p-6">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
// import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

export function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // const pathname = usePathname();

  // --- FIX START ---
  // Instead of an Effect, we can use a "Key" pattern or
  // simply track the last pathname to reset state during render.
  // However, for sidebars, the most reliable way is to pass
  // the setter to the sidebar and let the links close it.
  // -----------------

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Handles both Desktop and Mobile logic */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        // This allows the Sidebar to close itself when a link is clicked
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "transition-all duration-300 min-h-screen flex flex-col",
          "lg:pl-64",
          sidebarCollapsed && "lg:pl-16",
          "pl-0",
        )}
      >
        <Header onMenuClick={() => setMobileOpen(true)} />

        <main className="p-4 lg:p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
