type ContactFormData = {
  name: string;
  email: string;
  city?: string;
  message?: string;
};

type FieldErrors<T extends Record<string, unknown>> = Partial<Record<keyof T, string[]>>;

type SchemaField<T> = {
  sanitize: (value: unknown) => { value: T; issues?: string[] };
  validators?: Array<(value: T) => string | null>;
};

type Schema<T> = {
  [K in keyof T]-?: SchemaField<T[K]>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const required = (message: string) => (value: string) =>
  value.length === 0 ? message : null;

const maxLength = (limit: number, message: string) => (value: string) =>
  value.length > limit ? message : null;

const optionalMaxLength = (limit: number, message: string) => (value?: string) =>
  value && value.length > limit ? message : null;

const emailFormat = (message: string) => (value: string) =>
  value.length === 0 || emailPattern.test(value) ? null : message;

export const sanitizeRequiredString = (value: unknown) =>
  typeof value === 'string' ? value.trim() : '';

export const sanitizeOptionalString = (value: unknown) => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const contactFormSchema: Schema<ContactFormData> = {
  name: {
    sanitize: value => ({ value: sanitizeRequiredString(value) }),
    validators: [
      required('Name is required'),
      maxLength(100, 'Name must be 100 characters or less'),
    ],
  },
  email: {
    sanitize: value => ({ value: sanitizeRequiredString(value) }),
    validators: [
      required('Email is required'),
      maxLength(254, 'Email must be 254 characters or less'),
      emailFormat('Please enter a valid email address'),
    ],
  },
  city: {
    sanitize: value => ({ value: sanitizeOptionalString(value) }),
    validators: [optionalMaxLength(100, 'City must be 100 characters or less')],
  },
  message: {
    sanitize: value => ({ value: sanitizeOptionalString(value) }),
    validators: [optionalMaxLength(1000, 'Message must be 1000 characters or less')],
  },
};

export function validateSchema<T extends Record<string, unknown>>(
  schema: Schema<T>,
  data: Record<string, unknown>
): { success: true; data: T } | { success: false; errors: FieldErrors<T> } {
  const fieldErrors: FieldErrors<T> = {};
  const result: Partial<T> = {};
  let hasErrors = false;

  (Object.keys(schema) as Array<keyof T>).forEach(key => {
    const definition = schema[key];
    const rawValue = data[key as string];
    const { value, issues = [] } = definition.sanitize(rawValue);
    const validators = definition.validators ?? [];
    const errors: string[] = [...issues];

    validators.forEach(validator => {
      const error = validator(value);
      if (error) {
        errors.push(error);
      }
    });

    if (errors.length > 0) {
      fieldErrors[key] = errors;
      hasErrors = true;
    }

    if (value !== undefined) {
      result[key] = value;
    }
  });

  if (hasErrors) {
    return { success: false, errors: fieldErrors };
  }

  return { success: true, data: result as T };
}

export type { ContactFormData, Schema, SchemaField, FieldErrors };
