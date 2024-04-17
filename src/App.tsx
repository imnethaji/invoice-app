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
  const [noInvoice, setNoInvoice] = useState(true);

  function handleFilterClick() {
    console.log("works");
  }
  function handleToggleList() {
    noInvoice ? setNoInvoice(false) : setNoInvoice(true);
  }
  function handleOpenClick() {
    console.log("Works");
  }

  return (
    <>
      <InvoiceHeader
        invoiceData={invoiceData}
        onToggle={handleToggleList}
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
            onOpen={handleOpenClick}
          />
        ))
      )}
    </>
  );
}

export default App;
