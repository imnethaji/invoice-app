import axios from "axios";
import Invoice from "../types/types";

const API_BASE_URL = "http://127.0.0.1:5000";

export const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    console.log("Connecting with server.");
    const response = await axios.get(`${API_BASE_URL}/invoices`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};
