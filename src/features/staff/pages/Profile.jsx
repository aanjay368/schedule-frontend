import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, FileText } from "lucide-react";

import { getEmployeeByIdService } from "../../../services/employeeService";
import { getScheduleService } from "../../../services/scheduleService";

import EmployeeDetail from "../../../components/common/EmployeeDetail";
import LoadingAnimation from "../../../components/ui/LoadingAnimation";
import ScheduleTable from "../../../components/common/ScheduleTable";
import { useCurrentEmployee } from "../contexts/CurrentEmployeeProvider";
import BackButton from "../../../components/common/BackButton";
import Container from "../../../components/ui/Container";
import DetailHeader from "../../../components/ui/DetailHeader";

export default function Profile() {
  const { employeeId } = useParams();
  const currentEmployee = useCurrentEmployee();
  const [employee, setEmployee] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Konsistensi waktu dalam satu render cycle
  const { currentYear, currentMonth } = useMemo(() => {
    const now = new Date();
    return {
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth() + 1,
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");

    // 1. Tentukan sumber data profil (Context vs API)
    const employeePromise =
      employeeId === currentEmployee?.id
        ? Promise.resolve(currentEmployee)
        : getEmployeeByIdService(employeeId);

    employeePromise
      .then((data) => {
        setEmployee(data);

        // 2. Jika profil ada, ambil jadwalnya
        if (data) {
          return getScheduleService({
            year: currentYear,
            month: currentMonth,
            divisionId: data.division?.id,
            positionId: data.position?.id,
            employeeId: data.id,
          });
        }
      })
      .then((scheduleData) => {
        setSchedules(scheduleData);
      })
      .catch((err) => {
        setErrorMessage(err.message || "Gagal memuat data profil.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [employeeId, currentEmployee, currentYear, currentMonth]);

  // Early Return untuk Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  // Early Return untuk Error State
  if (errorMessage || !employee) {
    return (
      <div className="my-24 flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
          <FileText size={40} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {errorMessage ? "Waduh! Ada Masalah" : "Karyawan Tidak Ditemukan"}
        </h2>
        <p className="mt-2 max-w-sm text-gray-500 dark:text-gray-400">
          {errorMessage || "Data profil yang   Anda cari tidak tersedia."}
        </p>
      </div>
    );
  }

  return (
    <Container className="mx-auto">
      <div className="space-y-6">
        <BackButton />
        {/* Section: Detail Karyawan */}
        <section className="space-y-4">
          <DetailHeader color="bg-indigo-500">Detail Karyawan</DetailHeader>
          <EmployeeDetail employee={employee} />
        </section>

        {/* Section: Jadwal */}
        <section className="space-y-4">
          <DetailHeader color="bg-pink-500">Jadwal Bulan Ini</DetailHeader>
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white xl:w-fit dark:border-slate-800 dark:bg-slate-900">
            <ScheduleTable
              filters={{ year: currentYear, month: currentMonth }}
              schedules={schedules}
              errorMessage={errorMessage}
            />
          </div>
        </section>
      </div>
    </Container>
  );
}

