import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    // KEMBALIKAN response.data (isinya: { data: [], paging: {} })
    // Ini penting agar informasi pagination dari backend tidak hilang
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const backendMessage = error.response?.data?.errors;

    if (status === 401 || status === 302) {
      localStorage.removeItem("user");
      window.location.replace("/");
      return new Promise(() => {});
    }
    
    const errorPayload = {
      status: status || 500,
      message: backendMessage || "Terjadi kesalahan pada server",
    };

    return Promise.reject(errorPayload);
  }
);

export const api = {
  get: (url, config = {}) => instance.get(url, config),
  post: (url, payload, config = {}) => instance.post(url, payload, config),
  put: (url, payload, config = {}) => instance.put(url, payload, config),
  patch: (url, payload, config = {}) => instance.patch(url, payload, config),
  delete: (url, config = {}) => instance.delete(url, config),
};