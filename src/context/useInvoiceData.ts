import { useContext } from "react";
import { InvoiceDataContext } from "./InvoiceDataContext";

export const useInvoiceData = () => {
  const context = useContext(InvoiceDataContext);
  if (!context) {
    throw new Error("useInvoiceData must be used inside InvoiceDataProvider");
  }
  return context;
};
