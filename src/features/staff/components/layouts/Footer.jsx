import { Link } from "react-router";
import { useCurrentEmployee } from "../../contexts/CurrentEmployeeProvider";

// --- Sub-Komponen Pendukung ---
const NavLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-gray-400 transition-all hover:translate-x-1 hover:text-indigo-400 block">
      {children}
    </Link>
  </li>
);

const BackgroundDecoration = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -left-40 h-80 w-full rounded-full bg-indigo-500/15 blur-3xl" />
    <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
  </div>
);

// --- Komponen Utama ---
export default function Footer() {
  const employee = useCurrentEmployee();

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      <BackgroundDecoration />

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 font-bold">S</div>
              <h3 className="text-lg font-bold">Schedule Kerja Lion</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Manajemen jadwal cerdas. Buat laporan untuk fitur baru atau kendala sistem.
            </p>
          </div>

          {/* Quick Menu */}
          <div className="lg:justify-self-center">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">Quick Menu</h4>
            <ul className="space-y-2 text-sm">
              <NavLink to="/staff/schedules">Schedule</NavLink>
              <NavLink to={`/staff/profile/${employee?.id}`}>Profil</NavLink>
              <NavLink to="/staff/settings">Pengaturan</NavLink>
            </ul>
          </div>

          {/* Report Action */}
          <div className="flex flex-col justify-center">
            <Link to="/staff/report" className="rounded-xl border border-gray-800 bg-gray-800/40 p-4 text-center transition-hover hover:border-indigo-500/50">
              <span className="text-sm text-gray-300">Butuh Bantuan? <b className="text-indigo-400">Buat Laporan</b></span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>Copyright © 2025 Ahmad Zainul Hasan • v1.0.4</p>
        </div>
      </div>
    </footer>
  );
}