import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getScheduleDetailsService } from "../../../services/scheduleService";
import LoadingAnimation from "../../../components/ui/LoadingAnimation";
import ScheduleDetail from "../components/common/ScheduleDetail";
import BackButton from "../../../components/common/BackButton";
import Container from "../../../components/ui/Container";
import SectionHeader from "../../../components/ui/SectionHeader";
import ErrorDisplay from "../../../components/ui/ErrorDisplay";

export default function ScheduleDetailPage() {
  const { scheduleId } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getScheduleDetailsService(scheduleId)
      .then(({data}) => setSchedule(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [scheduleId]);

  return (
    <Container className="mx-auto w-full">
      <div className="space-y-6">
        <BackButton />
        {isLoading ? (
          <div className="flex h-80 flex-col items-center justify-center gap-4">
            <LoadingAnimation />
            <p className="text-sm font-medium text-slate-500">
              Memuat Jadwal...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white dark:bg-slate-900/40">
            <ErrorDisplay errorCode={error.status} message={error.message} />
          </div>
        ) : (
          <section className="space-y-4">
            <SectionHeader color="bg-indigo-500">Detail Jadwal</SectionHeader>
            <ScheduleDetail schedule={schedule} />
          </section>
        )}
      </div>
    </Container>
  );
}
