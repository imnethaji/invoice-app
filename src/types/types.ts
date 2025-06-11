interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface Item {
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Invoice {
  id?: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total?: number;
}

export default Invoice;
