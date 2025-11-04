import { jsonResponse } from './responses';

type ParseResult =
  | { success: true; value: unknown }
  | { success: false; response: Response };

const textDecoder = new TextDecoder();

export async function readJsonBody(request: Request, limitBytes: number): Promise<ParseResult> {
  const contentLengthHeader = request.headers.get('content-length');
  const declaredLength = contentLengthHeader ? Number(contentLengthHeader) : NaN;

  if (Number.isFinite(declaredLength) && declaredLength > limitBytes) {
    return {
      success: false,
      response: jsonResponse(
        { message: 'Payload too large.' },
        { status: 413 },
      ),
    };
  }

  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  if (!contentType.includes('application/json')) {
    return {
      success: false,
      response: jsonResponse(
        { message: 'Unsupported content type.' },
        { status: 415 },
      ),
    };
  }

  const body = request.body;
  if (!body) {
    return {
      success: false,
      response: jsonResponse(
        { message: 'Request body is required.' },
        { status: 400 },
      ),
    };
  }

  const reader = body.getReader();
  let total = 0;
  let result = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (!value) {
        continue;
      }
      total += value.byteLength;
      if (total > limitBytes) {
        await reader.cancel('Payload too large');
        return {
          success: false,
          response: jsonResponse(
            { message: 'Payload too large.' },
            { status: 413 },
          ),
        };
      }
      result += textDecoder.decode(value, { stream: true });
    }
    result += textDecoder.decode();
  } catch {
    return {
      success: false,
      response: jsonResponse(
        { message: 'Unable to read request body.' },
        { status: 400 },
      ),
    };
  }

  try {
    const value = result.length > 0 ? JSON.parse(result) : null;
    return { success: true, value };
  } catch {
    return {
      success: false,
      response: jsonResponse(
        { message: 'Invalid JSON payload.' },
        { status: 400 },
      ),
    };
  }
}
