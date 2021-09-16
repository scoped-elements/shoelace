import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlMenuItem as BaseElement, SlIcon } from '@shoelace-style/shoelace';

export class SlMenuItem extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
    };
  }
}
