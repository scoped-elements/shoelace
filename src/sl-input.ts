import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlIcon, SlInput as BaseElement } from '@shoelace-style/shoelace';

export class SlInput extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
    };
  }
}
