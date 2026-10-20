/** Guards for untrusted JSON values; no coercion or type assertions. */
export const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
export const isText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
export const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
