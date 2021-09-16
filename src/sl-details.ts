import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlDetails as BaseElement, SlIcon } from '@shoelace-style/shoelace';

export class SlDetails extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
    };
  }
}
