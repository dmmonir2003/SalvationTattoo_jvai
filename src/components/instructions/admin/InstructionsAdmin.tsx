"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Users,
  Shield,
  Plus,
  AlertCircle,
  Loader,
} from "lucide-react";
import { InstructionCategory } from "./InstructionCategory";
import { AddInstructionModal } from "./AddInstructionModal";
import {
  useGetInstructionsQuery,
  useDeleteInstructionMutation,
  Instruction,
} from "@/redux/services/instructions/instructionApi";
import { useAppSelector } from "@/redux/store";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";

export default function InstructionsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteInstruction] = useDeleteInstructionMutation();

  // Get token from Redux - query will only run when token exists
  const token = useAppSelector(selectCurrentToken);

  // Fetch instructions data - skip if no token
  const {
    data: instructionsData,
    isLoading,
    error,
    refetch,
  } = useGetInstructionsQuery(undefined, {
    skip: !token, // Skip query if no token
  });

  // Automatically refetch when token becomes available (after rehydration)
  React.useEffect(() => {
    if (token && !isLoading) {
      refetch();
    }
  }, [token, refetch, isLoading]);

  // Category configuration with role mapping
  const categoryConfig = [
    {
      roleKey: "tattoo_artist",
      title: "Tattoo Artists Instructions",
      icon: Users,
      iconColor: "text-blue-400",
    },
    {
      roleKey: "body_piercer",
      title: "Body Piercers Instructions",
      icon: Users,
      iconColor: "text-purple-400",
    },
    {
      roleKey: "staff",
      title: "Staff Instructions",
      icon: Shield,
      iconColor: "text-amber-600",
    },
  ];

  // Prepare categories data from API response
  const categories = useMemo(() => {
    if (!instructionsData) return [];

    return categoryConfig.map((config) => {
      const instructions =
        instructionsData.grouped[
          config.roleKey as keyof typeof instructionsData.grouped
        ] || [];

      return {
        ...config,
        count: instructions.length,
        instructions: instructions.map((inst: Instruction) => ({
          id: inst.id.toString(),
          title: inst.title,
          description: inst.description,
          fileName: inst.pdf_filename || "No PDF attached",
        })),
      };
    });
  }, [instructionsData]);

  // Prepare stats from API data
  const stats = useMemo(() => {
    if (!instructionsData) {
      return [
        {
          label: "Total Instructions",
          val: 0,
          icon: FileText,
          color: "text-amber-500",
          bg: "bg-amber-500/10",
        },
        {
          label: "Tattoo Artists",
          val: 0,
          icon: Users,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
        },
        {
          label: "Body Piercers",
          val: 0,
          icon: Users,
          color: "text-purple-500",
          bg: "bg-purple-500/10",
        },
        {
          label: "Staff",
          val: 0,
          icon: Shield,
          color: "text-amber-600",
          bg: "bg-amber-600/10",
        },
      ];
    }

    return [
      {
        label: "Total Instructions",
        val: instructionsData.stats.total_instructions,
        icon: FileText,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
      },
      {
        label: "Tattoo Artists",
        val: instructionsData.stats.tattoo_artists,
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
      },
      {
        label: "Body Piercers",
        val: instructionsData.stats.body_piercers,
        icon: Users,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
      },
      {
        label: "Staff",
        val: instructionsData.stats.staff,
        icon: Shield,
        color: "text-amber-600",
        bg: "bg-amber-600/10",
      },
    ];
  }, [instructionsData]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this instruction?")) {
      return;
    }

    try {
      await deleteInstruction(Number(id)).unwrap();
      // The query will be automatically invalidated and refetch
    } catch (err) {
      console.error("Failed to delete instruction:", err);
      alert("Failed to delete instruction");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Refetch data when modal closes (in case instruction was created)
    refetch();
  };

  if (error) {
    return (
      <div className="space-y-8 p-4 bg-black min-h-screen text-white">
        <div className="p-6 rounded-2xl border border-red-500/30 bg-red-500/10 flex gap-3">
          <AlertCircle size={20} className="text-red-500 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-400">
              Failed to load instructions
            </h3>
            <p className="text-sm text-red-300/70 mt-1">
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm font-medium text-red-400 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 bg-black min-h-screen text-white">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Instruction Library
          </h1>
          {/* <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold tracking-widest italic">
            Salvation Tattoo Lounge · Super Admin Panel
          </p> */}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all"
        >
          <Plus size={18} /> Add Instruction
        </button>
      </div>

      {/* 2. KPI Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl p-6 space-y-4 animate-pulse"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-700" />
              <div className="space-y-2">
                <div className="h-8 bg-gray-700 rounded w-1/3" />
                <div className="h-4 bg-gray-700 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl p-6 space-y-4"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center border border-white/5",
                  stat.bg,
                )}
              >
                <stat.icon size={18} className={stat.color} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{stat.val}</h2>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Categorized Content */}
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-12">
          <Loader size={20} className="animate-spin" />
          <p className="text-gray-400">Loading instructions...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-12 text-center">
          <p className="text-gray-400">
            No instructions found. Create one to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((cat, i) => (
            <InstructionCategory
              key={i}
              {...cat}
              onEdit={(id) => console.log("Edit:", id)} // TODO: Add edit functionality
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <AddInstructionModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}
