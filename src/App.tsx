import "./App.css";
import { useState } from "react";
import InvoiceListItem from "./components/InvoiceListItem";
import NoInvoice from "./components/NoInvoice";
import INVOICE_DATA from "./data file/data.json";
import Invoice from "./types/types";
import InvoiceHeader from "./components/InvoiceHeader";
import { motion, Variants } from "framer-motion";

const invoiceData: Invoice[] = INVOICE_DATA;

function App() {
  const [noInvoice] = useState(() => {
    return invoiceData.length === 0;
  });

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0, // Move to original position
      transition: {
        duration: 0.5,
        type: "spring", // Add a spring animation
        stiffness: 100, // Adjust spring stiffness
        damping: 20, // Adjust spring damping
      },
    },
  };

  function handleFilterClick() {
    console.log("works");
  }

  return (
    <>
      <InvoiceHeader
        invoiceData={invoiceData}
        onFilter={handleFilterClick}
        noInvoice={noInvoice}
      />

      {noInvoice ? (
        <NoInvoice />
      ) : (
        <motion.div variants={container} initial="hidden" animate="show">
          {invoiceData.map((invoice, index) => (
            <motion.div
              key={index}
              variants={itemVariants} // or use itemVariantsFromRight for right side entrance
            >
              <InvoiceListItem
                invoiceID={invoice.id}
                dueDate={invoice.paymentDue}
                clientName={invoice.clientName}
                total={invoice.total}
                paymentStatus={invoice.status}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}

export default App;
