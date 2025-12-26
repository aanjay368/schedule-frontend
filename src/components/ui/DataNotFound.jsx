import { FileX2 } from "lucide-react";

export default function DataNotFound({ errorMessage }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/30 p-8 dark:border-slate-800 dark:bg-slate-900/20">
      <FileX2 size={32} className="mb-2 text-slate-300 dark:text-slate-600" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {errorMessage || "Tidak ada data tersedia"}
      </p>
    </div>
  );
}
