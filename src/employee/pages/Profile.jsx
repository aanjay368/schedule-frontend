import { useEffect, useState } from "react";
import { getEmployeeByIdService } from "../../service/employeeService";
import { useParams } from "react-router";
import ProfilDetailModal from "../components/ProfileDetailModal";
import ProfileSummaryCard from "../components/ProfileSummaryCard";
import ScheduleTable from "../components/ScheduleTable";
import ProfileLayout from "../layouts/ProfileLayout";
import LoadingAnimation from "../../components/LoadingAnimation";

export default function Profile() {
  const [employeeData, setEmployeeData] = useState();
  const { employeeId } = useParams();
  const [errorMesssage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading((loading) => true);
    getEmployeeByIdService(employeeId)
      .then(({ data }) => {
        setEmployeeData((prev) => data);
      })
      .catch(({ message }) => {
        setErrorMessage(message);
      })
      .finally(() => {
        setLoading((loading) => false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen dark:bg-slate-900 flex items-center justify-center">                
            <LoadingAnimation/>          
      </div>
    );
  }

  if (errorMesssage) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-900 border-2 border-gray-400">
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
    );
  }

  return (
    <ProfileLayout>
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="my-12">
          {/* Profile Summary Card */}
          <ProfileSummaryCard employee={employeeData} />
        </div>
        <div className="my-12">
          <ScheduleTable />
        </div>
        <ProfilDetailModal employee={employeeData} />
      </div>
    </ProfileLayout>
  );
}
