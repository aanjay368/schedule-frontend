import { Link, useLocation } from "react-router";
import { useState } from "react";
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
import { useUser } from "../../context/UserContext";

export default function DeveloperSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useUser();

  const menuItems = [
    {
      title: "Schedule",
      icon: Calendar,
      path: "/dev/schedule",
      active: location.pathname === "/dev/schedule",
    },
    {
      title: "Employee",
      icon: Users,
      path: "/dev/employee",
      active: location.pathname === "/dev/employee",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/dev/analytics",
      active: location.pathname === "/dev/analytics",
    },
    {
      title: "Reports",
      icon: FileText,
      path: "/dev/reports",
      active: location.pathname === "/dev/reports",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dev/settings",
      active: location.pathname === "/dev/settings",
    },
  ];

  return (
    <aside
      className={`relative h-screen border-r border-slate-200/50 bg-gradient-to-b from-slate-50 to-slate-100 transition-all duration-300 ease-in-out dark:border-slate-700/50 dark:from-slate-900 dark:to-slate-800 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="border-b border-slate-200/50 p-6 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
                <UserCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Developer
                </p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
              <UserCircle className="h-6 w-6 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`group flex items-center rounded-lg px-3 py-2.5 transition-all duration-200 ease-in-out ${
                    item.active
                      ? "border-l-4 border-blue-500 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 flex-shrink-0 ${
                      item.active ? "text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="absolute right-0 bottom-0 left-0 border-t border-slate-200/50 p-4 dark:border-slate-700/50">
        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className={`mt-4 flex items-center rounded-lg px-3 py-2.5 text-red-600 transition-all duration-200 ease-in-out hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -right-3 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg transition-all duration-200 ease-in-out hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-400" />
        )}
      </button>
    </aside>
  );
}
