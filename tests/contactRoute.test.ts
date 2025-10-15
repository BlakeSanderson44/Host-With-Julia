// FILE: <KEEP_SAME_PATH>
import assert from 'node:assert/strict';
import test from 'node:test';

import { POST } from '../app/api/contact/route';
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

function buildRequest(body: ContactPayload, headers: HeadersInit = {}): Request {
  return new Request(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
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
  const response = await POST(
    buildRequest(basePayload, { 'x-forwarded-for': '203.0.113.10' }),
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(typeof body.id, 'string');
});

test('POST returns validation errors for invalid submissions', async () => {
  const response = await POST(
    buildRequest({ agree: false }, { 'x-forwarded-for': '203.0.113.20' }),
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.message, 'Please correct the errors below.');
  assert.ok(body.errors);
  assert.ok(body.errors.name);
});

test('POST treats honeypot or quick submissions as ignored', async () => {
  const response = await POST(
    buildRequest(
      {
        ...basePayload,
        company: 'Acme Bots',
      },
      { 'x-forwarded-for': '203.0.113.30' },
    ),
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.id, 'ignored');
});

test('POST enforces rate limiting per identifier', async () => {
  const headers = { 'x-forwarded-for': '203.0.113.40' };

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await POST(buildRequest({ ...basePayload, name: `Julia ${attempt}` }, headers));
    assert.equal(response.status, 200);
  }

  const blockedResponse = await POST(buildRequest(basePayload, headers));
  assert.equal(blockedResponse.status, 429);
  assert.equal(
    blockedResponse.headers.get('Retry-After'),
    String(60),
  );
  const blockedBody = await blockedResponse.json();
  assert.equal(blockedBody.message, 'Too many submissions. Please wait a minute and try again.');
});
