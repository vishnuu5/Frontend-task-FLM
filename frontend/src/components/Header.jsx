import { Building2 } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-col md:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Companies Directory
            </h1>
          </div>
          <div className="flex gap-6 md:gap-8">
            <div className="text-center">
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Active
              </p>
              <p className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">
                1,204
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Listed
              </p>
              <p className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">
                847
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
