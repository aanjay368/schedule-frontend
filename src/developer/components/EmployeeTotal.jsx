export default function EmployeeTotal({ employees }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Karyawan
      </h2>
      <p className="text-gray-400">
        {employees.length} karyawan
      </p>
    </div>
  );
}
