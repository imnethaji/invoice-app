import rightArrow from "../assets/icon-arrow-right.svg";

interface Props {
  invoiceID: string;
  dueDate: string;
  clientName: string;
  total: number;
  paymentStatus: string;
}

const InvoiceList = ({
  invoiceID,
  dueDate,
  clientName,
  total,
  paymentStatus,
}: Props) => {
  let buttonClass = "bg-paidButton ml-10 w-[120px] p-3 rounded";
  const titlePaymentStatus: string = paymentStatus.toUpperCase();

  if (paymentStatus === "paid") {
    buttonClass = "bg-paidButton text-paidButton ml-10 w-[120px] p-3 rounded";
  } else if (paymentStatus === "pending") {
    buttonClass =
      "bg-pendingButton text-pendingButton ml-10 w-[120px] p-3 rounded";
  } else {
    buttonClass = "bg-draftButton text-draftButton ml-10 w-[120px] p-3 rounded";
  }
  return (
    <>
      <div className="flex w-screen justify-center mt-5 mb-5 box-border">
        <div className="w-[70%] hover:w-[72%] flex justify-between bg-invoiceTab p-5 rounded-xl text-white transition-all">
          <div className="flex space-x-16 items-center">
            <h1 className="font-bold">#{invoiceID}</h1>
            <p>Due {dueDate}</p>
            <p>{clientName}</p>
          </div>
          <div className="flex items-center">
            <h1 className="font-bold">${total}</h1>
            <button
              disabled
              className={`${buttonClass} font-bold bg-opacity-20`}
            >
              {titlePaymentStatus}
            </button>
            <div className="p-2 ml-4 w-10 h-10 flex items-center justify-center hover:bg-white hover:cursor-pointer rounded-full transition-colors hover:bg-opacity-70">
              <img className=" w-3" src={rightArrow} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceList;
