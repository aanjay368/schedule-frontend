import { Calendar, Search, User } from "lucide-react";
import { Link } from "react-router";

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Content Section */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-6">
            {/* 404 Error Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-red-500/20 dark:from-red-500/50 dark:to-red-900/20">
              {/* Header */}
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-semibold text-red-700 dark:text-gray-100">
                      Halaman Tidak Ditemukan
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <div className="space-y-4">
                  <div className="rounded-xl bg-white/50 p-6 text-center">
                    <div className="mb-4">
                      <Search className="my-12 h-20 w-full text-center text-gray-700 dark:text-gray-100" />
                    </div>
                    <h2 className="mb-2 text-4xl font-bold text-gray-700 dark:text-gray-100">
                      404
                    </h2>
                    <p className="mb-4 text-lg text-gray-700 dark:text-gray-100">
                      Maaf, halaman yang Anda cari tidak dapat ditemukan.
                    </p>
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-100">
                      Mungkin halaman telah dipindah, dihapus, atau Anda salah
                      mengetik URL.
                    </p>

                    <Link
                      to="/"
                      className="inline-flex items-center rounded-lg bg-red-500 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg"
                    >
                      Kembali ke Beranda
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-red-500 opacity-10 blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-red-500 opacity-10 blur-2xl"></div>
            </div>

            {/* Quick Links Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-purple-600 dark:from-pink-500 dark:to-purple-500">
              {/* Header */}
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-purple-700 dark:text-gray-100">
                      Navigasi Cepat
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Link
                    to="/dev/schedule"
                    className="group/item rounded-xl bg-white/50 p-4 text-center transition-all duration-200 hover:bg-white hover:shadow-sm"
                  >
                    <Calendar className="my-6 h-12 w-full text-center text-gray-700 dark:text-gray-100" />
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Jadwal
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      Kelola jadwal kerja
                    </p>
                  </Link>

                  <Link
                    to="/dev/employee"
                    className="group/item rounded-xl bg-white/50 p-4 text-center transition-all duration-200 hover:bg-white hover:shadow-sm"
                  >
                    <User className="my-6 h-12 w-full text-center text-gray-700 dark:text-gray-100" />
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Profile
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-100">
                      Profile Pribadi
                    </p>
                  </Link>
                  {/* <Link
                    to="/emp/setting"
                    className="group/item rounded-xl bg-white/50 p-4 text-center transition-all duration-200 hover:bg-white hover:shadow-sm"
                  >
                    <span className="mb-2 block text-2xl">⚙️</span>
                    <p className="font-medium text-gray-900">Pengaturan</p>
                    <p className="text-sm text-gray-600">Atur preferensi</p>
                  </Link> */}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-blue-500 opacity-10 blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-blue-500 opacity-10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
