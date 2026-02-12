import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { useCurrentEmployee } from "../../contexts/CurrentEmployeeProvider";
import { useToast } from "../../../../contexts/ToastProvider";
import { doSubmissionActionsService } from "../../../../services/submissionService";

const SubmissionActions = ({ submission, onSuccess }) => {
  const currentEmployee = useCurrentEmployee();
  const isSender = submission.sender.id === currentEmployee?.id;
  const { showToast } = useToast();

  // Sembunyikan jika status akhir
  if (["EXPIRED", "CANCELLED", "REJECTED"].includes(submission.status))
    return null;

  const handleAction = async (actionType) => {
    try {
      const { data } = await doSubmissionActionsService(
        submission.id,
        actionType,
      );
      if (actionType === "approve") {
        showToast("Permintaan berhasil diterima");
      }
      if (actionType === "reject") {
        showToast("Permintaan berhasil ditolak");
      }
      if (actionType === "cancel") {
        if (
          submission.status === "PENDING" &&
          submission.sender.id === currentEmployee.id
        ) {
          showToast("Permitaan berhasil dibatalkan");
        }
        if (submission.status === "APPROVED") {
          showToast(
            "Permintaan Pembatalan berhasil di kirim ke " +
              data.receiver.nickname,
          );
        }
      }
      if (onSuccess) onSuccess(data);
    } catch ({ message }) {
      showToast(message, "error");
    }
  };

  return (
    <div className="mt-6 flex justify-end gap-4">
      {/* Tombol untuk PENERIMA (Hanya jika PENDING) */}
      {!isSender && submission.status === "PENDING" && (
        <>
          <button
            onClick={() => handleAction("reject")}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-2.5 text-sm font-bold text-red-600 transition-all hover:cursor-pointer hover:bg-red-100 active:scale-95 dark:border-red-900/80 dark:bg-red-900/40 dark:hover:bg-red-700/40"
          >
            <XCircle size={18} />
            Tolak
          </button>
          <button
            onClick={() => handleAction("approve")}
            className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-2.5 text-sm font-bold text-green-600 transition-all hover:cursor-pointer hover:bg-green-100 active:scale-95 dark:border-green-900/80 dark:bg-green-900/40 dark:hover:bg-green-700/40"
          >
            <CheckCircle2 size={18} />
            Setujui
          </button>
        </>
      )}

      {/* Tombol untuk PENGIRIM (Jika PENDING atau APPROVED) */}
      {((submission.status === "PENDING" && isSender) ||
        (submission.status === "APPROVED" &&
          submission.type !== "CANCELLATION")) && (
        <button
          onClick={() => handleAction("cancel")}
          className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-2.5 text-sm font-bold text-red-600 transition-all hover:cursor-pointer hover:bg-red-700/40 active:scale-95 dark:border-red-900/80 dark:bg-red-900/40"
        >
          <MinusCircle size={18} />
          {submission.status === "APPROVED"
            ? "Ajukan Pembatalan"
            : "Batalkan Permintaan"}
        </button>
      )}
    </div>
  );
};

export default SubmissionActions;
