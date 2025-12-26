// React Router
import { Link } from "react-router";

// Lucide Icons
import { Users, User as UserIcon } from "lucide-react";

// Utils
import { groupSchedulesByShift } from "../../../../utils/scheduleUtils";

// Menggunakan objek style yang Anda berikan
const shiftStyles = {
  purple: {
    card: "dark:bg-purple-600/20 bg-purple-600/80 dark:border-purple-600/50 text-white",
    label: "bg-purple-700/40 text-white",
    employee: "bg-purple-800/30 border-purple-400/20",
  },
  pink: {
    card: "dark:bg-pink-600/20 bg-pink-600/80 dark:border-pink-600/50 text-white",
    label: "bg-pink-700/40 text-white",
    employee: "bg-pink-800/30 border-pink-400/20",
  },
  indigo: {
    card: "dark:bg-indigo-600/20 bg-indigo-600/80 dark:border-indigo-600/50 text-white",
    label: "bg-indigo-700/40 text-white",
    employee: "bg-indigo-800/30 border-indigo-400/20",
  },
  red: {
    card: "dark:bg-red-600/20 bg-red-600/70 dark:border-red-600/50 text-white",
    label: "bg-red-700/30 text-white",
    employee: "bg-red-800/30 border-red-400/20",
  },
};

export default function DailySchedules({ schedules }) {
  const groupedData = groupSchedulesByShift(schedules);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {groupedData.map((group) => {
        // Ambil style berdasarkan nama warna dari shift. Jika tidak ada, gunakan gray atau purple
        const style = shiftStyles[group.shift?.color?.name] || shiftStyles.gray;

        return (
          <div
            key={group.shift?.id || "off"}
            className={`flex flex-col gap-4 rounded-2xl border p-5 shadow-xl backdrop-blur-sm transition-all hover:scale-[1.02] ${style.card}`}
          >
            {/* Header: Label & Nama Shift */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black shadow-inner ${style.label}`}
                >
                  {group.shift?.label || "L"}
                </div>
                <h3 className="mt-2 text-xl leading-tight font-black tracking-tight uppercase">
                  {group.shift?.name || "Libur / Off"}
                </h3>
              </div>
              <div className="text-right opacity-80">
                <p className="text-[10px] font-bold tracking-widest uppercase">
                  Waktu
                </p>
                <p className="font-mono text-sm font-bold">
                  {group.shift.start
                    ? `${group.shift.start} - ${group.shift.end}`
                    : "--:--"}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-tighter uppercase opacity-80">
              <Users size={14} />
              <span>{group.schedules.length} Personel Bertugas</span>
            </div>

            {/* List Karyawan (Scrollable jika terlalu banyak) */}
            <div className="mt-2 space-y-2 pr-1">
              {group.schedules.map((item) => (
                <Link
                  to={`/staff/schedules/${item.id}`}
                  key={item.id}
                  className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${style.employee}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
                      <UserIcon size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold tracking-wide">
                        {item.employee.nickname}
                      </span>
                      <span className="text-[10px] opacity-70">
                        Absen: {item.employee.absentNumber || "-"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
