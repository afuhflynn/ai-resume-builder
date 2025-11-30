import {
  type ChargeViaBankTransferPayload,
  Currency,
  KorapayClient,
  type KorapayResponse,
} from "@gray-adeyi/korapay-sdk";

// Assumes your KORAPAY_PUBLIC_KEY, KORAPAY_SECRET_KEY
// & KORAPAY_ENCRYPTION_KEY is set in your environmental
// variables. They can be passed in explicitly on the
// instantiation which overrides the values set in the environmental
// variables.
const client = new KorapayClient();

const response: KorapayResponse = await client.getBalances();

const payload: ChargeViaBankTransferPayload = {
  reference: "qwerty",
  customer: { email: "johndoe@example.com" },
  amount: 1_000_000,
  currency: Currency.NGN,
  narration: "test charge",
};
client.chargeViaBankTransfer(payload).then(console.log);
