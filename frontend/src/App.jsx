import { useState, useEffect } from "react";
import { CompanyProvider } from "./context/CompanyContext";
import Header from "./components/Header";
import FilterPanel from "./components/FilterPanel";
import CompanyList from "./components/CompanyList";

function App() {
  return (
    <CompanyProvider>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Header />
        <main className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-4 py-8">
          <FilterPanel />
          <CompanyList />
        </main>
      </div>
    </CompanyProvider>
  );
}

export default App;
