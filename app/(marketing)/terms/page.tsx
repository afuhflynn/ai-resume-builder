import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Resumi",
  description: "Read the terms and conditions for using the Resumi AI Resume Builder SaaS.",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl py-12 px-4 md:py-20">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p>
            Welcome to Resumi! These Terms of Service ("Terms") govern your use of our website, applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
          </p>

          <h2>1. Accounts and Registration</h2>
          <p>
            To access most features of the Service, you must register for an account. When you register, you agree to provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure.
          </p>

          <h2>2. Use of Services</h2>
          <p>
            You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to use the Services:
          </p>
          <ul>
            <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service.</li>
            <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
          </ul>

          <h2>3. Subscriptions and Billing</h2>
          <p>
            Our Services are billed on a subscription basis. You will be billed in advance on a recurring, periodic basis (such as monthly or annually), depending on the subscription plan you select. Your subscription will automatically renew at the end of each billing cycle unless you cancel it through your account management page.
          </p>
          <p>
            All fees are non-refundable, except as required by law or as explicitly stated in our Refund Policy.
          </p>

          <h2>4. Content and Ownership</h2>
          <p>
            You retain all rights to the content you submit or upload to the Services (e.g., your resume information). We do not claim ownership of your content. However, by using our Services, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display the content solely for the purpose of providing and improving the Services.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Resumi and its licensors.
          </p>

          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall Resumi, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice before any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@resumi.com.
          </p>
        </div>
      </div>
    </main>
  );
}
