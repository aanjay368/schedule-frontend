import { X } from "lucide-react";
import Card from "./Card";

export default function Modal({ onClose, title, description, content }) {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <Card className="relative rounded-[2rem] border-none p-0 shadow-2xl dark:bg-slate-900">
        {/* Header Section */}
        <div className="relative border-b border-slate-100 px-8 py-7 dark:border-slate-800">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-7 right-6 rounded-full p-2 text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          )}

          <div className="pr-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
          {/* Aksen Ungu yang lebih elegan */}
          <div
            className={`absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-fuchsia-600 to-purple-600`}
          />
        </div>

        {/* Content Section dengan Scroll limit */}
        <div className="custom-scrollbar p-8 text-slate-700 dark:text-slate-200">
          {content}
        </div>
      </Card>      
    </div>
  );
}
