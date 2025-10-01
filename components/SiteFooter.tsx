import { NavItem } from './Header';

interface SiteFooterProps {
  navItems: NavItem[];
}

export default function SiteFooter({ navItems }: SiteFooterProps) {
  return (
    <footer className="bg-forest text-white py-10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <div className="font-bold text-xl">Host With Julia</div>
        <p>Boutique STR Management · Western WA.</p>
        <nav className="flex justify-center gap-4">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-moss">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex justify-center gap-8">
          <span>Superhost</span>
          <span>Airbnb</span>
          <span>Touch Stay</span>
        </div>
        <p className="text-moss text-sm">
          Proudly serving Edmonds, Chelan, and Ashford — expanding across Western Washington.
        </p>
        <a href="https://instagram.com/hostwithjulia" target="_blank" rel="noopener noreferrer" className="hover:text-moss">
          Instagram
        </a>
      </div>
    </footer>
  );
}
