import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import { focusVisibleRing } from '@/lib/a11y';

interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export default function SkipLink({
  href = '#main',
  children = 'Skip to main content',
  className = '',
  ...rest
}: PropsWithChildren<SkipLinkProps>) {
  return (
    <a
      {...rest}
      href={href}
      className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-white ${focusVisibleRing} ${className}`.trim()}
    >
      {children}
    </a>
  );
}
