'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SmoothAnchorLink from './ui/SmoothAnchorLink';

export interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  navItems: NavItem[];
}

export default function Header({ navItems }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef(open);
  const pathname = usePathname() ?? '/';
  const [activeHash, setActiveHash] = useState('');

  const close = useCallback(() => setOpen(false), []);
  const handleToggle = useCallback(() => {
    setOpen((previous) => !previous);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const focusable = panelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      toggleRef.current?.focus();
    }

    wasOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    setActiveHash(window.location.hash || '');

    const handleHashChange = () => {
      setActiveHash(window.location.hash || '');
      close();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [close]);

  const normalizePath = useCallback((value: string) => {
    if (!value || value === '#') {
      return '/';
    }

    if (!value.startsWith('/')) {
      return `/${value}`;
    }

    return value.length > 1 && value.endsWith('/') ? value.slice(0, -1) : value;
  }, []);

  const getHashFromHref = useCallback((href: string) => {
    const hashIndex = href.indexOf('#');
    return hashIndex >= 0 ? href.slice(hashIndex) : '';
  }, []);

  const isNavItemActive = useCallback(
    (href: string) => {
      const targetHash = getHashFromHref(href);
      const targetPath = normalizePath(href.split('#')[0]);
      const currentPath = normalizePath(pathname);

      if (!targetHash) {
        return currentPath === targetPath;
      }

      if (currentPath !== targetPath) {
        return false;
      }

      if (activeHash) {
        return activeHash === targetHash;
      }

      return currentPath === '/' && targetHash === '#how';
    },
    [activeHash, getHashFromHref, normalizePath, pathname],
  );

  const handleBackdropClick = useCallback(() => {
    close();
  }, [close]);

  const handlePanelClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  const handleNavLinkClick = useCallback(() => {
    close();
  }, [close]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-cream/90 backdrop-blur border-b border-sand">
      <nav
        aria-label="Primary navigation"
        className="max-w-6xl mx-auto flex items-center justify-between p-4"
      >
        <Link href="/" className="font-bold text-forest" scroll={false}>
          Host With Julia
        </Link>
        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <SmoothAnchorLink
                href={item.href}
                className="text-charcoal hover:text-lake rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest/60"
                aria-current={isNavItemActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </SmoothAnchorLink>
            </li>
          ))}
        </ul>
        <button
          ref={toggleRef}
          className="md:hidden text-forest"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={handleToggle}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/20"
          onClick={handleBackdropClick}
        >
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            className="max-w-6xl mx-auto bg-cream border-t border-sand shadow-lg"
            onClick={handlePanelClick}
          >
            <ul className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <SmoothAnchorLink
                    href={item.href}
                    className="text-charcoal hover:text-lake block py-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest/60"
                    aria-current={isNavItemActive(item.href) ? 'page' : undefined}
                    onClick={() => {
                      handleNavLinkClick();
                    }}
                  >
                    {item.label}
                  </SmoothAnchorLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
