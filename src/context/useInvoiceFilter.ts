import { useContext } from "react";
import { InvoiceFilterContext } from "./InvoiceFilterContext";

export const useInvoiceFilter = () => {
  const context = useContext(InvoiceFilterContext);
  if (!context) {
    throw new Error(
      "useInvoiceFilter must be used inside InvoiceFilterProvider"
    );
  }
  return context;
};
