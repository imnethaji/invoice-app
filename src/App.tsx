import "./App.css";
import plusIcon from "./assets/icon-plus.svg";
import arrowIcon from "./assets/icon-arrow-down.svg";
import emptyIllustration from "./assets/illustration-empty.svg";

function App() {
  return (
    <>
      <div>
        <div className="flex w-screen items-center mt-20 justify-center">
          <div className="flex  w-[70%] justify-between">
            <div>
              <div>
                <h1 className="text-2xl font-bold text-white">Invoices</h1>
                <p className="text-white text-xs">No invoices</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="flex  items-center text-white font-bold cursor-pointer">
                Filter by status{" "}
                <span className="ml-5">
                  <img src={arrowIcon} alt="" />
                </span>
              </p>
              <button className=" flex items-center font-bold text-white bg-buttonPurple text-white rounded-full ml-5 p-2 px-3">
                <div className="w-10 h-10 mr-3 flex items-center justify-center bg-white rounded-full">
                  <img src={plusIcon} alt="" className="w-3 h-3" />
                </div>
                New Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}

export default App;
