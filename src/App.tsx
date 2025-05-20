import "./App.css";
import { useMemo, useState } from "react";
import InvoiceListItem from "./components/InvoiceListItem";
import NoInvoice from "./components/NoInvoice";
import INVOICE_DATA from "./data file/data.json";
import Invoice from "./types/types";
import InvoiceHeader from "./components/InvoiceHeader";
import { AnimatePresence, motion, Variants } from "framer-motion";

function App() {
  const initialInvoiceData: Invoice[] = INVOICE_DATA;
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterOn, setIsFilterOn] = useState(false);

  const filteredInvoiceData = useMemo(() => {
    return selectedFilters.length > 0
      ? initialInvoiceData.filter((inv) => selectedFilters.includes(inv.status))
      : initialInvoiceData;
  }, [selectedFilters, initialInvoiceData]);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const slideVariants: Variants = {
    initial: { x: "-50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "50%", opacity: 0 },
  };

  const transition = {
    duration: 0.6,
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
    <AnimatePresence mode="popLayout">
      <motion.div
        key="invoice-list-container"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
        className="relative w-full"
      >
        <InvoiceHeader
          invoiceData={filteredInvoiceData}
          onFilter={handleFilterClick}
          noInvoice={filteredInvoiceData.length > 0}
          isFilterOn={isFilterOn}
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
          filteredInvoiceData={filteredInvoiceData}
        />
        {filteredInvoiceData.length === 0 ? (
          <NoInvoice />
        ) : (
          <motion.div
            variants={container}
            key="invoice-list"
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {filteredInvoiceData.map((invoice) => (
              <motion.div
                key={invoice.id}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -50 }}
                layout
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
      </motion.div>
      )
    </AnimatePresence>
  );
}

export default App;
