import "./App.css";
import plusIcon from "./assets/icon-plus.svg";
import arrowIcon from "./assets/icon-arrow-down.svg";
import InvoiceList from "./components/InvoiceList";
import NoInvoice from "./components/NoInvoice";
import INVOICE_DATA from "./data file/data.json";

import Invoice from "./types/types";

const invoiceData: Invoice[] = INVOICE_DATA;

function App() {
  function handleFilterClick() {
    console.log("works");
  }
  const list = false;

  return (
    <>
      <div>
        <div className="flex w-screen items-center mt-20 justify-center">
          <div className="flex  w-[70%] justify-between">
            <div>
              <div>
                <h1 className="text-2xl font-bold text-white">Invoices</h1>
                <p className="text-white text-xs">No invoices</p>
              </div>
            </div>
            <div className="flex items-center">
              <p
                onClick={handleFilterClick}
                className="flex  items-center text-white font-bold cursor-pointer"
              >
                Filter by status{" "}
                <span className="ml-5">
                  <img src={arrowIcon} alt="" />
                </span>
              </p>
              <button className=" flex items-center font-bold text-white bg-buttonPurple rounded-full ml-5 p-2 px-3">
                <div className="w-10 h-10 mr-3 flex items-center justify-center bg-white rounded-full">
                  <img src={plusIcon} alt="" className="w-3 h-3" />
                </div>
                New Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      {list && <NoInvoice />}

      {invoiceData.map((item, index) => (
        <InvoiceList
          key={index}
          invoiceID={item.id}
          dueDate={item.paymentDue}
          clientName={item.clientName}
          total={item.total}
          paymentStatus={item.status}
        />
      ))}
    </>
  );
}

export default App;
