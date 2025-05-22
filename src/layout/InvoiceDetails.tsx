import { useState } from "react";
import Invoice from "../types/types";
import leftArrow from "../assets/icon-arrow-left.svg";
import Form from "../Modal/Form";
import INVOICE_DATA from "../data file/data.json";
import { useParams, useNavigate } from "react-router";
import DeleteModal from "../components/DeleteModal";
import { AnimatePresence, motion } from "framer-motion";
const invoiceData: Invoice[] = INVOICE_DATA;

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const index = invoiceData.findIndex((item) => item.id === invoiceId);
  const [isEditingOn, setIsEditingOn] = useState(false);
  const [isDeleteOn, setIsDeleteOn] = useState(false);
  const [isPaid, setIsPaid] = useState(
    invoiceData[index].status === "paid" ? true : false
  );

  console.log(invoiceData[index].status);
  function toggleDeleteModal() {
    setIsDeleteOn(!isDeleteOn);
  }
  function handleDeleteModalActions(action: "cancel" | "delete") {
    if (action == "cancel") {
      setIsDeleteOn(!isDeleteOn);
    }
  }
  let paidButtonClass = `bg-purpleButton`;
  const buttonClass =
    "flex items-center  justify-center ml-10 w-[120px] p-3 rounded bg-opacity-20 font-bold text-md";
  let statusColor = "";
  const invoiceButtonClass = "text-white rounded-full ml-4 font-bold px-8 py-4";
  // Status color changing depending on paid status
  if (isPaid) {
    statusColor = "bg-paidButton text-paidButton";
    paidButtonClass = "bg-editButton text-grey";
  } else if (invoiceData[index].status === "pending") {
    statusColor = "bg-pendingButton text-pendingButton";
  } else {
    statusColor = "bg-draftButton text-draftButton";
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
    if (invoiceData[index].status == "draft") return;
    invoiceData[index].status = "paid";
    setIsPaid(true);
  }

  return (
    <motion.div
      initial={{ x: "200%" }}
      animate={{ x: 0 }}
      exit={{ x: "200%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="invoiceContainer w-[730px] flex flex-col items-center justify-between my-5 mx-auto"
    >
      <AnimatePresence>
        {isEditingOn && (
          <Form
            isOpen={isEditingOn}
            closeModal={handleCloseModal}
            invoiceData={invoiceData[index]}
            mode="edit"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isDeleteOn && (
          <DeleteModal
            invoiceId={invoiceId}
            handleDeleteModalActions={handleDeleteModalActions}
          />
        )}
      </AnimatePresence>

      <div className="w-full flex mb-8" onClick={() => navigate("/")}>
        <button className="text-white flex mt-6 justify-center items-center">
          <img src={leftArrow} alt="" className="mr-4" />
          <span className="mt-1">Go back</span>
        </button>
      </div>
      {/* Invoice Header with button controls starts here*/}
      <div className="invoiceHeader w-[100%] bg-cardBgBlue flex justify-between py-4 px-6 rounded-xl">
        <div className="flex items-center">
          <p className="text-white">Status</p>
          <button disabled className={`${buttonClass} ${statusColor}`}>
            <div className={`${statusColor} w-2 h-2 mr-2 rounded-full`}></div>
            {invoiceData[index].status}
          </button>
        </div>
        <div className="invoiceButtons">
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
          {invoiceData[index].status !== "paid" && (
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
      <div className="invoiceDetailsContainer w-[100%] text-white bg-cardBgBlue mt-6 rounded-xl p-14">
        <div className="id w-[100%]">
          <div className="detailsRow1 w-[100%] flex justify-between">
            <div>
              <h1 className="font-bold">#{invoiceData[index].id}</h1>
              <p>{invoiceData[index].description}</p>
            </div>
            <div>
              <p className="">{invoiceData[index].senderAddress.street}</p>
              <p className="">{invoiceData[index].senderAddress.city}</p>
              <p className="">{invoiceData[index].senderAddress.postCode}</p>
              <p className="">{invoiceData[index].senderAddress.country}</p>
            </div>
          </div>
          <div className="detailsRow2 flex mt-4">
            <div className="row2col1 w-[200px] flex flex-col justify-between">
              <div>
                <p>Invoice Date</p>
                <p className="font-bold mt-2">
                  {formatDate(invoiceData[index].createdAt)}
                </p>
              </div>
              <div>
                <p>Payment Due</p>
                <p className="font-bold mt-2">
                  {formatDate(invoiceData[index].paymentDue)}
                </p>
              </div>
            </div>
            <div className="h-[160px] w-[210px]">
              <p>Bill To</p>
              <p className="font-bold mb-2 mt-2">
                {invoiceData[index].clientName}
              </p>
              <p className="">{invoiceData[index].clientAddress.street}</p>
              <p className="">{invoiceData[index].clientAddress.city}</p>
              <p className="">{invoiceData[index].clientAddress.postCode}</p>
              <p className="">{invoiceData[index].clientAddress.country}</p>
            </div>
            <div>
              <p>Sent to</p>
              <p className="font-bold mt-2">{invoiceData[index].clientEmail}</p>
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
            {invoiceData[index].items.map((item, index) => (
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
          <div className="tableFooter bg-[#0C0E16] flex justify-between items-center px-10 py-7 rounded-xl">
            <p className="text-sm">Amount Due</p>
            <h1 className="text-right font-bold text-2xl">
              &#8377;{" "}
              {invoiceData[index].items.reduce(
                (acc, item) => (acc += item.total),
                0
              )}
            </h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceDetails;
