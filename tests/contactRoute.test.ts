import assert from 'node:assert/strict';
import test from 'node:test';

import {
  contactFormSchema,
  sanitizeOptionalString,
  sanitizeRequiredString,
  validateSchema,
} from '../app/api/contact/route';

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
