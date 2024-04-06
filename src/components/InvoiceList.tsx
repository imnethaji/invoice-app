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
  return (
    <>
      <div className="mt-10 mb-10">
        <div className="flex w-screen items-center justify-center  ">
          <div className="w-[70%] flex justify-between bg-invoiceTab p-8 rounded-xl text-white">
            <div className="flex space-x-14 items-center">
              <h1 className="font-bold">#{invoiceID}</h1>
              <p>Due {dueDate}</p>
              <p>{clientName}</p>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold">${total}</h1>
              <button className="ml-10">{paymentStatus}</button>
              <img className="ml-6 w-3" src={rightArrow} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceList;
