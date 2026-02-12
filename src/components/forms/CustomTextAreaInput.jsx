export default function CustomTextAreaInput({
  name,
  type,
  icon,
  value,
  placeholder,
  onChange,
  hasError,
  maxLength,
}) {
  return (
    <div className="group relative">
      {icon && (
        <div
          className={`pointer-events-none absolute inset-y-1 left-0 flex size-8 items-center pl-3 transition-colors group-focus-within:text-purple-500 ${hasError ? "text-red-500" : "text-slate-400"}`}
        >
          {icon}
        </div>
      )}
      <textarea
        id={name}
        name={name}        
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        value={value}
        className={`block w-full rounded-lg border py-2.5 text-sm min-h-36 placeholder-slate-400 transition-all placeholder:italic focus:ring-2 focus:outline-none ${icon ? "pl-10" : "pl-4"} pr-4 ${
          hasError
            ? "border-red-500 text-red-500 focus:ring-red-500/20 dark:bg-red-500/5"
            : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        } `}
      />      
    </div>
  );
}
