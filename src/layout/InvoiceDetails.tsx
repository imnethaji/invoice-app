import { useEffect, useState } from "react";
import Invoice from "../types/types";
import { InvoiceFormData } from "../types/formTypes";
import leftArrow from "../assets/icon-arrow-left.svg";
import Form from "../Modal/Form";
import { useParams, useNavigate } from "react-router";
import DeleteModal from "../components/DeleteModal";
import { AnimatePresence, motion } from "framer-motion";
import { useInvoiceData } from "../context/useInvoiceData";

const InvoiceDetails = () => {
  const { invoices, setInvoices } = useInvoiceData();
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const invoice = invoices.find((item) => item.id === invoiceId);
  const [isEditingOn, setIsEditingOn] = useState(false);
  const [isDeleteOn, setIsDeleteOn] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPaid, setIsPaid] = useState(() => {
    return invoice?.status === "paid" || false;
  });

  useEffect(() => {
    if (!invoice) {
      navigate("/");
    }
  }, [invoice, navigate]);

  let paidButtonClass = `bg-purpleButton`;
  const buttonClass =
    "flex items-center  justify-center ml-10 w-[120px] p-3 rounded bg-opacity-20 font-bold text-md";
  let statusColor = "";
  const invoiceButtonClass = "text-white rounded-full ml-4 font-bold px-8 py-4";

  // Status color changing depending on paid status
  if (isPaid) {
    statusColor = "bg-paidButton text-paidButton";
    paidButtonClass = "bg-editButton text-grey";
  } else if (invoice?.status === "pending") {
    statusColor = "bg-pendingButton text-pendingButton";
  } else {
    statusColor = "bg-draftButton text-draftButton";
  }

  function toggleDeleteModal() {
    setIsDeleteOn(!isDeleteOn);
  }

  function handleDeleteModalActions(action: "cancel" | "delete") {
    if (action === "cancel") {
      setIsDeleteOn(false);
    } else if (action === "delete") {
      setDeleteProgress(true);
      setIsDeleteOn(true);
      setShowSuccess(false);

      // Simulating API call
      setTimeout(() => {
        try {
          // Update invoices
          const updatedInvoices = invoices.filter(
            (item) => item.id !== invoiceId
          );
          setInvoices(updatedInvoices);

          // Update UI states
          setDeleteProgress(false);
          setIsDeleteOn(false);
          setShowSuccess(true);

          // If you want to navigate, do it here
          // navigate("/");
        } catch (error) {
          setDeleteProgress(false);
          setIsDeleteOn(false);
          console.error("Failed to delete invoice:", error);
        }
      }, 2000);
    }
  }

  const formatDate = (dateString: string) => {
    // Create a new Date object from the dateString
    const date = new Date(dateString);

    // Options for formatting the date
    const options = {
      day: "2-digit" as const,
      month: "short" as const,
      year: "numeric" as const,
    };

    // Format the date using toLocaleDateString
    return date.toLocaleDateString("en-GB", options);
  };
  function handleOpenModal() {
    setIsEditingOn(true);
  }

  function handleCloseModal() {
    setIsEditingOn(false);
  }

  function updatePaidStatus() {
    if (invoice?.status === "draft") return;
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: "paid" } : invoice
      )
    );
    setIsPaid(true);
  }

  const handleFormUpdate = async (
    e: React.FormEvent,
    updatedInvoiceData: Invoice | InvoiceFormData
  ) => {
    e.preventDefault();
    console.log(updatedInvoiceData);
    setIsEditingOn(false);
  };

  return (
    <motion.div
      initial={{ x: "200%" }}
      animate={{ x: 0 }}
      exit={{ x: "200%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="invoiceContainer w-[730px] max-sm:w-screen flex flex-col items-center justify-between my-5 mx-auto"
    >
      <AnimatePresence mode="wait">
        {isEditingOn && (
          <Form
            isActive={isEditingOn}
            closeModal={handleCloseModal}
            invoiceData={invoice}
            mode="edit"
            handleSubmit={handleFormUpdate}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isDeleteOn && (
          <DeleteModal
            showSuccess={showSuccess}
            isActive={isDeleteOn}
            onClose={toggleDeleteModal}
            invoiceId={invoiceId}
            deleteProgress={deleteProgress}
            handleDeleteModalActions={handleDeleteModalActions}
          />
        )}
      </AnimatePresence>

      <div
        className="w-full flex mb-8 max-sm:w-[90%]"
        onClick={() => navigate("/")}
      >
        <button className="text-white flex mt-6 justify-center items-center">
          <img src={leftArrow} alt="" className="mr-4" />
          <span className="mt-1">Go back</span>
        </button>
      </div>
      {/* Invoice Header with button controls starts here*/}
      <div className="invoiceHeader w-[100%] bg-cardBgBlue flex justify-between py-4 px-6 rounded-xl max-sm:w-[90%]">
        <div className="flex max-sm:w-full items-center max-sm:justify-between">
          <p className="text-white">Status</p>
          <button disabled className={`${buttonClass} ${statusColor}`}>
            <div className={`${statusColor} w-2 h-2 mr-2 rounded-full`}></div>
            {invoice?.status}
          </button>
        </div>
        <div className="invoiceButtons max-sm:hidden">
          <button
            onClick={handleOpenModal}
            className={`${invoiceButtonClass} bg-editButton`}
          >
            Edit
          </button>
          <button
            className={`${invoiceButtonClass} bg-deleteButton`}
            onClick={toggleDeleteModal}
          >
            Delete
          </button>
          {invoice?.status !== "paid" && (
            <button
              className={`${invoiceButtonClass} ${paidButtonClass}`}
              disabled={isPaid}
              onClick={updatePaidStatus}
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>
      {/* Invoice Detail container starts */}
      <div className="invoiceDetailsContainer w-full max-sm:w-[90%] text-white bg-cardBgBlue mt-6 rounded-xl p-14">
        <div className="id w-[100%] max-sm:w-[90%]">
          <div className="detailsRow1 w-[100%] flex justify-between max-sm:flex-col max-sm:space-y-4">
            <div>
              <h1 className="font-bold">#{invoice?.id}</h1>
              <p>{invoice?.description}</p>
            </div>
            <div>
              <p className="">{invoice?.senderAddress.street}</p>
              <p className="">{invoice?.senderAddress.city}</p>
              <p className="">{invoice?.senderAddress.postCode}</p>
              <p className="">{invoice?.senderAddress.country}</p>
            </div>
          </div>
          <div className="detailsRow2 flex mt-4 max-sm:flex-col">
            <div className="flex">
              <div className="row2col1 w-[200px] flex flex-col justify-between">
                <div>
                  <p>Invoice Date</p>
                  <p className="font-bold mt-2">
                    {formatDate(invoice?.createdAt)}
                  </p>
                </div>
                <div>
                  <p>Payment Due</p>
                  <p className="font-bold mt-2">
                    {formatDate(invoice?.paymentDue)}
                  </p>
                </div>
              </div>
              <div className="h-[160px] w-[210px]">
                <p>Bill To</p>
                <p className="font-bold mb-2 mt-2">{invoice?.clientName}</p>
                <p className="">{invoice?.clientAddress.street}</p>
                <p className="">{invoice?.clientAddress.city}</p>
                <p className="">{invoice?.clientAddress.postCode}</p>
                <p className="">{invoice?.clientAddress.country}</p>
              </div>
            </div>
            <div className="max-sm:mt-4">
              <p>Sent to</p>
              <p className="font-bold mt-2">{invoice?.clientEmail}</p>
            </div>
          </div>
        </div>
        <div className="itemListContainer bg-[#252945] p-10 pb-0 px-0 mt-10 rounded-xl">
          <div className="tableHeader grid grid-cols-4 mb-10 px-10 text-sm">
            <div>Item Name</div>
            <div className="text-center">QTY.</div>
            <div className="text-right">Price</div>
            <div className="text-right">Total</div>
          </div>
          <ul>
            {invoice?.items.map((item, index) => (
              <li
                key={index}
                className="tableRow grid grid-cols-4 text-right mb-10 px-10 font-bold"
              >
                <div className="text-left">{item.itemName}</div>
                <div className="text-center">{item.quantity}</div>
                <div>&#8377; {item.price}</div>
                <div>&#8377; {item.total}</div>
              </li>
            ))}
          </ul>
          <div className="tableFooter bg-[#0C0E16] flex justify-between items-center px-10 py-7 rounded-b-lg">
            <p className="text-sm">Amount Due</p>
            <h1 className="text-right font-bold text-2xl">
              &#8377;{" "}
              {invoice?.items.reduce((acc, item) => (acc += item.total), 0)}
            </h1>
          </div>
        </div>
      </div>
      <div className="invoiceButtons hidden max-sm:mt-10 max-sm:flex max-sm:h-12">
        <button
          onClick={handleOpenModal}
          className={`${invoiceButtonClass} bg-editButton`}
        >
          Edit
        </button>
        <button
          className={`${invoiceButtonClass} bg-deleteButton`}
          onClick={toggleDeleteModal}
        >
          Delete
        </button>
        {invoice?.status !== "paid" && (
          <button
            className={`${invoiceButtonClass} ${paidButtonClass}`}
            disabled={isPaid}
            onClick={updatePaidStatus}
          >
            Mark as Paid
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default InvoiceDetails;
