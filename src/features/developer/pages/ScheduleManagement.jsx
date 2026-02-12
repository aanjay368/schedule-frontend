import { useEffect, useState, useCallback } from "react";
import { searchSchedulesService } from "../../../services/scheduleService";

// UI Components
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

// Business Components
import UploadSchedule from "../components/common/UploadSchedule";
import ScheduleTable from "../../../components/common/ScheduleTable";
import Header from "../components/ui/Header";
import ShiftList from "../components/common/ShiftList";
import MonthAndYearInput from "../components/forms/MonthAndYearSelect";
import DivisionPositionSelect from "../components/forms/DivisionPositionSelect";
import DataStateWrapper from "../../../components/ui/DataStateWrapper";

export default function ScheduleManagement() {
  const [filters, setFilters] = useState({
    divisionId: 0,
    positionId: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [schedules, setSchedules] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSchedules = useCallback(async () => {
    // Validasi filter sebelum fetch
    if (!filters.divisionId || !filters.positionId) {
      setSchedules(null); // Reset data jika filter tidak lengkap
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await searchSchedulesService({
        year: filters.year,
        month: filters.month,
        divisionId: filters.divisionId,
        positionId: filters.positionId,
      });

      // Jika data berhasil diambil tapi array kosong
      if (!data || data.length === 0) {
        setError({
          status: "empty",
          message: "Jadwal untuk periode ini belum tersedia.",
        });
        setSchedules(null);
      } else {
        setSchedules(data);
      }
    } catch (err) {
      setError(err);
      setSchedules(null);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSchedules();
    
  }, [filters]);

  return (
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

        <DataStateWrapper
          isLoading={isLoading}
          error={error}
          onRetry={fetchSchedules}
          loadingMessage="Memuat jadwal..."
        >
          <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900/40">
            <ScheduleTable filters={filters} schedules={schedules} />
          </div>
        </DataStateWrapper>
      </Card>
    </Container>
  );
}
