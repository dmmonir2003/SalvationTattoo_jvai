/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera, User, Clock, Check, X } from "lucide-react";

export const VerificationCard = ({
  data,
  onApprove,
  onReject,
  onClick,
}: any) => (
  <div
    className="bg-[#0A0A0A] border border-[#262626] rounded-2xl overflow-hidden flex flex-col hover:border-[#404040] transition-all cursor-pointer"
    onClick={onClick}
  >
    <div className="relative h-48 bg-[#141414]">
      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          className="w-full h-full object-cover opacity-60"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-700">
          <Check size={32} strokeWidth={1} />
          <span className="text-[10px]">No photo required</span>
        </div>
      )}
      {data.imageUrl && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 px-2 py-1 rounded text-[10px] text-white">
          <Camera size={12} /> Photo proof
        </div>
      )}
    </div>
    <div className="p-5 space-y-4 flex-1">
      <div>
        <h3 className="text-white font-bold text-sm">{data.taskName}</h3>
        <p className="text-gray-500 text-xs italic mt-1 leading-relaxed">
          {data.description}
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <User size={14} className="text-indigo-400" /> {data.employeeName}
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-[10px]">
          <Clock size={14} /> Submitted {data.submittedTime}
        </div>
      </div>
      {!data.isResolved && (
        <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onApprove}
            className="flex-1 border border-emerald-500/30 text-emerald-500 py-2 rounded-xl text-xs font-bold hover:bg-emerald-500/10 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="flex-1 border border-red-500/30 text-red-400 py-2 rounded-xl text-xs font-bold hover:bg-red-500/10 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  </div>
);
