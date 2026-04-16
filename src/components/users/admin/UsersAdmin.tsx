// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState, useCallback, useMemo } from "react";
// import { UserManagementHeader } from "./UserManagementHeader";
// import { UserTable } from "./UserTable";
// import { UserActionModal } from "./UserActionModal";
// import { cn } from "@/lib/utils";
// import { useAppSelector } from "@/redux/store";
// import { selectCurrentToken } from "@/redux/features/auth/authSlice";
// import {
//   useGetUsersQuery,
//   useAddUserMutation,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
//   User,
// } from "@/redux/services/users/userService";

// const AVATAR_COLORS = [
//   "bg-purple-600",
//   "bg-cyan-600",
//   "bg-emerald-600",
//   "bg-red-600",
//   "bg-indigo-600",
//   "bg-blue-600",
// ];

// const getAvatarColor = (index: number) =>
//   AVATAR_COLORS[index % AVATAR_COLORS.length];

// const formatDate = (dateString: string) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// };

// // Convert 12-hour format (e.g., "8 AM") to 24-hour format (e.g., "08:00")
// const convertTo24Hour = (time12: string): string => {
//   if (!time12) return "";

//   const [time, period] = time12.split(" ");
//   let [hours] = time.split(":").map(Number);
//   const [, minutes] = time.split(":").map(Number);

//   if (period === "PM" && hours !== 12) {
//     hours += 12;
//   } else if (period === "AM" && hours === 12) {
//     hours = 0;
//   }

//   return `${String(hours).padStart(2, "0")}:${String(minutes || 0).padStart(2, "0")}`;
// };

// // Convert day name to lowercase abbreviation
// const getDayAbbr = (dayName: string): string => {
//   const abbr = dayName.slice(0, 3).toLowerCase();
//   return abbr;
// };

// // Transform schedule from modal format to API format
// const transformScheduleToAPI = (schedule: any[]) => {
//   return schedule.map((item) => ({
//     day: getDayAbbr(item.day),
//     is_active: item.enabled,
//     start_time: item.enabled ? convertTo24Hour(item.start) : null,
//     end_time: item.enabled ? convertTo24Hour(item.end) : null,
//   }));
// };

// // Get initials from first and last name
// const getInitials = (firstName: string, lastName: string): string => {
//   const first = firstName?.charAt(0)?.toUpperCase() || "";
//   const last = lastName?.charAt(0)?.toUpperCase() || "";
//   return first + last;
// };

// const mapApiUserToUIUser = (user: User, index: number) => ({
//   id: user.id,
//   name: `${user.first_name} ${user.last_name}`,
//   handle: `@${user.username}`,
//   role: user.role_display || user.role,
//   location: user.location_name,
//   joined: formatDate(user.date_joined),
//   status: user.is_active ? "Active" : "Inactive",
//   initials: getInitials(user.first_name, user.last_name),
//   avatarColor: getAvatarColor(index),
//   // Store original API data
//   apiData: user,
// });

// export default function UsersAdmin() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<any | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Handle search and reset to page 1
//   const handleSearchChange = useCallback((query: string) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   }, []);

//   // Get token from Redux
//   const token = useAppSelector(selectCurrentToken);

//   // API Queries & Mutations - skip if no token
//   const {
//     data: apiResponse,
//     isLoading,
//     error,
//     refetch,
//   } = useGetUsersQuery(
//     {
//       search: searchQuery,
//       page: currentPage,
//     },
//     { skip: !token },
//   );

//   // Automatically refetch when token becomes available (after rehydration)
//   React.useEffect(() => {
//     if (token && !isLoading) {
//       refetch();
//     }
//   }, [token, refetch, isLoading]);
//   const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();
//   const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
//   const [deleteUser] = useDeleteUserMutation();

//   // Map API users to UI format
//   const users = useMemo(() => {
//     if (!apiResponse?.users?.results) return [];
//     return apiResponse.users.results.map((user, index) =>
//       mapApiUserToUIUser(user, index),
//     );
//   }, [apiResponse]);

//   const totalPages = useMemo(() => {
//     if (!apiResponse?.users?.count) return 1;
//     return Math.ceil(apiResponse.users.count / 5); // Assuming 5 items per page
//   }, [apiResponse]);

//   const stats = useMemo(() => {
//     return (
//       apiResponse?.stats || {
//         district_managers: 0,
//         managers: 0,
//         employees: 0,
//       }
//     );
//   }, [apiResponse]);

//   const handleEdit = (user: any) => {
//     setSelectedUser(user);
//     setIsModalOpen(true);
//   };

//   const handleCreate = () => {
//     setSelectedUser(null);
//     setIsModalOpen(true);
//   };

//   const handleDelete = useCallback(
//     async (user: any) => {
//       if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
//         try {
//           await deleteUser(user.id).unwrap();
//         } catch (err) {
//           console.error("Delete failed:", err);
//         }
//       }
//     },
//     [deleteUser],
//   );

//   const handleSave = useCallback(
//     async (formData: any) => {
//       try {
//         // Transform schedule to API format
//         const transformedSchedule = transformScheduleToAPI(formData.schedule);

//         if (selectedUser) {
//           // Update existing user
//           const updateData: any = {
//             first_name: formData.fullName.split(" ")[0],
//             last_name: formData.fullName.split(" ").slice(1).join(" "),
//             email: formData.email,
//             role: formData.role,
//             location: parseInt(formData.location),
//             is_active: formData.is_active ?? true,
//             work_schedules: transformedSchedule,
//           };
//           // Only include password if provided
//           if (formData.password) {
//             updateData.password = formData.password;
//           }
//           await updateUser({
//             id: selectedUser.apiData.id,
//             data: updateData,
//           }).unwrap();
//         } else {
//           // Create new user
//           await addUser({
//             first_name: formData.fullName.split(" ")[0],
//             last_name: formData.fullName.split(" ").slice(1).join(" "),
//             email: formData.email,
//             username: formData.email.split("@")[0],
//             password: formData.password,
//             role: formData.role,
//             location: parseInt(formData.location),
//             work_schedules: transformedSchedule,
//           } as any).unwrap();
//         }
//         setIsModalOpen(false);
//       } catch (err) {
//         console.error("Save failed:", err);
//       }
//     },
//     [selectedUser, addUser, updateUser],
//   );

//   // Loading & Error States
//   if (isLoading) {
//     return (
//       <div className="space-y-6 p-4 bg-black min-h-screen">
//         <div className="animate-pulse">
//           <div className="h-32 bg-[#1A1A1A] rounded-[32px]" />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="space-y-6 p-4 bg-black min-h-screen">
//         <div className="bg-red-500/10 border border-red-500/20 rounded-[32px] p-6 text-red-500">
//           Failed to load users. Please try again.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-4 bg-black min-h-screen">
//       <UserManagementHeader
//         onOpenModal={handleCreate}
//         searchQuery={searchQuery}
//         onSearchChange={handleSearchChange}
//         stats={stats}
//       />

//       <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-[32px] overflow-hidden">
//         <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center">
//           <h3 className="text-white font-bold">
//             All Users ({apiResponse?.users?.count || 0})
//           </h3>
//         </div>

//         {/* Pass handleEdit and handleDelete to Table */}
//         <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

//         {/* Pagination */}
//         <div className="p-6 flex justify-center gap-2 border-t border-[#1A1A1A]">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={cn(
//                 "w-8 h-8 rounded-lg border text-xs font-bold transition-all",
//                 currentPage === page
//                   ? "bg-white text-black border-white"
//                   : "border-[#1A1A1A] text-gray-500 hover:border-[#404040]",
//               )}
//               disabled={isLoading}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* MODAL with KEY strategy: When selectedUser changes, modal resets perfectly */}
//       <UserActionModal
//         key={selectedUser?.id || "new-user"}
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         initialData={selectedUser}
//         onSave={handleSave}
//         isLoading={isAddingUser || isUpdatingUser}
//       />
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback, useMemo } from "react";
import { UserManagementHeader } from "./UserManagementHeader";
import { UserTable } from "./UserTable";
import { UserActionModal } from "./UserActionModal";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/services/users/userService";

// ... (AVATAR_COLORS, formatDate, convertTo24Hour, transformScheduleToAPI, getInitials, mapApiUserToUIUser stay exactly the same)

const AVATAR_COLORS = [
  "bg-purple-600",
  "bg-cyan-600",
  "bg-emerald-600",
  "bg-red-600",
  "bg-indigo-600",
  "bg-blue-600",
];

const getAvatarColor = (index: number) =>
  AVATAR_COLORS[index % AVATAR_COLORS.length];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const convertTo24Hour = (time12: string): string => {
  if (!time12 || time12.includes(":00")) return time12;
  const [time, period] = time12.split(" ");
  let [hours] = time.split(":").map(Number);
  const minutes = time.split(":")[1] ? Number(time.split(":")[1]) : 0;
  if (period === "PM" && hours !== 12) hours += 12;
  else if (period === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const transformScheduleToAPI = (schedule: any[]) => {
  return schedule.map((item) => ({
    day: item.day.slice(0, 3).toLowerCase(),
    is_active: item.enabled,
    start_time: item.enabled ? convertTo24Hour(item.start) : null,
    end_time: item.enabled ? convertTo24Hour(item.end) : null,
  }));
};

const getInitials = (firstName: string, lastName: string): string => {
  const first = firstName?.charAt(0)?.toUpperCase() || "";
  const last = lastName?.charAt(0)?.toUpperCase() || "";
  return first + last;
};

const mapApiUserToUIUser = (user: any, index: number) => ({
  id: user.id,
  name: `${user.first_name} ${user.last_name}`,
  handle: `@${user.username}`,
  role: user.role_display || user.role,
  location: user.location_name,
  joined: formatDate(user.date_joined),
  status: user.is_active ? "Active" : "Inactive",
  initials: getInitials(user.first_name, user.last_name),
  avatarColor: getAvatarColor(index),
  apiData: user,
});

export default function UsersAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const token = useAppSelector(selectCurrentToken);

  const {
    data: apiResponse,
    isLoading,
    refetch,
  } = useGetUsersQuery(
    { search: searchQuery, page: currentPage },
    { skip: !token },
  );

  React.useEffect(() => {
    if (token && !isLoading) refetch();
  }, [token, refetch, isLoading]);

  const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = useMemo(() => {
    if (!apiResponse?.users?.results) return [];
    return apiResponse.users.results.map((user, index) =>
      mapApiUserToUIUser(user, index),
    );
  }, [apiResponse]);

  const totalPages = useMemo(() => {
    if (!apiResponse?.users?.count) return 1;
    return Math.ceil(apiResponse.users.count / 5);
  }, [apiResponse]);

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  // --- UPDATED SAVE LOGIC ---
  const handleSave = useCallback(
    async (formData: any) => {
      try {
        const isManagementRole =
          formData.role === "district_manager" ||
          formData.role === "branch_manager";

        // 1. Build the base payload with common fields
        const payload: any = {
          first_name: formData.fullName.split(" ")[0],
          last_name: formData.fullName.split(" ").slice(1).join(" "),
          email: formData.email,
          role: formData.role,
          location: parseInt(formData.location),
          status: formData.status,
        };

        // 2. ONLY add work_schedules if it's NOT a management role
        if (!isManagementRole) {
          payload.work_schedules = transformScheduleToAPI(formData.schedule);
        }

        // 3. Handle password (optional for edit)
        if (formData.password) {
          payload.password = formData.password;
        }

        if (selectedUser) {
          // UPDATE USER
          await updateUser({
            id: selectedUser.apiData.id,
            ...payload, // Payload will NOT contain work_schedules for managers
          }).unwrap();
        } else {
          // CREATE USER
          payload.username = formData.email.split("@")[0];
          await addUser(payload as any).unwrap();
        }

        setIsModalOpen(false);
      } catch (err) {
        console.error("Save failed:", err);
      }
    },
    [selectedUser, addUser, updateUser],
  );

  if (isLoading)
    return (
      <div className="p-10 bg-black min-h-screen text-white">Loading...</div>
    );

  return (
    <div className="space-y-6 p-4 bg-black min-h-screen">
      <UserManagementHeader
        onOpenModal={handleCreate}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        stats={apiResponse?.stats}
      />

      <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-[#1A1A1A] flex justify-between items-center">
          <h3 className="text-white font-bold">
            All Users ({apiResponse?.users?.count || 0})
          </h3>
        </div>

        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={(u) => deleteUser(u.id)}
        />

        <div className="p-6 flex justify-center gap-2 border-t border-[#1A1A1A]">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "w-8 h-8 rounded-lg border text-xs font-bold transition-all",
                currentPage === page
                  ? "bg-white text-black border-white"
                  : "border-[#1A1A1A] text-gray-500 hover:border-[#404040]",
              )}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      <UserActionModal
        key={selectedUser?.id || "new-user"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedUser}
        onSave={handleSave}
        isLoading={isAddingUser || isUpdatingUser}
      />
    </div>
  );
}
