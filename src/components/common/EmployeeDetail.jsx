import {
  User,
  Hash,
  LayoutGrid,
  UserCog,
} from "lucide-react";
import {DetailGroup, DetailId} from "../layouts/DataDetailLayout";

export default function EmployeeDetail({ employee }) {
  if (!employee) return null;

  return (
    <div className="w-full space-y-8 py-2">
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-3xl font-bold text-white shadow-inner">
          {employee.nickname?.charAt(0) || employee.fullname?.charAt(0)}
        </div>
        <div className="space-y-1">
          <h2 className="font-extrabold tracking-tight text-slate-800 uppercase xl:text-3xl dark:text-white">
            {employee.fullname}
          </h2>
          <DetailId id={employee.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
        <DetailGroup
          label="Identitas Karyawan"
          items={[
            { icon: <User size={18} />, label: "Nama Panggilan", value: employee.nickname },
            { icon: <User size={18} />, label: "Nama Lengkap", value: employee.fullname },
            { icon: <Hash size={18} />, label: "Nomor Absen", value: employee.absentNumber },
          ]}
        />
        <DetailGroup
          label="Penempatan"
          items={[
            { icon: <LayoutGrid size={18} />, label: "Divisi", value: employee.division?.name },
            { icon: <UserCog size={18} />, label: "Jabatan", value: employee.position?.name },
          ]}
        />
      </div>
    </div>
  );
}
