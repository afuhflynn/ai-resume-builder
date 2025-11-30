/**
 * Resumi Email Templates
 * Uses inline styles for maximum compatibility with email clients.
 */

const BRAND_COLOR = "#2563eb"; // Blue-600
const BG_COLOR = "#f8fafc"; // Slate-50
const TEXT_COLOR = "#1e293b"; // Slate-800
const MUTED_COLOR = "#64748b"; // Slate-500

interface BaseTemplateProps {
  previewText: string;
  children: string;
}

/**
 * Base HTML wrapper with branding
 */
function getBaseTemplate({ previewText, children }: BaseTemplateProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resumi Notification</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${BG_COLOR}; color: ${TEXT_COLOR}; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background-color: ${BRAND_COLOR}; padding: 24px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: bold; text-decoration: none; letter-spacing: -0.5px; }
    .content { padding: 32px 24px; line-height: 1.6; }
    .footer { background-color: #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: ${MUTED_COLOR}; }
    .button { display: inline-block; background-color: ${BRAND_COLOR}; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
    h1 { font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px; color: ${TEXT_COLOR}; }
    p { margin-bottom: 16px; }
    .divider { height: 1px; background-color: #e2e8f0; margin: 24px 0; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .info-table td { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    .info-table td:last-child { text-align: right; font-weight: 600; }
  </style>
</head>
<body>
  <div style="padding: 40px 16px;">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="logo">Resumi</a>
      </div>

      <!-- Content -->
      <div class="content">
        ${children}
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Resumi AI Resume Builder. All rights reserved.</p>
        <p>
          <a href="${
            process.env.NEXT_PUBLIC_APP_URL
          }/privacy" style="color: ${MUTED_COLOR}; text-decoration: underline;">Privacy Policy</a> •
          <a href="${
            process.env.NEXT_PUBLIC_APP_URL
          }/terms" style="color: ${MUTED_COLOR}; text-decoration: underline;">Terms of Service</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Welcome Email Template
 */
export function getWelcomeEmail(name: string): string {
  const content = `
    <h1>Welcome to Resumi, ${name}! 👋</h1>
    <p>We're thrilled to have you on board. You've taken the first step towards landing your dream job with a professional, AI-powered resume.</p>
    <p>Here's what you can do right now:</p>
    <ul>
      <li><strong>Create your first resume:</strong> Use our templates or start from scratch.</li>
      <li><strong>Generate with AI:</strong> Let our AI write professional content for you.</li>
      <li><strong>Optimize for ATS:</strong> Ensure your resume gets past the bots.</li>
    </ul>
    <div style="text-align: center; margin-top: 24px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Go to Dashboard</a>
    </div>
  `;
  return getBaseTemplate({
    previewText: "Welcome to Resumi!",
    children: content,
  });
}

/**
 * Payment Success Email Template
 */
export function getPaymentSuccessEmail(
  planName: string,
  amount: number,
  date: string
): string {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);

  const content = `
    <h1>Payment Confirmation</h1>
    <p>Thank you for your purchase! Your subscription to the <strong>${planName}</strong> plan is now active.</p>

    <table class="info-table">
      <tr>
        <td>Plan</td>
        <td>${planName}</td>
      </tr>
      <tr>
        <td>Amount</td>
        <td>${formattedAmount}</td>
      </tr>
      <tr>
        <td>Date</td>
        <td>${date}</td>
      </tr>
    </table>

    <p>You now have access to all premium features and AI credits included in your plan.</p>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/billing" class="button">View Billing Details</a>
    </div>
  `;
  return getBaseTemplate({ previewText: "Payment Receipt", children: content });
}

/**
 * Low Credits Alert Template
 */
export function getLowCreditsEmail(credits: number): string {
  const content = `
    <h1>Running Low on Credits ⚠️</h1>
    <p>This is a friendly reminder that your AI credits are running low.</p>

    <div style="background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 6px; padding: 16px; text-align: center; margin: 24px 0;">
      <span style="font-size: 24px; font-weight: 700; color: #e11d48;">${credits} Credits Remaining</span>
    </div>

    <p>To continue using our advanced AI features like resume generation, rewriting, and cover letter creation, you'll need to top up your credits.</p>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/billing" class="button">Top Up Credits</a>
    </div>
  `;
  return getBaseTemplate({
    previewText: "Low Credits Alert",
    children: content,
  });
}
