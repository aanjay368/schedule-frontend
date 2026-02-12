/** @format */
import { api } from "../../../services/api-client";

export async function getDivisionsService() {
  // Langsung memanggil helper get
  // Axios otomatis menangani header Accept dan pemetaan data melalui interceptor
  return await api.get("/api/v1/divisions");
}