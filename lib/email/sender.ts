import { sendEmail } from "@/config/email.sender.setup";
import {
  getWelcomeEmail,
  getPaymentSuccessEmail,
  getLowCreditsEmail,
} from "./templates";

/**
 * Send a welcome email to a new user
 */
export async function sendWelcomeEmail(to: string, name: string) {
  const html = getWelcomeEmail(name);
  await sendEmail(to, "Welcome to Resumi! 🚀", html, {
    "X-Category": "welcome",
  });
}

/**
 * Send a payment receipt email
 */
export async function sendPaymentReceipt(
  to: string,
  planName: string,
  amount: number
) {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const html = getPaymentSuccessEmail(planName, amount, date);
  await sendEmail(to, "Payment Confirmation - Resumi", html, {
    "X-Category": "payment",
  });
}

/**
 * Send a low credits alert email
 */
export async function sendLowCreditsAlert(to: string, credits: number) {
  const html = getLowCreditsEmail(credits);
  await sendEmail(to, "Action Required: Low AI Credits ⚠️", html, {
    "X-Category": "alert",
  });
}
