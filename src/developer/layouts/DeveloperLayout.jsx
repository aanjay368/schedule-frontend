import DeveloperSidebar from "../components/DeveloperSidebar";
import { Outlet } from "react-router";

export default function DeveloperLayout() {
  return (
    <div className="flex h-screen">
      <DeveloperSidebar />
      <main className="flex-1 overflow-y-auto dark:bg-slate-900 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
