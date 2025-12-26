import { apiClient } from "../../../services/api-client";

// Get shifts by division and position
export async function getColorsService() {
  
    const responseData = await apiClient(
      `/api/v1/shifts/colors`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );
    return responseData;

}

// Get shifts by division and position
export async function getShiftsService(divisionId, positionId) {
  
    const responseData = await apiClient(
      `/api/v1/shifts?division=${divisionId}&position=${positionId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );
    return responseData;

}

// Add new shift
export async function addShiftService(addShiftForm) {
  
    const responseData = await apiClient(`/api/v1/shifts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addShiftForm),
    });
    return responseData;
  
}

// Update shift
export async function updateShiftService(shiftId, addShiftForm) {
  
    const responseData = await apiClient(`/api/v1/shifts/${shiftId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addShiftForm),
    });
    return responseData;
  
}

// Delete shift
export async function deleteShiftsService(shiftId) {
  
    const responseData = await apiClient(`/api/v1/shifts/${shiftId}`, {
      method: "DELETE",
      headers: {        
        "Accept": "application/json",
      }      
    });
    return responseData;
  
}
