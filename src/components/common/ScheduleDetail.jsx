import { Calendar, Clock, Hash, Info, RefreshCcw, User } from "lucide-react";
import { Link } from "react-router";
import InfoTip from "../ui/InfoTip";

export default function ScheduleDetail({ schedule }) {
  if (!schedule) return null;

  return (
    <div className="w-full space-y-8 py-2">
      {/* 1. Profil Header: Fokus pada Nama dan ID */}

      <div className="flex items-center gap-2 text-sm text-purple-600 xl:font-medium dark:text-purple-400">
        <Hash className="w-12" />
        <div className="max-w-80 overflow-hidden sm:max-w-full">
          <span className="animate-marquee pl-66 sm:animate-none sm:pl-0">
            {schedule.id}
          </span>
        </div>
      </div>

      {/* 2. Grid Informasi Utama */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
        {/* Identitas */}
        <InfoTip type="info" message="pencet nama Staff untuk melihat detail Staff"/>
        <DetailGroup
          label="Informasi Personel"
          className="sm:col-span-2"
          items={[
            {
              icon: <User size={18} />,
              label: "Nama Staff",
              value: (
                <Link to={`/staff/profile/${schedule.employee.id}`}>
                  {schedule.employee.nickname}
                </Link>
              ),
            },
            {
              icon: <Info size={18} />,
              label: "Catatan Tambahan",
              value:
                schedule.notes || "Tidak ada catatan khusus untuk shift ini.",
            },
          ]}
        />

        {/* Grup Waktu & Tanggal */}
        <DetailGroup
          label="Waktu Pelaksanaan"
          items={[
            {
              icon: <Calendar size={18} />,
              label: "Hari & Tanggal",
              value: schedule.date,
            },
            {
              icon: <RefreshCcw size={18} />,
              label: "Shift",
              value: schedule.shift.name,
            },
            {
              icon: <Clock size={18} />,
              label: "Jam Kerja",
              value: schedule.shift.start
                ? `${schedule.shift.start} - ${schedule.shift.end}`
                : "--:--",
            },
          ]}
        />
      </div>
    </div>
  );
}

/**
 * Komponen pembantu untuk mengelompokkan baris data
 */
function DetailGroup({ label, items, className = "" }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h5 className="border-b border-slate-100 pb-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase dark:border-slate-800">
        {label}
      </h5>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="group flex items-start gap-4">
            <div className="mt-1 text-slate-400 transition-colors group-hover:text-purple-500">
              {item.icon}
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-slate-400">{item.label}</p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 ">
                {item.value || "-"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
