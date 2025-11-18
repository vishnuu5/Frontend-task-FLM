import { CheckCircle, AlertCircle, Clock } from "lucide-react";

export default function CompanyCard({ company }) {
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
      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium";
    const statusClasses = {
      Active: `${baseClasses} bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300`,
      Inactive: `${baseClasses} bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300`,
      Pending: `${baseClasses} bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300`,
    };
    return statusClasses[status] || baseClasses;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start gap-4">
        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-white">
            {company.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white truncate">
            {company.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
            {company.email}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1">
        <div className="flex justify-between items-start">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Industry
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white text-right">
            {company.industry}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Location
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white text-right">
            {company.location}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Employees
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white text-right">
            {company.employeeCount}+
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Founded
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white text-right">
            {company.foundedYear}
          </span>
        </div>
      </div>

      <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className={getStatusStyles(company.status)}>
          {getStatusIcon(company.status)}
          {company.status}
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
          View →
        </button>
      </div>
    </div>
  );
}
