/**
 * Accessibility utility checklist
 * - Provide accessible names for every interactive control (buttons, links, form fields).
 * - Ensure controls advertise their current state via ARIA (pressed, selected, expanded) where applicable.
 * - Prefer semantic elements (<button>, <a>, <header>, <main>, <footer>) for interactive regions.
 * - Support keyboard users with visible focus indicators and logical tab order.
 * - Announce dynamic updates with aria-live or status messaging when content changes.
 */

export const focusVisibleRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600';

export function withFocusRing(classes: string) {
  return `${classes} ${focusVisibleRing}`.trim();
}
