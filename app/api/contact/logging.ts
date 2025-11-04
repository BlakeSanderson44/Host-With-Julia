const META_WHITELIST = new Set(['path', 'hash', 'search', 'referrer', 'referer']);

type SafeMeta = Record<string, unknown> | undefined;

type BaseLogContext = {
  clientIdentifier: string;
  meta?: Record<string, unknown>;
};

type SubmissionContext = BaseLogContext & {
  id: string;
  status: 'accepted' | 'spam';
  signals?: Record<string, unknown>;
};

type RateLimitContext = BaseLogContext & {
  retryAfterSeconds: number;
};

function hashIdentifier(identifier: string) {
  const source = identifier || 'unknown';
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

export function sanitizeMeta(meta: Record<string, unknown> | undefined): SafeMeta {
  if (!meta || typeof meta !== 'object') {
    return undefined;
  }

  const result: Record<string, unknown> = {};
  for (const key of META_WHITELIST) {
    if (Object.prototype.hasOwnProperty.call(meta, key)) {
      const value = meta[key];
      if (
        value === null ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        result[key] = value;
      }
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

export function logSubmission(context: SubmissionContext) {
  const hashedClient = hashIdentifier(context.clientIdentifier);
  const safeMeta = sanitizeMeta(context.meta);
  const payload: Record<string, unknown> = {
    status: context.status,
    id: context.id,
    client: hashedClient,
    signals: context.signals ?? {},
  };
  if (safeMeta) {
    payload['meta'] = safeMeta;
  }
  console.info('[CONTACT]', payload);
}

export function logRateLimit(context: RateLimitContext) {
  const hashedClient = hashIdentifier(context.clientIdentifier);
  const safeMeta = sanitizeMeta(context.meta);
  const payload: Record<string, unknown> = {
    client: hashedClient,
    retryAfterSeconds: context.retryAfterSeconds,
  };
  if (safeMeta) {
    payload['meta'] = safeMeta;
  }
  console.warn('[CONTACT_RATE_LIMIT]', payload);
}
