import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Script from "next/script";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PNGCraft Studio - Free JPG to PNG Converter | No Watermark, No Signup | Looks Like $30 Tool',
  description: 'Convert JPG to PNG free. Transparent background, no watermark, no signup. Premium studio quality that looks like $30 but free forever.',
  keywords: ['JPG to PNG', 'PNG converter', 'free converter', 'transparent background', 'no watermark', 'image converter', 'PNGCraft Studio'],
  authors: [{ name: 'PNGCraft Studio' }],
  openGraph: {
    title: 'PNGCraft Studio - Free JPG to PNG Converter | No Watermark, No Signup',
    description: 'Convert JPG to PNG free. Transparent background, no watermark, no signup. Premium studio quality that looks like $30 but free forever.',
    type: 'website',
    url: 'https://pngcraft.studio',
    siteName: 'PNGCraft Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PNGCraft Studio - Free JPG to PNG Converter',
    description: 'Convert JPG to PNG free. Transparent background, no watermark, no signup. Premium studio quality that looks like $30 but free forever.',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      <Script src="https://pl31287193.profitableratecpmnetwork.com/fc/bf/ba/fcbfbab35a6216ece78281c91a38b13b.js" strategy="afterInteractive" /> 
      </body>
    </html>
  );
}
