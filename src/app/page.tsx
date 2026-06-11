import { LandingNav } from "@/components/landing/landing-nav";
import { Hero } from "@/components/landing/landing-hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/landing-features";
import { CTA } from "@/components/landing/cta";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <LandingNav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <CTA />
      </main>
    </div>
  );
}
