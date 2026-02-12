import { Calendar, RefreshCcw, Ban, Send } from "lucide-react";
import { DetailItem } from "../../../../components/layouts/DataDetailLayout";
import { SUBMISSION_TYPE_LABEL } from "../../constants/submissionConstants";

export default function SubmissionTypeInfo({ data, isIncoming }) {
  const borderClass =
    "space-y-3 border-l-2 border-slate-100 dark:border-slate-800";

  switch (data.type) {
    case "SHIFT_SWAP":
      return (
        <div className={borderClass}>
          <DetailItem
            icon={<Calendar size={14} />}
            label="Tanggal"
            value={data.receiverSchedule?.date}
          />
          <DetailItem
            icon={<RefreshCcw size={14} />}
            label="Shift"
            value={`${data.senderSchedule?.shift.name} ➔ ${data.receiverSchedule?.shift.name}`}
          />
        </div>
      );

    case "OFF_SWAP":
      return (
        <div className={borderClass}>
          <DetailItem
            icon={<Calendar size={14} />}
            label="Libur Saya"
            value={
              isIncoming
                ? data.receiverSchedule?.date
                : data.senderSchedule?.date
            }
          />
          <DetailItem
            icon={<Calendar size={14} />}
            label="Tukar Ke"
            value={
              isIncoming
                ? data.senderSchedule?.date
                : data.receiverSchedule?.date
            }
          />
        </div>
      );
    case "BACKUP":
      return (
        <div className={borderClass}>
          <DetailItem
            icon={<Calendar size={14} />}
            label="Tanggal"
            value={data.senderSchedule?.date}
          />
          <DetailItem
            icon={<RefreshCcw size={14} />}
            label="Shift"
            value={data.senderSchedule?.shift.name}
          />
        </div>
      );

    case "CANCELLATION":
      return (
        <div className="rounded-xl border border-red-100 bg-red-50/50 p-3 dark:border-red-900/20 dark:bg-red-900/20">
          <div className="mb-2 flex items-center gap-2 text-red-600">
            <Ban size={12} />
            <span className="text-[9px] font-bold tracking-wider">
              Ingin Membatalkan Permintaan
            </span>
          </div>
          {data.reference && (
            <div className="scale-95">
              <DetailItem
                icon={<Send size={14} />}
                label="Permintaan"
                value={SUBMISSION_TYPE_LABEL[data.reference.type]}
              />
              <SubmissionTypeInfo
                data={data.reference}
                isIncoming={isIncoming}
              />
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}
