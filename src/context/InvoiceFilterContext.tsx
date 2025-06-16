import React, { createContext, useMemo, useState, ReactNode } from "react";
import { useInvoiceData } from "./useInvoiceData";
import Invoice from "../types/types";

interface InvoiceFilterContextType {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  filteredInvoices: Invoice[];
}

export const InvoiceFilterContext = createContext<
  InvoiceFilterContextType | undefined
>(undefined);

export const InvoiceFilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { invoices } = useInvoiceData();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filteredInvoices = useMemo(() => {
    return selectedFilters.length > 0
      ? invoices.filter((inv) => selectedFilters.includes(inv.status))
      : invoices;
  }, [selectedFilters, invoices]);

  return (
    <InvoiceFilterContext.Provider
      value={{ selectedFilters, setSelectedFilters, filteredInvoices }}
    >
      {children}
    </InvoiceFilterContext.Provider>
  );
};
