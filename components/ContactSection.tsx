'use client';

import { FormEvent, useState } from 'react';

type FormStatus = { type: 'success' | 'error' | null; message: string };
type ContactField = 'name' | 'email' | 'city' | 'message';
type FieldErrors = Partial<Record<ContactField, string[]>>;

const initialStatus: FormStatus = { type: null, message: '' };

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>(initialStatus);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getErrorMessages = (field: ContactField) => fieldErrors[field] ?? [];
  const getDescribedBy = (field: ContactField) => {
    const messages = getErrorMessages(field);
    if (messages.length === 0) {
      return undefined;
    }
    return messages
      .map((_, index) => `contact-${field}-error-${index}`)
      .join(' ');
  };

  const inputClasses = (hasError: boolean) =>
    `w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent ${
      hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
    }`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus(initialStatus);
    setFieldErrors({});

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      let result: unknown;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      const validationErrors =
        result && typeof result === 'object' && 'errors' in result
          ? (result.errors as FieldErrors)
          : undefined;

      if (!response.ok) {
        if (validationErrors) {
          setFieldErrors(validationErrors);
        }

        const message =
          result && typeof result === 'object' && 'message' in result && typeof result.message === 'string'
            ? result.message
            : 'Something went wrong. Please try again.';

        setFormStatus({ type: 'error', message });
        return;
      }

      if (validationErrors) {
        setFieldErrors(validationErrors);
      }

      if (
        result &&
        typeof result === 'object' &&
        'success' in result &&
        typeof result.success === 'boolean'
      ) {
        if (result.success) {
          const message =
            'message' in result && typeof result.message === 'string'
              ? result.message
              : 'Thank you for your message!';
          setFormStatus({ type: 'success', message });
          event.currentTarget.reset();
        } else {
          const message =
            'message' in result && typeof result.message === 'string'
              ? result.message
              : 'Something went wrong. Please try again.';
          setFormStatus({ type: 'error', message });
        }
      } else {
        setFormStatus({ type: 'error', message: 'Unexpected response. Please try again.' });
      }
    } catch {
      setFormStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-forest">Let&apos;s Talk</h2>
          <p className="text-slate">Tell me about your property and I&apos;ll reach out.</p>
          <div className="text-moss">🕒 Avg Airbnb response: under 1 hour.</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {formStatus.type && (
            <div
              role="alert"
              className={`p-3 rounded ${
                formStatus.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {formStatus.message}
            </div>
          )}
          <div className="space-y-1">
            <label htmlFor="contact-name" className="block text-sm font-medium text-forest">
              Name
            </label>
            <input
              id="contact-name"
              required
              name="name"
              placeholder="Name"
              className={inputClasses(getErrorMessages('name').length > 0)}
              aria-invalid={getErrorMessages('name').length > 0}
              aria-describedby={getDescribedBy('name')}
            />
            {getErrorMessages('name').map((error, index) => (
              <p
                key={`name-error-${index}`}
                id={`contact-name-error-${index}`}
                className="text-sm text-red-600"
              >
                {error}
              </p>
            ))}
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-email" className="block text-sm font-medium text-forest">
              Email
            </label>
            <input
              id="contact-email"
              required
              type="email"
              name="email"
              placeholder="Email"
              className={inputClasses(getErrorMessages('email').length > 0)}
              aria-invalid={getErrorMessages('email').length > 0}
              aria-describedby={getDescribedBy('email')}
            />
            {getErrorMessages('email').map((error, index) => (
              <p
                key={`email-error-${index}`}
                id={`contact-email-error-${index}`}
                className="text-sm text-red-600"
              >
                {error}
              </p>
            ))}
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-city" className="block text-sm font-medium text-forest">
              Property City or Area
            </label>
            <input
              id="contact-city"
              name="city"
              placeholder="Property City/Area"
              className={inputClasses(getErrorMessages('city').length > 0)}
              aria-invalid={getErrorMessages('city').length > 0}
              aria-describedby={getDescribedBy('city')}
            />
            {getErrorMessages('city').map((error, index) => (
              <p
                key={`city-error-${index}`}
                id={`contact-city-error-${index}`}
                className="text-sm text-red-600"
              >
                {error}
              </p>
            ))}
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-message" className="block text-sm font-medium text-forest">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Message"
              rows={4}
              className={inputClasses(getErrorMessages('message').length > 0)}
              aria-invalid={getErrorMessages('message').length > 0}
              aria-describedby={getDescribedBy('message')}
            />
            {getErrorMessages('message').map((error, index) => (
              <p
                key={`message-error-${index}`}
                id={`contact-message-error-${index}`}
                className="text-sm text-red-600"
              >
                {error}
              </p>
            ))}
          </div>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-forest text-white px-6 py-3 rounded-2xl hover:bg-lake transition shadow transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
}
