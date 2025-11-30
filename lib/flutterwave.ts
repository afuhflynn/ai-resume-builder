import axios from "axios";

export const FLUTTERWAVE_CONFIG = {
  public_key: process.env.FLW_PUBLIC_KEY!,
  secret_key: process.env.FLW_SECRET_KEY!,
  encryption_key: process.env.FLW_ENCRYPTION_KEY!,
  webhook_secret: process.env.FLW_WEBHOOK_SECRET!,
};

export interface FlutterwaveInitializePayload {
  tx_ref: string;
  amount: string;
  currency: string;
  redirect_url: string;
  payment_options: string;
  customer: {
    email: string;
    phonenumber?: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  meta?: Record<string, any>;
}

export const flutterwaveClient = axios.create({
  baseURL: "https://api.flutterwave.com/v3",
  headers: {
    Authorization: `Bearer ${FLUTTERWAVE_CONFIG.secret_key}`,
    "Content-Type": "application/json",
  },
});

export async function initializePayment(payload: FlutterwaveInitializePayload) {
  try {
    const response = await flutterwaveClient.post("/payments", payload);
    return response.data;
  } catch (error: any) {
    console.error(
      "Flutterwave Initialize Error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to initialize payment"
    );
  }
}

export async function verifyTransaction(transactionId: string) {
  try {
    const response = await flutterwaveClient.get(
      `/transactions/${transactionId}/verify`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Flutterwave Verify Error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to verify transaction"
    );
  }
}
