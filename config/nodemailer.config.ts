import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  service: "Gmail", // Or any other email service provider
  auth: {
    user: process.env.NODEMAILER_EMAIL_SENDER,
    pass: process.env.NODEMAILER_GMAIL_PASS_KEY,
  },
});
