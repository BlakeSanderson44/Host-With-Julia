import { validateContactForm } from './validation';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = { count: number; expiresAt: number };

const submissionAttempts = new Map<string, RateLimitEntry>();

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(',');
    if (firstIp) {
      return firstIp.trim();
    }
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}

function isRateLimited(identifier: string) {
  const now = Date.now();

  for (const key of Array.from(submissionAttempts.keys())) {
    const entry = submissionAttempts.get(key);
    if (entry && entry.expiresAt <= now) {
      submissionAttempts.delete(key);
    }
  }

  const entry = submissionAttempts.get(identifier);

  if (!entry || entry.expiresAt <= now) {
    submissionAttempts.set(identifier, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  submissionAttempts.set(identifier, entry);
  return false;
}

type JsonInit = ResponseInit & { headers?: HeadersInit };

function jsonResponse(body: unknown, init: JsonInit = {}) {
  const headers = new Headers(init.headers);
  if (!headers.has('content-type')) {
    headers.set('content-type', 'application/json; charset=utf-8');
  }

  return new Response(JSON.stringify(body), { ...init, headers });
}

function createId() {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(request: Request) {
  try {
    const clientIdentifier = getClientIdentifier(request);

    if (isRateLimited(clientIdentifier)) {
      return jsonResponse(
        {
          message: 'Too many submissions. Please wait a minute and try again.',
        },
        {
          status: 429,
          headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) },
        },
      );
    }

    const payload = await request.json().catch(() => null);

    if (!payload || typeof payload !== 'object') {
      return jsonResponse(
        {
          message: 'Invalid submission.',
        },
        { status: 400 },
      );
    }

    const validationResult = validateContactForm(payload as Record<string, unknown>);

    if (!validationResult.success) {
      return jsonResponse(
        {
          message: 'Please correct the errors below.',
          errors: validationResult.errors,
        },
        { status: 400 },
      );
    }

    const { data } = validationResult;

    if (data.company || data.looksSpam) {
      return jsonResponse({ id: 'ignored' }, { status: 200 });
    }

    const id = createId();
    console.log('[CONTACT]', id, data);

    return jsonResponse({ id }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return jsonResponse({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
