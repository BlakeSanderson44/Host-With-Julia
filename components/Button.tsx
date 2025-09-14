import Link from 'next/link';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function Button({ href, children, variant = 'primary' }: ButtonProps) {
  const base = 'rounded-2xl px-6 py-3 font-semibold transition transform hover:scale-105 shadow';
  const styles =
    variant === 'primary'
      ? 'bg-forest text-white hover:bg-lake'
      : 'border-2 border-forest text-forest hover:bg-lake hover:text-white';
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
