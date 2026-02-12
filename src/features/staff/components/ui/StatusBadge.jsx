export default function StatusBadge({ status }) {
  const styles = {
    PENDING: "text-orange-600",
    APPROVED: "text-emerald-600 ",
    REJECTED: "text-red-600",
    CANCELLED: "text-slate-500 ",
    EXPIRED: "text-slate-500"
  };

  const statusTranslation = {
    PENDING: "Pending",
    APPROVED: "Diterima",
    REJECTED: "Ditolak",
    CANCELLED: "Dibatalkan",
    EXPIRED : "Kadaluarsa"
  };

  const indicator = {
    PENDING: "bg-orange-600",
    APPROVED: "bg-emerald-600 ",
    REJECTED: "bg-red-600",
    CANCELLED: "bg-slate-500",
    EXPIRED: "bg-slate-400",
  };

  return (
    <span className={`inline-block space-x-2`}>
      <div
        className={`inline-block h-2.5 w-2.5 animate-pulse rounded-full ${indicator[status]}`}
      />
      <span className={`text-xs font-black ${styles[status]}`}>
        {statusTranslation[status]}
      </span>
    </span>
  );
}
