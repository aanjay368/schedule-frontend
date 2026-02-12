import { useCallback, useEffect, useState, useMemo } from "react";
import { Inbox, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import Container from "../../../components/ui/Container";
import SectionHeader from "../../../components/ui/SectionHeader";
import LoadingAnimation from "../../../components/ui/LoadingAnimation";
import { searchSubmissionService } from "../../../services/submissionService";
import SubmissionItemMenu from "../components/common/SubmissionItemMenu";
import { useModalOverlay } from "../../../contexts/ModalOverlayProvider";
import ErrorDisplay from "../../../components/ui/ErrorDisplay";
import FilterSubmissions from "../components/forms/FilterSubmissions";

export default function SubmissionsHistory() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Ambil semua filter & page dari URL menggunakan useMemo
  const filters = useMemo(
    () => ({
      name: searchParams.get("name") || "",
      status: searchParams.get("status"),
      type: searchParams.get("type"),
      page: parseInt(searchParams.get("page")) || 0, // Default ke 0 jika tidak ada
    }),
    [searchParams],
  );

  const [paging, setPaging] = useState({
    currentPage: 0,
    totalPage: 0,
    totalElement: 0,
  });

  const { openModalOverlay, closeModalOverlay } = useModalOverlay();

  // 2. Fungsi Fetch Data (Hanya bergantung pada objek filters)
  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchSubmissionService(filters);

      setSubmissions(response.data || []);
      setPaging(response.paging);

      if (!response.data || response.data.length === 0) {
        setError({
          status: "empty",
          message: "Tidak ada riwayat pengajuan.",
        });
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // 3. Effect: Jalankan fetch setiap kali objek filters (URL) berubah
  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // 4. Helper untuk merubah halaman via URL
  const handleNavigatePage = (targetPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", targetPage);
    setSearchParams(newParams);
  };

  const handleFilterSubmission = useCallback(() => {
    openModalOverlay(
      <FilterSubmissions filters={filters} onClose={closeModalOverlay} />,
      "Filter Permitaan",
      "Atur filter permintaan untuk menyaring riwayat aktivitas permintaan kamu.",
      "md",
    );
  }, [openModalOverlay, closeModalOverlay, filters]);

  return (
    <Container className="space-y-8 pb-20">
      {/* ... Header Section tetap sama ... */}
      <header className="flex flex-col gap-6 px-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <SectionHeader color="bg-indigo-500">
            Aktivitas Permintaan
          </SectionHeader>
          <p className="text-sm text-slate-500">
            Pantau semua permintaan tukar shift, ngefull dan libur di sini.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleFilterSubmission}
            className={`flex h-10 items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition-all active:scale-95 dark:border-slate-300 dark:bg-slate-900 dark:text-slate-300`}
          >
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>

          <Link
            to="/staff/submissions/create"
            className="flex h-10 w-full items-center gap-2 rounded-xl bg-purple-600 px-5 text-sm font-bold text-white shadow-lg shadow-purple-200 transition-all hover:bg-purple-700 active:scale-95 dark:shadow-none"
          >
            <Plus size={18} />
            <span>Buat Permintaan</span>
          </Link>
        </div>
      </header>

      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="flex h-80 flex-col items-center justify-center gap-4">
            <LoadingAnimation />
            <p className="text-sm font-medium text-slate-500 italic">
              Menyinkronkan data...
            </p>
          </div>
        ) : error ? (
          <ErrorDisplay errorCode={error.status} message={error.message} />
        ) : (
          <div className="space-y-12">
            <p className="border-b border-slate-100 pb-6 text-sm text-slate-500 dark:border-slate-800">
              Terdapat {paging.totalElement} Aktivitas Permintaan
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {submissions.map((req) => (
                <SubmissionItemMenu key={req.id} data={req} />
              ))}
            </div>

            {/* Pagination Controls - Menggunakan URL Params */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row dark:border-slate-800">
              <p className="text-sm text-slate-500">
                Halaman{" "}
                <span className="font-bold text-slate-900 dark:text-slate-200">
                  {paging.currentPage + 1}
                </span>{" "}
                dari{" "}
                <span className="font-bold text-slate-900 dark:text-slate-200">
                  {paging.totalPage}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={paging.currentPage === 0 || isLoading}
                  onClick={() => handleNavigatePage(paging.currentPage - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1">
                  {[...Array(paging.totalPage)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleNavigatePage(i)}
                      className={`hidden h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all sm:flex ${
                        paging.currentPage === i
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                          : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={
                    paging.currentPage + 1 >= paging.totalPage || isLoading
                  }
                  onClick={() => handleNavigatePage(paging.currentPage + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
