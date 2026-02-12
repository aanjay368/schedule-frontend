import LoadingAnimation from "./LoadingAnimation";
import ErrorDisplay from "./ErrorDisplay";

/**
 * Wrapper generik untuk menangani state loading dan error
 * agar tidak duplikasi di setiap page.
 */
const DataStateWrapper = ({
  isLoading,
  error,
  onRetry,
  loadingMessage = "Memuat data...",
  children,
}) => {
  if (isLoading) {
    return (
      <div className="flex h-80 flex-col items-center justify-center gap-4">
        <LoadingAnimation />
        <p className="text-sm font-medium text-slate-500">
          {loadingMessage}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white dark:bg-slate-900/40">
        <ErrorDisplay
          errorCode={error.status}
          message={error.message}
          onRetry={onRetry}
        />
      </div>
    );
  }

  return children;
};

export default DataStateWrapper;

