import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import {
  SlColorPicker as BaseElement,
  SlDropdown,
  SlIcon,
  SlSpinner,
} from '@shoelace-style/shoelace';
import { SlButton } from './sl-button';
import { SlInput } from './sl-input';

export class SlColorPicker extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
      'sl-button': SlButton,
      'sl-input': SlInput,
      'sl-spinner': SlSpinner,
      'sl-dropdown': SlDropdown,
    };
  }
}
