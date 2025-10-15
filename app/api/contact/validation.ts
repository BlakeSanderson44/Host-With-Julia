const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PREFERRED_METHOD_VALUES = ['Email', 'Phone', 'Text'] as const;
const PREFERRED_TIME_VALUES = ['Morning', 'Afternoon', 'Evening'] as const;
const LISTING_VALUES = ['No', 'Yes – Airbnb', 'Yes – VRBO', 'Yes – Direct Site', 'Other'] as const;
const SERVICE_VALUES = [
  'Full-service Hosting',
  'Setup Only',
  'Staging & Design',
  'Digital Guidebook',
  'Direct Booking Website',
  'Pricing Optimization',
] as const;

type PreferredMethod = (typeof PREFERRED_METHOD_VALUES)[number];
type PreferredTime = (typeof PREFERRED_TIME_VALUES)[number];
type ListingOption = (typeof LISTING_VALUES)[number];
type ServiceOption = (typeof SERVICE_VALUES)[number];

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  preferredMethod: PreferredMethod;
  preferredTime?: PreferredTime;
  propertyAddresses: string[];
  currentlyListed: ListingOption;
  listedLinks?: string[];
  services: ServiceOption[];
  desiredStartDate?: string;
  message: string;
  agree: boolean;
  company?: string;
  startedAt?: number;
  secondsElapsed?: number;
  looksSpam?: boolean;
  meta?: Record<string, unknown>;
};

export type FieldErrors = Record<string, string[]>;

export type ValidationSuccess<T> = { success: true; data: T };
export type ValidationFailure = { success: false; errors: FieldErrors };
export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

function sanitizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function sanitizeOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
      .filter((entry) => entry.length > 0);
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n/)
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }

  return [];
}

function normalizeUrls(values: string[]): string[] {
  return values.map((value) => {
    if (/^https?:\/\//i.test(value)) {
      return value;
    }
    return `https://${value}`;
  });
}

function ensureAllowed<T extends readonly string[]>(value: string | undefined, allowed: T): T[number] | undefined {
  if (!value) {
    return undefined;
  }

  return (allowed as readonly string[]).includes(value) ? (value as T[number]) : undefined;
}

function addError(errors: FieldErrors, field: string, message: string) {
  if (!errors[field]) {
    errors[field] = [];
  }
  errors[field]!.push(message);
}

export function validateContactForm(payload: Record<string, unknown>): ValidationResult<ContactFormData> {
  const errors: FieldErrors = {};

  const name = sanitizeString(payload['name']);
  if (!name) {
    addError(errors, 'name', 'Name is required.');
  }

  const email = sanitizeString(payload['email']).toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) {
    addError(errors, 'email', 'Enter a valid email.');
  }

  const phone = sanitizeOptionalString(payload['phone']);

  const preferredMethod = ensureAllowed(sanitizeString(payload['preferredMethod']), PREFERRED_METHOD_VALUES);
  if (!preferredMethod) {
    addError(errors, 'preferredMethod', 'Preferred contact method is required.');
  }

  const preferredTime = ensureAllowed(sanitizeString(payload['preferredTime']), PREFERRED_TIME_VALUES);

  const propertyAddressesParsed = Array.isArray(payload['propertyAddressesParsed'])
    ? toStringArray(payload['propertyAddressesParsed'])
    : toStringArray(payload['propertyAddresses']);
  if (propertyAddressesParsed.length === 0) {
    addError(errors, 'propertyAddresses', 'Provide at least one property address.');
  }

  const currentlyListed = ensureAllowed(sanitizeString(payload['currentlyListed']), LISTING_VALUES) ?? 'No';

  const listedLinksParsed = Array.isArray(payload['listedLinksParsed'])
    ? normalizeUrls(toStringArray(payload['listedLinksParsed']))
    : normalizeUrls(toStringArray(payload['listedLinks']));

  if (currentlyListed !== 'No' && listedLinksParsed.length === 0) {
    addError(errors, 'listedLinks', 'Include at least one listing link.');
  }

  const servicesRaw = Array.isArray(payload['services']) ? payload['services'] : [];
  const services = servicesRaw.reduce<ServiceOption[]>((acc, item) => {
    if (typeof item !== 'string') {
      return acc;
    }
    const trimmed = item.trim();
    if ((SERVICE_VALUES as readonly string[]).includes(trimmed) && !acc.includes(trimmed as ServiceOption)) {
      acc.push(trimmed as ServiceOption);
    }
    return acc;
  }, []);

  if (services.length === 0) {
    addError(errors, 'services', 'Select at least one service of interest.');
  }

  const desiredStartDate = sanitizeOptionalString(payload['desiredStartDate']);
  if (desiredStartDate && !/^\d{4}-\d{2}-\d{2}$/.test(desiredStartDate)) {
    addError(errors, 'desiredStartDate', 'Start date must be YYYY-MM-DD.');
  }

  const message = sanitizeString(payload['message']);
  if (!message) {
    addError(errors, 'message', 'Tell us a bit about your property or goals.');
  } else if (message.length > 1000) {
    addError(errors, 'message', 'Message must be 1000 characters or fewer.');
  }

  const agree = Boolean(payload['agree']);
  if (!agree) {
    addError(errors, 'agree', 'Consent is required.');
  }

  const company = sanitizeOptionalString(payload['company']);
  const startedAt = typeof payload['startedAt'] === 'number' ? (payload['startedAt'] as number) : undefined;
  const secondsElapsed = typeof payload['secondsElapsed'] === 'number' ? (payload['secondsElapsed'] as number) : undefined;
  const looksSpam = typeof payload['looksSpam'] === 'boolean' ? (payload['looksSpam'] as boolean) : undefined;

  const meta = payload['meta'] && typeof payload['meta'] === 'object' ? (payload['meta'] as Record<string, unknown>) : undefined;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const data: ContactFormData = {
    name,
    email,
    preferredMethod: preferredMethod!,
    propertyAddresses: propertyAddressesParsed,
    currentlyListed,
    services,
    message,
    agree,
  };

  if (phone !== undefined) {
    data.phone = phone;
  }

  if (preferredTime) {
    data.preferredTime = preferredTime;
  }

  if (listedLinksParsed.length > 0) {
    data.listedLinks = listedLinksParsed;
  }

  if (desiredStartDate) {
    data.desiredStartDate = desiredStartDate;
  }

  if (company !== undefined) {
    data.company = company;
  }

  if (startedAt !== undefined) {
    data.startedAt = startedAt;
  }

  if (secondsElapsed !== undefined) {
    data.secondsElapsed = secondsElapsed;
  }

  if (looksSpam !== undefined) {
    data.looksSpam = looksSpam;
  }

  if (meta !== undefined) {
    data.meta = meta;
  }

  return { success: true, data };
}
