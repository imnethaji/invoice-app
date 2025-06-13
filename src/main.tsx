import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import InvoiceDetails from "./layout/InvoiceDetails.tsx";
import PageNotFound from "./layout/PageNotFound.tsx";
import { InvoiceProvider } from "./context/InvoiceContext.tsx";

const router = createBrowserRouter([
  { path: "/", Component: App, errorElement: <PageNotFound /> },
  {
    path: "/:invoiceId",
    element: <InvoiceDetails />,
    errorElement: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InvoiceProvider>
      <RouterProvider router={router} />
    </InvoiceProvider>
  </React.StrictMode>
);
