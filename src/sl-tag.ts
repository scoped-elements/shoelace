import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import {
  SlTag as BaseElement,
  SlIcon,
  SlIconButton,
} from '@shoelace-style/shoelace';

export class SlTag extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
      'sl-icon-button': SlIconButton,
    };
  }
}
