'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NAV_LINKS = [
  { label: 'Tools', href: '#tools' },
  { label: 'Why Free?', href: '#why-free' },
  { label: 'FAQ', href: '#faq' },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-border/50 shadow-glass'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-lg rounded-lg group-hover:bg-primary/50 transition-colors" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-glow">
              <ImageIcon className="h-5 w-5 text-white" />
            </div>
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            PNGCraft <span className="text-primary">Studio</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Badge
            variant="secondary"
            className="hidden sm:inline-flex items-center gap-1.5 border-success/30 bg-success/10 text-success px-3 py-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            100% Free Forever
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden glass border-b border-border/50 overflow-hidden"
        >
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Badge
              variant="secondary"
              className="mt-2 inline-flex w-fit items-center gap-1.5 border-success/30 bg-success/10 text-success px-3 py-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              100% Free Forever
            </Badge>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
