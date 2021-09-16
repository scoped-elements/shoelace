import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import {
  SlSelect as BaseElement,
  SlIcon,
  SlMenu,
  SlDropdown,
} from '@shoelace-style/shoelace';
import { SlIconButton } from './sl-icon-button';
import { SlTag } from './sl-tag';

export class SlSelect extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
      'sl-icon-button': SlIconButton,
      'sl-menu': SlMenu,
      'sl-tag': SlTag,
      'sl-dropdown': SlDropdown,
    };
  }
}
