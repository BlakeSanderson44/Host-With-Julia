import Link from 'next/link';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function Button({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lake';
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-forest to-forest-light text-white hover:from-forest-light hover:to-lake hover:shadow-glow'
      : 'border-2 border-forest text-forest hover:bg-forest hover:text-white hover:shadow-medium';
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
