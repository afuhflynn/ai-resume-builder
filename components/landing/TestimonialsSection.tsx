"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Product Manager",
    company: "TechFlow",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content:
      "I was struggling to get interviews until I used this builder. The AI suggestions completely transformed my summary and bullet points. I landed a job at my dream company within 2 weeks!",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    company: "DataSystems",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    content:
      "The templates are stunning and the ATS optimization is a game changer. I used to worry about my resume getting filtered out, but now I get callbacks consistently.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "CreativePulse",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content:
      "As a hiring manager, I can tell when a resume is well-structured. This tool helps candidates present their best selves. Highly recommended for anyone looking to level up.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by professionals
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of users who have accelerated their careers with our
            platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-md bg-background relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Quote className="h-24 w-24 text-primary rotate-180" />
                </div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-4 text-yellow-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.content}"
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
