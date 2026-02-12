import { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval,
  parseISO,
  isValid
} from "date-fns";
import { id } from "date-fns/locale";

export default function CustomDateSelectInput({
  name,
  label,
  value, // Bisa menerima String (YYYY-MM-DD) atau Date Object
  onChange,
  hasError,
  pattern = "dd MMMM yyyy",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const containerRef = useRef(null);

  // Normalisasi value ke Date Object untuk kebutuhan internal kalender
  const dateValue = useMemo(() => {
    if (!value) return null;
    const parsed = typeof value === "string" ? parseISO(value) : value;
    return isValid(parsed) ? parsed : null;
  }, [value]);

  // ViewDate mengontrol bulan yang sedang ditampilkan di UI kalender
  const [viewDate, setViewDate] = useState(dateValue || new Date());

  // Generate grid hari (termasuk padding awal/akhir minggu)
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [viewDate]);

  // Label teks yang tampil pada tombol input
  const displayLabel = useMemo(() => {
    if (!dateValue) return `Pilih ${label}`;
    return format(dateValue, pattern, { locale: id });
  }, [dateValue, pattern, label]);

  // Smart Positioning Logic
  useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setOpenUp(window.innerHeight - rect.bottom < 340);
    }
  }, [isOpen]);

  // Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (day) => {
    if (onChange) {
      // Mengirimkan objek Date asli sesuai permintaanmu
      onChange({ 
        target: { 
          name: name, 
          value: day // Ini adalah Javascript Date Object
        } 
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="group relative w-full" ref={containerRef}>
      {/* Input Display */}
      <div className="relative flex items-center">
        <div className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors ${
          hasError ? "text-red-500" : "text-slate-400 group-focus-within:text-purple-500"
        }`}>
          <CalendarIcon size={18} />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`block w-full rounded-lg border py-2.5 pl-10 pr-10 text-left text-sm transition-all focus:ring-2 focus:outline-none ${
            hasError
              ? "border-red-500 focus:ring-red-200 dark:bg-red-500/5 dark:text-red-400"
              : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          }`}
        >
          <span className={`truncate ${!dateValue && hasError ? "text-red-500 italic" : !dateValue ? "text-slate-400 italic" : hasError ? "text-red-500" : "text-slate-900 dark:text-white"}`}>
            {displayLabel}
          </span>
        </button>      
      </div>

      {/* Calendar Panel */}
      {isOpen && (
        <div className={`absolute z-50 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900
            ${openUp ? "bottom-full mb-2 animate-in fade-in zoom-in-95" : "top-full mt-2 animate-in fade-in zoom-in-95"}`}>
          
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={() => setViewDate(subMonths(viewDate, 1))} className="rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ChevronLeft size={20} className="text-slate-500" />
            </button>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 capitalize">
              {format(viewDate, "MMMM yyyy", { locale: id })}
            </span>
            <button type="button" onClick={() => setViewDate(addMonths(viewDate, 1))} className="rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ChevronRight size={20} className="text-slate-500" />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-[10px] font-bold uppercase text-slate-400 mb-2">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => <div key={d}>{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              const isSelected = dateValue && isSameDay(day, dateValue);
              const isCurrentMonth = isSameMonth(day, viewDate);

              if (!isCurrentMonth) {
                return <div key={idx} className="h-8 w-full" />;
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleDateClick(day)}
                  className={`h-8 w-full text-xs rounded-lg transition-all flex items-center justify-center
                    ${isSelected 
                      ? "bg-purple-500 text-white font-bold" 
                      : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/30"}`}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}