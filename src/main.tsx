import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import InvoiceDetails from "./layout/InvoiceDetails.tsx";
import PageNotFound from "./layout/PageNotFound.tsx";
import { InvoiceDataProvider } from "./context/InvoiceDataContext.tsx";
import { InvoiceFilterProvider } from "./context/InvoiceFilterContext.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <PageNotFound /> },
  {
    path: "/:invoiceId",
    element: <InvoiceDetails />,
    errorElement: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InvoiceDataProvider>
      <InvoiceFilterProvider>
        <RouterProvider router={router} />
      </InvoiceFilterProvider>
    </InvoiceDataProvider>
  </React.StrictMode>
);
