import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlDialog as BaseElement, SlIcon } from '@shoelace-style/shoelace';
import { SlIconButton } from './sl-icon-button';

export class SlDialog extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
      'sl-icon-button': SlIconButton,
    };
  }
}
