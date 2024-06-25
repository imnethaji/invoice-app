import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InvoiceDetails from "./layout/InvoiceDetails.tsx";

const router = createBrowserRouter([
  { path: "/invoices", element: <App /> },
  { path: "/invoices/:invoiceId", element: <InvoiceDetails /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
