import { useState } from "react";
import Invoice from "../types/types";
import leftArrow from "../assets/icon-arrow-left.svg";

type InvoiceDetailsProps = {
  invoiceData: Invoice[];
};

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoiceData }) => {
  const [index, setIndex] = useState(0);
  const buttonClass =
    "flex items-center  justify-center ml-10 w-[120px] p-3 rounded bg-opacity-20 font-bold text-md";
  let statusColor = "";
  const invoiceButtonClass = "text-white rounded-full ml-4 font-bold px-8 py-4";
  // Color changing depending on paid status
  if (invoiceData[index].status === "paid") {
    statusColor = "bg-paidButton text-paidButton";
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

  return (
    <div className="w-[70%] invoiceOpen flex flex-col items-center justify-between m-auto mt-10 ">
      {/* Navigation Button Starts here */}
      <div className="navigationButtonContainer w-full flex justify-between mb-2">
        <button
          className="p-2 bg-purpleButton text-white w-24 font-bold rounded-full"
          onClick={() => {
            if (index >= 1) setIndex((n) => n - 1);
          }}
        >
          Previous
        </button>
        <button
          className="p-2 bg-purpleButton text-white w-24 font-bold rounded-full"
          onClick={() => {
            if (index < 6) setIndex((n) => n + 1);
          }}
        >
          Next
        </button>
      </div>
      <div className="w-full flex mb-10">
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
          <button className={`${invoiceButtonClass} bg-editButton`}>
            Edit
          </button>
          <button className={`${invoiceButtonClass} bg-deleteButton`}>
            Delete
          </button>
          <button className={`${invoiceButtonClass} bg-purpleButton`}>
            Mark as Paid
          </button>
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
          <div className="detailsRow2 flex space-x-24 mt-4">
            <div className="row2col1 w-[150px] flex flex-col justify-between">
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
            <div className="h-[160px] w-[150px]">
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
      </div>
    </div>
  );
};

export default InvoiceDetails;
