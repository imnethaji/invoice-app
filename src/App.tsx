import "./App.css";
import axios from "axios";
import { useState, useRef } from "react";
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
  const modalRef = useRef();
  const apiUrl = "http://localhost:9000/";
  // Create an empty object to store the fetched data
  const dataObject = {};

  function handleFilterClick() {
    console.log("works");
  }
  function handleToggleList() {
    noInvoice ? setNoInvoice(false) : setNoInvoice(true);
  }
  function handleOpenClick() {
    console.log("Works");
  }
  function showModal() {
    if (modalRef.current) {
      modalRef.current.close();
    }
  }

  axios
    .get(apiUrl)
    .then((response) => {
      // Upon successful response, store the fetched data in the object
      dataObject.data = response.data;
      console.log("Data fetched successfully:", dataObject);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error("Error fetching data:", error.message);
    });

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
      <button onClick={showModal}>Click to show Modal</button>
      <Form ref={modalRef} />
    </>
  );
}

export default App;
