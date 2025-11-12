'use client';

import { useCallback } from 'react';
import type { MouseEvent } from 'react';

const normalizePath = (value: string) => {
  if (!value || value === '#') {
    return '/';
  }

  if (!value.startsWith('/')) {
    return `/${value}`;
  }

  return value.length > 1 && value.endsWith('/') ? value.slice(0, -1) : value;
};

const dispatchHashChange = (previousUrl: string) => {
  try {
    window.dispatchEvent(
      new HashChangeEvent('hashchange', {
        oldURL: previousUrl,
        newURL: window.location.href,
      }),
    );
  } catch (error) {
    console.warn('useSmoothAnchorScroll: falling back to generic hashchange event', error);
    window.dispatchEvent(new Event('hashchange'));
  }
};

export function useSmoothAnchorScroll() {
  const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || typeof window === 'undefined') {
      return;
    }

    const anchor = event.currentTarget;
    const rawHref = anchor.getAttribute('href');

    if (!rawHref) {
      return;
    }

    let url: URL;

    try {
      url = new URL(rawHref, window.location.href);
    } catch (error) {
      console.warn('useSmoothAnchorScroll: unable to parse href', error);
      return;
    }

    if (url.origin !== window.location.origin || !url.hash) {
      return;
    }

    const targetPath = normalizePath(url.pathname);
    const currentPath = normalizePath(window.location.pathname);

    if (targetPath !== currentPath) {
      return;
    }

    const targetId = decodeURIComponent(url.hash.slice(1));

    if (!targetId) {
      return;
    }

    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      console.warn(`useSmoothAnchorScroll: no element found with id "${targetId}"`);
      return;
    }

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previousUrl = window.location.href;

    requestAnimationFrame(() => {
      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      if (window.location.hash === url.hash) {
        return;
      }

      window.history.pushState({}, '', `${targetPath}${url.hash}`);
      dispatchHashChange(previousUrl);
    });
  }, []);

  return handleClick;
}

export default useSmoothAnchorScroll;
