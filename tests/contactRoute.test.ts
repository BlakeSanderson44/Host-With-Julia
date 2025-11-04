// FILE: <KEEP_SAME_PATH>
import assert from 'node:assert/strict';
import test from 'node:test';

import { POST, __TESTING__ } from '../app/api/contact/route';
import { validateContactForm } from '../app/api/contact/validation';

type ContactPayload = Partial<Record<string, unknown>>;

const CONTACT_ENDPOINT = 'https://example.com/api/contact';

const basePayload: ContactPayload = {
  name: 'Julia Host',
  email: 'julia@example.com',
  preferredMethod: 'Email',
  propertyAddresses: '123 Main St, Edmonds, WA 98020',
  currentlyListed: 'No',
  services: ['Full-service Hosting'],
  message: 'Excited to learn more!',
  agree: true,
  secondsElapsed: 5,
};

type BuildRequestOptions = {
  headers?: HeadersInit;
  ip?: string;
};

function buildRequest(body: ContactPayload, options: BuildRequestOptions = {}): Request {
  const request = new Request(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(body),
  });

  if (options.ip) {
    Object.defineProperty(request, 'ip', {
      value: options.ip,
      configurable: true,
      enumerable: true,
    });
  }

  return request;
}


test('validateContactForm returns sanitized data for valid submissions', () => {
  const result = validateContactForm({
    ...basePayload,
    name: '  Julia  ',
    email: '  JULIA@example.com  ',
    phone: ' 206-555-1234 ',
    propertyAddresses: ' 123 Main St \n 456 Lakeview Dr ',
    services: ['Full-service Hosting', 'Invalid'],
    listedLinks: 'airbnb.com/rooms/12345',
    currentlyListed: 'Yes – Airbnb',
    preferredTime: 'Evening',
    desiredStartDate: '2024-08-01',
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data, {
      name: 'Julia',
      email: 'julia@example.com',
      phone: '206-555-1234',
      preferredMethod: 'Email',
      preferredTime: 'Evening',
      propertyAddresses: ['123 Main St', '456 Lakeview Dr'],
      currentlyListed: 'Yes – Airbnb',
      listedLinks: ['https://airbnb.com/rooms/12345'],
      services: ['Full-service Hosting'],
      desiredStartDate: '2024-08-01',
      message: 'Excited to learn more!',
      agree: true,
      secondsElapsed: 5,
    });
  }
});

test('validateContactForm reports validation errors for invalid submissions', () => {
  const result = validateContactForm({});

  assert.equal(result.success, false);
  if (!result.success) {
    assert.ok(Array.isArray(result.errors['name']));
    assert.ok(Array.isArray(result.errors['email']));
    assert.ok(Array.isArray(result.errors['preferredMethod']));
    assert.ok(Array.isArray(result.errors['propertyAddresses']));
    assert.ok(Array.isArray(result.errors['services']));
    assert.ok(Array.isArray(result.errors['message']));
    assert.ok(Array.isArray(result.errors['agree']));
  }
});

test('POST returns id for valid submissions', async () => {
  __TESTING__.resetRateLimiter();
  const response = await POST(
    buildRequest(basePayload, { ip: '203.0.113.10' }),
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(typeof body.id, 'string');
  assert.equal(body.message, 'Thanks! We received your details.');
});

test('POST returns validation errors for invalid submissions', async () => {
  __TESTING__.resetRateLimiter();
  const response = await POST(
    buildRequest({ agree: false }, { ip: '203.0.113.20' }),
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.message, 'Please correct the errors below.');
  assert.ok(body.errors);
  assert.ok(body.errors.name);
});

test('POST treats honeypot or quick submissions as ignored', async () => {
  __TESTING__.resetRateLimiter();
  const response = await POST(
    buildRequest(
      {
        ...basePayload,
        company: 'Acme Bots',
      },
      { ip: '203.0.113.30' },
    ),
  );

  assert.equal(response.status, 202);
  const body = await response.json();
  assert.equal(body.message, 'Thanks! We will review your details shortly.');
});

test('POST enforces rate limiting per identifier', async () => {
  __TESTING__.resetRateLimiter();
  const ip = '203.0.113.40';

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await POST(
      buildRequest({ ...basePayload, name: `Julia ${attempt}` }, { ip, headers: { 'x-forwarded-for': `198.51.100.${attempt}` } }),
    );
    assert.equal(response.status, 200);
  }

  const blockedResponse = await POST(buildRequest(basePayload, { ip, headers: { 'x-forwarded-for': '203.0.113.99' } }));
  assert.equal(blockedResponse.status, 429);
  assert.equal(
    blockedResponse.headers.get('Retry-After'),
    String(60),
  );
  const blockedBody = await blockedResponse.json();
  assert.equal(blockedBody.message, 'Too many submissions. Please wait a minute and try again.');
});

test('POST uses trusted identifier for rate limiting', async () => {
  __TESTING__.resetRateLimiter();
  const ip = '198.51.100.10';

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await POST(
      buildRequest(basePayload, { ip, headers: { 'x-forwarded-for': `203.0.113.${attempt}` } }),
    );
    assert.equal(response.status, 200);
  }

  const spoofedHeaderResponse = await POST(
    buildRequest(basePayload, { ip, headers: { 'x-forwarded-for': '198.51.100.250' } }),
  );

  assert.equal(spoofedHeaderResponse.status, 429);
});

test('POST rejects payloads exceeding configured limit', async () => {
  __TESTING__.resetRateLimiter();
  const largeMessage = 'x'.repeat(20_000);
  const response = await POST(
    buildRequest({ ...basePayload, message: largeMessage }, { ip: '203.0.113.55' }),
  );

  assert.equal(response.status, 413);
  const body = await response.json();
  assert.equal(body.message, 'Payload too large.');
});

test('POST redacts logged output', async () => {
  __TESTING__.resetRateLimiter();
  const originalInfo = console.info;
  const calls: unknown[][] = [];
  console.info = (...args: unknown[]) => {
    calls.push(args);
  };

  try {
    const response = await POST(
      buildRequest(
        {
          ...basePayload,
          meta: { path: '/contact', search: '?utm=demo', email: 'should-not-log' },
        },
        { ip: '203.0.113.77' },
      ),
    );

    assert.equal(response.status, 200);
  } finally {
    console.info = originalInfo;
  }

  assert.equal(calls.length, 1);
  const [label, payload] = calls[0] as [unknown, unknown];
  assert.equal(label, '[CONTACT]');
  const payloadRecord = payload as Record<string, unknown>;
  assert.equal(payloadRecord['status'], 'accepted');
  assert.equal(typeof payloadRecord['client'], 'string');
  assert.ok(payloadRecord['client']);
  const meta = (payloadRecord['meta'] ?? {}) as Record<string, unknown>;
  assert.equal(meta['path'], '/contact');
  assert.equal(meta['search'], '?utm=demo');
  assert.ok(!('email' in meta));
  const payloadString = JSON.stringify(payloadRecord);
  const baseName = String(basePayload['name'] ?? '');
  const baseEmail = String(basePayload['email'] ?? '');
  assert.ok(!payloadString.includes(baseName));
  assert.ok(!payloadString.includes(baseEmail));
});
