import * as a from "react";
import { u as K, a as W, b as z, c as H, d as U, e as Y, f as Ee, g as G, s as Q, h as X, i as J } from "./floating-ui.react.esm-730ae197.js";
import "react-dom";
const j = a.createContext(null), L = () => {
  const r = a.useContext(j);
  if (r == null)
    throw new Error("Component is not being provided the <Combobox/> context");
  return r;
}, Me = ({ children: r, ...n }) => {
  const s = Se(n);
  return /* @__PURE__ */ a.createElement(j.Provider, { value: s }, r);
};
function Se({
  name: r,
  labelledBy: n = "",
  options: s,
  getLabels: t = () => {
  },
  defaultLabel: e = "",
  onSelect: o = () => {
  },
  initialOpen: c = !1,
  open: i,
  onOpenChange: l,
  asTable: u = !1
} = {}) {
  const [h, f] = a.useState(c), [d, x] = a.useState(null), [m, I] = a.useState(""), v = i ?? h, R = u ? () => !0 : l ?? f, b = a.useRef(null), E = a.useRef(null), w = a.useRef([]);
  if (b.current == null) {
    if (E.current = t(s) || [], E.current.length !== s.length)
      throw new Error("Error by getLabels()");
    b.current = /* @__PURE__ */ new Map(), E.current.forEach(
      (y, p) => b.current.set(y, s[p])
    );
  }
  a.useEffect(() => {
    m || E.current.forEach((y, p) => {
      y === e && (x(p), I(y));
    });
  }, [v, s, e]);
  const C = K({
    open: v,
    initialPlacement: "top",
    placement: "top",
    onOpenChange: R,
    whileElementsMounted: G,
    middleware: [
      Q({
        apply({ rects: y, elements: p }) {
          p.floating.style.minWidth = `${y.reference.width}px`;
        }
      }),
      X({
        fallbackStrategy: "initialPlacement"
      }),
      J()
    ]
  }), $ = W([
    z(C.context, {
      listRef: w,
      activeIndex: d,
      onNavigate: x,
      virtual: !0,
      loop: !0
    }),
    H(C.context),
    U(C.context, { keyboardOnly: !0 }),
    Y(C.context, {
      keyboardHandlers: !1
    }),
    Ee(C.context, {
      listRef: E,
      activeIndex: d,
      onMatch: x,
      resetMs: 500
    })
  ]), O = (y) => {
    let p;
    y.target ? (p = y.target.value, R(!0)) : p = y, I(p);
  };
  return a.useMemo(
    () => ({
      name: r,
      labelledBy: n,
      isOpen: v,
      setIsOpen: R,
      inputValue: m,
      onSelect: o,
      setInputValue: I,
      onInputValueChange: O,
      activeIndex: d,
      setActiveIndex: x,
      optionsRef: b,
      labelsRef: E,
      listRef: w,
      ...C,
      ...$
    }),
    [v, R, m, I, $, C]
  );
}
function we({ placeholder: r, className: n, children: s, ...t }) {
  const e = L();
  return typeof s == "function" ? s({
    readOnly: !0,
    id: `${e.name}-trigger`,
    ref: e.refs.setReference,
    role: "combobox",
    "aria-controls": `${e.name}-listbox`,
    "aria-expanded": e.isOpen,
    "aria-haspopup": "listbox",
    "aria-labelledby": e.labelledBy,
    tabIndex: 0,
    name: e.name,
    type: "text",
    placeholder: r,
    value: e.inputValue,
    onChange: e.onInputValueChange,
    ...e.getReferenceProps({
      onKeyDown: (o) => {
        switch (o.code) {
          case "Enter":
            if (e.activeIndex != null && e.labelsRef.current[e.activeIndex]) {
              const c = e.labelsRef.current[e.activeIndex];
              e.onInputValueChange(c), e.setActiveIndex(null), e.setIsOpen(!1), e.onSelect(e.optionsRef.current.get(c));
            }
            break;
          case "Space":
            e.setIsOpen(!1);
            break;
          case "Escape":
            e.isOpen || (e.onInputValueChange(""), e.setActiveIndex(null), e.refs.domReference.current?.blur(), e.onSelect(""));
            break;
        }
      }
    }),
    ...t
  }) : /* @__PURE__ */ a.createElement(
    "input",
    {
      readOnly: !0,
      id: `${e.name}-trigger`,
      ref: e.refs.setReference,
      className: `combobox trigger ${n || ""}`,
      role: "combobox",
      "aria-controls": `${e.name}-listbox`,
      "aria-expanded": e.isOpen,
      "aria-haspopup": "listbox",
      "aria-labelledby": e.labelledBy,
      tabIndex: 0,
      name: e.name,
      type: "text",
      placeholder: r,
      value: e.inputValue,
      onChange: e.onInputValueChange,
      ...e.getReferenceProps({
        onKeyDown: (o) => {
          switch (o.code) {
            case "Enter":
              if (e.activeIndex != null && e.labelsRef.current[e.activeIndex]) {
                const c = e.labelsRef.current[e.activeIndex];
                e.onInputValueChange(c), e.setActiveIndex(null), e.setIsOpen(!1), e.onSelect(e.optionsRef.current.get(c));
              }
              break;
            case "Space":
              e.setIsOpen(!1);
              break;
            case "Escape":
              e.isOpen || (e.onInputValueChange(""), e.setActiveIndex(null), e.refs.domReference.current?.blur(), e.onSelect(""));
              break;
          }
        },
        ...t
      })
    }
  );
}
function $e({ renderOnEmpty: r, renderOption: n, className: s, ...t }) {
  const e = L();
  return /* @__PURE__ */ a.createElement(a.Fragment, null, e.isOpen && /* @__PURE__ */ a.createElement(
    "ul",
    {
      id: `${e.name}-listbox`,
      ref: e.refs.setFloating,
      className: `combobox listbox ${s}`,
      role: "listbox",
      "aria-labelledby": e.labelledBy,
      style: {
        position: e.strategy,
        top: e.y ?? 0,
        left: e.x ?? 0
      },
      ...e.getFloatingProps(t)
    },
    e.optionsRef.current.size >= 1 ? e.labelsRef.current.map(
      (o, c) => n({
        id: `${e.name}-opt-${c}`,
        key: o,
        label: o,
        option: e.optionsRef.current.get(o),
        i: c,
        ctx: e,
        ref: (i) => e.listRef.current[c] = i,
        selected: o === e.inputValue,
        active: e.activeIndex === c,
        role: "option",
        tabIndex: -1,
        onClick: (i) => {
          i.preventDefault(), e.onInputValueChange(o), e.setIsOpen(!1), e.onSelect(e.optionsRef.current.get(o));
        }
      })
    ) : r
  ));
}
const Oe = a.forwardRef(
  ({ active: r, selected: n, label: s, ctx: t, className: e, children: o, ...c }, i) => /* @__PURE__ */ a.createElement(
    "li",
    {
      className: `combobox option ${e}`,
      "aria-selected": n,
      ...t.getItemProps({
        ref: i,
        ...c
      })
    },
    o || s
  )
), Ft = {
  Provider: Me,
  Trigger: we,
  Listbox: $e,
  Option: Oe
}, Ce = ({ children: r, ...n }) => {
  const s = Ae(n);
  return /* @__PURE__ */ a.createElement(j.Provider, { value: s }, r);
};
function Ae({
  name: r,
  labelledBy: n = "",
  options: s,
  getLabels: t = () => {
  },
  defaultLabel: e = "",
  onSelect: o = () => {
  },
  initialOpen: c = !1,
  open: i,
  onOpenChange: l,
  asTable: u = !1
} = {}) {
  const [h, f] = a.useState(c), [d, x] = a.useState(null), [m, I] = a.useState(""), v = i ?? h, R = u ? () => !0 : l ?? f, b = a.useRef(null), E = a.useRef(null), w = a.useRef([]);
  if (b.current == null) {
    if (E.current = t(s) || [], E.current.length !== s.length)
      throw new Error("Error by getLabels()");
    b.current = /* @__PURE__ */ new Map(), E.current.forEach(
      (y, p) => b.current.set(y, s[p])
    );
  }
  a.useEffect(() => {
    m || E.current.forEach((y, p) => {
      y === e && (x(p), I(y));
    });
  }, [v, s, e]);
  const C = K({
    open: v,
    onOpenChange: R,
    whileElementsMounted: G,
    middleware: [
      X(),
      J(),
      Q({
        apply({ rects: y, elements: p }) {
          p.floating.style.width = `${y.reference.width}px`;
        }
      })
    ]
  }), $ = W([
    z(C.context, {
      listRef: w,
      activeIndex: d,
      onNavigate: x,
      virtual: !0,
      loop: !0
    }),
    H(C.context),
    U(C.context, { keyboardOnly: !0 }),
    Y(C.context, { keyboardHandlers: !1 })
  ]), O = (y) => {
    let p;
    y.target ? (p = y.target.value, R(!0), x(null)) : p = y, I(p);
  };
  return a.useMemo(
    () => ({
      name: r,
      labelledBy: n,
      isOpen: v,
      setIsOpen: R,
      inputValue: m,
      onSelect: o,
      setInputValue: I,
      onInputValueChange: O,
      activeIndex: d,
      setActiveIndex: x,
      optionsRef: b,
      labelsRef: E,
      listRef: w,
      ...C,
      ...$
    }),
    [v, R, m, I, $, C]
  );
}
function ke({ placeholder: r, className: n, ...s }) {
  const t = L();
  return /* @__PURE__ */ a.createElement(
    "input",
    {
      id: `${t.name}-trigger`,
      ref: t.refs.setReference,
      className: `combobox trigger ${n || ""}`,
      role: "combobox",
      "aria-controls": `${t.name}-listbox`,
      "aria-expanded": t.isOpen,
      "aria-haspopup": "listbox",
      "aria-labelledby": t.labelledBy,
      "aria-autocomplete": "none",
      tabIndex: 0,
      name: t.name,
      type: "text",
      placeholder: r,
      value: t.inputValue,
      onChange: t.onInputValueChange,
      ...t.getReferenceProps({
        onKeyDown: (e) => {
          switch (e.code) {
            case "Enter":
              if (t.activeIndex != null && t.labelsRef.current[t.activeIndex]) {
                const o = t.labelsRef.current[t.activeIndex];
                t.onInputValueChange(o), t.setActiveIndex(null), t.setIsOpen(!1), t.onSelect(t.optionsRef.current.get(o));
              } else
                t.setActiveIndex(null), t.setIsOpen(!1), t.onSelect(t.inputValue);
              break;
            case "Escape":
              t.isOpen || (t.onInputValueChange(""), t.setActiveIndex(null), t.refs.domReference.current?.blur(), t.onSelect(""));
              break;
          }
        },
        ...s
      })
    }
  );
}
function _e({ renderOnEmpty: r, renderOption: n, className: s, ...t }) {
  const e = L();
  return /* @__PURE__ */ a.createElement(a.Fragment, null, e.isOpen && /* @__PURE__ */ a.createElement(
    "ul",
    {
      id: `${e.name}-listbox`,
      ref: e.refs.setFloating,
      className: `combobox listbox ${s}`,
      role: "listbox",
      "aria-labelledby": e.labelledBy,
      style: {
        position: e.strategy,
        top: e.y ?? 0,
        left: e.x ?? 0
      },
      ...e.getFloatingProps(t)
    },
    e.optionsRef.current.size >= 1 ? e.labelsRef.current.map(
      (o, c) => n({
        id: `${e.name}-opt-${c}`,
        key: o,
        label: o,
        option: e.optionsRef.current.get(o),
        i: c,
        ctx: e,
        ref: (i) => e.listRef.current[c] = i,
        selected: o === e.inputValue,
        active: e.activeIndex === c,
        role: "option",
        tabIndex: -1,
        onClick: (i) => {
          i.preventDefault(), e.onInputValueChange(o), e.setIsOpen(!1), e.onSelect(e.optionsRef.current.get(o));
        }
      })
    ) : r
  ));
}
const Ve = a.forwardRef(
  ({ active: r, selected: n, label: s, ctx: t, className: e, children: o, ...c }, i) => /* @__PURE__ */ a.createElement(
    "li",
    {
      className: `combobox option ${e}`,
      "aria-selected": n,
      ...t.getItemProps({
        ref: i,
        ...c
      })
    },
    o || s
  )
), Tt = {
  Provider: Ce,
  Trigger: ke,
  Listbox: _e,
  Option: Ve
};
function P(r) {
  return Array.isArray ? Array.isArray(r) : xe(r) === "[object Array]";
}
const Ne = 1 / 0;
function Le(r) {
  if (typeof r == "string")
    return r;
  let n = r + "";
  return n == "0" && 1 / r == -Ne ? "-0" : n;
}
function Pe(r) {
  return r == null ? "" : Le(r);
}
function N(r) {
  return typeof r == "string";
}
function de(r) {
  return typeof r == "number";
}
function Fe(r) {
  return r === !0 || r === !1 || Te(r) && xe(r) == "[object Boolean]";
}
function ge(r) {
  return typeof r == "object";
}
function Te(r) {
  return ge(r) && r !== null;
}
function _(r) {
  return r != null;
}
function te(r) {
  return !r.trim().length;
}
function xe(r) {
  return r == null ? r === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r);
}
const De = "Incorrect 'index' type", Be = (r) => `Invalid value for key ${r}`, je = (r) => `Pattern length exceeds max of ${r}.`, Ke = (r) => `Missing ${r} property in key`, We = (r) => `Property 'weight' in key '${r}' must be a positive integer`, le = Object.prototype.hasOwnProperty;
class ze {
  constructor(n) {
    this._keys = [], this._keyMap = {};
    let s = 0;
    n.forEach((t) => {
      let e = me(t);
      s += e.weight, this._keys.push(e), this._keyMap[e.id] = e, s += e.weight;
    }), this._keys.forEach((t) => {
      t.weight /= s;
    });
  }
  get(n) {
    return this._keyMap[n];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function me(r) {
  let n = null, s = null, t = null, e = 1, o = null;
  if (N(r) || P(r))
    t = r, n = ue(r), s = ne(r);
  else {
    if (!le.call(r, "name"))
      throw new Error(Ke("name"));
    const c = r.name;
    if (t = c, le.call(r, "weight") && (e = r.weight, e <= 0))
      throw new Error(We(c));
    n = ue(c), s = ne(c), o = r.getFn;
  }
  return { path: n, id: s, weight: e, src: t, getFn: o };
}
function ue(r) {
  return P(r) ? r : r.split(".");
}
function ne(r) {
  return P(r) ? r.join(".") : r;
}
function He(r, n) {
  let s = [], t = !1;
  const e = (o, c, i) => {
    if (_(o))
      if (!c[i])
        s.push(o);
      else {
        let l = c[i];
        const u = o[l];
        if (!_(u))
          return;
        if (i === c.length - 1 && (N(u) || de(u) || Fe(u)))
          s.push(Pe(u));
        else if (P(u)) {
          t = !0;
          for (let h = 0, f = u.length; h < f; h += 1)
            e(u[h], c, i + 1);
        } else
          c.length && e(u, c, i + 1);
      }
  };
  return e(r, N(n) ? n.split(".") : n, 0), t ? s : s[0];
}
const Ue = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: !1,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: !1,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
}, Ye = {
  // When `true`, the algorithm continues searching to the end of the input even if a perfect
  // match is found before the end of the same input.
  isCaseSensitive: !1,
  // When true, the matching function will continue to the end of a search pattern even if
  includeScore: !1,
  // List of properties that will be searched. This also supports nested properties.
  keys: [],
  // Whether to sort the result list, by score
  shouldSort: !0,
  // Default sort function: sort by ascending score, ascending index
  sortFn: (r, n) => r.score === n.score ? r.idx < n.idx ? -1 : 1 : r.score < n.score ? -1 : 1
}, Ge = {
  // Approximately where in the text is the pattern expected to be found?
  location: 0,
  // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
  // (of both letters and location), a threshold of '1.0' would match anything.
  threshold: 0.6,
  // Determines how close the match must be to the fuzzy location (specified above).
  // An exact letter match which is 'distance' characters away from the fuzzy location
  // would score as a complete mismatch. A distance of '0' requires the match be at
  // the exact location specified, a threshold of '1000' would require a perfect match
  // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
  distance: 100
}, Qe = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: !1,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: He,
  // When `true`, search will ignore `location` and `distance`, so it won't matter
  // where in the string the pattern appears.
  // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
  ignoreLocation: !1,
  // When `true`, the calculation for the relevance score (used for sorting) will
  // ignore the field-length norm.
  // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
  ignoreFieldNorm: !1,
  // The weight to determine how much field length norm effects scoring.
  fieldNormWeight: 1
};
var g = {
  ...Ye,
  ...Ue,
  ...Ge,
  ...Qe
};
const Xe = /[^ ]+/g;
function Je(r = 1, n = 3) {
  const s = /* @__PURE__ */ new Map(), t = Math.pow(10, n);
  return {
    get(e) {
      const o = e.match(Xe).length;
      if (s.has(o))
        return s.get(o);
      const c = 1 / Math.pow(o, 0.5 * r), i = parseFloat(Math.round(c * t) / t);
      return s.set(o, i), i;
    },
    clear() {
      s.clear();
    }
  };
}
class ae {
  constructor({
    getFn: n = g.getFn,
    fieldNormWeight: s = g.fieldNormWeight
  } = {}) {
    this.norm = Je(s, 3), this.getFn = n, this.isCreated = !1, this.setIndexRecords();
  }
  setSources(n = []) {
    this.docs = n;
  }
  setIndexRecords(n = []) {
    this.records = n;
  }
  setKeys(n = []) {
    this.keys = n, this._keysMap = {}, n.forEach((s, t) => {
      this._keysMap[s.id] = t;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = !0, N(this.docs[0]) ? this.docs.forEach((n, s) => {
      this._addString(n, s);
    }) : this.docs.forEach((n, s) => {
      this._addObject(n, s);
    }), this.norm.clear());
  }
  // Adds a doc to the end of the index
  add(n) {
    const s = this.size();
    N(n) ? this._addString(n, s) : this._addObject(n, s);
  }
  // Removes the doc at the specified index of the index
  removeAt(n) {
    this.records.splice(n, 1);
    for (let s = n, t = this.size(); s < t; s += 1)
      this.records[s].i -= 1;
  }
  getValueForItemAtKeyId(n, s) {
    return n[this._keysMap[s]];
  }
  size() {
    return this.records.length;
  }
  _addString(n, s) {
    if (!_(n) || te(n))
      return;
    let t = {
      v: n,
      i: s,
      n: this.norm.get(n)
    };
    this.records.push(t);
  }
  _addObject(n, s) {
    let t = { i: s, $: {} };
    this.keys.forEach((e, o) => {
      let c = e.getFn ? e.getFn(n) : this.getFn(n, e.path);
      if (_(c)) {
        if (P(c)) {
          let i = [];
          const l = [{ nestedArrIndex: -1, value: c }];
          for (; l.length; ) {
            const { nestedArrIndex: u, value: h } = l.pop();
            if (_(h))
              if (N(h) && !te(h)) {
                let f = {
                  v: h,
                  i: u,
                  n: this.norm.get(h)
                };
                i.push(f);
              } else
                P(h) && h.forEach((f, d) => {
                  l.push({
                    nestedArrIndex: d,
                    value: f
                  });
                });
          }
          t.$[o] = i;
        } else if (N(c) && !te(c)) {
          let i = {
            v: c,
            n: this.norm.get(c)
          };
          t.$[o] = i;
        }
      }
    }), this.records.push(t);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
}
function be(r, n, { getFn: s = g.getFn, fieldNormWeight: t = g.fieldNormWeight } = {}) {
  const e = new ae({ getFn: s, fieldNormWeight: t });
  return e.setKeys(r.map(me)), e.setSources(n), e.create(), e;
}
function Ze(r, { getFn: n = g.getFn, fieldNormWeight: s = g.fieldNormWeight } = {}) {
  const { keys: t, records: e } = r, o = new ae({ getFn: n, fieldNormWeight: s });
  return o.setKeys(t), o.setIndexRecords(e), o;
}
function q(r, {
  errors: n = 0,
  currentLocation: s = 0,
  expectedLocation: t = 0,
  distance: e = g.distance,
  ignoreLocation: o = g.ignoreLocation
} = {}) {
  const c = n / r.length;
  if (o)
    return c;
  const i = Math.abs(t - s);
  return e ? c + i / e : i ? 1 : c;
}
function qe(r = [], n = g.minMatchCharLength) {
  let s = [], t = -1, e = -1, o = 0;
  for (let c = r.length; o < c; o += 1) {
    let i = r[o];
    i && t === -1 ? t = o : !i && t !== -1 && (e = o - 1, e - t + 1 >= n && s.push([t, e]), t = -1);
  }
  return r[o - 1] && o - t >= n && s.push([t, o - 1]), s;
}
const B = 32;
function et(r, n, s, {
  location: t = g.location,
  distance: e = g.distance,
  threshold: o = g.threshold,
  findAllMatches: c = g.findAllMatches,
  minMatchCharLength: i = g.minMatchCharLength,
  includeMatches: l = g.includeMatches,
  ignoreLocation: u = g.ignoreLocation
} = {}) {
  if (n.length > B)
    throw new Error(je(B));
  const h = n.length, f = r.length, d = Math.max(0, Math.min(t, f));
  let x = o, m = d;
  const I = i > 1 || l, v = I ? Array(f) : [];
  let R;
  for (; (R = r.indexOf(n, m)) > -1; ) {
    let O = q(n, {
      currentLocation: R,
      expectedLocation: d,
      distance: e,
      ignoreLocation: u
    });
    if (x = Math.min(O, x), m = R + h, I) {
      let y = 0;
      for (; y < h; )
        v[R + y] = 1, y += 1;
    }
  }
  m = -1;
  let b = [], E = 1, w = h + f;
  const C = 1 << h - 1;
  for (let O = 0; O < h; O += 1) {
    let y = 0, p = w;
    for (; y < p; )
      q(n, {
        errors: O,
        currentLocation: d + p,
        expectedLocation: d,
        distance: e,
        ignoreLocation: u
      }) <= x ? y = p : w = p, p = Math.floor((w - y) / 2 + y);
    w = p;
    let M = Math.max(1, d - p + 1), A = c ? f : Math.min(d + p, f) + h, V = Array(A + 2);
    V[A + 1] = (1 << O) - 1;
    for (let S = A; S >= M; S -= 1) {
      let k = S - 1, T = s[r.charAt(k)];
      if (I && (v[k] = +!!T), V[S] = (V[S + 1] << 1 | 1) & T, O && (V[S] |= (b[S + 1] | b[S]) << 1 | 1 | b[S + 1]), V[S] & C && (E = q(n, {
        errors: O,
        currentLocation: k,
        expectedLocation: d,
        distance: e,
        ignoreLocation: u
      }), E <= x)) {
        if (x = E, m = k, m <= d)
          break;
        M = Math.max(1, 2 * d - m);
      }
    }
    if (q(n, {
      errors: O + 1,
      currentLocation: d,
      expectedLocation: d,
      distance: e,
      ignoreLocation: u
    }) > x)
      break;
    b = V;
  }
  const $ = {
    isMatch: m >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(1e-3, E)
  };
  if (I) {
    const O = qe(v, i);
    O.length ? l && ($.indices = O) : $.isMatch = !1;
  }
  return $;
}
function tt(r) {
  let n = {};
  for (let s = 0, t = r.length; s < t; s += 1) {
    const e = r.charAt(s);
    n[e] = (n[e] || 0) | 1 << t - s - 1;
  }
  return n;
}
class Ie {
  constructor(n, {
    location: s = g.location,
    threshold: t = g.threshold,
    distance: e = g.distance,
    includeMatches: o = g.includeMatches,
    findAllMatches: c = g.findAllMatches,
    minMatchCharLength: i = g.minMatchCharLength,
    isCaseSensitive: l = g.isCaseSensitive,
    ignoreLocation: u = g.ignoreLocation
  } = {}) {
    if (this.options = {
      location: s,
      threshold: t,
      distance: e,
      includeMatches: o,
      findAllMatches: c,
      minMatchCharLength: i,
      isCaseSensitive: l,
      ignoreLocation: u
    }, this.pattern = l ? n : n.toLowerCase(), this.chunks = [], !this.pattern.length)
      return;
    const h = (d, x) => {
      this.chunks.push({
        pattern: d,
        alphabet: tt(d),
        startIndex: x
      });
    }, f = this.pattern.length;
    if (f > B) {
      let d = 0;
      const x = f % B, m = f - x;
      for (; d < m; )
        h(this.pattern.substr(d, B), d), d += B;
      if (x) {
        const I = f - B;
        h(this.pattern.substr(I), I);
      }
    } else
      h(this.pattern, 0);
  }
  searchIn(n) {
    const { isCaseSensitive: s, includeMatches: t } = this.options;
    if (s || (n = n.toLowerCase()), this.pattern === n) {
      let m = {
        isMatch: !0,
        score: 0
      };
      return t && (m.indices = [[0, n.length - 1]]), m;
    }
    const {
      location: e,
      distance: o,
      threshold: c,
      findAllMatches: i,
      minMatchCharLength: l,
      ignoreLocation: u
    } = this.options;
    let h = [], f = 0, d = !1;
    this.chunks.forEach(({ pattern: m, alphabet: I, startIndex: v }) => {
      const { isMatch: R, score: b, indices: E } = et(n, m, I, {
        location: e + v,
        distance: o,
        threshold: c,
        findAllMatches: i,
        minMatchCharLength: l,
        includeMatches: t,
        ignoreLocation: u
      });
      R && (d = !0), f += b, R && E && (h = [...h, ...E]);
    });
    let x = {
      isMatch: d,
      score: d ? f / this.chunks.length : 1
    };
    return d && t && (x.indices = h), x;
  }
}
class D {
  constructor(n) {
    this.pattern = n;
  }
  static isMultiMatch(n) {
    return he(n, this.multiRegex);
  }
  static isSingleMatch(n) {
    return he(n, this.singleRegex);
  }
  search() {
  }
}
function he(r, n) {
  const s = r.match(n);
  return s ? s[1] : null;
}
class nt extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(n) {
    const s = n === this.pattern;
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class st extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(n) {
    const t = n.indexOf(this.pattern) === -1;
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, n.length - 1]
    };
  }
}
class rt extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(n) {
    const s = n.startsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class ot extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(n) {
    const s = !n.startsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, n.length - 1]
    };
  }
}
class ct extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(n) {
    const s = n.endsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [n.length - this.pattern.length, n.length - 1]
    };
  }
}
class it extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(n) {
    const s = !n.endsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, n.length - 1]
    };
  }
}
class ye extends D {
  constructor(n, {
    location: s = g.location,
    threshold: t = g.threshold,
    distance: e = g.distance,
    includeMatches: o = g.includeMatches,
    findAllMatches: c = g.findAllMatches,
    minMatchCharLength: i = g.minMatchCharLength,
    isCaseSensitive: l = g.isCaseSensitive,
    ignoreLocation: u = g.ignoreLocation
  } = {}) {
    super(n), this._bitapSearch = new Ie(n, {
      location: s,
      threshold: t,
      distance: e,
      includeMatches: o,
      findAllMatches: c,
      minMatchCharLength: i,
      isCaseSensitive: l,
      ignoreLocation: u
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(n) {
    return this._bitapSearch.searchIn(n);
  }
}
class ve extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(n) {
    let s = 0, t;
    const e = [], o = this.pattern.length;
    for (; (t = n.indexOf(this.pattern, s)) > -1; )
      s = t + o, e.push([t, s - 1]);
    const c = !!e.length;
    return {
      isMatch: c,
      score: c ? 0 : 1,
      indices: e
    };
  }
}
const se = [
  nt,
  ve,
  rt,
  ot,
  it,
  ct,
  st,
  ye
], fe = se.length, at = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, lt = "|";
function ut(r, n = {}) {
  return r.split(lt).map((s) => {
    let t = s.trim().split(at).filter((o) => o && !!o.trim()), e = [];
    for (let o = 0, c = t.length; o < c; o += 1) {
      const i = t[o];
      let l = !1, u = -1;
      for (; !l && ++u < fe; ) {
        const h = se[u];
        let f = h.isMultiMatch(i);
        f && (e.push(new h(f, n)), l = !0);
      }
      if (!l)
        for (u = -1; ++u < fe; ) {
          const h = se[u];
          let f = h.isSingleMatch(i);
          if (f) {
            e.push(new h(f, n));
            break;
          }
        }
    }
    return e;
  });
}
const ht = /* @__PURE__ */ new Set([ye.type, ve.type]);
class ft {
  constructor(n, {
    isCaseSensitive: s = g.isCaseSensitive,
    includeMatches: t = g.includeMatches,
    minMatchCharLength: e = g.minMatchCharLength,
    ignoreLocation: o = g.ignoreLocation,
    findAllMatches: c = g.findAllMatches,
    location: i = g.location,
    threshold: l = g.threshold,
    distance: u = g.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: s,
      includeMatches: t,
      minMatchCharLength: e,
      findAllMatches: c,
      ignoreLocation: o,
      location: i,
      threshold: l,
      distance: u
    }, this.pattern = s ? n : n.toLowerCase(), this.query = ut(this.pattern, this.options);
  }
  static condition(n, s) {
    return s.useExtendedSearch;
  }
  searchIn(n) {
    const s = this.query;
    if (!s)
      return {
        isMatch: !1,
        score: 1
      };
    const { includeMatches: t, isCaseSensitive: e } = this.options;
    n = e ? n : n.toLowerCase();
    let o = 0, c = [], i = 0;
    for (let l = 0, u = s.length; l < u; l += 1) {
      const h = s[l];
      c.length = 0, o = 0;
      for (let f = 0, d = h.length; f < d; f += 1) {
        const x = h[f], { isMatch: m, indices: I, score: v } = x.search(n);
        if (m) {
          if (o += 1, i += v, t) {
            const R = x.constructor.type;
            ht.has(R) ? c = [...c, ...I] : c.push(I);
          }
        } else {
          i = 0, o = 0, c.length = 0;
          break;
        }
      }
      if (o) {
        let f = {
          isMatch: !0,
          score: i / o
        };
        return t && (f.indices = c), f;
      }
    }
    return {
      isMatch: !1,
      score: 1
    };
  }
}
const re = [];
function pt(...r) {
  re.push(...r);
}
function oe(r, n) {
  for (let s = 0, t = re.length; s < t; s += 1) {
    let e = re[s];
    if (e.condition(r, n))
      return new e(r, n);
  }
  return new Ie(r, n);
}
const ee = {
  AND: "$and",
  OR: "$or"
}, ce = {
  PATH: "$path",
  PATTERN: "$val"
}, ie = (r) => !!(r[ee.AND] || r[ee.OR]), dt = (r) => !!r[ce.PATH], gt = (r) => !P(r) && ge(r) && !ie(r), pe = (r) => ({
  [ee.AND]: Object.keys(r).map((n) => ({
    [n]: r[n]
  }))
});
function Re(r, n, { auto: s = !0 } = {}) {
  const t = (e) => {
    let o = Object.keys(e);
    const c = dt(e);
    if (!c && o.length > 1 && !ie(e))
      return t(pe(e));
    if (gt(e)) {
      const l = c ? e[ce.PATH] : o[0], u = c ? e[ce.PATTERN] : e[l];
      if (!N(u))
        throw new Error(Be(l));
      const h = {
        keyId: ne(l),
        pattern: u
      };
      return s && (h.searcher = oe(u, n)), h;
    }
    let i = {
      children: [],
      operator: o[0]
    };
    return o.forEach((l) => {
      const u = e[l];
      P(u) && u.forEach((h) => {
        i.children.push(t(h));
      });
    }), i;
  };
  return ie(r) || (r = pe(r)), t(r);
}
function xt(r, { ignoreFieldNorm: n = g.ignoreFieldNorm }) {
  r.forEach((s) => {
    let t = 1;
    s.matches.forEach(({ key: e, norm: o, score: c }) => {
      const i = e ? e.weight : null;
      t *= Math.pow(
        c === 0 && i ? Number.EPSILON : c,
        (i || 1) * (n ? 1 : o)
      );
    }), s.score = t;
  });
}
function mt(r, n) {
  const s = r.matches;
  n.matches = [], _(s) && s.forEach((t) => {
    if (!_(t.indices) || !t.indices.length)
      return;
    const { indices: e, value: o } = t;
    let c = {
      indices: e,
      value: o
    };
    t.key && (c.key = t.key.src), t.idx > -1 && (c.refIndex = t.idx), n.matches.push(c);
  });
}
function bt(r, n) {
  n.score = r.score;
}
function It(r, n, {
  includeMatches: s = g.includeMatches,
  includeScore: t = g.includeScore
} = {}) {
  const e = [];
  return s && e.push(mt), t && e.push(bt), r.map((o) => {
    const { idx: c } = o, i = {
      item: n[c],
      refIndex: c
    };
    return e.length && e.forEach((l) => {
      l(o, i);
    }), i;
  });
}
class F {
  constructor(n, s = {}, t) {
    this.options = { ...g, ...s }, this.options.useExtendedSearch, this._keyStore = new ze(this.options.keys), this.setCollection(n, t);
  }
  setCollection(n, s) {
    if (this._docs = n, s && !(s instanceof ae))
      throw new Error(De);
    this._myIndex = s || be(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(n) {
    _(n) && (this._docs.push(n), this._myIndex.add(n));
  }
  remove(n = () => !1) {
    const s = [];
    for (let t = 0, e = this._docs.length; t < e; t += 1) {
      const o = this._docs[t];
      n(o, t) && (this.removeAt(t), t -= 1, e -= 1, s.push(o));
    }
    return s;
  }
  removeAt(n) {
    this._docs.splice(n, 1), this._myIndex.removeAt(n);
  }
  getIndex() {
    return this._myIndex;
  }
  search(n, { limit: s = -1 } = {}) {
    const {
      includeMatches: t,
      includeScore: e,
      shouldSort: o,
      sortFn: c,
      ignoreFieldNorm: i
    } = this.options;
    let l = N(n) ? N(this._docs[0]) ? this._searchStringList(n) : this._searchObjectList(n) : this._searchLogical(n);
    return xt(l, { ignoreFieldNorm: i }), o && l.sort(c), de(s) && s > -1 && (l = l.slice(0, s)), It(l, this._docs, {
      includeMatches: t,
      includeScore: e
    });
  }
  _searchStringList(n) {
    const s = oe(n, this.options), { records: t } = this._myIndex, e = [];
    return t.forEach(({ v: o, i: c, n: i }) => {
      if (!_(o))
        return;
      const { isMatch: l, score: u, indices: h } = s.searchIn(o);
      l && e.push({
        item: o,
        idx: c,
        matches: [{ score: u, value: o, norm: i, indices: h }]
      });
    }), e;
  }
  _searchLogical(n) {
    const s = Re(n, this.options), t = (i, l, u) => {
      if (!i.children) {
        const { keyId: f, searcher: d } = i, x = this._findMatches({
          key: this._keyStore.get(f),
          value: this._myIndex.getValueForItemAtKeyId(l, f),
          searcher: d
        });
        return x && x.length ? [
          {
            idx: u,
            item: l,
            matches: x
          }
        ] : [];
      }
      const h = [];
      for (let f = 0, d = i.children.length; f < d; f += 1) {
        const x = i.children[f], m = t(x, l, u);
        if (m.length)
          h.push(...m);
        else if (i.operator === ee.AND)
          return [];
      }
      return h;
    }, e = this._myIndex.records, o = {}, c = [];
    return e.forEach(({ $: i, i: l }) => {
      if (_(i)) {
        let u = t(s, i, l);
        u.length && (o[l] || (o[l] = { idx: l, item: i, matches: [] }, c.push(o[l])), u.forEach(({ matches: h }) => {
          o[l].matches.push(...h);
        }));
      }
    }), c;
  }
  _searchObjectList(n) {
    const s = oe(n, this.options), { keys: t, records: e } = this._myIndex, o = [];
    return e.forEach(({ $: c, i }) => {
      if (!_(c))
        return;
      let l = [];
      t.forEach((u, h) => {
        l.push(
          ...this._findMatches({
            key: u,
            value: c[h],
            searcher: s
          })
        );
      }), l.length && o.push({
        idx: i,
        item: c,
        matches: l
      });
    }), o;
  }
  _findMatches({ key: n, value: s, searcher: t }) {
    if (!_(s))
      return [];
    let e = [];
    if (P(s))
      s.forEach(({ v: o, i: c, n: i }) => {
        if (!_(o))
          return;
        const { isMatch: l, score: u, indices: h } = t.searchIn(o);
        l && e.push({
          score: u,
          key: n,
          value: o,
          idx: c,
          norm: i,
          indices: h
        });
      });
    else {
      const { v: o, n: c } = s, { isMatch: i, score: l, indices: u } = t.searchIn(o);
      i && e.push({ score: l, key: n, value: o, norm: c, indices: u });
    }
    return e;
  }
}
F.version = "6.6.2";
F.createIndex = be;
F.parseIndex = Ze;
F.config = g;
F.parseQuery = Re;
pt(ft);
const yt = ({ children: r, ...n }) => {
  const s = vt(n);
  return /* @__PURE__ */ a.createElement(j.Provider, { value: s }, r);
};
function vt({
  name: r,
  labelledBy: n = "",
  options: s,
  parseOptions: t,
  onSelect: e = () => {
  },
  initialOpen: o = !1,
  open: c,
  onOpenChange: i
} = {}) {
  const [l, u] = a.useState(o), [h, f] = a.useState(null), [d, x] = a.useState(""), m = c ?? l, I = i ?? u, [v, R] = a.useState(() => /* @__PURE__ */ new Map()), b = a.useRef([]), E = a.useRef([]), w = a.useMemo(
    () => new F(Array.from(v.keys()), {
      thershold: 0.1
    }),
    [v]
  ), C = (p) => w.search(p).map((M) => M.item), $ = K({
    open: m,
    onOpenChange: I,
    whileElementsMounted: G,
    middleware: [
      Q({
        apply({ rects: p, elements: M }) {
          M.floating.style.minWidth = `${p.reference.width}px`;
        }
      }),
      X(),
      J()
    ]
  }), O = W([
    z($.context, {
      listRef: E,
      activeIndex: h,
      onNavigate: f,
      virtual: !0,
      loop: !0
    }),
    U($.context, { keyboardOnly: !0 }),
    i ?? H($.context),
    i ?? Y($.context, { keyboardHandlers: !1 })
  ]), y = (p) => {
    let M;
    p.target ? (M = p.target.value, I(!0)) : M = p, x(M), f(0), s(M).then((A) => {
      if (!m)
        return;
      const { labels: V, options: Z } = t(A), S = /* @__PURE__ */ new Map();
      V.forEach((k, T) => S.set(k, Z[T])), R(S), f(0), b.current = Array.from(S.keys());
    }).catch((A) => console.log(A)), M ? b.current = C(M) : b.current = Array.from(v.keys());
  };
  return a.useMemo(
    () => ({
      name: r,
      labelledBy: n,
      isOpen: m,
      setIsOpen: I,
      inputValue: d,
      onSelect: e,
      setInputValue: x,
      onInputValueChange: y,
      activeIndex: h,
      setActiveIndex: f,
      data: v,
      options: b.current,
      listRef: E,
      ...$,
      ...O
    }),
    [
      m,
      I,
      d,
      x,
      O,
      $,
      v,
      R
    ]
  );
}
function Rt({ placeholder: r, className: n, ...s }) {
  const t = L();
  return /* @__PURE__ */ a.createElement(
    "input",
    {
      id: `${t.name}-trigger`,
      ref: t.refs.setReference,
      className: `combobox trigger ${n}`,
      role: "combobox",
      "aria-controls": `${t.name}-listbox`,
      "aria-expanded": t.isOpen,
      "aria-haspopup": "listbox",
      "aria-labelledby": t.labelledBy,
      "aria-autocomplete": "list",
      tabIndex: 0,
      name: t.name,
      type: "text",
      placeholder: r,
      value: t.inputValue,
      onChange: t.onInputValueChange,
      ...t.getReferenceProps({
        onKeyDown: (e) => {
          switch (e.code) {
            case "Enter":
              t.activeIndex != null && t.options[t.activeIndex] ? (t.onInputValueChange(t.options[t.activeIndex]), t.setActiveIndex(null), t.onSelect(t.data.get(t.options[t.activeIndex]))) : t.setActiveIndex(null);
              break;
            case "Escape":
              t.isOpen || (t.onInputValueChange(""), t.setActiveIndex(null), t.refs.domReference.current?.blur());
              break;
            case "Tab":
              if (!t.isOpen)
                return;
              t.activeIndex != null && t.options[t.activeIndex] ? (t.onInputValueChange(t.options[t.activeIndex]), t.setActiveIndex(null), t.setIsOpen(!1), t.refs.domReference.current?.blur(), t.onSelect(t.data.get(t.options[t.activeIndex]))) : (t.setActiveIndex(null), t.setIsOpen(!1), t.refs.domReference.current?.blur());
          }
        },
        ...s
      })
    }
  );
}
function Et({ renderOption: r, className: n, ...s }) {
  const t = L();
  return /* @__PURE__ */ a.createElement(a.Fragment, null, t.isOpen && t.options.length >= 1 && /* @__PURE__ */ a.createElement(
    "ul",
    {
      id: `${t.name}-listbox`,
      ref: t.refs.setFloating,
      className: `combobox listbox ${n}`,
      role: "listbox",
      "aria-labelledby": t.labelledBy,
      style: {
        position: t.strategy,
        top: t.y ?? 0,
        left: t.x ?? 0
      },
      ...t.getFloatingProps(s)
    },
    t.options.map(
      (e, o) => r({
        id: `${t.name}-opt-${o}`,
        key: e,
        label: e,
        option: t.data.get(e),
        i: o,
        ctx: t,
        ref: (c) => t.listRef.current[o] = c,
        selected: e === t.inputValue,
        active: t.activeIndex === o,
        role: "option",
        tabIndex: -1,
        onClick: (c) => {
          c.preventDefault(), t.onInputValueChange(e), t.refs.domReference.current?.focus(), t.onSelect(t.data.get(t.options[t.activeIndex]));
        }
      })
    )
  ));
}
const Mt = a.forwardRef(
  ({ active: r, selected: n, label: s, ctx: t, className: e, children: o, ...c }, i) => /* @__PURE__ */ a.createElement(
    "li",
    {
      className: `combobox option ${e}`,
      "aria-selected": n,
      ...t.getItemProps({
        ref: i,
        ...c
      })
    },
    o || s
  )
), Dt = {
  Provider: yt,
  Trigger: Rt,
  Listbox: Et,
  Option: Mt
}, St = ({ children: r, ...n }) => {
  const s = wt(n);
  return /* @__PURE__ */ a.createElement(j.Provider, { value: s }, r);
};
function wt({
  name: r,
  labelledBy: n = "",
  options: s,
  getLabels: t = (f) => f,
  defaultLabel: e = "",
  onSelect: o = () => {
  },
  initialOpen: c = !1,
  open: i,
  onOpenChange: l,
  asTable: u = !1,
  allowCustomValue: h = !0
} = {}) {
  const [f, d] = a.useState(c), [x, m] = a.useState(null), [I, v] = a.useState(""), R = i ?? f, b = u ? () => !0 : l ?? d, E = a.useRef(null), w = a.useRef(null), C = a.useRef([]), $ = h ? 0 : 1, O = a.useRef([]), [y, p] = a.useState(), M = (S) => O.current.search(S).map((k) => k.item);
  a.useEffect(() => {
    if (w.current = t(s) || [], w.current.length !== s.length)
      throw new Error("Error by getLabels()");
    E.current = /* @__PURE__ */ new Map(), w.current.forEach((S, k) => {
      S === e && (m(k), v(S)), E.current.set(S, s[k]);
    }), O.current = new F(w.current, { threshold: 0.1 }), p(Math.random().toString(32).substring(2, 8));
  }, [s, e]);
  const A = K({
    open: R,
    placement: "bottom-start",
    onOpenChange: b,
    whileElementsMounted: G,
    middleware: [
      X(),
      J(),
      Q({
        apply({ rects: S, elements: k }) {
          k.floating.style.minWidth = `${S.reference.width}px`;
        }
      })
    ]
  }), V = W([
    z(A.context, {
      listRef: C,
      activeIndex: x,
      onNavigate: m,
      virtual: !0,
      loop: !0
    }),
    H(A.context),
    U(A.context, { keyboardOnly: !0 }),
    Y(A.context, { keyboardHandlers: !1 })
  ]), Z = (S) => {
    let k;
    if (S.target ? (k = S.target.value, b(!0)) : k = S, !k)
      v(k), w.current = Array.from(E.current.keys());
    else {
      const T = M(k);
      T.length >= 1 && m(0), T.length >= $ && (w.current = T, v(k));
    }
  };
  return a.useMemo(
    () => ({
      name: r,
      labelledBy: n,
      isOpen: R,
      setIsOpen: b,
      inputValue: I,
      onSelect: o,
      setInputValue: v,
      onInputValueChange: Z,
      asTable: u,
      activeIndex: x,
      setActiveIndex: m,
      optionsRef: E,
      labelsRef: w,
      listRef: C,
      ...A,
      ...V
    }),
    [
      R,
      b,
      I,
      v,
      V,
      A,
      s
    ]
  );
}
function $t({ onInputValueChange: r, placeholder: n, className: s, ...t }) {
  const e = L();
  return /* @__PURE__ */ a.createElement(
    "input",
    {
      id: `${e.name}-trigger`,
      ref: e.refs.setReference,
      className: `combobox trigger ${s || ""}`,
      role: "combobox",
      "aria-controls": `${e.name}-listbox`,
      "aria-expanded": e.isOpen,
      "aria-haspopup": "listbox",
      "aria-labelledby": e.labelledBy,
      "aria-autocomplete": "none",
      tabIndex: 0,
      name: e.name,
      type: "text",
      placeholder: n,
      value: e.inputValue,
      onChange: (o) => {
        e.onInputValueChange(o), r?.(o);
      },
      ...e.getReferenceProps({
        onKeyDown: (o) => {
          switch (o.code) {
            case "Enter":
              if (e.activeIndex != null && e.labelsRef.current[e.activeIndex]) {
                const c = e.labelsRef.current[e.activeIndex];
                e.asTable || (e.onInputValueChange(c), e.setActiveIndex(null)), e.setIsOpen(!1), e.onSelect(
                  e.optionsRef.current.get(c),
                  e.setInputValue
                );
              } else
                e.setActiveIndex(null), e.setIsOpen(!1), e.onSelect(e.inputValue, e.setInputValue);
              break;
            case "Escape":
              e.isOpen || (e.onInputValueChange(""), e.setActiveIndex(null), e.refs.domReference.current?.blur(), e.onSelect("", e.setInputValue));
              break;
          }
        },
        ...t
      })
    }
  );
}
function Ot({ renderOnEmpty: r, renderOption: n, className: s, ...t }) {
  const e = L();
  return /* @__PURE__ */ a.createElement(a.Fragment, null, e.isOpen && /* @__PURE__ */ a.createElement(
    "ul",
    {
      id: `${e.name}-listbox`,
      ref: e.refs.setFloating,
      className: `combobox listbox ${s}`,
      role: "listbox",
      "aria-labelledby": e.labelledBy,
      style: {
        position: e.strategy,
        top: e.y ?? 0,
        left: e.x ?? 0
      },
      ...e.getFloatingProps(t)
    },
    e.optionsRef.current?.size >= 1 ? e.labelsRef.current.map(
      (o, c) => n({
        id: `${e.name}-opt-${c}`,
        key: o,
        label: o,
        option: e.optionsRef.current.get(o),
        i: c,
        ctx: e,
        ref: (i) => e.listRef.current[c] = i,
        selected: o === e.inputValue,
        active: e.activeIndex === c,
        role: "option",
        tabIndex: -1,
        onClick: (i) => {
          i.preventDefault(), !e.asTable && e.onInputValueChange(o), e.setIsOpen(!1), e.onSelect(
            e.optionsRef.current.get(o),
            e.setInputValue
          );
        }
      })
    ) : r(e)
  ));
}
const Ct = a.forwardRef(
  ({ active: r, selected: n, label: s, ctx: t, className: e, children: o, ...c }, i) => /* @__PURE__ */ a.createElement(
    "li",
    {
      className: `combobox option ${e}`,
      "aria-selected": n,
      ...t.getItemProps({
        ref: i,
        ...c
      })
    },
    o || s
  )
), Bt = {
  Provider: St,
  Trigger: $t,
  Listbox: Ot,
  Option: Ct
}, At = ({ children: r, ...n }) => {
  const s = kt(n);
  return /* @__PURE__ */ a.createElement(j.Provider, { value: s }, r);
};
function kt({
  name: r,
  labelledBy: n = "",
  options: s = () => {
  },
  onSelect: t = () => {
  },
  initialOpen: e = !1,
  open: o,
  onOpenChange: c,
  asTable: i = !1
} = {}) {
  const [l, u] = a.useState(e), [h, f] = a.useState(null), [d, x] = a.useState(""), m = o ?? l, I = i ? () => !0 : c ?? u, [v, R] = a.useState(() => /* @__PURE__ */ new Map()), b = a.useRef(null), E = a.useRef([]), w = a.useRef(null);
  w.current == null && (w.current = new F([], { threshold: 0.1 }));
  const C = (p) => w.current.search(p).map((M) => M.item);
  a.useEffect(() => {
    d && s(d || "").then((p) => {
      b.current = Array.from(p.keys()), w.current = new F(b.current, { threshold: 0.1 }), R(p);
    }).catch((p) => console.log(p));
  }, [s]);
  const $ = K({
    open: m,
    placement: "bottom-start",
    onOpenChange: I,
    whileElementsMounted: G,
    middleware: [
      X(),
      J(),
      Q({
        apply({ rects: p, elements: M }) {
          M.floating.style.minWidth = `${p.reference.width}px`;
        }
      })
    ]
  }), O = W([
    z($.context, {
      listRef: E,
      activeIndex: h,
      onNavigate: f,
      virtual: !0,
      loop: !0
    }),
    H($.context),
    U($.context, { keyboardOnly: !0 }),
    Y($.context, { keyboardHandlers: !1 })
  ]), y = (p) => {
    let M;
    p.target ? (M = p.target.value, I(!0)) : M = p, x(M), M ? M.length < d.length ? (b.current = C(M), s(M).then((A) => {
      b.current = Array.from(A.keys()), b.current.length >= 1 && f(0), R(A);
    }).catch((A) => console.log(A))) : (b.current = C(M), b.current.length < 1 ? s(M).then((A) => {
      b.current = Array.from(A.keys()), b.current.length >= 1 && f(0), R(A);
    }).catch((A) => console.log(A)) : f(0)) : b.current = Array.from(v.keys());
  };
  return a.useMemo(
    () => ({
      name: r,
      labelledBy: n,
      isOpen: m,
      setIsOpen: I,
      inputValue: d,
      onSelect: t,
      setInputValue: x,
      asTable: i,
      onInputValueChange: y,
      activeIndex: h,
      setActiveIndex: f,
      options: v,
      labelsRef: b,
      listRef: E,
      ...$,
      ...O
    }),
    [
      m,
      I,
      d,
      x,
      O,
      $,
      v,
      R
    ]
  );
}
function _t({ placeholder: r, className: n, ...s }) {
  const t = L();
  return /* @__PURE__ */ a.createElement(
    "input",
    {
      id: `${t.name}-trigger`,
      ref: t.refs.setReference,
      className: `combobox trigger ${n || ""}`,
      role: "combobox",
      "aria-controls": `${t.name}-listbox`,
      "aria-expanded": t.isOpen,
      "aria-haspopup": "listbox",
      "aria-labelledby": t.labelledBy,
      "aria-autocomplete": "none",
      tabIndex: 0,
      name: t.name,
      type: "text",
      placeholder: r,
      value: t.inputValue,
      onChange: t.onInputValueChange,
      ...t.getReferenceProps({
        onKeyDown: (e) => {
          switch (e.code) {
            case "Enter":
              if (t.activeIndex != null && t.labelsRef.current[t.activeIndex]) {
                const o = t.labelsRef.current[t.activeIndex];
                t.asTable || (t.onInputValueChange(o), t.setActiveIndex(null)), t.setIsOpen(!1), t.onSelect(t.options.get(o));
              } else
                t.setActiveIndex(null), t.setIsOpen(!1), t.onSelect(t.inputValue);
              break;
            case "Escape":
              t.isOpen || (t.onInputValueChange(""), t.setActiveIndex(null), t.refs.domReference.current?.blur(), t.onSelect(""));
              break;
          }
        },
        ...s
      })
    }
  );
}
function Vt({ renderOnEmpty: r, renderOption: n, className: s, ...t }) {
  const e = L();
  return /* @__PURE__ */ a.createElement(a.Fragment, null, e.isOpen && /* @__PURE__ */ a.createElement(
    "ul",
    {
      id: `${e.name}-listbox`,
      ref: e.refs.setFloating,
      className: `combobox listbox ${s}`,
      role: "listbox",
      "aria-labelledby": e.labelledBy,
      style: {
        position: e.strategy,
        top: e.y ?? 0,
        left: e.x ?? 0
      },
      ...e.getFloatingProps(t)
    },
    e.options.size >= 1 ? e.labelsRef.current.map(
      (o, c) => n({
        id: `${e.name}-opt-${c}`,
        key: o,
        label: o,
        option: e.options.get(o),
        i: c,
        ctx: e,
        ref: (i) => e.listRef.current[c] = i,
        selected: o === e.inputValue,
        active: e.activeIndex === c,
        role: "option",
        tabIndex: -1,
        onClick: (i) => {
          i.preventDefault(), !e.asTable && e.onInputValueChange(o), e.setIsOpen(!1), e.onSelect(e.options.get(o));
        }
      })
    ) : r(e)
  ));
}
const Nt = a.forwardRef(
  ({ active: r, selected: n, label: s, ctx: t, className: e, children: o, ...c }, i) => /* @__PURE__ */ a.createElement(
    "li",
    {
      className: `combobox option ${e}`,
      "aria-selected": n,
      ...t.getItemProps({
        ref: i,
        ...c
      })
    },
    o || s
  )
), jt = {
  Provider: At,
  Trigger: _t,
  Listbox: Vt,
  Option: Nt
};
export {
  Dt as AsyncCombobox,
  jt as AsyncSearchableCombobox,
  Tt as EditableCombobox,
  Bt as SearchableCombobox,
  Ft as SelectOnlyCombobox
};
