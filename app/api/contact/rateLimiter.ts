export type RateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
  maxEntries: number;
};

export type RateLimitResult = {
  limited: boolean;
  retryAfterMs: number;
  remaining: number;
};

type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

type QueueEntry = {
  key: string;
  expiresAt: number;
};

export class SlidingWindowRateLimiter {
  private readonly windowMs: number;

  private readonly maxRequests: number;

  private readonly maxEntries: number;

  private readonly entries = new Map<string, RateLimitEntry>();

  private readonly queue: QueueEntry[] = [];

  constructor(options: RateLimiterOptions) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
    this.maxEntries = options.maxEntries;
  }

  private purge(now: number) {
    while (this.queue.length > 0) {
      const entry = this.queue[0]!;
      if (entry.expiresAt > now) {
        break;
      }
      this.queue.shift();
      const current = this.entries.get(entry.key);
      if (current && current.expiresAt <= now) {
        this.entries.delete(entry.key);
      }
    }

    while (this.queue.length > this.maxEntries) {
      const oldest = this.queue.shift();
      if (!oldest) {
        break;
      }
      const current = this.entries.get(oldest.key);
      if (current && current.expiresAt === oldest.expiresAt) {
        this.entries.delete(oldest.key);
      }
    }
  }

  registerAttempt(key: string): RateLimitResult {
    const now = Date.now();
    this.purge(now);

    const existing = this.entries.get(key);

    if (!existing || existing.expiresAt <= now) {
      const expiresAt = now + this.windowMs;
      this.entries.set(key, { count: 1, expiresAt });
      this.queue.push({ key, expiresAt });
      return {
        limited: false,
        retryAfterMs: expiresAt - now,
        remaining: this.maxRequests - 1,
      };
    }

    existing.count += 1;

    if (existing.count > this.maxRequests) {
      return {
        limited: true,
        retryAfterMs: Math.max(existing.expiresAt - now, 0),
        remaining: 0,
      };
    }

    return {
      limited: false,
      retryAfterMs: Math.max(existing.expiresAt - now, 0),
      remaining: Math.max(this.maxRequests - existing.count, 0),
    };
  }

  reset() {
    this.entries.clear();
    this.queue.length = 0;
  }
}
