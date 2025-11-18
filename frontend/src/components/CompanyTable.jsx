import { useCompanies } from "../hooks/useCompanies";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

export default function CompanyTable({ companies }) {
  const { updateSort, sortConfig } = useCompanies();

  const getStatusIcon = (status) => {
    const iconProps = "w-4 h-4";
    switch (status) {
      case "Active":
        return <CheckCircle className={`${iconProps} text-green-500`} />;
      case "Inactive":
        return <AlertCircle className={`${iconProps} text-red-500`} />;
      case "Pending":
        return <Clock className={`${iconProps} text-amber-500`} />;
      default:
        return null;
    }
  };

  const getStatusStyles = (status) => {
    const baseClasses =
      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap";
    const statusClasses = {
      Active: `${baseClasses} bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300`,
      Inactive: `${baseClasses} bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300`,
      Pending: `${baseClasses} bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300`,
    };
    return statusClasses[status] || baseClasses;
  };

  const renderSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-4 h-4 ml-1 opacity-50" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <th
              onClick={() => updateSort("name")}
              className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center">
                Company
                {renderSortIcon("name")}
              </div>
            </th>
            <th
              onClick={() => updateSort("industry")}
              className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center">
                Industry
                {renderSortIcon("industry")}
              </div>
            </th>
            <th
              onClick={() => updateSort("location")}
              className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center">
                Location
                {renderSortIcon("location")}
              </div>
            </th>
            <th
              onClick={() => updateSort("employeeCount")}
              className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center">
                Employees
                {renderSortIcon("employeeCount")}
              </div>
            </th>
            <th
              onClick={() => updateSort("foundedYear")}
              className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center">
                Founded
                {renderSortIcon("foundedYear")}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {companies.map((company) => (
            <tr
              key={company.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white">
                      {company.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 dark:text-white truncate">
                      {company.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {company.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                {company.industry}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                {company.location}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                {company.employeeCount}+
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                {company.foundedYear}
              </td>
              <td className="px-6 py-4">
                <div className={getStatusStyles(company.status)}>
                  {getStatusIcon(company.status)}
                  {company.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
