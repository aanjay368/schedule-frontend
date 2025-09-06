import DatePicker from "react-datepicker";
import { id } from "date-fns/locale";

export default function DateSelector({ date, handleSelectDate }) {
  return (
    <div className="mt-10">
      <div className="relative mx-auto max-w-sm">
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-gray-400 transition-colors group-hover:text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <DatePicker
            onChange={handleSelectDate}
            type="date"
            className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 pr-4 pl-8 text-center text-lg text-gray-700 shadow-md transition-all duration-300 hover:border-indigo-300 hover:shadow-xl focus:border-indigo-500 focus:shadow-2xl focus:ring-4 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-slate-900 dark:text-gray-200"
            selected={date}
            dateFormat={"EEEE, dd MMMM yyyy"}
            locale={id}
            popperPlacement="bottom-start"
          />
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Pilih tanggal untuk melihat jadwal
        </p>
      </div>
    </div>
  );
}
