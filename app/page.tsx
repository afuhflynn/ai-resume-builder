import { HeroSection } from "@/components/landing/HeroSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
// import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/layout/Footer";
import Faq1 from "@/components/mvp-blocks/faqs";
import { FAQSection } from "@/components/landing/FAQSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <main className="flex-1">
        <HeroSection />
        <TrustSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />

        <FAQSection />
        {/* <Faq1 /> */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
