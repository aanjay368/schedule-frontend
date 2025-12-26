// React
import { useEffect, useState, useMemo } from "react";

// Third-party libraries
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

// Components
import LoadingAnimation from "../../../components/ui/LoadingAnimation";
import DateSelector from "../../../components/forms/CustomDateSelect";
import DailySchedules from "../components/common/DailySchedules";

// Lucide Icons
import { FileText } from "lucide-react";

// Services
import { getScheduleService } from "../../../services/scheduleService";

// Contexts
import { useAuth } from "../../../contexts/AuthProvider";
import Container from "../../../components/ui/Container";

export default function Schedule() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setErrorMessage("");

    getScheduleService({
      year: dateParams.year,
      month: dateParams.month,
      divisionId: user?.division?.id,
      positionId: user?.position?.id,
      date: dateParams.day,
    })
      .then((data) => {
        setSchedules(data);
      })
      .catch((err) => {
        setErrorMessage(err.message || "Gagal memuat jadwal");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dateParams, user?.division?.id, user?.position?.id]);

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
        <DateSelector
          date={format(selectedDate, "yyyy-MM-dd")}
          handleSelectDate={setSelectedDate}
        />
        <p className="mt-1 text-center text-sm text-gray-500">
          Pilih tanggal untuk melihat jadwal
        </p>
      </section>

      {/* Content Section */}
      <section className="w-full">
        {isLoading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4">
            <LoadingAnimation />
            <p className="animate-pulse text-sm text-gray-400">
              Menghubungkan ke server...
            </p>
          </div>
        ) : errorMessage ? (
          <ErrorPlaceholder message={errorMessage} />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <DailySchedules schedules={schedules} />
          </div>
        )}
      </section>
    </Container>
  );
}

/**
 * Sub-komponen untuk Error State agar JSX utama lebih bersih
 */
function ErrorPlaceholder({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-gray-100 bg-gray-50 shadow-inner dark:border-slate-800 dark:bg-slate-900">
        <FileText size={48} className="text-gray-300" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
        Terjadi Kesalahan
      </h3>
      <p className="mt-2 max-w-xs text-gray-400">{message}</p>
    </div>
  );
}
