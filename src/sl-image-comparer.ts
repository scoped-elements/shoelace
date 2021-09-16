import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import {
  SlImageComparer as BaseElement,
  SlIcon,
} from '@shoelace-style/shoelace';

export class SlImageComparer extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
    };
  }
}
