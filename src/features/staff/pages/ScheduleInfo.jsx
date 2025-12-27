import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getScheduleDetailService } from "../../../services/scheduleService";
import LoadingAnimation from "../../../components/ui/LoadingAnimation";
import ScheduleDetail from "../../../components/common/ScheduleDetail";
import BackButton from "../../../components/common/BackButton";
import Container from "../../../components/ui/Container";
import DetailHeader from "../../../components/ui/DetailHeader";

export default function ScheduleInfo() {
  const { scheduleId } = useParams();

  const [schedule, setSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);

    getScheduleDetailService(scheduleId)
      .then((data) => {
        setSchedule(data);
      })
      .catch((err) => {
        setErrorMessage(err.message || "Gagal memuat detail jadwal");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [scheduleId]);

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  if (errorMessage || !schedule)
    return <div className="p-20 text-center">{errorMessage}</div>;

  return (
    <Container className="mx-auto w-full">
      <div className="space-y-6">
        <BackButton />
        <section className="space-y-4">
          <DetailHeader color="bg-indigo-500">Detail Schedule</DetailHeader>
          <ScheduleDetail schedule={schedule} />
          <button className="mt-4 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition-all hover:bg-purple-700 active:scale-[0.98] disabled:opacity-70 dark:shadow-none">
            Tambah ke Full
          </button>
        </section>
      </div>
    </Container>
  );
}
