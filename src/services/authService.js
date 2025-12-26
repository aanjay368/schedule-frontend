/** @format */

import { apiClient } from "./api-client";

export async function loginService(loginForm) {
  const responseData = await apiClient("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(loginForm),
  });
  return responseData;
}

export async function logoutService() {
  apiClient("/api/v1/auth/logout");
}

