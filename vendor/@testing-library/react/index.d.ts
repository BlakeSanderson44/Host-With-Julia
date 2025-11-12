import type { ReactElement } from 'react';

export interface StaticElement {
  tagName: string;
  getAttribute(name: string): string | null;
  readonly textContent: string;
}

export interface RenderResult {
  container: { innerHTML: string };
  rerender: (ui: ReactElement) => void;
  unmount: () => void;
}

export interface GetByRoleOptions {
  name?: string | RegExp | ((accessibleName: string) => boolean);
}

export interface Screen {
  getByRole: (role: string, options?: GetByRoleOptions) => StaticElement;
  getByText: (text: string | RegExp) => StaticElement;
}

export declare const screen: Screen;

export declare function render(ui: ReactElement): RenderResult;
export declare function cleanup(): void;
export declare function fireEvent(): never;
