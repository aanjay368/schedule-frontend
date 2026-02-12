import { ExternalLink, Hash } from "lucide-react";
import { Link } from "react-router";

export const DetailItem = ({ icon, label, value, link }) => (
  <div className="group flex items-start gap-4">
    {/* Icon Container */}
    <div className="mt-1 text-slate-400 transition-colors group-hover:text-purple-500">
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      
      <div className="flex items-center gap-2">        
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {value || "-"}
        </span>
        
        {link && (
          <Link
            to={link}
            className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 transition-all hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50"
          >
            <span className="text-[10px]  tracking-wider text-indigo-600 dark:text-indigo-400">
              Lihat
            </span>
            <ExternalLink
              size={10}
              strokeWidth={3}
              className="text-indigo-500"
            />
          </Link>
        )}
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
      {items
        ? items.map((item, idx) => <DetailItem key={idx} {...item} />)
        : children}
    </div>
  </div>
);

// Komponen Wrapper Header ID (Animasi Marquee)
export const DetailId = ({ id }) => (
  <div className="flex items-center gap-2 text-sm text-purple-600 xl:font-medium dark:text-purple-400">
    <Hash className="w-4 sm:w-5" />
    <div className="max-w-40 overflow-hidden sm:max-w-full">
      <span className="animate-marquee block pl-4 whitespace-nowrap sm:animate-none sm:pl-0">
        {id}
      </span>
    </div>
  </div>
);
