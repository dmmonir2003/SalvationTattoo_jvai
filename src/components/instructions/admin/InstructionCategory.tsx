/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileText, Download, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Instruction {
  id: string;
  title: string;
  description: string;
  fileName: string;
}

interface CategoryProps {
  title: string;
  icon: any;
  iconColor: string;
  count: number;
  instructions: Instruction[];
}

export const InstructionCategory = ({
  title,
  icon: Icon,
  iconColor,
  count,
  instructions,
}: CategoryProps) => (
  <div className="bg-[#0A0A0A] border border-[#262626] rounded-[32px] p-8 space-y-6">
    <div className="flex items-center gap-4">
      <div
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 bg-white/5",
          iconColor,
        )}
      >
        <Icon size={22} />
      </div>
      <div>
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <p className="text-gray-500 text-xs">{count} documents available</p>
      </div>
    </div>

    <div className="space-y-4">
      {instructions.map((item) => (
        <div
          key={item.id}
          className="bg-[#111] border border-[#262626] rounded-2xl p-6 group hover:border-[#404040] transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
                <FileText size={18} className="text-red-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{item.title}</h4>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-gray-500 hover:text-white">
                <Edit2 size={16} />
              </button>
              <button className="p-2 text-gray-500 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest bg-black/40 w-fit px-3 py-1.5 rounded-lg border border-white/5">
            <Download size={12} /> {item.fileName}
          </div>
        </div>
      ))}
    </div>
  </div>
);
