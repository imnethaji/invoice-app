import rightArrow from "../assets/icon-arrow-right.svg";
import { Link } from "react-router";

interface Props {
  invoiceID: string;
  dueDate: string;
  clientName: string;
  total: number;
  paymentStatus: string;
}

const InvoiceListItem = ({
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
        <div className="w-[80%] flex justify-between bg-invoiceTab p-5 rounded-xl text-white transition-all max-sm:h-[200px] max-sm:w-[87%] max-xm:hover:w-[90%]">
          <div className="flex items-center max-sm:space-x-0 max-sm:flex-col max-sm:justify-between max-sm:items-start">
            <h1 className="font-bold w-[5em]">#{invoiceID}</h1>
            <p className="w-[8em]">Due {dueDate}</p>
            <p>{clientName}</p>
          </div>
          <div className="flex items-center max-sm:flex-col max-sm:justify-between max-sm:items-center">
            <h1 className="font-bold">&#8377;{total}</h1>
            <button
              disabled
              className={`${buttonClass} font-bold bg-opacity-20 max-sm:ml-0`}
            >
              {titlePaymentStatus}
            </button>
            <Link to={`/${invoiceID}`}>
              <div className="p-2 ml-4 max-sm:ml-0 w-10 h-10 flex items-center justify-center hover:bg-white hover:cursor-pointer rounded-full transition-colors hover:bg-opacity-70">
                <img className=" w-3" src={rightArrow} alt="" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceListItem;
