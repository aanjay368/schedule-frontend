// React
import { useMemo, memo } from "react";

// Components
import  DataNotFound  from "../ui/DataNotFound";

// Utils
import { groupSchedulesByEmployee } from "../../utils/scheduleUtils";

// Memoized function untuk generate hari dalam bulan
const getDaysInMonth = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

// Memoized function untuk membuat schedule map untuk O(1) lookup
const createScheduleMap = (schedules) => {
  if (!schedules) return new Map();
  const scheduleMap = new Map();
  schedules.forEach((schedule) => {
    const dateParts = schedule.date.split(", ");
    const dayNumber = parseInt(dateParts[1].split(" ")[0], 10); // Ambil "01" -> 1
    scheduleMap.set(dayNumber, schedule);
  });
  return scheduleMap;
};

// Memoized TableCell component untuk mencegah re-render yang tidak perlu
const TableCell = memo(({ schedule, isHoliday }) => {
  return (
    <td
      className={`border-l border-gray-100 px-2 py-2 text-center text-sm font-medium dark:border-slate-700 ${
        isHoliday
          ? "bg-gray-400 text-gray-400"
          : "bg-white text-gray-900 dark:bg-slate-900/20 dark:text-gray-200"
      }`}
    >
      <span className="font-mono text-xs">{schedule?.shift?.label || "-"}</span>
    </td>
  );
});

TableCell.displayName = "TableCell";

// Memoized TableRow component
const TableRow = memo(({ employee, days, scheduleMap }) => {
  return (
    <tr key={employee.id}>
      <td className="bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:bg-slate-900/20 dark:text-slate-200">
        {employee.absentNumber}
      </td>
      <td className="bg-white px-3 py-2 text-sm font-medium text-nowrap text-gray-900 dark:bg-slate-900/20 dark:text-slate-200">
        {employee.fullname || "-"}
      </td>
      {days.map((day) => {
        const schedule = scheduleMap.get(day);
        const isHoliday = schedule?.shift?.label === "L";
        return (
          <TableCell
            key={`${employee.id}-${day}`}
            schedule={schedule}
            isHoliday={isHoliday}
          />
        );
      })}
    </tr>
  );
});

TableRow.displayName = "TableRow";

// Memoized TableBody component
const TableBody = memo(({ processedData, days }) => {
  const scheduleMaps = useMemo(() => {
    return processedData?.map(({ schedules }) => createScheduleMap(schedules));
  }, [processedData]);

  return (
    <tbody className="divide-y divide-gray-200 bg-white dark:divide-slate-700 dark:bg-slate-900/20">
      {processedData?.map(({ employee, schedules }, index) => (
        <TableRow
          key={employee.id}
          employee={employee}
          days={days}
          scheduleMap={scheduleMaps[index]}
        />
      ))}
    </tbody>
  );
});

TableBody.displayName = "TableBody";

// Main ScheduleTable component
function ScheduleTable({ filters, schedules, errorMessage }) {
  const days = useMemo(
    () => getDaysInMonth(filters.year, filters.month),
    [filters.year, filters.month],
  );

  const processedData = useMemo(() => {
    return groupSchedulesByEmployee(schedules);
  }, [schedules]);

  if (errorMessage) {
    return (
      <div className="flex min-h-[40vh] w-full">
        <DataNotFound errorMessage={errorMessage} />
      </div>
    );
  }

  return (
    <div
      className={`inset-0 flex w-full flex-col items-center justify-center shadow-2xl`}
    >
      <div className="w-full overflow-x-scroll">
        <table className="divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50/30 dark:bg-slate-900/20">
            <tr>
              <th className="bg-gray-50/30 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:bg-slate-900/20 dark:text-slate-200">
                No
              </th>

              <th className="bg-gray-50/30 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:bg-slate-900/20 dark:text-slate-200">
                Nama
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-2 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase dark:bg-slate-900/20 dark:text-slate-200"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <TableBody processedData={processedData} days={days} />
        </table>
      </div>
      {/* Scroll indicator for mobile */}
      <div className="sticky z-10 w-full p-2 text-center text-xs text-gray-500">
        ← Scroll ke samping untuk melihat semuanya →
      </div>
    </div>
  );
}

export default memo(ScheduleTable);
