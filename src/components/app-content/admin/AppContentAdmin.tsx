"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SplashScreenManager } from "./SplashScreenManager";
import { FAQManager } from "./FAQManager";

export default function AppContentAdmin() {
  const [activeTab, setActiveTab] = useState("splash");

  // --- DUMMY DATA ---
  const splashImage =
    "https://images.unsplash.com/photo-1590212151175-e58edd96185b?q=80&w=600";

  const faqData = [
    {
      id: 1,
      question: "How do I clock in for my shift?",
      answer:
        "Open the mobile app, navigate to the attendance section, and tap the 'Clock In' button. Make sure your location services are enabled for accuracy.",
    },
    {
      id: 2,
      question: "Where can I view my assigned tasks?",
      answer:
        "Go to the Tasks tab in the app to see all tasks assigned to you. You can filter by status and location.",
    },
    {
      id: 3,
      question: "How do I update my availability?",
      answer:
        "Navigate to your profile settings and select 'Availability'. You can set your preferred working days and hours there.",
    },
  ];

  return (
    <div className="space-y-8 p-4 bg-black min-h-screen text-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          App Content Management
        </h1>
        <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold tracking-widest italic">
          Manage mobile app splash screen image and FAQ content.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-[#080808] border border-[#1A1A1A] rounded-[40px] p-2">
        {/* Tabs Bar */}
        <div className="flex gap-2 p-4 border-b border-[#1A1A1A]">
          <button
            onClick={() => setActiveTab("splash")}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold transition-all",
              activeTab === "splash"
                ? "bg-[#111] text-white border border-[#262626]"
                : "text-gray-500 hover:text-gray-300",
            )}
          >
            Splash Screen
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold transition-all",
              activeTab === "faq"
                ? "bg-[#111] text-white border border-[#262626]"
                : "text-gray-500 hover:text-gray-300",
            )}
          >
            FAQ
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="p-8">
          {activeTab === "splash" ? (
            <SplashScreenManager currentImage={splashImage} />
          ) : (
            <FAQManager faqs={faqData} />
          )}
        </div>
      </div>
    </div>
  );
}
