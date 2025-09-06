import React from "react";
import { Users, UserPlus, TrendingUp, Activity } from "lucide-react";

export default function EmployeeManagementLayout({ children }) {
  const childrenArray = React.Children.toArray(children);
  const [add, table, detailModal] = childrenArray;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-white">
                    Employee Management
                  </h1>
                  <p className="text-blue-100">
                    Modern, clear, and professional employee management system
                  </p>
                </div>                
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-500 shadow-xl">
            <div className="p-6 border-b rounded-b-2xl border-slate-200 dark:border-slate-500">{table}</div>
            <div className=" bg-slate-50 px-6 py-4 dark:bg-gray-900">
              <div className="flex justify-end">{add}</div>
            </div>
          </div>
          {detailModal}
        </div>
      </div>
    </div>
  );
}
