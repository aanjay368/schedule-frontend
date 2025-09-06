import { handleApiError } from "./errorHandlerService";

export async function uploadScheduleService(formData, division) {
  try {
    const response = await fetch(`/api/v1/schedules?division=${division}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error("Tidak dapat terhubung ke server");
      });
      console.log(errorData) 
      throw new Error(errorData?.errors);
    }

    return await response.json();
  } catch (error) {    
    return handleApiError(error);
  }
}

export async function getMonthlyScheduleService(
  division,  
  employeeId = null,
  month = new Date().getMonth() + 1
) {
  try {
    const response = await fetch(
      `/api/v1/schedules/monthly?month=${month}&division=${division}&employeeId=${employeeId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error("Tidak dapat terhubung ke server");
      });        
      throw new Error(errorData?.errors);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getDailyScheduleService(
  date,
  division,
) {
  try {
    const response = await fetch(
      `/api/v1/schedules/daily?date=${date}&division=${division}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error("Tidak dapat terhubung ke server");
      });        
      throw new Error(errorData?.errors);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
}
