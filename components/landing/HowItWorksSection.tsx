"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose a Template",
    description:
      "Select from our collection of professional, ATS-friendly resume templates.",
  },
  {
    number: "02",
    title: "Enter Your Details",
    description:
      "Fill in your experience manually or import from LinkedIn/PDF.",
  },
  {
    number: "03",
    title: "Enhance with AI",
    description:
      "Use our AI to rewrite bullet points and optimize keywords for your target job.",
  },
  {
    number: "04",
    title: "Download & Apply",
    description:
      "Export your polished resume as a PDF and start applying with confidence.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-lg text-muted-foreground">
            Build a professional resume in four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative pt-8 text-center md:text-left"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-primary text-primary font-bold mb-4 relative z-10">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
