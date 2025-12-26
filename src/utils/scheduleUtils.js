/**
 * Mengelompokkan data schedule berdasarkan Employee
 * @param {Array} schedules - List datar ScheduleResponse dari backend
 * @returns {Array} List MonthlyScheduleResponse (Employee + Array of Schedules)
 */
export const groupSchedulesByEmployee = (schedules) => {
  if (!schedules || !Array.isArray(schedules)) return [];

  const grouped = schedules.reduce((acc, schedule) => {
    const employeeId = schedule.employee.id;

    if (!acc[employeeId]) {
      acc[employeeId] = {
        employee: schedule.employee, // Menyimpan objek EmployeeResponse lengkap
        schedules: [],
      };
    }

    acc[employeeId].schedules.push(schedule);
    return acc;
  }, {});

  // Ubah objek menjadi array dan urutkan berdasarkan Absent Number
  return Object.values(grouped).sort((a, b) => {
    const numA = parseInt(a.employee.absentNumber) || 0;
    const numB = parseInt(b.employee.absentNumber) || 0;
    return numA - numB;
  });
};

/**
 * Mengelompokkan data schedule berdasarkan Shift dan mengurutkan kelompok tersebut
 * @param {Array} schedules - List datar ScheduleResponse
 * @returns {Array} List GroupedShift (Shift + Array of Schedules) terurut berdasarkan waktu
 */
export const groupSchedulesByShift = (schedules) => {
  if (!schedules || !Array.isArray(schedules)) return [];

  const grouped = schedules.reduce((acc, schedule) => {
    // Gunakan ID shift sebagai key, atau "OFF" jika shift null
    const shiftId = schedule.shift?.id || "OFF";

    if (!acc[shiftId]) {
      acc[shiftId] = {
        shift: schedule.shift, // Objek shift lengkap (bisa null jika OFF)
        schedules: [],
        // Simpan jam mulai untuk sorting kelompok nanti
        startTime: schedule.shift?.start || null, 
      };
    }

    acc[shiftId].schedules.push(schedule);
    return acc;
  }, {});

  // Ubah objek ke array dan urutkan kelompoknya
  return Object.values(grouped).sort((a, b) => {
    const startA = a.startTime;
    const startB = b.startTime;

    // Shift tanpa jam mulai (OFF/Libur) ditaruh paling bawah
    if (startA === null && startB === null) return 0;
    if (startA === null) return 1;
    if (startB === null) return -1;

    return startA.localeCompare(startB);
  });
};
