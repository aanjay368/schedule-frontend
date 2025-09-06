export default function ProfileLayout({ children }) {
  return (
    <div className="min-h-screen dark:bg-slate-900">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ">
        {children}
      </div>
    </div>
  );
}
