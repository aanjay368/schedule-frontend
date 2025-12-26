import { apiClient } from "./api-client";

export async function updateUserService(payload) {
  const responseData = await apiClient("/api/v1/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  return responseData;
}