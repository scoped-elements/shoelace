import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlAvatar as BaseElement, SlIcon } from '@shoelace-style/shoelace';

export class SlAvatar extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
    };
  }
}
