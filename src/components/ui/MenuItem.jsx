import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import Card from "../ui/Card";

const MenuItem = ({ children, to, className = "" }) => {
  return (
    <Link to={to} className="block w-full">
      {/* Tambahkan relative pada Card agar position absolute ikon mengacu pada kartu ini */}
      <Card className="group relative flex w-full items-center overflow-hidden border-none p-4 text-left shadow-lg transition-all active:scale-[0.98] active:bg-slate-50 dark:active:bg-slate-900">
        <div className={`flex-1 ${className}`}>{children}</div>
        <div className="pointer-events-none absolute top-1/2 right-1 z-20 -translate-y-1/2">
          <ChevronRight
            size={18}
            className="text-slate-200 opacity-50 transition-all group-hover:translate-x-1 group-hover:text-purple-500 group-hover:opacity-100"
          />
        </div>
      </Card>
    </Link>
  );
};

export default MenuItem;
