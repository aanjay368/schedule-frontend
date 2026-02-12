/** @format */
import { api } from "../../../services/api-client";

// Get shifts by division and position
export async function getShiftsService(divisionId, positionId) {
  return await api.get("/api/v1/shifts", {
    params: {
      division: divisionId,
      position: positionId
    }
  });
}

// Add new shift
export async function addShiftService(payload) {
  return await api.post("/api/v1/shifts", payload);
}

// Update shift
export async function updateShiftService(shiftId, payload) {
  return await api.put(`/api/v1/shifts/${shiftId}`, payload);
}

// Delete shift
export async function deleteShiftsService(shiftId) {
  return await api.delete(`/api/v1/shifts/${shiftId}`);
}