import { useState, useMemo } from "react";
import EmployeeTotal from "./EmployeeTotal";
import EmployeeFilter from "./EmployeeFilter";

export default function EmployeeTable({ employees, onSelect }) {
  const [employeesFiltered, setEmployeesFiltered] = useState(employees);

  useMemo(() => {
    setEmployeesFiltered(employees);
  }, [employees]);

  const handleFilter = ({ name = "", division = "", position = "" }) => {
    setEmployeesFiltered(
      employees.filter((employee) => {
        if (
          (employee.fullname.toLowerCase().includes(name.toLowerCase()) ||            
            employee.nickname.toLowerCase().includes(name.toLowerCase())) &&
          employee.division.includes(division) &&
          employee.position.includes(position)
        ) {
          return employee;
        }
      }),
    );
  };

  return (
    <>
      <div className="mt-8 flex w-full justify-between">
        <EmployeeTotal employees={employeesFiltered} />{" "}
        <div className="flex">
          <EmployeeFilter handleFilter={handleFilter} />
        </div>
      </div>
      <div className="mt-4 rounded-xl shadow-md">
        <div className="max-h-90 overflow-auto overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 dark:bg-gray-800">
            <thead className="sticky top-0 z-10 bg-gray-200 dark:bg-slate-800">
              <tr>
                <th className="w-52 px-6 py-4 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Nickname
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Fullname
                </th>
                <th className="w-52 px-6 py-4 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Divisi
                </th>
                <th className="w-52 px-6 py-4 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Posisi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
              {employeesFiltered.map((employee) => (
                <tr
                  onClick={() => onSelect(employee)}
                  key={employee.nickname}
                  className="transition-colors hover:bg-gray-100 dark:hover:bg-slate-500"
                >
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-slate-200">
                    {employee.nickname}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-slate-200">
                    {employee.fullname.toUpperCase() || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-slate-200">
                    {employee.division || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-slate-200">
                    {employee.position || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
