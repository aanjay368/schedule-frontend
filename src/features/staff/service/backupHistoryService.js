/** @format */
import { api } from "../../../services/api-client";
// Search or list submissions
export async function searchBackupHitoryService({ page = 0, name, startDate, endDate } = {}) {

   return await api.get("/api/v1/backups/search", {
      params: {
        page,      
        name: name || null,
        startDate: startDate || null,
        endDate: endDate || null,
      },
    });
}