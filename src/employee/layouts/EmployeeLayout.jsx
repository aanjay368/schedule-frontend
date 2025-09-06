import UserNavbar from "../components/EmployeeNavbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

export default function EmployeeLayout() {  
  
  return (
    <div className="min-h-screen flex flex-col transition-colors">
      <UserNavbar />
      <main className="flex-1 bg-white">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
