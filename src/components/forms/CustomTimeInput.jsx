import { useState, useRef, useEffect } from "react";

const CustomTimeInput = ({ name, value, onChange, icon, hasError }) => {
  const [time, setTime] = useState({ hour: "", minute: "" });
  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setTime({ hour: h || "", minute: m || "" });
    }
  }, [value]);

  const handleChange = (e) => {
  const field = e.target.name;
  // Hapus semua karakter non-angka
  let val = e.target.value.replace(/\D/g, ""); 

  // Izinkan user mengetik hingga 2 karakter tanpa batasan angka (0-9 bebas)
  if (val.length <= 2) {
    setTime((prev) => ({ ...prev, [field]: val }));
    
    // Auto-focus ke menit hanya jika jam sudah terisi 2 angka (misal: "12" atau "09")   
  }
};

const handleBlur = () => {
  // Ambil nilai saat ini, jika kosong gunakan "0"
  let h = time.hour || "0";
  let m = time.minute || "0";

  // 1. Konversi ke Integer untuk pengecekan batas
  let hNum = parseInt(h, 10);
  let mNum = parseInt(m, 10);

  // 2. Validasi Nilai Maksimal (Clamping)
  if (hNum > 23) hNum = 23;
  if (mNum > 59) mNum = 59;

  // 3. Format ulang ke String dengan Padding (09, 05, dll)
  const finalH = String(hNum).padStart(2, "0");
  const finalM = String(mNum).padStart(2, "0");

  // 4. Update State Internal
  setTime({ hour: finalH, minute: finalM });

  // 5. Kirim ke Parent
  if (onChange) {
    onChange({
      target: { name, value: `${finalH}:${finalM}` },
    });
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ":" || e.key === " ") {
      e.preventDefault();
      minuteRef.current.focus();
    }
    if (
      e.key === "Backspace" &&
      e.target.value.length === 0 &&
      e.target.name === "minute"
    ) {
      hourRef.current.focus();
    }
  };

  return (
    <div className="group relative w-full">
      <div
        className={`flex w-full items-center rounded-lg border py-2.5 transition-all focus-within:ring-2 ${
          hasError
            ? "border-red-500 focus-within:ring-red-200 dark:bg-red-500/5"
            : "border-slate-200 focus-within:border-purple-500 focus-within:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-800"
        } `}
      >
        {/* Icon Sisi Kiri */}
        {icon && (
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors ${hasError ? "text-red-500" : "text-slate-400 group-focus-within:text-purple-500"} `}
          >
            {icon}
          </div>
        )}

        {/* Container Input */}
        <div
          className={`flex flex-1 items-center justify-center ${icon ? "pl-6" : ""}`}
        >
          <input
            name="hour"
            ref={hourRef}
            type="text"
            inputMode="numeric"
            value={time.hour}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="00"
            className="w-10 bg-transparent text-center text-sm font-semibold outline-none placeholder:text-slate-400 dark:text-white"
          />
          <span
            className={`mx-0.5 text-sm font-bold ${hasError ? "text-red-400" : "text-slate-400 dark:text-white"}`}
          >
            :
          </span>
          <input
            name="minute"
            ref={minuteRef}
            type="text"
            inputMode="numeric"
            value={time.minute}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="00"
            className="w-10 bg-transparent text-center text-sm font-semibold outline-none placeholder:text-slate-400 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomTimeInput;
