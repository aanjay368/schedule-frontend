/** @format */
import { api } from "./api-client";

// Create a new submission (Backup/Swap/etc)
export async function createSubmissionService(payload) {
  // Axios menangani JSON.stringify secara otomatis
  return await api.post("/api/v1/submissions", payload);
}

// Search or list submissions
export async function searchSubmissionService({ page = 0, name, status, type } = {}) {

  return await api.get("/api/v1/submissions", {
    params: {
      page,      
      name: name || null,
      status: status || null,
      type: type || null,
    },
  });
}

// Get specific submission details
export async function getSubmissionDetailsService(submissionId) {
  return await api.get(`/api/v1/submissions/${submissionId}`);
}

// Perform actions like 'approve', 'reject', or 'cancel'
export async function doSubmissionActionsService(submissionId, action) {
  // Karena ini adalah endpoint POST tanpa body, kita cukup mengirim path-nya saja
  // Axios akan menangani headers Accept & Content-Type dari konfigurasi global
  return await api.post(`/api/v1/submissions/${submissionId}/${action}`);
}