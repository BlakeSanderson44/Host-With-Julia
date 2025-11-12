"use client";

import { useEffect, useRef, useState } from "react";

import { focusVisibleRing } from "@/lib/a11y";

const DISMISS_KEY = "hwj_cta_dismissed_until";
const DISMISS_DAYS = 7;

function isDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const value = localStorage.getItem(DISMISS_KEY);
    if (!value) return false;
    const expires = new Date(value).getTime();
    return Number.isFinite(expires) && Date.now() < expires;
  } catch {
    return false;
  }
}

function setDismissed(days = DISMISS_DAYS) {
  if (typeof window === "undefined") return;
  try {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
    localStorage.setItem(DISMISS_KEY, expires);
  } catch {
    // Ignore persistence errors (e.g., private browsing)
  }
}

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissedState] = useState(isDismissed());
  const lastScrollY = useRef(0);
  const scrolledEnough = useRef(false);
  const contactVisible = useRef(false);
  const formFocused = useRef(false);
  const wasVisibleBeforeFocus = useRef(false);
  const latestVisible = useRef(visible);

  useEffect(() => {
    latestVisible.current = visible;
  }, [visible]);

  // Ensure dismissed state reflects storage (covers storage changes between renders)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === DISMISS_KEY) {
        setDismissedState(isDismissed());
        setVisible(false);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Hide/show based on scroll direction and thresholds
  useEffect(() => {
    if (typeof window === "undefined" || dismissed) return;

    lastScrollY.current = window.scrollY || 0;

    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      if (currentY > 400) scrolledEnough.current = true;

      const delta = currentY - lastScrollY.current;
      const scrollingUp = delta < -5;
      const scrollingDown = delta > 5;
      lastScrollY.current = currentY;

      if (!scrolledEnough.current || contactVisible.current || formFocused.current) {
        setVisible(false);
        return;
      }

      if (scrollingUp) {
        setVisible(true);
      } else if (scrollingDown) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  // Hide when #contact is visible
  useEffect(() => {
    if (typeof window === "undefined" || dismissed) return;
    const contactEl = document.querySelector<HTMLElement>("#contact");
    if (!contactEl || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries) => {
      const inView = entries.some((entry) => entry.isIntersecting);
      contactVisible.current = inView;
      if (inView) {
        setVisible(false);
      }
    }, {
      rootMargin: "0px 0px -20% 0px",
      threshold: [0, 0.1, 0.5, 1],
    });

    observer.observe(contactEl);
    return () => observer.disconnect();
  }, [dismissed]);

  // Hide when interacting with form controls
  useEffect(() => {
    if (typeof window === "undefined" || dismissed) return;

    const selector = "input, textarea, select";

    const handleFocusIn = (event: Event) => {
      const target = event.target as Element | null;
      if (target?.matches(selector)) {
        formFocused.current = true;
        wasVisibleBeforeFocus.current = latestVisible.current;
        setVisible(false);
      }
    };

    const handleFocusOut = (event: Event) => {
      const target = event.target as Element | null;
      if (target?.matches(selector)) {
        formFocused.current = false;
        if (
          wasVisibleBeforeFocus.current &&
          scrolledEnough.current &&
          !contactVisible.current
        ) {
          setVisible(true);
        }
        wasVisibleBeforeFocus.current = false;
      }
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissedState(true);
    setDismissed();
  };

  if (dismissed) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 md:hidden pb-[env(safe-area-inset-bottom)] pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={`mx-auto max-w-screen-sm px-4 pb-3 transition-transform duration-300 ease-out pointer-events-auto ${
          visible ? "translate-y-0" : "translate-y-[120%]"
        }`}
      >
        <div className="relative">
          <button
            type="button"
            aria-label="Dismiss"
            onClick={handleDismiss}
            className={`absolute -top-3 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-sand bg-cream/90 text-lg font-semibold text-charcoal shadow ${focusVisibleRing}`}
          >
            ×
          </button>
          <a
            href="#contact"
            className={`block rounded-xl bg-gradient-to-r from-forest to-forest-light px-5 py-4 text-center font-semibold text-white shadow-lg transition-transform duration-200 active:scale-95 ${focusVisibleRing}`}
          >
            Get a Free Property Review
          </a>
        </div>
      </div>
    </div>
  );
}
