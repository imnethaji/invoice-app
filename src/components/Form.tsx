import deleteBin from "../assets/icon-delete.svg";
import React, { useState } from "react";

interface Item {
  itemName: string;
  qty: string;
  price: string;
}

interface AddressData {
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
}

interface FormData {
  senderAddress: AddressData;
  clientAddress: AddressData;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  paymentTerms: string;
  projectDescription: string;
  items: Item[];
}

const Form: React.FC = () => {
  const dateNow = new Date().toISOString().slice(0, 10);
  const inputClasses = "bg-cardBgBlue h-14 rounded text-white pl-4 mb-6 mt-2";
  const [formData, setFormData] = useState<FormData>({
    // Initialize form data
    senderAddress: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientName: "",
    clientEmail: "",
    issueDate: dateNow,
    paymentTerms: "",
    projectDescription: "",
    items: [{ itemName: "", qty: "", price: "" }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: keyof FormData,
    field?: keyof AddressData
  ) => {
    const { value } = e.target;
    console.log(value);
    console.log(section);
    if (field) {
      setFormData((prevData) => ({ ...prevData, [section]: [field] }));
    } else {
      console.log("field is not present");
    }
  };

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Item
  ) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedItems = [...prevData.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
      return {
        ...prevData,
        items: updatedItems,
      };
    });
  };

  const addNewItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { itemName: "", qty: "", price: "" }],
    }));
  };

  const deleteItemRow = (index: number) => {
    if (formData.items.length !== 1) {
      setFormData((prevData) => ({
        ...prevData,
        items: [
          ...prevData.items.filter((_, itemIndex) => itemIndex !== index),
        ],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <dialog
      className="w-[700px] mb-10 bg-[#10111d] p-10 rounded-xl mt-10"
      onSubmit={handleSubmit}
      open
    >
      <h1 className="font-bold text-[#DFE3FA] text-2xl">New Invoice</h1>
      <div className="Address">
        <h1 className="font-bold text-purpleButton mb-4 mt-10">Bill From</h1>
        <label className="block text-[#DFE3FA] mt-4" htmlFor="streetAddress">
          Street Address
        </label>
        <input
          className={inputClasses + " w-full"}
          type="text"
          name="streetAddress"
          id="streetAddress"
          value={formData.senderAddress.streetAddress}
          onChange={(e) => handleChange(e, "senderAddress", "streetAddress")}
        />
        <br />
        <div className="flex justify-between w-full">
          <div className="w-1/3">
            <label className="block text-[#DFE3FA]" htmlFor="city">
              City
            </label>
            <input
              className={inputClasses}
              type="text"
              name="city"
              id="city"
              value={formData.senderAddress.city}
              onChange={(e) => handleChange(e, "senderAddress", "city")}
            />
          </div>
          <div className="w-1/3 ml-4">
            <label className="block text-[#DFE3FA]" htmlFor="postCode">
              Post Code
            </label>
            <input
              className={inputClasses}
              type="number"
              name="postCode"
              id="postCode"
              value={formData.senderAddress.postCode}
              onChange={(e) => handleChange(e, "senderAddress", "postCode")}
            />
          </div>
          <div className="w-1/3 ml-4">
            <label className="block text-[#DFE3FA]" htmlFor="country">
              Country
            </label>
            <input
              className={inputClasses}
              type="text"
              name="country"
              id="country"
              value={formData.senderAddress.country}
              onChange={(e) => handleChange(e, "senderAddress", "country")}
            />
          </div>
        </div>
      </div>
      <div className="Bill To">
        <h1 className="font-bold text-purpleButton mb-4 mt-10">Bill To</h1>
        <label className="text-[#DFE3FA] block" htmlFor="clientName">
          Client's Name
        </label>
        <input
          className={inputClasses + " w-full"}
          type="text"
          name="clientName"
          id="clientName"
          value={formData.clientName}
          onChange={(e) => handleChange(e, "clientName")}
        />
        <label className="block text-[#DFE3FA]" htmlFor="clientEmail">
          Client's Email
        </label>
        <input
          className={inputClasses + " w-full"}
          type="text"
          name="clientEmail"
          id="clientEmail"
          value={formData.clientEmail}
          onChange={(e) => handleChange(e, "clientEmail")}
        />
        <label className="block text-[#DFE3FA]" htmlFor="streetAddress">
          Street Address
        </label>
        <input
          className={inputClasses + " w-full"}
          type="text"
          name="streetAddress"
          id="streetAddress"
          value={formData.clientAddress.streetAddress}
          onChange={(e) => handleChange(e, "clientAddress", "streetAddress")}
        />
        <br />
        <div className="flex justify-between">
          <div className="w-1/3">
            <label className="text-[#DFE3FA]" htmlFor="city">
              City
            </label>
            <input
              className={inputClasses}
              type="text"
              name="city"
              id="city"
              value={formData.clientAddress.city}
              onChange={(e) => handleChange(e, "clientAddress", "city")}
            />
          </div>
          <div className="w-1/3 ml-4">
            <label className="text-[#DFE3FA]" htmlFor="postCode">
              Post Code
            </label>
            <input
              className={inputClasses}
              type="number"
              name="postCode"
              id="postCode"
              value={formData.clientAddress.postCode}
              onChange={(e) => handleChange(e, "clientAddress", "postCode")}
            />
          </div>
          <div className="w-1/3 ml-4">
            <label className="text-[#DFE3FA]" htmlFor="country">
              Country
            </label>
            <input
              className={inputClasses}
              type="text"
              name="country"
              id="country"
              value={formData.clientAddress.country}
              onChange={(e) => handleChange(e, "clientAddress", "country")}
            />
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <div className="w-1/2">
            <label className="text-[#DFE3FA] block" htmlFor="issueDate">
              Invoice Date
            </label>
            <input
              className={`${inputClasses} w-full pr-4`}
              type="date"
              name="issueDate"
              id="issueDate"
              value={formData.issueDate}
              onChange={(e) => handleChange(e, "issueDate")}
            />
          </div>
          <div className="w-1/2 ml-4">
            <label className="text-[#DFE3FA] block" htmlFor="paymentTerms">
              Payment Terms
            </label>
            <select
              className={`${inputClasses} w-full pr-10`}
              name="paymentTerms"
              id="paymentTerms"
              onChange={(e) => handleChange(e, "paymentTerms")}
            >
              <option value="">Select</option>
              <option value="30">30 Days</option>
              <option value="15">15 Days</option>
              <option value="5">5 Days</option>
              <option value="1">1 Day</option>
            </select>
          </div>
          <br />
        </div>
        <label className="block text-[#DFE3FA]" htmlFor="projectDescription">
          Project Description
        </label>
        <input
          className={inputClasses + " w-full"}
          type="text"
          name="projectDescription"
          id="projectDescription"
          value={formData.projectDescription}
          onChange={(e) => handleChange(e, "projectDescription")}
        />
        <br />
      </div>
      <h1 className="font-bold text-2xl mt-6 mb-4 text-[#777F98]">Item List</h1>
      <div className="itemTable text-[#DFE3FA]">
        <div className="tableHeader grid grid-cols-8">
          <h1 className="col-span-3">Item Name</h1>
          <h1>Qty.</h1>
          <h1 className="col-span-2">Price</h1>
          <h1>Total</h1>
          <h1></h1>
        </div>
        <ul>
          {formData.items.map((_, index: number) => (
            <li key={index} className="grid grid-cols-8">
              <input
                className={`${inputClasses} col-span-3 mr-4`}
                type="text"
                name={`itemName${index}`}
                value={formData.items[index].itemName}
                onChange={(e) => handleItemChange(e, index, "itemName")}
              />

              <input
                className={`${inputClasses} mr-4`}
                type="number"
                name={`qty${index}`}
                value={formData.items[index].qty}
                onChange={(e) => handleItemChange(e, index, "qty")}
              />

              <input
                className={`${inputClasses} col-span-2 mr-4`}
                type="number"
                name={`price${index}`}
                value={formData.items[index].price}
                onChange={(e) => handleItemChange(e, index, "price")}
              />
              <div className="flex items-center mb-6 mt-2">
                <h1 className="font-bold text-white ">
                  {Number(formData.items[index].qty) *
                    Number(formData.items[index].price)}
                </h1>
              </div>
              <div className="flex items-center justify-center mb-6 mt-2">
                <img
                  src={deleteBin}
                  alt=""
                  onClick={() => deleteItemRow(index)}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="tableFooter w-full flex justify-center">
          <button
            className="w-full flex items-center justify-center font-bold text-[#DFE3FA] bg-[#252945] rounded-full py-4 px-3 max-sm:ml-0"
            type="button"
            onClick={addNewItem}
          >
            + Add New Item
          </button>
        </div>
      </div>
      <div className="buttonContainer flex items-center justify-between mt-10">
        <button className="flex items-center justify-center font-bold text-[#7E88C3] bg-white rounded-full w-28 py-4 px-3 max-sm:ml-0">
          Discard
        </button>
        <div className="flex items-center">
          <button className="flex items-center font-bold text-[#DFE3FA] bg-[#373B53] rounded-full py-4 px-7 max-sm:ml-0">
            Save as Draft
          </button>
          <button
            className="flex items-center font-bold text-white bg-purpleButton rounded-full ml-2 py-4 px-7 max-sm:ml-0"
            type="submit"
          >
            Save & Send
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Form;
