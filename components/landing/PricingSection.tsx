"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Perfect for creating your first professional resume.",
    features: [
      "1 Resume",
      "Basic Templates",
      "50 AI Credits / month",
      "PDF Export",
      "Email Support",
    ],
    notIncluded: [
      "Cover Letter Generator",
      "AI Resume Improver",
      "Unlimited Resumes",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$15",
    period: "/month",
    description: "Everything you need to land your dream job faster.",
    features: [
      "Unlimited Resumes",
      "All Premium Templates",
      "Unlimited AI Credits",
      "Advanced AI Improver",
      "Cover Letter Generator",
      "ATS Optimization",
      "Priority Support",
    ],
    notIncluded: [],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description:
      "For agencies and career coaches managing multiple candidates.",
    features: [
      "5 Team Seats",
      "Collaborative Editing",
      "Admin Dashboard",
      "Centralized Billing",
      "Everything in Pro",
      "Dedicated Success Manager",
    ],
    notIncluded: [],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your career goals. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                  MOST POPULAR
                </div>
              )}
              <Card
                className={`h-full flex flex-col ${
                  plan.popular
                    ? "border-primary shadow-lg scale-105 z-0"
                    : "border-muted"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-muted-foreground/50"
                      >
                        <X className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button
                      variant={plan.buttonVariant}
                      className="w-full"
                      size="lg"
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
