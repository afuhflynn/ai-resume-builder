"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  LayoutTemplate,
  Zap,
  ShieldCheck,
  FileText,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Writing",
    description:
      "Our advanced AI helps you write professional summaries and bullet points tailored to your industry.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: LayoutTemplate,
    title: "Modern Templates",
    description:
      "Choose from a variety of ATS-friendly templates designed by HR professionals.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Get real-time suggestions to improve your resume score and increase your chances of getting hired.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: ShieldCheck,
    title: "ATS Optimized",
    description:
      "Ensure your resume passes Applicant Tracking Systems with our optimized formatting.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: FileText,
    title: "Cover Letter Generator",
    description:
      "Generate tailored cover letters for every job application in seconds.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Download,
    title: "Easy Export",
    description:
      "Download your resume in PDF format, ready to send to recruiters.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to get hired
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features to help you build a standout resume and land your
            dream job faster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-muted hover:border-primary/50 transition-colors hover:shadow-lg">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
