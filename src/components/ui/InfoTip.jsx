import { ShieldAlert, CheckCircle2, Info, AlertTriangle } from "lucide-react";

const tipStyles = {
  alert: {
    container: "border-orange-500 bg-orange-500/10 dark:bg-orange-900/30",
    icon: <ShieldAlert size={15} strokeWidth={2.5} className="text-orange-500" />,
    text: "text-orange-600 dark:text-orange-400"
  },
  success: {
    container: "border-emerald-500 bg-emerald-500/10 dark:bg-emerald-900/30",
    icon: <CheckCircle2 size={15} strokeWidth={2.5} className="text-emerald-500" />,
    text: "text-emerald-600 dark:text-emerald-400"
  },
  info: {
    container: "border-indigo-500 bg-indigo-500/10 dark:bg-indigo-900/30",
    icon: <Info size={15} strokeWidth={2.5} className="text-indigo-500" />,
    text: "text-indigo-600 dark:text-indigo-400"
  },
  danger: {
    container: "border-red-500 bg-red-500/10 dark:bg-red-900/30",
    icon: <AlertTriangle size={15} strokeWidth={2.5} className="text-red-500" />,
    text: "text-red-600 dark:text-red-400"
  }
};

export default function InfoTip({ message, type = "info", className = "" }) {
  const style = tipStyles[type] || tipStyles.info;

  return (
    <div className={`flex items-center gap-2 rounded-xl border-[1px] px-3 py-2 shadow-sm transition-all ${style.container} ${className}`}>
      <span className="shrink-0">
        {style.icon}
      </span>
      <span className={`text-[10px] ${style.text}`}>
        {message}
      </span>
    </div>
  );
}