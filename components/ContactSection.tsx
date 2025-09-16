import type { FormEvent } from 'react';

export type FormStatus = {
  type: 'success' | 'error' | null;
  message: string;
};

interface ContactSectionProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  formStatus: FormStatus;
  isSubmitting: boolean;
}

export default function ContactSection({ onSubmit, formStatus, isSubmitting }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-forest">Let&apos;s Talk</h2>
          <p className="text-slate">Tell me about your property and I&apos;ll reach out.</p>
          <div className="text-moss">🕒 Avg Airbnb response: under 1 hour.</div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
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
          <input
            required
            name="name"
            placeholder="Name"
            className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
          />
          <input
            name="city"
            placeholder="Property City/Area"
            className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
          />
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
