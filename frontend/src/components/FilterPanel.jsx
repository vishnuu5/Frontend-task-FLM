import { useState, useEffect } from "react";
import { useCompanies } from "../hooks/useCompanies";
import { Search, RotateCcw } from "lucide-react";

export default function FilterPanel() {
  const { filters, updateFilters, companies } = useCompanies();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleSearchChange = (e) => {
    const newFilters = { ...localFilters, search: e.target.value };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...localFilters, [filterName]: value };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      industry: "",
      location: "",
      employees: "",
      status: "",
    };
    setLocalFilters(resetFilters);
    updateFilters(resetFilters);
  };

  const industries = [...new Set(companies.map((c) => c.industry))].sort();
  const locations = [...new Set(companies.map((c) => c.location))].sort();
  const employeeCounts = [
    ...new Set(companies.map((c) => c.employeeCount)),
  ].sort((a, b) => a - b);

  return (
    <div className="w-full lg:w-80 shrink-0">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 sticky top-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Filters
          </h2>
          {Object.values(localFilters).some((v) => v !== "") && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search companies..."
            value={localFilters.search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Industry
            </label>
            <select
              value={localFilters.industry}
              onChange={(e) => handleFilterChange("industry", e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all appearance-none cursor-pointer"
            >
              <option value="">All Industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Location
            </label>
            <select
              value={localFilters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all appearance-none cursor-pointer"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Employee Count
            </label>
            <select
              value={localFilters.employees}
              onChange={(e) =>
                handleFilterChange(
                  "employees",
                  e.target.value ? parseInt(e.target.value) : ""
                )
              }
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all appearance-none cursor-pointer"
            >
              <option value="">Any Size</option>
              {employeeCounts.map((count) => (
                <option key={count} value={count}>
                  {count}+ employees
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Status
            </label>
            <select
              value={localFilters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all appearance-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
