"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, Users, Shield, Plus } from "lucide-react";
import { InstructionCategory } from "./InstructionCategory";
import { AddInstructionModal } from "./AddInstructionModal";

export default function InstructionsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- DUMMY DATA ---
  const stats = [
    {
      label: "Total Instructions",
      val: 3,
      icon: FileText,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Employees",
      val: 1,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Managers",
      val: 1,
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "District Managers",
      val: 1,
      icon: Shield,
      color: "text-amber-600",
      bg: "bg-amber-600/10",
    },
  ];

  const categories = [
    {
      title: "Employees Instructions",
      icon: Users,
      iconColor: "text-blue-400",
      count: 1,
      instructions: [
        {
          id: "1",
          title: "Autoclave Operation Guide",
          description:
            "Step-by-step instructions for proper autoclave sterilization procedures.",
          fileName: "autoclave-guide.pdf",
        },
      ],
    },
    {
      title: "Managers Instructions",
      icon: Users,
      iconColor: "text-purple-400",
      count: 1,
      instructions: [
        {
          id: "2",
          title: "Monthly Reporting Standards",
          description:
            "Guidelines for compiling and submitting monthly performance reports.",
          fileName: "monthly-reports.pdf",
        },
      ],
    },
    {
      title: "District Managers Instructions",
      icon: Shield,
      iconColor: "text-amber-600",
      count: 1,
      instructions: [
        {
          id: "3",
          title: "District Operations Manual",
          description:
            "Comprehensive operations manual for district-level management.",
          fileName: "district-ops.pdf",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8 p-4 bg-black min-h-screen text-white">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Instruction Management
          </h1>
          <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold tracking-widest italic">
            Salvation Tattoo Lounge · Super Admin Panel
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all"
        >
          <Plus size={18} /> Add Instruction
        </button>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-6 space-y-4"
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

      {/* 3. Categorized Content */}
      <div className="space-y-8">
        {categories.map((cat, i) => (
          <InstructionCategory key={i} {...cat} />
        ))}
      </div>

      <AddInstructionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
