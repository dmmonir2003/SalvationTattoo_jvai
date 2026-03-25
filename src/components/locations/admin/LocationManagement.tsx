/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { LocationTable } from "./LocationTable";
import { LocationActionModal } from "./LocationActionModal";

export default function LocationManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

  const locationsData = [
    {
      id: 1,
      name: "SALVATION — Downtown",
      address: "142 N Michigan Ave",
      city: "Chicago, IL",
      staffCount: 8,
      status: "Active",
    },
    {
      id: 2,
      name: "SALVATION — Midtown",
      address: "890 N Clark St",
      city: "Chicago, IL",
      staffCount: 7,
      status: "Active",
    },
    {
      id: 3,
      name: "SALVATION — Wicker Park",
      address: "1560 N Milwaukee Ave",
      city: "Chicago, IL",
      staffCount: 6,
      status: "Active",
    },
    {
      id: 4,
      name: "SALVATION — Logan Square",
      address: "2400 N Kedzie Blvd",
      city: "Chicago, IL",
      staffCount: 0,
      status: "Inactive",
    },
  ];

  const handleEdit = (loc: any) => {
    setSelectedLocation(loc);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedLocation(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 p-4 bg-black min-h-screen text-white">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Location Management
          </h1>
          <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold tracking-widest">
            SALVATION TATTOO LOUNGE · Super Admin Panel
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all"
        >
          <Plus size={18} /> Add Location
        </button>
      </div>

      {/* 2. Horizontal Stat Bar (Image 12 style) */}
      <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-8 flex items-center justify-around text-center">
        <div>
          <h2 className="text-4xl font-bold mb-1">4</h2>
          <p className="text-gray-500 text-xs font-medium">Total Locations</p>
        </div>
        <div className="w-px h-12 bg-[#1A1A1A]" />
        <div>
          <h2 className="text-4xl font-bold mb-1">21</h2>
          <p className="text-gray-500 text-xs font-medium">Total Staff</p>
        </div>
        <div className="w-px h-12 bg-[#1A1A1A]" />
        <div>
          <h2 className="text-4xl font-bold mb-1">3</h2>
          <p className="text-gray-500 text-xs font-medium">Active Locations</p>
        </div>
      </div>

      {/* 3. Locations Table Container */}
      <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl overflow-hidden">
        <LocationTable locations={locationsData} onEdit={handleEdit} />
        <div className="p-6 border-t border-[#1A1A1A] text-gray-600 text-[10px] uppercase font-bold tracking-widest">
          4 locations total
        </div>
      </div>

      {/* 4. Modal */}
      <LocationActionModal
        key={selectedLocation?.id || "new-loc"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedLocation}
        onSave={(data) => console.log("Save Data:", data)}
      />
    </div>
  );
}
