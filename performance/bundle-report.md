# Bundle Size Snapshot

`next build` reports identical first-load JavaScript for the home route before and after the change (103 kB). However, the dynamic build emits an additional lazy chunk (`chunks/529-ff1b65d7abb3d4a5.js`, ~40 kB) that now loads after hydration instead of being part of the initial payload.
