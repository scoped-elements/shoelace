import { Constructor } from '@open-wc/dedupe-mixin';
import { LitElement } from 'lit';
import { lightTheme } from './themes';

export const ThemeMixin: <B extends Constructor<LitElement>>(b: B) => B = <
  B extends Constructor<LitElement>
>(
  base: B
) => {
  const baseStyles = (base as any).styles ? [(base as any).styles] : [];
  return class extends base {
    static styles = [...baseStyles, lightTheme];
  };
};
