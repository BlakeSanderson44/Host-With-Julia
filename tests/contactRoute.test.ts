// FILE: <KEEP_SAME_PATH>
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  contactFormSchema,
  sanitizeOptionalString,
  sanitizeRequiredString,
  validateSchema,
} from '../app/api/contact/validation';
import { POST } from '../app/api/contact/route';

const CONTACT_ENDPOINT = 'https://example.com/api/contact';

const successMessage =
  'Thank you for your message! Julia will get back to you within 1 hour.';

type ContactFormFields = {
  name?: string;
  email?: string;
  city?: string;
  message?: string;
  company?: string;
};

function buildRequest(
  fields: ContactFormFields,
  headers: HeadersInit = {}
): Request {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.set(key, value);
    }
  });

  return new Request(CONTACT_ENDPOINT, {
    method: 'POST',
    body: formData,
    headers,
  });
}

test('sanitizeRequiredString trims strings and normalizes non-strings to empty string', () => {
  assert.equal(sanitizeRequiredString('  hello  '), 'hello');
  assert.equal(sanitizeRequiredString(42), '');
  assert.equal(sanitizeRequiredString(null), '');
});

test('sanitizeOptionalString trims strings and returns undefined for blanks or non-strings', () => {
  assert.equal(sanitizeOptionalString('  Seattle  '), 'Seattle');
  assert.equal(sanitizeOptionalString('   '), undefined);
  assert.equal(sanitizeOptionalString(undefined), undefined);
  assert.equal(sanitizeOptionalString(123), undefined);
});

test('validateSchema returns sanitized data for valid submissions', () => {
  const result = validateSchema(contactFormSchema, {
    name: '  Julia  ',
    email: '  julia@example.com  ',
    city: '  Austin  ',
    message: '  Looking forward to hosting with you!  ',
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data, {
      name: 'Julia',
      email: 'julia@example.com',
      city: 'Austin',
      message: 'Looking forward to hosting with you!',
    });
  }
});

test('validateSchema reports validation errors for invalid submissions', () => {
  const result = validateSchema(contactFormSchema, {
    name: '',
    email: 'invalid-email',
    city: 'x'.repeat(101),
    message: 'y'.repeat(1001),
  });

  assert.equal(result.success, false);
  if (!result.success) {
    assert.ok(result.errors.name?.includes('Name is required'));
    assert.ok(result.errors.email?.includes('Please enter a valid email address'));
    assert.ok(result.errors.city?.includes('City must be 100 characters or less'));
    assert.ok(result.errors.message?.includes('Message must be 1000 characters or less'));
  }
});

test('POST returns success for valid submissions', async () => {
  const response = await POST(
    buildRequest(
      {
        name: 'Julia',
        email: 'julia@example.com',
        city: 'Seattle',
        message: 'Excited to learn more!',
      },
      { 'x-forwarded-for': '203.0.113.10' }
    )
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
  assert.equal(body.message, successMessage);
});

test('POST returns validation errors for invalid submissions', async () => {
  const response = await POST(
    buildRequest(
      {
        name: '',
        email: 'invalid',
        city: 'x'.repeat(150),
        message: '',
      },
      { 'x-forwarded-for': '203.0.113.20' }
    )
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.success, false);
  assert.equal(body.message, 'Please correct the errors below.');
  assert.ok(body.errors.name?.includes('Name is required'));
  assert.ok(body.errors.email?.includes('Please enter a valid email address'));
  assert.ok(body.errors.city?.includes('City must be 100 characters or less'));
});

test('POST treats honeypot submissions as successful without validation', async () => {
  const response = await POST(
    buildRequest(
      {
        name: '',
        email: 'not-even-checked@example.com',
        company: 'Acme',
      },
      { 'x-forwarded-for': '203.0.113.30' }
    )
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
  assert.equal(body.message, successMessage);
});

test('POST enforces rate limiting per identifier', async () => {
  const headers = { 'x-forwarded-for': '203.0.113.40' };

  for (let attempt = 0, len = 5; attempt < len; attempt += 1) {
    const response = await POST(
      buildRequest(
        {
          name: `Julia ${attempt}`,
          email: `julia${attempt}@example.com`,
          message: 'Checking rate limiting',
        },
        headers
      )
    );

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.success, true);
  }

  const blockedResponse = await POST(
    buildRequest(
      {
        name: 'Rate Limited',
        email: 'rate.limited@example.com',
      },
      headers
    )
  );

  assert.equal(blockedResponse.status, 429);
  const blockedBody = await blockedResponse.json();
  assert.equal(blockedBody.success, false);
  assert.equal(
    blockedBody.message,
    'Too many submissions. Please wait a minute and try again.'
  );
  assert.equal(blockedResponse.headers.get('Retry-After'), String(60));
});
