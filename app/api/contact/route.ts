import { logRateLimit, logSubmission, sanitizeMeta } from './logging';
import { readJsonBody } from './readJsonBody';
import { jsonResponse } from './responses';
import { registerAttempt } from './rateLimiterInstance';
import { validateContactForm } from './validation';

const MAX_BODY_BYTES = 16_384;

const TRUSTED_IP_HEADERS = ['x-vercel-forwarded-for', 'cf-connecting-ip', 'x-real-ip'] as const;

type RequestWithIp = Request & { ip?: string | null };

function getClientIdentifier(request: RequestWithIp) {
  if (typeof request.ip === 'string' && request.ip.trim().length > 0) {
    return request.ip.trim();
  }

  for (const header of TRUSTED_IP_HEADERS) {
    const value = request.headers.get(header);
    if (value) {
      const [first] = value.split(',');
      if (first) {
        const normalized = first.trim();
        if (normalized) {
          return normalized;
        }
      }
    }
  }

  return 'unknown';
}

function createId() {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(request: Request) {
  try {
    const requestWithIp = request as RequestWithIp;
    const clientIdentifier = getClientIdentifier(requestWithIp);

    const rateLimitResult = registerAttempt(clientIdentifier);
    if (rateLimitResult.limited) {
      const retryAfterSeconds = Math.ceil(rateLimitResult.retryAfterMs / 1000);
      logRateLimit({
        clientIdentifier,
        retryAfterSeconds,
      });
      return jsonResponse(
        {
          message: 'Too many submissions. Please wait a minute and try again.',
        },
        {
          status: 429,
          headers: { 'Retry-After': String(retryAfterSeconds) },
        },
      );
    }

    const parsed = await readJsonBody(request, MAX_BODY_BYTES);
    if (parsed.success === false) {
      return parsed.response;
    }

    const payload = parsed.value;

    if (!payload || typeof payload !== 'object') {
      return jsonResponse(
        {
          message: 'Invalid submission.',
        },
        { status: 400 },
      );
    }

    const validationResult = validateContactForm(payload as Record<string, unknown>);

    if (validationResult.success === false) {
      return jsonResponse(
        {
          message: 'Please correct the errors below.',
          errors: validationResult.errors,
        },
        { status: 400 },
      );
    }

    const { data } = validationResult;
    const sanitizedMeta = sanitizeMeta(data.meta);

    if (data.company || data.looksSpam) {
      const spamContext: Parameters<typeof logSubmission>[0] = {
        status: 'spam',
        id: 'suppressed',
        clientIdentifier,
        signals: {
          secondsElapsed: data.secondsElapsed ?? null,
        },
      };
      if (sanitizedMeta) {
        spamContext.meta = sanitizedMeta;
      }
      logSubmission(spamContext);
      return jsonResponse(
        {
          message: 'Thanks! We will review your details shortly.',
        },
        { status: 202 },
      );
    }

    const id = createId();
    const acceptedContext: Parameters<typeof logSubmission>[0] = {
      status: 'accepted',
      id,
      clientIdentifier,
      signals: {
        services: data.services,
        currentlyListed: data.currentlyListed,
        secondsElapsed: data.secondsElapsed ?? null,
        messageLength: data.message.length,
      },
    };
    if (sanitizedMeta) {
      acceptedContext.meta = sanitizedMeta;
    }
    logSubmission(acceptedContext);

    return jsonResponse(
      {
        id,
        message: 'Thanks! We received your details.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return jsonResponse({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
