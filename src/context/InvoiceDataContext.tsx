// InvoiceDataContext.tsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Invoice from "../types/types";
import INVOICE_DATA from "../data file/data.json";

const API_BASE_URL = "http://127.0.0.1:5000";

interface InvoiceDataContextType {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

export const InvoiceDataContext = createContext<
  InvoiceDataContextType | undefined
>(undefined);

export const InvoiceDataProvider: React.FC<
  React.PropsWithChildren<{ children: React.ReactNode }>
> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/invoices`);
        setInvoices(response.data);
      } catch (err) {
        setError("Failed to fetch from server. Using fallback.");
        setInvoices(INVOICE_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <InvoiceDataContext.Provider
      value={{ invoices, loading, error, setInvoices }}
    >
      {children}
    </InvoiceDataContext.Provider>
  );
};
