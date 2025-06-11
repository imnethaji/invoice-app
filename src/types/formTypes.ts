export interface Item {
  itemName?: string;
  quantity?: number;
  price?: number;
}

export interface AddressData {
  street?: string;
  city?: string;
  postCode?: string;
  country?: string;
}

export interface InvoiceFormData {
  id?: string;
  status?: string;
  senderAddress?: AddressData;
  clientAddress?: AddressData;
  clientName?: string;
  clientEmail?: string;
  createdAt?: string;
  paymentDue?: string;
  paymentTerms?: number;
  description?: string;
  items?: Item[];
  total?: number;
}
