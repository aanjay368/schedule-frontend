import UserNavbar from "./StaffNavbar";
import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import CurrentEmployeeProvider from "../../contexts/CurrentEmployeeProvider";
import {useEffect} from "react";

export default function StaffLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({top:0, behavior: "smooth"});
  }, [pathname]);

  return (
    <CurrentEmployeeProvider>
      <div className="flex flex-col transition-colors">
        <UserNavbar />
        <div className="flex-1 px-4 py-16 dark:bg-slate-900 transition-colors">
          <Outlet />
        </div>
        <Footer />
      </div>
    </CurrentEmployeeProvider>
  );
}
