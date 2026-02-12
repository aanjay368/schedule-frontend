import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router";
import { FileText } from "lucide-react";

import { getEmployeeDetailsService } from "../../../services/employeeService";
import { searchSchedulesService } from "../../../services/scheduleService";

import EmployeeDetail from "../../../components/common/EmployeeDetail";
import LoadingAnimation from "../../../components/ui/LoadingAnimation";
import ScheduleTable from "../../../components/common/ScheduleTable";
import { useCurrentEmployee } from "../contexts/CurrentEmployeeProvider";
import BackButton from "../../../components/common/BackButton";
import Container from "../../../components/ui/Container";
import SectionHeader from "../../../components/ui/SectionHeader";
import ErrorDisplay from "../../../components/ui/ErrorDisplay";

export default function Profile() {
  const { employeeId } = useParams();
  const currentEmployee = useCurrentEmployee();
  const [employee, setEmployee] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [errorEmpoyee, setErrorEmployee] = useState(null);
  const [errorSchedule, setErrorSchedule] = useState(null);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);

  // Konsistensi waktu dalam satu render cycle
  const { currentYear, currentMonth } = useMemo(() => {
    const now = new Date();
    return {
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth() + 1,
    };
  }, []);

  useEffect(() => {
    setIsLoadingEmployee(true);
    setErrorEmployee(null);

    getEmployeeDetailsService(employeeId)
      .then(({data}) => {
        setEmployee(data);
      })
      .catch((err) => {
        setErrorEmployee(err);
        setErrorSchedule(err);
      })
      .finally(() => {
        setIsLoadingEmployee(false);
      });
  }, [employeeId, currentEmployee]);

  useEffect(() => {
    if (employee) {
      setIsLoadingSchedule(true);
      setErrorSchedule(null);
      searchSchedulesService({
        year: currentYear,
        month: currentMonth,
        divisionId: employee.division?.id,
        positionId: employee.position?.id,
        ownerId: employee.id,
      })
        .then(({data}) => {
          setSchedules(data);
        })
        .catch((err) => {
          setErrorSchedule(err);
        })
        .finally(() => {
          setIsLoadingSchedule(false);
        });
    }
  }, [employee, currentYear, currentMonth]);

  return (
    <Container className="mx-auto">
      <div className="space-y-6">
        <BackButton />

        <section className="space-y-4">
          <SectionHeader color="bg-indigo-500">Detail Karyawan</SectionHeader>
          {isLoadingEmployee ? (
            <div className="flex h-80 flex-col items-center justify-center gap-4">
              <LoadingAnimation />
              <p className="text-sm font-medium text-slate-500">
                Memuat Karyawan...
              </p>
            </div>
          ) : errorEmpoyee ? (
            <div className="rounded-2xl bg-white dark:bg-slate-900/40">
              <ErrorDisplay
                errorCode={errorEmpoyee.status || 500}
                message={errorEmpoyee.message || "Terjadi Kesalahan Server"}
              />
            </div>
          ) : (
            <EmployeeDetail employee={employee} />
          )}
        </section>

        {/* Section: Jadwal */}
        <section className="space-y-4">
          <SectionHeader color="bg-pink-500">Jadwal Bulan Ini</SectionHeader>
          {isLoadingSchedule ? (
            <div className="flex h-80 flex-col items-center justify-center gap-4">
              <LoadingAnimation />
              <p className="text-sm font-medium text-slate-500">
                Memuat Schedule...
              </p>
            </div>
          ) : errorSchedule ? (
            <div className="rounded-2xl bg-white dark:bg-slate-900/40">
              <ErrorDisplay
                errorCode={errorSchedule.status || 500}
                message={errorSchedule.message || "Terjadi Kesalahan Server"}
              />
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white xl:w-fit dark:border-slate-800 dark:bg-slate-900">
              <ScheduleTable
                filters={{ year: currentYear, month: currentMonth }}
                schedules={schedules}
              />
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}
