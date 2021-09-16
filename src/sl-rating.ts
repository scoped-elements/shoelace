import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlRating as BaseElement, SlIcon } from '@shoelace-style/shoelace';

export class SlRating extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
    };
  }
}
