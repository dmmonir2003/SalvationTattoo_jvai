/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Camera,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  Briefcase,
  Calendar,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

export const VerificationCard = ({
  data,
  activeTab,
  onApprove,
  onReject,
  onClick,
}: any) => (
  <div
    className="bg-[#0A0A0A] border border-[#262626] rounded-3xl overflow-hidden flex flex-col hover:border-[#404040] transition-all cursor-pointer"
    onClick={onClick}
  >
    <div className="relative h-48 bg-[#141414]">
      {data.imageUrl ? (
        <>
          <img
            src={data.imageUrl}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 px-2 py-1 rounded text-[10px] text-white">
            <Camera size={12} /> Photo proof
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-700">
          <CheckCircle2 size={32} strokeWidth={1} />
          <span className="text-[10px] mt-2 italic text-gray-500">
            No photo required
          </span>
        </div>
      )}
    </div>

    <div className="p-5 space-y-4 flex-1">
      <div>
        <h3 className="text-white font-bold text-base">{data.taskName}</h3>
        <p className="text-gray-500 text-xs italic mt-1 leading-relaxed">
          {data.description}
        </p>
        <div className="mt-2 text-[11px] text-gray-400">
          Assign By :{" "}
          <span className="text-white font-medium">{data.assignBy}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <User size={14} /> {data.employeeName}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Briefcase size={14} /> {data.role}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Calendar size={14} /> Due {data.dueDate}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <MapPin size={14} /> {data.location}
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-[11px] pt-1">
          <Clock size={14} /> Submitted {data.submittedTime}
        </div>
      </div>

      <div className="pt-2" onClick={(e) => e.stopPropagation()}>
        {activeTab === "awaiting_review" && (
          <div className="flex gap-2">
            <button
              onClick={onApprove}
              className="flex-1 flex items-center justify-center gap-2 border border-emerald-500/40 text-emerald-500 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-500/10 transition-colors"
            >
              <CheckCircle2 size={14} /> Approve
            </button>
            <button
              onClick={onReject}
              className="flex-1 flex items-center justify-center gap-2 border border-red-500/40 text-red-400 py-2.5 rounded-xl text-xs font-bold hover:bg-red-500/10 transition-colors"
            >
              <XCircle size={14} /> Reject
            </button>
          </div>
        )}

        {/* Tab check updated to 'approved' */}
        {activeTab === "approved" && (
          <button className="border border-emerald-500/50 text-emerald-500 px-4 py-1.5 rounded-lg text-xs font-bold bg-transparent">
            Approved
          </button>
        )}

        {activeTab === "pending" && (
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 border border-[#262626] text-gray-300 py-2.5 rounded-xl text-xs font-bold hover:bg-white/5 transition-colors">
              <Pencil size={14} /> Edit
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-red-500/40 text-red-500 py-2.5 rounded-xl text-xs font-bold hover:bg-red-500/10 transition-colors">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}

        {activeTab === "overdue" && (
          <div className="bg-red-500/5 border border-red-500/20 text-red-500 px-3 py-2 rounded-xl text-[10px] font-bold text-center uppercase tracking-widest">
            Task Overdue
          </div>
        )}
      </div>
    </div>
  </div>
);
