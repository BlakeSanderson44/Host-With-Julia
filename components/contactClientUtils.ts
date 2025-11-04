export type SubmissionResult = { status: 'processed' | 'accepted'; id?: string; message: string };

export type RemoteErrors<FormField extends string> = Partial<Record<FormField | 'form', string>>;

function extractMessage(body: unknown) {
  if (body && typeof body === 'object' && body !== null) {
    const maybeMessage = (body as { message?: unknown }).message;
    if (typeof maybeMessage === 'string') {
      return maybeMessage;
    }
  }
  return undefined;
}

function extractErrors(body: unknown) {
  if (body && typeof body === 'object' && body !== null) {
    const maybeErrors = (body as { errors?: unknown }).errors;
    if (maybeErrors && typeof maybeErrors === 'object') {
      return maybeErrors as Record<string, unknown>;
    }
  }
  return undefined;
}

export function deriveSubmissionResult(status: number, body: unknown): SubmissionResult {
  const normalizedStatus: SubmissionResult['status'] = status === 202 ? 'accepted' : 'processed';
  let id: string | undefined;
  if (body && typeof body === 'object' && body !== null) {
    const maybeId = (body as { id?: unknown }).id;
    if (typeof maybeId === 'string') {
      id = maybeId;
    }
  }
  const fallbackMessage =
    normalizedStatus === 'accepted'
      ? 'Thanks! We will review your details shortly.'
      : 'Thanks! We received your details.';
  const message = extractMessage(body) ?? fallbackMessage;
  const result: SubmissionResult = { status: normalizedStatus, message };
  if (id !== undefined) {
    result.id = id;
  }
  return result;
}

export function mapErrorResponse<FormField extends string>(
  status: number,
  body: unknown,
): RemoteErrors<FormField> {
  const errors: RemoteErrors<FormField> = {};
  const message = extractMessage(body);

  if (status === 400) {
    const fieldErrors = extractErrors(body);
    if (fieldErrors) {
      for (const [key, value] of Object.entries(fieldErrors)) {
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
          errors[key as FormField] = value[0];
        }
      }
    }
    errors.form = message ?? 'Please correct the errors below.';
    return errors;
  }

  if (status === 429) {
    errors.form = message ?? 'Too many submissions. Please wait a minute and try again.';
    return errors;
  }

  if (status === 413) {
    errors.form = message ?? 'Your submission was too large. Please shorten your message.';
    return errors;
  }

  if (status === 415) {
    errors.form = message ?? 'Unsupported content type.';
    return errors;
  }

  errors.form = message ?? 'Sorry, something went wrong. Please try again or email info@hostwithjulia.com.';
  return errors;
}
