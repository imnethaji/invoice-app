import "./App.css";
import { useState } from "react";
import InvoiceList from "./components/InvoiceList";
import NoInvoice from "./components/NoInvoice";
import INVOICE_DATA from "./data file/data.json";
import Invoice from "./types/types";
const invoiceData: Invoice[] = INVOICE_DATA;

import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceDetails from "./components/InvoiceDetails";

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
      <InvoiceHeader invoiceData={invoiceData} />

      {noInvoice ? (
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
      )}
      <InvoiceDetails invoiceData={invoiceData} />
    </>
  );
}

export default App;
