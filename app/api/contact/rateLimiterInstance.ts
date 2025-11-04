import { SlidingWindowRateLimiter } from './rateLimiter';

export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 5;
export const RATE_LIMIT_MAX_ENTRIES = 1_000;

const rateLimiter = new SlidingWindowRateLimiter({
  windowMs: RATE_LIMIT_WINDOW_MS,
  maxRequests: RATE_LIMIT_MAX_REQUESTS,
  maxEntries: RATE_LIMIT_MAX_ENTRIES,
});

export function registerAttempt(clientIdentifier: string) {
  return rateLimiter.registerAttempt(clientIdentifier);
}

export function resetRateLimiter() {
  rateLimiter.reset();
}
