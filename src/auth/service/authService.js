/** @format */

export async function loginService(loginForm) {
  const response = await fetch(`/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(loginForm),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => {
      throw new Error("Tidak dapat terhubung ke server");
    });

    if (typeof errorData.errors === "object") {
      throw {
        message: errorData.errors,
      };
    }
    throw new Error(errorData.errors);
  }

  return await response.json();
}

export async function logoutService() {
  fetch(`/api/v1/auth/logout`, {
    method: "DELETE",
  });
}

export async function getCurrentUserService() {
  const response = await fetch("/api/v1/users/current", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => {
      throw new Error("Tidak dapat terhubung ke server");
    });

    throw new Error(errorData.errors);
  }

  return await response.json();
}
