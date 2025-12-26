import { useEffect, useState, useCallback } from "react";
import { getScheduleService } from "../../../services/scheduleService";

// UI Components
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import Wrapper from "../../../components/ui/Wrapper";
import LoadingAnimation from "../../../components/ui/LoadingAnimation";

// Business Components
import UploadSchedule from "../components/common/UploadSchedule";
import ScheduleTable from "../../../components/common/ScheduleTable";
import Header from "../components/ui/Header";
import ShiftList from "../components/common/ShiftList";
import MonthAndYearInput from "../components/forms/MonthAndYearSelect";
import DivisionPositionSelect from "../components/forms/DivisionPositionSelect";

export default function ScheduleManagement() {
  const [filters, setFilters] = useState({
    divisionId: 0,
    positionId: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [schedules, setSchedules] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSchedules = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (
        !filters.divisionId ||
        !filters.positionId ||
        !filters.month ||
        !filters.year
      )
        return;

      const responseData = await getScheduleService({
        year: filters.year,
        month: filters.month,
        divisionId: filters.divisionId,
        positionId: filters.positionId,
      });

      setSchedules(responseData);
    } catch (err) {
      setErrorMessage(err.message || "Terjadi kesalahan saat memuat data");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSchedules();
  }, [filters]);

  return (
    <Wrapper className="">
      <Container className="space-y-4">
        {/* 1. Header Section */}
        <Header
          headerName="Management Jadwal Kerja"
          headerDescription="Kelola rotasi dan penugasan shift karyawan untuk memastikan efektivitas operasional di setiap divisi dan posisi."
        />

        {/* 2. Filter Bar (Menggunakan Card) */}
        <Card className="p-6">
          <DivisionPositionSelect filters={filters} setFilters={setFilters} />
        </Card>

        {/* 3. Shift List Section */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-white">
            Daftar Shift
          </h3>
          <ShiftList filters={filters} />
        </Card>

        {/* 4. Schedule Table Section */}
        <Card className="p-6">
          <div className="mb-8 flex flex-nowrap items-center justify-between gap-4">
            <MonthAndYearInput filters={filters} setFilters={setFilters} />
            <UploadSchedule filters={filters} onSuccess={fetchSchedules} />
          </div>

          {isLoading ? (
            <div className="flex h-80 flex-col items-center justify-center gap-4">
              <LoadingAnimation />
              <p className="text-sm text-slate-500">Memuat Jadwal...</p>
            </div>
          ) : (
            <div className="flex overflow-x-auto">
              <ScheduleTable
                filters={filters}
                schedules={schedules}
                errorMessage={errorMessage}
              />
            </div>
          )}
        </Card>
      </Container>
    </Wrapper>
  );
}
