import DatePicker from "react-datepicker";
import { id } from "date-fns/locale";
import { CalendarSearch } from "lucide-react";

export default function DateSelector({ date, handleSelectDate }) {
  return (
    <div className="mx-auto max-w-sm">
      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4">
          <CalendarSearch size={24} className="text-gray-400 transition-colors group-hover:text-purple-500"/>         
        </div>
        <DatePicker
          onChange={handleSelectDate}
          type="date"
          className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 pr-4 pl-12 text-center text-gray-700 shadow-md transition-all duration-300 hover:border-purple-600 hover:shadow-xl focus:border-purple-600 focus:shadow-2xl focus:ring-4 focus:ring-purple-500/20 focus:outline-none dark:border-gray-600 dark:bg-slate-900 dark:text-gray-200"
          selected={date}
          dateFormat={"EEEE, dd MMMM yyyy"}
          locale={id}
          popperPlacement="bottom-start"
        />
      </div>
      <p className="mt-1 text-center text-sm text-gray-500">
        Pilih tanggal untuk melihat jadwal
      </p>
    </div>
  );
}
