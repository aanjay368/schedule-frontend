import { Link } from "react-router";
import { useCurrentEmployee } from "../../contexts/CurrentEmployeeProvider";
import { MessageSquare, MessageSquareWarning } from "lucide-react";

export default function Footer() {
  const employee = useCurrentEmployee();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl"></div>
        <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-gradient-to-br from-sky-500/10 to-cyan-500/10 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl space-y-6 px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                <span className="text-lg font-bold text-white">S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Schedule Kerja Lion</h3>
                <p className="text-sm text-gray-400">Manajemen Jadwal Cerdas</p>
              </div>
            </div>

            <p className="max-w-md text-gray-300">
              Jika terjadi masalah atau ingin menambahkan fitur baru bisa
              langsung hubungi pihak Pengembang dengan cara Buat Laporan di
              bawah atau juga bisa lewat Pengaturan.
            </p>
          </div>

          {/* Links Sections */}

          <div className="space-y-3">
            <h4 className="border-b border-slate-700 pl-3 pb-3 text-sm font-semibold tracking-wider text-gray-400 uppercase">
              Quick Menu
            </h4>
            <ul className="space-y-3 pl-3">
              <li>
                <Link
                  to="/staff/schedules"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:translate-x-1 hover:text-white"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  to={`/staff/profile/${employee.id}`}
                  className="inline-block text-gray-300 transition-colors duration-300 hover:translate-x-1 hover:text-white"
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  to={`/staff/settings`}
                  className="inline-block text-gray-300 transition-colors duration-300 hover:translate-x-1 hover:text-white"
                >
                  Pengaturan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Connect Section */}
        <Link className="block border-y border-gray-700 p-4 text-center text-gray-400">
          Buat Laporan
        </Link>

        {/* Bottom Bar */}

        <p className="text-center text-sm text-gray-400">
          Copyright by Ahmad Zainul Hasan © 2025
        </p>
      </div>
    </footer>
  );
}
