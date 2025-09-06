import AddEmployeeForm from "../components/AddEmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import { useEffect, useState } from "react";
import {
  addEmployeeService,
  deleteEmployeeService,
  getEmployeesService,
  updateEmployeeService,
} from "../../service/employeeService";
import EmployeeManagementLayout from "../layouts/EmployeeManagementLayout";
import EmployeeDetailModal from "../components/EmployeeDetailModal";
import {FileText} from "lucide-react";

export default function EmployeeManagement() {
  const [employeesData, setEmployeesData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    setLoading(loading => !loading)
    getEmployeesService()
      .then((data) => {
        setEmployeesData(data.data);
        // setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        // setLoading(false);
      });
      setLoading(loading => !loading)
  }, []);

  const handleAddEmployee = async (addedEmployee) => {
    try {
      const response = await addEmployeeService(addedEmployee);
      setEmployeesData([response.data, ...employeesData]);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateEmployee = async (updatedField) => {
    try {
      const response = await updateEmployeeService(
        updatedField.id,
        updatedField,
      );

      // Update the local state with the updated employee
      const updatedEmployees = employeesData.map((emp) =>
        emp.id === response.data.id ? response.data : emp,
      );
      setEmployeesData(updatedEmployees);

      setSelectedEmployee(null);
    } catch (err) {
      throw err;
    }
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDeleteEmployee = async (employee) => {
    try {
      const response = await deleteEmployeeService(employee.id);
      // Update the local state with the updated employee
      const updatedEmployees = employeesData.filter(
        (emp) => emp.id !== response.data.id,
      );

      setEmployeesData(updatedEmployees);

      setSelectedEmployee(null);
    } catch (err) {
      throw err;
    }
  };

  if (loading) {
    return (
      <main className="flex h-full flex-col rounded-xl">
        {/* Header */}
        <h1 className="w-1/2 rounded-lg bg-gray-300 text-3xl text-gray-300">
          Management Karyawan
        </h1>
        {/* Header */}
        <div className="flex-1 content-center text-center">
          <span className="p-4">Loading Geting Data . . .</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex h-full flex-col rounded-xl p-8 ">
        {/* Header */}
        <h1 className="w-1/2 bg-gradient-to-r from-blue-600 via-purple-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          Management Karyawan
        </h1>
        {/* Header */}
        <div className="flex-1 content-center text-center">
          <FileText size={40} className="mx-auto mb-3 text-gray-400" />
          <span className="text-gray-400">
            Error: {error}
          </span>
        </div>
      </main>
    );
  }

  return (
    <EmployeeManagementLayout>
      <AddEmployeeForm handleAddEmployee={handleAddEmployee} />
      <EmployeeTable
        employees={employeesData}
        onUpdateEmployee={handleUpdateEmployee}
        onSelect={handleSelectEmployee}
      />
      {selectedEmployee && (
        <EmployeeDetailModal
          employee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          onUpdate={handleUpdateEmployee}
          handleDelete={handleDeleteEmployee}
        />
      )}
    </EmployeeManagementLayout>
  );
}
