// React
import { useEffect, useState } from "react";

// React Router
import { Link, useLocation, useNavigate } from "react-router";

// Lucide Icons
import { Calendar, LogOut, Menu, Settings, User, X } from "lucide-react";

// Contexts
import { useAuth } from "../../../../contexts/AuthProvider";
import { useCurrentEmployee } from "../../contexts/CurrentEmployeeProvider";

export default function StaffNavbar() {
  const employee = useCurrentEmployee();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // 1. Definisikan Menu dalam satu tempat
  const menuItems = [
    {
      label: "Schedule",
      path: "/staff/schedules",
      icon: <Calendar size={20} />,
    },
    {
      label: "Profil",
      path: `/staff/profile/${employee.id}`,
      icon: <User size={20} />,
    },
    {
      label: "Pengaturan",
      path: "/staff/settings",
      icon: <Settings size={20} />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 2. Komponen Reusable untuk NavLink
  const NavItem = ({ item, isMobile = false }) => (
    <Link
      to={item.path}
      onClick={() => isMobile && setMenuIsOpen(false)}
      className={`flex items-center gap-3 transition-colors ${
        isMobile
          ? "text-lg text-gray-800 dark:text-gray-100"
          : `pl-4 ${pathname.includes(item.path) ? "font-bold text-pink-600" : "text-indigo-600 hover:text-pink-500"}`
      }`}
    >
      {isMobile && item.icon}
      <span>{item.label}</span>
    </Link>
  );

  return (
    <>
      <nav
        className={`fixed top-0 z-50 h-14 w-full px-4 py-3 transition-all duration-300 ${
          scrollY > 0
            ? "bg-white/70 shadow-md backdrop-blur-md dark:bg-slate-800/70"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
            {/* Logika Judul Sederhana */}
            {menuItems.find((item) => pathname.includes(item.path.split("/")[2]))?.label ||
              "Dashboard"}
          </span>

          {/* Desktop Navigation */}
          <div className="hidden items-center md:flex">
            {menuItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
            <button
              onClick={handleLogout}
              className="pl-4 text-purple-600 hover:text-pink-500"
            >
              Logout
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="z-50 md:hidden"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            {menuIsOpen ? (
              <X className="dark:text-white" />
            ) : (
              <Menu className="dark:text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          menuIsOpen
            ? "visible bg-black/40 backdrop-blur-sm"
            : "invisible opacity-0"
        }`}
        onClick={() => setMenuIsOpen(false)}
      >
        <div
          className={`fixed bottom-0 flex w-full flex-col gap-6 rounded-t-2xl bg-white px-6 pt-10 pb-12 transition-transform duration-500 dark:bg-slate-900 ${
            menuIsOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((item) => (
            <NavItem key={item.path} item={item} isMobile />
          ))}
          <hr className="border-gray-100 dark:border-slate-800" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-lg text-red-500"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </>
  );
}
