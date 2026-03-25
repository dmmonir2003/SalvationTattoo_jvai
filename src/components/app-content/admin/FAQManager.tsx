/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const FAQManager = ({ faqs }: { faqs: any[] }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-end">
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-2xl font-bold hover:bg-gray-200 transition-all shadow-lg"
          >
            <Plus size={18} /> Add FAQ
          </button>
        )}
      </div>

      {/* Add New FAQ Form (Image 36) */}
      {isAdding && (
        <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-white font-bold">Add New FAQ</h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
                Question
              </label>
              <input
                type="text"
                placeholder="Enter FAQ question"
                className="w-full bg-black border border-[#262626] rounded-xl p-4 text-sm text-white focus:border-[#404040] outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">
                Answer
              </label>
              <textarea
                placeholder="Enter FAQ answer"
                className="w-full bg-black border border-[#262626] rounded-xl p-4 text-sm text-white min-h-30 resize-none outline-none focus:border-[#404040]"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
              Save FAQ
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="bg-black border border-[#262626] text-gray-500 px-8 py-3 rounded-xl font-bold hover:text-white transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FAQ List (Image 34) */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-8 group hover:border-[#404040] transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <h4 className="text-white font-bold text-base">
                  {faq.question}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed max-w-3xl italic">
                  {faq.answer}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-500 hover:text-white transition-colors">
                  <Edit2 size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
