/** @format */
import { api } from "./api-client";

export async function loginService(payload) {
  return await api.post("/api/v1/auth/login", payload);
}

export async function logoutService() {
  return await api.post("/api/v1/auth/logout");
}
