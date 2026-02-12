import { api } from "./api-client";

// Search employees with filters
export async function searchEmployeesService({
  name = "",
  divisionId = null,
  positionId = null,
} = {}) {

  return await api.get("/api/v1/employees", {
    params: {
      name,
      divisionId,
      positionId,
    },
  });
}

// Get single employee details
export async function getEmployeeDetailsService(employeeId) {
  return await api.get(`/api/v1/employees/${employeeId}`);
}

// Get current logged-in employee
export async function getCurrentEmployeeService() {
  return await api.get("/api/v1/employees/current");
}

// Add new employee
export async function addEmployeeService(payload) {
  // Tidak perlu JSON.stringify dan headers manual
  return await api.post("/api/v1/employees", payload);
}

// Update employee
export async function updateEmployeeService(employeeId, payload) {
  return await api.put(`/api/v1/employees/${employeeId}`, payload);
}

// Delete employee
export async function deleteEmployeeService(employeeId) {
  return await api.delete(`/api/v1/employees/${employeeId}`);
}