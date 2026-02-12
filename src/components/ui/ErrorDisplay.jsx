import {
  FileX2,
  ServerCrash,
  Ban,
  AlertTriangle,
  RefreshCcw,  
} from "lucide-react";

const ERROR_CONFIG = {
  404: { icon: FileX2 },
  403: { icon: Ban },
  500: { icon: ServerCrash },  
  default: { icon: AlertTriangle },
};

export default function ErrorDisplay({ errorCode = 500, message = "Terjadi Kesalahan Server", onRetry }) {
  // Ambil config berdasarkan errorCode
  const config = ERROR_CONFIG[errorCode] || ERROR_CONFIG.default;
  const Icon = config.icon;

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-8 rounded-xl p-8 text-center dark:border-slate-800 dark:bg-slate-900/10">
      {/* Visual Icon */}
      <div
        className={`rounded-full bg-gray-50 p-6 text-gray-500 transition-transform hover:scale-110 dark:bg-gray-500/10`}
      >
        <Icon size={48} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="max-w-md">
        <h2 className="text-slate-500">{message}</h2>
      </div>

      {/* Action Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="group flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          <RefreshCcw
            size={16}
            className="transition-transform group-hover:rotate-180"
          />
          Coba Lagi
        </button>
      )}
    </div>
  );
}
