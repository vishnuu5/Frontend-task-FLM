import { createContext, useState, useCallback, useEffect } from "react";
import { fetchCompanies } from "../api/companyApi";

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    industry: "",
    location: "",
    employees: "",
    status: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCompanies();
      setCompanies(data);
    } catch (err) {
      setError(err.message || "Failed to load companies");
      console.error("Error loading companies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getFilteredAndSortedCompanies = useCallback(() => {
    let filtered = companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesIndustry =
        !filters.industry || company.industry === filters.industry;
      const matchesLocation =
        !filters.location || company.location === filters.location;
      const matchesEmployees =
        !filters.employees || company.employeeCount === filters.employees;
      const matchesStatus =
        !filters.status || company.status === filters.status;

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesLocation &&
        matchesEmployees &&
        matchesStatus
      );
    });

    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      });
    }

    return filtered;
  }, [companies, filters, sortConfig]);

  const getPaginatedCompanies = useCallback(() => {
    const filtered = getFilteredAndSortedCompanies();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }, [currentPage, getFilteredAndSortedCompanies]);

  const getTotalPages = useCallback(() => {
    const filtered = getFilteredAndSortedCompanies();
    return Math.ceil(filtered.length / itemsPerPage);
  }, [getFilteredAndSortedCompanies]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const updateSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const value = {
    companies,
    loading,
    error,
    filters,
    sortConfig,
    currentPage,
    itemsPerPage,
    updateFilters,
    updateSort,
    getPaginatedCompanies,
    getTotalPages,
    setCurrentPage,
    loadCompanies,
  };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};
