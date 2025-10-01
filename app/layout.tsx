import './globals.css';
import { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Host With Julia - Boutique Airbnb Management in Western Washington',
  description:
    'Professional short-term rental management for Edmonds, Chelan, and Ashford. 24/7 guest messaging, dynamic pricing, and hands-off hosting.',
  keywords: 'Airbnb management, short-term rental, Western Washington, Edmonds, Chelan, Mt Rainier, property management, STR management',
  authors: [{ name: 'Julia' }],
  openGraph: {
    title: 'Host With Julia - Boutique Airbnb Management',
    description: 'Professional short-term rental management in Western Washington. 24/7 guest messaging, dynamic pricing, and hands-off hosting.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Host With Julia - Boutique Airbnb Management',
    description: 'Professional short-term rental management in Western Washington.',
  },
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-cream text-charcoal">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 p-2 bg-forest text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
