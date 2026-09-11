'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { AdSlot, NativeAdSlot } from '@/components/ad-slot';

const TRUST_BADGES = [
  'No Sign-In Required',
  'No Watermark',
  'No Subscription Ever',
];

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-8 sm:pt-20 sm:pb-10">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
            JPG to PNG Converter That{' '}
            <span className="gradient-text">Looks Like $30</span>, But Free
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-5 text-base text-muted-foreground text-balance sm:text-lg max-w-2xl mx-auto"
        >
          Transparent background support. No Watermark. No Signup. Studio Quality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-card/40 backdrop-blur-md px-4 py-2 text-sm font-medium"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success/20">
                <Check className="h-3 w-3 text-success" />
              </span>
              {badge}
            </div>
          ))}
        </motion.div>

        {/* Top Banner Ad - YE ADD KIYA HAI */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <NativeAdSlot />
        </motion.div>
      </div>
    </section>
  );
}
