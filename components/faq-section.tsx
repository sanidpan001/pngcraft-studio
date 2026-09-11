'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const FAQS = [
  {
    q: 'Is it really free forever?',
    a: 'Yes, 100% free forever. The tool is ad-supported, so we never need to charge you. No hidden fees, no trial period, no credit card required.',
  },
  {
    q: 'Will you add a watermark?',
    a: 'Never. We do not add watermarks to any converted image, and we never will. Your PNG output is clean and 100% yours.',
  },
  {
    q: 'Do I need to sign in?',
    a: 'No sign-in needed. No account, no email, no tracking. Just open the page, drop your images, and download your PNGs.',
  },
  {
    q: 'Is my image safe?',
    a: 'Absolutely. Everything happens 100% client-side in your browser using the Canvas API. Your images never leave your device and we do not store anything.',
  },
  {
    q: 'Why does it look premium?',
    a: 'Because free tools should also look good. We believe a great design does not require a paywall. Studio-quality experience at zero cost.',
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-2xl font-bold tracking-tight text-center sm:text-3xl mb-8 text-balance"
      >
        Frequently Asked Questions
      </motion.h2>

      <Card className="glass-card p-6">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-border/50">
              <AccordionTrigger className="text-left text-base font-medium hover:text-primary transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
