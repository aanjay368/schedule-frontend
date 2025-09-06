import DateSelector from "../components/DateSelector";

export default function ScheduleLayout({ children, date, handleSelectDate }) {
  return (
    <div className="min-h-screen dark dark:bg-slate-900">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="my-12">
          <div className="text-center">
            <div className="mb-4">
              <h1 className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
                Jadwal Kerja
              </h1>
            </div>

            {/* Enhanced Date Selector */}
            <DateSelector date={date} handleSelectDate={handleSelectDate} />
          </div>

          {/* Decorative Header Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100 to-cyan-100 opacity-20 blur-3xl"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
