'use client';

import { ChangeEvent, FormEvent, useRef, useState } from 'react';

type ContactValues = {
  name: string;
  email: string;
  city: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof ContactValues, string>>;

type Status = 'idle' | 'success' | 'error';

const initialValues: ContactValues = {
  name: '',
  email: '',
  city: '',
  message: '',
};

export default function ContactSection() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const alertRef = useRef<HTMLDivElement | null>(null);

  const inputClasses = (hasError: boolean) =>
    `w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent ${
      hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
    }`;

  const setField = (field: keyof ContactValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
      setStatus('idle');
      if (fieldErrors[field]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  const validate = (formValues: ContactValues): FieldErrors => {
    const errors: FieldErrors = {};

    if (!formValues.name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (!formValues.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = 'Enter a valid email address.';
    }

    if (!formValues.message.trim()) {
      errors.message = 'Please add a short message.';
    } else if (formValues.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters.';
    }

    return errors;
  };

  const focusAlert = () => {
    requestAnimationFrame(() => {
      alertRef.current?.focus();
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validate(values);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStatus('error');
      focusAlert();
      return;
    }

    setStatus('success');
    setFieldErrors({});
    setValues(initialValues);
    focusAlert();
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-forest">Let&apos;s Talk</h2>
          <p className="text-slate">Tell me about your property and I&apos;ll reach out.</p>
          <div className="text-moss">🕒 Avg Airbnb response: under 1 hour.</div>
        </div>
        <div
          ref={alertRef}
          tabIndex={-1}
          aria-live="polite"
          className="sr-only"
        >
          {status === 'success' && 'Thank you! Your message has been sent.'}
          {status === 'error' && 'There are errors in the form below.'}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {status === 'success' && (
            <div
              role="alert"
              className="p-3 rounded bg-green-100 text-green-800 border border-green-300"
            >
              Thank you for your message!
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
              value={values.name}
              onChange={setField('name')}
              placeholder="Name"
              className={inputClasses(Boolean(fieldErrors.name))}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
            />
            {fieldErrors.name && (
              <p id="contact-name-error" className="text-sm text-red-600">
                {fieldErrors.name}
              </p>
            )}
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
              value={values.email}
              onChange={setField('email')}
              placeholder="Email"
              className={inputClasses(Boolean(fieldErrors.email))}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
            />
            {fieldErrors.email && (
              <p id="contact-email-error" className="text-sm text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-city" className="block text-sm font-medium text-forest">
              Property City or Area
            </label>
            <input
              id="contact-city"
              name="city"
              value={values.city}
              onChange={setField('city')}
              placeholder="Property City/Area"
              className={inputClasses(Boolean(fieldErrors.city))}
              aria-invalid={Boolean(fieldErrors.city)}
              aria-describedby={fieldErrors.city ? 'contact-city-error' : undefined}
            />
            {fieldErrors.city && (
              <p id="contact-city-error" className="text-sm text-red-600">
                {fieldErrors.city}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-message" className="block text-sm font-medium text-forest">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={values.message}
              onChange={setField('message')}
              placeholder="Message"
              rows={4}
              className={inputClasses(Boolean(fieldErrors.message))}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
            />
            {fieldErrors.message && (
              <p id="contact-message-error" className="text-sm text-red-600">
                {fieldErrors.message}
              </p>
            )}
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
            className="bg-forest text-white px-6 py-3 rounded-2xl hover:bg-lake transition shadow transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
