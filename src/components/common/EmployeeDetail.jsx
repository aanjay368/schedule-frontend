import {
  User,
  Hash,
  Mail,
  Smartphone,
  LayoutGrid,
  UserCog,
} from "lucide-react";

export default function EmployeeDetail({ employee }) {
  if (!employee) return null;

  return (
    <div className="w-full space-y-8 py-2">
      {/* 1. Profil Header: Fokus pada Nama dan ID */}
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-3xl font-bold text-white shadow-inner xl:h-24 xl:w-24 xl:rounded-3xl">
          {employee.nickname?.charAt(0) || employee.fullname?.charAt(0)}
        </div>
        <div className="space-y-1 text-nowrap ">
          <h2 className="font-extrabold tracking-tight text-slate-800 uppercase xl:text-3xl dark:text-white">
            {employee.fullname}
          </h2>
          <div className="flex items-center gap-2 text-sm text-purple-600 xl:font-medium dark:text-purple-400">
            <Hash size={16} />
            <div className="overflow-hidden max-w-35 xl:max-w-70">
              <span className="px-70 marquee sm:animate-none sm:transform-none">{employee.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Grid Informasi Utama */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
        {/* Identitas */}
        <DetailGroup
          label="Identitas Karyawan"
          items={[
            {
              icon: <User size={18} />,
              label: "Nama Panggilan",
              value: employee.nickname,
            },
            {
              icon: <User size={18} />,
              label: "Nama Lengkap",
              value: employee.fullname,
            },
            {
              icon: <Hash size={18} />,
              label: "Nomor Absen",
              value: employee.absentNumber,
            },
          ]}
        />

        {/* Struktur Organisasi */}
        <DetailGroup
          label="Penempatan"
          items={[
            {
              icon: <LayoutGrid size={18} />,
              label: "Divisi",
              value: employee.division?.name,
            },
            {
              icon: <UserCog size={18} />,
              label: "Jabatan / Posisi",
              value: employee.position?.name,
            },
          ]}
        />

        {/* Kontak (Jika ada data email/telepon di objek employee Anda) */}
        <DetailGroup
          label="Informasi Kontak"
          className="sm:col-span-2"
          items={[
            {
              icon: <Mail size={18} />,
              label: "Alamat Email",
              value: employee.email || "-",
            },
            {
              icon: <Smartphone size={18} />,
              label: "Nomor WhatsApp",
              value: employee.phone || "-",
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
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {item.value || "-"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
