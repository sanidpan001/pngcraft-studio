'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Layers,
  Eye,
  Shield,
  UserX,
  Droplet,
  WifiOff,
  Check,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const FEATURES = [
  { icon: Zap, title: 'Instant conversion', desc: 'No waiting, no queues. Your PNG is ready the moment you drop a file.' },
  { icon: Layers, title: 'Bulk 30 files', desc: 'Convert up to 30 images at once and download them all in a single ZIP.' },
  { icon: Eye, title: 'Transparent background', desc: 'Full alpha-channel support for clean, professional cutouts.' },
  { icon: Shield, title: 'No quality loss', desc: 'Lossless PNG output every time. Pixel-perfect, exactly as your original.' },
  { icon: UserX, title: 'No signup', desc: 'No account, no email, no tracking. Just open and convert.' },
  { icon: Droplet, title: 'No watermark', desc: 'We never add watermarks. Your image stays 100% yours.' },
  { icon: WifiOff, title: 'Works offline', desc: 'After the page loads, everything runs in your browser. No server needed.' },
];

const COMPARISON = [
  { feature: 'Transparency support', jpg: false, png: true },
  { feature: 'Lossless quality', jpg: false, png: true },
  { feature: 'Smaller file for photos', jpg: true, png: false },
  { feature: 'Best for logos & graphics', jpg: false, png: true },
  { feature: 'Wide browser support', jpg: true, png: true },
];

export function SeoContent() {
  return (
    <section id="why-free" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Why free section */}
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-bold tracking-tight text-center sm:text-3xl text-balance"
        >
          Why PNGCraft Looks Like a $30 Tool But Is Free?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto text-balance"
        >
          We believe tools should be free. We run on ads, not subscriptions. Studio quality
          without paywall. Every feature you&apos;d expect from a premium converter — transparent
          backgrounds, bulk processing, lossless output — available to everyone, forever.
        </motion.p>
      </div>

      {/* JPG vs PNG */}
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-bold tracking-tight text-center sm:text-3xl mb-8 text-balance"
        >
          JPG vs PNG — When to Convert?
        </motion.h2>
        <Card className="glass-card overflow-hidden">
          <div className="grid grid-cols-3 gap-px bg-border/30">
            <div className="bg-card/60 p-4 text-sm font-semibold">Feature</div>
            <div className="bg-card/60 p-4 text-sm font-semibold text-center">JPG</div>
            <div className="bg-card/60 p-4 text-sm font-semibold text-center">PNG</div>
            {COMPARISON.map((row) => (
              <div key={row.feature} className="contents">
                <div className="bg-background p-4 text-sm">{row.feature}</div>
                <div className="bg-background p-4 text-center">
                  {row.jpg ? (
                    <Check className="h-4 w-4 text-success mx-auto" />
                  ) : (
                    <span className="text-muted-foreground/40">—</span>
                  )}
                </div>
                <div className="bg-background p-4 text-center">
                  {row.png ? (
                    <Check className="h-4 w-4 text-success mx-auto" />
                  ) : (
                    <span className="text-muted-foreground/40">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Features grid */}
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-bold tracking-tight text-center sm:text-3xl mb-8 text-balance"
        >
          Features That Make Us Premium (But Free)
        </motion.h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="glass-card glass-hover h-full p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
