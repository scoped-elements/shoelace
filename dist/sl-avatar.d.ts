import { SlAvatar as BaseElement, SlIcon } from '@shoelace-style/shoelace';
declare const SlAvatar_base: typeof BaseElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
export declare class SlAvatar extends SlAvatar_base {
    static get scopedElements(): {
        'sl-icon': typeof SlIcon;
    };
    static get styles(): import("lit").CSSResultGroup[];
}
export {};
