/** @format */
import { api } from "./api-client";

// Upload Excel Schedule
export async function uploadScheduleService(payload) {
  // Saat mengirim payload, Axios otomatis mengatur header multipart/form-data
  return await api.post("/api/v1/schedules", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// Get schedules with dynamic filters
export async function searchSchedulesService({
  year = null,
  month = null,
  divisionId = null,
  positionId = null,
  date = null,
  ownerId = "",
} = {}) {
  // Axios akan mengubah object params ini menjadi query string:
  // ?year=2024&month=1&divisionId=... (dan mengabaikan yang null/undefined)
  return await api.get("/api/v1/schedules", {
    params: {
      year,
      month,
      divisionId,
      positionId,
      date,
      ownerId,
    },
  });
}

// Get single schedule detail
export async function getScheduleDetailsService(scheduleId) {
  return await api.get(`/api/v1/schedules/${scheduleId}`);
}