import { Send, ChevronDown } from "lucide-react";

export const SendNotificationForm = () => (
  <div className="bg-[#0A0A0A] border border-[#968B79]/60 rounded-3xl p-8 h-full flex flex-col">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
        <Send size={18} className="text-gray-400" />
      </div>
      <div>
        <h3 className="text-white font-bold">Send Notification</h3>
        <p className="text-gray-500 text-xs">
          Notify employees about important updates
        </p>
      </div>
    </div>

    <div className="space-y-6 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
            User
          </label>
          <input
            type="text"
            placeholder="employee@inkempire.com"
            className="w-full bg-black border border-[#968B79]/60 rounded-xl p-4 text-sm text-white focus:border-[#404040] outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
            User Type
          </label>
          <div className="relative">
            <select className="w-full bg-black border border-[#968B79]/60 rounded-xl p-4 text-sm text-white appearance-none outline-none">
              <option>Select Type</option>
              <option>Tattoo Artists</option>
              <option>Managers</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
          Branch
        </label>
        <div className="relative">
          <select className="w-full bg-black border border-[#262626] rounded-xl p-4 text-sm text-white appearance-none outline-none">
            <option>Select Branch</option>
            <option>Downtown</option>
            <option>Midtown</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
          Message
        </label>
        <textarea
          placeholder="Enter your message here..."
          className="w-full bg-black border border-[#262626] rounded-2xl p-4 text-sm text-white min-h-30 outline-none resize-none focus:border-[#404040]"
        />
      </div>
    </div>

    <button className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all mt-8">
      <Send size={18} /> Send Notification
    </button>
  </div>
);
