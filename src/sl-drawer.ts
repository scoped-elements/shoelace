import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlDrawer as BaseElement, SlIcon } from '@shoelace-style/shoelace';
import { SlIconButton } from './sl-icon-button';

export class SlDrawer extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
      'sl-icon-button': SlIconButton,
    };
  }
}
