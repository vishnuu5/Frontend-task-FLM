import { useCompanies } from "../hooks/useCompanies";
import CompanyCard from "./CompanyCard";
import CompanyTable from "./CompanyTable";
import Pagination from "./Pagination";
import { useState } from "react";
import { Loader2, AlertCircle, Grid2X2, Table2, Package } from "lucide-react";

export default function CompanyList() {
  const { loading, error, getPaginatedCompanies, getTotalPages } =
    useCompanies();
  const [viewType, setViewType] = useState("card");

  if (loading) {
    return (
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Loading companies...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center py-16">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-slate-900 dark:text-white font-semibold mb-2">
            Error loading companies
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const companies = getPaginatedCompanies();
  const totalPages = getTotalPages();

  if (companies.length === 0) {
    return (
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center py-16">
          <Package className="w-12 h-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No companies found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Try adjusting your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Companies
        </h2>
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
              viewType === "card"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
            onClick={() => setViewType("card")}
            title="Card view"
          >
            <Grid2X2 className="w-5 h-5" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
              viewType === "table"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
            onClick={() => setViewType("table")}
            title="Table view"
          >
            <Table2 className="w-5 h-5" />
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>

      {/* Companies Grid/Table */}
      {viewType === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="mb-8">
          <CompanyTable companies={companies} />
        </div>
      )}

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
