import UserNavbar from "./StaffNavbar";
import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import CurrentEmployeeProvider from "../../contexts/CurrentEmployeeProvider";
import { useEffect } from "react";
import Wrapper from "../../../../components/ui/Wrapper";

export default function StaffLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <CurrentEmployeeProvider>
      <main className="transition-colors dark:bg-slate-900">
        <UserNavbar />
        <Wrapper className="flex-1 px-4 py-16">
          <Outlet />
        </Wrapper>
        <Footer />
      </main>
    </CurrentEmployeeProvider>
  );
}
