import { FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { getMonthlyScheduleService } from "../../service/scheduleService";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router";

const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

export default function ScheduleTable() {
  const [schedules, setSchedules] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const days = getDaysInMonth(currentMonth);
  const { user } = useUser();
  const { employeeId } = useParams();

  const shiftColors = {
    // AIC shifts
    P:
      user.division === "PORTER"
        ? "bg-white text-red-500 border-red-200"
        : "bg-white text-gray-800 border-gray-200",
    S: "bg-white text-gray-800 border-gray-200",
    L: "bg-gray-900 text-gray-900 border-gray-200",
    // Porter shifts
    O: "bg-[#fcfb08] text-gray-800 border-[#fcfb08]",
    S1: "bg-[#03adfa] text-yellow-800 border-[#03adfa]",
    S2: "bg-white text-gray-800 border-white",
  };

  useEffect(() => {
    getMonthlyScheduleService(user.division, employeeId)
      .then(({ data }) => {
        setSchedules(data);
      })
      .catch(({ message }) => {
        setErrorMessage(message);
      });
  }, []);

  if (schedules.length === 0) {
    return (
      <div className="max-w-98 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-500 dark:bg-slate-800 dark:text-gray-100">
        <div className="p-6">
          <div className="text-center">
            <FileText size={40} className="mx-auto mb-3 text-gray-400" />
            <p className="mt-1 text-sm text-gray-400">{errorMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-98 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-500 dark:bg-slate-800">
      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-500">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="sticky left-0 z-10 bg-gray-50 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:bg-slate-800 dark:text-gray-100">
                  No
                </th>
                <th className="sticky left-10 z-10 bg-gray-50 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:bg-slate-800 dark:text-gray-100">
                  Nickname
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="px-2 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-100"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-slate-800 dark:bg-slate-800">
              {schedules.map((schedule) => (
                <tr
                  key={schedule.number}
                  className="hover:bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-800"
                >
                  <td className="sticky left-0 z-10 bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:bg-slate-800 dark:text-slate-100">
                    {schedule.number}
                  </td>
                  <td className="sticky left-10 z-10 bg-white px-3 py-2 text-sm font-medium text-nowrap text-gray-900 dark:bg-slate-800 dark:text-slate-100">
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
                        className={`border-l border-gray-100 px-2 py-2 text-center text-sm font-medium dark:border-gray-500 ${
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
      <div className="bg-gray-50 p-2 text-center text-xs text-gray-500 md:hidden dark:bg-slate-800 dark:text-gray-300">
        ← Geser ke samping →
      </div>
    </div>
  );
}
