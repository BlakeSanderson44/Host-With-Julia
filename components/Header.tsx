'use client';

import { useCallback, useState } from 'react';

export interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  navItems: NavItem[];
}

export default function Header({ navItems }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((previous) => !previous);
  }, [setIsMobileMenuOpen]);

  const handleNavigation = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, [setIsMobileMenuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-cream/90 backdrop-blur border-b border-sand">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <a href="#" className="font-bold text-forest">
          Host With Julia
        </a>
        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-charcoal hover:text-lake">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden text-forest text-3xl leading-none p-2 rounded-md border border-forest/20 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
          aria-label="Menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-cream border-t border-sand">
          <ul className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-charcoal hover:text-lake block py-2"
                  onClick={handleNavigation}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
