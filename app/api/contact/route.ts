import { NextResponse } from 'next/server';

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

const sanitizeRequiredString = (value: unknown) =>
  typeof value === 'string' ? value.trim() : '';

const sanitizeOptionalString = (value: unknown) => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const contactFormSchema: Schema<ContactFormData> = {
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

function validateSchema<T extends Record<string, unknown>>(
  schema: Schema<T>,
  data: Record<string, unknown>
): { success: true; data: T } | { success: false; errors: FieldErrors<T> } {
  const fieldErrors: FieldErrors<T> = {};
  const result: Partial<T> = {};
  let hasErrors = false;

  (Object.keys(schema) as Array<keyof T>).forEach(key => {
    const definition = schema[key];
    const { value, issues = [] } = definition.sanitize(data[key]);
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

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const honeypotValue = data.get('company');
    if (typeof honeypotValue === 'string' && honeypotValue.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Thank you for your message! Julia will get back to you within 1 hour.',
      });
    }

    const rawValues = {
      name: data.get('name'),
      email: data.get('email'),
      city: data.get('city'),
      message: data.get('message'),
    };

    const validationResult = validateSchema(contactFormSchema, rawValues);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please correct the errors below.',
          errors: validationResult.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, city, message } = validationResult.data;

    console.log('Contact form submission:', {
      name,
      email,
      city: city ?? '',
      message: message ?? '',
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! Julia will get back to you within 1 hour.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
