import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router"

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sm font-bold text-slate-400 transition-colors hover:text-purple-600"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          KEMBALI
        </button>
    )
}

export default BackButton;