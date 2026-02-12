import { useState, useRef } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { uploadScheduleService } from "../../../../services/scheduleService";
import { useToast } from "../../../../contexts/ToastProvider";

export default function UploadSchedule({
 filters,
  onSuccess, // Menerima callback untuk refresh data
}) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(10); // Mulai progress

    const formData = new FormData();
    formData.append("file", file);
    formData.append("divisionId", filters.divisionId);
    formData.append("positionId", filters.positionId);
    formData.append("month", filters.month);
    formData.append("year", filters.year);

    try {
      // Simulasi progress berjalan (karena fetch API tidak mendukung upload progress secara native)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);

      const {data} = await uploadScheduleService(formData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      showToast(data, "success");

      // Panggil fungsi refresh di Parent
      if (onSuccess) await onSuccess();
    } catch (err) {
      showToast(err.message || "Gagal mengunggah file", "error");
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = null;
      }, 500);
    }
  };

  return (
    <div className="flex items-end gap-3">
      {/* Tombol Upload */}
      {/* Progress Bar UI */}
      {isUploading && (
        <div className="animate-in fade-in slide-in-from-top-2 w-64 space-y-2">
          <div className="flex justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            <span>Progress Upload</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
      <label className="group relative">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          disabled={isUploading}
        />
        <div
          className={`flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 shadow-md transition-all active:scale-95 ${
            isUploading
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/30"
          } `}
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload size={18} />
          )}
          <span className="text-sm font-bold">
            {isUploading ? "Mengunggah..." : "Upload CSV"}
          </span>
        </div>
      </label>
    </div>
  );
}
