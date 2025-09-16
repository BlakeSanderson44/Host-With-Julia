# Time-to-Interactive Measurements

Measurements were captured with Playwright against the production build served with `next start`.

- Baseline (static imports): domInteractive ≈ 234 ms, loadEventEnd ≈ 291 ms (average of 3 runs).
- Dynamic sections: domInteractive ≈ 136 ms, loadEventEnd ≈ 198 ms (average of 3 runs).

These runs use the Navigation Timing API as a proxy for time-to-interactive.
