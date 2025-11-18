import { useCompanies } from "../hooks/useCompanies";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages }) {
  const { currentPage, setCurrentPage } = useCompanies();

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 py-8 border-t border-slate-200 dark:border-slate-800 pt-8">
      <div className="flex items-center justify-center flex-wrap gap-2">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1 flex-wrap justify-center">
          {pageNumbers.map((page, idx) =>
            page === "..." ? (
              <span
                key={`dots-${idx}`}
                className="px-3 py-2 text-slate-500 dark:text-slate-400"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        Page{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          {totalPages}
        </span>
      </p>
    </div>
  );
}
