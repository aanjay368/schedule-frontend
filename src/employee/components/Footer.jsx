import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useUser } from "../../context/UserContext";

export default function Footer() {
  const { user } = useUser();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl"></div>
        <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-gradient-to-br from-sky-500/10 to-cyan-500/10 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
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

            <p className="mb-6 max-w-md text-gray-300">
              Jika terjadi masalah bisa langsung hubungi Zainul dengan nomor
              Whatsapp yang sudah tertera di bawah atau juga bisa klik langsung
              ke nomornya. Anda akan akan di arahkan langsung ke Whatsapp
            </p>
          </div>

          {/* Links Sections */}

          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
              Quick Menu
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/emp/schedule"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:translate-x-1 hover:text-white"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  to={`/emp/profile/${user.id}`}
                  className="inline-block text-gray-300 transition-colors duration-300 hover:translate-x-1 hover:text-white"
                >
                  Profil
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Connect Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                Terhubung dengan Zainul:
              </span>
              <a
                className="flex-1 text-sm"
                href="https://wa.me/6281233168341"
                target="_blank"
              >
                +62 812 3316 8341
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Status:</span>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Semua sistem berjalan normal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="text-sm text-gray-400">
              Copyright by Ahmad Zainul Hasan © {currentYear}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
