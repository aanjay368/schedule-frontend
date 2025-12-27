import { Link } from "react-router";
import { DetailId, DetailGroup } from "../layouts/DataDetailLayout";
import { Calendar, Clock, Info, RefreshCcw, User } from "lucide-react";
import InfoTip from "../ui/InfoTip";

export default function ScheduleDetail({ schedule }) {
  if (!schedule) return null;

  return (
    <div className="w-full space-y-8 py-2">
      <DetailId id={schedule.id} />

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
        <InfoTip type="info" message="Klik nama Staff untuk detail." />

        <DetailGroup
          label="Informasi Personel"
          className="sm:col-span-2"
          items={[
            {
              icon: <User size={18} />,
              label: "Nama Staff",
              value: (
                <Link
                  to={`/staff/profile/${schedule.employee.id}`}
                  className="transition-colors hover:text-purple-600"
                >
                  {schedule.employee.nickname}
                </Link>
              ),
            },
            {
              icon: <Info size={18} />,
              label: "Catatan",
              value: schedule.notes,
            },
          ]}
        />

        <DetailGroup
          label="Waktu Pelaksanaan"
          items={[
            {
              icon: <Calendar size={18} />,
              label: "Tanggal",
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
