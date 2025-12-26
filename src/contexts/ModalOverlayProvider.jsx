import { createContext, useContext, useState, useCallback } from "react";
import { X } from "lucide-react";
import Wrapper from "../components/ui/Wrapper";
import Container from "../components/ui/Container";
import Modal from "../components/ui/Modal";

const ModalOverlayContext = createContext();

export const ModalOverlayProvider = ({ children }) => {
  const [modalOverlayConfig, setModalOverlayConfig] = useState({
    isOpen: false,
    content: null,
    title: "",
    description: "",
    size: "md",
  });

  const openModalOverlay = useCallback((content, title = "", description = "", size = "md") => {    
    setModalOverlayConfig({ isOpen: true, content, title, description, size });
  }, []);

  const closeModalOverlay = useCallback(() => {
    setModalOverlayConfig((prev) => ({ ...prev, isOpen: false }));
    // Opsional: Reset content setelah durasi animasi (misal 300ms) agar bersih
    const timeOut = setTimeout(() => {
      setModalOverlayConfig(prev => prev.isOpen ? prev : { ...prev, content: null });
    }, 300);

    return () => clearTimeout(timeOut);
  }, [setModalOverlayConfig]);

  const containerSize = {
    sm: "max-w-md",    // 448px (Cocok untuk alert)
    md: "max-w-2xl",   // 672px (Standard Form)
    lg: "max-w-4xl",   // 896px (Large Form)
    xl: "max-w-6xl",   // 1152px (Data heavy)
    full: "max-w-[95vw]",
  };

  return (
    <ModalOverlayContext.Provider value={{ openModalOverlay, closeModalOverlay }}>
      {children}

      {modalOverlayConfig.isOpen && (
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          {/* Backdrop lebih gelap untuk fokus yang lebih baik */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeModalOverlay}
          />

          <Wrapper className="relative flex min-h-screen items-center justify-center p-4">
            <Container
              className={`w-full ${containerSize[modalOverlayConfig.size] || containerSize.md} animate-in zoom-in-95 duration-200`}
            >              
              {/* Card dengan padding internal yang lebih terkontrol */}
              <Modal {...modalOverlayConfig} onClose={closeModalOverlay}/>
            </Container>
          </Wrapper>
        </div>
      )}
    </ModalOverlayContext.Provider>
  );
};

export const useModalOverlay = () => useContext(ModalOverlayContext);