import { handleApiError } from "./errorHandlerService";

// Get all employees
export async function getEmployeesService() {
  try {
    const response = await fetch("/api/v1/employees", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error("Tidak dapat terhubung ke server");
      });

      throw new Error(errorData?.errors);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
}

// Get single employee details
export async function getEmployeeByIdService(employeeId) {
  try {
    const response = await fetch(`/api/v1/employees/${employeeId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error("Tidak dapat terhubung ke server");
      });

      throw new Error(errorData?.errors);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
}

// Add new employee
export async function addEmployeeService(addEmployeeForm) {
  try {
    const response = await fetch(`/api/v1/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addEmployeeForm),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error("Tidak dapat terhubung ke server");
      });

      if (typeof errorData.errors === "object") {
        throw {
          message: errorData.errors,
        };
      }
      throw new Error(errorData.errors);
    }

    return await response.json();
  } catch (error) {  
    return handleApiError(error);
  }
}

// Update employee
export async function updateEmployeeService(employeeId, updateData) {  
  try {
    const response = await fetch(`/api/v1/employees/${employeeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error("Tidak dapat terhubung ke server");
      });  

      throw new Error(errorData.errors);
    } 

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
}

// Delete employee
export async function deleteEmployeeService(employeeId) {
  try {
    const response = await fetch(`/api/v1/employees/${employeeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error("Tidak dapat terhubung ke server");
      });

      throw new Error(errorData.errors);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
}
