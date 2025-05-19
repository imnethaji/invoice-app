import "./App.css";
import { useEffect, useState } from "react";
import InvoiceListItem from "./components/InvoiceListItem";
import NoInvoice from "./components/NoInvoice";
import INVOICE_DATA from "./data file/data.json";
import Invoice from "./types/types";
import InvoiceHeader from "./components/InvoiceHeader";
import { motion, Variants } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const initialInvoiceData: Invoice[] = INVOICE_DATA;

function App() {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredInvoiceData, setFilteredInvoiceData] =
    useState<Invoice[]>(initialInvoiceData);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
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

  useEffect(() => {
    if (selectedFilters.length > 0) {
      setInvoiceData(
        initialInvoiceData.filter((item) =>
          selectedFilters.includes(item.status)
        )
      );
    } else {
      setInvoiceData(initialInvoiceData);
    }
  }, [selectedFilters]);

  const slideVariants: Variants = {
    initial: { x: "-50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "50%", opacity: 0 },
  };

  const transition = {
    duration: 0.3,
    delay: 0.5,
    type: "spring",
    stiffness: 100,
    damping: 20,
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: transition,
    },
  };

  function handleFilterClick() {
    isFilterOn == false ? setIsFilterOn(true) : setIsFilterOn(false);
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!selectedInvoice ? (
          <motion.div
            key="invoice-list"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="relative w-full"
          >
            <InvoiceHeader
              invoiceData={invoiceData}
              onFilter={handleFilterClick}
              noInvoice={noInvoice}
              isFilterOn={isFilterOn}
              setFilteredInvoiceData={setFilteredInvoiceData}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />

            {noInvoice ? (
              <NoInvoice />
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredInvoiceData.map((invoice) => (
                    <motion.div
                      key={invoice.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, y: -50 }}
                      layout // allows smooth layout transitions
                    >
                      <InvoiceListItem
                        invoiceID={invoice.id}
                        dueDate={invoice.paymentDue}
                        clientName={invoice.clientName}
                        total={invoice.total}
                        paymentStatus={invoice.status}
                        onClick={() => setSelectedInvoice(invoice)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="invoice-detail"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="relative w-full p-6 text-white"
          >
            <button
              onClick={() => setSelectedInvoice(null)}
              className="bg-[#252945] px-4 py-2 rounded"
            >
              Back
            </button>
            <h2 className="text-2xl font-bold mt-4">
              Invoice #{selectedInvoice.id}
            </h2>
            <p>Client: {selectedInvoice.clientName}</p>
            <p>Due: {selectedInvoice.paymentDue}</p>
            <p>Total: ${selectedInvoice.total}</p>
            <p>Status: {selectedInvoice.status}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
