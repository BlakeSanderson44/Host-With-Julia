declare module 'node:fs' {
  export type ReadFileOptions =
    | { encoding: BufferEncoding; flag?: string }
    | BufferEncoding
    | undefined;
  export function readFileSync(path: string | URL, options?: ReadFileOptions): string;
}

declare module 'node:path' {
  export function join(...segments: string[]): string;
}

declare module 'node:process' {
  export const cwd: () => string;
}

declare module 'json5' {
  const json5: unknown;
  export default json5;
}

declare module 'prop-types' {
  const propTypes: unknown;
  export default propTypes;
}
