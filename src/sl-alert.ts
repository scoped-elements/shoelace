import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlAlert as OldSlAlert, SlIcon } from '@shoelace-style/shoelace';
import { SlIconButton } from './sl-icon-button';

export class SlAlert extends ScopedElementsMixin(OldSlAlert) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
      'sl-icon-button': SlIconButton,
    };
  }
}
