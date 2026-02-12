// React
import { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";

// Lucide Icons
import { ChevronDown } from "lucide-react";

export default function CustomSelectInput({
  name,
  label,
  icon,
  options = [],
  value,
  placeholder,
  onChange,
  hasError,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false); // State untuk arah
  const containerRef = useRef(null);

  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === value);
  }, [options, value]);

  // --- LOGIKA SMART POSITIONING ---
  useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Estimasi tinggi dropdown (max-h-60 adalah 240px + border/padding)
      const dropdownHeight = 260; 

      // Hitung sisa ruang di bawah
      const spaceBelow = viewportHeight - rect.bottom;

      // Jika ruang di bawah kurang dari tinggi dropdown, maka buka ke atas
      if (spaceBelow < dropdownHeight) {
        setOpenUp(true);
      } else {
        setOpenUp(false);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    if (onChange) {
      onChange({ target: { name: name, value: option.value } });
    }
    setIsOpen(false);
  };

  return (
    <div className="group relative w-full" ref={containerRef}>
      {/* Container Input */}
      <div className="relative flex items-center">
        {icon && (
          <div
            className={`pointer-events-none absolute inset-y-1 left-0 flex size-8 items-center pl-3 transition-colors ${hasError ? "text-red-500" : "text-slate-400 group-focus-within:text-purple-500"} `}
          >
            {selectedOption?.icon ? selectedOption.icon : icon}
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`block w-full rounded-lg border py-2.5 text-left text-sm transition-all focus:ring-2 focus:outline-none ${icon ? "pl-10" : "pl-4"} pr-10 ${
            hasError
              ? "border-red-500 focus:ring-red-200 dark:bg-red-500/5 dark:text-red-400"
              : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          } `}
        >
          <span
            className={`truncate ${hasError ? "text-red-500" : !selectedOption ? "text-slate-400 italic" : "text-slate-900 dark:text-white"}`}
          >
            {selectedOption ? selectedOption.label : placeholder ? placeholder  :`Pilih ${label}`}
          </span>
        </button>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown
            size={18}
            className={`transition-all duration-200 ${hasError ? "text-red-400" : "text-slate-400 group-focus-within:text-purple-500"} ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Dropdown Panel dengan Kondisi Arah */}
      {isOpen && (
        <ul 
          className={`ring-opacity-5 absolute z-50 w-full overflow-auto rounded-xl border border-slate-200 bg-white ring-1 ring-black focus:outline-none dark:border-slate-800 dark:bg-slate-900 max-h-60 duration-100
            ${
              openUp 
                ? "bottom-full mb-2 animate-in fade-in zoom-in-95 slide-in-from-bottom-2" // Buka ke atas
                : "top-full mt-2 animate-in fade-in zoom-in-95 slide-in-from-top-2"     // Buka ke bawah
            }
          `}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  option.value === value
                    ? "bg-purple-500 text-white"
                    : "text-slate-600 hover:bg-purple-600 hover:text-white dark:text-slate-300"
                } `}
              >
                <span className={`truncate ${option.value === value ? "font-bold" : "font-medium"}`}>
                  {option.label}
                </span>
                {option.icon && <span className="ml-2">{option.icon}</span>}
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-center text-sm text-slate-400 italic">
              Tidak ada Data
            </li>
          )}
        </ul>
      )}
    </div>
  );
}