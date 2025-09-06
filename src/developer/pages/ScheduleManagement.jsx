import { useState } from "react";
import UploadSchedule from "../components/UploadSchedule";
import ScheduleTable from "../components/ScheduleTable";
import ScheduleManagementLayout from "../layouts/ScheduleManagemenLayout";

export default function ScheduleManagement() {
  const [activeTab, setActiveTab] = useState("AIC");

  const tabs = [
    { id: "AIC", label: "AIC Division" },
    { id: "PORTER", label: "Porter Division" },
  ];

  const handleTabChange = async (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <ScheduleManagementLayout>
      <div className="mx-auto overflow-scroll px-6 py-8">
        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? `bg-blue-600 text-white shadow-lg`
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                } `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          <div className="space-y-6">
            <UploadSchedule division={activeTab} />
            <ScheduleTable division={activeTab} />
          </div>
        </div>
      </div>
    </ScheduleManagementLayout>
  );
}
