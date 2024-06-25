import "./App.css";
// import axios from "axios";
import { useState } from "react";
import InvoiceListItem from "./components/InvoiceListItem";
import NoInvoice from "./components/NoInvoice";
import INVOICE_DATA from "./data file/data.json";
import Invoice from "./types/types";
const invoiceData: Invoice[] = INVOICE_DATA;
import InvoiceHeader from "./components/InvoiceHeader";

function App() {
  const [noInvoice, setNoInvoice] = useState(() => {
    // Initialize noInvoice based on whether invoiceData is empty
    return invoiceData.length === 0;
  });

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
        invoiceData.map((item, index) => (
          <InvoiceListItem
            key={index}
            invoiceID={item.id}
            dueDate={item.paymentDue}
            clientName={item.clientName}
            total={item.total}
            paymentStatus={item.status}
          />
        ))
      )}
    </>
  );
}

export default App;
