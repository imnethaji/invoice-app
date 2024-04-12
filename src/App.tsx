import "./App.css";
import { useState } from "react";
import InvoiceList from "./components/InvoiceList";
import NoInvoice from "./components/NoInvoice";
import INVOICE_DATA from "./data file/data.json";
import Invoice from "./types/types";
const invoiceData: Invoice[] = INVOICE_DATA;

import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceDetails from "./components/InvoiceDetails";
import Form from "./components/Form";

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
          <InvoiceList
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
      <InvoiceDetails invoiceData={invoiceData} />
      <Form />
    </>
  );
}

export default App;
