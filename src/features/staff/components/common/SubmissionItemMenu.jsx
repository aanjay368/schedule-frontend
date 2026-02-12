import { ArrowDownLeft, ArrowUpRight, Clock, User } from "lucide-react";
import SubmissionTypeInfo from "./SubmissionTypeInfo"; // Pisahkan logika tipe
import MenuItem from "../../../../components/ui/MenuItem";
import StatusBadge from "../ui/StatusBadge";
import { useCurrentEmployee } from "../../contexts/CurrentEmployeeProvider";
import { DetailItem } from "../../../../components/layouts/DataDetailLayout";
import { SUBMISSION_TYPE_LABEL } from "../../constants/submissionConstants";

export default function SubmissionItemMenu({ data }) {
  const currentEmployee = useCurrentEmployee();
  const isIncoming = data.receiver?.id === currentEmployee?.id;

  return (
    <MenuItem
      to={`/staff/submissions/detail/${data.id}`}
      className="relative space-y-4 p-1"
    >
      <div className="flex items-start justify-between">
        <h4 className="text-[14px] font-black tracking-tight text-slate-800 uppercase dark:text-white">
          {SUBMISSION_TYPE_LABEL[data.type]}
        </h4>
        <div
          className={`flex items-center gap-1 text-[10px] font-black uppercase ${isIncoming ? "text-emerald-600" : "text-indigo-600"}`}
        >
          {isIncoming ? (
            <ArrowDownLeft size={10} />
          ) : (
            <ArrowUpRight size={10} />
          )}
          {isIncoming ? "Masuk" : "Keluar"}
        </div>
      </div>

      <StatusBadge status={data.status} />

      <div className="space-y-3">
        <DetailItem
          icon={<User size={14} />}
          label={isIncoming ? "Dari" : "Ke"}
          value={isIncoming ? data.sender.nickname : data.receiver.nickname}
        />
        {/* Konten dinamis berdasarkan tipe */}
        <SubmissionTypeInfo data={data} isIncoming={isIncoming} />
      </div>

      <div className="flex items-center gap-1 border-t border-slate-50 pt-3 dark:border-slate-800">
        <Clock size={11} className="text-slate-400" />
        <span className="text-[10px] text-slate-400">{data.createdAt}</span>
      </div>
    </MenuItem>
  );
}
