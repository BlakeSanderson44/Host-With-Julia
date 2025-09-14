import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Host With Julia',
  description: 'Boutique STR Management in Western Washington',
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
