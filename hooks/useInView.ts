import { useEffect, useRef, useState } from 'react';

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1,
};

const thresholdValue = Array.isArray(observerOptions.threshold)
  ? observerOptions.threshold[0] ?? 0
  : observerOptions.threshold ?? 0;

type EntryCallback = (entry: IntersectionObserverEntry) => void;

const elementListeners = new Map<Element, EntryCallback>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (sharedObserver) {
    return sharedObserver;
  }

  if (typeof window === 'undefined' || typeof window.IntersectionObserver === 'undefined') {
    return null;
  }

  sharedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const listener = elementListeners.get(entry.target);
      if (listener) {
        listener(entry);
      }
    });
  }, observerOptions);

  return sharedObserver;
}

export function useInView(): { ref: React.RefObject<Element>; inView: boolean } {
  const ref = useRef<Element>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (typeof window === 'undefined') {
      // During server rendering we cannot observe the element; defer to hydration.
      return;
    }

    const observer = getSharedObserver();

    if (!observer) {
      // Fallback for environments without IntersectionObserver support. We reveal immediately so
      // content remains accessible and explain the behaviour for future maintainers.
      setInView(true);
      return;
    }

    const handleEntry: EntryCallback = (entry) => {
      const isVisible = entry.isIntersecting || entry.intersectionRatio >= thresholdValue;
      if (isVisible) {
        setInView(true);
        observer.unobserve(entry.target);
        elementListeners.delete(entry.target);
      }
    };

    elementListeners.set(node, handleEntry);
    observer.observe(node);

    return () => {
      elementListeners.delete(node);
      observer.unobserve(node);
    };
  }, []);

  return { ref, inView };
}

export default useInView;
