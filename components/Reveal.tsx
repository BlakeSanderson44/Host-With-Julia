'use client';

import type { CSSProperties, ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

import useInView from '@/hooks/useInView';

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: string;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className' | 'style' | 'ref'>;

function classNames(...values: Array<string | undefined | null | false>): string {
  return values.filter(Boolean).join(' ');
}

const FALLBACK_CLASS = 'reveal-motion-target';

export default function Reveal<T extends ElementType = 'div'>({
  as,
  children,
  className,
  delay,
  style: styleProp,
  ...rest
}: RevealProps<T>) {
  const Component = as ?? 'div';
  if (children === null || children === undefined) {
    throw new Error('Reveal requires `children` to render.');
  }

  const { ref, inView } = useInView();

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (typeof window.matchMedia !== 'function') {
      // Browsers without matchMedia support cannot report motion preferences. We default to animations and
      // document the fallback here so behaviour is explicit.
      setPrefersReducedMotion(false);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    try {
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', updatePreference);
        return () => mediaQuery.removeEventListener('change', updatePreference);
      }

      mediaQuery.addListener(updatePreference);
      return () => mediaQuery.removeListener(updatePreference);
    } catch {
      // Older browsers may throw when attaching listeners; we fall back to a static preference snapshot.
      updatePreference();
      return undefined;
    }
  }, []);

  const transitionDelay: CSSProperties['transitionDelay'] = delay && !prefersReducedMotion ? delay : undefined;

  const animationClasses = useMemo(() => {
    if (prefersReducedMotion) {
      return '';
    }

    const base = 'transition duration-700 ease-out will-change-[opacity,transform]';
    const hidden = 'opacity-0 translate-y-4';
    const visible = 'opacity-100 translate-y-0';
    const result = inView ? `${visible} ${base}` : `${hidden} ${base}`;

    if (process.env.NODE_ENV !== 'production') {
      if (inView) {
        console.assert(result.includes('opacity-100') && result.includes('translate-y-0'), 'Reveal should apply visible classes when in view.');
      } else {
        console.assert(result.includes('opacity-0') && result.includes('translate-y-4'), 'Reveal should apply hidden classes when not yet in view.');
      }
    }

    return result;
  }, [inView, prefersReducedMotion]);

  if (process.env.NODE_ENV !== 'production') {
    if (prefersReducedMotion) {
      console.assert(animationClasses === '', 'Reveal should omit animation classes when reduced motion is requested.');
    }
  }

  const style: CSSProperties | undefined = transitionDelay
    ? { ...styleProp, transitionDelay }
    : (styleProp as CSSProperties | undefined);

  return (
    <Component
      ref={ref as never}
      className={classNames(FALLBACK_CLASS, animationClasses, className)}
      style={style}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      {children}
    </Component>
  );
}
