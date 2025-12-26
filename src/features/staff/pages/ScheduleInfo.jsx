import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

import { getScheduleDetailService } from "../../../services/scheduleService";
import LoadingAnimation from "../../../components/ui/LoadingAnimation";
import ScheduleDetail from "../../../components/common/ScheduleDetail";
import BackButton from "../../../components/common/BackButton";

export default function ScheduleInfo() {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
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
    <div className="mx-auto max-w-4xl px-4">      
      <div className="space-y-6">
        <BackButton/>
        <section className="space-y-4">
          <SectionTitle color="bg-indigo-500">Detail Schedule</SectionTitle>
        </section>
      </div>

      <ScheduleDetail schedule={schedule} />
    </div>
  );
}

function SectionTitle({ children, color }) {
  return (
    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white">
      <span className={`h-2 w-2 rounded-full ${color}`}></span>
      {children}
    </h2>
  );
}