import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getDailyScheduleService } from "../../service/scheduleService";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import ScheduleCard from "../components/ScheduleCard";
import ScheduleLayout from "../layouts/ScheduleLayout";
import LoadingAnimation from "../../components/LoadingAnimation";

export default function Schedule() {
  const { user } = useUser();
  const [date, setDate] = useState(
    format(new Date(), "yyyy-MM-dd", { locale: id }),
  );
  const [schedulesData, setSchedulesData] = useState([]);

  const [errorMesssage, setErrorMesssage] = useState("");
  const [loading, setLoading] = useState(false);

  // Color scheme for shifts

  useEffect(() => {
    setLoading(loading => !loading);
    setErrorMesssage(errorMesssage => "");
    getDailyScheduleService(date, user.division)
      .then(({ data }) => {
        setSchedulesData(data);
      })
      .catch(({ message }) => {
        setErrorMesssage(message);
      }).finally(() => {
        setLoading(loading => !loading);
      });
    
  }, [date]);

  const handleSelectDate = (e) => {
    setDate(format(e, "yyyy-MM-dd", { locale: id }));
  };

  if (loading === true) {
    return (
      <ScheduleLayout date={date} handleSelectDate={handleSelectDate}>
        <div className="flex justify-center items-center h-98">
         <LoadingAnimation/>
        </div>
      </ScheduleLayout>
    );
  }

  if (errorMesssage) {
    return (
      <ScheduleLayout date={date} handleSelectDate={handleSelectDate}>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-400 bg-gray-100 dark:bg-slate-900">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-lg text-gray-400">{errorMesssage}</p>
          </div>
        </div>
      </ScheduleLayout>
    );
  }

  return (
    <ScheduleLayout date={date} handleSelectDate={handleSelectDate}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schedulesData.map((schedule) => (
          <ScheduleCard key={schedule.shift} scheduleData={schedule} />
        ))}
      </div>
    </ScheduleLayout>
  );
}
