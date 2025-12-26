// React
import { useState } from "react";

// Lucide Icons
import { Eye, EyeOff } from "lucide-react";

export default function CustomTextInput({
  name,
  type,
  icon,
  value,
  placeHolder,
  onChange,
  hasError,
}) {
  const [visiblePasswords, setVisiblePasswords] = useState(false);
  return (
    <div className="group relative">
      {icon && (
        <div
          className={`pointer-events-none absolute inset-y-1 left-0 flex size-8 items-center pl-3 transition-colors group-focus-within:text-purple-500 ${hasError ? "text-red-500" : "text-slate-400"}`}
        >
          {icon}
        </div>
      )}
      <input
        id={name}
        name={name}
        type={type === "password" && visiblePasswords ? "text" : type}
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
        className={`block w-full rounded-lg border py-2.5 text-sm transition-all placeholder:text-slate-500 placeholder:italic  focus:ring-2 focus:outline-none  ${icon ? "pl-10" : "pl-4"} pr-4 ${
          hasError
            ? "border-red-500 text-red-500 focus:ring-red-500/20 dark:bg-red-500/5"
            : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        } `}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setVisiblePasswords(!visiblePasswords)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 group-focus-within:text-purple-500 hover:text-purple-500"
        >
          {visiblePasswords ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}
