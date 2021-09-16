import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlButton as BaseElement, SlSpinner } from '@shoelace-style/shoelace';

export class SlButton extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-spinner': SlSpinner,
    };
  }
}
