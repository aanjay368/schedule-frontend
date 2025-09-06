import { Calendar, LogOut, Menu, Settings, User, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";

export default function EmployeeNavbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState();
  const { logout } = useUser();
  const { pathname } = useLocation();
  const [tittle, setTittle] = useState();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    if (pathname.includes("schedule")) {
      setTittle("Schedule");
    } else if (pathname.includes("profile")) {
      setTittle("Profil");
    }
    if (pathname.includes("setting")) {
      setTittle("Pengaturan");
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 h-14 w-full px-4 py-3 transition-all ${scrollY > 0 ? `shadow-md backdrop-blur-sm dark:shadow-sm dark:shadow-white/30 ${menuIsOpen ? "bg-white dark:bg-slate-800" : "bg-white/50 dark:bg-slate-800/50"} ` : `${menuIsOpen ? "bg-white dark:bg-slate-800" : ""} `}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent">
            {tittle}
          </span>
          <div className="hidden gap-4 space-x-4 rounded-xl bg-transparent text-gray-800 md:flex">
            <Link
              to="/emp/schedule"
              className="pl-4 text-purple-600 hover:text-pink-500"
            >
              <span>Schedule</span>
            </Link>
            <Link
              to={`/emp/profile/${user.id}`}
              className="pl-4 text-purple-600 hover:text-pink-500"
            >
              Profile
            </Link>
            {/* <Link
              to="/emp/setting"
              className="pl-4 text-purple-600 hover:text-pink-500"
            >
              Pengaturan
            </Link> */}
            <button
              onClick={() => {
              logout();
              navigate("/");
            }}
              className="pl-4 text-purple-600 hover:text-pink-500"
            >
              Logout
            </button>
          </div>
          <Menu
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className="text-gray-800 md:hidden dark:text-gray-100"
          />
        </div>
      </nav>
      <div
        className={`group transition-all duration-200 md:hidden ${menuIsOpen ? "fixed inset-0 z-40 flex bg-black/15 opacity-100 backdrop-blur-sm" : "opacity-0 backdrop-blur-none"}`}
      >
        <div
          className={`fixed bottom-0 flex w-full transform flex-col gap-8 space-x-4 rounded-t-xl bg-white pt-4 pb-10 transition-all delay-200 duration-500 dark:bg-slate-800 ${menuIsOpen ? "translate-y-0" : "translate-y-80"}`}
        >
          <X
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className="self-end dark:text-gray-100"
          />
          <Link
            onClick={() => setMenuIsOpen(false)}
            to="/emp/schedule"
            className="flex items-center gap-2 pl-4 text-lg text-gray-800 dark:text-gray-100"
          >
            <Calendar />
            Schedule
          </Link>
          <Link
            onClick={() => setMenuIsOpen(false)}
            to={`/emp/profile/${user.id}`}
            className="flex items-center gap-2 pl-4 text-lg text-gray-800 dark:text-gray-100"
          >
            <User />
            Profile
          </Link>
          {/* <Link onClick={() => setMenuIsOpen(false)} to="/emp/setting" className="flex items-center gap-2 pl-4">
            <Settings />
            Pengaturan
          </Link> */}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 pl-4 text-red-500"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
