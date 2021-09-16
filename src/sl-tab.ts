import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlTab as BaseElement, SlIcon } from '@shoelace-style/shoelace';
import { SlIconButton } from './sl-icon-button';

export class SlTab extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
      'sl-icon-button': SlIconButton,
    };
  }
}
