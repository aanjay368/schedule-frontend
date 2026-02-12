import {
  User,
  Briefcase,
  LayoutGrid,
  Calendar,
  RefreshCcw,
  Clock,
  ArrowRightLeft,
  Send,
  CheckCircle2,
  MinusCircle,
  XCircle,
  Hourglass,
  FileText,
} from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import {
  DetailGroup,
  DetailId,
  DetailItem,
} from "../../../../components/layouts/DataDetailLayout";
import { useCurrentEmployee } from "../../contexts/CurrentEmployeeProvider";
import { SUBMISSION_TYPE_LABEL } from "../../constants/submissionConstants";

export default function SubmissionDetail({ submission }) {
  const currentEmployee = useCurrentEmployee();

  if (!submission) return null;

  // Logika menentukan siapa partner (rekan kerja)const currentEmployee = useCurrentEmployee();
  const isSender = submission.sender?.id === currentEmployee?.id;
  const partner = isSender ? submission.receiver : submission.sender;

  return (
    <div className="w-full space-y-8 py-2">
      {/* Header Info: ID & Status */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center dark:border-slate-800">
        <DetailId id={submission.id} />
        <StatusBadge status={submission.status} />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Kolom Kiri: Profil Rekan & Pesan */}
        <DetailGroup
          label={`Informasi ${isSender ? "Penerima" : "Pengirim"}`}
          items={[
            {
              icon: <User size={18} />,
              label: "Rekan Kerja",
              value: partner?.nickname || "Tidak diketahui",
              link: `/staff/profile/${partner?.id}`,
            },
            {
              icon: <Briefcase size={18} />,
              label: "Jabatan",
              value: partner?.position?.name || "-",
            },
            {
              icon: <LayoutGrid size={18} />,
              label: "Divisi",
              value: partner?.division?.name || "-",
            },
          ]}
        />

        <DetailGroup label="Pesan Tambahan">
          <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-600 italic dark:border-slate-700 dark:text-slate-400">
            "{submission.message || "Tidak ada pesan tambahan"}"
          </div>
        </DetailGroup>

        {/* Kolom Kanan: Detail Teknis Perubahan Jadwal */}
        <DetailGroup label="Detail Permintaan">
          <DetailItem
            icon={<Send size={18} />}
            label="Jenis"
            value={
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {SUBMISSION_TYPE_LABEL[submission.type]}
              </span>
            }
          />
          <DynamicTypeDetail submission={submission} isSender={!isSender} />
        </DetailGroup>
        <DetailGroup label="Detail Permintaan">
          <DetailItem
            icon={<Clock size={20} className="text-blue-500" />}
            label="Dibuat"
            value={submission.createdAt}
          />
          {submission.rejectedAt && (
            <DetailItem
              icon={<XCircle size={20} className="text-red-500" />}
              label="Ditolak"
              value={submission.rejectedAt}
            />
          )}
          {submission.approvedAt && (
            <DetailItem
              icon={<CheckCircle2 size={20} className="text-emerald-500" />}
              label="Diterima"
              value={submission.approvedAt}
            />
          )}
          {submission.cancelledAt && (
            <DetailItem
              icon={<MinusCircle size={20} className="text-slate-400" />}
              label="Dibatalkan"
              value={submission.cancelledAt}
            />
          )}
          <DetailItem
            icon={<Hourglass size={20} className="text-slate-400" />}
            label="Kardaluarsa"
            value={submission.expiredAt}
          />
        </DetailGroup>
      </div>
    </div>
  );
}

const DynamicTypeDetail = ({ submission }) => {
  const { senderSchedule, receiverSchedule, type, reference } = submission;
  const currentEmployee = useCurrentEmployee();
  const isSender = submission.sender?.id === currentEmployee?.id;

  switch (type) {
    case "SHIFT_SWAP":
      return (
        <>
          <DetailItem
            icon={<Calendar size={18} />}
            label="Tanggal Tukar"
            value={receiverSchedule?.date}
          />
          <DetailItem
            icon={<RefreshCcw size={18} />}
            label="Shift Kamu"
            value={
              isSender
                ? senderSchedule?.shift?.name
                : receiverSchedule?.shift?.name
            }
            link={`/staff/schedules/detail/${isSender ? senderSchedule?.id : receiverSchedule?.id}`}
          />
          <DetailItem
            icon={<ArrowRightLeft size={18} />}
            label="Tukar Dengan"
            value={
              !isSender
                ? senderSchedule?.shift?.name
                : receiverSchedule?.shift?.name
            }
            link={`/staff/schedules/detail/${!isSender ? senderSchedule?.id : receiverSchedule?.id}`}
          />
        </>
      );

    case "OFF_SWAP":
      return (
        <>
          <DetailItem
            icon={<Clock size={18} />}
            label="Libur Kamu Seharusnya"
            value={isSender ? senderSchedule?.date : receiverSchedule?.date}
            link={`/staff/schedules/detail/${isSender ? senderSchedule?.id : receiverSchedule?.id}`}
          />
          <DetailItem
            icon={<RefreshCcw size={18} />}
            label="Ditukar Ke Tanggal"
            value={!isSender ? senderSchedule?.date : receiverSchedule?.date}
            link={`/staff/schedules/detail/${!isSender ? senderSchedule?.id : receiverSchedule?.id}`}
          />
        </>
      );

    case "BACKUP":
      return (
        <>
          <DetailItem
            icon={<Calendar size={18} />}
            label="Tanggal"
            value={senderSchedule?.date}
          />
          <DetailItem
            icon={<RefreshCcw size={18} />}
            label="Shift Kerja"
            value={senderSchedule?.shift?.name}
            link={`/staff/schedules/detail/${senderSchedule?.id}`}
          />
        </>
      );

    case "CANCELLATION":
      return (
        <>
          <DetailItem
            icon={<Send size={18} />}
            label="Permitaan sebelumnya"
            value={SUBMISSION_TYPE_LABEL[reference.type]}
          />
          <DetailItem
            icon={<FileText size={18} />}
            label="ID"
            value={reference.id}
            link={`/staff/submissions/detail/${reference.id}`}
          />
          <DynamicTypeDetail submission={reference} isSender={isSender} />
        </>
      );

    default:
      return null;
  }
};
