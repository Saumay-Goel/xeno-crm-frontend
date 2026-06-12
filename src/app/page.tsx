import { LandingNav } from "@/components/landing/landing-nav";
import { Hero } from "@/components/landing/landing-hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/landing-features";
import { CTA } from "@/components/landing/cta";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-up {
              opacity: 0;
              animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `,
        }}
      />
      <LandingNav />
      <main className="overflow-hidden">
        <Hero />
        <HowItWorks />
        <Features />
        <CTA />
      </main>
    </div>
  );
}
