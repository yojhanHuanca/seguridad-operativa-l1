import { BenefitsSection } from "./sections/BenefitsSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { MetricsSection } from "./sections/MetricsSection";
import { WorkflowSection } from "./sections/WorkflowSection";
import { Navigation } from "@/components/landing/Navigation";

export function LandingPage() {
  return (
    <main className="min-h-svh bg-white text-gray-900">
      <Navigation />
      <HeroSection />
      <CapabilitiesSection />
      <WorkflowSection />
      <MetricsSection />
      <BenefitsSection />
      <FooterSection />
    </main>
  );
}