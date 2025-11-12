'use client';

import Link, { type LinkProps } from 'next/link';
import {
  forwardRef,
  useCallback,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from 'react';

import { useSmoothAnchorScroll } from '../../hooks/useSmoothAnchorScroll';

type SmoothAnchorLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

const SmoothAnchorLink = forwardRef<HTMLAnchorElement, SmoothAnchorLinkProps>(
  ({ onClick, ...props }, forwardedRef) => {
    const handleSmoothScroll = useSmoothAnchorScroll();

    const handleClick = useCallback(
      (event: MouseEvent<HTMLAnchorElement>) => {
        handleSmoothScroll(event);
        onClick?.(event);
      },
      [handleSmoothScroll, onClick],
    );

    return (
      <Link
        ref={forwardedRef}
        {...props}
        onClick={handleClick}
      />
    );
  },
);

SmoothAnchorLink.displayName = 'SmoothAnchorLink';

export default SmoothAnchorLink;
