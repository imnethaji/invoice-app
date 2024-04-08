import "./App.css";
import plusIcon from "./assets/icon-plus.svg";
import arrowIcon from "./assets/icon-arrow-down.svg";
// import InvoiceList from "./components/InvoiceList";
// import NoInvoice from "./components/NoInvoice";
import INVOICE_DATA from "./data file/data.json";

import Invoice from "./types/types";
import { useState } from "react";
import InvoiceDetails from "./components/InvoiceDetails";

const invoiceData: Invoice[] = INVOICE_DATA;

function App() {
  const [noInvoice, setNoInvoice] = useState(true);
  function handleFilterClick() {
    console.log("works");
  }
  function handleToggleList() {
    noInvoice ? setNoInvoice(false) : setNoInvoice(true);
  }

  return (
    <>
      <div>
        <div className="flex w-screen items-center mt-20 justify-center">
          <div className="flex  w-[70%] justify-between max-sm:flex-col max-sm:items-center ">
            <div>
              <div className="max-sm:text-center max-sm:space-y-5">
                <h1 className="text-2xl font-bold text-white max-sm:text-5xl">
                  Invoices
                </h1>
                <p className="text-white text-xs max-sm:text-xl">
                  {noInvoice
                    ? `No invoices`
                    : `There are ${invoiceData.length} invoices available`}
                </p>
              </div>
            </div>
            <div className="flex items-center max-sm:flex-col max-sm:space-y-6">
              <p
                onClick={handleFilterClick}
                className="flex  items-center text-white font-bold cursor-pointer max-sm:mt-6"
              >
                Filter by status{" "}
                <span className="ml-5">
                  <img src={arrowIcon} alt="" />
                </span>
              </p>
              <button className=" flex items-center font-bold text-white bg-purpleButton rounded-full ml-5 p-2 px-3 max-sm:ml-0">
                <div className="w-10 h-10 mr-3 flex items-center justify-center bg-white rounded-full">
                  <img src={plusIcon} alt="" className="w-3 h-3" />
                </div>
                New Invoice
              </button>
              <button
                className=" w-28 flex items-center justify-center font-bold text-white bg-purpleButton rounded-full ml-5 p-2 px-3 max-sm:ml-0"
                onClick={handleToggleList}
              >
                {!noInvoice ? "Hide" : "Show"} List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* {noInvoice ? (
        <NoInvoice />
      ) : (
        invoiceData.map((item, index) => (
          <InvoiceList
            key={index}
            invoiceID={item.id}
            dueDate={item.paymentDue}
            clientName={item.clientName}
            total={item.total}
            paymentStatus={item.status}
          />
        ))
      )} */}
      <InvoiceDetails invoiceData={invoiceData} />
    </>
  );
}

export default App;
