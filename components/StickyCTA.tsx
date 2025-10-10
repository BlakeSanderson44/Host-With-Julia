"use client";

export default function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-screen-sm px-4 pb-3">
        <a
          href="#contact"
          className="block text-center rounded-xl px-5 py-4 font-semibold bg-gradient-to-r from-forest to-forest-light text-white shadow-lg transition-transform duration-200 active:scale-95"
        >
          Get a Free Property Review
        </a>
      </div>
    </div>
  );
}
