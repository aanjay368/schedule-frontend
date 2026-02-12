import{ api } from "./api-client"
 
export async function updateUserService(payload) {

  return await api.patch("/api/v1/users", payload);
}
