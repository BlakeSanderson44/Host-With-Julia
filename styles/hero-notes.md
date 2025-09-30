**Hero Implementation Notes**

- Image files: keep `/public/img/hero-a-frame.jpg` and add responsive versions (`hero-a-frame-768.jpg`, `hero-a-frame-1280.jpg`, `hero-a-frame-1920.jpg`). Same composition, exported ~60–75% quality.
- `srcSet` + `sizes` lets the browser pick the right file. Update filenames if yours differ.
- To change the photo, swap the `src` and the three `srcSet` entries; keep the same widths.
- H1 and subhead use `clamp()` via Tailwind’s arbitrary values. If the H1 wraps >3 lines on smaller phones, reduce the max value in `[font-size:clamp(2rem,5vw,4rem)]` to `3.5rem`.
- Overlay/brightness create reliable contrast. If your image is darker, reduce the overlay (e.g., `from-black/45 via-black/40 to-black/50`).
- Primary button is solid; secondary is outline for clear hierarchy. Focus-visible rings are included for accessibility.
- BadgePill is reusable; drop it into other sections for consistent chips.
- Section min-height is `70vh`. Padding scales from `py-[14vh]` on mobile to `py-[18vh]` on large screens so CTAs stay above the fold.
- No motion is added; respects users who prefer reduced motion by default.
- Only this hero is modified; other components, routes, and global styles remain unchanged.
