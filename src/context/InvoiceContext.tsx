import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import INVOICE_DATA from "../data file/data.json";
import Invoice from "../types/types";

const API_BASE_URL = "http://127.0.0.1:5000";

interface InvoiceContextType {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  filteredInvoices: Invoice[];
}
const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<
  React.PropsWithChildren<{ children: React.ReactNode }>
> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        console.log("Connecting with server.");
        const response = await axios.get(`${API_BASE_URL}/invoices`);
        setInvoices(response.data);
      } catch (error) {
        setError("Failed to fetch invoices:");
        setInvoices(INVOICE_DATA);
        setError("Loading default local data.");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const filteredInvoices = useMemo(() => {
    return selectedFilters.length > 0
      ? invoices.filter((inv) => selectedFilters.includes(inv.status))
      : invoices;
  }, [selectedFilters, invoices]);

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        loading,
        error,
        selectedFilters,
        setSelectedFilters,
        filteredInvoices,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  if (!context)
    throw new Error("useInvoiceContext must be used inside InvoiceProvider");
  return context;
};
