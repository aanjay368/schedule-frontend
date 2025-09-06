export default function ScheduleManagementLayout({ children }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-white">
                    Schedule Management
                  </h1>
                  <p className="text-indigo-100">
                    Modern, clear, and professional shift scheduling system
                  </p>
                </div>                
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
