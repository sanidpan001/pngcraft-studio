import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/hero-section';
import { ConverterTool } from '@/components/converter-tool';
import { SeoContent } from '@/components/seo-content';
import { FaqSection } from '@/components/faq-section';
import { SiteFooter } from '@/components/site-footer';
import { BackgroundOrbs } from '@/components/background-orbs';
import { AdSlot } from '@/components/ad-slot';

export default function Home() {
  return (
    <>
      <BackgroundOrbs />
      <SiteHeader />

      {/* Ad Slot 1 - Top banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <AdSlot width={728} height={90} className="mx-auto" />
      </div>

      <main>
        <HeroSection />
        <ConverterTool />

        {/* Ad Slot 3 - Bottom banner */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <AdSlot width={970} height={90} className="mx-auto" />
        </div>

        <SeoContent />
        <FaqSection />
      </main>

      <SiteFooter />
    </>
  );
}
