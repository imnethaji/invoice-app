// InvoiceDataContext.tsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Invoice from "../types/types";
import INVOICE_DATA from "../data file/data.json";

const API_BASE_URL = "https://invoice-backend-api-app.vercel.app";

interface InvoiceDataContextType {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

export const InvoiceDataContext = createContext<
  InvoiceDataContextType | undefined
>(undefined);

const InvoiceDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/invoices`);
        console.log("Fetching data from server");
        if (response.status === 200) {
          console.log(
            `Connection Successful.Connection code is ${response.status}. Loading data.`
          );
        } else {
          console.log("Connection code is ", response.status);
        }
        setInvoices(response.data);
      } catch (err) {
        setError("Failed to fetch from server. Using fallback.");
        setInvoices(INVOICE_DATA);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
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

// Export the component separately
export { InvoiceDataProvider };
