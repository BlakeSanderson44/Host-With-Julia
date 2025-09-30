# Host With Julia

One-page, mobile-first Next.js + Tailwind site for boutique Airbnb/STR management in Western Washington.

## Development

NPM scripts are placeholders so the project can install and run basic commands in restricted environments.

```bash
npm install
npm run build
npm test
npm run lint
```

### Customizing the hero background image

Provide a path via the `NEXT_PUBLIC_HERO_IMAGE` environment variable (for example in `.env.local`) to use a locally stored hero
image placed under `public/`. When the variable is omitted, the site falls back to the bundled `/images/echo-house.avif` asset.

## Deployment

The app scaffolding is present, but building requires installing dependencies which may not be available in restricted environments.

