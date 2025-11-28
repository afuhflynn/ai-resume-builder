"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is the resume builder really free?",
    answer:
      "Yes, our Starter plan is completely free. You can create one resume, use our basic templates, and export to PDF without paying a cent. We also offer 50 free AI credits per month.",
  },
  {
    question: "How does the AI writer work?",
    answer:
      "Our AI analyzes your job title and industry to suggest professional, action-oriented bullet points. It can also rewrite your existing content to make it more impactful and ATS-friendly.",
  },
  {
    question: "Can I import my existing resume?",
    answer:
      "Currently, we support importing from LinkedIn (PDF export) and text pasting. We are working on a direct PDF/Word import feature which will be available soon.",
  },
  {
    question: "What is an ATS and why does it matter?",
    answer:
      "ATS stands for Applicant Tracking System. It's software used by employers to filter resumes before a human sees them. Our templates are designed to be easily readable by these systems to ensure your resume gets through.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. There are no long-term contracts. You can cancel your Pro subscription at any time from your dashboard, and you'll keep access until the end of your billing period.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
