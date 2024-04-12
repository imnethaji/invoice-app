import deleteBin from "../assets/icon-delete.svg";
import React, { useState } from "react";

interface Item {
  itemName: string;
  qty: string;
  price: string;
}

interface FormData {
  billFrom: {
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  billTo: {
    clientName: string;
    clientEmail: string;
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
    issueDate: string;
    paymentTerms: string;
    projectDescription: string;
    items: Item[];
  };
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    // Initialize form data
    billFrom: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
    billTo: {
      clientName: "",
      clientEmail: "",
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
      issueDate: "",
      paymentTerms: "",
      projectDescription: "",
      items: [{ itemName: "", qty: "", price: "" }],
    },
  });

  const inputClasses =
    "bg-cardBgBlue w-full h-10 rounded text-white pl-4 mb-4 mt-4";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: keyof FormData,
    field: keyof FormData["billFrom"] | keyof FormData["billTo"]
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], [field]: value },
    }));
    console.log(formData);
  };

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Item
  ) => {
    console.log(field);
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      billTo: {
        ...prevData.billTo,
        items: [{ ...prevData.billTo.items[index], [field]: value }],
      },
    }));
    console.log(formData.billTo.items[0]);
  };

  const addNewItem = () => {
    setFormData;
  };

  const deleteItemRow = (index: number) => {
    console.log(index);
    console.log("works");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="w-[600px] mb-10 pl-10" onSubmit={handleSubmit}>
      <h1 className="font-bold text-white text-2xl">New Invoice</h1>
      <div className="Address">
        <h1 className="font-bold text-purpleButton mb-8">Bill From</h1>
        <label className="text-white mt-[40px]" htmlFor="streetAddress">
          Street Address
        </label>
        <input
          className={inputClasses}
          type="text"
          name="streetAddress"
          id="streetAddress"
          value={formData.billFrom.streetAddress}
          onChange={(e) => handleChange(e, "billFrom", "streetAddress")}
        />
        <br />
        <div className="flex justify-between w-full">
          <div className="w-1/3">
            <label className="block text-white" htmlFor="city">
              City
            </label>
            <input
              className={inputClasses}
              type="text"
              name="city"
              id="city"
              value={formData.billFrom.city}
              onChange={(e) => handleChange(e, "billFrom", "city")}
            />
          </div>
          <div className="w-1/3 ml-4">
            <label className="text-white" htmlFor="postCode">
              Post Code
            </label>
            <input
              className={inputClasses}
              type="number"
              name="postCode"
              id="postCode"
              value={formData.billFrom.postCode}
              onChange={(e) => handleChange(e, "billFrom", "postCode")}
            />
          </div>
          <div className="w-1/3 ml-4">
            <label className="block text-white" htmlFor="country">
              Country
            </label>
            <input
              className={inputClasses}
              type="text"
              name="country"
              id="country"
              value={formData.billFrom.country}
              onChange={(e) => handleChange(e, "billFrom", "country")}
            />
          </div>
        </div>
      </div>
      <div className="Bill To">
        <h1 className="font-bold text-purpleButton">Bill To</h1>
        <label className="text-white" htmlFor="clientName">
          Client's Name
        </label>
        <input
          className={inputClasses}
          type="text"
          name="clientName"
          id="clientName"
          value={formData.billTo.clientName}
          onChange={(e) => handleChange(e, "billTo", "clientName")}
        />
        <label className="text-white" htmlFor="clientEmail">
          Client's Email
        </label>
        <input
          className={inputClasses}
          type="text"
          name="clientEmail"
          id="clientEmail"
          value={formData.billTo.clientEmail}
          onChange={(e) => handleChange(e, "billTo", "clientEmail")}
        />
        <label className="text-white" htmlFor="streetAddress">
          Street Address
        </label>
        <input
          className={inputClasses}
          type="text"
          name="streetAddress"
          id="streetAddress"
          value={formData.billTo.streetAddress}
          onChange={(e) => handleChange(e, "billTo", "streetAddress")}
        />
        <br />
        <div className="flex justify-between">
          <div className="w-1/3">
            <label className="text-white" htmlFor="city">
              City
            </label>
            <input
              className={inputClasses}
              type="text"
              name="city"
              id="city"
              value={formData.billTo.city}
              onChange={(e) => handleChange(e, "billTo", "city")}
            />
          </div>
          <div className="w-1/3 ml-4">
            <label className="text-white" htmlFor="postCode">
              Post Code
            </label>
            <input
              className={inputClasses}
              type="number"
              name="postCode"
              id="postCode"
              value={formData.billTo.postCode}
              onChange={(e) => handleChange(e, "billTo", "postCode")}
            />
          </div>
          <div className="w-1/3 ml-4">
            <label className="text-white" htmlFor="country">
              Country
            </label>
            <input
              className={inputClasses}
              type="text"
              name="country"
              id="country"
              value={formData.billTo.country}
              onChange={(e) => handleChange(e, "billTo", "country")}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2">
            <label className="text-white" htmlFor="issueDate">
              Issue Date
            </label>
            <input
              className={`${inputClasses} pr-4`}
              type="date"
              name="issueDate"
              id="issueDate"
              value={formData.billTo.issueDate}
              onChange={(e) => handleChange(e, "billTo", "issueDate")}
            />
          </div>
          <div className="w-1/2 ml-4">
            <label className="text-white" htmlFor="paymentTerms">
              Payment Terms
            </label>
            <br />
            <select
              className={`${inputClasses} pr-10`}
              name="paymentTerms"
              id="paymentTerms"
              onChange={(e) => handleChange(e, "billTo", "paymentTerms")}
            >
              <option value="30">30 Days</option>
              <option value="15">15 Days</option>
              <option value="5">5 Days</option>
              <option value="1">1 Day</option>
            </select>
          </div>
          <br />
        </div>
        <label className="text-white" htmlFor="projectDescription">
          Project Description
        </label>
        <input
          className={inputClasses}
          type="text"
          name="projectDescription"
          id="projectDescription"
          value={formData.billTo.projectDescription}
          onChange={(e) => handleChange(e, "billTo", "projectDescription")}
        />
        <br />
      </div>
      <table className="table-fixed text-white">
        <thead>
          <tr className="">
            <th>Item Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {formData.billTo.items.map((_, index) => (
            <tr key={index} className="">
              <td>
                <input
                  className={inputClasses}
                  type="text"
                  name={`itemName${index}`}
                  value={formData.billTo.items[index].itemName}
                  onChange={(e) => handleItemChange(e, index, "itemName")}
                />
              </td>
              <td>
                <input
                  className={`${inputClasses}`}
                  type="number"
                  name={`qty${index}`}
                  value={formData.billTo.items[index].qty}
                  onChange={(e) => handleItemChange(e, index, "qty")}
                />
              </td>
              <td>
                <input
                  className={`${inputClasses}`}
                  type="number"
                  name={`price${index}`}
                  value={formData.billTo.items[index].price}
                  onChange={(e) => handleItemChange(e, index, "price")}
                />
              </td>
              <td>
                <h1 className="font-bold text-white">
                  {Number(formData.billTo.items[index].qty) *
                    Number(formData.billTo.items[index].price)}
                </h1>
              </td>
              <td className="w-10 hover:cursor-pointer flex items-center justify-center">
                <img
                  src={deleteBin}
                  alt=""
                  onClick={() => deleteItemRow(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center">
        <button
          className="w-[50%] flex items-center justify-center font-bold text-white bg-purpleButton rounded-full ml-5 p-2 px-3 max-sm:ml-0"
          type="button"
          onClick={addNewItem}
        >
          + Add New Item
        </button>
      </div>
      <div className="buttonContainer flex items-center justify-between mt-10">
        <button className="flex items-center font-bold text-white bg-purpleButton rounded-full ml-5 py-4 px-3 max-sm:ml-0">
          Discard
        </button>
        <div className="flex items-center">
          <button className="flex items-center font-bold text-white bg-purpleButton rounded-full ml-5 py-4 px-3 max-sm:ml-0">
            Save as Draft
          </button>
          <button className="flex items-center font-bold text-white bg-purpleButton rounded-full ml-5 py-4 px-3 max-sm:ml-0">
            Save & Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
