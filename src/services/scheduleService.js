import { apiClient } from "./api-client";

export async function uploadScheduleService(formData) {
  const responseData = await apiClient(`/api/v1/schedules`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  return responseData;
}

export async function getScheduleService({
  year,
  month,
  divisionId,
  positionId,
  date = "",
  employeeId = "",
} = {}) { // Default empty object agar tidak error jika dipanggil tanpa argumen
  
  // Membangun Query Params secara dinamis
  const params = new URLSearchParams({
    year,
    month,
    divisionId,
    positionId,
    date,
    employeeId
  }).toString();

  const responseData = await apiClient(`/api/v1/schedules?${params}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  return responseData;
}

export async function getScheduleDetailService(scheduleId) { 
  
  const responseData = await apiClient(`/api/v1/schedules/${scheduleId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  return responseData;
}
