/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mail, MapPin, Calendar } from "lucide-react";

export const NotificationFeed = ({ history }: { history: any[] }) => (
  <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-8 h-full">
    <div className="mb-8">
      <h3 className="text-white font-bold">Recent Notifications</h3>
      <p className="text-gray-500 text-xs">Sent notifications history</p>
    </div>

    <div className="space-y-4">
      {history.map((item, i) => (
        <div
          key={i}
          className="bg-[#111] border border-[#262626] rounded-2xl p-5 hover:border-[#404040] transition-all group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Mail size={14} className="text-blue-400" />
              </div>
              <span className="text-white font-medium text-sm">
                {item.recipient}
              </span>
            </div>
            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter border border-emerald-500/20">
              {item.status}
            </span>
          </div>
          <p className="text-gray-500 text-xs mb-4 line-clamp-2 italic leading-relaxed">
            {item.message}
          </p>
          <div className="flex items-center gap-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} /> {item.branch}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {item.date}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
