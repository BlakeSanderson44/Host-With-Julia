'use client';

import { FormEvent, useState } from 'react';

type FormStatus = { type: 'success' | 'error' | null; message: string };

const initialStatus: FormStatus = { type: null, message: '' };

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus(initialStatus);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setFormStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        return;
      }

      const result = await response.json();

      if (result.success) {
        setFormStatus({ type: 'success', message: result.message });
        event.currentTarget.reset();
      } else {
        setFormStatus({ type: 'error', message: result.error || 'Something went wrong' });
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
              className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
            />
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
              className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="contact-city" className="block text-sm font-medium text-forest">
              Property City or Area
            </label>
            <input
              id="contact-city"
              name="city"
              placeholder="Property City/Area"
              className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
            />
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
              className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
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
