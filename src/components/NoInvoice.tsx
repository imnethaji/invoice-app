import emptyIllustration from "../assets/illustration-empty.svg";

const NoInvoice = () => {
  return (
    <div className="w-screen h-[800px] flex flex-col items-center justify-center">
      <img src={emptyIllustration} alt="" className="w-50" />
      <h1 className="text-white text-2xl font-bold mt-14">
        There is nothing here
      </h1>
      <p className="text-white text-center mt-7">
        Create an invoice by clicking the <br />
        <span className="font-bold">New Invoice</span> button and get started
      </p>
    </div>
  );
};

export default NoInvoice;
