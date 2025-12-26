import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success:
      "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400",
    error:
      "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-400",
  };

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    error: <AlertCircle className="h-5 w-5 text-rose-500" />,
  };

  return (
    <div className="animate-in max-w-sm slide-in-from-right fade-in fixed right-5 bottom-5 z-[100] duration-300">
      <div
        className={`flex items-center gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-md ${styles[type]}`}
      >
        <div className="flex-shrink-0">{icons[type]}</div>
        
        <p className="text-sm font-medium">
          {/* Label status dengan format span */}
          <span className={`font-bold tracking-wider mr-1 ${type === "success" ? "text-emerald-500" : "text-rose-500"}`}>
            {type === "success" ? "Berhasil : " : "Error : "}
          </span>{" "}
          {message}
        </p>

        <button
          onClick={onClose}
          className="ml-auto rounded-lg p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}