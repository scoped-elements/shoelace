import { ScopedElementsMixin } from '@open-wc/scoped-elements';

// node_modules/lit-html/directive.js
var t$1 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e$2 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
var i$2 = class {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/@lit/reactive-element/css-tag.js
var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e$1 = Symbol();
var s$1 = class {
  constructor(t3, s5) {
    if (s5 !== e$1)
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
var n$1 = new Map();
var o$2 = (t3) => {
  let o5 = n$1.get(t3);
  return o5 === void 0 && n$1.set(t3, o5 = new s$1(t3, e$1)), o5;
};
var r$2 = (t3) => o$2(typeof t3 == "string" ? t3 : t3 + "");
var i$1 = (t3, ...e4) => {
  const n5 = t3.length === 1 ? t3[0] : e4.reduce((e5, n6, o5) => e5 + ((t4) => {
    if (t4 instanceof s$1)
      return t4.cssText;
    if (typeof t4 == "number")
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n6) + t3[o5 + 1], t3[0]);
  return o$2(n5);
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
  return r$2(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2$2;
var h;
var r2;
var o2$2 = { toAttribute(t3, i4) {
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
var n2$1 = (t3, i4) => i4 !== t3 && (i4 == i4 || t3 == t3);
var l$2 = { attribute: true, type: String, converter: o2$2, reflect: false, hasChanged: n2$1 };
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
  static createProperty(t3, i4 = l$2) {
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
    return this.elementProperties.get(t3) || l$2;
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
  \u03A0j(t3, i4, s5 = l$2) {
    var e4, h4;
    const r4 = this.constructor.\u03A0p(t3, s5);
    if (r4 !== void 0 && s5.reflect === true) {
      const n5 = ((h4 = (e4 = s5.converter) === null || e4 === void 0 ? void 0 : e4.toAttribute) !== null && h4 !== void 0 ? h4 : o2$2.toAttribute)(i4, s5.type);
      this.\u03A0h = t3, n5 == null ? this.removeAttribute(r4) : this.setAttribute(r4, n5), this.\u03A0h = null;
    }
  }
  K(t3, i4) {
    var s5, e4, h4;
    const r4 = this.constructor, n5 = r4.\u03A0m.get(t3);
    if (n5 !== void 0 && this.\u03A0h !== n5) {
      const t4 = r4.getPropertyOptions(n5), l4 = t4.converter, a4 = (h4 = (e4 = (s5 = l4) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== null && e4 !== void 0 ? e4 : typeof l4 == "function" ? l4 : null) !== null && h4 !== void 0 ? h4 : o2$2.fromAttribute;
      this.\u03A0h = n5, this[n5] = a4(i4, t4.type), this.\u03A0h = null;
    }
  }
  requestUpdate(t3, i4, s5) {
    let e4 = true;
    t3 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || n2$1)(this[t3], i4) ? (this.L.has(t3) || this.L.set(t3, i4), s5.reflect === true && this.\u03A0h !== t3 && (this.\u03A0k === void 0 && (this.\u03A0k = new Map()), this.\u03A0k.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this.\u03A0g = this.\u03A0q());
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
a.finalized = true, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, (e2$2 = (s2 = globalThis).reactiveElementPlatformSupport) === null || e2$2 === void 0 || e2$2.call(s2, { ReactiveElement: a }), ((h = (r2 = globalThis).reactiveElementVersions) !== null && h !== void 0 ? h : r2.reactiveElementVersions = []).push("1.0.0-rc.2");

// node_modules/lit-html/lit-html.js
var t2$1;
var i2$1;
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
var f$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var $ = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var g = /'/g;
var p = /"/g;
var y = /^(?:script|style|textarea)$/i;
var b = (t3) => (i4, ...s5) => ({ _$litType$: t3, strings: i4, values: s5 });
var T = b(1);
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
  let o5, h4 = i4 === 2 ? "<svg>" : "", u3 = f$1;
  for (let i5 = 0; i5 < s5; i5++) {
    const s6 = t3[i5];
    let n5, c3, d2 = -1, v2 = 0;
    for (; v2 < s6.length && (u3.lastIndex = v2, c3 = u3.exec(s6), c3 !== null); )
      v2 = u3.lastIndex, u3 === f$1 ? c3[1] === "!--" ? u3 = _ : c3[1] !== void 0 ? u3 = m : c3[2] !== void 0 ? (y.test(c3[2]) && (o5 = RegExp("</" + c3[2], "g")), u3 = $) : c3[3] !== void 0 && (u3 = $) : u3 === $ ? c3[0] === ">" ? (u3 = o5 != null ? o5 : f$1, d2 = -1) : c3[1] === void 0 ? d2 = -2 : (d2 = u3.lastIndex - c3[2].length, n5 = c3[1], u3 = c3[3] === void 0 ? $ : c3[3] === '"' ? p : g) : u3 === p || u3 === g ? u3 = $ : u3 === _ || u3 === m ? u3 = f$1 : (u3 = $, o5 = void 0);
    const a4 = u3 === $ && t3[i5 + 1].startsWith("/>") ? " " : "";
    h4 += u3 === f$1 ? s6 + r3 : d2 >= 0 ? (e4.push(n5), s6.slice(0, d2) + "$lit$" + s6.slice(d2) + l2 + a4) : s6 + l2 + (d2 === -2 ? (e4.push(void 0), i5) : a4);
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
                d2.push({ type: 1, index: n5, name: i6[2], strings: t5, ctor: i6[1] === "." ? I : i6[1] === "?" ? L : i6[1] === "@" ? R : H$1 });
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
var H$1 = class {
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
var I = class extends H$1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t3) {
    this.element[this.name] = t3 === A ? void 0 : t3;
  }
};
var L = class extends H$1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t3) {
    t3 && t3 !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }
};
var R = class extends H$1 {
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
(i2$1 = (t2$1 = globalThis).litHtmlPlatformSupport) === null || i2$1 === void 0 || i2$1.call(t2$1, M, k), ((s3 = (e3 = globalThis).litHtmlVersions) !== null && s3 !== void 0 ? s3 : e3.litHtmlVersions = []).push("2.0.0-rc.4");

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

// node_modules/lit-html/directive-helpers.js
var r$1 = (o) => o.strings === void 0;
var f = {};
var s = (o, i2 = f) => o._$AH = i2;

// node_modules/lit-html/directives/live.js
var l$1 = e$2(class extends i$2 {
  constructor(r2) {
    if (super(r2), r2.type !== t$1.PROPERTY && r2.type !== t$1.ATTRIBUTE && r2.type !== t$1.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r$1(r2))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(r2) {
    return r2;
  }
  update(i2, [t2]) {
    if (t2 === w || t2 === A)
      return t2;
    const o = i2.element, l2 = i2.name;
    if (i2.type === t$1.PROPERTY) {
      if (t2 === o[l2])
        return w;
    } else if (i2.type === t$1.BOOLEAN_ATTRIBUTE) {
      if (!!t2 === o.hasAttribute(l2))
        return w;
    } else if (i2.type === t$1.ATTRIBUTE && o.getAttribute(l2) === t2 + "")
      return w;
    return s(i2), t2;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/lit-html/directives/if-defined.js
var l = (l2) => l2 != null ? l2 : A;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/internal/focus-visible.ts
var hasFocusVisible = (() => {
  const style = document.createElement("style");
  let isSupported;
  try {
    document.head.appendChild(style);
    style.sheet.insertRule(":focus-visible { color: inherit }");
    isSupported = true;
  } catch (e) {
    isSupported = false;
  } finally {
    style.remove();
  }
  return isSupported;
})();
var focusVisibleSelector = r$2(hasFocusVisible ? ":focus-visible" : ":focus");

// node_modules/lit-html/directives/class-map.js
var e2$1 = e$2(class extends i$2 {
  constructor(t2) {
    var s;
    if (super(t2), t2.type !== t$1.ATTRIBUTE || t2.name !== "class" || ((s = t2.strings) === null || s === void 0 ? void 0 : s.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).filter((s) => t2[s]).join(" ");
  }
  update(s, [r]) {
    if (this.st === void 0) {
      this.st = new Set();
      for (const t2 in r)
        r[t2] && this.st.add(t2);
      return this.render(r);
    }
    const i2 = s.element.classList;
    this.st.forEach((t2) => {
      t2 in r || (i2.remove(t2), this.st.delete(t2));
    });
    for (const t2 in r) {
      const s2 = !!r[t2];
      s2 !== this.st.has(t2) && (s2 ? (i2.add(t2), this.st.add(t2)) : (i2.remove(t2), this.st.delete(t2)));
    }
    return w;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/internal/watch.ts
function watch(propName, options) {
  return (protoOrDescriptor, name) => {
    const { update } = protoOrDescriptor;
    options = Object.assign({ waitUntilFirstUpdate: false }, options);
    protoOrDescriptor.update = function(changedProps) {
      if (changedProps.has(propName)) {
        const oldValue = changedProps.get(propName);
        const newValue = this[propName];
        if (oldValue !== newValue) {
          if (!(options == null ? void 0 : options.waitUntilFirstUpdate) || this.hasUpdated) {
            this[name].call(this, oldValue, newValue);
          }
        }
      }
      update.call(this, changedProps);
    };
  };
}

// src/internal/event.ts
function emit(el, name, options) {
  const event = new CustomEvent(name, Object.assign({
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: {}
  }, options));
  el.dispatchEvent(event);
  return event;
}
function waitForEvent(el, eventName) {
  return new Promise((resolve) => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}

// src/styles/utility.styles.ts
var utility_styles_default = i$1`
  .sl-scroll-lock {
    overflow: hidden !important;
  }

  .sl-toast-stack {
    position: fixed;
    top: 0;
    right: 0;
    z-index: var(--sl-z-index-toast);
    width: 28rem;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
  }

  .sl-toast-stack sl-alert {
    --box-shadow: var(--sl-shadow-large);
    margin: var(--sl-spacing-medium);
  }
`;

// src/styles/component.styles.ts
var component_styles_default = i$1`
  :host {
    position: relative;
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;
var style = document.createElement("style");
style.textContent = utility_styles_default.toString();
document.head.append(style);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/@lit/reactive-element/decorators/custom-element.js
var n = (n3) => (e3) => typeof e3 == "function" ? ((n4, e4) => (e4))(n3, e3) : ((n4, e4) => {
  const { kind: t2, elements: i2 } = e4;
  return { kind: t2, elements: i2, finisher(e5) {
  } };
})(n3, e3);

// node_modules/@lit/reactive-element/decorators/property.js
var i = (i2, e3) => e3.kind === "method" && e3.descriptor && !("value" in e3.descriptor) ? __spreadProps(__spreadValues({}, e3), { finisher(n3) {
  n3.createProperty(e3.key, i2);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e3.key, initializer() {
  typeof e3.initializer == "function" && (this[e3.key] = e3.initializer.call(this));
}, finisher(n3) {
  n3.createProperty(e3.key, i2);
} };
function e(e3) {
  return (n3, t2) => t2 !== void 0 ? ((i2, e4, n4) => {
    e4.constructor.createProperty(n4, i2);
  })(e3, n3, t2) : i(e3, n3);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r(r2) {
  return e(__spreadProps(__spreadValues({}, r2), { state: true, attribute: false }));
}

// node_modules/@lit/reactive-element/decorators/base.js
var o$1 = ({ finisher: e3, descriptor: t2 }) => (o3, n3) => {
  var r2;
  if (n3 === void 0) {
    const n4 = (r2 = o3.originalKey) !== null && r2 !== void 0 ? r2 : o3.key, i2 = t2 != null ? { kind: "method", placement: "prototype", key: n4, descriptor: t2(o3.key) } : __spreadProps(__spreadValues({}, o3), { key: n4 });
    return e3 != null && (i2.finisher = function(t3) {
      e3(t3, n4);
    }), i2;
  }
  {
    const r3 = o3.constructor;
    t2 !== void 0 && Object.defineProperty(o3, n3, t2(n3)), e3 == null || e3(r3, n3);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function o2$1(o3, r2) {
  return o$1({ descriptor: (t2) => {
    const i2 = { get() {
      var t3;
      return (t3 = this.renderRoot) === null || t3 === void 0 ? void 0 : t3.querySelector(o3);
    }, enumerable: true, configurable: true };
    if (r2) {
      const r3 = typeof t2 == "symbol" ? Symbol() : "__" + t2;
      i2.get = function() {
        var t3;
        return this[r3] === void 0 && (this[r3] = (t3 = this.renderRoot) === null || t3 === void 0 ? void 0 : t3.querySelector(o3)), this[r3];
      };
    }
    return i2;
  } });
}

// node_modules/@lit/reactive-element/decorators/query-async.js
function e2(e3) {
  return o$1({ descriptor: (r2) => ({ async get() {
    var r3;
    return await this.updateComplete, (r3 = this.renderRoot) === null || r3 === void 0 ? void 0 : r3.querySelector(e3);
  }, enumerable: true, configurable: true }) });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/components/switch/switch.styles.ts
var switch_styles_default = i$1`
  ${component_styles_default}

  :host {
    --height: var(--sl-toggle-size);
    --thumb-size: calc(var(--sl-toggle-size) + 4px);
    --width: calc(var(--height) * 2);

    display: inline-block;
  }

  .switch {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: rgb(var(--sl-input-color));
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: rgb(var(--sl-color-neutral-400));
    border: solid var(--sl-input-border-width) rgb(var(--sl-color-neutral-400));
    border-radius: var(--height);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: rgb(var(--sl-color-neutral-0));
    border-radius: 50%;
    border: solid var(--sl-input-border-width) rgb(var(--sl-color-neutral-400));
    transform: translateX(calc((var(--width) - var(--height)) / -2));
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: rgb(var(--sl-color-neutral-400));
    border-color: rgb(var(--sl-color-neutral-400));
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: rgb(var(--sl-color-neutral-0));
    border-color: rgb(var(--sl-color-neutral-400));
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input${focusVisibleSelector} ~ .switch__control {
    background-color: rgb(var(--sl-color-neutral-400));
    border-color: rgb(var(--sl-color-neutral-400));
  }

  .switch:not(.switch--checked):not(.switch--disabled)
    .switch__input${focusVisibleSelector}
    ~ .switch__control
    .switch__thumb {
    background-color: rgb(var(--sl-color-neutral-0));
    border-color: rgb(var(--sl-color-primary-600));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: rgb(var(--sl-color-primary-600));
    border-color: rgb(var(--sl-color-primary-600));
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: rgb(var(--sl-color-neutral-0));
    border-color: rgb(var(--sl-color-primary-600));
    transform: translateX(calc((var(--width) - var(--height)) / 2));
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: rgb(var(--sl-color-primary-600));
    border-color: rgb(var(--sl-color-primary-600));
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: rgb(var(--sl-color-neutral-0));
    border-color: rgb(var(--sl-color-primary-600));
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input${focusVisibleSelector} ~ .switch__control {
    background-color: rgb(var(--sl-color-primary-600));
    border-color: rgb(var(--sl-color-primary-600));
  }

  .switch.switch--checked:not(.switch--disabled)
    .switch__input${focusVisibleSelector}
    ~ .switch__control
    .switch__thumb {
    background-color: rgb(var(--sl-color-neutral-0));
    border-color: rgb(var(--sl-color-primary-600));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    line-height: var(--height);
    margin-left: 0.5em;
    user-select: none;
  }
`;

// src/components/switch/switch.ts
var id$d = 0;
var SlSwitch = class extends h3 {
  constructor() {
    super(...arguments);
    this.switchId = `switch-${++id$d}`;
    this.labelId = `switch-label-${id$d}`;
    this.hasFocus = false;
    this.disabled = false;
    this.required = false;
    this.checked = false;
    this.invalid = false;
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }
  click() {
    this.input.click();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleCheckedChange() {
    if (this.input) {
      this.input.checked = this.checked;
      this.invalid = !this.input.checkValidity();
    }
  }
  handleClick() {
    this.checked = !this.checked;
    emit(this, "sl-change");
  }
  handleDisabledChange() {
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "sl-focus");
  }
  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.checked = false;
      emit(this, "sl-change");
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.checked = true;
      emit(this, "sl-change");
    }
  }
  render() {
    return T`
      <label
        part="base"
        for=${this.switchId}
        class=${e2$1({
      switch: true,
      "switch--checked": this.checked,
      "switch--disabled": this.disabled,
      "switch--focused": this.hasFocus
    })}
      >
        <input
          id=${this.switchId}
          class="switch__input"
          type="checkbox"
          name=${l(this.name)}
          value=${l(this.value)}
          .checked=${l$1(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          aria-labelledby=${this.labelId}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <span part="label" id=${this.labelId} class="switch__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
};
SlSwitch.styles = switch_styles_default;
__decorateClass([
  o2$1('input[type="checkbox"]')
], SlSwitch.prototype, "input", 2);
__decorateClass([
  r()
], SlSwitch.prototype, "hasFocus", 2);
__decorateClass([
  e()
], SlSwitch.prototype, "name", 2);
__decorateClass([
  e()
], SlSwitch.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSwitch.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSwitch.prototype, "required", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSwitch.prototype, "checked", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSwitch.prototype, "invalid", 2);
__decorateClass([
  watch("checked")
], SlSwitch.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled")
], SlSwitch.prototype, "handleDisabledChange", 1);
SlSwitch = __decorateClass([
  n("sl-switch")
], SlSwitch);
var switch_default = SlSwitch;

// src/components/tab/tab.styles.ts
var tab_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: 4px;
    color: rgb(var(--sl-color-neutral-600));
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: var(--transition-speed) box-shadow, var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: rgb(var(--sl-color-primary-600));
  }

  .tab:focus {
    outline: none;
  }

  .tab${focusVisibleSelector}:not(.tab--disabled) {
    color: rgb(var(--sl-color-primary-600));
    box-shadow: inset var(--sl-focus-ring);
  }

  .tab.tab--active:not(.tab--disabled) {
    color: rgb(var(--sl-color-primary-600));
  }

  .tab.tab--closable {
    padding-right: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-large);
    margin-left: var(--sl-spacing-2x-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }
`;

// src/components/tab/tab.ts
var id$c = 0;
var SlTab$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.componentId = `tab-${++id$c}`;
    this.panel = "";
    this.active = false;
    this.closable = false;
    this.disabled = false;
  }
  focus(options) {
    this.tab.focus(options);
  }
  blur() {
    this.tab.blur();
  }
  handleCloseClick() {
    emit(this, "sl-close");
  }
  render() {
    this.id = this.id || this.componentId;
    return T`
      <div
        part="base"
        class=${e2$1({
      tab: true,
      "tab--active": this.active,
      "tab--closable": this.closable,
      "tab--disabled": this.disabled
    })}
        role="tab"
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-selected=${this.active ? "true" : "false"}
        tabindex=${this.disabled || !this.active ? "-1" : "0"}
      >
        <slot></slot>
        ${this.closable ? T`
              <sl-icon-button
                name="x"
                library="system"
                exportparts="base:close-button"
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
                aria-hidden="true"
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
  }
};
SlTab$1.styles = tab_styles_default;
__decorateClass([
  o2$1(".tab")
], SlTab$1.prototype, "tab", 2);
__decorateClass([
  e()
], SlTab$1.prototype, "panel", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTab$1.prototype, "active", 2);
__decorateClass([
  e({ type: Boolean })
], SlTab$1.prototype, "closable", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTab$1.prototype, "disabled", 2);
SlTab$1 = __decorateClass([
  n("sl-tab")
], SlTab$1);
var tab_default = SlTab$1;

// src/internal/offset.ts
function getOffset(element, parent) {
  return {
    top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
    left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
  };
}

// src/internal/scroll.ts
var locks = new Set();
function lockBodyScrolling(lockingEl) {
  locks.add(lockingEl);
  document.body.classList.add("sl-scroll-lock");
}
function unlockBodyScrolling(lockingEl) {
  locks.delete(lockingEl);
  if (locks.size === 0) {
    document.body.classList.remove("sl-scroll-lock");
  }
}
function scrollIntoView(element, container, direction = "vertical", behavior = "smooth") {
  const offset = getOffset(element, container);
  const offsetTop = offset.top + container.scrollTop;
  const offsetLeft = offset.left + container.scrollLeft;
  const minX = container.scrollLeft;
  const maxX = container.scrollLeft + container.offsetWidth;
  const minY = container.scrollTop;
  const maxY = container.scrollTop + container.offsetHeight;
  if (direction === "horizontal" || direction === "both") {
    if (offsetLeft < minX) {
      container.scrollTo({ left: offsetLeft, behavior });
    } else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior });
    }
  }
  if (direction === "vertical" || direction === "both") {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior });
    } else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior });
    }
  }
}

// src/components/tab-group/tab-group.styles.ts
var tab_group_styles_default = i$1`
  ${component_styles_default}

  :host {
    --track-color: rgb(var(--sl-color-neutral-200));
    --indicator-color: rgb(var(--sl-color-primary-600));

    display: block;
  }

  .tab-group {
    display: flex;
    border: solid 1px transparent;
    border-radius: 0;
  }

  .tab-group .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group .tab-group__indicator {
    position: absolute;
    left: 0;
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid 2px var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: -2px;
    border-bottom: solid 2px var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid 2px var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * 2px);
    border-top: solid 2px var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-right: solid 2px var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * 2px);
    border-right: solid 2px var(--indicator-color);
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid 2px var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * 2px);
    border-left: solid 2px var(--indicator-color);
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }
`;

// src/components/tab-group/tab-group.ts
var SlTabGroup$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.tabs = [];
    this.panels = [];
    this.hasScrollControls = false;
    this.placement = "top";
    this.activation = "auto";
    this.noScrollControls = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => {
      this.preventIndicatorTransition();
      this.repositionIndicator();
      this.updateScrollControls();
    });
    this.mutationObserver = new MutationObserver((mutations) => {
      if (mutations.some((m) => !["aria-labelledby", "aria-controls"].includes(m.attributeName))) {
        setTimeout(() => this.setAriaLabels());
      }
      if (mutations.some((m) => m.attributeName === "disabled")) {
        this.syncTabsAndPanels();
      }
    });
    this.updateComplete.then(() => {
      this.syncTabsAndPanels();
      this.mutationObserver.observe(this, { attributes: true, childList: true, subtree: true });
      this.resizeObserver.observe(this.nav);
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].intersectionRatio > 0) {
          this.setAriaLabels();
          this.setActiveTab(this.getActiveTab() || this.tabs[0], { emitEvents: false });
          observer.unobserve(entries[0].target);
        }
      });
      intersectionObserver.observe(this.tabGroup);
    });
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.unobserve(this.nav);
  }
  show(panel) {
    const tab = this.tabs.find((el) => el.panel === panel);
    if (tab) {
      this.setActiveTab(tab, { scrollBehavior: "smooth" });
    }
  }
  getAllTabs(includeDisabled = false) {
    const slot = this.shadowRoot.querySelector('slot[name="nav"]');
    return [...slot.assignedElements()].filter((el) => {
      return includeDisabled ? el.tagName.toLowerCase() === "sl-tab" : el.tagName.toLowerCase() === "sl-tab" && !el.disabled;
    });
  }
  getAllPanels() {
    const slot = this.body.querySelector("slot");
    return [...slot.assignedElements()].filter((el) => el.tagName.toLowerCase() === "sl-tab-panel");
  }
  getActiveTab() {
    return this.tabs.find((el) => el.active);
  }
  handleClick(event) {
    const target = event.target;
    const tab = target.closest("sl-tab");
    const tabGroup = tab == null ? void 0 : tab.closest("sl-tab-group");
    if (tabGroup !== this) {
      return;
    }
    if (tab) {
      this.setActiveTab(tab, { scrollBehavior: "smooth" });
    }
  }
  handleKeyDown(event) {
    const target = event.target;
    const tab = target.closest("sl-tab");
    const tabGroup = tab == null ? void 0 : tab.closest("sl-tab-group");
    if (tabGroup !== this) {
      return;
    }
    if (["Enter", " "].includes(event.key)) {
      if (tab) {
        this.setActiveTab(tab, { scrollBehavior: "smooth" });
        event.preventDefault();
      }
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      const activeEl = document.activeElement;
      if (activeEl && activeEl.tagName.toLowerCase() === "sl-tab") {
        let index = this.tabs.indexOf(activeEl);
        if (event.key === "Home") {
          index = 0;
        } else if (event.key === "End") {
          index = this.tabs.length - 1;
        } else if (["top", "bottom"].includes(this.placement) && event.key === "ArrowLeft" || ["start", "end"].includes(this.placement) && event.key === "ArrowUp") {
          index = Math.max(0, index - 1);
        } else if (["top", "bottom"].includes(this.placement) && event.key === "ArrowRight" || ["start", "end"].includes(this.placement) && event.key === "ArrowDown") {
          index = Math.min(this.tabs.length - 1, index + 1);
        }
        this.tabs[index].focus({ preventScroll: true });
        if (this.activation === "auto") {
          this.setActiveTab(this.tabs[index], { scrollBehavior: "smooth" });
        }
        if (["top", "bottom"].includes(this.placement)) {
          scrollIntoView(this.tabs[index], this.nav, "horizontal");
        }
        event.preventDefault();
      }
    }
  }
  handleScrollToStart() {
    this.nav.scroll({
      left: this.nav.scrollLeft - this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  handleScrollToEnd() {
    this.nav.scroll({
      left: this.nav.scrollLeft + this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  updateScrollControls() {
    if (this.nav) {
      if (this.noScrollControls) {
        this.hasScrollControls = false;
      } else {
        this.hasScrollControls = ["top", "bottom"].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth;
      }
    }
  }
  setActiveTab(tab, options) {
    options = Object.assign({
      emitEvents: true,
      scrollBehavior: "auto"
    }, options);
    if (tab && tab !== this.activeTab && !tab.disabled) {
      const previousTab = this.activeTab;
      this.activeTab = tab;
      this.tabs.map((el) => el.active = el === this.activeTab);
      this.panels.map((el) => el.active = el.name === this.activeTab.panel);
      this.syncIndicator();
      if (["top", "bottom"].includes(this.placement)) {
        scrollIntoView(this.activeTab, this.nav, "horizontal", options.scrollBehavior);
      }
      if (options.emitEvents) {
        if (previousTab) {
          emit(this, "sl-tab-hide", { detail: { name: previousTab.panel } });
        }
        emit(this, "sl-tab-show", { detail: { name: this.activeTab.panel } });
      }
    }
  }
  setAriaLabels() {
    this.tabs.map((tab) => {
      const panel = this.panels.find((el) => el.name === tab.panel);
      if (panel) {
        tab.setAttribute("aria-controls", panel.getAttribute("id"));
        panel.setAttribute("aria-labelledby", tab.getAttribute("id"));
      }
    });
  }
  syncIndicator() {
    if (this.indicator) {
      const tab = this.getActiveTab();
      if (tab) {
        this.indicator.style.display = "block";
        this.repositionIndicator();
      } else {
        this.indicator.style.display = "none";
        return;
      }
    }
  }
  repositionIndicator() {
    const currentTab = this.getActiveTab();
    if (!currentTab) {
      return;
    }
    const width = currentTab.clientWidth;
    const height = currentTab.clientHeight;
    const offset = getOffset(currentTab, this.nav);
    const offsetTop = offset.top + this.nav.scrollTop;
    const offsetLeft = offset.left + this.nav.scrollLeft;
    switch (this.placement) {
      case "top":
      case "bottom":
        this.indicator.style.width = `${width}px`;
        this.indicator.style.height = "auto";
        this.indicator.style.transform = `translateX(${offsetLeft}px)`;
        break;
      case "start":
      case "end":
        this.indicator.style.width = "auto";
        this.indicator.style.height = `${height}px`;
        this.indicator.style.transform = `translateY(${offsetTop}px)`;
        break;
    }
  }
  preventIndicatorTransition() {
    const transitionValue = this.indicator.style.transition;
    this.indicator.style.transition = "none";
    requestAnimationFrame(() => {
      this.indicator.style.transition = transitionValue;
    });
  }
  syncTabsAndPanels() {
    this.tabs = this.getAllTabs();
    this.panels = this.getAllPanels();
    this.syncIndicator();
  }
  render() {
    return T`
      <div
        part="base"
        class=${e2$1({
      "tab-group": true,
      "tab-group--top": this.placement === "top",
      "tab-group--bottom": this.placement === "bottom",
      "tab-group--start": this.placement === "start",
      "tab-group--end": this.placement === "end",
      "tab-group--has-scroll-controls": this.hasScrollControls
    })}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container">
          ${this.hasScrollControls ? T`
                <sl-icon-button
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  exportparts="base:scroll-button"
                  name="chevron-left"
                  library="system"
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              ` : ""}

          <div part="nav" class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls ? T`
                <sl-icon-button
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  exportparts="base:scroll-button"
                  name="chevron-right"
                  library="system"
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              ` : ""}
        </div>

        <div part="body" class="tab-group__body">
          <slot @slotchange=${this.syncTabsAndPanels}></slot>
        </div>
      </div>
    `;
  }
};
SlTabGroup$1.styles = tab_group_styles_default;
__decorateClass([
  o2$1(".tab-group")
], SlTabGroup$1.prototype, "tabGroup", 2);
__decorateClass([
  o2$1(".tab-group__body")
], SlTabGroup$1.prototype, "body", 2);
__decorateClass([
  o2$1(".tab-group__nav")
], SlTabGroup$1.prototype, "nav", 2);
__decorateClass([
  o2$1(".tab-group__indicator")
], SlTabGroup$1.prototype, "indicator", 2);
__decorateClass([
  r()
], SlTabGroup$1.prototype, "hasScrollControls", 2);
__decorateClass([
  e()
], SlTabGroup$1.prototype, "placement", 2);
__decorateClass([
  e()
], SlTabGroup$1.prototype, "activation", 2);
__decorateClass([
  e({ attribute: "no-scroll-controls", type: Boolean })
], SlTabGroup$1.prototype, "noScrollControls", 2);
__decorateClass([
  watch("noScrollControls")
], SlTabGroup$1.prototype, "updateScrollControls", 1);
__decorateClass([
  watch("placement")
], SlTabGroup$1.prototype, "syncIndicator", 1);
SlTabGroup$1 = __decorateClass([
  n("sl-tab-group")
], SlTabGroup$1);
var tab_group_default = SlTabGroup$1;

// src/components/tab-panel/tab-panel.styles.ts
var tab_panel_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: block;
  }

  .tab-panel {
    border: solid 1px transparent;
    padding: 20px 20px;
  }
`;

// src/components/tab-panel/tab-panel.ts
var id$b = 0;
var SlTabPanel = class extends h3 {
  constructor() {
    super(...arguments);
    this.componentId = `tab-panel-${++id$b}`;
    this.name = "";
    this.active = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = this.id || this.componentId;
  }
  render() {
    this.style.display = this.active ? "block" : "none";
    return T`
      <div
        part="base"
        class="tab-panel"
        role="tabpanel"
        aria-selected=${this.active ? "true" : "false"}
        aria-hidden=${this.active ? "false" : "true"}
      >
        <slot></slot>
      </div>
    `;
  }
};
SlTabPanel.styles = tab_panel_styles_default;
__decorateClass([
  e()
], SlTabPanel.prototype, "name", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTabPanel.prototype, "active", 2);
SlTabPanel = __decorateClass([
  n("sl-tab-panel")
], SlTabPanel);
var tab_panel_default = SlTabPanel;

// src/internal/form-control.ts
var renderFormControl = (props, input) => {
  const hasLabel = props.label ? true : !!props.hasLabelSlot;
  const hasHelpText = props.helpText ? true : !!props.hasHelpTextSlot;
  return T`
    <div
      part="form-control"
      class=${e2$1({
    "form-control": true,
    "form-control--small": props.size === "small",
    "form-control--medium": props.size === "medium",
    "form-control--large": props.size === "large",
    "form-control--has-label": hasLabel,
    "form-control--has-help-text": hasHelpText
  })}
    >
      <label
        part="label"
        id=${l(props.labelId)}
        class="form-control__label"
        for=${props.inputId}
        aria-hidden=${hasLabel ? "false" : "true"}
        @click=${(event) => props.onLabelClick ? props.onLabelClick(event) : null}
      >
        <slot name="label">${props.label}</slot>
      </label>

      <div class="form-control__input">${T`${input}`}</div>

      <div
        part="help-text"
        id=${l(props.helpTextId)}
        class="form-control__help-text"
        aria-hidden=${hasHelpText ? "false" : "true"}
      >
        <slot name="help-text">${props.helpText}</slot>
      </div>
    </div>
  `;
};
function getLabelledBy(props) {
  const labelledBy = [
    props.label || props.hasLabelSlot ? props.labelId : "",
    props.helpText || props.hasHelpTextSlot ? props.helpTextId : ""
  ].filter((val) => val);
  return labelledBy.join(" ") || void 0;
}

// src/styles/form-control.styles.ts
var form_control_styles_default = i$1`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control_label {
    font-size: var(--sl-input-label-font-size-large);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: rgb(var(--sl-input-help-text-color));
  }

  .form-control--has-help-text .form-control__help-text ::slotted(*) {
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }
`;

// src/internal/slot.ts
function getTextContent(slot) {
  const nodes = slot ? slot.assignedNodes({ flatten: true }) : [];
  let text = "";
  [...nodes].map((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  });
  return text;
}
function hasSlot(el, name) {
  if (name) {
    return el.querySelector(`:scope > [slot="${name}"]`) !== null;
  }
  return [...el.childNodes].some((node) => {
    if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
      return true;
    }
    if (node.nodeType === node.ELEMENT_NODE) {
      const el2 = node;
      if (!el2.hasAttribute("slot")) {
        return true;
      }
    }
    return false;
  });
}

// src/components/textarea/textarea.styles.ts
var textarea_styles_default = i$1`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    background-color: rgb(var(--sl-input-background-color));
    border: solid var(--sl-input-border-width) rgb(var(--sl-input-border-color));
    vertical-align: middle;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: text;
  }

  .textarea:hover:not(.textarea--disabled) {
    background-color: rgb(var(--sl-input-background-color-hover));
    border-color: rgb(var(--sl-input-border-color-hover));
  }
  .textarea:hover:not(.textarea--disabled) .textarea__control {
    color: rgb(var(--sl-input-color-hover));
  }

  .textarea.textarea--focused:not(.textarea--disabled) {
    background-color: rgb(var(--sl-input-background-color-focus));
    border-color: rgb(var(--sl-input-border-color-focus));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
    color: rgb(var(--sl-input-color-focus));
  }

  .textarea.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: rgb(var(--sl-input-color-focus));
  }

  .textarea.textarea--disabled {
    background-color: rgb(var(--sl-input-background-color-disabled));
    border-color: rgb(var(--sl-input-border-color-disabled));
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea.textarea--disabled .textarea__control {
    color: rgb(var(--sl-input-color-disabled));
  }

  .textarea.textarea--disabled .textarea__control::placeholder {
    color: rgb(var(--sl-input-placeholder-color-disabled));
  }

  .textarea__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: rgb(var(--sl-input-color));
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: rgb(var(--sl-input-placeholder-color));
    user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
  }
`;

// src/components/textarea/textarea.ts
var id$a = 0;
var SlTextarea = class extends h3 {
  constructor() {
    super(...arguments);
    this.inputId = `textarea-${++id$a}`;
    this.helpTextId = `textarea-help-text-${id$a}`;
    this.labelId = `textarea-label-${id$a}`;
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasLabelSlot = false;
    this.size = "medium";
    this.value = "";
    this.helpText = "";
    this.rows = 4;
    this.resize = "vertical";
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.invalid = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
    this.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
    this.handleSlotChange();
    this.updateComplete.then(() => {
      this.setTextareaHeight();
      this.resizeObserver.observe(this.input);
    });
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
    this.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  select() {
    return this.input.select();
  }
  scrollPosition(position) {
    if (position) {
      if (typeof position.top === "number")
        this.input.scrollTop = position.top;
      if (typeof position.left === "number")
        this.input.scrollLeft = position.left;
      return;
    }
    return {
      top: this.input.scrollTop,
      left: this.input.scrollTop
    };
  }
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  setRangeText(replacement, start, end, selectMode = "preserve") {
    this.input.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      emit(this, "sl-input");
    }
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaHeight();
      emit(this, "sl-input");
      emit(this, "sl-change");
    }
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.setTextareaHeight();
    emit(this, "sl-change");
  }
  handleDisabledChange() {
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.setTextareaHeight();
    emit(this, "sl-input");
  }
  handleRowsChange() {
    this.setTextareaHeight();
  }
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, "help-text");
    this.hasLabelSlot = hasSlot(this, "label");
  }
  handleValueChange() {
    if (this.input) {
      this.invalid = !this.input.checkValidity();
    }
  }
  setTextareaHeight() {
    if (this.input) {
      if (this.resize === "auto") {
        this.input.style.height = "auto";
        this.input.style.height = this.input.scrollHeight + "px";
      } else {
        this.input.style.height = void 0;
      }
    }
  }
  render() {
    var _a;
    return renderFormControl({
      inputId: this.inputId,
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpTextId: this.helpTextId,
      helpText: this.helpText,
      hasHelpTextSlot: this.hasHelpTextSlot,
      size: this.size
    }, T`
        <div
          part="base"
          class=${e2$1({
      textarea: true,
      "textarea--small": this.size === "small",
      "textarea--medium": this.size === "medium",
      "textarea--large": this.size === "large",
      "textarea--disabled": this.disabled,
      "textarea--focused": this.hasFocus,
      "textarea--empty": ((_a = this.value) == null ? void 0 : _a.length) === 0,
      "textarea--invalid": this.invalid,
      "textarea--resize-none": this.resize === "none",
      "textarea--resize-vertical": this.resize === "vertical",
      "textarea--resize-auto": this.resize === "auto"
    })}
        >
          <textarea
            part="textarea"
            id=${this.inputId}
            class="textarea__control"
            name=${l(this.name)}
            .value=${l$1(this.value)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            placeholder=${l(this.placeholder)}
            rows=${l(this.rows)}
            minlength=${l(this.minlength)}
            maxlength=${l(this.maxlength)}
            autocapitalize=${l(this.autocapitalize)}
            autocorrect=${l(this.autocorrect)}
            ?autofocus=${this.autofocus}
            spellcheck=${l(this.spellcheck)}
            inputmode=${l(this.inputmode)}
            aria-labelledby=${l(getLabelledBy({
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpText: this.helpText,
      helpTextId: this.helpTextId,
      hasHelpTextSlot: this.hasHelpTextSlot
    }))}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          ></textarea>
        </div>
      `);
  }
};
SlTextarea.styles = textarea_styles_default;
__decorateClass([
  o2$1(".textarea__control")
], SlTextarea.prototype, "input", 2);
__decorateClass([
  r()
], SlTextarea.prototype, "hasFocus", 2);
__decorateClass([
  r()
], SlTextarea.prototype, "hasHelpTextSlot", 2);
__decorateClass([
  r()
], SlTextarea.prototype, "hasLabelSlot", 2);
__decorateClass([
  e({ reflect: true })
], SlTextarea.prototype, "size", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "name", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "value", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "label", 2);
__decorateClass([
  e({ attribute: "help-text" })
], SlTextarea.prototype, "helpText", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "placeholder", 2);
__decorateClass([
  e({ type: Number })
], SlTextarea.prototype, "rows", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "resize", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTextarea.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTextarea.prototype, "readonly", 2);
__decorateClass([
  e({ type: Number })
], SlTextarea.prototype, "minlength", 2);
__decorateClass([
  e({ type: Number })
], SlTextarea.prototype, "maxlength", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "pattern", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTextarea.prototype, "required", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTextarea.prototype, "invalid", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "autocapitalize", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "autocorrect", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "autocomplete", 2);
__decorateClass([
  e({ type: Boolean })
], SlTextarea.prototype, "autofocus", 2);
__decorateClass([
  e({ type: Boolean })
], SlTextarea.prototype, "spellcheck", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "inputmode", 2);
__decorateClass([
  watch("disabled")
], SlTextarea.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("rows")
], SlTextarea.prototype, "handleRowsChange", 1);
__decorateClass([
  watch("helpText"),
  watch("label")
], SlTextarea.prototype, "handleSlotChange", 1);
__decorateClass([
  watch("value")
], SlTextarea.prototype, "handleValueChange", 1);
SlTextarea = __decorateClass([
  n("sl-textarea")
], SlTextarea);
var textarea_default = SlTextarea;

// node_modules/@popperjs/core/dist/esm/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getWindow.js
function getWindow(node) {
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/dist/esm/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getComputedStyle.js
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/dist/esm/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getCompositeRect.js
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/dist/esm/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}

// node_modules/@popperjs/core/dist/esm/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
  var currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].includes(css.willChange) || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/dist/esm/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/dist/esm/utils/orderModifiers.js
function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/dist/esm/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/dist/esm/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/dist/esm/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getViewportRect.js
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/dist/esm/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/dist/esm/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/dist/esm/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/dist/esm/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/dist/esm/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/dist/esm/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/dist/esm/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/dist/esm/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/dist/esm/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/dist/esm/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/dist/esm/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/dist/esm/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/dist/esm/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(options2) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// node_modules/@popperjs/core/dist/esm/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};

// node_modules/@popperjs/core/dist/esm/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/dist/esm/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle$1(offsetParent).position !== "static") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    if (placement === top) {
      sideY = bottom;
      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left) {
      sideX = right;
      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref4) {
  var state = _ref4.state, options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/dist/esm/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect2,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/dist/esm/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/dist/esm/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/dist/esm/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/dist/esm/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/dist/esm/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip$1(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip$1,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/dist/esm/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/dist/esm/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}

// node_modules/@popperjs/core/dist/esm/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = popperOffsets2[mainAxis] + overflow[mainSide];
    var max2 = popperOffsets2[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets2[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets2[mainAxis] + maxOffset - offsetModifierValue;
    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/dist/esm/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect3(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect3,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/dist/esm/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/dist/esm/popper.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// src/internal/animate.ts
function animateTo(el, keyframes, options) {
  return new Promise(async (resolve) => {
    if ((options == null ? void 0 : options.duration) === Infinity) {
      throw new Error("Promise-based animations must be finite.");
    }
    const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
      duration: prefersReducedMotion() ? 0 : options.duration
    }));
    animation.addEventListener("cancel", resolve, { once: true });
    animation.addEventListener("finish", resolve, { once: true });
  });
}
function parseDuration(delay) {
  delay = (delay + "").toLowerCase();
  if (delay.indexOf("ms") > -1) {
    return parseFloat(delay);
  }
  if (delay.indexOf("s") > -1) {
    return parseFloat(delay) * 1e3;
  }
  return parseFloat(delay);
}
function prefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query == null ? void 0 : query.matches;
}
function stopAnimations(el) {
  return Promise.all(el.getAnimations().map((animation) => {
    return new Promise((resolve) => {
      const handleAnimationEvent = requestAnimationFrame(resolve);
      animation.addEventListener("cancel", () => handleAnimationEvent, { once: true });
      animation.addEventListener("finish", () => handleAnimationEvent, { once: true });
      animation.cancel();
    });
  }));
}
function shimKeyframesHeightAuto(keyframes, calculatedHeight) {
  return keyframes.map((keyframe) => Object.assign({}, keyframe, {
    height: keyframe.height === "auto" ? `${calculatedHeight}px` : keyframe.height
  }));
}

// src/utilities/animation-registry.ts
var defaultAnimationRegistry = new Map();
var customAnimationRegistry = new WeakMap();
function ensureAnimation(animation) {
  return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
}
function setDefaultAnimation(animationName, animation) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}
function getAnimation(el, animationName) {
  const customAnimation = customAnimationRegistry.get(el);
  if (customAnimation && customAnimation[animationName]) {
    return customAnimation[animationName];
  }
  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return defaultAnimation;
  }
  return {
    keyframes: [],
    options: { duration: 0 }
  };
}

// src/components/tooltip/tooltip.styles.ts
var tooltip_styles_default = i$1`
  ${component_styles_default}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip-positioner {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    pointer-events: none;
  }

  .tooltip {
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: rgb(var(--sl-tooltip-background-color));
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: rgb(var(--sl-tooltip-color));
    padding: var(--sl-tooltip-padding);
  }

  .tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
  }

  .tooltip-positioner[data-popper-placement^='top'] .tooltip {
    transform-origin: bottom;
  }

  .tooltip-positioner[data-popper-placement^='bottom'] .tooltip {
    transform-origin: top;
  }

  .tooltip-positioner[data-popper-placement^='left'] .tooltip {
    transform-origin: right;
  }

  .tooltip-positioner[data-popper-placement^='right'] .tooltip {
    transform-origin: left;
  }

  /* Arrow + bottom */
  .tooltip-positioner[data-popper-placement^='bottom'] .tooltip:after {
    bottom: 100%;
    left: calc(50% - var(--sl-tooltip-arrow-size));
    border-bottom: var(--sl-tooltip-arrow-size) solid rgb(var(--sl-tooltip-background-color));
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='bottom-start'] .tooltip:after {
    left: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='bottom-end'] .tooltip:after {
    right: var(--sl-tooltip-arrow-start-end-offset);
    left: auto;
  }

  /* Arrow + top */
  .tooltip-positioner[data-popper-placement^='top'] .tooltip:after {
    top: 100%;
    left: calc(50% - var(--sl-tooltip-arrow-size));
    border-top: var(--sl-tooltip-arrow-size) solid rgb(var(--sl-tooltip-background-color));
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='top-start'] .tooltip:after {
    left: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='top-end'] .tooltip:after {
    right: var(--sl-tooltip-arrow-start-end-offset);
    left: auto;
  }

  /* Arrow + left */
  .tooltip-positioner[data-popper-placement^='left'] .tooltip:after {
    top: calc(50% - var(--sl-tooltip-arrow-size));
    left: 100%;
    border-left: var(--sl-tooltip-arrow-size) solid rgb(var(--sl-tooltip-background-color));
    border-top: var(--sl-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='left-start'] .tooltip:after {
    top: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='left-end'] .tooltip:after {
    top: auto;
    bottom: var(--sl-tooltip-arrow-start-end-offset);
  }

  /* Arrow + right */
  .tooltip-positioner[data-popper-placement^='right'] .tooltip:after {
    top: calc(50% - var(--sl-tooltip-arrow-size));
    right: 100%;
    border-right: var(--sl-tooltip-arrow-size) solid rgb(var(--sl-tooltip-background-color));
    border-top: var(--sl-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='right-start'] .tooltip:after {
    top: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='right-end'] .tooltip:after {
    top: auto;
    bottom: var(--sl-tooltip-arrow-start-end-offset);
  }
`;

// src/components/tooltip/tooltip.ts
var id$9 = 0;
var SlTooltip = class extends h3 {
  constructor() {
    super(...arguments);
    this.componentId = `tooltip-${++id$9}`;
    this.content = "";
    this.placement = "top";
    this.disabled = false;
    this.distance = 10;
    this.open = false;
    this.skidding = 0;
    this.trigger = "hover focus";
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.updateComplete.then(() => {
      this.addEventListener("blur", this.handleBlur, true);
      this.addEventListener("focus", this.handleFocus, true);
      this.addEventListener("click", this.handleClick);
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("mouseover", this.handleMouseOver);
      this.addEventListener("mouseout", this.handleMouseOut);
      this.target = this.getTarget();
      this.syncOptions();
    });
  }
  firstUpdated() {
    this.tooltip.hidden = !this.open;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("blur", this.handleBlur, true);
    this.removeEventListener("focus", this.handleFocus, true);
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("keydown", this.handleKeyDown);
    this.removeEventListener("mouseover", this.handleMouseOver);
    this.removeEventListener("mouseout", this.handleMouseOut);
    if (this.popover) {
      this.popover.destroy();
    }
  }
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  getTarget() {
    const target = [...this.children].find((el) => el.tagName.toLowerCase() !== "style" && el.getAttribute("slot") !== "content");
    if (!target) {
      throw new Error("Invalid tooltip target: no child element was found.");
    }
    return target;
  }
  handleBlur() {
    if (this.hasTrigger("focus")) {
      this.hide();
    }
  }
  handleClick() {
    if (this.hasTrigger("click")) {
      this.open ? this.hide() : this.show();
    }
  }
  handleFocus() {
    if (this.hasTrigger("focus")) {
      this.show();
    }
  }
  handleKeyDown(event) {
    if (this.open && event.key === "Escape") {
      event.stopPropagation();
      this.hide();
    }
  }
  handleMouseOver() {
    if (this.hasTrigger("hover")) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue("--show-delay"));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => this.show(), delay);
    }
  }
  handleMouseOut() {
    if (this.hasTrigger("hover")) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue("--hide-delay"));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => this.hide(), delay);
    }
  }
  async handleOpenChange() {
    if (this.disabled) {
      return;
    }
    if (this.open) {
      emit(this, "sl-show");
      await stopAnimations(this.tooltip);
      if (this.popover) {
        this.popover.destroy();
      }
      this.popover = createPopper(this.target, this.positioner, {
        placement: this.placement,
        strategy: "absolute",
        modifiers: [
          {
            name: "flip",
            options: {
              boundary: "viewport"
            }
          },
          {
            name: "offset",
            options: {
              offset: [this.skidding, this.distance]
            }
          }
        ]
      });
      this.tooltip.hidden = false;
      const { keyframes, options } = getAnimation(this, "tooltip.show");
      await animateTo(this.tooltip, keyframes, options);
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      await stopAnimations(this.tooltip);
      const { keyframes, options } = getAnimation(this, "tooltip.hide");
      await animateTo(this.tooltip, keyframes, options);
      this.tooltip.hidden = true;
      if (this.popover) {
        this.popover.destroy();
      }
      emit(this, "sl-after-hide");
    }
  }
  handleOptionsChange() {
    this.syncOptions();
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }
  handleSlotChange() {
    const oldTarget = this.target;
    const newTarget = this.getTarget();
    if (newTarget !== oldTarget) {
      if (oldTarget) {
        oldTarget.removeAttribute("aria-describedby");
      }
      newTarget.setAttribute("aria-describedby", this.componentId);
    }
  }
  hasTrigger(triggerType) {
    const triggers = this.trigger.split(" ");
    return triggers.includes(triggerType);
  }
  syncOptions() {
    if (this.popover) {
      this.popover.setOptions({
        placement: this.placement,
        strategy: "absolute",
        modifiers: [
          {
            name: "flip",
            options: {
              boundary: "viewport"
            }
          },
          {
            name: "offset",
            options: {
              offset: [this.skidding, this.distance]
            }
          }
        ]
      });
    }
  }
  render() {
    return T`
      <slot @slotchange=${this.handleSlotChange}></slot>

      <div class="tooltip-positioner">
        <div
          part="base"
          id=${this.componentId}
          class=${e2$1({
      tooltip: true,
      "tooltip--open": this.open
    })}
          role="tooltip"
          aria-hidden=${this.open ? "false" : "true"}
        >
          <slot name="content">${this.content}</slot>
        </div>
      </div>
    `;
  }
};
SlTooltip.styles = tooltip_styles_default;
__decorateClass([
  o2$1(".tooltip-positioner")
], SlTooltip.prototype, "positioner", 2);
__decorateClass([
  o2$1(".tooltip")
], SlTooltip.prototype, "tooltip", 2);
__decorateClass([
  e()
], SlTooltip.prototype, "content", 2);
__decorateClass([
  e()
], SlTooltip.prototype, "placement", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTooltip.prototype, "disabled", 2);
__decorateClass([
  e({ type: Number })
], SlTooltip.prototype, "distance", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTooltip.prototype, "open", 2);
__decorateClass([
  e({ type: Number })
], SlTooltip.prototype, "skidding", 2);
__decorateClass([
  e()
], SlTooltip.prototype, "trigger", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlTooltip.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("placement"),
  watch("distance"),
  watch("skidding")
], SlTooltip.prototype, "handleOptionsChange", 1);
__decorateClass([
  watch("disabled")
], SlTooltip.prototype, "handleDisabledChange", 1);
SlTooltip = __decorateClass([
  n("sl-tooltip")
], SlTooltip);
var tooltip_default = SlTooltip;
setDefaultAnimation("tooltip.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 150, easing: "ease" }
});
setDefaultAnimation("tooltip.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: { duration: 150, easing: "ease" }
});

// src/components/range/range.styles.ts
var range_styles_default = i$1`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    --thumb-size: 20px;
    --tooltip-offset-y: 10px;
    --track-color: rgb(var(--sl-color-neutral-200));
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    -webkit-appearance: none;
    width: 100%;
    height: var(--sl-input-height-medium);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: rgb(var(--sl-color-primary-600));
    border: solid var(--sl-input-border-width) rgb(var(--sl-color-primary-600));
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow, var(--sl-transition-fast) transform;
    cursor: pointer;
  }

  .range__control:not(:disabled)::-webkit-slider-thumb:hover {
    background-color: rgb(var(--sl-color-primary-500));
    border-color: rgb(var(--sl-color-primary-500));
  }

  .range__control:not(:disabled)${focusVisibleSelector}::-webkit-slider-thumb {
    background-color: rgb(var(--sl-color-primary-500));
    border-color: rgb(var(--sl-color-primary-500));
    box-shadow: var(--sl-focus-ring);
  }

  .range__control:not(:disabled)::-webkit-slider-thumb:active {
    background-color: rgb(var(--sl-color-primary-500));
    border-color: rgb(var(--sl-color-primary-500));
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: rgb(var(--sl-color-primary-600));
    border-color: rgb(var(--sl-color-primary-600));
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow, var(--sl-transition-fast) transform;
    cursor: pointer;
  }

  .range__control:not(:disabled)::-moz-range-thumb:hover {
    background-color: rgb(var(--sl-color-primary-500));
    border-color: rgb(var(--sl-color-primary-500));
  }

  .range__control:not(:disabled)${focusVisibleSelector}::-moz-range-thumb {
    background-color: rgb(var(--sl-color-primary-500));
    border-color: rgb(var(--sl-color-primary-500));
    box-shadow: var(--sl-focus-ring);
  }

  .range__control:not(:disabled)::-moz-range-thumb:active {
    background-color: rgb(var(--sl-color-primary-500));
    border-color: rgb(var(--sl-color-primary-500));
    cursor: grabbing;
  }

  /* States */
  .range__control${focusVisibleSelector} {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 1px;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: rgb(var(--sl-tooltip-background-color));
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: rgb(var(--sl-tooltip-color));
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    margin-left: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset-y));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid rgb(var(--sl-tooltip-background-color));
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset-y));
  }
  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid rgb(var(--sl-tooltip-background-color));
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }
`;

// src/components/range/range.ts
var id$8 = 0;
var SlRange = class extends h3 {
  constructor() {
    super(...arguments);
    this.inputId = `input-${++id$8}`;
    this.helpTextId = `input-help-text-${id$8}`;
    this.labelId = `input-label-${id$8}`;
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasLabelSlot = false;
    this.hasTooltip = false;
    this.name = "";
    this.value = 0;
    this.label = "";
    this.helpText = "";
    this.disabled = false;
    this.invalid = false;
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.tooltip = "top";
    this.tooltipFormatter = (value) => value.toString();
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange;
    this.resizeObserver = new ResizeObserver(() => this.syncTooltip());
    this.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
    if (this.value === void 0 || this.value === null)
      this.value = this.min;
    if (this.value < this.min)
      this.value = this.min;
    if (this.value > this.max)
      this.value = this.max;
    this.handleSlotChange();
    this.updateComplete.then(() => {
      this.syncTooltip();
      this.resizeObserver.observe(this.input);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
    this.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  handleInput() {
    this.value = Number(this.input.value);
    emit(this, "sl-change");
    requestAnimationFrame(() => this.syncTooltip());
  }
  handleBlur() {
    this.hasFocus = false;
    this.hasTooltip = false;
    emit(this, "sl-blur");
  }
  handleDisabledChange() {
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  handleFocus() {
    this.hasFocus = true;
    this.hasTooltip = true;
    emit(this, "sl-focus");
  }
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, "help-text");
    this.hasLabelSlot = hasSlot(this, "label");
  }
  handleThumbDragStart() {
    this.hasTooltip = true;
  }
  handleThumbDragEnd() {
    this.hasTooltip = false;
  }
  syncTooltip() {
    if (this.tooltip !== "none") {
      const percent = Math.max(0, (this.value - this.min) / (this.max - this.min));
      const inputWidth = this.input.offsetWidth;
      const tooltipWidth = this.output.offsetWidth;
      const thumbSize = getComputedStyle(this.input).getPropertyValue("--thumb-size");
      const x = `calc(${inputWidth * percent}px - calc(calc(${percent} * ${thumbSize}) - calc(${thumbSize} / 2)))`;
      this.output.style.transform = `translateX(${x})`;
      this.output.style.marginLeft = `-${tooltipWidth / 2}px`;
    }
  }
  render() {
    return renderFormControl({
      inputId: this.inputId,
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpTextId: this.helpTextId,
      helpText: this.helpText,
      hasHelpTextSlot: this.hasHelpTextSlot,
      size: "medium"
    }, T`
        <div
          part="base"
          class=${e2$1({
      range: true,
      "range--disabled": this.disabled,
      "range--focused": this.hasFocus,
      "range--tooltip-visible": this.hasTooltip,
      "range--tooltip-top": this.tooltip === "top",
      "range--tooltip-bottom": this.tooltip === "bottom"
    })}
          @mousedown=${this.handleThumbDragStart}
          @mouseup=${this.handleThumbDragEnd}
          @touchstart=${this.handleThumbDragStart}
          @touchend=${this.handleThumbDragEnd}
        >
          <input
            part="input"
            type="range"
            class="range__control"
            name=${l(this.name)}
            ?disabled=${this.disabled}
            min=${l(this.min)}
            max=${l(this.max)}
            step=${l(this.step)}
            .value=${l$1(String(this.value))}
            aria-labelledby=${l(getLabelledBy({
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpText: this.helpText,
      helpTextId: this.helpTextId,
      hasHelpTextSlot: this.hasHelpTextSlot
    }))}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
          ${this.tooltip !== "none" ? T` <output part="tooltip" class="range__tooltip"> ${this.tooltipFormatter(this.value)} </output> ` : ""}
        </div>
      `);
  }
};
SlRange.styles = range_styles_default;
__decorateClass([
  o2$1(".range__control")
], SlRange.prototype, "input", 2);
__decorateClass([
  o2$1(".range__tooltip")
], SlRange.prototype, "output", 2);
__decorateClass([
  r()
], SlRange.prototype, "hasFocus", 2);
__decorateClass([
  r()
], SlRange.prototype, "hasHelpTextSlot", 2);
__decorateClass([
  r()
], SlRange.prototype, "hasLabelSlot", 2);
__decorateClass([
  r()
], SlRange.prototype, "hasTooltip", 2);
__decorateClass([
  e()
], SlRange.prototype, "name", 2);
__decorateClass([
  e({ type: Number })
], SlRange.prototype, "value", 2);
__decorateClass([
  e()
], SlRange.prototype, "label", 2);
__decorateClass([
  e({ attribute: "help-text" })
], SlRange.prototype, "helpText", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRange.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRange.prototype, "invalid", 2);
__decorateClass([
  e({ type: Number })
], SlRange.prototype, "min", 2);
__decorateClass([
  e({ type: Number })
], SlRange.prototype, "max", 2);
__decorateClass([
  e({ type: Number })
], SlRange.prototype, "step", 2);
__decorateClass([
  e()
], SlRange.prototype, "tooltip", 2);
__decorateClass([
  e({ attribute: false })
], SlRange.prototype, "tooltipFormatter", 2);
__decorateClass([
  watch("disabled")
], SlRange.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("label"),
  watch("helpText")
], SlRange.prototype, "handleSlotChange", 1);
SlRange = __decorateClass([
  n("sl-range")
], SlRange);
var range_default = SlRange;

// src/internal/math.ts
function clamp(value, min, max) {
  if (value < min)
    return min;
  if (value > max)
    return max;
  return value;
}

// node_modules/lit-html/directives/style-map.js
var i2 = e$2(class extends i$2 {
  constructor(t2) {
    var e2;
    if (super(t2), t2.type !== t$1.ATTRIBUTE || t2.name !== "style" || ((e2 = t2.strings) === null || e2 === void 0 ? void 0 : e2.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r) => {
      const s = t2[r];
      return s == null ? e2 : e2 + `${r = r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(e2, [r]) {
    const { style: s } = e2.element;
    if (this.ct === void 0) {
      this.ct = new Set();
      for (const t2 in r)
        this.ct.add(t2);
      return this.render(r);
    }
    this.ct.forEach((t2) => {
      r[t2] == null && (this.ct.delete(t2), t2.includes("-") ? s.removeProperty(t2) : s[t2] = "");
    });
    for (const t2 in r) {
      const e3 = r[t2];
      e3 != null && (this.ct.add(t2), t2.includes("-") ? s.setProperty(t2, e3) : s[t2] = e3);
    }
    return w;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/utilities/base-path.ts
var basePath = "";
function setBasePath(path) {
  basePath = path;
}
function getBasePath() {
  return basePath.replace(/\/$/, "");
}
var scripts = [...document.getElementsByTagName("script")];
var configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
if (configScript) {
  setBasePath(configScript.getAttribute("data-shoelace"));
} else {
  const fallbackScript = scripts.find((s) => /shoelace(\.min)?\.js$/.test(s.src));
  let path = "";
  if (fallbackScript) {
    path = fallbackScript.getAttribute("src");
  }
  setBasePath(path.split("/").slice(0, -1).join("/"));
}

// src/components/icon/library.default.ts
var library = {
  name: "default",
  resolver: (name) => `${getBasePath()}/assets/icons/${name}.svg`
};
var library_default_default = library;

// src/components/icon/library.system.ts
var icons = {
  check: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  x: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "x-circle": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `
};
var systemLibrary = {
  name: "system",
  resolver: (name) => {
    if (icons[name]) {
      return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
    } else {
      return "";
    }
  }
};
var library_system_default = systemLibrary;

// src/components/icon/library.ts
var registry = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry.filter((lib) => lib.name === name)[0];
}

// src/components/icon/request.ts
var iconFiles = new Map();
var requestIcon = (url) => {
  if (iconFiles.has(url)) {
    return iconFiles.get(url);
  } else {
    const request = fetch(url).then(async (response) => {
      if (response.ok) {
        const div = document.createElement("div");
        div.innerHTML = await response.text();
        const svg = div.firstElementChild;
        return {
          ok: response.ok,
          status: response.status,
          svg: svg && svg.tagName.toLowerCase() === "svg" ? svg.outerHTML : ""
        };
      } else {
        return {
          ok: response.ok,
          status: response.status,
          svg: null
        };
      }
    });
    iconFiles.set(url, request);
    return request;
  }
};

// node_modules/lit-html/directives/unsafe-html.js
var n2 = class extends i$2 {
  constructor(i3) {
    if (super(i3), this.it = A, i3.type !== t$1.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r2) {
    if (r2 === A)
      return this.vt = void 0, this.it = r2;
    if (r2 === w)
      return r2;
    if (typeof r2 != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r2 === this.it)
      return this.vt;
    this.it = r2;
    const s = [r2];
    return s.raw = s, this.vt = { _$litType$: this.constructor.resultType, strings: s, values: [] };
  }
};
n2.directiveName = "unsafeHTML", n2.resultType = 1;
var o = e$2(n2);

// node_modules/lit-html/directives/unsafe-svg.js
var t2 = class extends n2 {
};
t2.directiveName = "unsafeSVG", t2.resultType = 2;
var o2 = e$2(t2);

// src/components/icon/icon.styles.ts
var icon_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  .icon,
  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

// src/components/icon/icon.ts
var parser = new DOMParser();
var SlIcon = class extends h3 {
  constructor() {
    super(...arguments);
    this.svg = "";
    this.library = "default";
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated() {
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getLabel() {
    let label = "";
    if (this.label) {
      label = this.label;
    } else if (this.name) {
      label = this.name.replace(/-/g, " ");
    } else if (this.src) {
      label = this.src.replace(/.*\//, "").replace(/-/g, " ").replace(/\.svg/i, "");
    }
    return label;
  }
  getUrl() {
    const library = getIconLibrary(this.library);
    if (this.name && library) {
      return library.resolver(this.name);
    } else {
      return this.src;
    }
  }
  redraw() {
    this.setIcon();
  }
  async setIcon() {
    const library = getIconLibrary(this.library);
    const url = this.getUrl();
    if (url) {
      try {
        const file = await requestIcon(url);
        if (url !== this.getUrl()) {
          return;
        } else if (file.ok) {
          const doc = parser.parseFromString(file.svg, "text/html");
          const svgEl = doc.body.querySelector("svg");
          if (svgEl) {
            if (library && library.mutator) {
              library.mutator(svgEl);
            }
            this.svg = svgEl.outerHTML;
            emit(this, "sl-load");
          } else {
            this.svg = "";
            emit(this, "sl-error", { detail: { status: file.status } });
          }
        } else {
          this.svg = "";
          emit(this, "sl-error", { detail: { status: file.status } });
        }
      } catch (e3) {
        emit(this, "sl-error", { detail: { status: -1 } });
      }
    } else if (this.svg) {
      this.svg = "";
    }
  }
  handleChange() {
    this.setIcon();
  }
  render() {
    return T` <div part="base" class="icon" role="img" aria-label=${this.getLabel()}>${o2(this.svg)}</div>`;
  }
};
SlIcon.styles = icon_styles_default;
__decorateClass([
  r()
], SlIcon.prototype, "svg", 2);
__decorateClass([
  e()
], SlIcon.prototype, "name", 2);
__decorateClass([
  e()
], SlIcon.prototype, "src", 2);
__decorateClass([
  e()
], SlIcon.prototype, "label", 2);
__decorateClass([
  e()
], SlIcon.prototype, "library", 2);
__decorateClass([
  watch("name"),
  watch("src"),
  watch("library")
], SlIcon.prototype, "setIcon", 1);
SlIcon = __decorateClass([
  n("sl-icon")
], SlIcon);
var icon_default = SlIcon;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/components/rating/rating.styles.ts
var rating_styles_default = i$1`
  ${component_styles_default}

  :host {
    --symbol-color: rgb(var(--sl-color-neutral-300));
    --symbol-color-active: rgb(var(--sl-color-amber-500));
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating${focusVisibleSelector} {
    box-shadow: var(--sl-focus-ring);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbols--indicator {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--symbol-color-active);
    pointer-events: none;
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) transform;
  }

  .rating__symbol--hover {
    transform: scale(1.2);
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover .rating--readonly .rating__symbol--hover {
    transform: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }
`;

// src/components/rating/rating.ts
var SlRating$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.hoverValue = 0;
    this.isHovering = false;
    this.value = 0;
    this.max = 5;
    this.precision = 1;
    this.readonly = false;
    this.disabled = false;
    this.getSymbol = (value) => '<sl-icon name="star-fill" library="system"></sl-icon>';
  }
  focus(options) {
    this.rating.focus(options);
  }
  blur() {
    this.rating.blur();
  }
  getValueFromMousePosition(event) {
    return this.getValueFromXCoordinate(event.clientX);
  }
  getValueFromTouchPosition(event) {
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }
  getValueFromXCoordinate(coordinate) {
    const containerLeft = this.rating.getBoundingClientRect().left;
    const containerWidth = this.rating.getBoundingClientRect().width;
    return clamp(this.roundToPrecision((coordinate - containerLeft) / containerWidth * this.max, this.precision), 0, this.max);
  }
  handleClick(event) {
    this.setValue(this.getValueFromMousePosition(event));
  }
  setValue(newValue) {
    if (this.disabled || this.readonly) {
      return;
    }
    this.value = newValue === this.value ? 0 : newValue;
    this.isHovering = false;
  }
  handleKeyDown(event) {
    if (this.disabled || this.readonly) {
      return;
    }
    if (event.key === "ArrowLeft") {
      const decrement = event.shiftKey ? 1 : this.precision;
      this.value = Math.max(0, this.value - decrement);
      event.preventDefault();
    }
    if (event.key === "ArrowRight") {
      const increment = event.shiftKey ? 1 : this.precision;
      this.value = Math.min(this.max, this.value + increment);
      event.preventDefault();
    }
    if (event.key === "Home") {
      this.value = 0;
      event.preventDefault();
    }
    if (event.key === "End") {
      this.value = this.max;
      event.preventDefault();
    }
  }
  handleMouseEnter() {
    this.isHovering = true;
  }
  handleMouseMove(event) {
    this.hoverValue = this.getValueFromMousePosition(event);
  }
  handleMouseLeave() {
    this.isHovering = false;
  }
  handleTouchStart(event) {
    this.hoverValue = this.getValueFromTouchPosition(event);
    event.preventDefault();
  }
  handleTouchMove(event) {
    this.isHovering = true;
    this.hoverValue = this.getValueFromTouchPosition(event);
  }
  handleTouchEnd(event) {
    this.isHovering = false;
    this.setValue(this.hoverValue);
    event.preventDefault();
  }
  handleValueChange() {
    emit(this, "sl-change");
  }
  roundToPrecision(numberToRound, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }
  render() {
    const counter = Array.from(Array(this.max).keys());
    let displayValue = 0;
    if (this.disabled || this.readonly) {
      displayValue = this.value;
    } else {
      displayValue = this.isHovering ? this.hoverValue : this.value;
    }
    return T`
      <div
        part="base"
        class=${e2$1({
      rating: true,
      "rating--readonly": this.readonly,
      "rating--disabled": this.disabled
    })}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-readonly=${this.readonly ? "true" : "false"}
        aria-value=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols rating__symbols--inactive">
          ${counter.map((index) => {
      return T`
              <span
                class=${e2$1({
        rating__symbol: true,
        "rating__symbol--hover": this.isHovering && Math.ceil(displayValue) === index + 1
      })}
                role="presentation"
                @mouseenter=${this.handleMouseEnter}
              >
                ${o(this.getSymbol(index + 1))}
              </span>
            `;
    })}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${counter.map((index) => {
      return T`
              <span
                class=${e2$1({
        rating__symbol: true,
        "rating__symbol--hover": this.isHovering && Math.ceil(displayValue) === index + 1
      })}
                style=${i2({
        clipPath: displayValue > index + 1 ? "none" : `inset(0 ${100 - (displayValue - index) / 1 * 100}% 0 0)`
      })}
                role="presentation"
              >
                ${o(this.getSymbol(index + 1))}
              </span>
            `;
    })}
        </span>
      </div>
    `;
  }
};
SlRating$1.styles = rating_styles_default;
__decorateClass([
  o2$1(".rating")
], SlRating$1.prototype, "rating", 2);
__decorateClass([
  r()
], SlRating$1.prototype, "hoverValue", 2);
__decorateClass([
  r()
], SlRating$1.prototype, "isHovering", 2);
__decorateClass([
  e({ type: Number })
], SlRating$1.prototype, "value", 2);
__decorateClass([
  e({ type: Number })
], SlRating$1.prototype, "max", 2);
__decorateClass([
  e({ type: Number })
], SlRating$1.prototype, "precision", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRating$1.prototype, "readonly", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRating$1.prototype, "disabled", 2);
__decorateClass([
  e()
], SlRating$1.prototype, "getSymbol", 2);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlRating$1.prototype, "handleValueChange", 1);
SlRating$1 = __decorateClass([
  n("sl-rating")
], SlRating$1);
var rating_default = SlRating$1;

// src/components/relative-time/relative-time.ts
var SlRelativeTime = class extends h3 {
  constructor() {
    super(...arguments);
    this.isoTime = "";
    this.relativeTime = "";
    this.titleTime = "";
    this.format = "long";
    this.numeric = "auto";
    this.sync = false;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.updateTimeout);
  }
  updateTime() {
    const now = new Date();
    const date = new Date(this.date);
    if (isNaN(date.getMilliseconds())) {
      this.relativeTime = "";
      this.isoTime = "";
      return;
    }
    const diff = +date - +now;
    const availableUnits = [
      { max: 276e4, value: 6e4, unit: "minute" },
      { max: 72e6, value: 36e5, unit: "hour" },
      { max: 5184e5, value: 864e5, unit: "day" },
      { max: 24192e5, value: 6048e5, unit: "week" },
      { max: 28512e6, value: 2592e6, unit: "month" },
      { max: Infinity, value: 31536e6, unit: "year" }
    ];
    const { unit, value } = availableUnits.find((unit2) => Math.abs(diff) < unit2.max);
    this.isoTime = date.toISOString();
    this.titleTime = new Intl.DateTimeFormat(this.locale, {
      month: "long",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short"
    }).format(date);
    this.relativeTime = new Intl.RelativeTimeFormat(this.locale, {
      numeric: this.numeric,
      style: this.format
    }).format(Math.round(diff / value), unit);
    clearTimeout(this.updateTimeout);
    if (this.sync) {
      const getTimeUntilNextUnit = (unit2) => {
        const units = { second: 1e3, minute: 6e4, hour: 36e5, day: 864e5 };
        const value2 = units[unit2];
        return value2 - now.getTime() % value2;
      };
      let nextInterval;
      if (unit === "minute") {
        nextInterval = getTimeUntilNextUnit("second");
      } else if (unit === "hour") {
        nextInterval = getTimeUntilNextUnit("minute");
      } else if (unit === "day") {
        nextInterval = getTimeUntilNextUnit("hour");
      } else {
        nextInterval = getTimeUntilNextUnit("day");
      }
      this.updateTimeout = setTimeout(() => this.updateTime(), nextInterval);
    }
  }
  render() {
    return T` <time datetime=${this.isoTime} title=${this.titleTime}>${this.relativeTime}</time> `;
  }
};
__decorateClass([
  r()
], SlRelativeTime.prototype, "isoTime", 2);
__decorateClass([
  r()
], SlRelativeTime.prototype, "relativeTime", 2);
__decorateClass([
  r()
], SlRelativeTime.prototype, "titleTime", 2);
__decorateClass([
  e()
], SlRelativeTime.prototype, "date", 2);
__decorateClass([
  e()
], SlRelativeTime.prototype, "locale", 2);
__decorateClass([
  e()
], SlRelativeTime.prototype, "format", 2);
__decorateClass([
  e()
], SlRelativeTime.prototype, "numeric", 2);
__decorateClass([
  e({ type: Boolean })
], SlRelativeTime.prototype, "sync", 2);
__decorateClass([
  watch("date"),
  watch("locale"),
  watch("format"),
  watch("numeric"),
  watch("sync")
], SlRelativeTime.prototype, "updateTime", 1);
SlRelativeTime = __decorateClass([
  n("sl-relative-time")
], SlRelativeTime);
var relative_time_default = SlRelativeTime;

// src/components/resize-observer/resize-observer.styles.ts
var resize_observer_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: contents;
  }
`;

// src/components/resize-observer/resize-observer.ts
var SlResizeObserver = class extends h3 {
  constructor() {
    super(...arguments);
    this.observedElements = [];
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver((entries) => {
      emit(this, "sl-resize", { detail: { entries } });
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
  }
  handleSlotChange() {
    const slot = this.shadowRoot.querySelector("slot");
    const elements = slot.assignedElements({ flatten: true });
    this.observedElements.map((el) => this.resizeObserver.unobserve(el));
    this.observedElements = [];
    elements.map((el) => {
      this.resizeObserver.observe(el);
      this.observedElements.push(el);
    });
  }
  render() {
    return T` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
};
SlResizeObserver.styles = resize_observer_styles_default;
SlResizeObserver = __decorateClass([
  n("sl-resize-observer")
], SlResizeObserver);
var resize_observer_default = SlResizeObserver;

// src/components/responsive-media/responsive-media.styles.ts
var responsive_media_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: block;
  }

  .responsive-media {
    position: relative;
  }

  .responsive-media ::slotted(*) {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  .responsive-media--cover ::slotted(embed),
  .responsive-media--cover ::slotted(iframe),
  .responsive-media--cover ::slotted(img),
  .responsive-media--cover ::slotted(video) {
    object-fit: cover !important;
  }

  .responsive-media--contain ::slotted(embed),
  .responsive-media--contain ::slotted(iframe),
  .responsive-media--contain ::slotted(img),
  .responsive-media--contain ::slotted(video) {
    object-fit: contain !important;
  }
`;

// src/components/responsive-media/responsive-media.ts
var SlResponsiveMedia = class extends h3 {
  constructor() {
    super(...arguments);
    this.aspectRatio = "16:9";
    this.fit = "cover";
  }
  render() {
    const split = this.aspectRatio.split(":");
    const x = parseInt(split[0]);
    const y = parseInt(split[1]);
    const paddingBottom = x && y ? `${y / x * 100}%` : "0";
    return T`
      <div
        class=${e2$1({
      "responsive-media": true,
      "responsive-media--cover": this.fit === "cover",
      "responsive-media--contain": this.fit === "contain"
    })}
        style="padding-bottom: ${paddingBottom}"
      >
        <slot></slot>
      </div>
    `;
  }
};
SlResponsiveMedia.styles = responsive_media_styles_default;
__decorateClass([
  e({ attribute: "aspect-ratio" })
], SlResponsiveMedia.prototype, "aspectRatio", 2);
__decorateClass([
  e()
], SlResponsiveMedia.prototype, "fit", 2);
SlResponsiveMedia = __decorateClass([
  n("sl-responsive-media")
], SlResponsiveMedia);
var responsive_media_default = SlResponsiveMedia;

// src/components/select/select.styles.ts
var select_styles_default = i$1`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .select {
    display: block;
  }

  .select__box {
    display: inline-flex;
    align-items: center;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    background-color: rgb(var(--sl-input-background-color));
    border: solid var(--sl-input-border-width) rgb(var(--sl-input-border-color));
    vertical-align: middle;
    overflow: hidden;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .select:not(.select--disabled) .select__box:hover {
    background-color: rgb(var(--sl-input-background-color-hover));
    border-color: rgb(var(--sl-input-border-color-hover));
    color: rgb(var(--sl-input-color-hover));
  }

  .select.select--focused:not(.select--disabled) .select__box {
    background-color: rgb(var(--sl-input-background-color-focus));
    border-color: rgb(var(--sl-input-border-color-focus));
    box-shadow: var(--sl-focus-ring);
    outline: none;
    color: rgb(var(--sl-input-color-focus));
  }

  .select--disabled .select__box {
    background-color: rgb(var(--sl-input-background-color-disabled));
    border-color: rgb(var(--sl-input-border-color-disabled));
    color: rgb(var(--sl-input-color-disabled));
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--disabled .select__tags,
  .select--disabled .select__clear {
    pointer-events: none;
  }

  .select__prefix {
    display: inline-flex;
    align-items: center;
    color: rgb(var(--sl-input-placeholder-color));
  }

  .select__label {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    user-select: none;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .select__label::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .select__clear {
    flex: 0 0 auto;
    width: 1.25em;
  }

  .select__suffix {
    display: inline-flex;
    align-items: center;
    color: rgb(var(--sl-input-placeholder-color));
  }

  .select__icon {
    flex: 0 0 auto;
    display: inline-flex;
    transition: var(--sl-transition-medium) transform ease;
  }

  .select--open .select__icon {
    transform: rotate(-180deg);
  }

  /* Placeholder */
  .select--placeholder-visible .select__label {
    color: rgb(var(--sl-input-placeholder-color));
  }

  .select--disabled.select--placeholder-visible .select__label {
    color: rgb(var(--sl-input-placeholder-color-disabled));
  }

  /* Tags */
  .select__tags {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: left;
    margin-left: var(--sl-spacing-2x-small);
  }

  /* Hidden input (for form control validation to show) */
  .select__hidden-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }

  /*
   * Size modifiers
   */

  /* Small */
  .select--small .select__box {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
  }

  .select--small .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-small);
  }

  .select--small .select__label {
    margin: 0 var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__icon {
    margin-right: var(--sl-input-spacing-small);
  }

  .select--small .select__tags {
    padding-bottom: 2px;
  }

  .select--small .select__tags sl-tag {
    padding-top: 2px;
  }

  .select--small .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--small.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Medium */
  .select--medium .select__box {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
  }

  .select--medium .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-medium);
  }

  .select--medium .select__label {
    margin: 0 var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__icon {
    margin-right: var(--sl-input-spacing-medium);
  }

  .select--medium .select__tags {
    padding-bottom: 3px;
  }

  .select--medium .select__tags sl-tag {
    padding-top: 3px;
  }

  .select--medium .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--medium.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Large */
  .select--large .select__box {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
  }

  .select--large .select__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-large);
  }

  .select--large .select__label {
    margin: 0 var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__icon {
    margin-right: var(--sl-input-spacing-large);
  }

  .select--large .select__tags {
    padding-bottom: 4px;
  }
  .select--large .select__tags sl-tag {
    padding-top: 4px;
  }

  .select--large .select__tags sl-tag:not(:last-of-type) {
    margin-right: var(--sl-spacing-2x-small);
  }

  .select--large.select--has-tags .select__label {
    margin-left: 0;
  }

  /*
   * Pill modifier
   */
  .select--pill.select--small .select__box {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__box {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__box {
    border-radius: var(--sl-input-height-large);
  }
`;

// src/components/select/select.ts
var id$7 = 0;
var SlSelect$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.inputId = `select-${++id$7}`;
    this.helpTextId = `select-help-text-${id$7}`;
    this.labelId = `select-label-${id$7}`;
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasLabelSlot = false;
    this.isOpen = false;
    this.displayLabel = "";
    this.displayTags = [];
    this.multiple = false;
    this.maxTagsVisible = 3;
    this.disabled = false;
    this.name = "";
    this.placeholder = "";
    this.size = "medium";
    this.hoist = false;
    this.value = "";
    this.pill = false;
    this.required = false;
    this.clearable = false;
    this.invalid = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());
    this.updateComplete.then(() => {
      this.resizeObserver.observe(this);
      this.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
      this.syncItemsFromValue();
    });
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this);
    this.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  getItemLabel(item) {
    const slot = item.shadowRoot.querySelector("slot:not([name])");
    return getTextContent(slot);
  }
  getItems() {
    return [...this.querySelectorAll("sl-menu-item")];
  }
  getValueAsArray() {
    if (this.multiple && this.value === "") {
      return [];
    }
    return Array.isArray(this.value) ? this.value : [this.value];
  }
  handleBlur() {
    if (!this.isOpen) {
      this.hasFocus = false;
      emit(this, "sl-blur");
    }
  }
  handleClearClick(event) {
    event.stopPropagation();
    this.value = this.multiple ? [] : "";
    emit(this, "sl-clear");
    this.syncItemsFromValue();
  }
  handleDisabledChange() {
    if (this.disabled && this.isOpen) {
      this.dropdown.hide();
    }
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  handleFocus() {
    if (!this.hasFocus) {
      this.hasFocus = true;
      emit(this, "sl-focus");
    }
  }
  handleKeyDown(event) {
    const target = event.target;
    const items = this.getItems();
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    if (target.tagName.toLowerCase() === "sl-tag") {
      return;
    }
    if (event.key === "Tab") {
      if (this.isOpen) {
        this.dropdown.hide();
      }
      return;
    }
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      if (!this.isOpen) {
        this.dropdown.show();
      }
      if (event.key === "ArrowDown" && firstItem) {
        this.menu.setCurrentItem(firstItem);
        firstItem.focus();
        return;
      }
      if (event.key === "ArrowUp" && lastItem) {
        this.menu.setCurrentItem(lastItem);
        lastItem.focus();
        return;
      }
    }
    if (event.ctrlKey || event.metaKey) {
      return;
    }
    if (!this.isOpen && event.key.length === 1) {
      event.stopPropagation();
      event.preventDefault();
      this.dropdown.show();
      this.menu.typeToSelect(event.key);
    }
  }
  handleLabelClick() {
    var _a;
    const box = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".select__box");
    box.focus();
  }
  handleMenuSelect(event) {
    var _a;
    const item = event.detail.item;
    if (this.multiple) {
      this.value = ((_a = this.value) == null ? void 0 : _a.includes(item.value)) ? this.value.filter((v) => v !== item.value) : [...this.value, item.value];
    } else {
      this.value = item.value;
    }
    this.syncItemsFromValue();
  }
  handleMenuShow() {
    this.resizeMenu();
    this.isOpen = true;
  }
  handleMenuHide() {
    this.isOpen = false;
    this.box.focus();
  }
  handleMultipleChange() {
    const value = this.getValueAsArray();
    this.value = this.multiple ? value : value[0] || "";
    this.syncItemsFromValue();
  }
  async handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, "help-text");
    this.hasLabelSlot = hasSlot(this, "label");
    const items = this.getItems();
    const values = [];
    items.map((item) => {
      if (values.includes(item.value)) {
        console.error(`Duplicate value found in <sl-select> menu item: '${item.value}'`, item);
      }
      values.push(item.value);
    });
    await Promise.all(items.map((item) => item.render)).then(() => this.syncItemsFromValue());
  }
  handleTagInteraction(event) {
    const path = event.composedPath();
    const clearButton = path.find((el) => {
      if (el instanceof HTMLElement) {
        const element = el;
        return element.classList.contains("tag__clear");
      }
      return false;
    });
    if (clearButton) {
      event.stopPropagation();
    }
  }
  async handleValueChange() {
    this.syncItemsFromValue();
    await this.updateComplete;
    this.invalid = !this.input.checkValidity();
    emit(this, "sl-change");
  }
  resizeMenu() {
    var _a;
    const box = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".select__box");
    this.menu.style.width = `${box.clientWidth}px`;
    if (this.dropdown) {
      this.dropdown.reposition();
    }
  }
  syncItemsFromValue() {
    const items = this.getItems();
    const value = this.getValueAsArray();
    items.map((item) => item.checked = value.includes(item.value));
    if (this.multiple) {
      const checkedItems = items.filter((item) => value.includes(item.value));
      this.displayLabel = checkedItems[0] ? this.getItemLabel(checkedItems[0]) : "";
      this.displayTags = checkedItems.map((item) => {
        return T`
          <sl-tag
            exportparts="base:tag"
            type="neutral"
            size=${this.size}
            ?pill=${this.pill}
            clearable
            @click=${this.handleTagInteraction}
            @keydown=${this.handleTagInteraction}
            @sl-clear=${(event) => {
          event.stopPropagation();
          if (!this.disabled) {
            item.checked = false;
            this.syncValueFromItems();
          }
        }}
          >
            ${this.getItemLabel(item)}
          </sl-tag>
        `;
      });
      if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
        const total = this.displayTags.length;
        this.displayLabel = "";
        this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
        this.displayTags.push(T`
          <sl-tag exportparts="base:tag" type="neutral" size=${this.size}> +${total - this.maxTagsVisible} </sl-tag>
        `);
      }
    } else {
      const checkedItem = items.filter((item) => item.value === value[0])[0];
      this.displayLabel = checkedItem ? this.getItemLabel(checkedItem) : "";
      this.displayTags = [];
    }
  }
  syncValueFromItems() {
    const items = this.getItems();
    const checkedItems = items.filter((item) => item.checked);
    const checkedValues = checkedItems.map((item) => item.value);
    if (this.multiple) {
      this.value = this.value.filter((val) => checkedValues.includes(val));
    } else {
      this.value = checkedValues.length > 0 ? checkedValues[0] : "";
    }
  }
  render() {
    var _a, _b;
    const hasSelection = this.multiple ? ((_a = this.value) == null ? void 0 : _a.length) > 0 : this.value !== "";
    return renderFormControl({
      inputId: this.inputId,
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpTextId: this.helpTextId,
      helpText: this.helpText,
      hasHelpTextSlot: this.hasHelpTextSlot,
      size: this.size,
      onLabelClick: () => this.handleLabelClick()
    }, T`
        <sl-dropdown
          part="base"
          .hoist=${this.hoist}
          .stayOpenOnSelect=${this.multiple}
          .containingElement=${this}
          ?disabled=${this.disabled}
          class=${e2$1({
      select: true,
      "select--open": this.isOpen,
      "select--empty": ((_b = this.value) == null ? void 0 : _b.length) === 0,
      "select--focused": this.hasFocus,
      "select--clearable": this.clearable,
      "select--disabled": this.disabled,
      "select--multiple": this.multiple,
      "select--has-tags": this.multiple && this.displayTags.length > 0,
      "select--placeholder-visible": this.displayLabel === "",
      "select--small": this.size === "small",
      "select--medium": this.size === "medium",
      "select--large": this.size === "large",
      "select--pill": this.pill,
      "select--invalid": this.invalid
    })}
          @sl-show=${this.handleMenuShow}
          @sl-hide=${this.handleMenuHide}
        >
          <div
            slot="trigger"
            id=${this.inputId}
            class="select__box"
            role="combobox"
            aria-labelledby=${l(getLabelledBy({
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpText: this.helpText,
      helpTextId: this.helpTextId,
      hasHelpTextSlot: this.hasHelpTextSlot
    }))}
            aria-haspopup="true"
            aria-expanded=${this.isOpen ? "true" : "false"}
            tabindex=${this.disabled ? "-1" : "0"}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          >
            <span part="prefix" class="select__prefix">
              <slot name="prefix"></slot>
            </span>

            <div class="select__label">
              ${this.displayTags.length ? T` <span part="tags" class="select__tags"> ${this.displayTags} </span> ` : this.displayLabel || this.placeholder}
            </div>

            ${this.clearable && hasSelection ? T`
                  <sl-icon-button
                    exportparts="base:clear-button"
                    class="select__clear"
                    name="x-circle"
                    library="system"
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  ></sl-icon-button>
                ` : ""}

            <span part="suffix" class="select__suffix">
              <slot name="suffix"></slot>
            </span>

            <span part="icon" class="select__icon" aria-hidden="true">
              <sl-icon name="chevron-down" library="system"></sl-icon>
            </span>

            <!-- The hidden input tricks the browser's built-in validation so it works as expected. We use an input
            instead of a select because, otherwise, iOS will show a list of options during validation. -->
            <input
              class="select__hidden-select"
              aria-hidden="true"
              ?required=${this.required}
              .value=${hasSelection ? "1" : ""}
              tabindex="-1"
            />
          </div>

          <sl-menu part="menu" class="select__menu" @sl-select=${this.handleMenuSelect}>
            <slot @slotchange=${this.handleSlotChange}></slot>
          </sl-menu>
        </sl-dropdown>
      `);
  }
};
SlSelect$1.styles = select_styles_default;
__decorateClass([
  o2$1(".select")
], SlSelect$1.prototype, "dropdown", 2);
__decorateClass([
  o2$1(".select__box")
], SlSelect$1.prototype, "box", 2);
__decorateClass([
  o2$1(".select__hidden-select")
], SlSelect$1.prototype, "input", 2);
__decorateClass([
  o2$1(".select__menu")
], SlSelect$1.prototype, "menu", 2);
__decorateClass([
  r()
], SlSelect$1.prototype, "hasFocus", 2);
__decorateClass([
  r()
], SlSelect$1.prototype, "hasHelpTextSlot", 2);
__decorateClass([
  r()
], SlSelect$1.prototype, "hasLabelSlot", 2);
__decorateClass([
  r()
], SlSelect$1.prototype, "isOpen", 2);
__decorateClass([
  r()
], SlSelect$1.prototype, "displayLabel", 2);
__decorateClass([
  r()
], SlSelect$1.prototype, "displayTags", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSelect$1.prototype, "multiple", 2);
__decorateClass([
  e({ attribute: "max-tags-visible", type: Number })
], SlSelect$1.prototype, "maxTagsVisible", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSelect$1.prototype, "disabled", 2);
__decorateClass([
  e()
], SlSelect$1.prototype, "name", 2);
__decorateClass([
  e()
], SlSelect$1.prototype, "placeholder", 2);
__decorateClass([
  e()
], SlSelect$1.prototype, "size", 2);
__decorateClass([
  e({ type: Boolean })
], SlSelect$1.prototype, "hoist", 2);
__decorateClass([
  e()
], SlSelect$1.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSelect$1.prototype, "pill", 2);
__decorateClass([
  e()
], SlSelect$1.prototype, "label", 2);
__decorateClass([
  e({ attribute: "help-text" })
], SlSelect$1.prototype, "helpText", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSelect$1.prototype, "required", 2);
__decorateClass([
  e({ type: Boolean })
], SlSelect$1.prototype, "clearable", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSelect$1.prototype, "invalid", 2);
__decorateClass([
  watch("disabled")
], SlSelect$1.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("multiple")
], SlSelect$1.prototype, "handleMultipleChange", 1);
__decorateClass([
  watch("helpText"),
  watch("label")
], SlSelect$1.prototype, "handleSlotChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlSelect$1.prototype, "handleValueChange", 1);
SlSelect$1 = __decorateClass([
  n("sl-select")
], SlSelect$1);
var select_default = SlSelect$1;

// src/components/tag/tag.styles.ts
var tag_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    cursor: default;
  }

  .tag__clear::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Type modifiers
   */

  .tag--primary {
    background-color: rgb(var(--sl-color-primary-50));
    border-color: rgb(var(--sl-color-primary-200));
    color: rgb(var(--sl-color-primary-800));
  }

  .tag--success {
    background-color: rgb(var(--sl-color-success-50));
    border-color: rgb(var(--sl-color-success-200));
    color: rgb(var(--sl-color-success-800));
  }

  .tag--neutral {
    background-color: rgb(var(--sl-color-neutral-50));
    border-color: rgb(var(--sl-color-neutral-200));
    color: rgb(var(--sl-color-neutral-800));
  }

  .tag--warning {
    background-color: rgb(var(--sl-color-warning-50));
    border-color: rgb(var(--sl-color-warning-200));
    color: rgb(var(--sl-color-warning-800));
  }

  .tag--danger {
    background-color: rgb(var(--sl-color-danger-50));
    border-color: rgb(var(--sl-color-danger-200));
    color: rgb(var(--sl-color-danger-800));
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--small .tag__clear {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-3x-small));
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag__clear {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-2x-small));
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__clear {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-x-small));
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;

// src/components/tag/tag.ts
var SlTag$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.type = "primary";
    this.size = "medium";
    this.pill = false;
    this.clearable = false;
  }
  handleClearClick() {
    emit(this, "sl-clear");
  }
  render() {
    return T`
      <span
        part="base"
        class=${e2$1({
      tag: true,
      "tag--primary": this.type === "primary",
      "tag--success": this.type === "success",
      "tag--neutral": this.type === "neutral",
      "tag--warning": this.type === "warning",
      "tag--danger": this.type === "danger",
      "tag--text": this.type === "text",
      "tag--small": this.size === "small",
      "tag--medium": this.size === "medium",
      "tag--large": this.size === "large",
      "tag--pill": this.pill,
      "tag--clearable": this.clearable
    })}
      >
        <span part="content" class="tag__content">
          <slot></slot>
        </span>

        ${this.clearable ? T`
              <sl-icon-button
                exportparts="base:clear-button"
                name="x"
                library="system"
                class="tag__clear"
                @click=${this.handleClearClick}
              ></sl-icon-button>
            ` : ""}
      </span>
    `;
  }
};
SlTag$1.styles = tag_styles_default;
__decorateClass([
  e({ reflect: true })
], SlTag$1.prototype, "type", 2);
__decorateClass([
  e({ reflect: true })
], SlTag$1.prototype, "size", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTag$1.prototype, "pill", 2);
__decorateClass([
  e({ type: Boolean })
], SlTag$1.prototype, "clearable", 2);
SlTag$1 = __decorateClass([
  n("sl-tag")
], SlTag$1);
var tag_default = SlTag$1;

// src/components/skeleton/skeleton.styles.ts
var skeleton_styles_default = i$1`
  ${component_styles_default}

  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: rgb(var(--sl-color-neutral-200));
    --sheen-color: rgb(var(--sl-color-neutral-300));

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;

// src/components/skeleton/skeleton.ts
var SlSkeleton = class extends h3 {
  constructor() {
    super(...arguments);
    this.effect = "none";
  }
  render() {
    return T`
      <div
        part="base"
        class=${e2$1({
      skeleton: true,
      "skeleton--pulse": this.effect === "pulse",
      "skeleton--sheen": this.effect === "sheen"
    })}
        aria-busy="true"
        aria-live="polite"
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `;
  }
};
SlSkeleton.styles = skeleton_styles_default;
__decorateClass([
  e()
], SlSkeleton.prototype, "effect", 2);
SlSkeleton = __decorateClass([
  n("sl-skeleton")
], SlSkeleton);
var skeleton_default = SlSkeleton;

// src/components/menu-divider/menu-divider.styles.ts
var menu_divider_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: block;
  }

  .menu-divider {
    border-top: solid 1px rgb(var(--sl-panel-border-color));
    margin: var(--sl-spacing-x-small) 0;
  }
`;

// src/components/menu-divider/menu-divider.ts
var SlMenuDivider = class extends h3 {
  render() {
    return T` <div part="base" class="menu-divider" role="separator" aria-hidden="true"></div> `;
  }
};
SlMenuDivider.styles = menu_divider_styles_default;
SlMenuDivider = __decorateClass([
  n("sl-menu-divider")
], SlMenuDivider);
var menu_divider_default = SlMenuDivider;

// src/components/menu-item/menu-item.styles.ts
var menu_item_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: block;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    text-align: left;
    color: rgb(var(--sl-color-neutral-700));
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    color: rgb(var(--sl-color-neutral-400));
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix ::slotted(*) {
    margin-right: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix ::slotted(*) {
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:focus) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item,
  :host(${focusVisibleSelector}:not(.sl-focus-invisible):not([aria-disabled='true'])) .menu-item {
    outline: none;
    background-color: rgb(var(--sl-color-primary-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .menu-item .menu-item__check {
    display: flex;
    position: absolute;
    left: 0.5em;
    top: calc(50% - 0.5em);
    visibility: hidden;
    align-items: center;
    font-size: inherit;
  }

  .menu-item--checked .menu-item__check {
    visibility: visible;
  }
`;

// src/components/menu-item/menu-item.ts
var SlMenuItem$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.value = "";
    this.disabled = false;
  }
  firstUpdated() {
    this.setAttribute("role", "menuitem");
  }
  handleCheckedChange() {
    this.setAttribute("aria-checked", String(this.checked));
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", String(this.disabled));
  }
  render() {
    return T`
      <div
        part="base"
        class=${e2$1({
      "menu-item": true,
      "menu-item--checked": this.checked,
      "menu-item--disabled": this.disabled
    })}
      >
        <sl-icon
          part="checked-icon"
          class="menu-item__check"
          name="check"
          library="system"
          aria-hidden="true"
        ></sl-icon>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix"></slot>
        </span>

        <span part="label" class="menu-item__label">
          <slot></slot>
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix"></slot>
        </span>
      </div>
    `;
  }
};
SlMenuItem$1.styles = menu_item_styles_default;
__decorateClass([
  o2$1(".menu-item")
], SlMenuItem$1.prototype, "menuItem", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlMenuItem$1.prototype, "checked", 2);
__decorateClass([
  e()
], SlMenuItem$1.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlMenuItem$1.prototype, "disabled", 2);
__decorateClass([
  watch("checked")
], SlMenuItem$1.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled")
], SlMenuItem$1.prototype, "handleDisabledChange", 1);
SlMenuItem$1 = __decorateClass([
  n("sl-menu-item")
], SlMenuItem$1);
var menu_item_default = SlMenuItem$1;

// src/components/menu-label/menu-label.styles.ts
var menu_label_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: block;
  }

  .menu-label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: rgb(var(--sl-color-neutral-500));
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
  }
`;

// src/components/menu-label/menu-label.ts
var SlMenuLabel = class extends h3 {
  render() {
    return T`
      <div part="base" class="menu-label">
        <slot></slot>
      </div>
    `;
  }
};
SlMenuLabel.styles = menu_label_styles_default;
SlMenuLabel = __decorateClass([
  n("sl-menu-label")
], SlMenuLabel);
var menu_label_default = SlMenuLabel;

// src/components/progress-bar/progress-bar.styles.ts
var progress_bar_styles_default = i$1`
  ${component_styles_default}

  :host {
    --height: 16px;
    --track-color: rgb(var(--sl-color-neutral-500) / 20%);
    --indicator-color: rgb(var(--sl-color-primary-600));
    --label-color: rgb(var(--sl-color-neutral-0));

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition: 400ms width, 400ms background-color;
    user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }
`;

// src/components/progress-bar/progress-bar.ts
var SlProgressBar = class extends h3 {
  constructor() {
    super(...arguments);
    this.percentage = 0;
    this.indeterminate = false;
  }
  render() {
    return T`
      <div
        part="base"
        class=${e2$1({
      "progress-bar": true,
      "progress-bar--indeterminate": this.indeterminate
    })}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.indeterminate ? "" : this.percentage}"
      >
        <div part="indicator" class="progress-bar__indicator" style=${i2({ width: this.percentage + "%" })}>
          ${!this.indeterminate ? T`
                <span part="label" class="progress-bar__label">
                  <slot></slot>
                </span>
              ` : ""}
        </div>
      </div>
    `;
  }
};
SlProgressBar.styles = progress_bar_styles_default;
__decorateClass([
  e({ type: Number, reflect: true })
], SlProgressBar.prototype, "percentage", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlProgressBar.prototype, "indeterminate", 2);
SlProgressBar = __decorateClass([
  n("sl-progress-bar")
], SlProgressBar);
var progress_bar_default = SlProgressBar;

// src/components/progress-ring/progress-ring.styles.ts
var progress_ring_styles_default = i$1`
  ${component_styles_default}

  :host {
    --track-color: rgb(var(--sl-color-neutral-500) / 20%);
    --indicator-color: rgb(var(--sl-color-primary-600));

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .progress-ring__image {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  .progress-ring__track {
    stroke: var(--track-color);
  }

  .progress-ring__indicator {
    stroke: var(--indicator-color);
    transition: 0.35s stroke-dashoffset, 0.35s stroke;
  }

  .progress-ring__label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
  }
`;

// src/components/progress-ring/progress-ring.ts
var SlProgressRing = class extends h3 {
  constructor() {
    super(...arguments);
    this.size = 128;
    this.strokeWidth = 4;
  }
  firstUpdated() {
    this.updateProgress();
  }
  updateProgress() {
    const radius = this.indicator.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - this.percentage / 100 * circumference;
    this.indicator.style.strokeDasharray = `${circumference} ${circumference}`;
    this.indicator.style.strokeDashoffset = `${offset}`;
  }
  render() {
    return T`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.percentage}"
      >
        <svg class="progress-ring__image" width=${this.size} height=${this.size}>
          <circle
            class="progress-ring__track"
            stroke-width="${this.strokeWidth}"
            stroke-linecap="round"
            fill="transparent"
            r=${this.size / 2 - this.strokeWidth * 2}
            cx=${this.size / 2}
            cy=${this.size / 2}
          ></circle>

          <circle
            class="progress-ring__indicator"
            stroke-width="${this.strokeWidth}"
            stroke-linecap="round"
            fill="transparent"
            r=${this.size / 2 - this.strokeWidth * 2}
            cx=${this.size / 2}
            cy=${this.size / 2}
          ></circle>
        </svg>

        <span part="label" class="progress-ring__label">
          <slot></slot>
        </span>
      </div>
    `;
  }
};
SlProgressRing.styles = progress_ring_styles_default;
__decorateClass([
  o2$1(".progress-ring__indicator")
], SlProgressRing.prototype, "indicator", 2);
__decorateClass([
  e({ type: Number })
], SlProgressRing.prototype, "size", 2);
__decorateClass([
  e({ attribute: "stroke-width", type: Number })
], SlProgressRing.prototype, "strokeWidth", 2);
__decorateClass([
  e({ type: Number, reflect: true })
], SlProgressRing.prototype, "percentage", 2);
__decorateClass([
  watch("percentage", { waitUntilFirstUpdate: true })
], SlProgressRing.prototype, "updateProgress", 1);
SlProgressRing = __decorateClass([
  n("sl-progress-ring")
], SlProgressRing);
var progress_ring_default = SlProgressRing;

var G = null;
var H = class {
};
H.render = function(w, B) {
  G(w, B);
};
self.QrCreator = H;
(function(w) {
  function B(t, c, a, e2) {
    var b = {}, h2 = w(a, c);
    h2.u(t);
    h2.J();
    e2 = e2 || 0;
    var r = h2.h(), d = h2.h() + 2 * e2;
    b.text = t;
    b.level = c;
    b.version = a;
    b.O = d;
    b.a = function(b2, a2) {
      b2 -= e2;
      a2 -= e2;
      return 0 > b2 || b2 >= r || 0 > a2 || a2 >= r ? false : h2.a(b2, a2);
    };
    return b;
  }
  function C(t, c, a, e2, b, h2, r, d, g, x) {
    function u(b2, a2, f, c2, d2, r2, g2) {
      b2 ? (t.lineTo(a2 + r2, f + g2), t.arcTo(a2, f, c2, d2, h2)) : t.lineTo(a2, f);
    }
    r ? t.moveTo(c + h2, a) : t.moveTo(c, a);
    u(d, e2, a, e2, b, -h2, 0);
    u(g, e2, b, c, b, 0, -h2);
    u(x, c, b, c, a, h2, 0);
    u(r, c, a, e2, a, 0, h2);
  }
  function z(t, c, a, e2, b, h2, r, d, g, x) {
    function u(b2, a2, c2, d2) {
      t.moveTo(b2 + c2, a2);
      t.lineTo(b2, a2);
      t.lineTo(b2, a2 + d2);
      t.arcTo(b2, a2, b2 + c2, a2, h2);
    }
    r && u(c, a, h2, h2);
    d && u(e2, a, -h2, h2);
    g && u(e2, b, -h2, -h2);
    x && u(c, b, h2, -h2);
  }
  function A(t, c) {
    var a = c.fill;
    if (typeof a === "string")
      t.fillStyle = a;
    else {
      var e2 = a.type, b = a.colorStops;
      a = a.position.map((b2) => Math.round(b2 * c.size));
      if (e2 === "linear-gradient")
        var h2 = t.createLinearGradient.apply(t, a);
      else if (e2 === "radial-gradient")
        h2 = t.createRadialGradient.apply(t, a);
      else
        throw Error("Unsupported fill");
      b.forEach(([b2, a2]) => {
        h2.addColorStop(b2, a2);
      });
      t.fillStyle = h2;
    }
  }
  function y(t, c) {
    a: {
      var a = c.text, e2 = c.v, b = c.N, h2 = c.K, r = c.P;
      b = Math.max(1, b || 1);
      for (h2 = Math.min(40, h2 || 40); b <= h2; b += 1)
        try {
          var d = B(a, e2, b, r);
          break a;
        } catch (J) {
        }
      d = void 0;
    }
    if (!d)
      return null;
    a = t.getContext("2d");
    c.background && (a.fillStyle = c.background, a.fillRect(c.left, c.top, c.size, c.size));
    e2 = d.O;
    h2 = c.size / e2;
    a.beginPath();
    for (r = 0; r < e2; r += 1)
      for (b = 0; b < e2; b += 1) {
        var g = a, x = c.left + b * h2, u = c.top + r * h2, p = r, q = b, f = d.a, k = x + h2, m = u + h2, D = p - 1, E = p + 1, n2 = q - 1, l = q + 1, y2 = Math.floor(Math.min(0.5, Math.max(0, c.R)) * h2), v2 = f(p, q), I = f(D, n2), w2 = f(D, q);
        D = f(D, l);
        var F = f(p, l);
        l = f(E, l);
        q = f(E, q);
        E = f(E, n2);
        p = f(p, n2);
        x = Math.round(x);
        u = Math.round(u);
        k = Math.round(k);
        m = Math.round(m);
        v2 ? C(g, x, u, k, m, y2, !w2 && !p, !w2 && !F, !q && !F, !q && !p) : z(g, x, u, k, m, y2, w2 && p && I, w2 && F && D, q && F && l, q && p && E);
      }
    A(a, c);
    a.fill();
    return t;
  }
  var v = { minVersion: 1, maxVersion: 40, ecLevel: "L", left: 0, top: 0, size: 200, fill: "#000", background: null, text: "no text", radius: 0.5, quiet: 0 };
  G = function(t, c) {
    var a = {};
    Object.assign(a, v, t);
    a.N = a.minVersion;
    a.K = a.maxVersion;
    a.v = a.ecLevel;
    a.left = a.left;
    a.top = a.top;
    a.size = a.size;
    a.fill = a.fill;
    a.background = a.background;
    a.text = a.text;
    a.R = a.radius;
    a.P = a.quiet;
    if (c instanceof HTMLCanvasElement) {
      if (c.width !== a.size || c.height !== a.size)
        c.width = a.size, c.height = a.size;
      c.getContext("2d").clearRect(0, 0, c.width, c.height);
      y(c, a);
    } else
      t = document.createElement("canvas"), t.width = a.size, t.height = a.size, a = y(t, a), c.appendChild(a);
  };
})(function() {
  function w(c) {
    var a = C.s(c);
    return { S: function() {
      return 4;
    }, b: function() {
      return a.length;
    }, write: function(c2) {
      for (var b = 0; b < a.length; b += 1)
        c2.put(a[b], 8);
    } };
  }
  function B() {
    var c = [], a = 0, e2 = {
      B: function() {
        return c;
      },
      c: function(b) {
        return (c[Math.floor(b / 8)] >>> 7 - b % 8 & 1) == 1;
      },
      put: function(b, h2) {
        for (var a2 = 0; a2 < h2; a2 += 1)
          e2.m((b >>> h2 - a2 - 1 & 1) == 1);
      },
      f: function() {
        return a;
      },
      m: function(b) {
        var h2 = Math.floor(a / 8);
        c.length <= h2 && c.push(0);
        b && (c[h2] |= 128 >>> a % 8);
        a += 1;
      }
    };
    return e2;
  }
  function C(c, a) {
    function e2(b2, h3) {
      for (var a2 = -1; 7 >= a2; a2 += 1)
        if (!(-1 >= b2 + a2 || d <= b2 + a2))
          for (var c2 = -1; 7 >= c2; c2 += 1)
            -1 >= h3 + c2 || d <= h3 + c2 || (r[b2 + a2][h3 + c2] = 0 <= a2 && 6 >= a2 && (c2 == 0 || c2 == 6) || 0 <= c2 && 6 >= c2 && (a2 == 0 || a2 == 6) || 2 <= a2 && 4 >= a2 && 2 <= c2 && 4 >= c2 ? true : false);
    }
    function b(b2, a2) {
      for (var f = d = 4 * c + 17, k = Array(f), m = 0; m < f; m += 1) {
        k[m] = Array(f);
        for (var p = 0; p < f; p += 1)
          k[m][p] = null;
      }
      r = k;
      e2(0, 0);
      e2(d - 7, 0);
      e2(0, d - 7);
      f = y.G(c);
      for (k = 0; k < f.length; k += 1)
        for (m = 0; m < f.length; m += 1) {
          p = f[k];
          var q = f[m];
          if (r[p][q] == null)
            for (var n2 = -2; 2 >= n2; n2 += 1)
              for (var l = -2; 2 >= l; l += 1)
                r[p + n2][q + l] = n2 == -2 || n2 == 2 || l == -2 || l == 2 || n2 == 0 && l == 0;
        }
      for (f = 8; f < d - 8; f += 1)
        r[f][6] == null && (r[f][6] = f % 2 == 0);
      for (f = 8; f < d - 8; f += 1)
        r[6][f] == null && (r[6][f] = f % 2 == 0);
      f = y.w(h2 << 3 | a2);
      for (k = 0; 15 > k; k += 1)
        m = !b2 && (f >> k & 1) == 1, r[6 > k ? k : 8 > k ? k + 1 : d - 15 + k][8] = m, r[8][8 > k ? d - k - 1 : 9 > k ? 15 - k : 14 - k] = m;
      r[d - 8][8] = !b2;
      if (7 <= c) {
        f = y.A(c);
        for (k = 0; 18 > k; k += 1)
          m = !b2 && (f >> k & 1) == 1, r[Math.floor(k / 3)][k % 3 + d - 8 - 3] = m;
        for (k = 0; 18 > k; k += 1)
          m = !b2 && (f >> k & 1) == 1, r[k % 3 + d - 8 - 3][Math.floor(k / 3)] = m;
      }
      if (g == null) {
        b2 = t.I(c, h2);
        f = B();
        for (k = 0; k < x.length; k += 1)
          m = x[k], f.put(4, 4), f.put(m.b(), y.f(4, c)), m.write(f);
        for (k = m = 0; k < b2.length; k += 1)
          m += b2[k].j;
        if (f.f() > 8 * m)
          throw Error("code length overflow. (" + f.f() + ">" + 8 * m + ")");
        for (f.f() + 4 <= 8 * m && f.put(0, 4); f.f() % 8 != 0; )
          f.m(false);
        for (; !(f.f() >= 8 * m); ) {
          f.put(236, 8);
          if (f.f() >= 8 * m)
            break;
          f.put(17, 8);
        }
        var u2 = 0;
        m = k = 0;
        p = Array(b2.length);
        q = Array(b2.length);
        for (n2 = 0; n2 < b2.length; n2 += 1) {
          var v2 = b2[n2].j, w2 = b2[n2].o - v2;
          k = Math.max(k, v2);
          m = Math.max(m, w2);
          p[n2] = Array(v2);
          for (l = 0; l < p[n2].length; l += 1)
            p[n2][l] = 255 & f.B()[l + u2];
          u2 += v2;
          l = y.C(w2);
          v2 = z(p[n2], l.b() - 1).l(l);
          q[n2] = Array(l.b() - 1);
          for (l = 0; l < q[n2].length; l += 1)
            w2 = l + v2.b() - q[n2].length, q[n2][l] = 0 <= w2 ? v2.c(w2) : 0;
        }
        for (l = f = 0; l < b2.length; l += 1)
          f += b2[l].o;
        f = Array(f);
        for (l = u2 = 0; l < k; l += 1)
          for (n2 = 0; n2 < b2.length; n2 += 1)
            l < p[n2].length && (f[u2] = p[n2][l], u2 += 1);
        for (l = 0; l < m; l += 1)
          for (n2 = 0; n2 < b2.length; n2 += 1)
            l < q[n2].length && (f[u2] = q[n2][l], u2 += 1);
        g = f;
      }
      b2 = g;
      f = -1;
      k = d - 1;
      m = 7;
      p = 0;
      a2 = y.F(a2);
      for (q = d - 1; 0 < q; q -= 2)
        for (q == 6 && --q; ; ) {
          for (n2 = 0; 2 > n2; n2 += 1)
            r[k][q - n2] == null && (l = false, p < b2.length && (l = (b2[p] >>> m & 1) == 1), a2(k, q - n2) && (l = !l), r[k][q - n2] = l, --m, m == -1 && (p += 1, m = 7));
          k += f;
          if (0 > k || d <= k) {
            k -= f;
            f = -f;
            break;
          }
        }
    }
    var h2 = A[a], r = null, d = 0, g = null, x = [], u = { u: function(b2) {
      b2 = w(b2);
      x.push(b2);
      g = null;
    }, a: function(b2, a2) {
      if (0 > b2 || d <= b2 || 0 > a2 || d <= a2)
        throw Error(b2 + "," + a2);
      return r[b2][a2];
    }, h: function() {
      return d;
    }, J: function() {
      for (var a2 = 0, h3 = 0, c2 = 0; 8 > c2; c2 += 1) {
        b(true, c2);
        var d2 = y.D(u);
        if (c2 == 0 || a2 > d2)
          a2 = d2, h3 = c2;
      }
      b(false, h3);
    } };
    return u;
  }
  function z(c, a) {
    if (typeof c.length == "undefined")
      throw Error(c.length + "/" + a);
    var e2 = function() {
      for (var b2 = 0; b2 < c.length && c[b2] == 0; )
        b2 += 1;
      for (var r = Array(c.length - b2 + a), d = 0; d < c.length - b2; d += 1)
        r[d] = c[d + b2];
      return r;
    }(), b = { c: function(b2) {
      return e2[b2];
    }, b: function() {
      return e2.length;
    }, multiply: function(a2) {
      for (var h2 = Array(b.b() + a2.b() - 1), c2 = 0; c2 < b.b(); c2 += 1)
        for (var g = 0; g < a2.b(); g += 1)
          h2[c2 + g] ^= v.i(v.g(b.c(c2)) + v.g(a2.c(g)));
      return z(h2, 0);
    }, l: function(a2) {
      if (0 > b.b() - a2.b())
        return b;
      for (var c2 = v.g(b.c(0)) - v.g(a2.c(0)), h2 = Array(b.b()), g = 0; g < b.b(); g += 1)
        h2[g] = b.c(g);
      for (g = 0; g < a2.b(); g += 1)
        h2[g] ^= v.i(v.g(a2.c(g)) + c2);
      return z(h2, 0).l(a2);
    } };
    return b;
  }
  C.s = function(c) {
    for (var a = [], e2 = 0; e2 < c.length; e2++) {
      var b = c.charCodeAt(e2);
      128 > b ? a.push(b) : 2048 > b ? a.push(192 | b >> 6, 128 | b & 63) : 55296 > b || 57344 <= b ? a.push(224 | b >> 12, 128 | b >> 6 & 63, 128 | b & 63) : (e2++, b = 65536 + ((b & 1023) << 10 | c.charCodeAt(e2) & 1023), a.push(240 | b >> 18, 128 | b >> 12 & 63, 128 | b >> 6 & 63, 128 | b & 63));
    }
    return a;
  };
  var A = { L: 1, M: 0, Q: 3, H: 2 }, y = function() {
    function c(b) {
      for (var a2 = 0; b != 0; )
        a2 += 1, b >>>= 1;
      return a2;
    }
    var a = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ], e2 = { w: function(b) {
      for (var a2 = b << 10; 0 <= c(a2) - c(1335); )
        a2 ^= 1335 << c(a2) - c(1335);
      return (b << 10 | a2) ^ 21522;
    }, A: function(b) {
      for (var a2 = b << 12; 0 <= c(a2) - c(7973); )
        a2 ^= 7973 << c(a2) - c(7973);
      return b << 12 | a2;
    }, G: function(b) {
      return a[b - 1];
    }, F: function(b) {
      switch (b) {
        case 0:
          return function(b2, a2) {
            return (b2 + a2) % 2 == 0;
          };
        case 1:
          return function(b2) {
            return b2 % 2 == 0;
          };
        case 2:
          return function(b2, a2) {
            return a2 % 3 == 0;
          };
        case 3:
          return function(b2, a2) {
            return (b2 + a2) % 3 == 0;
          };
        case 4:
          return function(b2, a2) {
            return (Math.floor(b2 / 2) + Math.floor(a2 / 3)) % 2 == 0;
          };
        case 5:
          return function(b2, a2) {
            return b2 * a2 % 2 + b2 * a2 % 3 == 0;
          };
        case 6:
          return function(b2, a2) {
            return (b2 * a2 % 2 + b2 * a2 % 3) % 2 == 0;
          };
        case 7:
          return function(b2, a2) {
            return (b2 * a2 % 3 + (b2 + a2) % 2) % 2 == 0;
          };
        default:
          throw Error("bad maskPattern:" + b);
      }
    }, C: function(b) {
      for (var a2 = z([1], 0), c2 = 0; c2 < b; c2 += 1)
        a2 = a2.multiply(z([1, v.i(c2)], 0));
      return a2;
    }, f: function(b, a2) {
      if (b != 4 || 1 > a2 || 40 < a2)
        throw Error("mode: " + b + "; type: " + a2);
      return 10 > a2 ? 8 : 16;
    }, D: function(b) {
      for (var a2 = b.h(), c2 = 0, d = 0; d < a2; d += 1)
        for (var g = 0; g < a2; g += 1) {
          for (var e3 = 0, t2 = b.a(d, g), p = -1; 1 >= p; p += 1)
            if (!(0 > d + p || a2 <= d + p))
              for (var q = -1; 1 >= q; q += 1)
                0 > g + q || a2 <= g + q || (p != 0 || q != 0) && t2 == b.a(d + p, g + q) && (e3 += 1);
          5 < e3 && (c2 += 3 + e3 - 5);
        }
      for (d = 0; d < a2 - 1; d += 1)
        for (g = 0; g < a2 - 1; g += 1)
          if (e3 = 0, b.a(d, g) && (e3 += 1), b.a(d + 1, g) && (e3 += 1), b.a(d, g + 1) && (e3 += 1), b.a(d + 1, g + 1) && (e3 += 1), e3 == 0 || e3 == 4)
            c2 += 3;
      for (d = 0; d < a2; d += 1)
        for (g = 0; g < a2 - 6; g += 1)
          b.a(d, g) && !b.a(d, g + 1) && b.a(d, g + 2) && b.a(d, g + 3) && b.a(d, g + 4) && !b.a(d, g + 5) && b.a(d, g + 6) && (c2 += 40);
      for (g = 0; g < a2; g += 1)
        for (d = 0; d < a2 - 6; d += 1)
          b.a(d, g) && !b.a(d + 1, g) && b.a(d + 2, g) && b.a(d + 3, g) && b.a(d + 4, g) && !b.a(d + 5, g) && b.a(d + 6, g) && (c2 += 40);
      for (g = e3 = 0; g < a2; g += 1)
        for (d = 0; d < a2; d += 1)
          b.a(d, g) && (e3 += 1);
      return c2 += Math.abs(100 * e3 / a2 / a2 - 50) / 5 * 10;
    } };
    return e2;
  }(), v = function() {
    for (var c = Array(256), a = Array(256), e2 = 0; 8 > e2; e2 += 1)
      c[e2] = 1 << e2;
    for (e2 = 8; 256 > e2; e2 += 1)
      c[e2] = c[e2 - 4] ^ c[e2 - 5] ^ c[e2 - 6] ^ c[e2 - 8];
    for (e2 = 0; 255 > e2; e2 += 1)
      a[c[e2]] = e2;
    return { g: function(b) {
      if (1 > b)
        throw Error("glog(" + b + ")");
      return a[b];
    }, i: function(b) {
      for (; 0 > b; )
        b += 255;
      for (; 256 <= b; )
        b -= 255;
      return c[b];
    } };
  }(), t = function() {
    function c(b, c2) {
      switch (c2) {
        case A.L:
          return a[4 * (b - 1)];
        case A.M:
          return a[4 * (b - 1) + 1];
        case A.Q:
          return a[4 * (b - 1) + 2];
        case A.H:
          return a[4 * (b - 1) + 3];
      }
    }
    var a = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [
        3,
        58,
        36,
        2,
        59,
        37
      ],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],
      [5, 122, 98, 1, 123, 99],
      [
        7,
        73,
        45,
        3,
        74,
        46
      ],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [
        4,
        151,
        121,
        5,
        152,
        122
      ],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ], e2 = { I: function(b, a2) {
      var e3 = c(b, a2);
      if (typeof e3 == "undefined")
        throw Error("bad rs block @ typeNumber:" + b + "/errorCorrectLevel:" + a2);
      b = e3.length / 3;
      a2 = [];
      for (var d = 0; d < b; d += 1)
        for (var g = e3[3 * d], h2 = e3[3 * d + 1], t2 = e3[3 * d + 2], p = 0; p < g; p += 1) {
          var q = t2, f = {};
          f.o = h2;
          f.j = q;
          a2.push(f);
        }
      return a2;
    } };
    return e2;
  }();
  return C;
}());
var qr_creator_es6_min_default = QrCreator;

// src/components/qr-code/qr-code.styles.ts
var qr_code_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .qr-code {
    position: relative;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// src/components/qr-code/qr-code.ts
var SlQrCode = class extends h3 {
  constructor() {
    super(...arguments);
    this.value = "";
    this.label = "";
    this.size = 128;
    this.fill = "#000";
    this.background = "#fff";
    this.radius = 0;
    this.errorCorrection = "H";
  }
  firstUpdated() {
    this.generate();
  }
  generate() {
    if (!this.hasUpdated) {
      return;
    }
    qr_creator_es6_min_default.render({
      text: this.value,
      radius: this.radius,
      ecLevel: this.errorCorrection,
      fill: this.fill,
      background: this.background === "transparent" ? null : this.background,
      size: this.size * 2
    }, this.canvas);
  }
  render() {
    return T`
      <div
        class="qr-code"
        part="base"
        style=${i2({
      width: `${this.size}px`,
      height: `${this.size}px`
    })}
      >
        <canvas role="img" aria-label=${this.label || this.value}></canvas>
      </div>
    `;
  }
};
SlQrCode.styles = qr_code_styles_default;
__decorateClass([
  o2$1("canvas")
], SlQrCode.prototype, "canvas", 2);
__decorateClass([
  e()
], SlQrCode.prototype, "value", 2);
__decorateClass([
  e()
], SlQrCode.prototype, "label", 2);
__decorateClass([
  e({ type: Number })
], SlQrCode.prototype, "size", 2);
__decorateClass([
  e()
], SlQrCode.prototype, "fill", 2);
__decorateClass([
  e()
], SlQrCode.prototype, "background", 2);
__decorateClass([
  e({ type: Number })
], SlQrCode.prototype, "radius", 2);
__decorateClass([
  e({ attribute: "error-correction" })
], SlQrCode.prototype, "errorCorrection", 2);
__decorateClass([
  watch("background"),
  watch("errorCorrection"),
  watch("fill"),
  watch("radius"),
  watch("size"),
  watch("value")
], SlQrCode.prototype, "generate", 1);
SlQrCode = __decorateClass([
  n("sl-qr-code")
], SlQrCode);
var qr_code_default = SlQrCode;

// src/components/radio/radio.styles.ts
var radio_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .radio {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: rgb(var(--sl-input-color));
    vertical-align: middle;
    cursor: pointer;
  }

  .radio__icon {
    display: inline-flex;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
  }

  .radio__icon svg {
    width: 100%;
    height: 100%;
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
    border: solid var(--sl-input-border-width) rgb(var(--sl-input-border-color));
    border-radius: 50%;
    background-color: rgb(var(--sl-input-background-color));
    color: transparent;
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: rgb(var(--sl-input-border-color-hover));
    background-color: rgb(var(--sl-input-background-color-hover));
  }

  /* Focus */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__input${focusVisibleSelector} ~ .radio__control {
    border-color: rgb(var(--sl-input-border-color-focus));
    background-color: rgb(var(--sl-input-background-color-focus));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  /* Checked */
  .radio--checked .radio__control {
    color: rgb(var(--sl-color-neutral-0));
    border-color: rgb(var(--sl-color-primary-600));
    background-color: rgb(var(--sl-color-primary-600));
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: rgb(var(--sl-color-primary-500));
    background-color: rgb(var(--sl-color-primary-500));
  }

  /* Checked + focus */
  .radio.radio--checked:not(.radio--disabled) .radio__input${focusVisibleSelector} ~ .radio__control {
    border-color: rgb(var(--sl-color-primary-500));
    background-color: rgb(var(--sl-color-primary-500));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    line-height: var(--sl-toggle-size);
    margin-left: 0.5em;
    user-select: none;
  }
`;

// src/components/radio/radio.ts
var id$6 = 0;
var SlRadio = class extends h3 {
  constructor() {
    super(...arguments);
    this.inputId = `radio-${++id$6}`;
    this.labelId = `radio-label-${id$6}`;
    this.hasFocus = false;
    this.disabled = false;
    this.checked = false;
    this.invalid = false;
  }
  click() {
    this.input.click();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  getAllRadios() {
    const radioGroup = this.closest("sl-radio-group");
    if (!radioGroup) {
      return [this];
    }
    return [...radioGroup.querySelectorAll("sl-radio")].filter((radio) => radio.name === this.name);
  }
  getSiblingRadios() {
    return this.getAllRadios().filter((radio) => radio !== this);
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleCheckedChange() {
    if (this.checked) {
      this.getSiblingRadios().map((radio) => radio.checked = false);
    }
  }
  handleClick() {
    this.checked = true;
    emit(this, "sl-change");
  }
  handleDisabledChange() {
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "sl-focus");
  }
  handleKeyDown(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      const radios = this.getAllRadios().filter((radio) => !radio.disabled);
      const incr = ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
      let index = radios.indexOf(this) + incr;
      if (index < 0)
        index = radios.length - 1;
      if (index > radios.length - 1)
        index = 0;
      this.getAllRadios().map((radio) => radio.checked = false);
      radios[index].focus();
      radios[index].checked = true;
      event.preventDefault();
    }
  }
  render() {
    return T`
      <label
        part="base"
        class=${e2$1({
      radio: true,
      "radio--checked": this.checked,
      "radio--disabled": this.disabled,
      "radio--focused": this.hasFocus
    })}
        for=${this.inputId}
        @keydown=${this.handleKeyDown}
      >
        <input
          id=${this.inputId}
          class="radio__input"
          type="radio"
          name=${l(this.name)}
          value=${l(this.value)}
          .checked=${l$1(this.checked)}
          .disabled=${this.disabled}
          aria-checked=${this.checked ? "true" : "false"}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-labelledby=${this.labelId}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span part="control" class="radio__control">
          <span part="checked-icon" class="radio__icon">
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3.42857143"></circle>
                </g>
              </g>
            </svg>
          </span>
        </span>

        <span part="label" id=${this.labelId} class="radio__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
};
SlRadio.styles = radio_styles_default;
__decorateClass([
  o2$1('input[type="radio"]')
], SlRadio.prototype, "input", 2);
__decorateClass([
  r()
], SlRadio.prototype, "hasFocus", 2);
__decorateClass([
  e()
], SlRadio.prototype, "name", 2);
__decorateClass([
  e()
], SlRadio.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRadio.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRadio.prototype, "checked", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRadio.prototype, "invalid", 2);
__decorateClass([
  watch("checked", { waitUntilFirstUpdate: true })
], SlRadio.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled")
], SlRadio.prototype, "handleDisabledChange", 1);
SlRadio = __decorateClass([
  n("sl-radio")
], SlRadio);
var radio_default = SlRadio;

// src/components/radio-group/radio-group.styles.ts
var radio_group_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: block;
  }

  .radio-group {
    border: solid var(--sl-input-border-width) rgb(var(--sl-input-border-color));
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-large);
    padding-top: var(--sl-spacing-x-small);
  }

  .radio-group .radio-group__label {
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: rgb(var(--sl-input-color));
    padding: 0 var(--sl-spacing-2x-small);
  }

  ::slotted(sl-radio:not(:last-of-type)) {
    display: block;
    margin-bottom: var(--sl-spacing-2x-small);
  }

  .radio-group:not(.radio-group--has-fieldset) {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .radio-group:not(.radio-group--has-fieldset) .radio-group__label {
    position: absolute;
    width: 0;
    height: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
`;

// src/components/radio-group/radio-group.ts
var SlRadioGroup = class extends h3 {
  constructor() {
    super(...arguments);
    this.label = "";
    this.fieldset = false;
  }
  handleFocusIn() {
    requestAnimationFrame(() => {
      const checkedRadio = [...this.defaultSlot.assignedElements({ flatten: true })].find((el) => el.tagName.toLowerCase() === "sl-radio" && el.checked);
      if (checkedRadio) {
        checkedRadio.focus();
      }
    });
  }
  render() {
    return T`
      <fieldset
        part="base"
        class=${e2$1({
      "radio-group": true,
      "radio-group--has-fieldset": this.fieldset
    })}
        role="radiogroup"
        @focusin=${this.handleFocusIn}
      >
        <legend part="label" class="radio-group__label">
          <slot name="label">${this.label}</slot>
        </legend>
        <slot></slot>
      </fieldset>
    `;
  }
};
SlRadioGroup.styles = radio_group_styles_default;
__decorateClass([
  o2$1("slot:not([name])")
], SlRadioGroup.prototype, "defaultSlot", 2);
__decorateClass([
  e()
], SlRadioGroup.prototype, "label", 2);
__decorateClass([
  e({ type: Boolean, attribute: "fieldset" })
], SlRadioGroup.prototype, "fieldset", 2);
SlRadioGroup = __decorateClass([
  n("sl-radio-group")
], SlRadioGroup);
var radio_group_default = SlRadioGroup;

// src/components/image-comparer/image-comparer.styles.ts
var image_comparer_styles_default = i$1`
  ${component_styles_default}

  :host {
    --divider-width: 2px;
    --handle-size: 2.5rem;

    display: inline-block;
    position: relative;
  }

  .image-comparer {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .image-comparer__before,
  .image-comparer__after {
    pointer-events: none;
  }

  .image-comparer__before ::slotted(img),
  .image-comparer__after ::slotted(img),
  .image-comparer__before ::slotted(svg),
  .image-comparer__after ::slotted(svg) {
    display: block;
    max-width: 100% !important;
    height: auto;
  }

  .image-comparer__after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .image-comparer__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: rgb(var(--sl-color-neutral-0));
    transform: translateX(calc(var(--divider-width) / -2));
    cursor: ew-resize;
  }

  .image-comparer__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: rgb(var(--sl-color-neutral-0));
    border-radius: var(--sl-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.5);
    color: rgb(var(--sl-color-neutral-500));
    cursor: inherit;
    z-index: 10;
  }

  .image-comparer__handle${focusVisibleSelector} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }
`;

// src/components/image-comparer/image-comparer.ts
var SlImageComparer$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.position = 50;
  }
  handleDrag(event) {
    const { width } = this.base.getBoundingClientRect();
    function drag(event2, container, onMove) {
      const move = (event3) => {
        const dims = container.getBoundingClientRect();
        const defaultView = container.ownerDocument.defaultView;
        const offsetX = dims.left + defaultView.pageXOffset;
        const offsetY = dims.top + defaultView.pageYOffset;
        const x = (event3.changedTouches ? event3.changedTouches[0].pageX : event3.pageX) - offsetX;
        const y = (event3.changedTouches ? event3.changedTouches[0].pageY : event3.pageY) - offsetY;
        onMove(x, y);
      };
      move(event2);
      const stop = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("mouseup", stop);
        document.removeEventListener("touchend", stop);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("touchmove", move);
      document.addEventListener("mouseup", stop);
      document.addEventListener("touchend", stop);
    }
    event.preventDefault();
    drag(event, this.base, (x) => {
      this.position = Number(clamp(x / width * 100, 0, 100).toFixed(2));
    });
  }
  handleKeyDown(event) {
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      const incr = event.shiftKey ? 10 : 1;
      let newPosition = this.position;
      event.preventDefault();
      if (event.key === "ArrowLeft")
        newPosition = newPosition - incr;
      if (event.key === "ArrowRight")
        newPosition = newPosition + incr;
      if (event.key === "Home")
        newPosition = 0;
      if (event.key === "End")
        newPosition = 100;
      newPosition = clamp(newPosition, 0, 100);
      this.position = newPosition;
    }
  }
  handlePositionChange() {
    emit(this, "sl-change");
  }
  render() {
    return T`
      <div part="base" class="image-comparer" @keydown=${this.handleKeyDown}>
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${i2({ clipPath: `inset(0 ${100 - this.position}% 0 0)` })}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${i2({ left: this.position + "%" })}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            tabindex="0"
          >
            <slot name="handle-icon">
              <sl-icon class="image-comparer__handle-icon" name="grip-vertical" library="system"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `;
  }
};
SlImageComparer$1.styles = image_comparer_styles_default;
__decorateClass([
  o2$1(".image-comparer")
], SlImageComparer$1.prototype, "base", 2);
__decorateClass([
  o2$1(".image-comparer__handle")
], SlImageComparer$1.prototype, "handle", 2);
__decorateClass([
  e({ type: Number, reflect: true })
], SlImageComparer$1.prototype, "position", 2);
__decorateClass([
  watch("position", { waitUntilFirstUpdate: true })
], SlImageComparer$1.prototype, "handlePositionChange", 1);
SlImageComparer$1 = __decorateClass([
  n("sl-image-comparer")
], SlImageComparer$1);
var image_comparer_default = SlImageComparer$1;

// src/components/include/request.ts
var includeFiles = new Map();
var requestInclude = async (src, mode = "cors") => {
  if (includeFiles.has(src)) {
    return includeFiles.get(src);
  } else {
    const request = fetch(src, { mode }).then(async (response) => {
      return {
        ok: response.ok,
        status: response.status,
        html: await response.text()
      };
    });
    includeFiles.set(src, request);
    return request;
  }
};

// src/components/include/include.styles.ts
var include_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: block;
  }
`;

// src/components/include/include.ts
var SlInclude = class extends h3 {
  constructor() {
    super(...arguments);
    this.mode = "cors";
    this.allowScripts = false;
  }
  executeScript(script) {
    const newScript = document.createElement("script");
    [...script.attributes].map((attr) => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode.replaceChild(newScript, script);
  }
  async handleSrcChange() {
    try {
      const src = this.src;
      const file = await requestInclude(src, this.mode);
      if (src !== this.src) {
        return;
      }
      if (!file) {
        return;
      }
      if (!file.ok) {
        emit(this, "sl-error", { detail: { status: file.status } });
        return;
      }
      this.innerHTML = file.html;
      if (this.allowScripts) {
        [...this.querySelectorAll("script")].map((script) => this.executeScript(script));
      }
      emit(this, "sl-load");
    } catch (e2) {
      emit(this, "sl-error", { detail: { status: -1 } });
    }
  }
  render() {
    return T`<slot></slot>`;
  }
};
SlInclude.styles = include_styles_default;
__decorateClass([
  e()
], SlInclude.prototype, "src", 2);
__decorateClass([
  e()
], SlInclude.prototype, "mode", 2);
__decorateClass([
  e({ attribute: "allow-scripts", type: Boolean })
], SlInclude.prototype, "allowScripts", 2);
__decorateClass([
  watch("src")
], SlInclude.prototype, "handleSrcChange", 1);
SlInclude = __decorateClass([
  n("sl-include")
], SlInclude);
var include_default = SlInclude;

// src/components/menu/menu.styles.ts
var menu_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: block;
  }

  .menu {
    padding: var(--sl-spacing-x-small) 0;
  }
`;

// src/components/menu/menu.ts
var SlMenu = class extends h3 {
  constructor() {
    super(...arguments);
    this.typeToSelectString = "";
  }
  getAllItems(options = { includeDisabled: true }) {
    return [...this.defaultSlot.assignedElements({ flatten: true })].filter((el) => {
      if (el.getAttribute("role") !== "menuitem") {
        return false;
      }
      if (!(options == null ? void 0 : options.includeDisabled) && el.disabled) {
        return false;
      }
      return true;
    });
  }
  getCurrentItem() {
    return this.getAllItems({ includeDisabled: false }).find((i2) => i2.getAttribute("tabindex") === "0");
  }
  setCurrentItem(item) {
    const items = this.getAllItems({ includeDisabled: false });
    let activeItem = item.disabled ? items[0] : item;
    items.map((i2) => i2.setAttribute("tabindex", i2 === activeItem ? "0" : "-1"));
  }
  typeToSelect(key) {
    const items = this.getAllItems({ includeDisabled: false });
    clearTimeout(this.typeToSelectTimeout);
    this.typeToSelectTimeout = setTimeout(() => this.typeToSelectString = "", 750);
    this.typeToSelectString += key.toLowerCase();
    if (!hasFocusVisible) {
      items.map((item) => item.classList.remove("sl-focus-invisible"));
    }
    for (const item of items) {
      const slot = item.shadowRoot.querySelector("slot:not([name])");
      const label = getTextContent(slot).toLowerCase().trim();
      if (label.substring(0, this.typeToSelectString.length) === this.typeToSelectString) {
        this.setCurrentItem(item);
        item.focus();
        break;
      }
    }
  }
  handleClick(event) {
    const target = event.target;
    const item = target.closest("sl-menu-item");
    if (item && !item.disabled) {
      emit(this, "sl-select", { detail: { item } });
    }
  }
  handleKeyUp() {
    if (!hasFocusVisible) {
      const items = this.getAllItems();
      items.map((item) => item.classList.remove("sl-focus-invisible"));
    }
  }
  handleKeyDown(event) {
    if (event.key === "Enter") {
      const item = this.getCurrentItem();
      event.preventDefault();
      if (item) {
        item.click();
      }
    }
    if (event.key === " ") {
      event.preventDefault();
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      const items = this.getAllItems({ includeDisabled: false });
      const activeItem = this.getCurrentItem();
      let index = activeItem ? items.indexOf(activeItem) : 0;
      if (items.length) {
        event.preventDefault();
        if (event.key === "ArrowDown") {
          index++;
        } else if (event.key === "ArrowUp") {
          index--;
        } else if (event.key === "Home") {
          index = 0;
        } else if (event.key === "End") {
          index = items.length - 1;
        }
        if (index < 0)
          index = 0;
        if (index > items.length - 1)
          index = items.length - 1;
        this.setCurrentItem(items[index]);
        items[index].focus();
        return;
      }
    }
    this.typeToSelect(event.key);
  }
  handleMouseDown(event) {
    const target = event.target;
    if (target.getAttribute("role") === "menuitem") {
      this.setCurrentItem(target);
      if (!hasFocusVisible) {
        target.classList.add("sl-focus-invisible");
      }
    }
  }
  handleSlotChange() {
    const items = this.getAllItems({ includeDisabled: false });
    if (items.length) {
      this.setCurrentItem(items[0]);
    }
  }
  render() {
    return T`
      <div
        part="base"
        class="menu"
        role="menu"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @keyup=${this.handleKeyUp}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
};
SlMenu.styles = menu_styles_default;
__decorateClass([
  o2$1(".menu")
], SlMenu.prototype, "menu", 2);
__decorateClass([
  o2$1("slot")
], SlMenu.prototype, "defaultSlot", 2);
SlMenu = __decorateClass([
  n("sl-menu")
], SlMenu);
var menu_default = SlMenu;

// src/components/form/form.styles.ts
var form_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: block;
  }
`;

// src/components/form/form.ts
var SlForm = class extends h3 {
  constructor() {
    super(...arguments);
    this.novalidate = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.formControls = [
      {
        tag: "button",
        serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null,
        click: (event) => {
          const target = event.target;
          if (target.type === "submit") {
            this.submit();
          }
        }
      },
      {
        tag: "input",
        serialize: (el, formData) => {
          if (!el.name || el.disabled) {
            return;
          }
          if ((el.type === "checkbox" || el.type === "radio") && !el.checked) {
            return;
          }
          if (el.type === "file") {
            [...el.files].map((file) => formData.append(el.name, file));
            return;
          }
          formData.append(el.name, el.value);
        },
        click: (event) => {
          const target = event.target;
          if (target.type === "submit") {
            this.submit();
          }
        },
        keyDown: (event) => {
          const target = event.target;
          if (event.key === "Enter" && !event.defaultPrevented && !["checkbox", "file", "radio"].includes(target.type)) {
            this.submit();
          }
        }
      },
      {
        tag: "select",
        serialize: (el, formData) => {
          if (el.name && !el.disabled) {
            if (el.multiple) {
              const selectedOptions = [...el.querySelectorAll("option:checked")];
              if (selectedOptions.length) {
                selectedOptions.map((option) => formData.append(el.name, option.value));
              } else {
                formData.append(el.name, "");
              }
            } else {
              formData.append(el.name, el.value);
            }
          }
        }
      },
      {
        tag: "sl-button",
        serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null,
        click: (event) => {
          const target = event.target;
          if (target.submit) {
            this.submit();
          }
        }
      },
      {
        tag: "sl-checkbox",
        serialize: (el, formData) => el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
      },
      {
        tag: "sl-color-picker",
        serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null
      },
      {
        tag: "sl-input",
        serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null,
        keyDown: (event) => {
          if (event.key === "Enter" && !event.defaultPrevented) {
            this.submit();
          }
        }
      },
      {
        tag: "sl-radio",
        serialize: (el, formData) => el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
      },
      {
        tag: "sl-range",
        serialize: (el, formData) => {
          if (el.name && !el.disabled) {
            formData.append(el.name, el.value + "");
          }
        }
      },
      {
        tag: "sl-select",
        serialize: (el, formData) => {
          if (el.name && !el.disabled) {
            if (el.multiple) {
              const selectedOptions = [...el.value];
              if (selectedOptions.length) {
                selectedOptions.map((value) => formData.append(el.name, value));
              } else {
                formData.append(el.name, "");
              }
            } else {
              formData.append(el.name, el.value + "");
            }
          }
        }
      },
      {
        tag: "sl-switch",
        serialize: (el, formData) => el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
      },
      {
        tag: "sl-textarea",
        serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null
      },
      {
        tag: "textarea",
        serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null
      }
    ];
  }
  getFormData() {
    const formData = new FormData();
    const formControls = this.getFormControls();
    formControls.map((el) => this.serializeElement(el, formData));
    return formData;
  }
  getFormControls() {
    const slot = this.form.querySelector("slot");
    const tags = this.formControls.map((control) => control.tag);
    return slot.assignedElements({ flatten: true }).reduce((all, el) => all.concat(el, [...el.querySelectorAll("*")]), []).filter((el) => tags.includes(el.tagName.toLowerCase()));
  }
  submit() {
    const formData = this.getFormData();
    const formControls = this.getFormControls();
    const formControlsThatReport = formControls.filter((el) => typeof el.reportValidity === "function");
    if (!this.novalidate) {
      for (const el of formControlsThatReport) {
        const isValid = el.reportValidity();
        if (!isValid) {
          return false;
        }
      }
    }
    emit(this, "sl-submit", { detail: { formData, formControls } });
    return true;
  }
  handleClick(event) {
    const target = event.target;
    const tag = target.tagName.toLowerCase();
    for (const formControl of this.formControls) {
      if (formControl.tag === tag && formControl.click) {
        formControl.click(event);
      }
    }
  }
  handleKeyDown(event) {
    const target = event.target;
    const tag = target.tagName.toLowerCase();
    for (const formControl of this.formControls) {
      if (formControl.tag === tag && formControl.keyDown) {
        formControl.keyDown(event);
      }
    }
  }
  serializeElement(el, formData) {
    const tag = el.tagName.toLowerCase();
    for (const formControl of this.formControls) {
      if (formControl.tag === tag) {
        return formControl.serialize(el, formData);
      }
    }
    return null;
  }
  render() {
    return T`
      <div part="base" class="form" role="form" @click=${this.handleClick} @keydown=${this.handleKeyDown}>
        <slot></slot>
      </div>
    `;
  }
};
SlForm.styles = form_styles_default;
__decorateClass([
  o2$1(".form")
], SlForm.prototype, "form", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlForm.prototype, "novalidate", 2);
SlForm = __decorateClass([
  n("sl-form")
], SlForm);
var form_default = SlForm;

// src/internal/number.ts
function formatBytes(bytes, options) {
  options = Object.assign({
    unit: "bytes",
    locale: void 0
  }, options);
  const byteUnits = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const bitUnits = ["b", "kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit"];
  const units = options.unit === "bytes" ? byteUnits : bitUnits;
  const isNegative = bytes < 0;
  bytes = Math.abs(bytes);
  if (bytes === 0)
    return "0 B";
  const i = Math.min(Math.floor(Math.log10(bytes) / 3), units.length - 1);
  const num = Number((bytes / Math.pow(1e3, i)).toPrecision(3));
  const numString = num.toLocaleString(options.locale);
  const prefix = isNegative ? "-" : "";
  return `${prefix}${numString} ${units[i]}`;
}

// src/components/format-bytes/format-bytes.ts
var SlFormatBytes = class extends h3 {
  constructor() {
    super(...arguments);
    this.value = 0;
    this.unit = "bytes";
  }
  render() {
    return formatBytes(this.value, {
      unit: this.unit,
      locale: this.locale
    });
  }
};
__decorateClass([
  e({ type: Number })
], SlFormatBytes.prototype, "value", 2);
__decorateClass([
  e()
], SlFormatBytes.prototype, "unit", 2);
__decorateClass([
  e()
], SlFormatBytes.prototype, "locale", 2);
SlFormatBytes = __decorateClass([
  n("sl-format-bytes")
], SlFormatBytes);
var format_bytes_default = SlFormatBytes;

// src/components/format-date/format-date.ts
var SlFormatDate = class extends h3 {
  constructor() {
    super(...arguments);
    this.date = new Date();
    this.hourFormat = "auto";
  }
  render() {
    const date = new Date(this.date);
    const hour12 = this.hourFormat === "auto" ? void 0 : this.hourFormat === "12";
    if (isNaN(date.getMilliseconds())) {
      return;
    }
    return new Intl.DateTimeFormat(this.locale, {
      weekday: this.weekday,
      era: this.era,
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      timeZoneName: this.timeZoneName,
      timeZone: this.timeZone,
      hour12
    }).format(date);
  }
};
__decorateClass([
  e()
], SlFormatDate.prototype, "date", 2);
__decorateClass([
  e()
], SlFormatDate.prototype, "locale", 2);
__decorateClass([
  e()
], SlFormatDate.prototype, "weekday", 2);
__decorateClass([
  e()
], SlFormatDate.prototype, "era", 2);
__decorateClass([
  e()
], SlFormatDate.prototype, "year", 2);
__decorateClass([
  e()
], SlFormatDate.prototype, "month", 2);
__decorateClass([
  e()
], SlFormatDate.prototype, "day", 2);
__decorateClass([
  e()
], SlFormatDate.prototype, "hour", 2);
__decorateClass([
  e()
], SlFormatDate.prototype, "minute", 2);
__decorateClass([
  e()
], SlFormatDate.prototype, "second", 2);
__decorateClass([
  e({ attribute: "time-zone-name" })
], SlFormatDate.prototype, "timeZoneName", 2);
__decorateClass([
  e({ attribute: "time-zone" })
], SlFormatDate.prototype, "timeZone", 2);
__decorateClass([
  e({ attribute: "hour-format" })
], SlFormatDate.prototype, "hourFormat", 2);
SlFormatDate = __decorateClass([
  n("sl-format-date")
], SlFormatDate);
var format_date_default = SlFormatDate;

// src/components/format-number/format-number.ts
var SlFormatNumber = class extends h3 {
  constructor() {
    super(...arguments);
    this.value = 0;
    this.type = "decimal";
    this.noGrouping = false;
    this.currency = "USD";
    this.currencyDisplay = "symbol";
  }
  render() {
    if (isNaN(this.value)) {
      return "";
    }
    return new Intl.NumberFormat(this.locale, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: !this.noGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits
    }).format(this.value);
  }
};
__decorateClass([
  e({ type: Number })
], SlFormatNumber.prototype, "value", 2);
__decorateClass([
  e()
], SlFormatNumber.prototype, "locale", 2);
__decorateClass([
  e()
], SlFormatNumber.prototype, "type", 2);
__decorateClass([
  e({ attribute: "no-grouping", type: Boolean })
], SlFormatNumber.prototype, "noGrouping", 2);
__decorateClass([
  e()
], SlFormatNumber.prototype, "currency", 2);
__decorateClass([
  e({ attribute: "currency-display" })
], SlFormatNumber.prototype, "currencyDisplay", 2);
__decorateClass([
  e({ attribute: "minimum-integer-digits", type: Number })
], SlFormatNumber.prototype, "minimumIntegerDigits", 2);
__decorateClass([
  e({ attribute: "minimum-fraction-digits", type: Number })
], SlFormatNumber.prototype, "minimumFractionDigits", 2);
__decorateClass([
  e({ attribute: "maximum-fraction-digits", type: Number })
], SlFormatNumber.prototype, "maximumFractionDigits", 2);
__decorateClass([
  e({ attribute: "minimum-significant-digits", type: Number })
], SlFormatNumber.prototype, "minimumSignificantDigits", 2);
__decorateClass([
  e({ attribute: "maximum-significant-digits", type: Number })
], SlFormatNumber.prototype, "maximumSignificantDigits", 2);
SlFormatNumber = __decorateClass([
  n("sl-format-number")
], SlFormatNumber);
var format_number_default = SlFormatNumber;

// src/components/button-group/button-group.styles.ts
var button_group_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;

// src/components/button-group/button-group.ts
var SlButtonGroup = class extends h3 {
  constructor() {
    super(...arguments);
    this.label = "";
  }
  handleFocus(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--focus");
  }
  handleBlur(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--focus");
  }
  handleMouseOver(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--hover");
  }
  handleMouseOut(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--hover");
  }
  handleSlotChange() {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })];
    slottedElements.map((el) => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);
      if (button) {
        button.classList.add("sl-button-group__button");
        button.classList.toggle("sl-button-group__button--first", index === 0);
        button.classList.toggle("sl-button-group__button--inner", index > 0 && index < slottedElements.length - 1);
        button.classList.toggle("sl-button-group__button--last", index === slottedElements.length - 1);
      }
    });
  }
  render() {
    return T`
      <div
        part="base"
        class="button-group"
        role="group"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
};
SlButtonGroup.styles = button_group_styles_default;
__decorateClass([
  o2$1("slot")
], SlButtonGroup.prototype, "defaultSlot", 2);
__decorateClass([
  e()
], SlButtonGroup.prototype, "label", 2);
SlButtonGroup = __decorateClass([
  n("sl-button-group")
], SlButtonGroup);
var button_group_default = SlButtonGroup;
function findButton(el) {
  return el.tagName.toLowerCase() === "sl-button" ? el : el.querySelector("sl-button");
}

// src/components/card/card.styles.ts
var card_styles_default = i$1`
  ${component_styles_default}

  :host {
    --border-color: rgb(var(--sl-color-neutral-200));
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--sl-color-neutral-0));
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image ::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card__body {
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`;

// src/components/card/card.ts
var SlCard = class extends h3 {
  constructor() {
    super(...arguments);
    this.hasFooter = false;
    this.hasImage = false;
    this.hasHeader = false;
  }
  handleSlotChange() {
    this.hasFooter = hasSlot(this, "footer");
    this.hasImage = hasSlot(this, "image");
    this.hasHeader = hasSlot(this, "header");
  }
  render() {
    return T`
      <div
        part="base"
        class=${e2$1({
      card: true,
      "card--has-footer": this.hasFooter,
      "card--has-image": this.hasImage,
      "card--has-header": this.hasHeader
    })}
      >
        <div part="image" class="card__image">
          <slot name="image" @slotchange=${this.handleSlotChange}></slot>
        </div>

        <div part="header" class="card__header">
          <slot name="header" @slotchange=${this.handleSlotChange}></slot>
        </div>

        <div part="body" class="card__body">
          <slot></slot>
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
};
SlCard.styles = card_styles_default;
__decorateClass([
  r()
], SlCard.prototype, "hasFooter", 2);
__decorateClass([
  r()
], SlCard.prototype, "hasImage", 2);
__decorateClass([
  r()
], SlCard.prototype, "hasHeader", 2);
SlCard = __decorateClass([
  n("sl-card")
], SlCard);
var card_default = SlCard;

// src/components/checkbox/checkbox.styles.ts
var checkbox_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: rgb(var(--sl-input-color));
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
    border: solid var(--sl-input-border-width) rgb(var(--sl-input-border-color));
    border-radius: 2px;
    background-color: rgb(var(--sl-input-background-color));
    color: rgb(var(--sl-color-neutral-0));
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__control .checkbox__icon {
    display: inline-flex;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
  }

  .checkbox__control .checkbox__icon svg {
    width: 100%;
    height: 100%;
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: rgb(var(--sl-input-border-color-hover));
    background-color: rgb(var(--sl-input-background-color-hover));
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled)
    .checkbox__input${focusVisibleSelector}
    ~ .checkbox__control {
    border-color: rgb(var(--sl-input-border-color-focus));
    background-color: rgb(var(--sl-input-background-color-focus));
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: rgb(var(--sl-color-primary-600));
    background-color: rgb(var(--sl-color-primary-600));
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: rgb(var(--sl-color-primary-500));
    background-color: rgb(var(--sl-color-primary-500));
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input${focusVisibleSelector} ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled)
    .checkbox__input${focusVisibleSelector}
    ~ .checkbox__control {
    border-color: rgb(var(--sl-color-primary-500));
    background-color: rgb(var(--sl-color-primary-500));
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    line-height: var(--sl-toggle-size);
    margin-left: 0.5em;
    user-select: none;
  }
`;

// src/components/checkbox/checkbox.ts
var id$5 = 0;
var SlCheckbox = class extends h3 {
  constructor() {
    super(...arguments);
    this.inputId = `checkbox-${++id$5}`;
    this.labelId = `checkbox-label-${id$5}`;
    this.hasFocus = false;
    this.disabled = false;
    this.required = false;
    this.checked = false;
    this.indeterminate = false;
    this.invalid = false;
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }
  click() {
    this.input.click();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
    emit(this, "sl-change");
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleDisabledChange() {
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "sl-focus");
  }
  handleStateChange() {
    this.invalid = !this.input.checkValidity();
  }
  render() {
    return T`
      <label
        part="base"
        class=${e2$1({
      checkbox: true,
      "checkbox--checked": this.checked,
      "checkbox--disabled": this.disabled,
      "checkbox--focused": this.hasFocus,
      "checkbox--indeterminate": this.indeterminate
    })}
        for=${this.inputId}
      >
        <input
          id=${this.inputId}
          class="checkbox__input"
          type="checkbox"
          name=${l(this.name)}
          value=${l(this.value)}
          .indeterminate=${l$1(this.indeterminate)}
          .checked=${l$1(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="checkbox"
          aria-checked=${this.checked ? "true" : "false"}
          aria-labelledby=${this.labelId}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span part="control" class="checkbox__control">
          ${this.checked ? T`
                <span part="checked-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(3.428571, 3.428571)">
                          <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                          <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              ` : ""}
          ${!this.checked && this.indeterminate ? T`
                <span part="indeterminate-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(2.285714, 6.857143)">
                          <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              ` : ""}
        </span>

        <span part="label" id=${this.labelId} class="checkbox__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
};
SlCheckbox.styles = checkbox_styles_default;
__decorateClass([
  o2$1('input[type="checkbox"]')
], SlCheckbox.prototype, "input", 2);
__decorateClass([
  r()
], SlCheckbox.prototype, "hasFocus", 2);
__decorateClass([
  e()
], SlCheckbox.prototype, "name", 2);
__decorateClass([
  e()
], SlCheckbox.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "required", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "checked", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "indeterminate", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "invalid", 2);
__decorateClass([
  watch("disabled")
], SlCheckbox.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("checked", { waitUntilFirstUpdate: true }),
  watch("indeterminate", { waitUntilFirstUpdate: true })
], SlCheckbox.prototype, "handleStateChange", 1);
SlCheckbox = __decorateClass([
  n("sl-checkbox")
], SlCheckbox);
var checkbox_default = SlCheckbox;

// node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/color-name/index.js"(exports, module) {
    module.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/is-arrayish/index.js
var require_is_arrayish = __commonJS({
  "node_modules/is-arrayish/index.js"(exports, module) {
    module.exports = function isArrayish(obj) {
      if (!obj || typeof obj === "string") {
        return false;
      }
      return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== "String");
    };
  }
});

// node_modules/simple-swizzle/index.js
var require_simple_swizzle = __commonJS({
  "node_modules/simple-swizzle/index.js"(exports, module) {
    var isArrayish = require_is_arrayish();
    var concat = Array.prototype.concat;
    var slice = Array.prototype.slice;
    var swizzle = module.exports = function swizzle2(args) {
      var results = [];
      for (var i3 = 0, len = args.length; i3 < len; i3++) {
        var arg = args[i3];
        if (isArrayish(arg)) {
          results = concat.call(results, slice.call(arg));
        } else {
          results.push(arg);
        }
      }
      return results;
    };
    swizzle.wrap = function(fn) {
      return function() {
        return fn(swizzle(arguments));
      };
    };
  }
});

// node_modules/color-string/index.js
var require_color_string = __commonJS({
  "node_modules/color-string/index.js"(exports, module) {
    var colorNames = require_color_name();
    var swizzle = require_simple_swizzle();
    var reverseNames = {};
    for (var name in colorNames) {
      if (colorNames.hasOwnProperty(name)) {
        reverseNames[colorNames[name]] = name;
      }
    }
    var cs = module.exports = {
      to: {},
      get: {}
    };
    cs.get = function(string) {
      var prefix = string.substring(0, 3).toLowerCase();
      var val;
      var model;
      switch (prefix) {
        case "hsl":
          val = cs.get.hsl(string);
          model = "hsl";
          break;
        case "hwb":
          val = cs.get.hwb(string);
          model = "hwb";
          break;
        default:
          val = cs.get.rgb(string);
          model = "rgb";
          break;
      }
      if (!val) {
        return null;
      }
      return { model, value: val };
    };
    cs.get.rgb = function(string) {
      if (!string) {
        return null;
      }
      var abbr = /^#([a-f0-9]{3,4})$/i;
      var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
      var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
      var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
      var keyword = /(\D+)/;
      var rgb = [0, 0, 0, 1];
      var match;
      var i3;
      var hexAlpha;
      if (match = string.match(hex)) {
        hexAlpha = match[2];
        match = match[1];
        for (i3 = 0; i3 < 3; i3++) {
          var i22 = i3 * 2;
          rgb[i3] = parseInt(match.slice(i22, i22 + 2), 16);
        }
        if (hexAlpha) {
          rgb[3] = parseInt(hexAlpha, 16) / 255;
        }
      } else if (match = string.match(abbr)) {
        match = match[1];
        hexAlpha = match[3];
        for (i3 = 0; i3 < 3; i3++) {
          rgb[i3] = parseInt(match[i3] + match[i3], 16);
        }
        if (hexAlpha) {
          rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
        }
      } else if (match = string.match(rgba)) {
        for (i3 = 0; i3 < 3; i3++) {
          rgb[i3] = parseInt(match[i3 + 1], 0);
        }
        if (match[4]) {
          rgb[3] = parseFloat(match[4]);
        }
      } else if (match = string.match(per)) {
        for (i3 = 0; i3 < 3; i3++) {
          rgb[i3] = Math.round(parseFloat(match[i3 + 1]) * 2.55);
        }
        if (match[4]) {
          rgb[3] = parseFloat(match[4]);
        }
      } else if (match = string.match(keyword)) {
        if (match[1] === "transparent") {
          return [0, 0, 0, 0];
        }
        rgb = colorNames[match[1]];
        if (!rgb) {
          return null;
        }
        rgb[3] = 1;
        return rgb;
      } else {
        return null;
      }
      for (i3 = 0; i3 < 3; i3++) {
        rgb[i3] = clamp2(rgb[i3], 0, 255);
      }
      rgb[3] = clamp2(rgb[3], 0, 1);
      return rgb;
    };
    cs.get.hsl = function(string) {
      if (!string) {
        return null;
      }
      var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
      var match = string.match(hsl);
      if (match) {
        var alpha = parseFloat(match[4]);
        var h2 = (parseFloat(match[1]) + 360) % 360;
        var s = clamp2(parseFloat(match[2]), 0, 100);
        var l3 = clamp2(parseFloat(match[3]), 0, 100);
        var a = clamp2(isNaN(alpha) ? 1 : alpha, 0, 1);
        return [h2, s, l3, a];
      }
      return null;
    };
    cs.get.hwb = function(string) {
      if (!string) {
        return null;
      }
      var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
      var match = string.match(hwb);
      if (match) {
        var alpha = parseFloat(match[4]);
        var h2 = (parseFloat(match[1]) % 360 + 360) % 360;
        var w = clamp2(parseFloat(match[2]), 0, 100);
        var b = clamp2(parseFloat(match[3]), 0, 100);
        var a = clamp2(isNaN(alpha) ? 1 : alpha, 0, 1);
        return [h2, w, b, a];
      }
      return null;
    };
    cs.to.hex = function() {
      var rgba = swizzle(arguments);
      return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : "");
    };
    cs.to.rgb = function() {
      var rgba = swizzle(arguments);
      return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
    };
    cs.to.rgb.percent = function() {
      var rgba = swizzle(arguments);
      var r2 = Math.round(rgba[0] / 255 * 100);
      var g = Math.round(rgba[1] / 255 * 100);
      var b = Math.round(rgba[2] / 255 * 100);
      return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r2 + "%, " + g + "%, " + b + "%)" : "rgba(" + r2 + "%, " + g + "%, " + b + "%, " + rgba[3] + ")";
    };
    cs.to.hsl = function() {
      var hsla = swizzle(arguments);
      return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
    };
    cs.to.hwb = function() {
      var hwba = swizzle(arguments);
      var a = "";
      if (hwba.length >= 4 && hwba[3] !== 1) {
        a = ", " + hwba[3];
      }
      return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a + ")";
    };
    cs.to.keyword = function(rgb) {
      return reverseNames[rgb.slice(0, 3)];
    };
    function clamp2(num, min, max) {
      return Math.min(Math.max(min, num), max);
    }
    function hexDouble(num) {
      var str = num.toString(16).toUpperCase();
      return str.length < 2 ? "0" + str : str;
    }
  }
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/color-convert/conversions.js"(exports, module) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (var key in cssKeywords) {
      if (cssKeywords.hasOwnProperty(key)) {
        reverseKeywords[cssKeywords[key]] = key;
      }
    }
    var convert = module.exports = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    for (var model in convert) {
      if (convert.hasOwnProperty(model)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        channels = convert[model].channels;
        labels = convert[model].labels;
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", { value: channels });
        Object.defineProperty(convert[model], "labels", { value: labels });
      }
    }
    var channels;
    var labels;
    convert.rgb.hsl = function(rgb) {
      var r2 = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var min = Math.min(r2, g, b);
      var max = Math.max(r2, g, b);
      var delta = max - min;
      var h2;
      var s;
      var l3;
      if (max === min) {
        h2 = 0;
      } else if (r2 === max) {
        h2 = (g - b) / delta;
      } else if (g === max) {
        h2 = 2 + (b - r2) / delta;
      } else if (b === max) {
        h2 = 4 + (r2 - g) / delta;
      }
      h2 = Math.min(h2 * 60, 360);
      if (h2 < 0) {
        h2 += 360;
      }
      l3 = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l3 <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h2, s * 100, l3 * 100];
    };
    convert.rgb.hsv = function(rgb) {
      var rdif;
      var gdif;
      var bdif;
      var h2;
      var s;
      var r2 = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var v = Math.max(r2, g, b);
      var diff = v - Math.min(r2, g, b);
      var diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h2 = s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r2);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r2 === v) {
          h2 = bdif - gdif;
        } else if (g === v) {
          h2 = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h2 = 2 / 3 + gdif - rdif;
        }
        if (h2 < 0) {
          h2 += 1;
        } else if (h2 > 1) {
          h2 -= 1;
        }
      }
      return [
        h2 * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      var r2 = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      var h2 = convert.rgb.hsl(rgb)[0];
      var w = 1 / 255 * Math.min(r2, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r2, Math.max(g, b));
      return [h2, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      var r2 = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var c;
      var m;
      var y;
      var k;
      k = Math.min(1 - r2, 1 - g, 1 - b);
      c = (1 - r2 - k) / (1 - k) || 0;
      m = (1 - g - k) / (1 - k) || 0;
      y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
    }
    convert.rgb.keyword = function(rgb) {
      var reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      var currentClosestDistance = Infinity;
      var currentClosestKeyword;
      for (var keyword in cssKeywords) {
        if (cssKeywords.hasOwnProperty(keyword)) {
          var value = cssKeywords[keyword];
          var distance = comparativeDistance(rgb, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      var r2 = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      r2 = r2 > 0.04045 ? Math.pow((r2 + 0.055) / 1.055, 2.4) : r2 / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      var x = r2 * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r2 * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r2 * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      var xyz = convert.rgb.xyz(rgb);
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l3;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l3 = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l3, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      var h2 = hsl[0] / 360;
      var s = hsl[1] / 100;
      var l3 = hsl[2] / 100;
      var t1;
      var t2;
      var t3;
      var rgb;
      var val;
      if (s === 0) {
        val = l3 * 255;
        return [val, val, val];
      }
      if (l3 < 0.5) {
        t2 = l3 * (1 + s);
      } else {
        t2 = l3 + s - l3 * s;
      }
      t1 = 2 * l3 - t2;
      rgb = [0, 0, 0];
      for (var i3 = 0; i3 < 3; i3++) {
        t3 = h2 + 1 / 3 * -(i3 - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i3] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      var h2 = hsl[0];
      var s = hsl[1] / 100;
      var l3 = hsl[2] / 100;
      var smin = s;
      var lmin = Math.max(l3, 0.01);
      var sv;
      var v;
      l3 *= 2;
      s *= l3 <= 1 ? l3 : 2 - l3;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      v = (l3 + s) / 2;
      sv = l3 === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l3 + s);
      return [h2, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      var h2 = hsv[0] / 60;
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var hi = Math.floor(h2) % 6;
      var f = h2 - Math.floor(h2);
      var p = 255 * v * (1 - s);
      var q = 255 * v * (1 - s * f);
      var t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      var h2 = hsv[0];
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var vmin = Math.max(v, 0.01);
      var lmin;
      var sl;
      var l3;
      l3 = (2 - s) * v;
      lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l3 /= 2;
      return [h2, sl * 100, l3 * 100];
    };
    convert.hwb.rgb = function(hwb) {
      var h2 = hwb[0] / 360;
      var wh = hwb[1] / 100;
      var bl = hwb[2] / 100;
      var ratio = wh + bl;
      var i3;
      var v;
      var f;
      var n2;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      i3 = Math.floor(6 * h2);
      v = 1 - bl;
      f = 6 * h2 - i3;
      if ((i3 & 1) !== 0) {
        f = 1 - f;
      }
      n2 = wh + f * (v - wh);
      var r2;
      var g;
      var b;
      switch (i3) {
        default:
        case 6:
        case 0:
          r2 = v;
          g = n2;
          b = wh;
          break;
        case 1:
          r2 = n2;
          g = v;
          b = wh;
          break;
        case 2:
          r2 = wh;
          g = v;
          b = n2;
          break;
        case 3:
          r2 = wh;
          g = n2;
          b = v;
          break;
        case 4:
          r2 = n2;
          g = wh;
          b = v;
          break;
        case 5:
          r2 = v;
          g = wh;
          b = n2;
          break;
      }
      return [r2 * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      var c = cmyk[0] / 100;
      var m = cmyk[1] / 100;
      var y = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r2;
      var g;
      var b;
      r2 = 1 - Math.min(1, c * (1 - k) + k);
      g = 1 - Math.min(1, m * (1 - k) + k);
      b = 1 - Math.min(1, y * (1 - k) + k);
      return [r2 * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      var x = xyz[0] / 100;
      var y = xyz[1] / 100;
      var z = xyz[2] / 100;
      var r2;
      var g;
      var b;
      r2 = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r2 = r2 > 31308e-7 ? 1.055 * Math.pow(r2, 1 / 2.4) - 0.055 : r2 * 12.92;
      g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
      r2 = Math.min(Math.max(0, r2), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r2 * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l3;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l3 = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l3, a, b];
    };
    convert.lab.xyz = function(lab) {
      var l3 = lab[0];
      var a = lab[1];
      var b = lab[2];
      var x;
      var y;
      var z;
      y = (l3 + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      var y2 = Math.pow(y, 3);
      var x2 = Math.pow(x, 3);
      var z2 = Math.pow(z, 3);
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      var l3 = lab[0];
      var a = lab[1];
      var b = lab[2];
      var hr;
      var h2;
      var c;
      hr = Math.atan2(b, a);
      h2 = hr * 360 / 2 / Math.PI;
      if (h2 < 0) {
        h2 += 360;
      }
      c = Math.sqrt(a * a + b * b);
      return [l3, c, h2];
    };
    convert.lch.lab = function(lch) {
      var l3 = lch[0];
      var c = lch[1];
      var h2 = lch[2];
      var a;
      var b;
      var hr;
      hr = h2 / 360 * 2 * Math.PI;
      a = c * Math.cos(hr);
      b = c * Math.sin(hr);
      return [l3, a, b];
    };
    convert.rgb.ansi16 = function(args) {
      var r2 = args[0];
      var g = args[1];
      var b = args[2];
      var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r2 / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      var r2 = args[0];
      var g = args[1];
      var b = args[2];
      if (r2 === g && g === b) {
        if (r2 < 8) {
          return 16;
        }
        if (r2 > 248) {
          return 231;
        }
        return Math.round((r2 - 8) / 247 * 24) + 232;
      }
      var ansi = 16 + 36 * Math.round(r2 / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      var color2 = args % 10;
      if (color2 === 0 || color2 === 7) {
        if (args > 50) {
          color2 += 3.5;
        }
        color2 = color2 / 10.5 * 255;
        return [color2, color2, color2];
      }
      var mult = (~~(args > 50) + 1) * 0.5;
      var r2 = (color2 & 1) * mult * 255;
      var g = (color2 >> 1 & 1) * mult * 255;
      var b = (color2 >> 2 & 1) * mult * 255;
      return [r2, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        var c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      var rem;
      var r2 = Math.floor(args / 36) / 5 * 255;
      var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      var b = rem % 6 / 5 * 255;
      return [r2, g, b];
    };
    convert.rgb.hex = function(args) {
      var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      var colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map(function(char) {
          return char + char;
        }).join("");
      }
      var integer = parseInt(colorString, 16);
      var r2 = integer >> 16 & 255;
      var g = integer >> 8 & 255;
      var b = integer & 255;
      return [r2, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      var r2 = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var max = Math.max(Math.max(r2, g), b);
      var min = Math.min(Math.min(r2, g), b);
      var chroma = max - min;
      var grayscale;
      var hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r2) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r2) / chroma;
      } else {
        hue = 4 + (r2 - g) / chroma + 4;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      var s = hsl[1] / 100;
      var l3 = hsl[2] / 100;
      var c = 1;
      var f = 0;
      if (l3 < 0.5) {
        c = 2 * s * l3;
      } else {
        c = 2 * s * (1 - l3);
      }
      if (c < 1) {
        f = (l3 - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var c = s * v;
      var f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      var h2 = hcg[0] / 360;
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      var pure = [0, 0, 0];
      var hi = h2 % 1 * 6;
      var v = hi % 1;
      var w = 1 - v;
      var mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      var f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var l3 = g * (1 - c) + 0.5 * c;
      var s = 0;
      if (l3 > 0 && l3 < 0.5) {
        s = c / (2 * l3);
      } else if (l3 >= 0.5 && l3 < 1) {
        s = c / (2 * (1 - l3));
      }
      return [hcg[0], s * 100, l3 * 100];
    };
    convert.hcg.hwb = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      var w = hwb[1] / 100;
      var b = hwb[2] / 100;
      var v = 1 - b;
      var c = v - w;
      var g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = convert.gray.hsv = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      var val = Math.round(gray[0] / 100 * 255) & 255;
      var integer = (val << 16) + (val << 8) + val;
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/color-convert/route.js"(exports, module) {
    var conversions = require_conversions();
    function buildGraph() {
      var graph = {};
      var models = Object.keys(conversions);
      for (var len = models.length, i3 = 0; i3 < len; i3++) {
        graph[models[i3]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      var graph = buildGraph();
      var queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        var current = queue.pop();
        var adjacents = Object.keys(conversions[current]);
        for (var len = adjacents.length, i3 = 0; i3 < len; i3++) {
          var adjacent = adjacents[i3];
          var node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      var path = [graph[toModel].parent, toModel];
      var fn = conversions[graph[toModel].parent][toModel];
      var cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path;
      return fn;
    }
    module.exports = function(fromModel) {
      var graph = deriveBFS(fromModel);
      var conversion = {};
      var models = Object.keys(graph);
      for (var len = models.length, i3 = 0; i3 < len; i3++) {
        var toModel = models[i3];
        var node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/color-convert/index.js"(exports, module) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      var wrappedFn = function(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      var wrappedFn = function(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        var result = fn(args);
        if (typeof result === "object") {
          for (var len = result.length, i3 = 0; i3 < len; i3++) {
            result[i3] = Math.round(result[i3]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach(function(fromModel) {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      var routes = route(fromModel);
      var routeModels = Object.keys(routes);
      routeModels.forEach(function(toModel) {
        var fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module.exports = convert;
  }
});

// node_modules/color/index.js
var require_color = __commonJS({
  "node_modules/color/index.js"(exports, module) {
    var colorString = require_color_string();
    var convert = require_color_convert();
    var _slice = [].slice;
    var skippedModels = [
      "keyword",
      "gray",
      "hex"
    ];
    var hashedModelKeys = {};
    Object.keys(convert).forEach(function(model) {
      hashedModelKeys[_slice.call(convert[model].labels).sort().join("")] = model;
    });
    var limiters = {};
    function Color(obj, model) {
      if (!(this instanceof Color)) {
        return new Color(obj, model);
      }
      if (model && model in skippedModels) {
        model = null;
      }
      if (model && !(model in convert)) {
        throw new Error("Unknown model: " + model);
      }
      var i3;
      var channels;
      if (obj == null) {
        this.model = "rgb";
        this.color = [0, 0, 0];
        this.valpha = 1;
      } else if (obj instanceof Color) {
        this.model = obj.model;
        this.color = obj.color.slice();
        this.valpha = obj.valpha;
      } else if (typeof obj === "string") {
        var result = colorString.get(obj);
        if (result === null) {
          throw new Error("Unable to parse color from string: " + obj);
        }
        this.model = result.model;
        channels = convert[this.model].channels;
        this.color = result.value.slice(0, channels);
        this.valpha = typeof result.value[channels] === "number" ? result.value[channels] : 1;
      } else if (obj.length) {
        this.model = model || "rgb";
        channels = convert[this.model].channels;
        var newArr = _slice.call(obj, 0, channels);
        this.color = zeroArray(newArr, channels);
        this.valpha = typeof obj[channels] === "number" ? obj[channels] : 1;
      } else if (typeof obj === "number") {
        obj &= 16777215;
        this.model = "rgb";
        this.color = [
          obj >> 16 & 255,
          obj >> 8 & 255,
          obj & 255
        ];
        this.valpha = 1;
      } else {
        this.valpha = 1;
        var keys = Object.keys(obj);
        if ("alpha" in obj) {
          keys.splice(keys.indexOf("alpha"), 1);
          this.valpha = typeof obj.alpha === "number" ? obj.alpha : 0;
        }
        var hashedKeys = keys.sort().join("");
        if (!(hashedKeys in hashedModelKeys)) {
          throw new Error("Unable to parse color from object: " + JSON.stringify(obj));
        }
        this.model = hashedModelKeys[hashedKeys];
        var labels = convert[this.model].labels;
        var color2 = [];
        for (i3 = 0; i3 < labels.length; i3++) {
          color2.push(obj[labels[i3]]);
        }
        this.color = zeroArray(color2);
      }
      if (limiters[this.model]) {
        channels = convert[this.model].channels;
        for (i3 = 0; i3 < channels; i3++) {
          var limit = limiters[this.model][i3];
          if (limit) {
            this.color[i3] = limit(this.color[i3]);
          }
        }
      }
      this.valpha = Math.max(0, Math.min(1, this.valpha));
      if (Object.freeze) {
        Object.freeze(this);
      }
    }
    Color.prototype = {
      toString: function() {
        return this.string();
      },
      toJSON: function() {
        return this[this.model]();
      },
      string: function(places) {
        var self = this.model in colorString.to ? this : this.rgb();
        self = self.round(typeof places === "number" ? places : 1);
        var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
        return colorString.to[self.model](args);
      },
      percentString: function(places) {
        var self = this.rgb().round(typeof places === "number" ? places : 1);
        var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
        return colorString.to.rgb.percent(args);
      },
      array: function() {
        return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
      },
      object: function() {
        var result = {};
        var channels = convert[this.model].channels;
        var labels = convert[this.model].labels;
        for (var i3 = 0; i3 < channels; i3++) {
          result[labels[i3]] = this.color[i3];
        }
        if (this.valpha !== 1) {
          result.alpha = this.valpha;
        }
        return result;
      },
      unitArray: function() {
        var rgb = this.rgb().color;
        rgb[0] /= 255;
        rgb[1] /= 255;
        rgb[2] /= 255;
        if (this.valpha !== 1) {
          rgb.push(this.valpha);
        }
        return rgb;
      },
      unitObject: function() {
        var rgb = this.rgb().object();
        rgb.r /= 255;
        rgb.g /= 255;
        rgb.b /= 255;
        if (this.valpha !== 1) {
          rgb.alpha = this.valpha;
        }
        return rgb;
      },
      round: function(places) {
        places = Math.max(places || 0, 0);
        return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
      },
      alpha: function(val) {
        if (arguments.length) {
          return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
        }
        return this.valpha;
      },
      red: getset("rgb", 0, maxfn(255)),
      green: getset("rgb", 1, maxfn(255)),
      blue: getset("rgb", 2, maxfn(255)),
      hue: getset(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, function(val) {
        return (val % 360 + 360) % 360;
      }),
      saturationl: getset("hsl", 1, maxfn(100)),
      lightness: getset("hsl", 2, maxfn(100)),
      saturationv: getset("hsv", 1, maxfn(100)),
      value: getset("hsv", 2, maxfn(100)),
      chroma: getset("hcg", 1, maxfn(100)),
      gray: getset("hcg", 2, maxfn(100)),
      white: getset("hwb", 1, maxfn(100)),
      wblack: getset("hwb", 2, maxfn(100)),
      cyan: getset("cmyk", 0, maxfn(100)),
      magenta: getset("cmyk", 1, maxfn(100)),
      yellow: getset("cmyk", 2, maxfn(100)),
      black: getset("cmyk", 3, maxfn(100)),
      x: getset("xyz", 0, maxfn(100)),
      y: getset("xyz", 1, maxfn(100)),
      z: getset("xyz", 2, maxfn(100)),
      l: getset("lab", 0, maxfn(100)),
      a: getset("lab", 1),
      b: getset("lab", 2),
      keyword: function(val) {
        if (arguments.length) {
          return new Color(val);
        }
        return convert[this.model].keyword(this.color);
      },
      hex: function(val) {
        if (arguments.length) {
          return new Color(val);
        }
        return colorString.to.hex(this.rgb().round().color);
      },
      rgbNumber: function() {
        var rgb = this.rgb().color;
        return (rgb[0] & 255) << 16 | (rgb[1] & 255) << 8 | rgb[2] & 255;
      },
      luminosity: function() {
        var rgb = this.rgb().color;
        var lum = [];
        for (var i3 = 0; i3 < rgb.length; i3++) {
          var chan = rgb[i3] / 255;
          lum[i3] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
      },
      contrast: function(color2) {
        var lum1 = this.luminosity();
        var lum2 = color2.luminosity();
        if (lum1 > lum2) {
          return (lum1 + 0.05) / (lum2 + 0.05);
        }
        return (lum2 + 0.05) / (lum1 + 0.05);
      },
      level: function(color2) {
        var contrastRatio = this.contrast(color2);
        if (contrastRatio >= 7.1) {
          return "AAA";
        }
        return contrastRatio >= 4.5 ? "AA" : "";
      },
      isDark: function() {
        var rgb = this.rgb().color;
        var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1e3;
        return yiq < 128;
      },
      isLight: function() {
        return !this.isDark();
      },
      negate: function() {
        var rgb = this.rgb();
        for (var i3 = 0; i3 < 3; i3++) {
          rgb.color[i3] = 255 - rgb.color[i3];
        }
        return rgb;
      },
      lighten: function(ratio) {
        var hsl = this.hsl();
        hsl.color[2] += hsl.color[2] * ratio;
        return hsl;
      },
      darken: function(ratio) {
        var hsl = this.hsl();
        hsl.color[2] -= hsl.color[2] * ratio;
        return hsl;
      },
      saturate: function(ratio) {
        var hsl = this.hsl();
        hsl.color[1] += hsl.color[1] * ratio;
        return hsl;
      },
      desaturate: function(ratio) {
        var hsl = this.hsl();
        hsl.color[1] -= hsl.color[1] * ratio;
        return hsl;
      },
      whiten: function(ratio) {
        var hwb = this.hwb();
        hwb.color[1] += hwb.color[1] * ratio;
        return hwb;
      },
      blacken: function(ratio) {
        var hwb = this.hwb();
        hwb.color[2] += hwb.color[2] * ratio;
        return hwb;
      },
      grayscale: function() {
        var rgb = this.rgb().color;
        var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
        return Color.rgb(val, val, val);
      },
      fade: function(ratio) {
        return this.alpha(this.valpha - this.valpha * ratio);
      },
      opaquer: function(ratio) {
        return this.alpha(this.valpha + this.valpha * ratio);
      },
      rotate: function(degrees) {
        var hsl = this.hsl();
        var hue = hsl.color[0];
        hue = (hue + degrees) % 360;
        hue = hue < 0 ? 360 + hue : hue;
        hsl.color[0] = hue;
        return hsl;
      },
      mix: function(mixinColor, weight) {
        if (!mixinColor || !mixinColor.rgb) {
          throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
        }
        var color1 = mixinColor.rgb();
        var color2 = this.rgb();
        var p = weight === void 0 ? 0.5 : weight;
        var w = 2 * p - 1;
        var a = color1.alpha() - color2.alpha();
        var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
        var w2 = 1 - w1;
        return Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
      }
    };
    Object.keys(convert).forEach(function(model) {
      if (skippedModels.indexOf(model) !== -1) {
        return;
      }
      var channels = convert[model].channels;
      Color.prototype[model] = function() {
        if (this.model === model) {
          return new Color(this);
        }
        if (arguments.length) {
          return new Color(arguments, model);
        }
        var newAlpha = typeof arguments[channels] === "number" ? channels : this.valpha;
        return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
      };
      Color[model] = function(color2) {
        if (typeof color2 === "number") {
          color2 = zeroArray(_slice.call(arguments), channels);
        }
        return new Color(color2, model);
      };
    });
    function roundTo(num, places) {
      return Number(num.toFixed(places));
    }
    function roundToPlace(places) {
      return function(num) {
        return roundTo(num, places);
      };
    }
    function getset(model, channel, modifier) {
      model = Array.isArray(model) ? model : [model];
      model.forEach(function(m) {
        (limiters[m] || (limiters[m] = []))[channel] = modifier;
      });
      model = model[0];
      return function(val) {
        var result;
        if (arguments.length) {
          if (modifier) {
            val = modifier(val);
          }
          result = this[model]();
          result.color[channel] = val;
          return result;
        }
        result = this[model]().color[channel];
        if (modifier) {
          result = modifier(result);
        }
        return result;
      };
    }
    function maxfn(max) {
      return function(v) {
        return Math.max(0, Math.min(max, v));
      };
    }
    function assertArray(val) {
      return Array.isArray(val) ? val : [val];
    }
    function zeroArray(arr, length) {
      for (var i3 = 0; i3 < length; i3++) {
        if (typeof arr[i3] !== "number") {
          arr[i3] = 0;
        }
      }
      return arr;
    }
    module.exports = Color;
  }
});

// src/components/color-picker/color-picker.ts
var import_color = __toModule(require_color());

// src/components/color-picker/color-picker.styles.ts
var color_picker_styles_default = i$1`
  ${component_styles_default}

  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: rgb(var(--sl-panel-background-color));
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
  }

  .color-picker--inline {
    border: solid 1px rgb(var(--sl-panel-border-color));
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(
        to bottom,
        hsl(0, 0%, 100%) 0%,
        hsla(0, 0%, 100%, 0) 50%,
        hsla(0, 0%, 0%, 0) 50%,
        hsl(0, 0%, 0%) 100%
      ),
      linear-gradient(to right, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
  }

  .color-picker__grid-handle${focusVisibleSelector} {
    outline: none;
    box-shadow: 0 0 0 1px rgb(var(--sl-color-primary-500)), var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle${focusVisibleSelector} {
    outline: none;
    box-shadow: 0 0 0 1px rgb(var(--sl-color-primary-500)), var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 3.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-input-border-radius-medium);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview${focusVisibleSelector} {
    box-shadow: var(--sl-focus-ring);
    outline: none;
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgb(var(--sl-focus-ring-color));
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px rgb(var(--sl-color-neutral-200));
    padding: var(--sl-spacing-small);
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch${focusVisibleSelector} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, rgb(var(--sl-color-neutral-300)) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgb(var(--sl-color-neutral-300)) 75%),
      linear-gradient(45deg, transparent 75%, rgb(var(--sl-color-neutral-300)) 75%),
      linear-gradient(45deg, rgb(var(--sl-color-neutral-300)) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position: 0 0, 0 0, -5px -5px, 5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: var(--sl-transition-fast) box-shadow;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
    transition: inherit;
  }

  .color-dropdown__trigger${focusVisibleSelector} {
    outline: none;
  }

  .color-dropdown__trigger${focusVisibleSelector}:not(.color-dropdown__trigger--disabled) {
    box-shadow: var(--sl-focus-ring);
    outline: none;
  }

  .color-dropdown__trigger${focusVisibleSelector}:not(.color-dropdown__trigger--disabled):before {
    box-shadow: inset 0 0 0 1px rgb(var(--sl-color-primary-500));
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// src/components/color-picker/color-picker.ts
var SlColorPicker$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.isSafeValue = false;
    this.inputValue = "";
    this.hue = 0;
    this.saturation = 100;
    this.lightness = 100;
    this.alpha = 100;
    this.value = "#ffffff";
    this.format = "hex";
    this.inline = false;
    this.size = "medium";
    this.noFormatToggle = false;
    this.name = "";
    this.disabled = false;
    this.invalid = false;
    this.hoist = false;
    this.opacity = false;
    this.uppercase = false;
    this.swatches = [
      "#d0021b",
      "#f5a623",
      "#f8e71c",
      "#8b572a",
      "#7ed321",
      "#417505",
      "#bd10e0",
      "#9013fe",
      "#4a90e2",
      "#50e3c2",
      "#b8e986",
      "#000",
      "#444",
      "#888",
      "#ccc",
      "#fff"
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.setColor(this.value)) {
      this.setColor(`#ffff`);
    }
    this.inputValue = this.value;
    this.lastValueEmitted = this.value;
    this.syncValues();
  }
  getFormattedValue(format = "hex") {
    const currentColor = this.parseColor(`hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`);
    if (!currentColor) {
      return "";
    }
    switch (format) {
      case "hex":
        return currentColor.hex;
      case "hexa":
        return currentColor.hexa;
      case "rgb":
        return currentColor.rgb.string;
      case "rgba":
        return currentColor.rgba.string;
      case "hsl":
        return currentColor.hsl.string;
      case "hsla":
        return currentColor.hsla.string;
      default:
        return "";
    }
  }
  reportValidity() {
    if (!this.inline && this.input.invalid) {
      return new Promise((resolve) => {
        this.dropdown.addEventListener("sl-after-show", () => {
          this.input.reportValidity();
          resolve();
        }, { once: true });
        this.dropdown.show();
      });
    } else {
      return this.input.reportValidity();
    }
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = this.input.invalid;
  }
  handleCopy() {
    this.input.select();
    document.execCommand("copy");
    this.previewButton.focus();
    this.previewButton.classList.add("color-picker__preview-color--copied");
    this.previewButton.addEventListener("animationend", () => this.previewButton.classList.remove("color-picker__preview-color--copied"));
  }
  handleFormatToggle() {
    const formats = ["hex", "rgb", "hsl"];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex];
  }
  handleAlphaDrag(event) {
    const container = this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha");
    const handle = container.querySelector(".color-picker__slider-handle");
    const { width } = container.getBoundingClientRect();
    handle.focus();
    event.preventDefault();
    this.handleDrag(event, container, (x) => {
      this.alpha = clamp(x / width * 100, 0, 100);
      this.syncValues();
    });
  }
  handleHueDrag(event) {
    const container = this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue");
    const handle = container.querySelector(".color-picker__slider-handle");
    const { width } = container.getBoundingClientRect();
    handle.focus();
    event.preventDefault();
    this.handleDrag(event, container, (x) => {
      this.hue = clamp(x / width * 360, 0, 360);
      this.syncValues();
    });
  }
  handleGridDrag(event) {
    const grid = this.shadowRoot.querySelector(".color-picker__grid");
    const handle = grid.querySelector(".color-picker__grid-handle");
    const { width, height } = grid.getBoundingClientRect();
    handle.focus();
    event.preventDefault();
    this.handleDrag(event, grid, (x, y) => {
      this.saturation = clamp(x / width * 100, 0, 100);
      this.lightness = clamp(100 - y / height * 100, 0, 100);
      this.syncValues();
    });
  }
  handleDrag(event, container, onMove) {
    if (this.disabled) {
      return;
    }
    const move = (event2) => {
      const dims = container.getBoundingClientRect();
      const defaultView = container.ownerDocument.defaultView;
      const offsetX = dims.left + defaultView.pageXOffset;
      const offsetY = dims.top + defaultView.pageYOffset;
      const x = (event2.changedTouches ? event2.changedTouches[0].pageX : event2.pageX) - offsetX;
      const y = (event2.changedTouches ? event2.changedTouches[0].pageY : event2.pageY) - offsetY;
      onMove(x, y);
    };
    move(event);
    const stop = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("mouseup", stop);
      document.removeEventListener("touchend", stop);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("touchmove", move);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchend", stop);
  }
  handleAlphaKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.alpha = clamp(this.alpha - increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.alpha = clamp(this.alpha + increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "Home") {
      event.preventDefault();
      this.alpha = 0;
      this.syncValues();
    }
    if (event.key === "End") {
      event.preventDefault();
      this.alpha = 100;
      this.syncValues();
    }
  }
  handleHueKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.hue = clamp(this.hue - increment, 0, 360);
      this.syncValues();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.hue = clamp(this.hue + increment, 0, 360);
      this.syncValues();
    }
    if (event.key === "Home") {
      event.preventDefault();
      this.hue = 0;
      this.syncValues();
    }
    if (event.key === "End") {
      event.preventDefault();
      this.hue = 360;
      this.syncValues();
    }
  }
  handleGridKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.saturation = clamp(this.saturation - increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.saturation = clamp(this.saturation + increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.lightness = clamp(this.lightness + increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.lightness = clamp(this.lightness - increment, 0, 100);
      this.syncValues();
    }
  }
  handleInputChange(event) {
    const target = event.target;
    this.setColor(target.value);
    target.value = this.value;
    event.stopPropagation();
  }
  handleInputKeyDown(event) {
    if (event.key === "Enter") {
      this.setColor(this.input.value);
      this.input.value = this.value;
      setTimeout(() => this.input.select());
    }
  }
  normalizeColorString(colorString) {
    if (/rgba?/i.test(colorString)) {
      const rgba = colorString.replace(/[^\d.%]/g, " ").split(" ").map((val) => val.trim()).filter((val) => val.length);
      if (rgba.length < 4) {
        rgba[3] = "1";
      }
      if (rgba[3].indexOf("%") > -1) {
        rgba[3] = (Number(rgba[3].replace(/%/g, "")) / 100).toString();
      }
      return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    }
    if (/hsla?/i.test(colorString)) {
      const hsla = colorString.replace(/[^\d.%]/g, " ").split(" ").map((val) => val.trim()).filter((val) => val.length);
      if (hsla.length < 4) {
        hsla[3] = "1";
      }
      if (hsla[3].indexOf("%") > -1) {
        hsla[3] = (Number(hsla[3].replace(/%/g, "")) / 100).toString();
      }
      return `hsla(${hsla[0]}, ${hsla[1]}, ${hsla[2]}, ${hsla[3]})`;
    }
    if (/^[0-9a-f]+$/i.test(colorString)) {
      return `#${colorString}`;
    }
    return colorString;
  }
  parseColor(colorString) {
    function toHex(value) {
      const hex2 = Math.round(value).toString(16);
      return hex2.length === 1 ? `0${hex2}` : hex2;
    }
    let parsed;
    colorString = this.normalizeColorString(colorString);
    try {
      parsed = (0, import_color.default)(colorString);
    } catch (e3) {
      return false;
    }
    const hsl = {
      h: parsed.hsl().color[0],
      s: parsed.hsl().color[1],
      l: parsed.hsl().color[2],
      a: parsed.hsl().valpha
    };
    const rgb = {
      r: parsed.rgb().color[0],
      g: parsed.rgb().color[1],
      b: parsed.rgb().color[2],
      a: parsed.rgb().valpha
    };
    const hex = {
      r: toHex(parsed.rgb().color[0]),
      g: toHex(parsed.rgb().color[1]),
      b: toHex(parsed.rgb().color[2]),
      a: toHex(parsed.rgb().valpha * 255)
    };
    return {
      hsl: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        string: this.setLetterCase(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`)
      },
      hsla: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        string: this.setLetterCase(`hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${Number(hsl.a.toFixed(2).toString())})`)
      },
      rgb: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        string: this.setLetterCase(`rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`)
      },
      rgba: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: rgb.a,
        string: this.setLetterCase(`rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${Number(rgb.a.toFixed(2).toString())})`)
      },
      hex: this.setLetterCase(`#${hex.r}${hex.g}${hex.b}`),
      hexa: this.setLetterCase(`#${hex.r}${hex.g}${hex.b}${hex.a}`)
    };
  }
  setColor(colorString) {
    const newColor = this.parseColor(colorString);
    if (!newColor) {
      return false;
    }
    this.hue = newColor.hsla.h;
    this.saturation = newColor.hsla.s;
    this.lightness = newColor.hsla.l;
    this.alpha = this.opacity ? newColor.hsla.a * 100 : 100;
    this.syncValues();
    return true;
  }
  setLetterCase(string) {
    if (typeof string !== "string")
      return "";
    return this.uppercase ? string.toUpperCase() : string.toLowerCase();
  }
  async syncValues() {
    const currentColor = this.parseColor(`hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`);
    if (!currentColor) {
      return;
    }
    if (this.format === "hsl") {
      this.inputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
    } else if (this.format === "rgb") {
      this.inputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
    } else {
      this.inputValue = this.opacity ? currentColor.hexa : currentColor.hex;
    }
    this.isSafeValue = true;
    this.value = this.inputValue;
    await this.updateComplete;
    this.isSafeValue = false;
  }
  handleAfterHide() {
    this.previewButton.classList.remove("color-picker__preview-color--copied");
  }
  handleFormatChange() {
    this.syncValues();
  }
  handleOpacityChange() {
    this.alpha = 100;
  }
  handleValueChange(oldValue, newValue) {
    if (!this.isSafeValue) {
      const newColor = this.parseColor(newValue);
      if (newColor) {
        this.inputValue = this.value;
        this.hue = newColor.hsla.h;
        this.saturation = newColor.hsla.s;
        this.lightness = newColor.hsla.l;
        this.alpha = newColor.hsla.a * 100;
      } else {
        this.inputValue = oldValue;
      }
    }
    if (this.value !== this.lastValueEmitted) {
      emit(this, "sl-change");
      this.lastValueEmitted = this.value;
    }
  }
  render() {
    const x = this.saturation;
    const y = 100 - this.lightness;
    const colorPicker = T`
      <div
        part="base"
        class=${e2$1({
      "color-picker": true,
      "color-picker--inline": this.inline,
      "color-picker--disabled": this.disabled
    })}
        aria-disabled=${this.disabled ? "true" : "false"}
      >
        <div
          part="grid"
          class="color-picker__grid"
          style=${i2({ backgroundColor: `hsl(${this.hue}deg, 100%, 50%)` })}
          @mousedown=${this.handleGridDrag}
          @touchstart=${this.handleGridDrag}
        >
          <span
            part="grid-handle"
            class="color-picker__grid-handle"
            style=${i2({
      top: `${y}%`,
      left: `${x}%`,
      backgroundColor: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`
    })}
            role="slider"
            aria-label="HSL"
            aria-valuetext=${`hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(this.lightness)}%)`}
            tabindex=${l(this.disabled ? void 0 : "0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @mousedown=${this.handleHueDrag}
              @touchstart=${this.handleHueDrag}
            >
              <span
                part="slider-handle"
                class="color-picker__slider-handle"
                style=${i2({
      left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
    })}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${Math.round(this.hue)}
                tabindex=${l(this.disabled ? void 0 : "0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity ? T`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @mousedown="${this.handleAlphaDrag}"
                    @touchstart="${this.handleAlphaDrag}"
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${i2({
      backgroundImage: `linear-gradient(
                          to right,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                        )`
    })}
                    ></div>
                    <span
                      part="slider-handle"
                      class="color-picker__slider-handle"
                      style=${i2({
      left: `${this.alpha}%`
    })}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${l(this.disabled ? void 0 : "0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                ` : ""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            style=${i2({
      "--preview-color": `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    })}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${l$1(this.inputValue)}
            ?disabled=${this.disabled}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
          ></sl-input>

          ${!this.noFormatToggle ? T`
                <sl-button exportparts="base:format-button" @click=${this.handleFormatToggle}>
                  ${this.setLetterCase(this.format)}
                </sl-button>
              ` : ""}
        </div>

        ${this.swatches ? T`
              <div part="swatches" class="color-picker__swatches">
                ${this.swatches.map((swatch) => {
      return T`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${l(this.disabled ? void 0 : "0")}
                      role="button"
                      aria-label=${swatch}
                      @click=${() => !this.disabled && this.setColor(swatch)}
                      @keydown=${(event) => !this.disabled && event.key === "Enter" && this.setColor(swatch)}
                    >
                      <div class="color-picker__swatch-color" style=${i2({ backgroundColor: swatch })}></div>
                    </div>
                  `;
    })}
              </div>
            ` : ""}
      </div>
    `;
    if (this.inline) {
      return colorPicker;
    }
    return T`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled ? "true" : "false"}
        .containing-element=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${e2$1({
      "color-dropdown__trigger": true,
      "color-dropdown__trigger--disabled": this.disabled,
      "color-dropdown__trigger--small": this.size === "small",
      "color-dropdown__trigger--medium": this.size === "medium",
      "color-dropdown__trigger--large": this.size === "large",
      "color-picker__transparent-bg": true
    })}
          style=${i2({
      color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    })}
          type="button"
        ></button>
        ${colorPicker}
      </sl-dropdown>
    `;
  }
};
SlColorPicker$1.styles = color_picker_styles_default;
__decorateClass([
  o2$1('[part="input"]')
], SlColorPicker$1.prototype, "input", 2);
__decorateClass([
  o2$1('[part="preview"]')
], SlColorPicker$1.prototype, "previewButton", 2);
__decorateClass([
  o2$1(".color-dropdown")
], SlColorPicker$1.prototype, "dropdown", 2);
__decorateClass([
  r()
], SlColorPicker$1.prototype, "inputValue", 2);
__decorateClass([
  r()
], SlColorPicker$1.prototype, "hue", 2);
__decorateClass([
  r()
], SlColorPicker$1.prototype, "saturation", 2);
__decorateClass([
  r()
], SlColorPicker$1.prototype, "lightness", 2);
__decorateClass([
  r()
], SlColorPicker$1.prototype, "alpha", 2);
__decorateClass([
  e()
], SlColorPicker$1.prototype, "value", 2);
__decorateClass([
  e()
], SlColorPicker$1.prototype, "format", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlColorPicker$1.prototype, "inline", 2);
__decorateClass([
  e()
], SlColorPicker$1.prototype, "size", 2);
__decorateClass([
  e({ attribute: "no-format-toggle", type: Boolean })
], SlColorPicker$1.prototype, "noFormatToggle", 2);
__decorateClass([
  e()
], SlColorPicker$1.prototype, "name", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlColorPicker$1.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlColorPicker$1.prototype, "invalid", 2);
__decorateClass([
  e({ type: Boolean })
], SlColorPicker$1.prototype, "hoist", 2);
__decorateClass([
  e({ type: Boolean })
], SlColorPicker$1.prototype, "opacity", 2);
__decorateClass([
  e({ type: Boolean })
], SlColorPicker$1.prototype, "uppercase", 2);
__decorateClass([
  e({ attribute: false })
], SlColorPicker$1.prototype, "swatches", 2);
__decorateClass([
  watch("format")
], SlColorPicker$1.prototype, "handleFormatChange", 1);
__decorateClass([
  watch("opacity")
], SlColorPicker$1.prototype, "handleOpacityChange", 1);
__decorateClass([
  watch("value")
], SlColorPicker$1.prototype, "handleValueChange", 1);
SlColorPicker$1 = __decorateClass([
  n("sl-color-picker")
], SlColorPicker$1);
var color_picker_default = SlColorPicker$1;

// src/components/input/input.styles.ts
var input_styles_default = i$1`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    background-color: rgb(var(--sl-input-background-color));
    border: solid var(--sl-input-border-width) rgb(var(--sl-input-border-color));
    vertical-align: middle;
    overflow: hidden;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: text;
  }

  .input:hover:not(.input--disabled) {
    background-color: rgb(var(--sl-input-background-color-hover));
    border-color: rgb(var(--sl-input-border-color-hover));
  }

  .input:hover:not(.input--disabled) .input__control {
    color: rgb(var(--sl-input-color-hover));
  }

  .input.input--focused:not(.input--disabled) {
    background-color: rgb(var(--sl-input-background-color-focus));
    border-color: rgb(var(--sl-input-border-color-focus));
    box-shadow: var(--sl-focus-ring);
  }

  .input.input--focused:not(.input--disabled) .input__control {
    color: rgb(var(--sl-input-color-focus));
  }

  .input.input--disabled {
    background-color: rgb(var(--sl-input-background-color-disabled));
    border-color: rgb(var(--sl-input-border-color-disabled));
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input.input--disabled .input__control {
    color: rgb(var(--sl-input-color-disabled));
  }

  .input.input--disabled .input__control::placeholder {
    color: rgb(var(--sl-input-placeholder-color-disabled));
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: rgb(var(--sl-input-color));
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) rgb(var(--sl-input-background-color-hover)) inset !important;
    -webkit-text-fill-color: rgb(var(--sl-color-primary-500));
  }

  .input__control::placeholder {
    color: rgb(var(--sl-input-placeholder-color));
    user-select: none;
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: rgb(var(--sl-input-icon-color));
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    margin: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    margin-right: var(--sl-input-spacing-small);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    margin: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    margin-right: var(--sl-input-spacing-medium);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    margin: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    margin-right: var(--sl-input-spacing-large);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-left: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-right: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    font-size: inherit;
    color: rgb(var(--sl-input-icon-color));
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: rgb(var(--sl-input-icon-color-hover));
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }
`;

// src/components/input/input.ts
var id$4 = 0;
var SlInput$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.inputId = `input-${++id$4}`;
    this.helpTextId = `input-help-text-${id$4}`;
    this.labelId = `input-label-${id$4}`;
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasLabelSlot = false;
    this.isPasswordVisible = false;
    this.type = "text";
    this.size = "medium";
    this.value = "";
    this.pill = false;
    this.helpText = "";
    this.clearable = false;
    this.togglePassword = false;
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.invalid = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  select() {
    return this.input.select();
  }
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  setRangeText(replacement, start, end, selectMode = "preserve") {
    this.input.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      emit(this, "sl-input");
      emit(this, "sl-change");
    }
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    emit(this, "sl-change");
  }
  handleClearClick(event) {
    this.value = "";
    emit(this, "sl-clear");
    emit(this, "sl-input");
    emit(this, "sl-change");
    this.input.focus();
    event.stopPropagation();
  }
  handleDisabledChange() {
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    emit(this, "sl-input");
  }
  handleInvalid() {
    this.invalid = true;
  }
  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, "help-text");
    this.hasLabelSlot = hasSlot(this, "label");
  }
  handleValueChange() {
    if (this.input) {
      this.invalid = !this.input.checkValidity();
    }
  }
  render() {
    var _a, _b;
    return renderFormControl({
      inputId: this.inputId,
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpTextId: this.helpTextId,
      helpText: this.helpText,
      hasHelpTextSlot: this.hasHelpTextSlot,
      size: this.size
    }, T`
        <div
          part="base"
          class=${e2$1({
      input: true,
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      "input--pill": this.pill,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": ((_a = this.value) == null ? void 0 : _a.length) === 0,
      "input--invalid": this.invalid
    })}
        >
          <span part="prefix" class="input__prefix">
            <slot name="prefix"></slot>
          </span>

          <input
            part="input"
            id=${this.inputId}
            class="input__control"
            type=${this.type === "password" && this.isPasswordVisible ? "text" : this.type}
            name=${l(this.name)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            placeholder=${l(this.placeholder)}
            minlength=${l(this.minlength)}
            maxlength=${l(this.maxlength)}
            min=${l(this.min)}
            max=${l(this.max)}
            step=${l(this.step)}
            .value=${l$1(this.value)}
            autocapitalize=${l(this.autocapitalize)}
            autocomplete=${l(this.autocomplete)}
            autocorrect=${l(this.autocorrect)}
            ?autofocus=${this.autofocus}
            spellcheck=${l(this.spellcheck)}
            pattern=${l(this.pattern)}
            inputmode=${l(this.inputmode)}
            aria-labelledby=${l(getLabelledBy({
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpText: this.helpText,
      helpTextId: this.helpTextId,
      hasHelpTextSlot: this.hasHelpTextSlot
    }))}
            aria-invalid=${this.invalid ? "true" : "false"}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />

          ${this.clearable && ((_b = this.value) == null ? void 0 : _b.length) > 0 ? T`
                <button
                  part="clear-button"
                  class="input__clear"
                  type="button"
                  @click=${this.handleClearClick}
                  tabindex="-1"
                >
                  <slot name="clear-icon">
                    <sl-icon name="x-circle" library="system"></sl-icon>
                  </slot>
                </button>
              ` : ""}
          ${this.togglePassword ? T`
                <button
                  part="password-toggle-button"
                  class="input__password-toggle"
                  type="button"
                  @click=${this.handlePasswordToggle}
                  tabindex="-1"
                >
                  ${this.isPasswordVisible ? T`
                        <slot name="show-password-icon">
                          <sl-icon name="eye-slash" library="system"></sl-icon>
                        </slot>
                      ` : T`
                        <slot name="hide-password-icon">
                          ${" "}
                          <sl-icon name="eye" library="system"></sl-icon>
                        </slot>
                      `}
                </button>
              ` : ""}

          <span part="suffix" class="input__suffix">
            <slot name="suffix"></slot>
          </span>
        </div>
      `);
  }
};
SlInput$1.styles = input_styles_default;
__decorateClass([
  o2$1(".input__control")
], SlInput$1.prototype, "input", 2);
__decorateClass([
  r()
], SlInput$1.prototype, "hasFocus", 2);
__decorateClass([
  r()
], SlInput$1.prototype, "hasHelpTextSlot", 2);
__decorateClass([
  r()
], SlInput$1.prototype, "hasLabelSlot", 2);
__decorateClass([
  r()
], SlInput$1.prototype, "isPasswordVisible", 2);
__decorateClass([
  e({ reflect: true })
], SlInput$1.prototype, "type", 2);
__decorateClass([
  e({ reflect: true })
], SlInput$1.prototype, "size", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "name", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput$1.prototype, "pill", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "label", 2);
__decorateClass([
  e({ attribute: "help-text" })
], SlInput$1.prototype, "helpText", 2);
__decorateClass([
  e({ type: Boolean })
], SlInput$1.prototype, "clearable", 2);
__decorateClass([
  e({ attribute: "toggle-password", type: Boolean })
], SlInput$1.prototype, "togglePassword", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "placeholder", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput$1.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput$1.prototype, "readonly", 2);
__decorateClass([
  e({ type: Number })
], SlInput$1.prototype, "minlength", 2);
__decorateClass([
  e({ type: Number })
], SlInput$1.prototype, "maxlength", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "min", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "max", 2);
__decorateClass([
  e({ type: Number })
], SlInput$1.prototype, "step", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "pattern", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput$1.prototype, "required", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput$1.prototype, "invalid", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "autocapitalize", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "autocorrect", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "autocomplete", 2);
__decorateClass([
  e({ type: Boolean })
], SlInput$1.prototype, "autofocus", 2);
__decorateClass([
  e({ type: Boolean })
], SlInput$1.prototype, "spellcheck", 2);
__decorateClass([
  e()
], SlInput$1.prototype, "inputmode", 2);
__decorateClass([
  watch("disabled")
], SlInput$1.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("helpText"),
  watch("label")
], SlInput$1.prototype, "handleSlotChange", 1);
__decorateClass([
  watch("value")
], SlInput$1.prototype, "handleValueChange", 1);
SlInput$1 = __decorateClass([
  n("sl-input")
], SlInput$1);
var input_default = SlInput$1;

// src/internal/tabbable.ts
function isTabbable(el) {
  const tag = el.tagName.toLowerCase();
  if (el.getAttribute("tabindex") === "-1") {
    return false;
  }
  if (el.hasAttribute("disabled")) {
    return false;
  }
  if (el.hasAttribute("aria-disabled") && el.getAttribute("aria-disabled") !== "false") {
    return false;
  }
  if (tag === "input" && el.getAttribute("type") === "radio" && !el.hasAttribute("checked")) {
    return false;
  }
  if (!el.offsetParent) {
    return false;
  }
  if (window.getComputedStyle(el).visibility === "hidden") {
    return false;
  }
  if ((tag === "audio" || tag === "video") && el.hasAttribute("controls")) {
    return true;
  }
  if (el.hasAttribute("tabindex")) {
    return true;
  }
  if (el.hasAttribute("contenteditable") && el.getAttribute("contenteditable") !== "false") {
    return true;
  }
  return ["button", "input", "select", "textarea", "a", "audio", "video", "summary"].includes(tag);
}
function getTabbableBoundary(root) {
  const allElements = [];
  function walk(el) {
    if (el instanceof HTMLElement) {
      allElements.push(el);
      if (el.shadowRoot && el.shadowRoot.mode === "open") {
        walk(el.shadowRoot);
      }
    }
    [...el.querySelectorAll("*")].map((e) => walk(e));
  }
  walk(root);
  const start = allElements.find((el) => isTabbable(el)) || null;
  const end = allElements.reverse().find((el) => isTabbable(el)) || null;
  return { start, end };
}

// src/components/dropdown/dropdown.styles.ts
var dropdown_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .dropdown {
    position: relative;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__positioner {
    position: absolute;
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown__panel {
    max-height: 75vh;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: rgb(var(--sl-panel-background-color));
    border: solid 1px rgb(var(--sl-panel-border-color));
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-large);
    overflow: auto;
    overscroll-behavior: none;
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    pointer-events: all;
  }

  .dropdown__positioner[data-popper-placement^='top'] .dropdown__panel {
    transform-origin: bottom;
  }

  .dropdown__positioner[data-popper-placement^='bottom'] .dropdown__panel {
    transform-origin: top;
  }

  .dropdown__positioner[data-popper-placement^='left'] .dropdown__panel {
    transform-origin: right;
  }

  .dropdown__positioner[data-popper-placement^='right'] .dropdown__panel {
    transform-origin: left;
  }
`;

// src/components/dropdown/dropdown.ts
var id$3 = 0;
var SlDropdown = class extends h3 {
  constructor() {
    super(...arguments);
    this.componentId = `dropdown-${++id$3}`;
    this.open = false;
    this.placement = "bottom-start";
    this.disabled = false;
    this.stayOpenOnSelect = false;
    this.distance = 2;
    this.skidding = 0;
    this.hoist = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleMenuItemActivate = this.handleMenuItemActivate.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    if (!this.containingElement) {
      this.containingElement = this;
    }
    this.updateComplete.then(() => {
      this.popover = createPopper(this.trigger, this.positioner, {
        placement: this.placement,
        strategy: this.hoist ? "fixed" : "absolute",
        modifiers: [
          {
            name: "flip",
            options: {
              boundary: "viewport"
            }
          },
          {
            name: "offset",
            options: {
              offset: [this.skidding, this.distance]
            }
          }
        ]
      });
    });
  }
  firstUpdated() {
    this.panel.hidden = !this.open;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.hide();
    this.popover.destroy();
  }
  focusOnTrigger() {
    const slot = this.trigger.querySelector("slot");
    const trigger = slot.assignedElements({ flatten: true })[0];
    if (trigger && typeof trigger.focus === "function") {
      trigger.focus();
    }
  }
  getMenu() {
    const slot = this.panel.querySelector("slot");
    return slot.assignedElements({ flatten: true }).filter((el) => el.tagName.toLowerCase() === "sl-menu")[0];
  }
  handleDocumentKeyDown(event) {
    var _a;
    if (event.key === "Escape") {
      this.hide();
      this.focusOnTrigger();
      return;
    }
    if (event.key === "Tab") {
      if (this.open && ((_a = document.activeElement) == null ? void 0 : _a.tagName.toLowerCase()) === "sl-menu-item") {
        event.preventDefault();
        this.hide();
        this.focusOnTrigger();
        return;
      }
      setTimeout(() => {
        var _a2, _b;
        const activeElement = this.containingElement.getRootNode() instanceof ShadowRoot ? (_b = (_a2 = document.activeElement) == null ? void 0 : _a2.shadowRoot) == null ? void 0 : _b.activeElement : document.activeElement;
        if ((activeElement == null ? void 0 : activeElement.closest(this.containingElement.tagName.toLowerCase())) !== this.containingElement) {
          this.hide();
          return;
        }
      });
    }
  }
  handleDocumentMouseDown(event) {
    const path = event.composedPath();
    if (!path.includes(this.containingElement)) {
      this.hide();
      return;
    }
  }
  handleMenuItemActivate(event) {
    const item = event.target;
    scrollIntoView(item, this.panel);
  }
  handlePanelSelect(event) {
    const target = event.target;
    if (!this.stayOpenOnSelect && target.tagName.toLowerCase() === "sl-menu") {
      this.hide();
      this.focusOnTrigger();
    }
  }
  handlePopoverOptionsChange() {
    if (this.popover) {
      this.popover.setOptions({
        placement: this.placement,
        strategy: this.hoist ? "fixed" : "absolute",
        modifiers: [
          {
            name: "flip",
            options: {
              boundary: "viewport"
            }
          },
          {
            name: "offset",
            options: {
              offset: [this.skidding, this.distance]
            }
          }
        ]
      });
    }
  }
  handleTriggerClick() {
    this.open ? this.hide() : this.show();
  }
  handleTriggerKeyDown(event) {
    const menu = this.getMenu();
    const menuItems = menu ? [...menu.querySelectorAll("sl-menu-item")] : [];
    const firstMenuItem = menuItems[0];
    const lastMenuItem = menuItems[menuItems.length - 1];
    if (event.key === "Escape") {
      this.focusOnTrigger();
      this.hide();
      return;
    }
    if ([" ", "Enter"].includes(event.key)) {
      event.preventDefault();
      this.open ? this.hide() : this.show();
      return;
    }
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      if (!this.open) {
        this.show();
      }
      if (event.key === "ArrowDown" && firstMenuItem) {
        const menu2 = this.getMenu();
        menu2.setCurrentItem(firstMenuItem);
        firstMenuItem.focus();
        return;
      }
      if (event.key === "ArrowUp" && lastMenuItem) {
        menu.setCurrentItem(lastMenuItem);
        lastMenuItem.focus();
        return;
      }
    }
    const ignoredKeys = ["Tab", "Shift", "Meta", "Ctrl", "Alt"];
    if (this.open && menu && !ignoredKeys.includes(event.key)) {
      menu.typeToSelect(event.key);
      return;
    }
  }
  handleTriggerKeyUp(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }
  handleTriggerSlotChange() {
    this.updateAccessibleTrigger();
  }
  updateAccessibleTrigger() {
    if (this.trigger) {
      const slot = this.trigger.querySelector("slot");
      const assignedElements = slot.assignedElements({ flatten: true });
      const accessibleTrigger = assignedElements.find((el) => getTabbableBoundary(el).start);
      if (accessibleTrigger) {
        accessibleTrigger.setAttribute("aria-haspopup", "true");
        accessibleTrigger.setAttribute("aria-expanded", this.open ? "true" : "false");
      }
    }
  }
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  reposition() {
    if (!this.open) {
      return;
    }
    this.popover.update();
  }
  async handleOpenChange() {
    if (this.disabled) {
      return;
    }
    this.updateAccessibleTrigger();
    if (this.open) {
      emit(this, "sl-show");
      this.panel.addEventListener("sl-activate", this.handleMenuItemActivate);
      this.panel.addEventListener("sl-select", this.handlePanelSelect);
      document.addEventListener("keydown", this.handleDocumentKeyDown);
      document.addEventListener("mousedown", this.handleDocumentMouseDown);
      await stopAnimations(this);
      this.popover.update();
      this.panel.hidden = false;
      const { keyframes, options } = getAnimation(this, "dropdown.show");
      await animateTo(this.panel, keyframes, options);
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      this.panel.removeEventListener("sl-activate", this.handleMenuItemActivate);
      this.panel.removeEventListener("sl-select", this.handlePanelSelect);
      document.removeEventListener("keydown", this.handleDocumentKeyDown);
      document.removeEventListener("mousedown", this.handleDocumentMouseDown);
      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, "dropdown.hide");
      await animateTo(this.panel, keyframes, options);
      this.panel.hidden = true;
      emit(this, "sl-after-hide");
    }
  }
  render() {
    return T`
      <div
        part="base"
        id=${this.componentId}
        class=${e2$1({
      dropdown: true,
      "dropdown--open": this.open
    })}
      >
        <span
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        >
          <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>
        </span>

        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div
            part="panel"
            class="dropdown__panel"
            role="menu"
            aria-hidden=${this.open ? "false" : "true"}
            aria-labelledby=${this.componentId}
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
};
SlDropdown.styles = dropdown_styles_default;
__decorateClass([
  o2$1(".dropdown__trigger")
], SlDropdown.prototype, "trigger", 2);
__decorateClass([
  o2$1(".dropdown__panel")
], SlDropdown.prototype, "panel", 2);
__decorateClass([
  o2$1(".dropdown__positioner")
], SlDropdown.prototype, "positioner", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDropdown.prototype, "open", 2);
__decorateClass([
  e()
], SlDropdown.prototype, "placement", 2);
__decorateClass([
  e({ type: Boolean })
], SlDropdown.prototype, "disabled", 2);
__decorateClass([
  e({ attribute: "stay-open-on-select", type: Boolean, reflect: true })
], SlDropdown.prototype, "stayOpenOnSelect", 2);
__decorateClass([
  e({ attribute: false })
], SlDropdown.prototype, "containingElement", 2);
__decorateClass([
  e({ type: Number })
], SlDropdown.prototype, "distance", 2);
__decorateClass([
  e({ type: Number })
], SlDropdown.prototype, "skidding", 2);
__decorateClass([
  e({ type: Boolean })
], SlDropdown.prototype, "hoist", 2);
__decorateClass([
  watch("distance"),
  watch("hoist"),
  watch("placement"),
  watch("skidding")
], SlDropdown.prototype, "handlePopoverOptionsChange", 1);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDropdown.prototype, "handleOpenChange", 1);
SlDropdown = __decorateClass([
  n("sl-dropdown")
], SlDropdown);
var dropdown_default = SlDropdown;
setDefaultAnimation("dropdown.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.9)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 150, easing: "ease" }
});
setDefaultAnimation("dropdown.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.9)" }
  ],
  options: { duration: 150, easing: "ease" }
});

// src/components/button/button.styles.ts
var button_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-fast) background-color, var(--sl-transition-fast) color,
      var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button.button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up */
  .button.button--disabled * {
    pointer-events: none;
  }

  /* Clicks on icons shouldn't prevent the button from gaining focus */
  .button::slotted(sl-icon) {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .button__label ::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button.button--default {
    background-color: rgb(var(--sl-color-neutral-0));
    border-color: rgb(var(--sl-color-neutral-300));
    color: rgb(var(--sl-color-neutral-700));
  }

  .button.button--default:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-50));
    border-color: rgb(var(--sl-color-primary-300));
    color: rgb(var(--sl-color-primary-700));
  }

  .button.button--default${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-50));
    border-color: rgb(var(--sl-color-primary-400));
    color: rgb(var(--sl-color-primary-700));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  .button.button--default:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-100));
    border-color: rgb(var(--sl-color-primary-400));
    color: rgb(var(--sl-color-primary-700));
  }

  /* Primary */
  .button.button--primary {
    background-color: rgb(var(--sl-color-primary-600));
    border-color: rgb(var(--sl-color-primary-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button.button--primary:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-500));
    border-color: rgb(var(--sl-color-primary-500));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button.button--primary${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-500));
    border-color: rgb(var(--sl-color-primary-500));
    color: rgb(var(--sl-color-neutral-0));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  .button.button--primary:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-600));
    border-color: rgb(var(--sl-color-primary-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Success */
  .button.button--success {
    background-color: rgb(var(--sl-color-success-600));
    border-color: rgb(var(--sl-color-success-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button.button--success:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-success-500));
    border-color: rgb(var(--sl-color-success-500));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button.button--success${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-success-600));
    border-color: rgb(var(--sl-color-success-600));
    color: rgb(var(--sl-color-neutral-0));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-success-500) / var(--sl-focus-ring-alpha));
  }

  .button.button--success:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-success-600));
    border-color: rgb(var(--sl-color-success-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Neutral */
  .button.button--neutral {
    background-color: rgb(var(--sl-color-neutral-600));
    border-color: rgb(var(--sl-color-neutral-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button.button--neutral:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-neutral-500));
    border-color: rgb(var(--sl-color-neutral-500));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button.button--neutral${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-neutral-500));
    border-color: rgb(var(--sl-color-neutral-500));
    color: rgb(var(--sl-color-neutral-0));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-neutral-500) / var(--sl-focus-ring-alpha));
  }

  .button.button--neutral:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-neutral-600));
    border-color: rgb(var(--sl-color-neutral-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Warning */
  .button.button--warning {
    background-color: rgb(var(--sl-color-warning-600));
    border-color: rgb(var(--sl-color-warning-600));
    color: rgb(var(--sl-color-neutral-0));
  }
  .button.button--warning:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-warning-500));
    border-color: rgb(var(--sl-color-warning-500));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button.button--warning${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-warning-500));
    border-color: rgb(var(--sl-color-warning-500));
    color: rgb(var(--sl-color-neutral-0));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-warning-500) / var(--sl-focus-ring-alpha));
  }

  .button.button--warning:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-warning-600));
    border-color: rgb(var(--sl-color-warning-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Danger */
  .button.button--danger {
    background-color: rgb(var(--sl-color-danger-600));
    border-color: rgb(var(--sl-color-danger-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button.button--danger:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-danger-500));
    border-color: rgb(var(--sl-color-danger-500));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button.button--danger${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-danger-500));
    border-color: rgb(var(--sl-color-danger-500));
    color: rgb(var(--sl-color-neutral-0));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-danger-500) / var(--sl-focus-ring-alpha));
  }

  .button.button--danger:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-danger-600));
    border-color: rgb(var(--sl-color-danger-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: rgb(var(--sl-color-primary-600));
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: rgb(var(--sl-color-primary-500));
  }

  .button--text${focusVisibleSelector}:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: rgb(var(--sl-color-primary-500));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: rgb(var(--sl-color-primary-700));
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    display: flex;
    align-items: center;
  }

  .button--caret .button__caret svg {
    width: 1em;
    height: 1em;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    pointer-events: none;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-right: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first) .button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last) .button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-left: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(.sl-button-group__button:not(.sl-button-group__button--focus, .sl-button-group__button--first, [type='default']):not(:hover, :active, :focus))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-left: solid 1px rgb(var(--sl-color-neutral-0) / 20%);
  }

  /* Bump focused buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  :host(.sl-button-group__button--focus) {
    z-index: 2;
  }
`;

// src/components/button/button.ts
var SlButton$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.hasLabel = false;
    this.hasPrefix = false;
    this.hasSuffix = false;
    this.type = "default";
    this.size = "medium";
    this.caret = false;
    this.disabled = false;
    this.loading = false;
    this.pill = false;
    this.circle = false;
    this.submit = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange();
  }
  click() {
    this.button.click();
  }
  focus(options) {
    this.button.focus(options);
  }
  blur() {
    this.button.blur();
  }
  handleSlotChange() {
    this.hasLabel = hasSlot(this);
    this.hasPrefix = hasSlot(this, "prefix");
    this.hasSuffix = hasSlot(this, "suffix");
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "sl-focus");
  }
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  render() {
    const isLink = this.href ? true : false;
    const interior = T`
      <span part="prefix" class="button__prefix">
        <slot @slotchange=${this.handleSlotChange} name="prefix"></slot>
      </span>
      <span part="label" class="button__label">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </span>
      <span part="suffix" class="button__suffix">
        <slot @slotchange=${this.handleSlotChange} name="suffix"></slot>
      </span>
      ${this.caret ? T`
            <span part="caret" class="button__caret">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          ` : ""}
      ${this.loading ? T`<sl-spinner></sl-spinner>` : ""}
    `;
    return isLink ? T`
          <a
            part="base"
            class=${e2$1({
      button: true,
      "button--default": this.type === "default",
      "button--primary": this.type === "primary",
      "button--success": this.type === "success",
      "button--neutral": this.type === "neutral",
      "button--warning": this.type === "warning",
      "button--danger": this.type === "danger",
      "button--text": this.type === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--pill": this.pill,
      "button--has-label": this.hasLabel,
      "button--has-prefix": this.hasPrefix,
      "button--has-suffix": this.hasSuffix
    })}
            href=${l(this.href)}
            target=${l(this.target)}
            download=${l(this.download)}
            rel=${l(this.target ? "noreferrer noopener" : void 0)}
            role="button"
            aria-disabled=${this.disabled ? "true" : "false"}
            tabindex=${this.disabled ? "-1" : "0"}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @click=${this.handleClick}
          >
            ${interior}
          </a>
        ` : T`
          <button
            part="base"
            class=${e2$1({
      button: true,
      "button--default": this.type === "default",
      "button--primary": this.type === "primary",
      "button--success": this.type === "success",
      "button--neutral": this.type === "neutral",
      "button--warning": this.type === "warning",
      "button--danger": this.type === "danger",
      "button--text": this.type === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--pill": this.pill,
      "button--has-label": this.hasLabel,
      "button--has-prefix": this.hasPrefix,
      "button--has-suffix": this.hasSuffix
    })}
            ?disabled=${this.disabled}
            type=${this.submit ? "submit" : "button"}
            name=${l(this.name)}
            value=${l(this.value)}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @click=${this.handleClick}
          >
            ${interior}
          </button>
        `;
  }
};
SlButton$1.styles = button_styles_default;
__decorateClass([
  o2$1(".button")
], SlButton$1.prototype, "button", 2);
__decorateClass([
  r()
], SlButton$1.prototype, "hasFocus", 2);
__decorateClass([
  r()
], SlButton$1.prototype, "hasLabel", 2);
__decorateClass([
  r()
], SlButton$1.prototype, "hasPrefix", 2);
__decorateClass([
  r()
], SlButton$1.prototype, "hasSuffix", 2);
__decorateClass([
  e({ reflect: true })
], SlButton$1.prototype, "type", 2);
__decorateClass([
  e({ reflect: true })
], SlButton$1.prototype, "size", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton$1.prototype, "caret", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton$1.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton$1.prototype, "loading", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton$1.prototype, "pill", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton$1.prototype, "circle", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton$1.prototype, "submit", 2);
__decorateClass([
  e()
], SlButton$1.prototype, "name", 2);
__decorateClass([
  e()
], SlButton$1.prototype, "value", 2);
__decorateClass([
  e()
], SlButton$1.prototype, "href", 2);
__decorateClass([
  e()
], SlButton$1.prototype, "target", 2);
__decorateClass([
  e()
], SlButton$1.prototype, "download", 2);
SlButton$1 = __decorateClass([
  n("sl-button")
], SlButton$1);
var button_default = SlButton$1;

// src/components/spinner/spinner.styles.ts
var spinner_styles_default = i$1`
  ${component_styles_default}

  :host {
    --track-color: rgb(var(--sl-color-neutral-500) / 20%);
    --indicator-color: rgb(var(--sl-color-primary-600));
    --stroke-width: 2px;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    border-radius: 50%;
    border: solid var(--stroke-width) var(--track-color);
    border-top-color: var(--indicator-color);
    border-right-color: var(--indicator-color);
    animation: 1s linear infinite spin;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// src/components/spinner/spinner.ts
var SlSpinner = class extends h3 {
  render() {
    return T` <span part="base" class="spinner" aria-busy="true" aria-live="polite"></span> `;
  }
};
SlSpinner.styles = spinner_styles_default;
SlSpinner = __decorateClass([
  n("sl-spinner")
], SlSpinner);
var spinner_default = SlSpinner;

// src/components/details/details.styles.ts
var details_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: block;
  }

  .details {
    border: solid 1px rgb(var(--sl-color-neutral-200));
    border-radius: var(--sl-border-radius-medium);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    cursor: pointer;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header${focusVisibleSelector} {
    box-shadow: var(--sl-focus-ring);
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header${focusVisibleSelector} {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) transform ease;
  }

  .details--open .details__summary-icon {
    transform: rotate(90deg);
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    padding: var(--sl-spacing-medium);
  }
`;

// src/components/details/details.ts
var id$2 = 0;
var SlDetails$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.componentId = `details-${++id$2}`;
    this.open = false;
    this.disabled = false;
  }
  firstUpdated() {
    this.body.hidden = !this.open;
    this.body.style.height = this.open ? "auto" : "0";
  }
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  handleSummaryClick() {
    if (!this.disabled) {
      this.open ? this.hide() : this.show();
      this.header.focus();
    }
  }
  handleSummaryKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.open ? this.hide() : this.show();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      this.hide();
    }
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      this.show();
    }
  }
  async handleOpenChange() {
    if (this.open) {
      emit(this, "sl-show");
      await stopAnimations(this);
      this.body.hidden = false;
      const { keyframes, options } = getAnimation(this, "details.show");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.style.height = "auto";
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, "details.hide");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.hidden = true;
      this.body.style.height = "auto";
      emit(this, "sl-after-hide");
    }
  }
  render() {
    return T`
      <div
        part="base"
        class=${e2$1({
      details: true,
      "details--open": this.open,
      "details--disabled": this.disabled
    })}
      >
        <header
          part="header"
          id=${`${this.componentId}-header`}
          class="details__header"
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls=${`${this.componentId}-content`}
          aria-disabled=${this.disabled ? "true" : "false"}
          tabindex=${this.disabled ? "-1" : "0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <div part="summary" class="details__summary">
            <slot name="summary">${this.summary}</slot>
          </div>

          <span part="summary-icon" class="details__summary-icon">
            <sl-icon name="chevron-right" library="system"></sl-icon>
          </span>
        </header>

        <div class="details__body">
          <div
            part="content"
            id=${`${this.componentId}-content`}
            class="details__content"
            role="region"
            aria-labelledby=${`${this.componentId}-header`}
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
};
SlDetails$1.styles = details_styles_default;
__decorateClass([
  o2$1(".details")
], SlDetails$1.prototype, "details", 2);
__decorateClass([
  o2$1(".details__header")
], SlDetails$1.prototype, "header", 2);
__decorateClass([
  o2$1(".details__body")
], SlDetails$1.prototype, "body", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDetails$1.prototype, "open", 2);
__decorateClass([
  e()
], SlDetails$1.prototype, "summary", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDetails$1.prototype, "disabled", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDetails$1.prototype, "handleOpenChange", 1);
SlDetails$1 = __decorateClass([
  n("sl-details")
], SlDetails$1);
var details_default = SlDetails$1;
setDefaultAnimation("details.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 250, easing: "linear" }
});
setDefaultAnimation("details.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 250, easing: "linear" }
});

// src/internal/support.ts
function isPreventScrollSupported() {
  let supported = false;
  document.createElement("div").focus({
    get preventScroll() {
      supported = true;
      return false;
    }
  });
  return supported;
}

// src/internal/modal.ts
var activeModals = [];
var Modal = class {
  constructor(element) {
    this.tabDirection = "forward";
    this.element = element;
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  activate() {
    activeModals.push(this.element);
    document.addEventListener("focusin", this.handleFocusIn);
    document.addEventListener("keydown", this.handleKeyDown);
  }
  deactivate() {
    activeModals = activeModals.filter((modal) => modal !== this.element);
    document.removeEventListener("focusin", this.handleFocusIn);
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  isActive() {
    return activeModals[activeModals.length - 1] === this.element;
  }
  handleFocusIn(event) {
    const path = event.composedPath();
    if (this.isActive() && !path.includes(this.element)) {
      const { start, end } = getTabbableBoundary(this.element);
      const target = this.tabDirection === "forward" ? start : end;
      if (typeof (target == null ? void 0 : target.focus) === "function") {
        target.focus({ preventScroll: true });
      }
    }
  }
  handleKeyDown(event) {
    if (event.key === "Tab" && event.shiftKey) {
      this.tabDirection = "backward";
      setTimeout(() => this.tabDirection = "forward");
    }
  }
};
var modal_default = Modal;

// src/components/dialog/dialog.styles.ts
var dialog_styles_default = i$1`
  ${component_styles_default}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: rgb(var(--sl-panel-background-color));
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
    transform: none;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
  }

  .dialog__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding: 0 var(--header-spacing);
  }

  .dialog__body {
    flex: 1 1 auto;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-left: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgb(var(--sl-overlay-background-color) / var(--sl-overlay-opacity));
  }
`;

// src/components/dialog/dialog.ts
var hasPreventScroll$1 = isPreventScrollSupported();
var id$1 = 0;
var SlDialog$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.componentId = `dialog-${++id$1}`;
    this.hasFooter = false;
    this.open = false;
    this.label = "";
    this.noHeader = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.modal = new modal_default(this);
    this.handleSlotChange();
  }
  firstUpdated() {
    this.dialog.hidden = !this.open;
    if (this.open) {
      this.modal.activate();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  requestClose() {
    const slRequestClose = emit(this, "sl-request-close", { cancelable: true });
    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "dialog.denyClose");
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }
    this.hide();
  }
  handleKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.requestClose();
    }
  }
  async handleOpenChange() {
    if (this.open) {
      emit(this, "sl-show");
      this.originalTrigger = document.activeElement;
      this.modal.activate();
      lockBodyScrolling(this);
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      this.dialog.hidden = false;
      if (hasPreventScroll$1) {
        const slInitialFocus = emit(this, "sl-initial-focus", { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          this.panel.focus({ preventScroll: true });
        }
      }
      const panelAnimation = getAnimation(this, "dialog.show");
      const overlayAnimation = getAnimation(this, "dialog.overlay.show");
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      if (!hasPreventScroll$1) {
        const slInitialFocus = emit(this, "sl-initial-focus", { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          this.panel.focus({ preventScroll: true });
        }
      }
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      this.modal.deactivate();
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, "dialog.hide");
      const overlayAnimation = getAnimation(this, "dialog.overlay.hide");
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      this.dialog.hidden = true;
      unlockBodyScrolling(this);
      const trigger = this.originalTrigger;
      if (trigger && typeof trigger.focus === "function") {
        setTimeout(() => trigger.focus());
      }
      emit(this, "sl-after-hide");
    }
  }
  handleSlotChange() {
    this.hasFooter = hasSlot(this, "footer");
  }
  render() {
    return T`
      <div
        part="base"
        class=${e2$1({
      dialog: true,
      "dialog--open": this.open,
      "dialog--has-footer": this.hasFooter
    })}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="dialog__overlay" @click=${this.requestClose} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${l(this.noHeader ? this.label : void 0)}
          aria-labelledby=${l(!this.noHeader ? `${this.componentId}-title` : void 0)}
          tabindex="0"
        >
          ${!this.noHeader ? T`
                <header part="header" class="dialog__header">
                  <span part="title" class="dialog__title" id=${`${this.componentId}-title`}>
                    <slot name="label"> ${this.label || String.fromCharCode(65279)} </slot>
                  </span>
                  <sl-icon-button
                    exportparts="base:close-button"
                    class="dialog__close"
                    name="x"
                    library="system"
                    @click="${this.requestClose}"
                  ></sl-icon-button>
                </header>
              ` : ""}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
          </footer>
        </div>
      </div>
    `;
  }
};
SlDialog$1.styles = dialog_styles_default;
__decorateClass([
  o2$1(".dialog")
], SlDialog$1.prototype, "dialog", 2);
__decorateClass([
  o2$1(".dialog__panel")
], SlDialog$1.prototype, "panel", 2);
__decorateClass([
  o2$1(".dialog__overlay")
], SlDialog$1.prototype, "overlay", 2);
__decorateClass([
  r()
], SlDialog$1.prototype, "hasFooter", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDialog$1.prototype, "open", 2);
__decorateClass([
  e({ reflect: true })
], SlDialog$1.prototype, "label", 2);
__decorateClass([
  e({ attribute: "no-header", type: Boolean, reflect: true })
], SlDialog$1.prototype, "noHeader", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDialog$1.prototype, "handleOpenChange", 1);
SlDialog$1 = __decorateClass([
  n("sl-dialog")
], SlDialog$1);
var dialog_default = SlDialog$1;
setDefaultAnimation("dialog.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.denyClose", {
  keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

// src/internal/string.ts
function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// src/components/drawer/drawer.styles.ts
var drawer_styles_default = i$1`
  ${component_styles_default}

  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: rgb(var(--sl-panel-background-color));
    box-shadow: var(--sl-shadow-x-large);
    transition: var(--sl-transition-medium) transform;
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    right: auto;
    bottom: auto;
    left: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    right: 0;
    bottom: auto;
    left: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    right: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    right: auto;
    bottom: auto;
    left: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
  }

  .drawer__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding: 0 var(--header-spacing);
  }

  .drawer__body {
    flex: 1 1 auto;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-right: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgb(var(--sl-overlay-background-color) / var(--sl-overlay-opacity));
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    position: absolute;
  }
`;

// src/components/drawer/drawer.ts
var hasPreventScroll = isPreventScrollSupported();
var id = 0;
var SlDrawer$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.componentId = `drawer-${++id}`;
    this.hasFooter = false;
    this.open = false;
    this.label = "";
    this.placement = "end";
    this.contained = false;
    this.noHeader = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.modal = new modal_default(this);
    this.handleSlotChange();
  }
  firstUpdated() {
    this.drawer.hidden = !this.open;
    if (this.open && !this.contained) {
      this.modal.activate();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  requestClose() {
    const slRequestClose = emit(this, "sl-request-close", { cancelable: true });
    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "drawer.denyClose");
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }
    this.hide();
  }
  handleKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.requestClose();
    }
  }
  async handleOpenChange() {
    if (this.open) {
      emit(this, "sl-show");
      this.originalTrigger = document.activeElement;
      if (!this.contained) {
        this.modal.activate();
        lockBodyScrolling(this);
      }
      await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
      this.drawer.hidden = false;
      if (hasPreventScroll) {
        const slInitialFocus = emit(this, "sl-initial-focus", { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          this.panel.focus({ preventScroll: true });
        }
      }
      const panelAnimation = getAnimation(this, `drawer.show${uppercaseFirstLetter(this.placement)}`);
      const overlayAnimation = getAnimation(this, "drawer.overlay.show");
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      if (!hasPreventScroll) {
        const slInitialFocus = emit(this, "sl-initial-focus", { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          this.panel.focus({ preventScroll: true });
        }
      }
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      this.modal.deactivate();
      unlockBodyScrolling(this);
      await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, `drawer.hide${uppercaseFirstLetter(this.placement)}`);
      const overlayAnimation = getAnimation(this, "drawer.overlay.hide");
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      this.drawer.hidden = true;
      const trigger = this.originalTrigger;
      if (trigger && typeof trigger.focus === "function") {
        setTimeout(() => trigger.focus());
      }
      emit(this, "sl-after-hide");
    }
  }
  handleSlotChange() {
    this.hasFooter = hasSlot(this, "footer");
  }
  render() {
    return T`
      <div
        part="base"
        class=${e2$1({
      drawer: true,
      "drawer--open": this.open,
      "drawer--top": this.placement === "top",
      "drawer--end": this.placement === "end",
      "drawer--bottom": this.placement === "bottom",
      "drawer--start": this.placement === "start",
      "drawer--contained": this.contained,
      "drawer--fixed": !this.contained,
      "drawer--has-footer": this.hasFooter
    })}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="drawer__overlay" @click=${this.requestClose} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${l(this.noHeader ? this.label : void 0)}
          aria-labelledby=${l(!this.noHeader ? `${this.componentId}-title` : void 0)}
          tabindex="0"
        >
          ${!this.noHeader ? T`
                <header part="header" class="drawer__header">
                  <span part="title" class="drawer__title" id=${`${this.componentId}-title`}>
                    <!-- If there's no label, use an invisible character to prevent the heading from collapsing -->
                    <slot name="label"> ${this.label || String.fromCharCode(65279)} </slot>
                  </span>
                  <sl-icon-button
                    exportparts="base:close-button"
                    class="drawer__close"
                    name="x"
                    library="system"
                    @click=${this.requestClose}
                  ></sl-icon-button>
                </header>
              ` : ""}

          <div part="body" class="drawer__body">
            <slot></slot>
          </div>

          <footer part="footer" class="drawer__footer">
            <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
          </footer>
        </div>
      </div>
    `;
  }
};
SlDrawer$1.styles = drawer_styles_default;
__decorateClass([
  o2$1(".drawer")
], SlDrawer$1.prototype, "drawer", 2);
__decorateClass([
  o2$1(".drawer__panel")
], SlDrawer$1.prototype, "panel", 2);
__decorateClass([
  o2$1(".drawer__overlay")
], SlDrawer$1.prototype, "overlay", 2);
__decorateClass([
  r()
], SlDrawer$1.prototype, "hasFooter", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDrawer$1.prototype, "open", 2);
__decorateClass([
  e({ reflect: true })
], SlDrawer$1.prototype, "label", 2);
__decorateClass([
  e({ reflect: true })
], SlDrawer$1.prototype, "placement", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDrawer$1.prototype, "contained", 2);
__decorateClass([
  e({ attribute: "no-header", type: Boolean, reflect: true })
], SlDrawer$1.prototype, "noHeader", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDrawer$1.prototype, "handleOpenChange", 1);
SlDrawer$1 = __decorateClass([
  n("sl-drawer")
], SlDrawer$1);
var drawer_default = SlDrawer$1;
setDefaultAnimation("drawer.showTop", {
  keyframes: [
    { opacity: 0, transform: "translateY(-100%)" },
    { opacity: 1, transform: "translateY(0)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.hideTop", {
  keyframes: [
    { opacity: 1, transform: "translateY(0)" },
    { opacity: 0, transform: "translateY(-100%)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.showEnd", {
  keyframes: [
    { opacity: 0, transform: "translateX(100%)" },
    { opacity: 1, transform: "translateX(0)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.hideEnd", {
  keyframes: [
    { opacity: 1, transform: "translateX(0)" },
    { opacity: 0, transform: "translateX(100%)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.showBottom", {
  keyframes: [
    { opacity: 0, transform: "translateY(100%)" },
    { opacity: 1, transform: "translateY(0)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.hideBottom", {
  keyframes: [
    { opacity: 1, transform: "translateY(0)" },
    { opacity: 0, transform: "translateY(100%)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.showStart", {
  keyframes: [
    { opacity: 0, transform: "translateX(-100%)" },
    { opacity: 1, transform: "translateX(0)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.hideStart", {
  keyframes: [
    { opacity: 1, transform: "translateX(0)" },
    { opacity: 0, transform: "translateX(-100%)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("drawer.denyClose", {
  keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.01)" }, { transform: "scale(1)" }],
  options: { duration: 250 }
});
setDefaultAnimation("drawer.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});
setDefaultAnimation("drawer.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

// src/components/alert/alert.styles.ts
var alert_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: rgb(var(--sl-color-neutral-0));
    border: solid 1px rgb(var(--sl-color-neutral-200));
    border-top-width: 3px;
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--box-shadow);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: rgb(var(--sl-color-neutral-700));
    margin: inherit;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
  }

  .alert__icon ::slotted(*) {
    margin-left: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: rgb(var(--sl-color-primary-600));
  }

  .alert--primary .alert__icon {
    color: rgb(var(--sl-color-primary-600));
  }

  .alert--success {
    border-top-color: rgb(var(--sl-color-success-600));
  }

  .alert--success .alert__icon {
    color: rgb(var(--sl-color-success-600));
  }

  .alert--neutral {
    border-top-color: rgb(var(--sl-color-neutral-600));
  }

  .alert--neutral .alert__icon {
    color: rgb(var(--sl-color-neutral-600));
  }

  .alert--warning {
    border-top-color: rgb(var(--sl-color-warning-600));
  }

  .alert--warning .alert__icon {
    color: rgb(var(--sl-color-warning-600));
  }

  .alert--danger {
    border-top-color: rgb(var(--sl-color-danger-600));
  }

  .alert--danger .alert__icon {
    color: rgb(var(--sl-color-danger-600));
  }

  .alert__message {
    flex: 1 1 auto;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-right: var(--sl-spacing-medium);
  }
`;

// src/components/alert/alert.ts
var toastStack = Object.assign(document.createElement("div"), { className: "sl-toast-stack" });
var SlAlert$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.open = false;
    this.closable = false;
    this.type = "primary";
    this.duration = Infinity;
  }
  firstUpdated() {
    this.base.hidden = !this.open;
  }
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  async toast() {
    return new Promise((resolve) => {
      if (!toastStack.parentElement) {
        document.body.append(toastStack);
      }
      toastStack.appendChild(this);
      requestAnimationFrame(() => {
        this.clientWidth;
        this.show();
      });
      this.addEventListener("sl-after-hide", () => {
        toastStack.removeChild(this);
        resolve();
        if (!toastStack.querySelector("sl-alert")) {
          toastStack.remove();
        }
      }, { once: true });
    });
  }
  restartAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }
  handleCloseClick() {
    this.hide();
  }
  handleMouseMove() {
    this.restartAutoHide();
  }
  async handleOpenChange() {
    if (this.open) {
      emit(this, "sl-show");
      if (this.duration < Infinity) {
        this.restartAutoHide();
      }
      await stopAnimations(this.base);
      this.base.hidden = false;
      const { keyframes, options } = getAnimation(this, "alert.show");
      await animateTo(this.base, keyframes, options);
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      clearTimeout(this.autoHideTimeout);
      await stopAnimations(this.base);
      const { keyframes, options } = getAnimation(this, "alert.hide");
      await animateTo(this.base, keyframes, options);
      this.base.hidden = true;
      emit(this, "sl-after-hide");
    }
  }
  handleDurationChange() {
    this.restartAutoHide();
  }
  render() {
    return T`
      <div
        part="base"
        class=${e2$1({
      alert: true,
      "alert--open": this.open,
      "alert--closable": this.closable,
      "alert--primary": this.type === "primary",
      "alert--success": this.type === "success",
      "alert--neutral": this.type === "neutral",
      "alert--warning": this.type === "warning",
      "alert--danger": this.type === "danger"
    })}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden=${this.open ? "false" : "true"}
        @mousemove=${this.handleMouseMove}
      >
        <span part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </span>

        <span part="message" class="alert__message">
          <slot></slot>
        </span>

        ${this.closable ? T`
              <span class="alert__close">
                <sl-icon-button
                  exportparts="base:close-button"
                  name="x"
                  library="system"
                  @click=${this.handleCloseClick}
                ></sl-icon-button>
              </span>
            ` : ""}
      </div>
    `;
  }
};
SlAlert$1.styles = alert_styles_default;
__decorateClass([
  o2$1('[part="base"]')
], SlAlert$1.prototype, "base", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlAlert$1.prototype, "open", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlAlert$1.prototype, "closable", 2);
__decorateClass([
  e({ reflect: true })
], SlAlert$1.prototype, "type", 2);
__decorateClass([
  e({ type: Number })
], SlAlert$1.prototype, "duration", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlAlert$1.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("duration")
], SlAlert$1.prototype, "handleDurationChange", 1);
SlAlert$1 = __decorateClass([
  n("sl-alert")
], SlAlert$1);
var alert_default = SlAlert$1;
setDefaultAnimation("alert.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("alert.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: { duration: 250, easing: "ease" }
});

// src/components/icon-button/icon-button.styles.ts
var icon_button_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: rgb(var(--sl-color-neutral-600));
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus:not(.icon-button--disabled) {
    color: rgb(var(--sl-color-primary-600));
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: rgb(var(--sl-color-primary-700));
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button${focusVisibleSelector} {
    box-shadow: var(--sl-focus-ring);
  }
`;

// src/components/icon-button/icon-button.ts
var SlIconButton$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.label = "";
    this.disabled = false;
  }
  render() {
    const isLink = this.href ? true : false;
    const interior = T`
      <sl-icon
        name=${l(this.name)}
        library=${l(this.library)}
        src=${l(this.src)}
        aria-hidden="true"
      ></sl-icon>
    `;
    return isLink ? T`
          <a
            part="base"
            class="icon-button"
            href=${l(this.href)}
            target=${l(this.target)}
            download=${l(this.download)}
            rel=${l(this.target ? "noreferrer noopener" : void 0)}
            role="button"
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-label="${this.label}"
            tabindex=${this.disabled ? "-1" : "0"}
          >
            ${interior}
          </a>
        ` : T`
          <button
            part="base"
            class=${e2$1({
      "icon-button": true,
      "icon-button--disabled": this.disabled
    })}
            ?disabled=${this.disabled}
            type="button"
            aria-label=${this.label}
          >
            ${interior}
          </button>
        `;
  }
};
SlIconButton$1.styles = icon_button_styles_default;
__decorateClass([
  o2$1("button")
], SlIconButton$1.prototype, "button", 2);
__decorateClass([
  e()
], SlIconButton$1.prototype, "name", 2);
__decorateClass([
  e()
], SlIconButton$1.prototype, "library", 2);
__decorateClass([
  e()
], SlIconButton$1.prototype, "src", 2);
__decorateClass([
  e()
], SlIconButton$1.prototype, "href", 2);
__decorateClass([
  e()
], SlIconButton$1.prototype, "target", 2);
__decorateClass([
  e()
], SlIconButton$1.prototype, "download", 2);
__decorateClass([
  e()
], SlIconButton$1.prototype, "label", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlIconButton$1.prototype, "disabled", 2);
SlIconButton$1 = __decorateClass([
  n("sl-icon-button")
], SlIconButton$1);
var icon_button_default = SlIconButton$1;

// src/components/badge/badge.styles.ts
var badge_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--sl-font-size-x-small);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    white-space: nowrap;
    padding: 3px 6px;
    user-select: none;
    cursor: inherit;
  }

  /* Type modifiers */
  .badge--primary {
    background-color: rgb(var(--sl-color-primary-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .badge--success {
    background-color: rgb(var(--sl-color-success-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .badge--neutral {
    background-color: rgb(var(--sl-color-neutral-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .badge--warning {
    background-color: rgb(var(--sl-color-warning-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .badge--danger {
    background-color: rgb(var(--sl-color-danger-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: rgb(var(--sl-color-primary-600));
  }

  .badge--pulse.badge--success {
    --pulse-color: rgb(var(--sl-color-success-600));
  }

  .badge--pulse.badge--neutral {
    --pulse-color: rgb(var(--sl-color-neutral-600));
  }

  .badge--pulse.badge--warning {
    --pulse-color: rgb(var(--sl-color-warning-600));
  }

  .badge--pulse.badge--danger {
    --pulse-color: rgb(var(--sl-color-danger-600));
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;

// src/components/badge/badge.ts
var SlBadge = class extends h3 {
  constructor() {
    super(...arguments);
    this.type = "primary";
    this.pill = false;
    this.pulse = false;
  }
  render() {
    return T`
      <span
        part="base"
        class=${e2$1({
      badge: true,
      "badge--primary": this.type === "primary",
      "badge--success": this.type === "success",
      "badge--neutral": this.type === "neutral",
      "badge--warning": this.type === "warning",
      "badge--danger": this.type === "danger",
      "badge--pill": this.pill,
      "badge--pulse": this.pulse
    })}
        role="status"
      >
        <slot></slot>
      </span>
    `;
  }
};
SlBadge.styles = badge_styles_default;
__decorateClass([
  e({ reflect: true })
], SlBadge.prototype, "type", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlBadge.prototype, "pill", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlBadge.prototype, "pulse", 2);
SlBadge = __decorateClass([
  n("sl-badge")
], SlBadge);
var badge_default = SlBadge;

// node_modules/@shoelace-style/animations/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  backInDown: () => backInDown,
  backInLeft: () => backInLeft,
  backInRight: () => backInRight,
  backInUp: () => backInUp,
  backOutDown: () => backOutDown,
  backOutLeft: () => backOutLeft,
  backOutRight: () => backOutRight,
  backOutUp: () => backOutUp,
  bounce: () => bounce,
  bounceIn: () => bounceIn,
  bounceInDown: () => bounceInDown,
  bounceInLeft: () => bounceInLeft,
  bounceInRight: () => bounceInRight,
  bounceInUp: () => bounceInUp,
  bounceOut: () => bounceOut,
  bounceOutDown: () => bounceOutDown,
  bounceOutLeft: () => bounceOutLeft,
  bounceOutRight: () => bounceOutRight,
  bounceOutUp: () => bounceOutUp,
  easings: () => easings,
  fadeIn: () => fadeIn,
  fadeInBottomLeft: () => fadeInBottomLeft,
  fadeInBottomRight: () => fadeInBottomRight,
  fadeInDown: () => fadeInDown,
  fadeInDownBig: () => fadeInDownBig,
  fadeInLeft: () => fadeInLeft,
  fadeInLeftBig: () => fadeInLeftBig,
  fadeInRight: () => fadeInRight,
  fadeInRightBig: () => fadeInRightBig,
  fadeInTopLeft: () => fadeInTopLeft,
  fadeInTopRight: () => fadeInTopRight,
  fadeInUp: () => fadeInUp,
  fadeInUpBig: () => fadeInUpBig,
  fadeOut: () => fadeOut,
  fadeOutBottomLeft: () => fadeOutBottomLeft,
  fadeOutBottomRight: () => fadeOutBottomRight,
  fadeOutDown: () => fadeOutDown,
  fadeOutDownBig: () => fadeOutDownBig,
  fadeOutLeft: () => fadeOutLeft,
  fadeOutLeftBig: () => fadeOutLeftBig,
  fadeOutRight: () => fadeOutRight,
  fadeOutRightBig: () => fadeOutRightBig,
  fadeOutTopLeft: () => fadeOutTopLeft,
  fadeOutTopRight: () => fadeOutTopRight,
  fadeOutUp: () => fadeOutUp,
  fadeOutUpBig: () => fadeOutUpBig,
  flash: () => flash,
  flip: () => flip,
  flipInX: () => flipInX,
  flipInY: () => flipInY,
  flipOutX: () => flipOutX,
  flipOutY: () => flipOutY,
  headShake: () => headShake,
  heartBeat: () => heartBeat,
  hinge: () => hinge,
  jackInTheBox: () => jackInTheBox,
  jello: () => jello,
  lightSpeedInLeft: () => lightSpeedInLeft,
  lightSpeedInRight: () => lightSpeedInRight,
  lightSpeedOutLeft: () => lightSpeedOutLeft,
  lightSpeedOutRight: () => lightSpeedOutRight,
  pulse: () => pulse,
  rollIn: () => rollIn,
  rollOut: () => rollOut,
  rotateIn: () => rotateIn,
  rotateInDownLeft: () => rotateInDownLeft,
  rotateInDownRight: () => rotateInDownRight,
  rotateInUpLeft: () => rotateInUpLeft,
  rotateInUpRight: () => rotateInUpRight,
  rotateOut: () => rotateOut,
  rotateOutDownLeft: () => rotateOutDownLeft,
  rotateOutDownRight: () => rotateOutDownRight,
  rotateOutUpLeft: () => rotateOutUpLeft,
  rotateOutUpRight: () => rotateOutUpRight,
  rubberBand: () => rubberBand,
  shake: () => shake,
  shakeX: () => shakeX,
  shakeY: () => shakeY,
  slideInDown: () => slideInDown,
  slideInLeft: () => slideInLeft,
  slideInRight: () => slideInRight,
  slideInUp: () => slideInUp,
  slideOutDown: () => slideOutDown,
  slideOutLeft: () => slideOutLeft,
  slideOutRight: () => slideOutRight,
  slideOutUp: () => slideOutUp,
  swing: () => swing,
  tada: () => tada,
  wobble: () => wobble,
  zoomIn: () => zoomIn,
  zoomInDown: () => zoomInDown,
  zoomInLeft: () => zoomInLeft,
  zoomInRight: () => zoomInRight,
  zoomInUp: () => zoomInUp,
  zoomOut: () => zoomOut,
  zoomOutDown: () => zoomOutDown,
  zoomOutLeft: () => zoomOutLeft,
  zoomOutRight: () => zoomOutRight,
  zoomOutUp: () => zoomOutUp
});

// node_modules/@shoelace-style/animations/dist/attention_seekers/bounce.js
var bounce = [
  { offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)", transform: "translate3d(0, 0, 0)" },
  { offset: 0.2, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)", transform: "translate3d(0, 0, 0)" },
  { offset: 0.4, easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)", transform: "translate3d(0, -30px, 0) scaleY(1.1)" },
  { offset: 0.43, easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)", transform: "translate3d(0, -30px, 0) scaleY(1.1)" },
  { offset: 0.53, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)", transform: "translate3d(0, 0, 0)" },
  { offset: 0.7, easing: "cubic-bezier(0.755, 0.05, 0.855, 0.06)", transform: "translate3d(0, -15px, 0) scaleY(1.05)" },
  {
    offset: 0.8,
    "transition-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",
    transform: "translate3d(0, 0, 0) scaleY(0.95)"
  },
  { offset: 0.9, transform: "translate3d(0, -4px, 0) scaleY(1.02)" },
  { offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/flash.js
var flash = [
  { offset: 0, opacity: "1" },
  { offset: 0.25, opacity: "0" },
  { offset: 0.5, opacity: "1" },
  { offset: 0.75, opacity: "0" },
  { offset: 1, opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/headShake.js
var headShake = [
  { offset: 0, transform: "translateX(0)" },
  { offset: 0.065, transform: "translateX(-6px) rotateY(-9deg)" },
  { offset: 0.185, transform: "translateX(5px) rotateY(7deg)" },
  { offset: 0.315, transform: "translateX(-3px) rotateY(-5deg)" },
  { offset: 0.435, transform: "translateX(2px) rotateY(3deg)" },
  { offset: 0.5, transform: "translateX(0)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/heartBeat.js
var heartBeat = [
  { offset: 0, transform: "scale(1)" },
  { offset: 0.14, transform: "scale(1.3)" },
  { offset: 0.28, transform: "scale(1)" },
  { offset: 0.42, transform: "scale(1.3)" },
  { offset: 0.7, transform: "scale(1)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/jello.js
var jello = [
  { offset: 0, transform: "translate3d(0, 0, 0)" },
  { offset: 0.111, transform: "translate3d(0, 0, 0)" },
  { offset: 0.222, transform: "skewX(-12.5deg) skewY(-12.5deg)" },
  { offset: 0.33299999999999996, transform: "skewX(6.25deg) skewY(6.25deg)" },
  { offset: 0.444, transform: "skewX(-3.125deg) skewY(-3.125deg)" },
  { offset: 0.555, transform: "skewX(1.5625deg) skewY(1.5625deg)" },
  { offset: 0.6659999999999999, transform: "skewX(-0.78125deg) skewY(-0.78125deg)" },
  { offset: 0.777, transform: "skewX(0.390625deg) skewY(0.390625deg)" },
  { offset: 0.888, transform: "skewX(-0.1953125deg) skewY(-0.1953125deg)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/pulse.js
var pulse = [
  { offset: 0, transform: "scale3d(1, 1, 1)" },
  { offset: 0.5, transform: "scale3d(1.05, 1.05, 1.05)" },
  { offset: 1, transform: "scale3d(1, 1, 1)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/rubberBand.js
var rubberBand = [
  { offset: 0, transform: "scale3d(1, 1, 1)" },
  { offset: 0.3, transform: "scale3d(1.25, 0.75, 1)" },
  { offset: 0.4, transform: "scale3d(0.75, 1.25, 1)" },
  { offset: 0.5, transform: "scale3d(1.15, 0.85, 1)" },
  { offset: 0.65, transform: "scale3d(0.95, 1.05, 1)" },
  { offset: 0.75, transform: "scale3d(1.05, 0.95, 1)" },
  { offset: 1, transform: "scale3d(1, 1, 1)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/shake.js
var shake = [
  { offset: 0, transform: "translate3d(0, 0, 0)" },
  { offset: 0.1, transform: "translate3d(-10px, 0, 0)" },
  { offset: 0.2, transform: "translate3d(10px, 0, 0)" },
  { offset: 0.3, transform: "translate3d(-10px, 0, 0)" },
  { offset: 0.4, transform: "translate3d(10px, 0, 0)" },
  { offset: 0.5, transform: "translate3d(-10px, 0, 0)" },
  { offset: 0.6, transform: "translate3d(10px, 0, 0)" },
  { offset: 0.7, transform: "translate3d(-10px, 0, 0)" },
  { offset: 0.8, transform: "translate3d(10px, 0, 0)" },
  { offset: 0.9, transform: "translate3d(-10px, 0, 0)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/shakeX.js
var shakeX = [
  { offset: 0, transform: "translate3d(0, 0, 0)" },
  { offset: 0.1, transform: "translate3d(-10px, 0, 0)" },
  { offset: 0.2, transform: "translate3d(10px, 0, 0)" },
  { offset: 0.3, transform: "translate3d(-10px, 0, 0)" },
  { offset: 0.4, transform: "translate3d(10px, 0, 0)" },
  { offset: 0.5, transform: "translate3d(-10px, 0, 0)" },
  { offset: 0.6, transform: "translate3d(10px, 0, 0)" },
  { offset: 0.7, transform: "translate3d(-10px, 0, 0)" },
  { offset: 0.8, transform: "translate3d(10px, 0, 0)" },
  { offset: 0.9, transform: "translate3d(-10px, 0, 0)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/shakeY.js
var shakeY = [
  { offset: 0, transform: "translate3d(0, 0, 0)" },
  { offset: 0.1, transform: "translate3d(0, -10px, 0)" },
  { offset: 0.2, transform: "translate3d(0, 10px, 0)" },
  { offset: 0.3, transform: "translate3d(0, -10px, 0)" },
  { offset: 0.4, transform: "translate3d(0, 10px, 0)" },
  { offset: 0.5, transform: "translate3d(0, -10px, 0)" },
  { offset: 0.6, transform: "translate3d(0, 10px, 0)" },
  { offset: 0.7, transform: "translate3d(0, -10px, 0)" },
  { offset: 0.8, transform: "translate3d(0, 10px, 0)" },
  { offset: 0.9, transform: "translate3d(0, -10px, 0)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/swing.js
var swing = [
  { offset: 0.2, transform: "rotate3d(0, 0, 1, 15deg)" },
  { offset: 0.4, transform: "rotate3d(0, 0, 1, -10deg)" },
  { offset: 0.6, transform: "rotate3d(0, 0, 1, 5deg)" },
  { offset: 0.8, transform: "rotate3d(0, 0, 1, -5deg)" },
  { offset: 1, transform: "rotate3d(0, 0, 1, 0deg)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/tada.js
var tada = [
  { offset: 0, transform: "scale3d(1, 1, 1)" },
  { offset: 0.1, transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)" },
  { offset: 0.2, transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)" },
  { offset: 0.3, transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)" },
  { offset: 0.4, transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)" },
  { offset: 0.5, transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)" },
  { offset: 0.6, transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)" },
  { offset: 0.7, transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)" },
  { offset: 0.8, transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)" },
  { offset: 0.9, transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)" },
  { offset: 1, transform: "scale3d(1, 1, 1)" }
];

// node_modules/@shoelace-style/animations/dist/attention_seekers/wobble.js
var wobble = [
  { offset: 0, transform: "translate3d(0, 0, 0)" },
  { offset: 0.15, transform: "translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)" },
  { offset: 0.3, transform: "translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)" },
  { offset: 0.45, transform: "translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)" },
  { offset: 0.6, transform: "translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)" },
  { offset: 0.75, transform: "translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/back_entrances/backInDown.js
var backInDown = [
  { offset: 0, transform: "translateY(-1200px) scale(0.7)", opacity: "0.7" },
  { offset: 0.8, transform: "translateY(0px) scale(0.7)", opacity: "0.7" },
  { offset: 1, transform: "scale(1)", opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/back_entrances/backInLeft.js
var backInLeft = [
  { offset: 0, transform: "translateX(-2000px) scale(0.7)", opacity: "0.7" },
  { offset: 0.8, transform: "translateX(0px) scale(0.7)", opacity: "0.7" },
  { offset: 1, transform: "scale(1)", opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/back_entrances/backInRight.js
var backInRight = [
  { offset: 0, transform: "translateX(2000px) scale(0.7)", opacity: "0.7" },
  { offset: 0.8, transform: "translateX(0px) scale(0.7)", opacity: "0.7" },
  { offset: 1, transform: "scale(1)", opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/back_entrances/backInUp.js
var backInUp = [
  { offset: 0, transform: "translateY(1200px) scale(0.7)", opacity: "0.7" },
  { offset: 0.8, transform: "translateY(0px) scale(0.7)", opacity: "0.7" },
  { offset: 1, transform: "scale(1)", opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/back_exits/backOutDown.js
var backOutDown = [
  { offset: 0, transform: "scale(1)", opacity: "1" },
  { offset: 0.2, transform: "translateY(0px) scale(0.7)", opacity: "0.7" },
  { offset: 1, transform: "translateY(700px) scale(0.7)", opacity: "0.7" }
];

// node_modules/@shoelace-style/animations/dist/back_exits/backOutLeft.js
var backOutLeft = [
  { offset: 0, transform: "scale(1)", opacity: "1" },
  { offset: 0.2, transform: "translateX(0px) scale(0.7)", opacity: "0.7" },
  { offset: 1, transform: "translateX(-2000px) scale(0.7)", opacity: "0.7" }
];

// node_modules/@shoelace-style/animations/dist/back_exits/backOutRight.js
var backOutRight = [
  { offset: 0, transform: "scale(1)", opacity: "1" },
  { offset: 0.2, transform: "translateX(0px) scale(0.7)", opacity: "0.7" },
  { offset: 1, transform: "translateX(2000px) scale(0.7)", opacity: "0.7" }
];

// node_modules/@shoelace-style/animations/dist/back_exits/backOutUp.js
var backOutUp = [
  { offset: 0, transform: "scale(1)", opacity: "1" },
  { offset: 0.2, transform: "translateY(0px) scale(0.7)", opacity: "0.7" },
  { offset: 1, transform: "translateY(-700px) scale(0.7)", opacity: "0.7" }
];

// node_modules/@shoelace-style/animations/dist/bouncing_entrances/bounceIn.js
var bounceIn = [
  { offset: 0, opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
  { offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.2, transform: "scale3d(1.1, 1.1, 1.1)" },
  { offset: 0.2, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.4, transform: "scale3d(0.9, 0.9, 0.9)" },
  { offset: 0.4, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.6, opacity: "1", transform: "scale3d(1.03, 1.03, 1.03)" },
  { offset: 0.6, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.8, transform: "scale3d(0.97, 0.97, 0.97)" },
  { offset: 0.8, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 1, opacity: "1", transform: "scale3d(1, 1, 1)" },
  { offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" }
];

// node_modules/@shoelace-style/animations/dist/bouncing_entrances/bounceInDown.js
var bounceInDown = [
  { offset: 0, opacity: "0", transform: "translate3d(0, -3000px, 0) scaleY(3)" },
  { offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.6, opacity: "1", transform: "translate3d(0, 25px, 0) scaleY(0.9)" },
  { offset: 0.6, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.75, transform: "translate3d(0, -10px, 0) scaleY(0.95)" },
  { offset: 0.75, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.9, transform: "translate3d(0, 5px, 0) scaleY(0.985)" },
  { offset: 0.9, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" },
  { offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" }
];

// node_modules/@shoelace-style/animations/dist/bouncing_entrances/bounceInLeft.js
var bounceInLeft = [
  { offset: 0, opacity: "0", transform: "translate3d(-3000px, 0, 0) scaleX(3)" },
  { offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.6, opacity: "1", transform: "translate3d(25px, 0, 0) scaleX(1)" },
  { offset: 0.6, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.75, transform: "translate3d(-10px, 0, 0) scaleX(0.98)" },
  { offset: 0.75, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.9, transform: "translate3d(5px, 0, 0) scaleX(0.995)" },
  { offset: 0.9, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" },
  { offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" }
];

// node_modules/@shoelace-style/animations/dist/bouncing_entrances/bounceInRight.js
var bounceInRight = [
  { offset: 0, opacity: "0", transform: "translate3d(3000px, 0, 0) scaleX(3)" },
  { offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.6, opacity: "1", transform: "translate3d(-25px, 0, 0) scaleX(1)" },
  { offset: 0.6, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.75, transform: "translate3d(10px, 0, 0) scaleX(0.98)" },
  { offset: 0.75, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.9, transform: "translate3d(-5px, 0, 0) scaleX(0.995)" },
  { offset: 0.9, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" },
  { offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" }
];

// node_modules/@shoelace-style/animations/dist/bouncing_entrances/bounceInUp.js
var bounceInUp = [
  { offset: 0, opacity: "0", transform: "translate3d(0, 3000px, 0) scaleY(5)" },
  { offset: 0, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.6, opacity: "1", transform: "translate3d(0, -20px, 0) scaleY(0.9)" },
  { offset: 0.6, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.75, transform: "translate3d(0, 10px, 0) scaleY(0.95)" },
  { offset: 0.75, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 0.9, transform: "translate3d(0, -5px, 0) scaleY(0.985)" },
  { offset: 0.9, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" },
  { offset: 1, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" }
];

// node_modules/@shoelace-style/animations/dist/bouncing_exits/bounceOut.js
var bounceOut = [
  { offset: 0.2, transform: "scale3d(0.9, 0.9, 0.9)" },
  { offset: 0.5, opacity: "1", transform: "scale3d(1.1, 1.1, 1.1)" },
  { offset: 0.55, opacity: "1", transform: "scale3d(1.1, 1.1, 1.1)" },
  { offset: 1, opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" }
];

// node_modules/@shoelace-style/animations/dist/bouncing_exits/bounceOutDown.js
var bounceOutDown = [
  { offset: 0.2, transform: "translate3d(0, 10px, 0) scaleY(0.985)" },
  { offset: 0.4, opacity: "1", transform: "translate3d(0, -20px, 0) scaleY(0.9)" },
  { offset: 0.45, opacity: "1", transform: "translate3d(0, -20px, 0) scaleY(0.9)" },
  { offset: 1, opacity: "0", transform: "translate3d(0, 2000px, 0) scaleY(3)" }
];

// node_modules/@shoelace-style/animations/dist/bouncing_exits/bounceOutLeft.js
var bounceOutLeft = [
  { offset: 0.2, opacity: "1", transform: "translate3d(20px, 0, 0) scaleX(0.9)" },
  { offset: 1, opacity: "0", transform: "translate3d(-2000px, 0, 0) scaleX(2)" }
];

// node_modules/@shoelace-style/animations/dist/bouncing_exits/bounceOutRight.js
var bounceOutRight = [
  { offset: 0.2, opacity: "1", transform: "translate3d(-20px, 0, 0) scaleX(0.9)" },
  { offset: 1, opacity: "0", transform: "translate3d(2000px, 0, 0) scaleX(2)" }
];

// node_modules/@shoelace-style/animations/dist/bouncing_exits/bounceOutUp.js
var bounceOutUp = [
  { offset: 0.2, transform: "translate3d(0, -10px, 0) scaleY(0.985)" },
  { offset: 0.4, opacity: "1", transform: "translate3d(0, 20px, 0) scaleY(0.9)" },
  { offset: 0.45, opacity: "1", transform: "translate3d(0, 20px, 0) scaleY(0.9)" },
  { offset: 1, opacity: "0", transform: "translate3d(0, -2000px, 0) scaleY(3)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeIn.js
var fadeIn = [
  { offset: 0, opacity: "0" },
  { offset: 1, opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInBottomLeft.js
var fadeInBottomLeft = [
  { offset: 0, opacity: "0", transform: "translate3d(-100%, 100%, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInBottomRight.js
var fadeInBottomRight = [
  { offset: 0, opacity: "0", transform: "translate3d(100%, 100%, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInDown.js
var fadeInDown = [
  { offset: 0, opacity: "0", transform: "translate3d(0, -100%, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInDownBig.js
var fadeInDownBig = [
  { offset: 0, opacity: "0", transform: "translate3d(0, -2000px, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInLeft.js
var fadeInLeft = [
  { offset: 0, opacity: "0", transform: "translate3d(-100%, 0, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInLeftBig.js
var fadeInLeftBig = [
  { offset: 0, opacity: "0", transform: "translate3d(-2000px, 0, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInRight.js
var fadeInRight = [
  { offset: 0, opacity: "0", transform: "translate3d(100%, 0, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInRightBig.js
var fadeInRightBig = [
  { offset: 0, opacity: "0", transform: "translate3d(2000px, 0, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInTopLeft.js
var fadeInTopLeft = [
  { offset: 0, opacity: "0", transform: "translate3d(-100%, -100%, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInTopRight.js
var fadeInTopRight = [
  { offset: 0, opacity: "0", transform: "translate3d(100%, -100%, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInUp.js
var fadeInUp = [
  { offset: 0, opacity: "0", transform: "translate3d(0, 100%, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_entrances/fadeInUpBig.js
var fadeInUpBig = [
  { offset: 0, opacity: "0", transform: "translate3d(0, 2000px, 0)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOut.js
var fadeOut = [
  { offset: 0, opacity: "1" },
  { offset: 1, opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutBottomLeft.js
var fadeOutBottomLeft = [
  { offset: 0, opacity: "1", transform: "translate3d(0, 0, 0)" },
  { offset: 1, opacity: "0", transform: "translate3d(-100%, 100%, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutBottomRight.js
var fadeOutBottomRight = [
  { offset: 0, opacity: "1", transform: "translate3d(0, 0, 0)" },
  { offset: 1, opacity: "0", transform: "translate3d(100%, 100%, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutDown.js
var fadeOutDown = [
  { offset: 0, opacity: "1" },
  { offset: 1, opacity: "0", transform: "translate3d(0, 100%, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutDownBig.js
var fadeOutDownBig = [
  { offset: 0, opacity: "1" },
  { offset: 1, opacity: "0", transform: "translate3d(0, 2000px, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutLeft.js
var fadeOutLeft = [
  { offset: 0, opacity: "1" },
  { offset: 1, opacity: "0", transform: "translate3d(-100%, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutLeftBig.js
var fadeOutLeftBig = [
  { offset: 0, opacity: "1" },
  { offset: 1, opacity: "0", transform: "translate3d(-2000px, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutRight.js
var fadeOutRight = [
  { offset: 0, opacity: "1" },
  { offset: 1, opacity: "0", transform: "translate3d(100%, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutRightBig.js
var fadeOutRightBig = [
  { offset: 0, opacity: "1" },
  { offset: 1, opacity: "0", transform: "translate3d(2000px, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutTopLeft.js
var fadeOutTopLeft = [
  { offset: 0, opacity: "1", transform: "translate3d(0, 0, 0)" },
  { offset: 1, opacity: "0", transform: "translate3d(-100%, -100%, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutTopRight.js
var fadeOutTopRight = [
  { offset: 0, opacity: "1", transform: "translate3d(0, 0, 0)" },
  { offset: 1, opacity: "0", transform: "translate3d(100%, -100%, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutUp.js
var fadeOutUp = [
  { offset: 0, opacity: "1" },
  { offset: 1, opacity: "0", transform: "translate3d(0, -100%, 0)" }
];

// node_modules/@shoelace-style/animations/dist/fading_exits/fadeOutUpBig.js
var fadeOutUpBig = [
  { offset: 0, opacity: "1" },
  { offset: 1, opacity: "0", transform: "translate3d(0, -2000px, 0)" }
];

// node_modules/@shoelace-style/animations/dist/flippers/flip.js
var flip = [
  {
    offset: 0,
    transform: "perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",
    easing: "ease-out"
  },
  {
    offset: 0.4,
    transform: "perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -190deg)",
    easing: "ease-out"
  },
  {
    offset: 0.5,
    transform: "perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -170deg)",
    easing: "ease-in"
  },
  {
    offset: 0.8,
    transform: "perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\n      rotate3d(0, 1, 0, 0deg)",
    easing: "ease-in"
  },
  {
    offset: 1,
    transform: "perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",
    easing: "ease-in"
  }
];

// node_modules/@shoelace-style/animations/dist/flippers/flipInX.js
var flipInX = [
  { offset: 0, transform: "perspective(400px) rotate3d(1, 0, 0, 90deg)", easing: "ease-in", opacity: "0" },
  { offset: 0.4, transform: "perspective(400px) rotate3d(1, 0, 0, -20deg)", easing: "ease-in" },
  { offset: 0.6, transform: "perspective(400px) rotate3d(1, 0, 0, 10deg)", opacity: "1" },
  { offset: 0.8, transform: "perspective(400px) rotate3d(1, 0, 0, -5deg)" },
  { offset: 1, transform: "perspective(400px)" }
];

// node_modules/@shoelace-style/animations/dist/flippers/flipInY.js
var flipInY = [
  { offset: 0, transform: "perspective(400px) rotate3d(0, 1, 0, 90deg)", easing: "ease-in", opacity: "0" },
  { offset: 0.4, transform: "perspective(400px) rotate3d(0, 1, 0, -20deg)", easing: "ease-in" },
  { offset: 0.6, transform: "perspective(400px) rotate3d(0, 1, 0, 10deg)", opacity: "1" },
  { offset: 0.8, transform: "perspective(400px) rotate3d(0, 1, 0, -5deg)" },
  { offset: 1, transform: "perspective(400px)" }
];

// node_modules/@shoelace-style/animations/dist/flippers/flipOutX.js
var flipOutX = [
  { offset: 0, transform: "perspective(400px)" },
  { offset: 0.3, transform: "perspective(400px) rotate3d(1, 0, 0, -20deg)", opacity: "1" },
  { offset: 1, transform: "perspective(400px) rotate3d(1, 0, 0, 90deg)", opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/flippers/flipOutY.js
var flipOutY = [
  { offset: 0, transform: "perspective(400px)" },
  { offset: 0.3, transform: "perspective(400px) rotate3d(0, 1, 0, -15deg)", opacity: "1" },
  { offset: 1, transform: "perspective(400px) rotate3d(0, 1, 0, 90deg)", opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/lightspeed/lightSpeedInLeft.js
var lightSpeedInLeft = [
  { offset: 0, transform: "translate3d(-100%, 0, 0) skewX(30deg)", opacity: "0" },
  { offset: 0.6, transform: "skewX(-20deg)", opacity: "1" },
  { offset: 0.8, transform: "skewX(5deg)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/lightspeed/lightSpeedInRight.js
var lightSpeedInRight = [
  { offset: 0, transform: "translate3d(100%, 0, 0) skewX(-30deg)", opacity: "0" },
  { offset: 0.6, transform: "skewX(20deg)", opacity: "1" },
  { offset: 0.8, transform: "skewX(-5deg)" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/lightspeed/lightSpeedOutLeft.js
var lightSpeedOutLeft = [
  { offset: 0, opacity: "1" },
  { offset: 1, transform: "translate3d(-100%, 0, 0) skewX(-30deg)", opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/lightspeed/lightSpeedOutRight.js
var lightSpeedOutRight = [
  { offset: 0, opacity: "1" },
  { offset: 1, transform: "translate3d(100%, 0, 0) skewX(30deg)", opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/rotating_entrances/rotateIn.js
var rotateIn = [
  { offset: 0, transform: "rotate3d(0, 0, 1, -200deg)", opacity: "0" },
  { offset: 1, transform: "translate3d(0, 0, 0)", opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/rotating_entrances/rotateInDownLeft.js
var rotateInDownLeft = [
  { offset: 0, transform: "rotate3d(0, 0, 1, -45deg)", opacity: "0" },
  { offset: 1, transform: "translate3d(0, 0, 0)", opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/rotating_entrances/rotateInDownRight.js
var rotateInDownRight = [
  { offset: 0, transform: "rotate3d(0, 0, 1, 45deg)", opacity: "0" },
  { offset: 1, transform: "translate3d(0, 0, 0)", opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/rotating_entrances/rotateInUpLeft.js
var rotateInUpLeft = [
  { offset: 0, transform: "rotate3d(0, 0, 1, 45deg)", opacity: "0" },
  { offset: 1, transform: "translate3d(0, 0, 0)", opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/rotating_entrances/rotateInUpRight.js
var rotateInUpRight = [
  { offset: 0, transform: "rotate3d(0, 0, 1, -90deg)", opacity: "0" },
  { offset: 1, transform: "translate3d(0, 0, 0)", opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/rotating_exits/rotateOut.js
var rotateOut = [
  { offset: 0, opacity: "1" },
  { offset: 1, transform: "rotate3d(0, 0, 1, 200deg)", opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/rotating_exits/rotateOutDownLeft.js
var rotateOutDownLeft = [
  { offset: 0, opacity: "1" },
  { offset: 1, transform: "rotate3d(0, 0, 1, 45deg)", opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/rotating_exits/rotateOutDownRight.js
var rotateOutDownRight = [
  { offset: 0, opacity: "1" },
  { offset: 1, transform: "rotate3d(0, 0, 1, -45deg)", opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/rotating_exits/rotateOutUpLeft.js
var rotateOutUpLeft = [
  { offset: 0, opacity: "1" },
  { offset: 1, transform: "rotate3d(0, 0, 1, -45deg)", opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/rotating_exits/rotateOutUpRight.js
var rotateOutUpRight = [
  { offset: 0, opacity: "1" },
  { offset: 1, transform: "rotate3d(0, 0, 1, 90deg)", opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/sliding_entrances/slideInDown.js
var slideInDown = [
  { offset: 0, transform: "translate3d(0, -100%, 0)", visibility: "visible" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/sliding_entrances/slideInLeft.js
var slideInLeft = [
  { offset: 0, transform: "translate3d(-100%, 0, 0)", visibility: "visible" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/sliding_entrances/slideInRight.js
var slideInRight = [
  { offset: 0, transform: "translate3d(100%, 0, 0)", visibility: "visible" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/sliding_entrances/slideInUp.js
var slideInUp = [
  { offset: 0, transform: "translate3d(0, 100%, 0)", visibility: "visible" },
  { offset: 1, transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/sliding_exits/slideOutDown.js
var slideOutDown = [
  { offset: 0, transform: "translate3d(0, 0, 0)" },
  { offset: 1, visibility: "hidden", transform: "translate3d(0, 100%, 0)" }
];

// node_modules/@shoelace-style/animations/dist/sliding_exits/slideOutLeft.js
var slideOutLeft = [
  { offset: 0, transform: "translate3d(0, 0, 0)" },
  { offset: 1, visibility: "hidden", transform: "translate3d(-100%, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/sliding_exits/slideOutRight.js
var slideOutRight = [
  { offset: 0, transform: "translate3d(0, 0, 0)" },
  { offset: 1, visibility: "hidden", transform: "translate3d(100%, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/sliding_exits/slideOutUp.js
var slideOutUp = [
  { offset: 0, transform: "translate3d(0, 0, 0)" },
  { offset: 1, visibility: "hidden", transform: "translate3d(0, -100%, 0)" }
];

// node_modules/@shoelace-style/animations/dist/specials/hinge.js
var hinge = [
  { offset: 0, easing: "ease-in-out" },
  { offset: 0.2, transform: "rotate3d(0, 0, 1, 80deg)", easing: "ease-in-out" },
  { offset: 0.4, transform: "rotate3d(0, 0, 1, 60deg)", easing: "ease-in-out", opacity: "1" },
  { offset: 0.6, transform: "rotate3d(0, 0, 1, 80deg)", easing: "ease-in-out" },
  { offset: 0.8, transform: "rotate3d(0, 0, 1, 60deg)", easing: "ease-in-out", opacity: "1" },
  { offset: 1, transform: "translate3d(0, 700px, 0)", opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/specials/jackInTheBox.js
var jackInTheBox = [
  { offset: 0, opacity: "0", transform: "scale(0.1) rotate(30deg)", "transform-origin": "center bottom" },
  { offset: 0.5, transform: "rotate(-10deg)" },
  { offset: 0.7, transform: "rotate(3deg)" },
  { offset: 1, opacity: "1", transform: "scale(1)" }
];

// node_modules/@shoelace-style/animations/dist/specials/rollIn.js
var rollIn = [
  { offset: 0, opacity: "0", transform: "translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)" },
  { offset: 1, opacity: "1", transform: "translate3d(0, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/specials/rollOut.js
var rollOut = [
  { offset: 0, opacity: "1" },
  { offset: 1, opacity: "0", transform: "translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)" }
];

// node_modules/@shoelace-style/animations/dist/zooming_entrances/zoomIn.js
var zoomIn = [
  { offset: 0, opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
  { offset: 0.5, opacity: "1" }
];

// node_modules/@shoelace-style/animations/dist/zooming_entrances/zoomInDown.js
var zoomInDown = [
  {
    offset: 0,
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",
    easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)"
  },
  {
    offset: 0.6,
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",
    easing: "cubic-bezier(0.175, 0.885, 0.32, 1)"
  }
];

// node_modules/@shoelace-style/animations/dist/zooming_entrances/zoomInLeft.js
var zoomInLeft = [
  {
    offset: 0,
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",
    easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)"
  },
  {
    offset: 0.6,
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",
    easing: "cubic-bezier(0.175, 0.885, 0.32, 1)"
  }
];

// node_modules/@shoelace-style/animations/dist/zooming_entrances/zoomInRight.js
var zoomInRight = [
  {
    offset: 0,
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",
    easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)"
  },
  {
    offset: 0.6,
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",
    easing: "cubic-bezier(0.175, 0.885, 0.32, 1)"
  }
];

// node_modules/@shoelace-style/animations/dist/zooming_entrances/zoomInUp.js
var zoomInUp = [
  {
    offset: 0,
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",
    easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)"
  },
  {
    offset: 0.6,
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",
    easing: "cubic-bezier(0.175, 0.885, 0.32, 1)"
  }
];

// node_modules/@shoelace-style/animations/dist/zooming_exits/zoomOut.js
var zoomOut = [
  { offset: 0, opacity: "1" },
  { offset: 0.5, opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
  { offset: 1, opacity: "0" }
];

// node_modules/@shoelace-style/animations/dist/zooming_exits/zoomOutDown.js
var zoomOutDown = [
  {
    offset: 0.4,
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",
    easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)"
  },
  {
    offset: 1,
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",
    easing: "cubic-bezier(0.175, 0.885, 0.32, 1)"
  }
];

// node_modules/@shoelace-style/animations/dist/zooming_exits/zoomOutLeft.js
var zoomOutLeft = [
  { offset: 0.4, opacity: "1", transform: "scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)" },
  { offset: 1, opacity: "0", transform: "scale(0.1) translate3d(-2000px, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/zooming_exits/zoomOutRight.js
var zoomOutRight = [
  { offset: 0.4, opacity: "1", transform: "scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)" },
  { offset: 1, opacity: "0", transform: "scale(0.1) translate3d(2000px, 0, 0)" }
];

// node_modules/@shoelace-style/animations/dist/zooming_exits/zoomOutUp.js
var zoomOutUp = [
  {
    offset: 0.4,
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",
    easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)"
  },
  {
    offset: 1,
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",
    easing: "cubic-bezier(0.175, 0.885, 0.32, 1)"
  }
];

// node_modules/@shoelace-style/animations/dist/easings/easings.js
var easings = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  easeInSine: "cubic-bezier(0.47, 0, 0.745, 0.715)",
  easeOutSine: "cubic-bezier(0.39, 0.575, 0.565, 1)",
  easeInOutSine: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  easeInQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
  easeOutQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  easeInOutQuad: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
  easeInCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  easeOutCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  easeInQuart: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
  easeOutQuart: "cubic-bezier(0.165, 0.84, 0.44, 1)",
  easeInOutQuart: "cubic-bezier(0.77, 0, 0.175, 1)",
  easeInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  easeOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  easeInOutQuint: "cubic-bezier(0.86, 0, 0.07, 1)",
  easeInExpo: "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
  easeOutExpo: "cubic-bezier(0.19, 1, 0.22, 1)",
  easeInOutExpo: "cubic-bezier(1, 0, 0, 1)",
  easeInCirc: "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
  easeOutCirc: "cubic-bezier(0.075, 0.82, 0.165, 1)",
  easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
  easeInBack: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
  easeOutBack: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  easeInOutBack: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
};

// src/components/animation/animation.styles.ts
var animation_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: contents;
  }
`;

// src/components/animation/animation.ts
var SlAnimation = class extends h3 {
  constructor() {
    super(...arguments);
    this.hasStarted = false;
    this.name = "none";
    this.play = false;
    this.delay = 0;
    this.direction = "normal";
    this.duration = 1e3;
    this.easing = "linear";
    this.endDelay = 0;
    this.fill = "auto";
    this.iterations = Infinity;
    this.iterationStart = 0;
    this.playbackRate = 1;
  }
  get currentTime() {
    var _a;
    return ((_a = this.animation) == null ? void 0 : _a.currentTime) || 0;
  }
  set currentTime(time) {
    if (this.animation) {
      this.animation.currentTime = time;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.createAnimation();
    this.handleAnimationCancel = this.handleAnimationCancel.bind(this);
    this.handleAnimationFinish = this.handleAnimationFinish.bind(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.destroyAnimation();
  }
  async handleAnimationChange() {
    if (!this.hasUpdated) {
      return;
    }
    this.createAnimation();
  }
  handleAnimationFinish() {
    this.play = false;
    this.hasStarted = false;
    emit(this, "sl-finish");
  }
  handleAnimationCancel() {
    this.play = false;
    this.hasStarted = false;
    emit(this, "sl-cancel");
  }
  handlePlayChange() {
    if (this.animation) {
      if (this.play && !this.hasStarted) {
        this.hasStarted = true;
        emit(this, "sl-start");
      }
      this.play ? this.animation.play() : this.animation.pause();
      return true;
    } else {
      return false;
    }
  }
  handlePlaybackRateChange() {
    if (this.animation) {
      this.animation.playbackRate = this.playbackRate;
    }
  }
  handleSlotChange() {
    this.destroyAnimation();
    this.createAnimation();
  }
  async createAnimation() {
    const easing = dist_exports.easings[this.easing] || this.easing;
    const keyframes = this.keyframes ? this.keyframes : dist_exports[this.name];
    const slot = await this.defaultSlot;
    const element = slot.assignedElements()[0];
    if (!element) {
      return false;
    }
    this.destroyAnimation();
    this.animation = element.animate(keyframes, {
      delay: this.delay,
      direction: this.direction,
      duration: this.duration,
      easing,
      endDelay: this.endDelay,
      fill: this.fill,
      iterationStart: this.iterationStart,
      iterations: this.iterations
    });
    this.animation.playbackRate = this.playbackRate;
    this.animation.addEventListener("cancel", this.handleAnimationCancel);
    this.animation.addEventListener("finish", this.handleAnimationFinish);
    if (this.play) {
      this.hasStarted = true;
      emit(this, "sl-start");
    } else {
      this.animation.pause();
    }
    return true;
  }
  destroyAnimation() {
    if (this.animation) {
      this.animation.cancel();
      this.animation.removeEventListener("cancel", this.handleAnimationCancel);
      this.animation.removeEventListener("finish", this.handleAnimationFinish);
      this.hasStarted = false;
    }
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch (e3) {
    }
  }
  finish() {
    try {
      this.animation.finish();
    } catch (e3) {
    }
  }
  render() {
    return T` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
};
SlAnimation.styles = animation_styles_default;
__decorateClass([
  e2("slot")
], SlAnimation.prototype, "defaultSlot", 2);
__decorateClass([
  e()
], SlAnimation.prototype, "name", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlAnimation.prototype, "play", 2);
__decorateClass([
  e({ type: Number })
], SlAnimation.prototype, "delay", 2);
__decorateClass([
  e()
], SlAnimation.prototype, "direction", 2);
__decorateClass([
  e({ type: Number })
], SlAnimation.prototype, "duration", 2);
__decorateClass([
  e()
], SlAnimation.prototype, "easing", 2);
__decorateClass([
  e({ attribute: "end-delay", type: Number })
], SlAnimation.prototype, "endDelay", 2);
__decorateClass([
  e()
], SlAnimation.prototype, "fill", 2);
__decorateClass([
  e({ type: Number })
], SlAnimation.prototype, "iterations", 2);
__decorateClass([
  e({ attribute: "iteration-start", type: Number })
], SlAnimation.prototype, "iterationStart", 2);
__decorateClass([
  e({ attribute: false })
], SlAnimation.prototype, "keyframes", 2);
__decorateClass([
  e({ attribute: "playback-rate", type: Number })
], SlAnimation.prototype, "playbackRate", 2);
__decorateClass([
  watch("name"),
  watch("delay"),
  watch("direction"),
  watch("duration"),
  watch("easing"),
  watch("endDelay"),
  watch("fill"),
  watch("iterations"),
  watch("iterationsStart"),
  watch("keyframes")
], SlAnimation.prototype, "handleAnimationChange", 1);
__decorateClass([
  watch("play")
], SlAnimation.prototype, "handlePlayChange", 1);
__decorateClass([
  watch("playbackRate")
], SlAnimation.prototype, "handlePlaybackRateChange", 1);
SlAnimation = __decorateClass([
  n("sl-animation")
], SlAnimation);
var animation_default = SlAnimation;

// src/components/avatar/avatar.styles.ts
var avatar_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: rgb(var(--sl-color-neutral-400));
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: rgb(var(--sl-color-neutral-0));
    overflow: hidden;
    user-select: none;
    vertical-align: middle;
  }

  .avatar--circle {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// src/components/avatar/avatar.ts
var SlAvatar$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.hasError = false;
    this.shape = "circle";
  }
  render() {
    return T`
      <div
        part="base"
        class=${e2$1({
      avatar: true,
      "avatar--circle": this.shape === "circle",
      "avatar--rounded": this.shape === "rounded",
      "avatar--square": this.shape === "square"
    })}
        aria-label=${this.alt}
      >
        ${this.initials ? T` <div part="initials" class="avatar__initials">${this.initials}</div> ` : T`
              <div part="icon" class="avatar__icon">
                <slot name="icon">
                  <sl-icon name="person-fill" library="system"></sl-icon>
                </slot>
              </div>
            `}
        ${this.image && !this.hasError ? T`
              <img part="image" class="avatar__image" src="${this.image}" @error="${() => this.hasError = true}" />
            ` : ""}
      </div>
    `;
  }
};
SlAvatar$1.styles = avatar_styles_default;
__decorateClass([
  r()
], SlAvatar$1.prototype, "hasError", 2);
__decorateClass([
  e()
], SlAvatar$1.prototype, "image", 2);
__decorateClass([
  e()
], SlAvatar$1.prototype, "alt", 2);
__decorateClass([
  e()
], SlAvatar$1.prototype, "initials", 2);
__decorateClass([
  e({ reflect: true })
], SlAvatar$1.prototype, "shape", 2);
SlAvatar$1 = __decorateClass([
  n("sl-avatar")
], SlAvatar$1);
var avatar_default = SlAvatar$1;

// src/components/breadcrumb-item/breadcrumb-item.styles.ts
var breadcrumb_item_styles_default = i$1`
  ${component_styles_default}

  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: rgb(var(--sl-color-neutral-600));
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: rgb(var(--sl-color-primary-600));
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: rgb(var(--sl-color-primary-500));
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: rgb(var(--sl-color-primary-600));
  }

  .breadcrumb-item__label${focusVisibleSelector} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-right: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
  }
`;

// src/components/breadcrumb-item/breadcrumb-item.ts
var SlBreadcrumbItem = class extends h3 {
  constructor() {
    super(...arguments);
    this.hasPrefix = false;
    this.hasSuffix = false;
  }
  handleSlotChange() {
    this.hasPrefix = hasSlot(this, "prefix");
    this.hasSuffix = hasSlot(this, "suffix");
  }
  render() {
    const isLink = this.href ? true : false;
    return T`
      <div
        part="base"
        class=${e2$1({
      "breadcrumb-item": true,
      "breadcrumb-item--has-prefix": this.hasPrefix,
      "breadcrumb-item--has-suffix": this.hasSuffix
    })}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix" @slotchange=${this.handleSlotChange}></slot>
        </span>

        ${isLink ? T`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${this.target}"
                rel=${l(this.target ? "noreferrer noopener" : void 0)}
              >
                <slot></slot>
              </a>
            ` : T`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot></slot>
              </button>
            `}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix" @slotchange=${this.handleSlotChange}></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `;
  }
};
SlBreadcrumbItem.styles = breadcrumb_item_styles_default;
__decorateClass([
  r()
], SlBreadcrumbItem.prototype, "hasPrefix", 2);
__decorateClass([
  r()
], SlBreadcrumbItem.prototype, "hasSuffix", 2);
__decorateClass([
  e()
], SlBreadcrumbItem.prototype, "href", 2);
__decorateClass([
  e()
], SlBreadcrumbItem.prototype, "target", 2);
SlBreadcrumbItem = __decorateClass([
  n("sl-breadcrumb-item")
], SlBreadcrumbItem);
var breadcrumb_item_default = SlBreadcrumbItem;

// src/components/breadcrumb/breadcrumb.styles.ts
var breadcrumb_styles_default = i$1`
  ${component_styles_default}

  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

// src/components/breadcrumb/breadcrumb.ts
var SlBreadcrumb$1 = class extends h3 {
  constructor() {
    super(...arguments);
    this.label = "Breadcrumb";
  }
  getSeparator() {
    const separator = this.separatorSlot.assignedElements({ flatten: true })[0];
    const clone = separator.cloneNode(true);
    [clone, ...clone.querySelectorAll("[id]")].map((el) => el.removeAttribute("id"));
    clone.slot = "separator";
    return clone;
  }
  handleSlotChange() {
    const items = [...this.defaultSlot.assignedElements({ flatten: true })].filter((item) => item.tagName.toLowerCase() === "sl-breadcrumb-item");
    items.map((item, index) => {
      const separator = item.querySelector('[slot="separator"]');
      if (!separator) {
        item.append(this.getSeparator());
      }
      if (index === items.length - 1) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  }
  render() {
    return T`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <slot name="separator" hidden aria-hidden="true">
        <sl-icon name="chevron-right" library="system"></sl-icon>
      </slot>
    `;
  }
};
SlBreadcrumb$1.styles = breadcrumb_styles_default;
__decorateClass([
  o2$1("slot")
], SlBreadcrumb$1.prototype, "defaultSlot", 2);
__decorateClass([
  o2$1('slot[name="separator"]')
], SlBreadcrumb$1.prototype, "separatorSlot", 2);
__decorateClass([
  e()
], SlBreadcrumb$1.prototype, "label", 2);
SlBreadcrumb$1 = __decorateClass([
  n("sl-breadcrumb")
], SlBreadcrumb$1);
var breadcrumb_default = SlBreadcrumb$1;

class SlIconButton extends ScopedElementsMixin(icon_button_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
        };
    }
}

class SlTab extends ScopedElementsMixin(tab_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
            'sl-icon-button': SlIconButton,
        };
    }
}

class SlTabGroup extends ScopedElementsMixin(tab_group_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
            'sl-icon-button': SlIconButton,
        };
    }
}

class SlTag extends ScopedElementsMixin(tag_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
            'sl-icon-button': icon_button_default,
        };
    }
}

class SlSelect extends ScopedElementsMixin(select_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
            'sl-icon-button': SlIconButton,
            'sl-menu': menu_default,
            'sl-tag': SlTag,
            'sl-dropdown': dropdown_default,
        };
    }
}

class SlRating extends ScopedElementsMixin(rating_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
        };
    }
}

class SlMenuItem extends ScopedElementsMixin(menu_item_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
        };
    }
}

class SlImageComparer extends ScopedElementsMixin(image_comparer_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
        };
    }
}

class SlDrawer extends ScopedElementsMixin(drawer_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
            'sl-icon-button': SlIconButton,
        };
    }
}

class SlDialog extends ScopedElementsMixin(dialog_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
            'sl-icon-button': SlIconButton,
        };
    }
}

class SlBreadcrumb extends ScopedElementsMixin(breadcrumb_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
        };
    }
}

class SlDetails extends ScopedElementsMixin(details_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
        };
    }
}

class SlAlert extends ScopedElementsMixin(alert_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
            'sl-icon-button': SlIconButton,
        };
    }
}

// src/themes/light.styles.ts
var light_styles_default = i$1`
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

class SlAvatar extends ScopedElementsMixin(avatar_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
        };
    }
    static get styles() {
        return [light_styles_default];
    }
}

class SlButton extends ScopedElementsMixin(button_default) {
    static get scopedElements() {
        return {
            'sl-spinner': spinner_default,
        };
    }
}

class SlInput extends ScopedElementsMixin(input_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
        };
    }
}

class SlColorPicker extends ScopedElementsMixin(color_picker_default) {
    static get scopedElements() {
        return {
            'sl-icon': icon_default,
            'sl-button': SlButton,
            'sl-input': SlInput,
            'sl-spinner': spinner_default,
            'sl-dropdown': dropdown_default,
        };
    }
}

export { SlAlert, animation_default as SlAnimation, SlAvatar, badge_default as SlBadge, SlBreadcrumb, breadcrumb_item_default as SlBreadcrumbItem, SlButton, button_group_default as SlButtonGroup, card_default as SlCard, checkbox_default as SlCheckbox, SlColorPicker, SlDetails, SlDialog, SlDrawer, dropdown_default as SlDropdown, form_default as SlForm, format_bytes_default as SlFormatBytes, format_date_default as SlFormatDate, format_number_default as SlFormatNumber, icon_default as SlIcon, SlIconButton, SlImageComparer, include_default as SlInclude, SlInput, menu_default as SlMenu, menu_divider_default as SlMenuDivider, SlMenuItem, menu_label_default as SlMenuLabel, progress_bar_default as SlProgressBar, progress_ring_default as SlProgressRing, qr_code_default as SlQrCode, radio_default as SlRadio, radio_group_default as SlRadioGroup, range_default as SlRange, SlRating, relative_time_default as SlRelativeTime, resize_observer_default as SlResizeObserver, responsive_media_default as SlResponsiveMedia, SlSelect, skeleton_default as SlSkeleton, spinner_default as SlSpinner, switch_default as SlSwitch, SlTab, SlTabGroup, tab_panel_default as SlTabPanel, SlTag, textarea_default as SlTextarea, tooltip_default as SlTooltip };
//# sourceMappingURL=index.js.map
