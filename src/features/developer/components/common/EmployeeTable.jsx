import { User, ChevronRight, UserCog, LayoutGrid } from "lucide-react";
import DataNotFound from "../../../../components/ui/DataNotFound";
// Menggunakan komponen yang kita perbaiki tadi

export default function EmployeeTable({
  employees,  
  onSelect,
  errorMessage,
}) {
  // 1. Filter Lokal untuk Nama (agar pencarian terasa instan/real-time)  

  if (errorMessage) {
    return <div className="p-8 text-center text-red-500">{errorMessage}</div>;
  }

  if (employees.length === 0) {
    return <DataNotFound errorMessage="Karyawan tidak ditemukan." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        {/* Header Tabel */}
        <thead className="sticky top-0 z-10 bg-slate-50 text-slate-600 dark:bg-slate-900/50 dark:text-slate-400">
          <tr className="border-b border-slate-200 dark:border-slate-800">
            <th className="px-1 py-4 text-center font-semibold tracking-wider uppercase">
              No
            </th>
            <th className="px-6 py-4 font-semibold tracking-wider uppercase">
              Karyawan
            </th>
            
            <th className="px-6 py-4 text-start font-semibold tracking-wider uppercase">
              Divisi
            </th>
            <th className="px-6 py-4 text-start font-semibold tracking-wider uppercase">
              Posisi
            </th>
            <th className="px-6 py-4 text-right font-semibold tracking-wider uppercase">
              Show
            </th>
          </tr>
        </thead>

        {/* Body Tabel */}
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              onClick={() => onSelect(employee)}
              className="group cursor-pointer transition-colors hover:bg-purple-50/50 dark:hover:bg-slate-900/30"
            >
              {/* Nomor Absen */}
              <td className="px-1 py-4 text-center">
                <span className=" bg-slate-100 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">                  
                  {employee.absentNumber || "-"}
                </span>
              </td>

              {/* Profil Karyawan */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 uppercase dark:text-white">
                      {employee.nickname}
                    </p>
                    <p className="text-xs text-slate-500">
                      {employee.fullname}
                    </p>
                  </div>
                </div>
              </td>

              {/* Divisi */}
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-start gap-4 text-slate-500">
                  <LayoutGrid size={20} />
                  <span>{employee.division.name || "-"}</span>
                </div>
              </td>

              {/* Posisi */}
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-start gap-4 text-slate-500">
                  <UserCog size={20} />
                  <span>{employee.position.name || "-"}</span>
                </div>
              </td>

              {/* Aksi/Detail */}
              <td className="px-6 py-4 text-right">
                <button className="inline-flex justify-start items-center gap-1 font-semibold text-purple-600 transition-all group-hover:translate-x-1 dark:text-purple-400">
                  Detail
                  <ChevronRight size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
