import { type ReactNode } from 'react';
import SmoothAnchorLink from './ui/SmoothAnchorLink';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function Button({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lake';
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-forest to-forest-light text-white hover:from-forest-light hover:to-lake hover:shadow-glow'
      : 'border-2 border-forest bg-transparent text-forest hover:border-transparent hover:bg-gradient-to-r hover:from-forest hover:to-lake hover:text-white hover:shadow-glow';
  return (
    <SmoothAnchorLink href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </SmoothAnchorLink>
  );
}
