import deleteBin from "../assets/icon-delete.svg";
import React, { useState } from "react";
import Invoice from "../types/types";

export interface Item {
  itemName?: string;
  quantity?: string;
  price?: string;
}

export interface AddressData {
  street?: string;
  city?: string;
  postCode?: string;
  country?: string;
}

export interface FormData {
  id?: string;
  status?: string;
  senderAddress?: AddressData;
  clientAddress?: AddressData;
  clientName?: string;
  clientEmail?: string;
  createdAt?: string;
  paymentTerms?: number;
  description?: string;
  items?: Item[];
}

interface formModalProp {
  isOpen: boolean;
  closeModal: () => void;
  invoiceData?: Invoice | FormData;
  mode: "new" | "edit";
}

const Form: React.FC<formModalProp> = ({
  isOpen,
  closeModal,
  invoiceData,
  mode,
}) => {
  const dateNow = new Date().toISOString().slice(0, 10);
  const inputClasses = "bg-cardBgBlue h-14 rounded text-white pl-4 mb-6 mt-2";

  const defaultFormData: FormData = {
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientName: "",
    clientEmail: "",
    createdAt: dateNow,
    paymentTerms: 30,
    description: "",
    items: [{ itemName: "", quantity: "", price: "" }],
  };

  const [formData, setFormData] = useState<FormData>(
    (invoiceData as FormData) || defaultFormData
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: keyof FormData,
    field?: keyof AddressData
  ) => {
    const { value } = e.target;
    if (field) {
      setFormData((prevData: FormData) => ({
        ...prevData,
        [section]: { ...(prevData[section] as AddressData), [field]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [section]: value }));
    }
  };

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Item
  ) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const items = prevData.items ?? [];
      const updatedItems = [...items];
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
      items: [
        ...(prevData.items ?? []),
        { itemName: "", quantity: "", price: "" },
      ],
    }));
  };

  const deleteItemRow = (index: number) => {
    if ((formData.items?.length ?? 0) !== 1) {
      setFormData((prevData) => ({
        ...prevData,
        items: (prevData.items ?? []).filter(
          (_, itemIndex) => itemIndex !== index
        ),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "new") {
      // call function to create invoice
      // await createInvoice(formData);
    } else {
      // call function to update invoice
      // await updateInvoice(formData);
    }

    closeModal(); // or navigate back
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-start justify-center overflow-y-auto p-10">
        <form
          className="w-[700px] mb-10 bg-[#10111d] p-10 rounded-xl mt-10"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-[#DFE3FA] text-2xl">
            {mode === "edit" ? `#${formData.id}` : "New Invoice"}
          </h1>
          <div className="Address">
            <h1 className="font-bold text-purpleButton mb-4 mt-10">
              Bill From
            </h1>
            <label
              className="block text-[#DFE3FA] mt-4"
              htmlFor="streetAddress"
            >
              Street Address
            </label>
            <input
              className={inputClasses + " w-full"}
              type="text"
              name="streetAddress"
              id="streetAddress"
              value={formData.senderAddress?.street}
              onChange={(e) => handleChange(e, "senderAddress", "street")}
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
                  value={formData.senderAddress?.city}
                  onChange={(e) => handleChange(e, "senderAddress", "city")}
                />
              </div>
              <div className="w-1/3 ml-4">
                <label className="block text-[#DFE3FA]" htmlFor="postCode">
                  Post Code
                </label>
                <input
                  className={inputClasses}
                  type="text"
                  name="postCode"
                  id="postCode"
                  value={formData.senderAddress?.postCode}
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
                  value={formData.senderAddress?.country}
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
              value={formData.clientAddress?.street}
              onChange={(e) => handleChange(e, "clientAddress", "street")}
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
                  value={formData.clientAddress?.city}
                  onChange={(e) => handleChange(e, "clientAddress", "city")}
                />
              </div>
              <div className="w-1/3 ml-4">
                <label className="text-[#DFE3FA]" htmlFor="postCode">
                  Post Code
                </label>
                <input
                  className={inputClasses}
                  type="text"
                  name="postCode"
                  id="postCode"
                  value={formData.clientAddress?.postCode}
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
                  value={formData.clientAddress?.country}
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
                  value={formData.createdAt}
                  onChange={(e) => handleChange(e, "createdAt")}
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
                  value={formData.paymentTerms}
                >
                  <option value="">Select</option>
                  <option value="30">30 Days</option>
                  <option value="15">15 Days</option>
                  <option value="7">7 Days</option>
                  <option value="5">5 Days</option>
                  <option value="1">1 Day</option>
                </select>
              </div>
              <br />
            </div>
            <label
              className="block text-[#DFE3FA]"
              htmlFor="projectDescription"
            >
              Project Description
            </label>
            <input
              className={inputClasses + " w-full"}
              type="text"
              name="projectDescription"
              id="projectDescription"
              value={formData.description}
              onChange={(e) => handleChange(e, "description")}
            />
            <br />
          </div>
          <h1 className="font-bold text-2xl mt-6 mb-4 text-[#777F98]">
            Item List
          </h1>
          <div className="itemTable text-[#DFE3FA]">
            <div className="tableHeader grid grid-cols-8">
              <h1 className="col-span-3">Item Name</h1>
              <h1>Qty.</h1>
              <h1 className="col-span-2">Price</h1>
              <h1>Total</h1>
              <h1></h1>
            </div>
            <ul>
              {formData.items?.map((_, index: number) => (
                <li key={index} className="grid grid-cols-8">
                  <input
                    className={`${inputClasses} col-span-3 mr-4`}
                    type="text"
                    name={`itemName${index}`}
                    value={formData.items?.[index]?.itemName}
                    onChange={(e) => handleItemChange(e, index, "itemName")}
                  />

                  <input
                    className={`${inputClasses} mr-4`}
                    type="number"
                    name={`qty${index}`}
                    value={formData.items?.[index]?.quantity}
                    onChange={(e) => handleItemChange(e, index, "quantity")}
                  />

                  <input
                    className={`${inputClasses} col-span-2 mr-4`}
                    type="number"
                    name={`price${index}`}
                    value={formData.items?.[index].price}
                    onChange={(e) => handleItemChange(e, index, "price")}
                  />
                  <div className="flex items-center mb-6 mt-2">
                    <h1 className="font-bold text-white ">
                      {Number(formData.items?.[index].quantity) *
                        Number(formData.items?.[index].price)}
                    </h1>
                  </div>
                  <div className="flex items-center justify-center mb-6 mt-2">
                    <img
                      src={deleteBin}
                      alt="Dustbin button"
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
            <button
              onClick={closeModal}
              className="flex items-center justify-center font-bold text-[#7E88C3] bg-white rounded-full w-28 py-4 px-3 max-sm:ml-0"
            >
              Discard
            </button>
            <div className="flex items-center">
              {(mode === "new" ||
                (mode === "edit" && formData.status === "draft")) && (
                <button className="flex items-center font-bold text-[#DFE3FA] bg-[#373B53] rounded-full py-4 px-7 max-sm:ml-0">
                  Save as Draft
                </button>
              )}

              <button
                className="flex items-center font-bold text-white bg-purpleButton rounded-full ml-2 py-4 px-7 max-sm:ml-0"
                type="submit"
              >
                {mode == "new" ? "Save & Send" : "Update & Send"}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default Form;
