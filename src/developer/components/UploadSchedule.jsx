import { AlertCircle, CheckCircle, FileText, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { uploadScheduleService } from "../../service/scheduleService";

export default function UploadSchedule({ division }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null); 
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading((loading) => true);
    setError((error) => "");
    setSuccess((success) => "");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await uploadScheduleService(formData, division);
      setSuccess((success) => response.data);
    } catch (err) {      
      setError((error) => err.message || "Error processing CSV file");
    } finally {
      setLoading((loading) => false);
      fileInputRef.current.value = null;
    }
  };
  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Upload Schedule Data
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload CSV file with employee shift schedules
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">         

          <label className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              disabled={loading}
            />
            <div
              disabled={loading}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-colors ${
                loading
                  ? "cursor-not-allowed bg-gray-400 text-gray-200"
                  : "bg-pink-500 text-white hover:bg-pink-700"
              }`}
            >
              <Upload size={16} />
              <span className="text-sm font-medium">
                {loading ? "Processing..." : "Upload CSV"}
              </span>
            </div>
          </label>
        </div>
      </div>

      {fileName && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FileText size={16} />
          <span>{fileName}</span>
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
          <CheckCircle size={16} />
          <span>{success}</span>
        </div>
      )}
    </div>
  );
}
