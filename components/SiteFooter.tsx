import { NavItem } from './Header';

interface SiteFooterProps {
  navItems: NavItem[];
}

const focusRingClasses =
  'rounded-sm transition hover:text-moss focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-forest';

export default function SiteFooter({ navItems }: SiteFooterProps) {
  const findNavItemByLabel = (label: string) => navItems.find((item) => item.label === label);

  const exploreItems = [
    'How',
    'Services',
    'Locations',
    'Properties',
    'Testimonials',
  ]
    .map((label) => findNavItemByLabel(label))
    .filter((item): item is NavItem => Boolean(item));

  const companyItems: Array<NavItem & { external?: boolean }> = [
    findNavItemByLabel('Why Me'),
    findNavItemByLabel('Contact'),
    { href: 'https://instagram.com/hostwithjulia', label: 'Instagram', external: true },
  ].filter((item): item is NavItem & { external?: boolean } => Boolean(item));

  return (
    <footer className="border-t border-white/10 bg-forest text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold tracking-tight">Host With Julia</div>
              <p className="text-sm text-white/80">Boutique STR Management · Western WA.</p>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Proudly serving Edmonds, Chelan, and Ashford — expanding across Western Washington.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-white/80 print:hidden">
              <span>Superhost</span>
              <span>Airbnb</span>
              <span>Touch Stay</span>
            </div>
          </div>

          <nav aria-label="Footer" className="space-y-4 print:hidden">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">Explore</h3>
            <ul role="list" className="space-y-2 text-sm text-white/80">
              {exploreItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={focusRingClasses}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer" className="space-y-4 print:hidden">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">Company</h3>
            <ul role="list" className="space-y-2 text-sm text-white/80">
              {companyItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={focusRingClasses}
                    {...(item.external
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : undefined)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
