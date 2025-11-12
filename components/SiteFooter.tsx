import { NavItem } from './Header';

import { focusVisibleRing } from '@/lib/a11y';

interface SiteFooterProps {
  navItems: NavItem[];
}

export default function SiteFooter({ navItems }: SiteFooterProps) {
  return (
    <footer aria-label="Site footer" className="bg-forest text-white py-10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <div className="font-bold text-xl">Host With Julia</div>
        <p>Boutique STR Management · Western WA.</p>
        <nav aria-label="Footer navigation" className="flex justify-center gap-4 flex-wrap">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hover:text-moss rounded-full px-2 py-1 ${focusVisibleRing}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex justify-center gap-8" aria-label="Partner recognitions">
          <span>Superhost</span>
          <span>Airbnb</span>
          <span>Touch Stay</span>
        </div>
        <p className="text-moss text-sm">
          Proudly serving Edmonds, Chelan, and Ashford — expanding across Western Washington.
        </p>
        <a
          href="https://instagram.com/hostwithjulia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 hover:text-moss ${focusVisibleRing}`}
        >
          <span aria-hidden="true">📸</span>
          <span>Instagram</span>
        </a>
      </div>
    </footer>
  );
}
