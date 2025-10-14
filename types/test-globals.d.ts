declare module 'node:assert/strict' {
  type Assert = {
    equal(actual: unknown, expected: unknown, message?: string): void;
    deepEqual(actual: unknown, expected: unknown, message?: string): void;
    ok(value: unknown, message?: string): void;
  };

  const assert: Assert;
  export default assert;
}

declare module 'node:test' {
  type TestFunction = (
    name: string,
    fn: () => void | Promise<void>
  ) => Promise<void> | void;

  const test: TestFunction;
  export default test;
}
