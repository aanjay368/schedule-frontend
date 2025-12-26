import Card from "../../../../components/ui/Card";

export default function Header({ headerName, headerDescription }) {
  return (
    <Card className="p-6 h-32 content-center">
      <div className="flex items-center gap-5">
        {/* Aksen garis vertikal tebal */}
        <div className="h-18 w-1 rounded-full bg-pink-600" />

        <div className="flex flex-col gap-4">
          <h1 className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
            {headerName}
          </h1>
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {headerDescription}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
