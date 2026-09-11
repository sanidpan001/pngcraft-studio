import { ImageIcon, Twitter, Github, Mail } from 'lucide-react';

const FOOTER_COLUMNS = [
  {
    title: 'PNGCraft Studio',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Why Free?', href: '#why-free' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'JPG to PNG', href: '#tools' },
      { label: 'PNG Compressor', href: '#' },
      { label: 'Image Resizer', href: '#' },
      { label: 'Background Remover', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'DMCA', href: '#' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Twitter', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Email', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-16 border-t border-border/50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <ImageIcon className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-sm font-semibold">
              PNGCraft <span className="text-primary">Studio</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 PNGCraft Studio - Premium tools, $0 price. No Subscription, No Watermark.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/60">
            Trusted by 50,000+ creators - No login needed
          </p>
        </div>
      </div>
    </footer>
  );
}
