import DeveloperSidebar from "./DeveloperSidebar";
import { Outlet } from "react-router";
import Wrapper from "../../../../components/ui/Wrapper";
import DivisionsProvider from "../../contexts/DivisionsProvider";
import { ModalOverlayProvider } from "../../../../contexts/ModalOverlayProvider";

export default function DeveloperLayout() {
  return (
    <DivisionsProvider>      
        <ModalOverlayProvider>
          <main className="flex h-screen overflow-hidden bg-slate-50 transition-colors dark:bg-slate-900">
            <DeveloperSidebar />
            {/* Wrapper digunakan sebagai area konten utama agar transisi smooth */}
            <Wrapper className="h-full flex-1 overflow-y-auto py-6">
              <Outlet />
            </Wrapper>
          </main>
        </ModalOverlayProvider>
    </DivisionsProvider>
  );
}
