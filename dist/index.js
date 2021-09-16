import { SlIconButton as SlIconButton$1, SlIcon, SlTab as SlTab$1, SlTabGroup as SlTabGroup$1, SlTag as SlTag$1, SlSelect as SlSelect$1, SlMenu, SlDropdown, SlRating as SlRating$1, SlMenuItem as SlMenuItem$1, SlImageComparer as SlImageComparer$1, SlDrawer as SlDrawer$1, SlDialog as SlDialog$1, SlBreadcrumb as SlBreadcrumb$1, SlDetails as SlDetails$1, SlAlert as SlAlert$1, SlAvatar as SlAvatar$1, SlButton as SlButton$1, SlSpinner, SlInput as SlInput$1, SlColorPicker as SlColorPicker$1 } from '@shoelace-style/shoelace';
export { SlAnimation, SlBadge, SlBreadcrumbItem, SlButtonGroup, SlCard, SlCheckbox, SlDropdown, SlForm, SlFormatBytes, SlFormatDate, SlFormatNumber, SlIcon, SlInclude, SlMenu, SlMenuDivider, SlMenuLabel, SlProgressBar, SlProgressRing, SlQrCode, SlRadio, SlRadioGroup, SlRange, SlRelativeTime, SlResizeObserver, SlResponsiveMedia, SlSkeleton, SlSpinner, SlSwitch, SlTabPanel, SlTextarea, SlTooltip } from '@shoelace-style/shoelace';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

class SlIconButton extends ScopedElementsMixin(SlIconButton$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
        };
    }
}

class SlTab extends ScopedElementsMixin(SlTab$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
            'sl-icon-button': SlIconButton,
        };
    }
}

class SlTabGroup extends ScopedElementsMixin(SlTabGroup$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
            'sl-icon-button': SlIconButton,
        };
    }
}

class SlTag extends ScopedElementsMixin(SlTag$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
            'sl-icon-button': SlIconButton$1,
        };
    }
}

class SlSelect extends ScopedElementsMixin(SlSelect$1) {
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

class SlRating extends ScopedElementsMixin(SlRating$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
        };
    }
}

class SlMenuItem extends ScopedElementsMixin(SlMenuItem$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
        };
    }
}

class SlImageComparer extends ScopedElementsMixin(SlImageComparer$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
        };
    }
}

class SlDrawer extends ScopedElementsMixin(SlDrawer$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
            'sl-icon-button': SlIconButton,
        };
    }
}

class SlDialog extends ScopedElementsMixin(SlDialog$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
            'sl-icon-button': SlIconButton,
        };
    }
}

class SlBreadcrumb extends ScopedElementsMixin(SlBreadcrumb$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
        };
    }
}

class SlDetails extends ScopedElementsMixin(SlDetails$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
        };
    }
}

class SlAlert extends ScopedElementsMixin(SlAlert$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
            'sl-icon-button': SlIconButton,
        };
    }
}

// node_modules/@lit/reactive-element/css-tag.js
var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e = Symbol();
var s = class {
  constructor(t3, s5) {
    if (s5 !== e)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3;
  }
  get styleSheet() {
    return t && this.t === void 0 && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
  }
  toString() {
    return this.cssText;
  }
};
var n = new Map();
var o = (t3) => {
  let o5 = n.get(t3);
  return o5 === void 0 && n.set(t3, o5 = new s(t3, e)), o5;
};
var r = (t3) => o(typeof t3 == "string" ? t3 : t3 + "");
var i = (t3, ...e4) => {
  const n5 = t3.length === 1 ? t3[0] : e4.reduce((e5, n6, o5) => e5 + ((t4) => {
    if (t4 instanceof s)
      return t4.cssText;
    if (typeof t4 == "number")
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n6) + t3[o5 + 1], t3[0]);
  return o(n5);
};
var S = (e4, s5) => {
  t ? e4.adoptedStyleSheets = s5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : s5.forEach((t3) => {
    const s6 = document.createElement("style");
    s6.textContent = t3.cssText, e4.appendChild(s6);
  });
};
var u = t ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const s5 of t4.cssRules)
    e4 += s5.cssText;
  return r(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2;
var h;
var r2;
var o2 = { toAttribute(t3, i4) {
  switch (i4) {
    case Boolean:
      t3 = t3 ? "" : null;
      break;
    case Object:
    case Array:
      t3 = t3 == null ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i4) {
  let s5 = t3;
  switch (i4) {
    case Boolean:
      s5 = t3 !== null;
      break;
    case Number:
      s5 = t3 === null ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t3);
      } catch (t4) {
        s5 = null;
      }
  }
  return s5;
} };
var n2 = (t3, i4) => i4 !== t3 && (i4 == i4 || t3 == t3);
var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
var a = class extends HTMLElement {
  constructor() {
    super(), this.\u03A0i = new Map(), this.\u03A0o = void 0, this.\u03A0l = void 0, this.isUpdatePending = false, this.hasUpdated = false, this.\u03A0h = null, this.u();
  }
  static addInitializer(t3) {
    var i4;
    (i4 = this.v) !== null && i4 !== void 0 || (this.v = []), this.v.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i4, s5) => {
      const e4 = this.\u03A0p(s5, i4);
      e4 !== void 0 && (this.\u03A0m.set(e4, s5), t3.push(e4));
    }), t3;
  }
  static createProperty(t3, i4 = l) {
    if (i4.state && (i4.attribute = false), this.finalize(), this.elementProperties.set(t3, i4), !i4.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s5 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i4);
      e4 !== void 0 && Object.defineProperty(this.prototype, t3, e4);
    }
  }
  static getPropertyDescriptor(t3, i4, s5) {
    return { get() {
      return this[i4];
    }, set(e4) {
      const h4 = this[t3];
      this[i4] = e4, this.requestUpdate(t3, h4, s5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this.\u03A0m = new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i4 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s5 of i4)
        this.createProperty(s5, t4[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i4) {
    const s5 = [];
    if (Array.isArray(i4)) {
      const e4 = new Set(i4.flat(1 / 0).reverse());
      for (const i5 of e4)
        s5.unshift(u(i5));
    } else
      i4 !== void 0 && s5.push(u(i4));
    return s5;
  }
  static \u03A0p(t3, i4) {
    const s5 = i4.attribute;
    return s5 === false ? void 0 : typeof s5 == "string" ? s5 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
  }
  u() {
    var t3;
    this.\u03A0g = new Promise((t4) => this.enableUpdating = t4), this.L = new Map(), this.\u03A0_(), this.requestUpdate(), (t3 = this.constructor.v) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i4, s5;
    ((i4 = this.\u03A0U) !== null && i4 !== void 0 ? i4 : this.\u03A0U = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s5 = t3.hostConnected) === null || s5 === void 0 || s5.call(t3));
  }
  removeController(t3) {
    var i4;
    (i4 = this.\u03A0U) === null || i4 === void 0 || i4.splice(this.\u03A0U.indexOf(t3) >>> 0, 1);
  }
  \u03A0_() {
    this.constructor.elementProperties.forEach((t3, i4) => {
      this.hasOwnProperty(i4) && (this.\u03A0i.set(i4, this[i4]), delete this[i4]);
    });
  }
  createRenderRoot() {
    var t3;
    const s5 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t3;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((t4) => {
      var i4;
      return (i4 = t4.hostConnected) === null || i4 === void 0 ? void 0 : i4.call(t4);
    }), this.\u03A0l && (this.\u03A0l(), this.\u03A0o = this.\u03A0l = void 0);
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((t4) => {
      var i4;
      return (i4 = t4.hostDisconnected) === null || i4 === void 0 ? void 0 : i4.call(t4);
    }), this.\u03A0o = new Promise((t4) => this.\u03A0l = t4);
  }
  attributeChangedCallback(t3, i4, s5) {
    this.K(t3, s5);
  }
  \u03A0j(t3, i4, s5 = l) {
    var e4, h4;
    const r4 = this.constructor.\u03A0p(t3, s5);
    if (r4 !== void 0 && s5.reflect === true) {
      const n5 = ((h4 = (e4 = s5.converter) === null || e4 === void 0 ? void 0 : e4.toAttribute) !== null && h4 !== void 0 ? h4 : o2.toAttribute)(i4, s5.type);
      this.\u03A0h = t3, n5 == null ? this.removeAttribute(r4) : this.setAttribute(r4, n5), this.\u03A0h = null;
    }
  }
  K(t3, i4) {
    var s5, e4, h4;
    const r4 = this.constructor, n5 = r4.\u03A0m.get(t3);
    if (n5 !== void 0 && this.\u03A0h !== n5) {
      const t4 = r4.getPropertyOptions(n5), l4 = t4.converter, a4 = (h4 = (e4 = (s5 = l4) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== null && e4 !== void 0 ? e4 : typeof l4 == "function" ? l4 : null) !== null && h4 !== void 0 ? h4 : o2.fromAttribute;
      this.\u03A0h = n5, this[n5] = a4(i4, t4.type), this.\u03A0h = null;
    }
  }
  requestUpdate(t3, i4, s5) {
    let e4 = true;
    t3 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || n2)(this[t3], i4) ? (this.L.has(t3) || this.L.set(t3, i4), s5.reflect === true && this.\u03A0h !== t3 && (this.\u03A0k === void 0 && (this.\u03A0k = new Map()), this.\u03A0k.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this.\u03A0g = this.\u03A0q());
  }
  async \u03A0q() {
    this.isUpdatePending = true;
    try {
      for (await this.\u03A0g; this.\u03A0o; )
        await this.\u03A0o;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.performUpdate();
    return t3 != null && await t3, !this.isUpdatePending;
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this.\u03A0i && (this.\u03A0i.forEach((t4, i5) => this[i5] = t4), this.\u03A0i = void 0);
    let i4 = false;
    const s5 = this.L;
    try {
      i4 = this.shouldUpdate(s5), i4 ? (this.willUpdate(s5), (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((t4) => {
        var i5;
        return (i5 = t4.hostUpdate) === null || i5 === void 0 ? void 0 : i5.call(t4);
      }), this.update(s5)) : this.\u03A0$();
    } catch (t4) {
      throw i4 = false, this.\u03A0$(), t4;
    }
    i4 && this.E(s5);
  }
  willUpdate(t3) {
  }
  E(t3) {
    var i4;
    (i4 = this.\u03A0U) === null || i4 === void 0 || i4.forEach((t4) => {
      var i5;
      return (i5 = t4.hostUpdated) === null || i5 === void 0 ? void 0 : i5.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  \u03A0$() {
    this.L = new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this.\u03A0g;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this.\u03A0k !== void 0 && (this.\u03A0k.forEach((t4, i4) => this.\u03A0j(i4, this[i4], t4)), this.\u03A0k = void 0), this.\u03A0$();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
a.finalized = true, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, (e2 = (s2 = globalThis).reactiveElementPlatformSupport) === null || e2 === void 0 || e2.call(s2, { ReactiveElement: a }), ((h = (r2 = globalThis).reactiveElementVersions) !== null && h !== void 0 ? h : r2.reactiveElementVersions = []).push("1.0.0-rc.2");

// node_modules/lit-html/lit-html.js
var t2;
var i2;
var s3;
var e3;
var o3 = globalThis.trustedTypes;
var n3 = o3 ? o3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var l2 = `lit$${(Math.random() + "").slice(9)}$`;
var h2 = "?" + l2;
var r3 = `<${h2}>`;
var u2 = document;
var c = (t3 = "") => u2.createComment(t3);
var d = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
var v = Array.isArray;
var a2 = (t3) => {
  var i4;
  return v(t3) || typeof ((i4 = t3) === null || i4 === void 0 ? void 0 : i4[Symbol.iterator]) == "function";
};
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var $ = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var g = /'/g;
var p = /"/g;
var y = /^(?:script|style|textarea)$/i;
var w = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var C = new WeakMap();
var P = (t3, i4, s5) => {
  var e4, o5;
  const n5 = (e4 = s5 == null ? void 0 : s5.renderBefore) !== null && e4 !== void 0 ? e4 : i4;
  let l4 = n5._$litPart$;
  if (l4 === void 0) {
    const t4 = (o5 = s5 == null ? void 0 : s5.renderBefore) !== null && o5 !== void 0 ? o5 : null;
    n5._$litPart$ = l4 = new k(i4.insertBefore(c(), t4), t4, void 0, s5 != null ? s5 : {});
  }
  return l4._$AI(t3), l4;
};
var V = u2.createTreeWalker(u2, 129, null, false);
var E = (t3, i4) => {
  const s5 = t3.length - 1, e4 = [];
  let o5, h4 = i4 === 2 ? "<svg>" : "", u3 = f;
  for (let i5 = 0; i5 < s5; i5++) {
    const s6 = t3[i5];
    let n5, c3, d2 = -1, v2 = 0;
    for (; v2 < s6.length && (u3.lastIndex = v2, c3 = u3.exec(s6), c3 !== null); )
      v2 = u3.lastIndex, u3 === f ? c3[1] === "!--" ? u3 = _ : c3[1] !== void 0 ? u3 = m : c3[2] !== void 0 ? (y.test(c3[2]) && (o5 = RegExp("</" + c3[2], "g")), u3 = $) : c3[3] !== void 0 && (u3 = $) : u3 === $ ? c3[0] === ">" ? (u3 = o5 != null ? o5 : f, d2 = -1) : c3[1] === void 0 ? d2 = -2 : (d2 = u3.lastIndex - c3[2].length, n5 = c3[1], u3 = c3[3] === void 0 ? $ : c3[3] === '"' ? p : g) : u3 === p || u3 === g ? u3 = $ : u3 === _ || u3 === m ? u3 = f : (u3 = $, o5 = void 0);
    const a4 = u3 === $ && t3[i5 + 1].startsWith("/>") ? " " : "";
    h4 += u3 === f ? s6 + r3 : d2 >= 0 ? (e4.push(n5), s6.slice(0, d2) + "$lit$" + s6.slice(d2) + l2 + a4) : s6 + l2 + (d2 === -2 ? (e4.push(void 0), i5) : a4);
  }
  const c2 = h4 + (t3[s5] || "<?>") + (i4 === 2 ? "</svg>" : "");
  return [n3 !== void 0 ? n3.createHTML(c2) : c2, e4];
};
var M = class {
  constructor({ strings: t3, _$litType$: i4 }, s5) {
    let e4;
    this.parts = [];
    let n5 = 0, r4 = 0;
    const u3 = t3.length - 1, d2 = this.parts, [v2, a4] = E(t3, i4);
    if (this.el = M.createElement(v2, s5), V.currentNode = this.el.content, i4 === 2) {
      const t4 = this.el.content, i5 = t4.firstChild;
      i5.remove(), t4.append(...i5.childNodes);
    }
    for (; (e4 = V.nextNode()) !== null && d2.length < u3; ) {
      if (e4.nodeType === 1) {
        if (e4.hasAttributes()) {
          const t4 = [];
          for (const i5 of e4.getAttributeNames())
            if (i5.endsWith("$lit$") || i5.startsWith(l2)) {
              const s6 = a4[r4++];
              if (t4.push(i5), s6 !== void 0) {
                const t5 = e4.getAttribute(s6.toLowerCase() + "$lit$").split(l2), i6 = /([.?@])?(.*)/.exec(s6);
                d2.push({ type: 1, index: n5, name: i6[2], strings: t5, ctor: i6[1] === "." ? I : i6[1] === "?" ? L : i6[1] === "@" ? R : H });
              } else
                d2.push({ type: 6, index: n5 });
            }
          for (const i5 of t4)
            e4.removeAttribute(i5);
        }
        if (y.test(e4.tagName)) {
          const t4 = e4.textContent.split(l2), i5 = t4.length - 1;
          if (i5 > 0) {
            e4.textContent = o3 ? o3.emptyScript : "";
            for (let s6 = 0; s6 < i5; s6++)
              e4.append(t4[s6], c()), V.nextNode(), d2.push({ type: 2, index: ++n5 });
            e4.append(t4[i5], c());
          }
        }
      } else if (e4.nodeType === 8)
        if (e4.data === h2)
          d2.push({ type: 2, index: n5 });
        else {
          let t4 = -1;
          for (; (t4 = e4.data.indexOf(l2, t4 + 1)) !== -1; )
            d2.push({ type: 7, index: n5 }), t4 += l2.length - 1;
        }
      n5++;
    }
  }
  static createElement(t3, i4) {
    const s5 = u2.createElement("template");
    return s5.innerHTML = t3, s5;
  }
};
function N(t3, i4, s5 = t3, e4) {
  var o5, n5, l4, h4;
  if (i4 === w)
    return i4;
  let r4 = e4 !== void 0 ? (o5 = s5._$Cl) === null || o5 === void 0 ? void 0 : o5[e4] : s5._$Cu;
  const u3 = d(i4) ? void 0 : i4._$litDirective$;
  return (r4 == null ? void 0 : r4.constructor) !== u3 && ((n5 = r4 == null ? void 0 : r4._$AO) === null || n5 === void 0 || n5.call(r4, false), u3 === void 0 ? r4 = void 0 : (r4 = new u3(t3), r4._$AT(t3, s5, e4)), e4 !== void 0 ? ((l4 = (h4 = s5)._$Cl) !== null && l4 !== void 0 ? l4 : h4._$Cl = [])[e4] = r4 : s5._$Cu = r4), r4 !== void 0 && (i4 = N(t3, r4._$AS(t3, i4.values), r4, e4)), i4;
}
var S2 = class {
  constructor(t3, i4) {
    this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t3) {
    var i4;
    const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = ((i4 = t3 == null ? void 0 : t3.creationScope) !== null && i4 !== void 0 ? i4 : u2).importNode(s5, true);
    V.currentNode = o5;
    let n5 = V.nextNode(), l4 = 0, h4 = 0, r4 = e4[0];
    for (; r4 !== void 0; ) {
      if (l4 === r4.index) {
        let i5;
        r4.type === 2 ? i5 = new k(n5, n5.nextSibling, this, t3) : r4.type === 1 ? i5 = new r4.ctor(n5, r4.name, r4.strings, this, t3) : r4.type === 6 && (i5 = new z(n5, this, t3)), this.v.push(i5), r4 = e4[++h4];
      }
      l4 !== (r4 == null ? void 0 : r4.index) && (n5 = V.nextNode(), l4++);
    }
    return o5;
  }
  m(t3) {
    let i4 = 0;
    for (const s5 of this.v)
      s5 !== void 0 && (s5.strings !== void 0 ? (s5._$AI(t3, s5, i4), i4 += s5.strings.length - 2) : s5._$AI(t3[i4])), i4++;
  }
};
var k = class {
  constructor(t3, i4, s5, e4) {
    this.type = 2, this._$C_ = true, this._$AN = void 0, this._$AA = t3, this._$AB = i4, this._$AM = s5, this.options = e4;
  }
  get _$AU() {
    var t3, i4;
    return (i4 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i4 !== void 0 ? i4 : this._$C_;
  }
  get parentNode() {
    return this._$AA.parentNode;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i4 = this) {
    t3 = N(this, t3, i4), d(t3) ? t3 === A || t3 == null || t3 === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== w && this.$(t3) : t3._$litType$ !== void 0 ? this.T(t3) : t3.nodeType !== void 0 ? this.A(t3) : a2(t3) ? this.M(t3) : this.$(t3);
  }
  C(t3, i4 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i4);
  }
  A(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.C(t3));
  }
  $(t3) {
    const i4 = this._$AA.nextSibling;
    i4 !== null && i4.nodeType === 3 && (this._$AB === null ? i4.nextSibling === null : i4 === this._$AB.previousSibling) ? i4.data = t3 : this.A(u2.createTextNode(t3)), this._$AH = t3;
  }
  T(t3) {
    var i4;
    const { values: s5, _$litType$: e4 } = t3, o5 = typeof e4 == "number" ? this._$AC(t3) : (e4.el === void 0 && (e4.el = M.createElement(e4.h, this.options)), e4);
    if (((i4 = this._$AH) === null || i4 === void 0 ? void 0 : i4._$AD) === o5)
      this._$AH.m(s5);
    else {
      const t4 = new S2(o5, this), i5 = t4.p(this.options);
      t4.m(s5), this.A(i5), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i4 = C.get(t3.strings);
    return i4 === void 0 && C.set(t3.strings, i4 = new M(t3)), i4;
  }
  M(t3) {
    v(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s5, e4 = 0;
    for (const o5 of t3)
      e4 === i4.length ? i4.push(s5 = new k(this.C(c()), this.C(c()), this, this.options)) : s5 = i4[e4], s5._$AI(o5), e4++;
    e4 < i4.length && (this._$AR(s5 && s5._$AB.nextSibling, e4), i4.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i4) {
    var s5;
    for ((s5 = this._$AP) === null || s5 === void 0 || s5.call(this, false, true, i4); t3 && t3 !== this._$AB; ) {
      const i5 = t3.nextSibling;
      t3.remove(), t3 = i5;
    }
  }
  setConnected(t3) {
    var i4;
    this._$AM === void 0 && (this._$C_ = t3, (i4 = this._$AP) === null || i4 === void 0 || i4.call(this, t3));
  }
};
var H = class {
  constructor(t3, i4, s5, e4, o5) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i4, this._$AM = e4, this.options = o5, s5.length > 2 || s5[0] !== "" || s5[1] !== "" ? (this._$AH = Array(s5.length - 1).fill(A), this.strings = s5) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i4 = this, s5, e4) {
    const o5 = this.strings;
    let n5 = false;
    if (o5 === void 0)
      t3 = N(this, t3, i4, 0), n5 = !d(t3) || t3 !== this._$AH && t3 !== w, n5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l4, h4;
      for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
        h4 = N(this, e5[s5 + l4], i4, l4), h4 === w && (h4 = this._$AH[l4]), n5 || (n5 = !d(h4) || h4 !== this._$AH[l4]), h4 === A ? t3 = A : t3 !== A && (t3 += (h4 != null ? h4 : "") + o5[l4 + 1]), this._$AH[l4] = h4;
    }
    n5 && !e4 && this.P(t3);
  }
  P(t3) {
    t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t3) {
    this.element[this.name] = t3 === A ? void 0 : t3;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t3) {
    t3 && t3 !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }
};
var R = class extends H {
  constructor() {
    super(...arguments), this.type = 5;
  }
  _$AI(t3, i4 = this) {
    var s5;
    if ((t3 = (s5 = N(this, t3, i4, 0)) !== null && s5 !== void 0 ? s5 : A) === w)
      return;
    const e4 = this._$AH, o5 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== A && (e4 === A || o5);
    o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i4, s5;
    typeof this._$AH == "function" ? this._$AH.call((s5 = (i4 = this.options) === null || i4 === void 0 ? void 0 : i4.host) !== null && s5 !== void 0 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var z = class {
  constructor(t3, i4, s5) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    N(this, t3);
  }
};
(i2 = (t2 = globalThis).litHtmlPlatformSupport) === null || i2 === void 0 || i2.call(t2, M, k), ((s3 = (e3 = globalThis).litHtmlVersions) !== null && s3 !== void 0 ? s3 : e3.litHtmlVersions = []).push("2.0.0-rc.4");

// node_modules/lit-element/lit-element.js
var i3;
var l3;
var o4;
var s4;
var n4;
var a3;
((i3 = (a3 = globalThis).litElementVersions) !== null && i3 !== void 0 ? i3 : a3.litElementVersions = []).push("3.0.0-rc.2");
var h3 = class extends a {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.\u03A6t = void 0;
  }
  createRenderRoot() {
    var t3, e4;
    const r4 = super.createRenderRoot();
    return (t3 = (e4 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e4.renderBefore = r4.firstChild), r4;
  }
  update(t3) {
    const r4 = this.render();
    super.update(t3), this.\u03A6t = P(r4, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this.\u03A6t) === null || t3 === void 0 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this.\u03A6t) === null || t3 === void 0 || t3.setConnected(false);
  }
  render() {
    return w;
  }
};
h3.finalized = true, h3._$litElement$ = true, (o4 = (l3 = globalThis).litElementHydrateSupport) === null || o4 === void 0 || o4.call(l3, { LitElement: h3 }), (n4 = (s4 = globalThis).litElementPlatformSupport) === null || n4 === void 0 || n4.call(s4, { LitElement: h3 });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/themes/light.styles.ts
var light_styles_default = i`
  :root,
  :host,
  .sl-theme-light {
    /*
     * Color Primitives
     */

    /* Blue Gray */
    --sl-color-blue-gray-50: 248 250 252;
    --sl-color-blue-gray-100: 241 245 249;
    --sl-color-blue-gray-200: 226 232 240;
    --sl-color-blue-gray-300: 203 213 225;
    --sl-color-blue-gray-400: 148 163 184;
    --sl-color-blue-gray-500: 100 116 139;
    --sl-color-blue-gray-600: 71 85 105;
    --sl-color-blue-gray-700: 51 65 85;
    --sl-color-blue-gray-800: 30 41 59;
    --sl-color-blue-gray-900: 15 23 42;
    --sl-color-blue-gray-950: 10 16 30;

    /* Cool Gray */
    --sl-color-cool-gray-50: 249 250 251;
    --sl-color-cool-gray-100: 243 244 246;
    --sl-color-cool-gray-200: 229 231 235;
    --sl-color-cool-gray-300: 209 213 219;
    --sl-color-cool-gray-400: 156 163 175;
    --sl-color-cool-gray-500: 107 114 128;
    --sl-color-cool-gray-600: 75 85 99;
    --sl-color-cool-gray-700: 55 65 81;
    --sl-color-cool-gray-800: 31 41 55;
    --sl-color-cool-gray-900: 17 24 39;
    --sl-color-cool-gray-950: 12 17 29;

    /* Gray */
    --sl-color-gray-50: 250 250 250;
    --sl-color-gray-100: 244 244 245;
    --sl-color-gray-200: 228 228 231;
    --sl-color-gray-300: 212 212 216;
    --sl-color-gray-400: 161 161 170;
    --sl-color-gray-500: 113 113 122;
    --sl-color-gray-600: 82 82 91;
    --sl-color-gray-700: 63 63 70;
    --sl-color-gray-800: 39 39 42;
    --sl-color-gray-900: 24 24 27;
    --sl-color-gray-950: 19 19 22;

    /* True Gray */
    --sl-color-true-gray-50: 250 250 250;
    --sl-color-true-gray-100: 245 245 245;
    --sl-color-true-gray-200: 229 229 229;
    --sl-color-true-gray-300: 212 212 212;
    --sl-color-true-gray-400: 163 163 163;
    --sl-color-true-gray-500: 115 115 115;
    --sl-color-true-gray-600: 82 82 82;
    --sl-color-true-gray-700: 64 64 64;
    --sl-color-true-gray-800: 38 38 38;
    --sl-color-true-gray-900: 23 23 23;
    --sl-color-true-gray-950: 17 17 17;

    /* Warm Gray */
    --sl-color-warm-gray-50: 250 250 249;
    --sl-color-warm-gray-100: 245 245 244;
    --sl-color-warm-gray-200: 231 229 228;
    --sl-color-warm-gray-300: 214 211 209;
    --sl-color-warm-gray-400: 168 162 158;
    --sl-color-warm-gray-500: 120 113 108;
    --sl-color-warm-gray-600: 87 83 78;
    --sl-color-warm-gray-700: 68 64 60;
    --sl-color-warm-gray-800: 41 37 36;
    --sl-color-warm-gray-900: 28 25 23;
    --sl-color-warm-gray-950: 19 18 16;

    /* Red */
    --sl-color-red-50: 254 242 242;
    --sl-color-red-100: 254 226 226;
    --sl-color-red-200: 254 202 202;
    --sl-color-red-300: 252 165 165;
    --sl-color-red-400: 248 113 113;
    --sl-color-red-500: 239 68 68;
    --sl-color-red-600: 220 38 38;
    --sl-color-red-700: 185 28 28;
    --sl-color-red-800: 153 27 27;
    --sl-color-red-900: 127 29 29;
    --sl-color-red-950: 80 20 20;

    /* Orange */
    --sl-color-orange-50: 255 247 237;
    --sl-color-orange-100: 255 237 213;
    --sl-color-orange-200: 254 215 170;
    --sl-color-orange-300: 253 186 116;
    --sl-color-orange-400: 251 146 60;
    --sl-color-orange-500: 249 115 22;
    --sl-color-orange-600: 234 88 12;
    --sl-color-orange-700: 194 65 12;
    --sl-color-orange-800: 154 52 18;
    --sl-color-orange-900: 124 45 18;
    --sl-color-orange-950: 82 32 15;

    /* Amber */
    --sl-color-amber-50: 255 251 235;
    --sl-color-amber-100: 254 243 199;
    --sl-color-amber-200: 253 230 138;
    --sl-color-amber-300: 252 211 77;
    --sl-color-amber-400: 251 191 36;
    --sl-color-amber-500: 245 158 11;
    --sl-color-amber-600: 217 119 6;
    --sl-color-amber-700: 180 83 9;
    --sl-color-amber-800: 146 64 14;
    --sl-color-amber-900: 120 53 15;
    --sl-color-amber-950: 74 35 11;

    /* Yellow */
    --sl-color-yellow-50: 254 252 232;
    --sl-color-yellow-100: 254 249 195;
    --sl-color-yellow-200: 254 240 138;
    --sl-color-yellow-300: 253 224 71;
    --sl-color-yellow-400: 250 204 21;
    --sl-color-yellow-500: 234 179 8;
    --sl-color-yellow-600: 202 138 4;
    --sl-color-yellow-700: 161 98 7;
    --sl-color-yellow-800: 133 77 14;
    --sl-color-yellow-900: 113 63 18;
    --sl-color-yellow-950: 60 38 11;

    /* Lime */
    --sl-color-lime-50: 247 254 231;
    --sl-color-lime-100: 236 252 203;
    --sl-color-lime-200: 217 249 157;
    --sl-color-lime-300: 190 242 100;
    --sl-color-lime-400: 163 230 53;
    --sl-color-lime-500: 132 204 22;
    --sl-color-lime-600: 101 163 13;
    --sl-color-lime-700: 77 124 15;
    --sl-color-lime-800: 63 98 18;
    --sl-color-lime-900: 54 83 20;
    --sl-color-lime-950: 38 57 14;

    /* Green */
    --sl-color-green-50: 240 253 244;
    --sl-color-green-100: 220 252 231;
    --sl-color-green-200: 187 247 208;
    --sl-color-green-300: 134 239 172;
    --sl-color-green-400: 74 222 128;
    --sl-color-green-500: 34 197 94;
    --sl-color-green-600: 22 163 74;
    --sl-color-green-700: 21 128 61;
    --sl-color-green-800: 22 101 52;
    --sl-color-green-900: 20 83 45;
    --sl-color-green-950: 12 49 27;

    /* Emerald */
    --sl-color-emerald-50: 236 253 245;
    --sl-color-emerald-100: 209 250 229;
    --sl-color-emerald-200: 167 243 208;
    --sl-color-emerald-300: 110 231 183;
    --sl-color-emerald-400: 52 211 153;
    --sl-color-emerald-500: 16 185 129;
    --sl-color-emerald-600: 5 150 105;
    --sl-color-emerald-700: 4 120 87;
    --sl-color-emerald-800: 6 95 70;
    --sl-color-emerald-900: 6 78 59;
    --sl-color-emerald-950: 3 45 34;

    /* Teal */
    --sl-color-teal-50: 240 253 250;
    --sl-color-teal-100: 204 251 241;
    --sl-color-teal-200: 153 246 228;
    --sl-color-teal-300: 94 234 212;
    --sl-color-teal-400: 45 212 191;
    --sl-color-teal-500: 20 184 166;
    --sl-color-teal-600: 13 148 136;
    --sl-color-teal-700: 15 118 110;
    --sl-color-teal-800: 17 94 89;
    --sl-color-teal-900: 19 78 74;
    --sl-color-teal-950: 12 46 44;

    /* Cyan */
    --sl-color-cyan-50: 236 254 255;
    --sl-color-cyan-100: 207 250 254;
    --sl-color-cyan-200: 165 243 252;
    --sl-color-cyan-300: 103 232 249;
    --sl-color-cyan-400: 34 211 238;
    --sl-color-cyan-500: 6 182 212;
    --sl-color-cyan-600: 8 145 178;
    --sl-color-cyan-700: 14 116 144;
    --sl-color-cyan-800: 21 94 117;
    --sl-color-cyan-900: 22 78 99;
    --sl-color-cyan-950: 16 52 66;

    /* Sky */
    --sl-color-sky-50: 240 249 255;
    --sl-color-sky-100: 224 242 254;
    --sl-color-sky-200: 186 230 253;
    --sl-color-sky-300: 125 211 252;
    --sl-color-sky-400: 56 189 248;
    --sl-color-sky-500: 14 165 233;
    --sl-color-sky-600: 2 132 199;
    --sl-color-sky-700: 3 105 161;
    --sl-color-sky-800: 7 89 133;
    --sl-color-sky-900: 12 74 110;
    --sl-color-sky-950: 11 50 73;

    /* Blue */
    --sl-color-blue-50: 239 246 255;
    --sl-color-blue-100: 219 234 254;
    --sl-color-blue-200: 191 219 254;
    --sl-color-blue-300: 147 197 253;
    --sl-color-blue-400: 96 165 250;
    --sl-color-blue-500: 59 130 246;
    --sl-color-blue-600: 37 99 235;
    --sl-color-blue-700: 29 78 216;
    --sl-color-blue-800: 30 64 175;
    --sl-color-blue-900: 30 58 138;
    --sl-color-blue-950: 21 33 73;

    /* Indigo */
    --sl-color-indigo-50: 238 242 255;
    --sl-color-indigo-100: 224 231 255;
    --sl-color-indigo-200: 199 210 254;
    --sl-color-indigo-300: 165 180 252;
    --sl-color-indigo-400: 129 140 248;
    --sl-color-indigo-500: 99 102 241;
    --sl-color-indigo-600: 79 70 229;
    --sl-color-indigo-700: 67 56 202;
    --sl-color-indigo-800: 55 48 163;
    --sl-color-indigo-900: 49 46 129;
    --sl-color-indigo-950: 36 33 84;

    /* Violet */
    --sl-color-violet-50: 245 243 255;
    --sl-color-violet-100: 237 233 254;
    --sl-color-violet-200: 221 214 254;
    --sl-color-violet-300: 196 181 253;
    --sl-color-violet-400: 167 139 250;
    --sl-color-violet-500: 139 92 246;
    --sl-color-violet-600: 124 58 237;
    --sl-color-violet-700: 109 40 217;
    --sl-color-violet-800: 91 33 182;
    --sl-color-violet-900: 76 29 149;
    --sl-color-violet-950: 49 21 88;

    /* Purple */
    --sl-color-purple-50: 250 245 255;
    --sl-color-purple-100: 243 232 255;
    --sl-color-purple-200: 233 213 255;
    --sl-color-purple-300: 216 180 254;
    --sl-color-purple-400: 192 132 252;
    --sl-color-purple-500: 168 85 247;
    --sl-color-purple-600: 147 51 234;
    --sl-color-purple-700: 126 34 206;
    --sl-color-purple-800: 107 33 168;
    --sl-color-purple-900: 88 28 135;
    --sl-color-purple-950: 47 17 67;

    /* Fuchsia */
    --sl-color-fuchsia-50: 253 244 255;
    --sl-color-fuchsia-100: 250 232 255;
    --sl-color-fuchsia-200: 245 208 254;
    --sl-color-fuchsia-300: 240 171 252;
    --sl-color-fuchsia-400: 232 121 249;
    --sl-color-fuchsia-500: 217 70 239;
    --sl-color-fuchsia-600: 192 38 211;
    --sl-color-fuchsia-700: 162 28 175;
    --sl-color-fuchsia-800: 134 25 143;
    --sl-color-fuchsia-900: 112 26 117;
    --sl-color-fuchsia-950: 56 16 58;

    /* Pink */
    --sl-color-pink-50: 253 242 248;
    --sl-color-pink-100: 252 231 243;
    --sl-color-pink-200: 251 207 232;
    --sl-color-pink-300: 249 168 212;
    --sl-color-pink-400: 244 114 182;
    --sl-color-pink-500: 236 72 153;
    --sl-color-pink-600: 219 39 119;
    --sl-color-pink-700: 190 24 93;
    --sl-color-pink-800: 157 23 77;
    --sl-color-pink-900: 131 24 67;
    --sl-color-pink-950: 67 14 35;

    /* Rose */
    --sl-color-rose-50: 255 241 242;
    --sl-color-rose-100: 255 228 230;
    --sl-color-rose-200: 254 205 211;
    --sl-color-rose-300: 253 164 175;
    --sl-color-rose-400: 251 113 133;
    --sl-color-rose-500: 244 63 94;
    --sl-color-rose-600: 225 29 72;
    --sl-color-rose-700: 190 18 60;
    --sl-color-rose-800: 159 18 57;
    --sl-color-rose-900: 136 19 55;
    --sl-color-rose-950: 74 13 32;

    /*
     * Theme Tokens
     */

    /* Primary */
    --sl-color-primary-50: var(--sl-color-sky-50);
    --sl-color-primary-100: var(--sl-color-sky-100);
    --sl-color-primary-200: var(--sl-color-sky-200);
    --sl-color-primary-300: var(--sl-color-sky-300);
    --sl-color-primary-400: var(--sl-color-sky-400);
    --sl-color-primary-500: var(--sl-color-sky-500);
    --sl-color-primary-600: var(--sl-color-sky-600);
    --sl-color-primary-700: var(--sl-color-sky-700);
    --sl-color-primary-800: var(--sl-color-sky-800);
    --sl-color-primary-900: var(--sl-color-sky-900);
    --sl-color-primary-950: var(--sl-color-sky-950);

    /* Success */
    --sl-color-success-50: var(--sl-color-green-50);
    --sl-color-success-100: var(--sl-color-green-100);
    --sl-color-success-200: var(--sl-color-green-200);
    --sl-color-success-300: var(--sl-color-green-300);
    --sl-color-success-400: var(--sl-color-green-400);
    --sl-color-success-500: var(--sl-color-green-500);
    --sl-color-success-600: var(--sl-color-green-600);
    --sl-color-success-700: var(--sl-color-green-700);
    --sl-color-success-800: var(--sl-color-green-800);
    --sl-color-success-900: var(--sl-color-green-900);
    --sl-color-success-950: var(--sl-color-green-950);

    /* Warning */
    --sl-color-warning-50: var(--sl-color-amber-50);
    --sl-color-warning-100: var(--sl-color-amber-100);
    --sl-color-warning-200: var(--sl-color-amber-200);
    --sl-color-warning-300: var(--sl-color-amber-300);
    --sl-color-warning-400: var(--sl-color-amber-400);
    --sl-color-warning-500: var(--sl-color-amber-500);
    --sl-color-warning-600: var(--sl-color-amber-600);
    --sl-color-warning-700: var(--sl-color-amber-700);
    --sl-color-warning-800: var(--sl-color-amber-800);
    --sl-color-warning-900: var(--sl-color-amber-900);
    --sl-color-warning-950: var(--sl-color-amber-950);

    /* Danger */
    --sl-color-danger-50: var(--sl-color-red-50);
    --sl-color-danger-100: var(--sl-color-red-100);
    --sl-color-danger-200: var(--sl-color-red-200);
    --sl-color-danger-300: var(--sl-color-red-300);
    --sl-color-danger-400: var(--sl-color-red-400);
    --sl-color-danger-500: var(--sl-color-red-500);
    --sl-color-danger-600: var(--sl-color-red-600);
    --sl-color-danger-700: var(--sl-color-red-700);
    --sl-color-danger-800: var(--sl-color-red-800);
    --sl-color-danger-900: var(--sl-color-red-900);
    --sl-color-danger-950: var(--sl-color-red-950);

    /* Neutral */
    --sl-color-neutral-50: var(--sl-color-gray-50);
    --sl-color-neutral-100: var(--sl-color-gray-100);
    --sl-color-neutral-200: var(--sl-color-gray-200);
    --sl-color-neutral-300: var(--sl-color-gray-300);
    --sl-color-neutral-400: var(--sl-color-gray-400);
    --sl-color-neutral-500: var(--sl-color-gray-500);
    --sl-color-neutral-600: var(--sl-color-gray-600);
    --sl-color-neutral-700: var(--sl-color-gray-700);
    --sl-color-neutral-800: var(--sl-color-gray-800);
    --sl-color-neutral-900: var(--sl-color-gray-900);
    --sl-color-neutral-950: var(--sl-color-gray-950);

    /* Neutral one-offs */
    --sl-color-neutral-0: 255 255 255;
    --sl-color-neutral-1000: 0 0 0;

    /*
     * Border radius tokens
     */

    --sl-border-radius-small: 0.125rem; /* 2px */
    --sl-border-radius-medium: 0.25rem; /* 4px */
    --sl-border-radius-large: 0.5rem; /* 8px */
    --sl-border-radius-x-large: 1rem; /* 16px */

    --sl-border-radius-circle: 50%;
    --sl-border-radius-pill: 9999px;

    /*
     * Elevation tokens
     */

    --sl-shadow-x-small: 0 1px 2px rgb(var(--sl-color-neutral-500) / 6%);
    --sl-shadow-small: 0 1px 2px rgb(var(--sl-color-neutral-500) / 12%);
    --sl-shadow-medium: 0 2px 4px rgb(var(--sl-color-neutral-500) / 12%);
    --sl-shadow-large: 0 2px 8px rgb(var(--sl-color-neutral-500) / 12%);
    --sl-shadow-x-large: 0 4px 16px rgb(var(--sl-color-neutral-500) / 12%);

    /*
     * Spacing tokens
     */

    --sl-spacing-3x-small: 0.125rem; /* 2px */
    --sl-spacing-2x-small: 0.25rem; /* 4px */
    --sl-spacing-x-small: 0.5rem; /* 8px */
    --sl-spacing-small: 0.75rem; /* 12px */
    --sl-spacing-medium: 1rem; /* 16px */
    --sl-spacing-large: 1.25rem; /* 20px */
    --sl-spacing-x-large: 1.75rem; /* 28px */
    --sl-spacing-2x-large: 2.25rem; /* 36px */
    --sl-spacing-3x-large: 3rem; /* 48px */
    --sl-spacing-4x-large: 4.5rem; /* 72px */

    /*
     * Transition tokens
     */

    --sl-transition-x-slow: 1000ms;
    --sl-transition-slow: 500ms;
    --sl-transition-medium: 250ms;
    --sl-transition-fast: 150ms;
    --sl-transition-x-fast: 50ms;

    /*
     * Typography tokens
     */

    /* Fonts */
    --sl-font-mono: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
    --sl-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    --sl-font-serif: Georgia, 'Times New Roman', serif;

    /* Font sizes */
    --sl-font-size-2x-small: 0.625rem; /* 10px */
    --sl-font-size-x-small: 0.75rem; /* 12px */
    --sl-font-size-small: 0.875rem; /* 14px */
    --sl-font-size-medium: 1rem; /* 16px */
    --sl-font-size-large: 1.25rem; /* 20px */
    --sl-font-size-x-large: 1.5rem; /* 24px */
    --sl-font-size-2x-large: 2.25rem; /* 36px */
    --sl-font-size-3x-large: 3rem; /* 48px */
    --sl-font-size-4x-large: 4.5rem; /* 72px */

    /* Font weights */
    --sl-font-weight-light: 300;
    --sl-font-weight-normal: 400;
    --sl-font-weight-semibold: 500;
    --sl-font-weight-bold: 700;

    /* Letter spacings */
    --sl-letter-spacing-denser: -0.03em;
    --sl-letter-spacing-dense: -0.015em;
    --sl-letter-spacing-normal: normal;
    --sl-letter-spacing-loose: 0.075em;
    --sl-letter-spacing-looser: 0.15em;

    /* Line heights */
    --sl-line-height-denser: 1;
    --sl-line-height-dense: 1.4;
    --sl-line-height-normal: 1.8;
    --sl-line-height-loose: 2.2;
    --sl-line-height-looser: 2.6;

    /*
     * Form tokens
     */

    /* Focus ring */
    --sl-focus-ring-color: var(--sl-color-primary-500);
    --sl-focus-ring-width: 3px;
    --sl-focus-ring-alpha: 40%;
    --sl-focus-ring: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-focus-ring-color) / var(--sl-focus-ring-alpha));

    /* Buttons */
    --sl-button-font-size-small: var(--sl-font-size-x-small);
    --sl-button-font-size-medium: var(--sl-font-size-small);
    --sl-button-font-size-large: var(--sl-font-size-medium);

    /* Inputs */
    --sl-input-height-small: 1.875rem; /* 30px */
    --sl-input-height-medium: 2.5rem; /* 40px */
    --sl-input-height-large: 3.125rem; /* 50px */

    --sl-input-background-color: var(--sl-color-neutral-0);
    --sl-input-background-color-hover: var(--sl-color-neutral-0);
    --sl-input-background-color-focus: var(--sl-color-neutral-0);
    --sl-input-background-color-disabled: var(--sl-color-neutral-100);
    --sl-input-border-color: var(--sl-color-neutral-300);
    --sl-input-border-color-hover: var(--sl-color-neutral-400);
    --sl-input-border-color-focus: var(--sl-color-primary-500);
    --sl-input-border-color-disabled: var(--sl-color-neutral-300);
    --sl-input-border-width: 1px;

    --sl-input-border-radius-small: var(--sl-border-radius-medium);
    --sl-input-border-radius-medium: var(--sl-border-radius-medium);
    --sl-input-border-radius-large: var(--sl-border-radius-medium);

    --sl-input-font-family: var(--sl-font-sans);
    --sl-input-font-weight: var(--sl-font-weight-normal);
    --sl-input-font-size-small: var(--sl-font-size-small);
    --sl-input-font-size-medium: var(--sl-font-size-medium);
    --sl-input-font-size-large: var(--sl-font-size-large);
    --sl-input-letter-spacing: var(--sl-letter-spacing-normal);

    --sl-input-color: var(--sl-color-neutral-700);
    --sl-input-color-hover: var(--sl-color-neutral-700);
    --sl-input-color-focus: var(--sl-color-neutral-700);
    --sl-input-color-disabled: var(--sl-color-neutral-900);
    --sl-input-icon-color: var(--sl-color-neutral-500);
    --sl-input-icon-color-hover: var(--sl-color-neutral-600);
    --sl-input-icon-color-focus: var(--sl-color-neutral-600);
    --sl-input-placeholder-color: var(--sl-color-neutral-500);
    --sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);
    --sl-input-spacing-small: var(--sl-spacing-small);
    --sl-input-spacing-medium: var(--sl-spacing-medium);
    --sl-input-spacing-large: var(--sl-spacing-large);

    /* Labels */
    --sl-input-label-font-size-small: var(--sl-font-size-small);
    --sl-input-label-font-size-medium: var(--sl-font-size-medium);
    --sl-input-label-font-size-large: var(--sl-font-size-large);

    --sl-input-label-color: inherit;

    /* Help text */
    --sl-input-help-text-font-size-small: var(--sl-font-size-x-small);
    --sl-input-help-text-font-size-medium: var(--sl-font-size-small);
    --sl-input-help-text-font-size-large: var(--sl-font-size-medium);

    --sl-input-help-text-color: var(--sl-color-neutral-500);

    /* Toggle (checkboxes, radios, switches) */
    --sl-toggle-size: 1rem;

    /*
     * Overlay tokens
     */

    --sl-overlay-background-color: var(--sl-color-blue-gray-500);
    --sl-overlay-opacity: 33%;

    /*
     * Panels
     */

    --sl-panel-background-color: var(--sl-color-neutral-0);
    --sl-panel-border-color: var(--sl-color-neutral-200);

    /*
     * Tooltip tokens
     */

    --sl-tooltip-border-radius: var(--sl-border-radius-medium);
    --sl-tooltip-background-color: var(--sl-color-neutral-800);
    --sl-tooltip-color: var(--sl-color-neutral-0);
    --sl-tooltip-font-family: var(--sl-font-sans);
    --sl-tooltip-font-weight: var(--sl-font-weight-normal);
    --sl-tooltip-font-size: var(--sl-font-size-small);
    --sl-tooltip-line-height: var(--sl-line-height-dense);
    --sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);
    --sl-tooltip-arrow-size: 5px;
    --sl-tooltip-arrow-start-end-offset: 8px;

    /*
     * Z-index tokens
     */

    --sl-z-index-drawer: 700;
    --sl-z-index-dialog: 800;
    --sl-z-index-dropdown: 900;
    --sl-z-index-toast: 950;
    --sl-z-index-tooltip: 1000;
  }
`;

class SlAvatar extends ScopedElementsMixin(SlAvatar$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
        };
    }
    static get styles() {
        return [light_styles_default];
    }
}

class SlButton extends ScopedElementsMixin(SlButton$1) {
    static get scopedElements() {
        return {
            'sl-spinner': SlSpinner,
        };
    }
}

class SlInput extends ScopedElementsMixin(SlInput$1) {
    static get scopedElements() {
        return {
            'sl-icon': SlIcon,
        };
    }
}

class SlColorPicker extends ScopedElementsMixin(SlColorPicker$1) {
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

export { SlAlert, SlAvatar, SlBreadcrumb, SlButton, SlColorPicker, SlDetails, SlDialog, SlDrawer, SlIconButton, SlImageComparer, SlInput, SlMenuItem, SlRating, SlSelect, SlTab, SlTabGroup, SlTag };
//# sourceMappingURL=index.js.map
