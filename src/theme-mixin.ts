import { Constructor } from '@open-wc/dedupe-mixin';
import { LitElement } from 'lit';
import { lightTheme } from './themes';

export const ThemeMixin: <B extends Constructor<LitElement>>(b: B) => B = <
  B extends Constructor<LitElement>
>(
  base: B
) =>
  class extends base {
    static styles = [(base as any).styles, lightTheme];
  };
