import { Link, useLocation, useNavigate } from "react-router";
import { useState, useMemo } from "react";
import {
  Calendar,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  FileText,
  UserCircle,
} from "lucide-react";
import { useAuth } from "../../../../contexts/AuthProvider";

const MENU_ITEMS = [
  { title: "Jadwal Kerja", icon: Calendar, path: "/dev/schedules" },
  { title: "Karyawan", icon: Users, path: "/dev/employees" },
  { title: "Analytics", icon: BarChart3, path: "/dev/analytics" },
  { title: "Reports", icon: FileText, path: "/dev/reports" },
  { title: "Settings", icon: Settings, path: "/dev/settings" },
];

export default function DeveloperSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Memastikan path sesuai dengan rute yang terdaftar

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={`relative flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* 1. Profile Header Section */}
      <div className="mb-2 p-4">
        <div
          className={`flex items-center gap-3 rounded-xl p-2 transition-colors ${
            !isCollapsed ? "bg-slate-50 dark:bg-slate-800/50" : "justify-center"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <UserCircle className="h-6 w-6" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                {user.position.name} User
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user.username}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Navigation Section */}
      <nav className="custom-scrollbar flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-3">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          // Menggunakan startsWith agar parent menu tetap aktif saat di sub-halaman
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center rounded-xl px-3 py-2.5 transition-all duration-200 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-colors ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "group-hover:text-slate-900 dark:group-hover:text-slate-100"
                }`}
              />

              {!isCollapsed && (
                <span className="ml-3 text-sm font-semibold tracking-wide">
                  {item.title}
                </span>
              )}

              {/* Tooltip Khusus saat Sidebar Collapsed */}
              {isCollapsed && (
                <div className="pointer-events-none absolute left-full z-50 ml-4 hidden rounded-md bg-slate-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-xl transition-opacity group-hover:block group-hover:opacity-100">
                  {item.title}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 3. Footer / Logout Section */}
      <div className="border-t border-slate-100 p-4 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className={`group flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-500 transition-all hover:bg-rose-50 dark:hover:bg-rose-500/10 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-1" />
          {!isCollapsed && <span className="ml-3">Keluar</span>}
        </button>
      </div>

      {/* 4. Collapse Toggle Button - Diposisikan melayang di garis pembatas */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-8 -right-3 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:scale-110 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
