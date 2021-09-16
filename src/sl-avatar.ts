import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { SlAvatar as BaseElement, SlIcon } from '@shoelace-style/shoelace';
import styles from '@shoelace-style/shoelace/dist/themes/light.styles';

export class SlAvatar extends ScopedElementsMixin(BaseElement) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
    };
  }

  static get styles() {
    return [styles];
  }
}
