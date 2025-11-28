import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Resumi",
  description: "Learn how Resumi collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-4xl py-12 px-4 md:py-20">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p>
            Welcome to Resumi ("we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at support@resumi.com.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and services, when you participate in activities on the Services, or otherwise when you contact us.
          </p>
          <p>The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
          <ul>
            <li><strong>Personal Information You Disclose to Us:</strong> We collect names, email addresses, passwords, contact or authentication data, billing addresses, and other similar information.</li>
            <li><strong>Resume Data:</strong> We collect the information you provide for your resumes, such as work history, education, skills, and contact information.</li>
            <li><strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by our payment processor, Stripe.</li>
            <li><strong>Information Automatically Collected:</strong> We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and other technical information.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Services for a variety of business purposes described below.
          </p>
          <ul>
            <li><strong>To facilitate account creation and logon process.</strong></li>
            <li><strong>To manage user accounts.</strong> We may use your information for the purposes of managing your account and keeping it in working order.</li>
            <li><strong>To send administrative information to you.</strong> We may use your personal information to send you product, service, and new feature information and/or information about changes to our terms, conditions, and policies.</li>
            <li><strong>To protect our Services.</strong> We may use your information as part of our efforts to keep our Services safe and secure (for example, for fraud monitoring and prevention).</li>
            <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may use your information to provide you with the requested service, which includes generating resumes and providing AI-powered analysis.</li>
            <li><strong>To respond to user inquiries/offer support to users.</strong></li>
          </ul>

          <h2>3. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share your data with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing (Stripe), data analysis, email delivery (Resend), hosting services, and AI service providers (OpenAI).
          </p>

          <h2>4. How Do We Keep Your Information Safe?</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>

          <h2>5. What Are Your Privacy Rights?</h2>
          <p>
            In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
          </p>
          <p>
            You may review, change, or terminate your account at any time by logging into your account settings.
          </p>

          <h2>6. Policy for Children</h2>
          <p>
            We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services.
          </p>

          <h2>7. Do We Make Updates to This Notice?</h2>
          <p>
            Yes, we will update this notice as necessary to stay compliant with relevant laws. The updated version will be indicated by an updated "Last updated" date.
          </p>

          <h2>8. How Can You Contact Us About This Notice?</h2>
          <p>
            If you have questions or comments about this notice, you may email us at support@resumi.com.
          </p>
        </div>
      </div>
    </main>
  );
}
