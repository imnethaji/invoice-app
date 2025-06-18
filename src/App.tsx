import "./App.css";
import { useMemo, useState } from "react";
import InvoiceListItem from "./components/InvoiceListItem";
import InvoiceHeader from "./components/InvoiceHeader";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useInvoiceFilter } from "../src/context/useInvoiceFilter";
import { useInvoiceData } from "./context/useInvoiceData";
import LoadingSkeleton from "./components/LoadingSkeleton";
import NoInvoice from "./components/NoInvoice";

function App() {
  const { selectedFilters, setSelectedFilters } = useInvoiceFilter();
  const { invoices, loading } = useInvoiceData();

  const [isFilterOn, setIsFilterOn] = useState(false);

  const filteredInvoiceData = useMemo(() => {
    return selectedFilters.length > 0
      ? invoices.filter((inv) => selectedFilters.includes(inv.status))
      : invoices;
  }, [selectedFilters, invoices]);

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
      <div className="fullLayout">
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
          {loading ? (
            <LoadingSkeleton />
          ) : filteredInvoiceData.length === 0 ? (
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
      </div>
    </AnimatePresence>
  );
}

export default App;
