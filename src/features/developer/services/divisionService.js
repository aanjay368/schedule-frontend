import { apiClient } from "../../../services/api-client";

export async function getDivisionsService() {
  const responseData = await apiClient(`/api/v1/divisions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  return responseData;
}
