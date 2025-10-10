export const defaultSizes = '(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 640px';
export function requireAlt(alt?: string) {
  if (!alt || !alt.trim()) throw new Error('Image is missing alt text');
  return alt;
}
