import { emailTransporter } from "./nodemailer.config";
import { Attachment } from "nodemailer/lib/mailer/index";

const from = `Flynn at Resumi - AI Resume Builder ${process.env.NODEMAILER_SENDER_EMAIL}`;

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
  headers: {
    "X-Category": string;
  },
  attachments?: Attachment[]
): Promise<void> => {
  try {
    await emailTransporter.sendMail({
      from: from,
      to,
      subject,
      html: htmlContent,
      attachments: attachments,
      headers: headers,
    });
    console.log("Email sent successfully!");
  } catch (error: any | { message: string }) {
    console.error("Error sending email:", error);
  }
};
