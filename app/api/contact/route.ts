import { contactFormSchema, validateSchema } from './validation';

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

export async function POST(request: Request) {
  try {
    const clientIdentifier = getClientIdentifier(request);

    if (isRateLimited(clientIdentifier)) {
      return jsonResponse(
        {
          success: false,
          message: 'Too many submissions. Please wait a minute and try again.',
        },
        {
          status: 429,
          headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) },
        }
      );
    }

    const data = await request.formData();

    const honeypotValue = data.get('company');
    if (typeof honeypotValue === 'string' && honeypotValue.trim().length > 0) {
      return jsonResponse({
        success: true,
        message: 'Thank you for your message! Julia will get back to you within 1 hour.',
      });
    }

    const rawValues = {
      name: data.get('name'),
      email: data.get('email'),
      city: data.get('city'),
      message: data.get('message'),
    };

    const validationResult = validateSchema(contactFormSchema, rawValues);

    if (!validationResult.success) {
      return jsonResponse(
        {
          success: false,
          message: 'Please correct the errors below.',
          errors: validationResult.errors,
        },
        { status: 400 }
      );
    }

    return jsonResponse({
      success: true,
      message: 'Thank you for your message! Julia will get back to you within 1 hour.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return jsonResponse(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
