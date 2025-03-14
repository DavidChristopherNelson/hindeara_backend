import Joi from 'joi';

export function validateInput<T>(
  schema: Joi.Schema, input: unknown
): { error?: string; value?: T } {
  const { error, value } = schema.validate(input, { convert: true });
  if (error) {
    return { error: error.details?.[0]?.message || 'Validation error' };
  }
  return { value };
}
