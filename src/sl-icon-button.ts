import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import {
  SlIcon,
  SlIconButton as OldSlIconButton,
} from '@shoelace-style/shoelace';

export class SlIconButton extends ScopedElementsMixin(OldSlIconButton) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
    };
  }
}
