import { MouseEventHandler, useState } from "react";
import plusIcon from "../assets/icon-plus.svg";
import arrowIcon from "../assets/icon-arrow-down.svg";
import Invoice from "../types/types";
import Form from "../Modal/Form";
import FilterOptions from "./FilterOptions";
import { AnimatePresence } from "framer-motion";

interface InvoiceHeaderProps {
  invoiceData: Invoice[];
  noInvoice: boolean;
  onFilter: MouseEventHandler<HTMLParagraphElement>;
  isFilterOn: boolean;
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFilters: string[];
  filteredInvoiceData: Invoice[];
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  filteredInvoiceData,
  onFilter,
  isFilterOn,
  setSelectedFilters,
  selectedFilters,
}) => {
  const [isEditingOn, setIsEditingOn] = useState(false);

  function handleNewInvoice() {
    setIsEditingOn(!isEditingOn);
  }

  const handleFilterOption = (status: string) => {
    setSelectedFilters((prev) => {
      if (prev.includes(status)) {
        return prev.filter((item) => item !== status);
      }
      return [...prev, status];
    });
  };

  return (
    <div className="flex w-screen items-center mt-20 justify-center">
      <AnimatePresence mode="wait">
        {isEditingOn && <Form closeModal={handleNewInvoice} mode="new" />}
      </AnimatePresence>
      <div className="flex w-[80%] justify-between max-sm:flex-col max-sm:items-center">
        <div>
          <div className="max-sm:text-center max-sm:space-y-5">
            <h1 className="text-2xl font-bold text-white max-sm:text-5xl">
              Invoices
            </h1>
            <p className="text-white text-xs max-sm:text-xl">
              {filteredInvoiceData.length === 0
                ? `No invoices`
                : `There are ${filteredInvoiceData.length} invoices available`}
            </p>
          </div>
        </div>
        <div className="flex items-center relative max-sm:flex-col max-sm:space-y-6">
          <div className="flex items-center justify-center text-white font-bold cursor-pointer max-sm:mt-6">
            <p className="font-bold max-sm:mt-6" onClick={onFilter}>
              Filter by status
            </p>
            <span className="ml-5">
              <img src={arrowIcon} alt="" />
            </span>
            <AnimatePresence>
              {isFilterOn && (
                <FilterOptions
                  selectedFilters={selectedFilters}
                  onOptionClick={handleFilterOption}
                />
              )}
            </AnimatePresence>
          </div>

          <button
            className=" flex items-center font-bold text-white bg-purpleButton rounded-full ml-5 p-2 px-3 max-sm:ml-0"
            onClick={handleNewInvoice}
          >
            <div className="w-10 h-10 mr-3 flex items-center justify-center bg-white rounded-full">
              <img src={plusIcon} alt="" className="w-3 h-3" />
            </div>
            New Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;
