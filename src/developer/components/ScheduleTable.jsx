import { Calendar, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { getMonthlyScheduleService } from "../../service/scheduleService";
import LoadingAnimation from "../../components/LoadingAnimation";

const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

export default function ScheduleTable({ division }) {
  const [schedules, setSchedules] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const days = getDaysInMonth(currentMonth);

  const shiftColors = {
    // AIC shifts
    P: division === "PORTER" ? "bg-white text-red-500 border-red-200" : "bg-white text-gray-800 border-gray-200",
    S: "bg-white text-gray-800 border-gray-200",
    L: "bg-gray-900 text-gray-900 border-gray-200",
    // Porter shifts
    O: "bg-[#fcfb08] text-gray-800 border-[#fcfb08]",
    S1: "bg-[#03adfa] text-yellow-800 border-[#03adfa]",
    S2: "bg-white text-gray-800 border-white",
  };

  useEffect(() => {    
    setIsLoading(isLoading => !isLoading);
    setErrorMessage("")
    getMonthlyScheduleService(division)
      .then(({ data }) => {        
        setSchedules(schedules => data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      }).finally(() => {
        setIsLoading(isLoading => !isLoading);
      });          
  }, [division]);

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white shadow-sm dark:bg-slate-800">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar
                size={16}
                className="text-gray-500 dark:text-gray-200"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {schedules.length} employee{schedules.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center py-8 text-center">
            <LoadingAnimation />
          </div>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-lg bg-white shadow-sm dark:bg-slate-800">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar
                size={16}
                className="text-gray-500 dark:text-gray-200"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {schedules.length} employee{schedules.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="py-8 text-center">
            <FileText size={40} className="mx-auto mb-3 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-200">{errorMessage}</p>
            <p className="mt-1 text-sm text-gray-400">
              Upload a CSV file to load employee schedules
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="mb-2 flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Calendar
                size={16}
                className="text-gray-500 dark:text-gray-200"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {schedules.length} employee{schedules.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="sticky left-0 z-10 bg-gray-50 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:bg-slate-800 dark:text-slate-200">
                  No
                </th>
                <th className="sticky left-10 z-10 bg-gray-50 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:bg-slate-800 dark:text-slate-200">
                  Nickname
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="px-2 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-slate-200"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-slate-700 dark:bg-slate-800">
              {schedules?.map((schedule) => (
                <tr
                  key={schedule.number}                  
                >
                  <td className="sticky left-0 z-10 bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:bg-slate-800 dark:text-slate-200">
                    {schedule.number}
                  </td>
                  <td className="sticky left-10 z-10 bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:bg-slate-800 dark:text-slate-200 text-nowrap">
                    {schedule.nickname.includes("KOSONG") ? "" : schedule.nickname}
                  </td>
                  {days.map((day) => {
                    const detail = schedule.details.find(
                      (detail) => detail.date == day,
                    );
                    const shift = detail ? detail.shift : "-";
                    return (
                      <td
                        key={`${schedule.number}-${day}`}
                        className={`border-l border-gray-100 px-2 py-2 text-center text-sm font-medium dark:border-slate-700 ${
                          shift ? shiftColors[shift] || "bg-white" : ""
                        }`}
                      >
                        <span className="font-mono text-xs">
                          {shift || "-"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scroll indicator for mobile */}
      <div className="bg-gray-50 p-2 text-center text-xs text-gray-500 md:hidden">
        ← Scroll horizontally to see all days →
      </div>
    </div>
  );
}
