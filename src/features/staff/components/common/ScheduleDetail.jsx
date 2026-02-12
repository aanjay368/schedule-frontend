import { Link } from "react-router";
import {
  DetailId,
  DetailGroup,
  DetailItem,
} from "../../../../components/layouts/DataDetailLayout";
import {
  ArrowRightLeft,
  Calendar,
  Clock,  
  RefreshCcw,
  User,
} from "lucide-react";
import InfoTip from "../../../../components/ui/InfoTip";

export default function ScheduleDetail({ schedule }) {
  if (!schedule) return null;

  return (
    <div className="w-full space-y-8 py-2">
      <DetailId id={schedule.id} />
      <InfoTip
        type="info"
        message="tekan pada karyawan untuk melihat detail karyawan"
      />
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
        <DetailGroup label="Detail Karyawan">
          {schedule.owner.id === schedule.filler.id ? (
            <DetailItem
              icon={<User size={20} />}
              label="Karyawan"
              value={schedule.owner.nickname}
              link={`/staff/profile/${schedule.owner.id}`}
            />
          ) : (
            <>              
                <DetailItem
                  icon={<User size={20} />}
                  label="Pemilik"
                  value={schedule.owner.nickname}
                  link={`/staff/profile/${schedule.owner.id}`}
                />
                <DetailItem
                  icon={<User size={20} />}
                  label="Pengisi"
                  value={schedule.filler.nickname}
                  link={`/staff/profile/${schedule.filler.id}`}
                />
            </>
          )}
          <DetailItem
            icon={<ArrowRightLeft size={20} className="text-slate-400" />}
            label="Perubahan"
            value={
              schedule.histories.length > 0 ? (
                schedule.histories.map((history, idx) => (
                  <p key={idx}>{history}</p>
                ))
              ) : (
                <p>Belum ada perubahan</p>
              )
            }
          />
        </DetailGroup>
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
