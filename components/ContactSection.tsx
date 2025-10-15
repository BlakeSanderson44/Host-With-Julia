"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PreferredMethod = "Email" | "Phone" | "Text";
type PreferredTime = "Morning" | "Afternoon" | "Evening";
type ListedWhere = "No" | "Yes – Airbnb" | "Yes – VRBO" | "Yes – Direct Site" | "Other";

type FormState = {
  name: string;
  email: string;
  phone?: string;
  preferredMethod: PreferredMethod;
  preferredTime?: PreferredTime;
  propertyAddresses: string;
  currentlyListed: ListedWhere;
  listedLinks?: string;
  services: string[];
  desiredStartDate?: string;
  message: string;
  agree: boolean;
  company?: string;
  startedAt?: number;
};

const SERVICE_OPTIONS = [
  "Full-service Hosting",
  "Setup Only",
  "Staging & Design",
  "Digital Guidebook",
  "Direct Booking Website",
  "Pricing Optimization",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeUrls(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((value) => {
      if (/^https?:\/\//i.test(value)) return value;
      return `https://${value}`;
    });
}

function splitLines(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    preferredMethod: "Email",
    propertyAddresses: "",
    currentlyListed: "No",
    listedLinks: "",
    services: [],
    message: "",
    agree: false,
    company: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const startedRef = useRef(false);
  const messageLimit = 1000;

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      setForm((prev) => ({ ...prev, startedAt: Date.now() }));
    }
  }, []);

  const errors = useMemo(() => {
    const currentErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) {
      currentErrors.name = "Please enter your name.";
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      currentErrors.email = "Enter a valid email.";
    }
    if (!form.propertyAddresses.trim()) {
      currentErrors.propertyAddresses = "Please provide at least one address (one per line).";
    }
    if (form.currentlyListed !== "No" && !form.listedLinks?.trim()) {
      currentErrors.listedLinks = "Please include listing link(s).";
    }
    if (form.services.length === 0) {
      currentErrors.services = "Select at least one service.";
    }
    if (!form.message.trim()) {
      currentErrors.message = "A short message helps us tailor our reply.";
    }
    if (!form.agree) {
      currentErrors.agree = "Please accept to be contacted about your inquiry.";
    }
    return currentErrors;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;
  const messageCount = form.message.length;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const secondsElapsed =
      form.startedAt && typeof form.startedAt === "number" ? (Date.now() - form.startedAt) / 1000 : 0;
    const looksSpam = (form.company && form.company.length > 0) || secondsElapsed < 3;

    setSubmitting(true);

    try {
      const payload = {
        ...form,
        email: form.email.trim().toLowerCase(),
        propertyAddressesParsed: splitLines(form.propertyAddresses),
        listedLinksParsed: normalizeUrls(form.listedLinks),
        looksSpam,
        secondsElapsed,
        meta: typeof window !== "undefined"
          ? {
              path: window.location.pathname,
              hash: window.location.hash,
              search: window.location.search,
            }
          : undefined,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = (await response.json()) as { id: string };
      setSubmittedId(data.id);

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Optional analytics hook
        // @ts-expect-error dataLayer is optional
        window.dataLayer?.push({ event: "lead_submit", lead_id: data.id });
      }
    } catch (error) {
      console.error(error);
      alert("Sorry, something went wrong. Please try again or email info@hostwithjulia.com.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedId) {
    return (
      <section id="contact" className="bg-cream py-16 sm:py-24" aria-live="polite">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center">
          <h2 className="text-3xl font-bold text-forest">Thanks — we&apos;ll be in touch shortly!</h2>
          <p className="mt-3 text-slate-700">
            We received your details (ref <span className="font-mono">{submittedId}</span>). Julia or a team member will
            reach out. If it&apos;s urgent, email {" "}
            <a className="underline" href="mailto:info@hostwithjulia.com">
              info@hostwithjulia.com
            </a>
            .
          </p>
          <a
            href="#top"
            className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            Back to top
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-cream py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <header className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="text-3xl font-bold text-forest">Request a free property review</h2>
          <p className="mt-3 text-slate-600">Tell us a bit about your place and goals. ~2 minutes to complete.</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 rounded-2xl border border-sand bg-white p-6 sm:p-8 shadow"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-charcoal">
                Your name*
              </label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
                className="mt-1 w-full rounded-xl border border-sand px-3 py-2 outline-none focus:ring-2 focus:ring-forest"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
              />
              {errors.name && (
                <p id="contact-name-error" className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-charcoal">
                Email*
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
                className="mt-1 w-full rounded-xl border border-sand px-3 py-2 outline-none focus:ring-2 focus:ring-forest"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
              />
              {errors.email && (
                <p id="contact-email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-charcoal">
                Phone (optional)
              </label>
              <input
                id="contact-phone"
                name="phone"
                inputMode="tel"
                value={form.phone ?? ""}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-sand px-3 py-2 outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <fieldset className="sm:col-span-2">
              <legend className="block text-sm font-medium text-charcoal">Preferred contact method*</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {(["Email", "Phone", "Text"] as PreferredMethod[]).map((method) => (
                  <label key={method} className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="preferredMethod"
                      value={method}
                      checked={form.preferredMethod === method}
                      onChange={() => setForm((prev) => ({ ...prev, preferredMethod: method }))}
                      className="h-4 w-4 border-sand text-forest focus:ring-forest"
                      required
                    />
                    <span className="text-sm text-charcoal">{method}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="preferred-time" className="block text-sm font-medium text-charcoal">
                Preferred contact time (optional)
              </label>
              <select
                id="preferred-time"
                name="preferredTime"
                value={form.preferredTime ?? ""}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    preferredTime: (event.target.value || undefined) as PreferredTime | undefined,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-sand px-3 py-2 outline-none focus:ring-2 focus:ring-forest"
              >
                <option value="">No preference</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="property-addresses" className="block text-sm font-medium text-charcoal">
              Property address(es)* <span className="font-normal text-slate-500">(one per line)</span>
            </label>
            <textarea
              id="property-addresses"
              name="propertyAddresses"
              rows={3}
              value={form.propertyAddresses}
              onChange={(event) => setForm((prev) => ({ ...prev, propertyAddresses: event.target.value }))}
              required
              placeholder={"123 Example St, Edmonds, WA 98020\n456 Lakeview Dr, Chelan, WA 98816"}
              className="mt-1 w-full rounded-xl border border-sand px-3 py-2 outline-none focus:ring-2 focus:ring-forest"
              aria-invalid={Boolean(errors.propertyAddresses)}
              aria-describedby={errors.propertyAddresses ? "property-addresses-error" : undefined}
            />
            {errors.propertyAddresses && (
              <p id="property-addresses-error" className="mt-1 text-sm text-red-600">
                {errors.propertyAddresses}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="currently-listed" className="block text-sm font-medium text-charcoal">
                Currently listed?*
              </label>
              <select
                id="currently-listed"
                name="currentlyListed"
                value={form.currentlyListed}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, currentlyListed: event.target.value as ListedWhere }))
                }
                className="mt-1 w-full rounded-xl border border-sand px-3 py-2 outline-none focus:ring-2 focus:ring-forest"
              >
                <option>No</option>
                <option>Yes – Airbnb</option>
                <option>Yes – VRBO</option>
                <option>Yes – Direct Site</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="listed-links" className="block text-sm font-medium text-charcoal">
                If listed, link(s) <span className="font-normal text-slate-500">(one per line)</span>
              </label>
              <textarea
                id="listed-links"
                name="listedLinks"
                rows={2}
                value={form.listedLinks ?? ""}
                onChange={(event) => setForm((prev) => ({ ...prev, listedLinks: event.target.value }))}
                disabled={form.currentlyListed === "No"}
                aria-invalid={Boolean(errors.listedLinks)}
                aria-describedby={errors.listedLinks ? "listed-links-error" : undefined}
                className="mt-1 w-full rounded-xl border border-sand px-3 py-2 outline-none focus:ring-2 focus:ring-forest disabled:cursor-not-allowed disabled:bg-sand/40"
                placeholder="https://airbnb.com/rooms/12345\nhttps://www.vrbo.com/98765"
              />
              {errors.listedLinks && (
                <p id="listed-links-error" className="mt-1 text-sm text-red-600">
                  {errors.listedLinks}
                </p>
              )}
            </div>
          </div>

          <fieldset aria-describedby={errors.services ? "services-error" : undefined}>
            <legend className="block text-sm font-medium text-charcoal">Services of interest*</legend>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {SERVICE_OPTIONS.map((service) => {
                const checked = form.services.includes(service);
                return (
                  <label key={service} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      checked={checked}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          services: event.target.checked
                            ? prev.services.includes(service)
                              ? prev.services
                              : [...prev.services, service]
                            : prev.services.filter((item) => item !== service),
                        }))
                      }
                      className="h-4 w-4 rounded border-sand text-forest focus:ring-forest"
                    />
                    <span className="text-sm text-charcoal">{service}</span>
                  </label>
                );
              })}
            </div>
            {errors.services && (
              <p id="services-error" className="mt-1 text-sm text-red-600">
                {errors.services}
              </p>
            )}
          </fieldset>

          <div>
            <label htmlFor="desired-start-date" className="block text-sm font-medium text-charcoal">
              Desired start date (optional)
            </label>
            <input
              id="desired-start-date"
              type="date"
              name="desiredStartDate"
              value={form.desiredStartDate ?? ""}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, desiredStartDate: event.target.value || undefined }))
              }
              className="mt-1 w-full rounded-xl border border-sand px-3 py-2 outline-none focus:ring-2 focus:ring-forest sm:max-w-xs"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-charcoal">
              Tell us about your property or goals*
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              maxLength={messageLimit}
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              required
              className="mt-1 w-full rounded-xl border border-sand px-3 py-2 outline-none focus:ring-2 focus:ring-forest"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : "message-counter"}
            />
            <div className="mt-1 flex items-center justify-between">
              {errors.message ? (
                <p id="contact-message-error" className="text-sm text-red-600">
                  {errors.message}
                </p>
              ) : (
                <span id="message-counter" className="text-xs text-slate-500">
                  {messageCount}/{messageLimit}
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <input
                id="contact-agree"
                name="agree"
                type="checkbox"
                checked={form.agree}
                onChange={(event) => setForm((prev) => ({ ...prev, agree: event.target.checked }))}
                required
                className="mt-1 h-4 w-4 rounded border-sand text-forest focus:ring-forest"
                aria-invalid={Boolean(errors.agree)}
                aria-describedby={errors.agree ? "contact-agree-error" : undefined}
              />
              <label htmlFor="contact-agree" className="text-sm text-charcoal">
                I agree to be contacted about my inquiry. We never share your info.
              </label>
            </div>
            {errors.agree && (
              <p id="contact-agree-error" className="text-sm text-red-600">
                {errors.agree}
              </p>
            )}
          </div>

          <div className="hidden" aria-hidden="true">
            <label>
              Company
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.company ?? ""}
                onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
              />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting || !canSubmit}
              className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-white font-semibold shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Request a Consultation"}
            </button>
            <a href="#testimonials" className="text-forest underline-offset-2 hover:underline">
              Read guest reviews
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
