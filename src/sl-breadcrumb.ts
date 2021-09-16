import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import {
  SlBreadcrumb as OldSlBreadcrumb,
  SlIcon,
} from '@shoelace-style/shoelace';

export class SlBreadcrumb extends ScopedElementsMixin(OldSlBreadcrumb) {
  static get scopedElements() {
    return {
      'sl-icon': SlIcon,
    };
  }
}
