import {apiClient} from "./api-client";

export async function getEmployeesService() {
  
    const responseData = await apiClient("/api/v1/employees", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    return responseData;

}

// Get single employee details
export async function getEmployeeByIdService(employeeId) {
  
    const responseData = await apiClient(`/api/v1/employees/${employeeId}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    return responseData;

}

export async function getCurrentEmployeeService() {
  
    const responseData = await apiClient(`/api/v1/employees/current`, {
      method: "GET",
    });

    return responseData;
    
}

// Add new employee
export async function addEmployeeService(addEmployeeForm) {
  
    const responseData = await apiClient(`/api/v1/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addEmployeeForm),
    });

    return responseData;
   
}

// Update employee
export async function updateEmployeeService(employeeId, updateData) {
  
    const responseData = await apiClient(`/api/v1/employees/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updateData),
    });

    return responseData;
  
}

// Delete employee
export async function deleteEmployeeService(employeeId) {
  
    const responseData = await apiClient(`/api/v1/employees/${employeeId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    });

    return responseData;
   
}
