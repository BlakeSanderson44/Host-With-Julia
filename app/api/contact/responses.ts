export type JsonInit = ResponseInit & { headers?: HeadersInit };

export function jsonResponse(body: unknown, init: JsonInit = {}) {
  const headers = new Headers(init.headers);
  if (!headers.has('content-type')) {
    headers.set('content-type', 'application/json; charset=utf-8');
  }
  return new Response(JSON.stringify(body), { ...init, headers });
}
