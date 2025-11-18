import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const fetchCompanies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/companies`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch companies"
    );
  }
};

export const fetchCompanyById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/companies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch company");
  }
};

export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/companies`, companyData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create company"
    );
  }
};
