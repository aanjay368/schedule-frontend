import { logoutAndRedirect } from "../contexts/AuthManager";

export const apiClient = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    // Add signal support for AbortController
    signal: options.signal,
  });

  let responseData = null;
  try {
    responseData = await response.json();
  } catch (e) {
    throw { message: "Tidak dapat terhubung ke server" };
  }  

  if (response.status === 401 || response.status === 302) {
    localStorage.removeItem("user");
    window.location.replace("/");

    return new Promise(() => {});
  }

  if (!response.ok) {
    throw { message: responseData.errors };
  }

  return responseData.data;
};
