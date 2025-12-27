import {Hash} from "lucide-react";

// Komponen Item Baris tunggal
export const DetailItem = ({ icon, label, value }) => (
  <div className="group flex items-start gap-4">
    <div className="mt-1 text-slate-400 transition-colors group-hover:text-purple-500">
      {icon}
    </div>
    <div className="space-y-0.5">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
        {value || "-"}
      </div>
    </div>
  </div>
);

// Komponen Grup dengan Label
export const DetailGroup = ({ label, items, className = "", children }) => (
  <div className={`space-y-4 ${className}`}>
    <h5 className="border-b border-slate-100 pb-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase dark:border-slate-800">
      {label}
    </h5>
    <div className="space-y-4">
      {items ? items.map((item, idx) => (
        <DetailItem key={idx} {...item} />
      )) : children}
    </div>
  </div>
);

// Komponen Wrapper Header ID (Animasi Marquee)
export const DetailId = ({ id }) => (
  <div className="flex items-center gap-2 text-sm text-purple-600 xl:font-medium dark:text-purple-400">
    <Hash className="w-4 sm:w-5" />
    <div className="max-w-40 overflow-hidden sm:max-w-full">
      <span className="animate-marquee sm:animate-none pl-4 sm:pl-0 block whitespace-nowrap">
        {id}
      </span>
    </div>
  </div>
);