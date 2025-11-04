import assert from 'node:assert/strict';
import test from 'node:test';

import { deriveSubmissionResult, mapErrorResponse } from '../components/contactClientUtils';

test('mapErrorResponse collects validation errors and message', () => {
  const errors = mapErrorResponse(400, {
    message: 'Please correct the errors below.',
    errors: {
      name: ['Name is required.'],
      services: ['Select at least one service.'],
    },
  });

  assert.equal(errors['name'], 'Name is required.');
  assert.equal(errors['services'], 'Select at least one service.');
  assert.equal(errors['form'], 'Please correct the errors below.');
});

test('mapErrorResponse falls back to generic message', () => {
  const errors = mapErrorResponse(500, null);
  assert.equal(
    errors['form'],
    'Sorry, something went wrong. Please try again or email info@hostwithjulia.com.',
  );
});

test('deriveSubmissionResult returns id and message for successes', () => {
  const processed = deriveSubmissionResult(200, {
    id: 'lead_123',
    message: 'Thanks! We received your details.',
  });

  assert.deepEqual(processed, {
    status: 'processed',
    id: 'lead_123',
    message: 'Thanks! We received your details.',
  });

  const accepted = deriveSubmissionResult(202, {});
  assert.deepEqual(accepted, {
    status: 'accepted',
    message: 'Thanks! We will review your details shortly.',
  });
  assert.ok(!('id' in accepted));
});
