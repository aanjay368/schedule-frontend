// React
import { useEffect, useState, useMemo, useCallback } from "react";

// Third-party libraries
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

// Components
import CustomDateInput from "../../../components/forms/CustomDateInput";
import DailySchedules from "../components/common/DailySchedules";

// Services
import { searchSchedulesService } from "../../../services/scheduleService";

// Contexts
import { useAuth } from "../../../contexts/AuthProvider";
import Container from "../../../components/ui/Container";
import DataStateWrapper from "../../../components/ui/DataStateWrapper";

//date
import { parse } from "date-fns";
import { useNavigate, useSearchParams } from "react-router";
import { id } from "date-fns/locale";

export default function SearchSchedule() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get("date")
      ? parse(searchParams.get("date"), "dd-MM-yyyy", new Date(), {
          locale: id,
        })
      : new Date(),
  );
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dateParams = useMemo(
    () => ({
      year: format(selectedDate, "yyyy"),
      month: format(selectedDate, "MM"),
      day: format(selectedDate, "dd"),
    }),
    [selectedDate],
  );

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    searchSchedulesService({
      year: dateParams.year,
      month: dateParams.month,
      divisionId: user?.division?.id,
      positionId: user?.position?.id,
      date: dateParams.day,
    })
      .then(({ data }) => {
        setSchedules(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dateParams, user?.division?.id, user?.position?.id]);

  const handleSelectDate = useCallback(
    (e) => {
      const params = new URLSearchParams();
      params.append("date", format(e.target.value, "dd-MM-yyyy"));
      navigate({
        search: params.toString() ? `${params.toString()}` : "",
      });
      setSelectedDate(e.target.value);
    },
    [navigate, selectedDate, setSelectedDate],
  );

  return (
    <Container className="flex flex-col items-center gap-8 sm:gap-12">
      {/* Header */}
      <header className="space-y-4 text-center">
        <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Jadwal Kerja
        </h1>
      </header>

      {/* Control Section */}
      <section className="w-full max-w-md space-y-2">
        <CustomDateInput
          pattern="EEEE, dd MMMM yyyy"
          value={selectedDate}
          onChange={handleSelectDate}
        />
        <p className="mt-1 text-center text-sm text-gray-500">
          Pilih tanggal untuk melihat jadwal
        </p>
      </section>

      {/* Content Section */}
      <section className="w-full">
        <DataStateWrapper
          isLoading={isLoading}
          error={error}
          loadingMessage="Memuat jadwal..."
        >
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <DailySchedules schedules={schedules} />
          </div>
        </DataStateWrapper>
      </section>
    </Container>
  );
}
