import * as f from "react";
import { useLayoutEffect as Dt, useEffect as kt, useRef as sn } from "react";
import * as cn from "react-dom";
import { createPortal as un } from "react-dom";
const me = Math.min, q = Math.max, De = Math.round, Ae = Math.floor, ce = (e) => ({
  x: e,
  y: e
}), ln = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, an = {
  start: "end",
  end: "start"
};
function gt(e, t, n) {
  return q(e, me(t, n));
}
function Re(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ue(e) {
  return e.split("-")[0];
}
function Ee(e) {
  return e.split("-")[1];
}
function Ft(e) {
  return e === "x" ? "y" : "x";
}
function Nt(e) {
  return e === "y" ? "height" : "width";
}
function Ce(e) {
  return ["top", "bottom"].includes(ue(e)) ? "y" : "x";
}
function Bt(e) {
  return Ft(Ce(e));
}
function fn(e, t, n) {
  n === void 0 && (n = !1);
  const r = Ee(e), o = Bt(e), i = Nt(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = ke(s)), [s, ke(s)];
}
function dn(e) {
  const t = ke(e);
  return [et(e), t, et(t)];
}
function et(e) {
  return e.replace(/start|end/g, (t) => an[t]);
}
function mn(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], i = ["top", "bottom"], s = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? i : s;
    default:
      return [];
  }
}
function gn(e, t, n, r) {
  const o = Ee(e);
  let i = mn(ue(e), n === "start", r);
  return o && (i = i.map((s) => s + "-" + o), t && (i = i.concat(i.map(et)))), i;
}
function ke(e) {
  return e.replace(/left|right|bottom|top/g, (t) => ln[t]);
}
function pn(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function hn(e) {
  return typeof e != "number" ? pn(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Fe(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function pt(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const i = Ce(t), s = Bt(t), c = Nt(s), u = ue(t), a = i === "y", h = r.x + r.width / 2 - o.width / 2, m = r.y + r.height / 2 - o.height / 2, v = r[c] / 2 - o[c] / 2;
  let l;
  switch (u) {
    case "top":
      l = {
        x: h,
        y: r.y - o.height
      };
      break;
    case "bottom":
      l = {
        x: h,
        y: r.y + r.height
      };
      break;
    case "right":
      l = {
        x: r.x + r.width,
        y: m
      };
      break;
    case "left":
      l = {
        x: r.x - o.width,
        y: m
      };
      break;
    default:
      l = {
        x: r.x,
        y: r.y
      };
  }
  switch (Ee(t)) {
    case "start":
      l[s] -= v * (n && a ? -1 : 1);
      break;
    case "end":
      l[s] += v * (n && a ? -1 : 1);
      break;
  }
  return l;
}
const vn = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: i = [],
    platform: s
  } = n, c = i.filter(Boolean), u = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let a = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: h,
    y: m
  } = pt(a, r, u), v = r, l = {}, p = 0;
  for (let d = 0; d < c.length; d++) {
    const {
      name: w,
      fn: x
    } = c[d], {
      x: y,
      y: I,
      data: M,
      reset: E
    } = await x({
      x: h,
      y: m,
      initialPlacement: r,
      placement: v,
      strategy: o,
      middlewareData: l,
      rects: a,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (h = y ?? h, m = I ?? m, l = {
      ...l,
      [w]: {
        ...l[w],
        ...M
      }
    }, E && p <= 50) {
      p++, typeof E == "object" && (E.placement && (v = E.placement), E.rects && (a = E.rects === !0 ? await s.getElementRects({
        reference: e,
        floating: t,
        strategy: o
      }) : E.rects), {
        x: h,
        y: m
      } = pt(a, v, u)), d = -1;
      continue;
    }
  }
  return {
    x: h,
    y: m,
    placement: v,
    strategy: o,
    middlewareData: l
  };
};
async function rt(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: i,
    rects: s,
    elements: c,
    strategy: u
  } = e, {
    boundary: a = "clippingAncestors",
    rootBoundary: h = "viewport",
    elementContext: m = "floating",
    altBoundary: v = !1,
    padding: l = 0
  } = Re(t, e), p = hn(l), w = c[v ? m === "floating" ? "reference" : "floating" : m], x = Fe(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(w))) == null || n ? w : w.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(c.floating)),
    boundary: a,
    rootBoundary: h,
    strategy: u
  })), y = m === "floating" ? {
    ...s.floating,
    x: r,
    y: o
  } : s.reference, I = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c.floating)), M = await (i.isElement == null ? void 0 : i.isElement(I)) ? await (i.getScale == null ? void 0 : i.getScale(I)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = Fe(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: y,
    offsetParent: I,
    strategy: u
  }) : y);
  return {
    top: (x.top - E.top + p.top) / M.y,
    bottom: (E.bottom - x.bottom + p.bottom) / M.y,
    left: (x.left - E.left + p.left) / M.x,
    right: (E.right - x.right + p.right) / M.x
  };
}
const Mr = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: i,
        rects: s,
        initialPlacement: c,
        platform: u,
        elements: a
      } = t, {
        mainAxis: h = !0,
        crossAxis: m = !0,
        fallbackPlacements: v,
        fallbackStrategy: l = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: d = !0,
        ...w
      } = Re(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const x = ue(o), y = ue(c) === c, I = await (u.isRTL == null ? void 0 : u.isRTL(a.floating)), M = v || (y || !d ? [ke(c)] : dn(c));
      !v && p !== "none" && M.push(...gn(c, d, p, I));
      const E = [c, ...M], b = await rt(t, w), B = [];
      let V = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (h && B.push(b[x]), m) {
        const g = fn(o, s, I);
        B.push(b[g[0]], b[g[1]]);
      }
      if (V = [...V, {
        placement: o,
        overflows: B
      }], !B.every((g) => g <= 0)) {
        var S, R;
        const g = (((S = i.flip) == null ? void 0 : S.index) || 0) + 1, C = E[g];
        if (C)
          return {
            data: {
              index: g,
              overflows: V
            },
            reset: {
              placement: C
            }
          };
        let T = (R = V.filter((O) => O.overflows[0] <= 0).sort((O, F) => O.overflows[1] - F.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!T)
          switch (l) {
            case "bestFit": {
              var L;
              const O = (L = V.map((F) => [F.placement, F.overflows.filter((N) => N > 0).reduce((N, P) => N + P, 0)]).sort((F, N) => F[1] - N[1])[0]) == null ? void 0 : L[0];
              O && (T = O);
              break;
            }
            case "initialPlacement":
              T = c;
              break;
          }
        if (o !== T)
          return {
            reset: {
              placement: T
            }
          };
      }
      return {};
    }
  };
};
async function yn(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = ue(n), c = Ee(n), u = Ce(n) === "y", a = ["left", "top"].includes(s) ? -1 : 1, h = i && u ? -1 : 1, m = Re(t, e);
  let {
    mainAxis: v,
    crossAxis: l,
    alignmentAxis: p
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...m
  };
  return c && typeof p == "number" && (l = c === "end" ? p * -1 : p), u ? {
    x: l * h,
    y: v * a
  } : {
    x: v * a,
    y: l * h
  };
}
const Lr = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: i,
        placement: s,
        middlewareData: c
      } = t, u = await yn(t, e);
      return s === ((n = c.offset) == null ? void 0 : n.placement) && (r = c.arrow) != null && r.alignmentOffset ? {} : {
        x: o + u.x,
        y: i + u.y,
        data: {
          ...u,
          placement: s
        }
      };
    }
  };
}, Pr = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: i = !0,
        crossAxis: s = !1,
        limiter: c = {
          fn: (w) => {
            let {
              x,
              y
            } = w;
            return {
              x,
              y
            };
          }
        },
        ...u
      } = Re(e, t), a = {
        x: n,
        y: r
      }, h = await rt(t, u), m = Ce(ue(o)), v = Ft(m);
      let l = a[v], p = a[m];
      if (i) {
        const w = v === "y" ? "top" : "left", x = v === "y" ? "bottom" : "right", y = l + h[w], I = l - h[x];
        l = gt(y, l, I);
      }
      if (s) {
        const w = m === "y" ? "top" : "left", x = m === "y" ? "bottom" : "right", y = p + h[w], I = p - h[x];
        p = gt(y, p, I);
      }
      const d = c.fn({
        ...t,
        [v]: l,
        [m]: p
      });
      return {
        ...d,
        data: {
          x: d.x - n,
          y: d.y - r
        }
      };
    }
  };
}, Dr = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: r,
        platform: o,
        elements: i
      } = t, {
        apply: s = () => {
        },
        ...c
      } = Re(e, t), u = await rt(t, c), a = ue(n), h = Ee(n), m = Ce(n) === "y", {
        width: v,
        height: l
      } = r.floating;
      let p, d;
      a === "top" || a === "bottom" ? (p = a, d = h === (await (o.isRTL == null ? void 0 : o.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (d = a, p = h === "end" ? "top" : "bottom");
      const w = l - u[p], x = v - u[d], y = !t.middlewareData.shift;
      let I = w, M = x;
      if (m) {
        const b = v - u.left - u.right;
        M = h || y ? me(x, b) : b;
      } else {
        const b = l - u.top - u.bottom;
        I = h || y ? me(w, b) : b;
      }
      if (y && !h) {
        const b = q(u.left, 0), B = q(u.right, 0), V = q(u.top, 0), S = q(u.bottom, 0);
        m ? M = v - 2 * (b !== 0 || B !== 0 ? b + B : q(u.left, u.right)) : I = l - 2 * (V !== 0 || S !== 0 ? V + S : q(u.top, u.bottom));
      }
      await s({
        ...t,
        availableWidth: M,
        availableHeight: I
      });
      const E = await o.getDimensions(i.floating);
      return v !== E.width || l !== E.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function le(e) {
  return Vt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function U(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function re(e) {
  var t;
  return (t = (Vt(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Vt(e) {
  return e instanceof Node || e instanceof U(e).Node;
}
function ne(e) {
  return e instanceof Element || e instanceof U(e).Element;
}
function Q(e) {
  return e instanceof HTMLElement || e instanceof U(e).HTMLElement;
}
function ht(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof U(e).ShadowRoot;
}
function Te(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = G(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function bn(e) {
  return ["table", "td", "th"].includes(le(e));
}
function ot(e) {
  const t = it(), n = G(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function wn(e) {
  let t = ge(e);
  for (; Q(t) && !He(t); ) {
    if (ot(t))
      return t;
    t = ge(t);
  }
  return null;
}
function it() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function He(e) {
  return ["html", "body", "#document"].includes(le(e));
}
function G(e) {
  return U(e).getComputedStyle(e);
}
function ze(e) {
  return ne(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function ge(e) {
  if (le(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ht(e) && e.host || // Fallback.
    re(e)
  );
  return ht(t) ? t.host : t;
}
function Wt(e) {
  const t = ge(e);
  return He(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Q(t) && Te(t) ? t : Wt(t);
}
function ie(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Wt(e), i = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = U(o);
  return i ? t.concat(s, s.visualViewport || [], Te(o) ? o : [], s.frameElement && n ? ie(s.frameElement) : []) : t.concat(o, ie(o, [], n));
}
function Kt(e) {
  const t = G(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Q(e), i = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, c = De(n) !== i || De(r) !== s;
  return c && (n = i, r = s), {
    width: n,
    height: r,
    $: c
  };
}
function st(e) {
  return ne(e) ? e : e.contextElement;
}
function de(e) {
  const t = st(e);
  if (!Q(t))
    return ce(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: i
  } = Kt(t);
  let s = (i ? De(n.width) : n.width) / r, c = (i ? De(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: s,
    y: c
  };
}
const xn = /* @__PURE__ */ ce(0);
function Ht(e) {
  const t = U(e);
  return !it() || !t.visualViewport ? xn : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Rn(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== U(e) ? !1 : t;
}
function fe(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), i = st(e);
  let s = ce(1);
  t && (r ? ne(r) && (s = de(r)) : s = de(e));
  const c = Rn(i, n, r) ? Ht(i) : ce(0);
  let u = (o.left + c.x) / s.x, a = (o.top + c.y) / s.y, h = o.width / s.x, m = o.height / s.y;
  if (i) {
    const v = U(i), l = r && ne(r) ? U(r) : r;
    let p = v.frameElement;
    for (; p && r && l !== v; ) {
      const d = de(p), w = p.getBoundingClientRect(), x = G(p), y = w.left + (p.clientLeft + parseFloat(x.paddingLeft)) * d.x, I = w.top + (p.clientTop + parseFloat(x.paddingTop)) * d.y;
      u *= d.x, a *= d.y, h *= d.x, m *= d.y, u += y, a += I, p = U(p).frameElement;
    }
  }
  return Fe({
    width: h,
    height: m,
    x: u,
    y: a
  });
}
function En(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: r
  } = e;
  const o = Q(n), i = re(n);
  if (n === i)
    return t;
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = ce(1);
  const u = ce(0);
  if ((o || !o && r !== "fixed") && ((le(n) !== "body" || Te(i)) && (s = ze(n)), Q(n))) {
    const a = fe(n);
    c = de(n), u.x = a.x + n.clientLeft, u.y = a.y + n.clientTop;
  }
  return {
    width: t.width * c.x,
    height: t.height * c.y,
    x: t.x * c.x - s.scrollLeft * c.x + u.x,
    y: t.y * c.y - s.scrollTop * c.y + u.y
  };
}
function Cn(e) {
  return Array.from(e.getClientRects());
}
function zt(e) {
  return fe(re(e)).left + ze(e).scrollLeft;
}
function Tn(e) {
  const t = re(e), n = ze(e), r = e.ownerDocument.body, o = q(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), i = q(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + zt(e);
  const c = -n.scrollTop;
  return G(r).direction === "rtl" && (s += q(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: i,
    x: s,
    y: c
  };
}
function In(e, t) {
  const n = U(e), r = re(e), o = n.visualViewport;
  let i = r.clientWidth, s = r.clientHeight, c = 0, u = 0;
  if (o) {
    i = o.width, s = o.height;
    const a = it();
    (!a || a && t === "fixed") && (c = o.offsetLeft, u = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: c,
    y: u
  };
}
function Sn(e, t) {
  const n = fe(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, i = Q(e) ? de(e) : ce(1), s = e.clientWidth * i.x, c = e.clientHeight * i.y, u = o * i.x, a = r * i.y;
  return {
    width: s,
    height: c,
    x: u,
    y: a
  };
}
function vt(e, t, n) {
  let r;
  if (t === "viewport")
    r = In(e, n);
  else if (t === "document")
    r = Tn(re(e));
  else if (ne(t))
    r = Sn(t, n);
  else {
    const o = Ht(e);
    r = {
      ...t,
      x: t.x - o.x,
      y: t.y - o.y
    };
  }
  return Fe(r);
}
function $t(e, t) {
  const n = ge(e);
  return n === t || !ne(n) || He(n) ? !1 : G(n).position === "fixed" || $t(n, t);
}
function On(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = ie(e, [], !1).filter((c) => ne(c) && le(c) !== "body"), o = null;
  const i = G(e).position === "fixed";
  let s = i ? ge(e) : e;
  for (; ne(s) && !He(s); ) {
    const c = G(s), u = ot(s);
    !u && c.position === "fixed" && (o = null), (i ? !u && !o : !u && c.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Te(s) && !u && $t(e, s)) ? r = r.filter((h) => h !== s) : o = c, s = ge(s);
  }
  return t.set(e, r), r;
}
function An(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? On(t, this._c) : [].concat(n), r], c = s[0], u = s.reduce((a, h) => {
    const m = vt(t, h, o);
    return a.top = q(m.top, a.top), a.right = me(m.right, a.right), a.bottom = me(m.bottom, a.bottom), a.left = q(m.left, a.left), a;
  }, vt(t, c, o));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function Mn(e) {
  return Kt(e);
}
function Ln(e, t, n) {
  const r = Q(t), o = re(t), i = n === "fixed", s = fe(e, !0, i, t);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = ce(0);
  if (r || !r && !i)
    if ((le(t) !== "body" || Te(o)) && (c = ze(t)), r) {
      const a = fe(t, !0, i, t);
      u.x = a.x + t.clientLeft, u.y = a.y + t.clientTop;
    } else
      o && (u.x = zt(o));
  return {
    x: s.left + c.scrollLeft - u.x,
    y: s.top + c.scrollTop - u.y,
    width: s.width,
    height: s.height
  };
}
function yt(e, t) {
  return !Q(e) || G(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function _t(e, t) {
  const n = U(e);
  if (!Q(e))
    return n;
  let r = yt(e, t);
  for (; r && bn(r) && G(r).position === "static"; )
    r = yt(r, t);
  return r && (le(r) === "html" || le(r) === "body" && G(r).position === "static" && !ot(r)) ? n : r || wn(e) || n;
}
const Pn = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: r
  } = e;
  const o = this.getOffsetParent || _t, i = this.getDimensions;
  return {
    reference: Ln(t, await o(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await i(n)
    }
  };
};
function Dn(e) {
  return G(e).direction === "rtl";
}
const kn = {
  convertOffsetParentRelativeRectToViewportRelativeRect: En,
  getDocumentElement: re,
  getClippingRect: An,
  getOffsetParent: _t,
  getElementRects: Pn,
  getClientRects: Cn,
  getDimensions: Mn,
  getScale: de,
  isElement: ne,
  isRTL: Dn
};
function Fn(e, t) {
  let n = null, r;
  const o = re(e);
  function i() {
    clearTimeout(r), n && n.disconnect(), n = null;
  }
  function s(c, u) {
    c === void 0 && (c = !1), u === void 0 && (u = 1), i();
    const {
      left: a,
      top: h,
      width: m,
      height: v
    } = e.getBoundingClientRect();
    if (c || t(), !m || !v)
      return;
    const l = Ae(h), p = Ae(o.clientWidth - (a + m)), d = Ae(o.clientHeight - (h + v)), w = Ae(a), y = {
      rootMargin: -l + "px " + -p + "px " + -d + "px " + -w + "px",
      threshold: q(0, me(1, u)) || 1
    };
    let I = !0;
    function M(E) {
      const b = E[0].intersectionRatio;
      if (b !== u) {
        if (!I)
          return s();
        b ? s(!1, b) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 100);
      }
      I = !1;
    }
    try {
      n = new IntersectionObserver(M, {
        ...y,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(M, y);
    }
    n.observe(e);
  }
  return s(!0), i;
}
function kr(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = r, a = st(e), h = o || i ? [...a ? ie(a) : [], ...ie(t)] : [];
  h.forEach((x) => {
    o && x.addEventListener("scroll", n, {
      passive: !0
    }), i && x.addEventListener("resize", n);
  });
  const m = a && c ? Fn(a, n) : null;
  let v = -1, l = null;
  s && (l = new ResizeObserver((x) => {
    let [y] = x;
    y && y.target === a && l && (l.unobserve(t), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      l && l.observe(t);
    })), n();
  }), a && !u && l.observe(a), l.observe(t));
  let p, d = u ? fe(e) : null;
  u && w();
  function w() {
    const x = fe(e);
    d && (x.x !== d.x || x.y !== d.y || x.width !== d.width || x.height !== d.height) && n(), d = x, p = requestAnimationFrame(w);
  }
  return n(), () => {
    h.forEach((x) => {
      o && x.removeEventListener("scroll", n), i && x.removeEventListener("resize", n);
    }), m && m(), l && l.disconnect(), l = null, u && cancelAnimationFrame(p);
  };
}
const Nn = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: kn,
    ...n
  }, i = {
    ...o.platform,
    _c: r
  };
  return vn(e, t, {
    ...o,
    platform: i
  });
};
var Le = typeof document < "u" ? Dt : kt;
function Ne(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!Ne(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const i = o[r];
      if (!(i === "_owner" && e.$$typeof) && !Ne(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function bt(e) {
  const t = f.useRef(e);
  return Le(() => {
    t.current = e;
  }), t;
}
function Bn(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    whileElementsMounted: i,
    open: s
  } = e, [c, u] = f.useState({
    x: null,
    y: null,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [a, h] = f.useState(r);
  Ne(a, r) || h(r);
  const m = f.useRef(null), v = f.useRef(null), l = f.useRef(c), p = bt(i), d = bt(o), [w, x] = f.useState(null), [y, I] = f.useState(null), M = f.useCallback((R) => {
    m.current !== R && (m.current = R, x(R));
  }, []), E = f.useCallback((R) => {
    v.current !== R && (v.current = R, I(R));
  }, []), b = f.useCallback(() => {
    if (!m.current || !v.current)
      return;
    const R = {
      placement: t,
      strategy: n,
      middleware: a
    };
    d.current && (R.platform = d.current), Nn(m.current, v.current, R).then((L) => {
      const g = {
        ...L,
        isPositioned: !0
      };
      B.current && !Ne(l.current, g) && (l.current = g, cn.flushSync(() => {
        u(g);
      }));
    });
  }, [a, t, n, d]);
  Le(() => {
    s === !1 && l.current.isPositioned && (l.current.isPositioned = !1, u((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [s]);
  const B = f.useRef(!1);
  Le(() => (B.current = !0, () => {
    B.current = !1;
  }), []), Le(() => {
    if (w && y) {
      if (p.current)
        return p.current(w, y, b);
      b();
    }
  }, [w, y, b, p]);
  const V = f.useMemo(() => ({
    reference: m,
    floating: v,
    setReference: M,
    setFloating: E
  }), [M, E]), S = f.useMemo(() => ({
    reference: w,
    floating: y
  }), [w, y]);
  return f.useMemo(() => ({
    ...c,
    update: b,
    refs: V,
    elements: S,
    reference: M,
    floating: E
  }), [c, b, V, S, M, E]);
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var Vn = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], tt = /* @__PURE__ */ Vn.join(","), jt = typeof Element > "u", we = jt ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Be = !jt && Element.prototype.getRootNode ? function(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
} : function(e) {
  return e?.ownerDocument;
}, Ve = function e(t, n) {
  var r;
  n === void 0 && (n = !0);
  var o = t == null || (r = t.getAttribute) === null || r === void 0 ? void 0 : r.call(t, "inert"), i = o === "" || o === "true", s = i || n && t && e(t.parentNode);
  return s;
}, Wn = function(t) {
  var n, r = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "contenteditable");
  return r === "" || r === "true";
}, Kn = function(t, n, r) {
  if (Ve(t))
    return [];
  var o = Array.prototype.slice.apply(t.querySelectorAll(tt));
  return n && we.call(t, tt) && o.unshift(t), o = o.filter(r), o;
}, Hn = function e(t, n, r) {
  for (var o = [], i = Array.from(t); i.length; ) {
    var s = i.shift();
    if (!Ve(s, !1))
      if (s.tagName === "SLOT") {
        var c = s.assignedElements(), u = c.length ? c : s.children, a = e(u, !0, r);
        r.flatten ? o.push.apply(o, a) : o.push({
          scopeParent: s,
          candidates: a
        });
      } else {
        var h = we.call(s, tt);
        h && r.filter(s) && (n || !t.includes(s)) && o.push(s);
        var m = s.shadowRoot || // check for an undisclosed shadow
        typeof r.getShadowRoot == "function" && r.getShadowRoot(s), v = !Ve(m, !1) && (!r.shadowRootFilter || r.shadowRootFilter(s));
        if (m && v) {
          var l = e(m === !0 ? s.children : m.children, !0, r);
          r.flatten ? o.push.apply(o, l) : o.push({
            scopeParent: s,
            candidates: l
          });
        } else
          i.unshift.apply(i, s.children);
      }
  }
  return o;
}, qt = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, Ut = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || Wn(t)) && !qt(t) ? 0 : t.tabIndex;
}, zn = function(t, n) {
  var r = Ut(t);
  return r < 0 && n && !qt(t) ? 0 : r;
}, $n = function(t, n) {
  return t.tabIndex === n.tabIndex ? t.documentOrder - n.documentOrder : t.tabIndex - n.tabIndex;
}, Yt = function(t) {
  return t.tagName === "INPUT";
}, _n = function(t) {
  return Yt(t) && t.type === "hidden";
}, jn = function(t) {
  var n = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(r) {
    return r.tagName === "SUMMARY";
  });
  return n;
}, qn = function(t, n) {
  for (var r = 0; r < t.length; r++)
    if (t[r].checked && t[r].form === n)
      return t[r];
}, Un = function(t) {
  if (!t.name)
    return !0;
  var n = t.form || Be(t), r = function(c) {
    return n.querySelectorAll('input[type="radio"][name="' + c + '"]');
  }, o;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    o = r(window.CSS.escape(t.name));
  else
    try {
      o = r(t.name);
    } catch (s) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", s.message), !1;
    }
  var i = qn(o, t.form);
  return !i || i === t;
}, Yn = function(t) {
  return Yt(t) && t.type === "radio";
}, Xn = function(t) {
  return Yn(t) && !Un(t);
}, Gn = function(t) {
  var n, r = t && Be(t), o = (n = r) === null || n === void 0 ? void 0 : n.host, i = !1;
  if (r && r !== t) {
    var s, c, u;
    for (i = !!((s = o) !== null && s !== void 0 && (c = s.ownerDocument) !== null && c !== void 0 && c.contains(o) || t != null && (u = t.ownerDocument) !== null && u !== void 0 && u.contains(t)); !i && o; ) {
      var a, h, m;
      r = Be(o), o = (a = r) === null || a === void 0 ? void 0 : a.host, i = !!((h = o) !== null && h !== void 0 && (m = h.ownerDocument) !== null && m !== void 0 && m.contains(o));
    }
  }
  return i;
}, wt = function(t) {
  var n = t.getBoundingClientRect(), r = n.width, o = n.height;
  return r === 0 && o === 0;
}, Zn = function(t, n) {
  var r = n.displayCheck, o = n.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var i = we.call(t, "details>summary:first-of-type"), s = i ? t.parentElement : t;
  if (we.call(s, "details:not([open]) *"))
    return !0;
  if (!r || r === "full" || r === "legacy-full") {
    if (typeof o == "function") {
      for (var c = t; t; ) {
        var u = t.parentElement, a = Be(t);
        if (u && !u.shadowRoot && o(u) === !0)
          return wt(t);
        t.assignedSlot ? t = t.assignedSlot : !u && a !== t.ownerDocument ? t = a.host : t = u;
      }
      t = c;
    }
    if (Gn(t))
      return !t.getClientRects().length;
    if (r !== "legacy-full")
      return !0;
  } else if (r === "non-zero-area")
    return wt(t);
  return !1;
}, Jn = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var n = t.parentElement; n; ) {
      if (n.tagName === "FIELDSET" && n.disabled) {
        for (var r = 0; r < n.children.length; r++) {
          var o = n.children.item(r);
          if (o.tagName === "LEGEND")
            return we.call(n, "fieldset[disabled] *") ? !0 : !o.contains(t);
        }
        return !0;
      }
      n = n.parentElement;
    }
  return !1;
}, Qn = function(t, n) {
  return !(n.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  Ve(n) || _n(n) || Zn(n, t) || // For a details element with a summary, the summary element gets the focus
  jn(n) || Jn(n));
}, xt = function(t, n) {
  return !(Xn(n) || Ut(n) < 0 || !Qn(t, n));
}, er = function(t) {
  var n = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(n) || n >= 0);
}, tr = function e(t) {
  var n = [], r = [];
  return t.forEach(function(o, i) {
    var s = !!o.scopeParent, c = s ? o.scopeParent : o, u = zn(c, s), a = s ? e(o.candidates) : c;
    u === 0 ? s ? n.push.apply(n, a) : n.push(c) : r.push({
      documentOrder: i,
      tabIndex: u,
      item: o,
      isScope: s,
      content: a
    });
  }), r.sort($n).reduce(function(o, i) {
    return i.isScope ? o.push.apply(o, i.content) : o.push(i.content), o;
  }, []).concat(n);
}, Xt = function(t, n) {
  n = n || {};
  var r;
  return n.getShadowRoot ? r = Hn([t], n.includeContainer, {
    filter: xt.bind(null, n),
    flatten: !1,
    getShadowRoot: n.getShadowRoot,
    shadowRootFilter: er
  }) : r = Kn(t, n.includeContainer, xt.bind(null, n)), tr(r);
};
function nt() {
  return nt = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, nt.apply(this, arguments);
}
var $ = typeof document < "u" ? Dt : kt;
let Ue = !1, nr = 0;
const Rt = () => "floating-ui-" + nr++;
function rr() {
  const [e, t] = f.useState(() => Ue ? Rt() : void 0);
  return $(() => {
    e == null && t(Rt());
  }, []), f.useEffect(() => {
    Ue || (Ue = !0);
  }, []), e;
}
const or = f[/* @__PURE__ */ "useId".toString()], ct = or || rr;
function ir() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(t, n) {
      var r;
      (r = e.get(t)) == null || r.forEach((o) => o(n));
    },
    on(t, n) {
      e.set(t, [...e.get(t) || [], n]);
    },
    off(t, n) {
      var r;
      e.set(t, ((r = e.get(t)) == null ? void 0 : r.filter((o) => o !== n)) || []);
    }
  };
}
const sr = /* @__PURE__ */ f.createContext(null), cr = /* @__PURE__ */ f.createContext(null), ut = () => {
  var e;
  return ((e = f.useContext(sr)) == null ? void 0 : e.id) || null;
}, $e = () => f.useContext(cr);
function Z(e) {
  return e?.ownerDocument || document;
}
function Gt() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function ur() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((t) => {
    let {
      brand: n,
      version: r
    } = t;
    return n + "/" + r;
  }).join(" ") : navigator.userAgent;
}
function _e(e) {
  return Z(e).defaultView || window;
}
function J(e) {
  return e ? e instanceof _e(e).Element : !1;
}
function Ie(e) {
  return e ? e instanceof _e(e).HTMLElement : !1;
}
function lr(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = _e(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Zt(e) {
  if (e.mozInputSource === 0 && e.isTrusted)
    return !0;
  const t = /Android/i;
  return (t.test(Gt()) || t.test(ur())) && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Jt(e) {
  return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType !== "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0;
}
function Qt() {
  return /apple/i.test(navigator.vendor);
}
function ar() {
  return Gt().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function We(e, t) {
  const n = ["mouse", "pen"];
  return t || n.push("", void 0), n.includes(e);
}
function xe(e, t) {
  if (!e || !t)
    return !1;
  const n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && lr(n)) {
    let r = t;
    for (; r; ) {
      if (e === r)
        return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function ae(e) {
  const t = sn(e);
  return $(() => {
    t.current = e;
  }), t;
}
const Et = "data-floating-ui-safe-polygon";
function Ye(e, t, n) {
  return n && !We(n) ? 0 : typeof e == "number" ? e : e?.[t];
}
const Fr = function(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: o,
    events: i,
    elements: {
      domReference: s,
      floating: c
    },
    refs: u
  } = e, {
    enabled: a = !0,
    delay: h = 0,
    handleClose: m = null,
    mouseOnly: v = !1,
    restMs: l = 0,
    move: p = !0
  } = t, d = $e(), w = ut(), x = ae(m), y = ae(h), I = f.useRef(), M = f.useRef(), E = f.useRef(), b = f.useRef(), B = f.useRef(!0), V = f.useRef(!1), S = f.useRef(() => {
  }), R = f.useCallback(() => {
    var T;
    const O = (T = o.current.openEvent) == null ? void 0 : T.type;
    return O?.includes("mouse") && O !== "mousedown";
  }, [o]);
  f.useEffect(() => {
    if (!a)
      return;
    function T() {
      clearTimeout(M.current), clearTimeout(b.current), B.current = !0;
    }
    return i.on("dismiss", T), () => {
      i.off("dismiss", T);
    };
  }, [a, i]), f.useEffect(() => {
    if (!a || !x.current || !n)
      return;
    function T() {
      R() && r(!1);
    }
    const O = Z(c).documentElement;
    return O.addEventListener("mouseleave", T), () => {
      O.removeEventListener("mouseleave", T);
    };
  }, [c, n, r, a, x, o, R]);
  const L = f.useCallback(function(T) {
    T === void 0 && (T = !0);
    const O = Ye(y.current, "close", I.current);
    O && !E.current ? (clearTimeout(M.current), M.current = setTimeout(() => r(!1), O)) : T && (clearTimeout(M.current), r(!1));
  }, [y, r]), g = f.useCallback(() => {
    S.current(), E.current = void 0;
  }, []), C = f.useCallback(() => {
    if (V.current) {
      const T = Z(u.floating.current).body;
      T.style.pointerEvents = "", T.removeAttribute(Et), V.current = !1;
    }
  }, [u]);
  return f.useEffect(() => {
    if (!a)
      return;
    function T() {
      return o.current.openEvent ? ["click", "mousedown"].includes(o.current.openEvent.type) : !1;
    }
    function O(P) {
      if (clearTimeout(M.current), B.current = !1, v && !We(I.current) || l > 0 && Ye(y.current, "open") === 0)
        return;
      o.current.openEvent = P;
      const _ = Ye(y.current, "open", I.current);
      _ ? M.current = setTimeout(() => {
        r(!0);
      }, _) : r(!0);
    }
    function F(P) {
      if (T())
        return;
      S.current();
      const _ = Z(c);
      if (clearTimeout(b.current), x.current) {
        n || clearTimeout(M.current), E.current = x.current({
          ...e,
          tree: d,
          x: P.clientX,
          y: P.clientY,
          onClose() {
            C(), g(), L();
          }
        });
        const Oe = E.current;
        _.addEventListener("mousemove", Oe), S.current = () => {
          _.removeEventListener("mousemove", Oe);
        };
        return;
      }
      (I.current === "touch" ? !xe(c, P.relatedTarget) : !0) && L();
    }
    function N(P) {
      T() || x.current == null || x.current({
        ...e,
        tree: d,
        x: P.clientX,
        y: P.clientY,
        onClose() {
          C(), g(), L();
        }
      })(P);
    }
    if (J(s)) {
      const P = s;
      return n && P.addEventListener("mouseleave", N), c?.addEventListener("mouseleave", N), p && P.addEventListener("mousemove", O, {
        once: !0
      }), P.addEventListener("mouseenter", O), P.addEventListener("mouseleave", F), () => {
        n && P.removeEventListener("mouseleave", N), c?.removeEventListener("mouseleave", N), p && P.removeEventListener("mousemove", O), P.removeEventListener("mouseenter", O), P.removeEventListener("mouseleave", F);
      };
    }
  }, [s, c, a, e, v, l, p, L, g, C, r, n, d, y, x, o]), $(() => {
    var T;
    if (a && n && (T = x.current) != null && T.__options.blockPointerEvents && R()) {
      const N = Z(c).body;
      if (N.setAttribute(Et, ""), N.style.pointerEvents = "none", V.current = !0, J(s) && c) {
        var O, F;
        const P = s, _ = d == null || (O = d.nodesRef.current.find((he) => he.id === w)) == null || (F = O.context) == null ? void 0 : F.elements.floating;
        return _ && (_.style.pointerEvents = ""), P.style.pointerEvents = "auto", c.style.pointerEvents = "auto", () => {
          P.style.pointerEvents = "", c.style.pointerEvents = "";
        };
      }
    }
  }, [a, n, w, c, s, d, x, o, R]), $(() => {
    n || (I.current = void 0, g(), C());
  }, [n, g, C]), f.useEffect(() => () => {
    g(), clearTimeout(M.current), clearTimeout(b.current), C();
  }, [a, g, C]), f.useMemo(() => {
    if (!a)
      return {};
    function T(O) {
      I.current = O.pointerType;
    }
    return {
      reference: {
        onPointerDown: T,
        onPointerEnter: T,
        onMouseMove() {
          n || l === 0 || (clearTimeout(b.current), b.current = setTimeout(() => {
            B.current || r(!0);
          }, l));
        }
      },
      floating: {
        onMouseEnter() {
          clearTimeout(M.current);
        },
        onMouseLeave() {
          i.emit("dismiss", {
            type: "mouseLeave",
            data: {
              returnFocus: !1
            }
          }), L(!1);
        }
      }
    };
  }, [i, a, l, n, r, L]);
};
function Ke(e) {
  let t = e.activeElement;
  for (; ((n = t) == null || (r = n.shadowRoot) == null ? void 0 : r.activeElement) != null; ) {
    var n, r;
    t = t.shadowRoot.activeElement;
  }
  return t;
}
let Ct = 0;
function Tt(e, t) {
  t === void 0 && (t = {});
  const {
    preventScroll: n = !1,
    cancelPrevious: r = !0,
    sync: o = !1
  } = t;
  r && cancelAnimationFrame(Ct);
  const i = () => e?.focus({
    preventScroll: n
  });
  o ? i() : Ct = requestAnimationFrame(i);
}
function Xe(e, t) {
  let n = e.filter((o) => {
    var i;
    return o.parentId === t && ((i = o.context) == null ? void 0 : i.open);
  }), r = n;
  for (; r.length; )
    r = e.filter((o) => {
      var i;
      return (i = r) == null ? void 0 : i.some((s) => {
        var c;
        return o.parentId === s.id && ((c = o.context) == null ? void 0 : c.open);
      });
    }), n = n.concat(r);
  return n;
}
function fr(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const dr = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function mr(e) {
  return Ie(e) && e.matches(dr);
}
function X(e) {
  e.preventDefault(), e.stopPropagation();
}
const en = () => ({
  getShadowRoot: !0,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver == "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function tn(e, t) {
  const n = Xt(e, en());
  t === "prev" && n.reverse();
  const r = n.indexOf(Ke(Z(e)));
  return n.slice(r + 1)[0];
}
function gr() {
  return tn(document.body, "next");
}
function pr() {
  return tn(document.body, "prev");
}
function Ge(e, t) {
  const n = t || e.currentTarget, r = e.relatedTarget;
  return !r || !xe(n, r);
}
function hr(e) {
  Xt(e, en()).forEach((n) => {
    n.dataset.tabindex = n.getAttribute("tabindex") || "", n.setAttribute("tabindex", "-1");
  });
}
function vr(e) {
  e.querySelectorAll("[data-tabindex]").forEach((n) => {
    const r = n.dataset.tabindex;
    delete n.dataset.tabindex, r ? n.setAttribute("tabindex", r) : n.removeAttribute("tabindex");
  });
}
const nn = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
let yr;
function It(e) {
  e.key === "Tab" && (e.target, clearTimeout(yr));
}
const St = /* @__PURE__ */ f.forwardRef(function(t, n) {
  const [r, o] = f.useState();
  return $(() => (Qt() && o("button"), document.addEventListener("keydown", It), () => {
    document.removeEventListener("keydown", It);
  }), []), /* @__PURE__ */ f.createElement("span", nt({}, t, {
    ref: n,
    tabIndex: 0,
    role: r,
    "aria-hidden": r ? void 0 : !0,
    "data-floating-ui-focus-guard": "",
    style: nn
  }));
}), rn = /* @__PURE__ */ f.createContext(null), br = function(e) {
  let {
    id: t,
    root: n
  } = e === void 0 ? {} : e;
  const [r, o] = f.useState(null), i = f.useRef(null), s = ct(), c = wr(), u = f.useMemo(() => ({
    id: t,
    root: n,
    portalContext: c,
    uniqueId: s
  }), [t, n, c, s]), a = f.useRef();
  return $(() => {
    const h = i.current;
    return () => {
      r?.remove(), h?.remove();
    };
  }, [r, u]), $(() => {
    if (a.current === u)
      return;
    a.current = u;
    const {
      id: h,
      root: m,
      portalContext: v,
      uniqueId: l
    } = u, p = h ? document.getElementById(h) : null, d = "data-floating-ui-portal";
    if (p) {
      const w = document.createElement("div");
      w.id = l, w.setAttribute(d, ""), p.appendChild(w), o(w);
    } else {
      let w = v?.portalNode || m || document.body, x = null;
      h && (x = document.createElement("div"), x.id = h, w.appendChild(x));
      const y = document.createElement("div");
      y.id = l, y.setAttribute(d, ""), w = x || w, w.appendChild(y), o(y);
    }
  }, [u]), r;
}, Nr = (e) => {
  let {
    children: t,
    id: n,
    root: r = null,
    preserveTabOrder: o = !0
  } = e;
  const i = br({
    id: n,
    root: r
  }), [s, c] = f.useState(null), u = f.useRef(null), a = f.useRef(null), h = f.useRef(null), m = f.useRef(null), v = (
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!s && // Guards are only for non-modal focus management.
    !s.modal && !!(r || i) && o
  );
  return f.useEffect(() => {
    if (!i || !o || s != null && s.modal)
      return;
    function l(p) {
      i && Ge(p) && (p.type === "focusin" ? vr : hr)(i);
    }
    return i.addEventListener("focusin", l, !0), i.addEventListener("focusout", l, !0), () => {
      i.removeEventListener("focusin", l, !0), i.removeEventListener("focusout", l, !0);
    };
  }, [i, o, s?.modal]), /* @__PURE__ */ f.createElement(rn.Provider, {
    value: f.useMemo(() => ({
      preserveTabOrder: o,
      beforeOutsideRef: u,
      afterOutsideRef: a,
      beforeInsideRef: h,
      afterInsideRef: m,
      portalNode: i,
      setFocusManagerState: c
    }), [o, i])
  }, v && i && /* @__PURE__ */ f.createElement(St, {
    "data-type": "outside",
    ref: u,
    onFocus: (l) => {
      if (Ge(l, i)) {
        var p;
        (p = h.current) == null || p.focus();
      } else {
        const d = pr() || s?.refs.domReference.current;
        d?.focus();
      }
    }
  }), v && i && /* @__PURE__ */ f.createElement("span", {
    "aria-owns": i.id,
    style: nn
  }), i && /* @__PURE__ */ un(t, i), v && i && /* @__PURE__ */ f.createElement(St, {
    "data-type": "outside",
    ref: a,
    onFocus: (l) => {
      if (Ge(l, i)) {
        var p;
        (p = m.current) == null || p.focus();
      } else {
        const d = gr() || s?.refs.domReference.current;
        d?.focus(), s?.closeOnFocusOut && s?.onOpenChange(!1);
      }
    }
  }));
}, wr = () => f.useContext(rn);
function Ot(e) {
  return Ie(e.target) && e.target.tagName === "BUTTON";
}
function At(e) {
  return mr(e);
}
const Br = function(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: o,
    elements: {
      domReference: i
    }
  } = e, {
    enabled: s = !0,
    event: c = "click",
    toggle: u = !0,
    ignoreMouse: a = !1,
    keyboardHandlers: h = !0
  } = t, m = f.useRef(), v = f.useRef(!1);
  return f.useMemo(() => s ? {
    reference: {
      onPointerDown(l) {
        m.current = l.pointerType;
      },
      onMouseDown(l) {
        l.button === 0 && (We(m.current, !0) && a || c !== "click" && (n ? u && (!o.current.openEvent || o.current.openEvent.type === "mousedown") && r(!1) : (l.preventDefault(), r(!0)), o.current.openEvent = l.nativeEvent));
      },
      onClick(l) {
        if (c === "mousedown" && m.current) {
          m.current = void 0;
          return;
        }
        We(m.current, !0) && a || (n ? u && (!o.current.openEvent || o.current.openEvent.type === "click") && r(!1) : r(!0), o.current.openEvent = l.nativeEvent);
      },
      onKeyDown(l) {
        m.current = void 0, !(!h || Ot(l)) && (l.key === " " && !At(i) && (l.preventDefault(), v.current = !0), l.key === "Enter" && (n ? u && r(!1) : r(!0)));
      },
      onKeyUp(l) {
        !h || Ot(l) || At(i) || l.key === " " && v.current && (v.current = !1, n ? u && r(!1) : r(!0));
      }
    }
  } : {}, [s, o, c, a, h, i, u, n, r]);
}, xr = f[/* @__PURE__ */ "useInsertionEffect".toString()], Rr = xr || ((e) => e());
function se(e) {
  const t = f.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return Rr(() => {
    t.current = e;
  }), f.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return t.current == null ? void 0 : t.current(...r);
  }, []);
}
function Pe(e, t) {
  if (t == null)
    return !1;
  if ("composedPath" in e)
    return e.composedPath().includes(t);
  const n = e;
  return n.target != null && t.contains(n.target);
}
const Er = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
}, Cr = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
}, Tr = (e) => {
  var t, n;
  return {
    escapeKeyBubbles: typeof e == "boolean" ? e : (t = e?.escapeKey) != null ? t : !1,
    outsidePressBubbles: typeof e == "boolean" ? e : (n = e?.outsidePress) != null ? n : !0
  };
}, Vr = function(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    events: o,
    nodeId: i,
    elements: {
      reference: s,
      domReference: c,
      floating: u
    },
    dataRef: a
  } = e, {
    enabled: h = !0,
    escapeKey: m = !0,
    outsidePress: v = !0,
    outsidePressEvent: l = "pointerdown",
    referencePress: p = !1,
    referencePressEvent: d = "pointerdown",
    ancestorScroll: w = !1,
    bubbles: x
  } = t, y = $e(), I = ut() != null, M = se(typeof v == "function" ? v : () => !1), E = typeof v == "function" ? M : v, b = f.useRef(!1), {
    escapeKeyBubbles: B,
    outsidePressBubbles: V
  } = Tr(x), S = se((L) => {
    if (!n || !h || !m || L.key !== "Escape")
      return;
    const g = y ? Xe(y.nodesRef.current, i) : [];
    if (!B && (L.stopPropagation(), g.length > 0)) {
      let C = !0;
      if (g.forEach((T) => {
        var O;
        if ((O = T.context) != null && O.open && !T.context.dataRef.current.__escapeKeyBubbles) {
          C = !1;
          return;
        }
      }), !C)
        return;
    }
    o.emit("dismiss", {
      type: "escapeKey",
      data: {
        returnFocus: {
          preventScroll: !1
        }
      }
    }), r(!1);
  }), R = se((L) => {
    const g = b.current;
    if (b.current = !1, g || typeof E == "function" && !E(L))
      return;
    const C = fr(L);
    if (Ie(C) && u) {
      const F = C.clientWidth > 0 && C.scrollWidth > C.clientWidth, N = C.clientHeight > 0 && C.scrollHeight > C.clientHeight;
      let P = N && L.offsetX > C.clientWidth;
      if (N && _e(u).getComputedStyle(C).direction === "rtl" && (P = L.offsetX <= C.offsetWidth - C.clientWidth), P || F && L.offsetY > C.clientHeight)
        return;
    }
    const T = y && Xe(y.nodesRef.current, i).some((F) => {
      var N;
      return Pe(L, (N = F.context) == null ? void 0 : N.elements.floating);
    });
    if (Pe(L, u) || Pe(L, c) || T)
      return;
    const O = y ? Xe(y.nodesRef.current, i) : [];
    if (O.length > 0) {
      let F = !0;
      if (O.forEach((N) => {
        var P;
        if ((P = N.context) != null && P.open && !N.context.dataRef.current.__outsidePressBubbles) {
          F = !1;
          return;
        }
      }), !F)
        return;
    }
    o.emit("dismiss", {
      type: "outsidePress",
      data: {
        returnFocus: I ? {
          preventScroll: !0
        } : Zt(L) || Jt(L)
      }
    }), r(!1);
  });
  return f.useEffect(() => {
    if (!n || !h)
      return;
    a.current.__escapeKeyBubbles = B, a.current.__outsidePressBubbles = V;
    function L() {
      r(!1);
    }
    const g = Z(u);
    m && g.addEventListener("keydown", S), E && g.addEventListener(l, R);
    let C = [];
    return w && (J(c) && (C = ie(c)), J(u) && (C = C.concat(ie(u))), !J(s) && s && s.contextElement && (C = C.concat(ie(s.contextElement)))), C = C.filter((T) => {
      var O;
      return T !== ((O = g.defaultView) == null ? void 0 : O.visualViewport);
    }), C.forEach((T) => {
      T.addEventListener("scroll", L, {
        passive: !0
      });
    }), () => {
      m && g.removeEventListener("keydown", S), E && g.removeEventListener(l, R), C.forEach((T) => {
        T.removeEventListener("scroll", L);
      });
    };
  }, [a, u, c, s, m, E, l, n, r, w, h, B, V, S, R]), f.useEffect(() => {
    b.current = !1;
  }, [E, l]), f.useMemo(() => h ? {
    reference: {
      onKeyDown: S,
      [Er[d]]: () => {
        p && (o.emit("dismiss", {
          type: "referencePress",
          data: {
            returnFocus: !1
          }
        }), r(!1));
      }
    },
    floating: {
      onKeyDown: S,
      [Cr[l]]: () => {
        b.current = !0;
      }
    }
  } : {}, [h, o, p, l, d, r, S]);
}, Wr = function(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: o,
    events: i,
    refs: s,
    elements: {
      floating: c,
      domReference: u
    }
  } = e, {
    enabled: a = !0,
    keyboardOnly: h = !0
  } = t, m = f.useRef(""), v = f.useRef(!1), l = f.useRef();
  return f.useEffect(() => {
    if (!a)
      return;
    const d = Z(c).defaultView || window;
    function w() {
      !n && Ie(u) && u === Ke(Z(u)) && (v.current = !0);
    }
    return d.addEventListener("blur", w), () => {
      d.removeEventListener("blur", w);
    };
  }, [c, u, n, a]), f.useEffect(() => {
    if (!a)
      return;
    function p(d) {
      (d.type === "referencePress" || d.type === "escapeKey") && (v.current = !0);
    }
    return i.on("dismiss", p), () => {
      i.off("dismiss", p);
    };
  }, [i, a]), f.useEffect(() => () => {
    clearTimeout(l.current);
  }, []), f.useMemo(() => a ? {
    reference: {
      onPointerDown(p) {
        let {
          pointerType: d
        } = p;
        m.current = d, v.current = !!(d && h);
      },
      onMouseLeave() {
        v.current = !1;
      },
      onFocus(p) {
        var d;
        v.current || p.type === "focus" && ((d = o.current.openEvent) == null ? void 0 : d.type) === "mousedown" && o.current.openEvent && Pe(o.current.openEvent, u) || (o.current.openEvent = p.nativeEvent, r(!0));
      },
      onBlur(p) {
        v.current = !1;
        const d = p.relatedTarget, w = J(d) && d.hasAttribute("data-floating-ui-focus-guard") && d.getAttribute("data-type") === "outside";
        l.current = setTimeout(() => {
          xe(s.floating.current, d) || xe(u, d) || w || r(!1);
        });
      }
    }
  } : {}, [a, h, u, s, o, r]);
};
let Mt = !1;
const lt = "ArrowUp", je = "ArrowDown", pe = "ArrowLeft", Se = "ArrowRight";
function Me(e, t, n) {
  return Math.floor(e / t) !== n;
}
function be(e, t) {
  return t < 0 || t >= e.current.length;
}
function z(e, t) {
  let {
    startingIndex: n = -1,
    decrement: r = !1,
    disabledIndices: o,
    amount: i = 1
  } = t === void 0 ? {} : t;
  const s = e.current;
  let c = n;
  do {
    var u, a;
    c = c + (r ? -i : i);
  } while (c >= 0 && c <= s.length - 1 && (o ? o.includes(c) : s[c] == null || (u = s[c]) != null && u.hasAttribute("disabled") || ((a = s[c]) == null ? void 0 : a.getAttribute("aria-disabled")) === "true"));
  return c;
}
function qe(e, t, n) {
  switch (e) {
    case "vertical":
      return t;
    case "horizontal":
      return n;
    default:
      return t || n;
  }
}
function Lt(e, t) {
  return qe(t, e === lt || e === je, e === pe || e === Se);
}
function Ze(e, t, n) {
  return qe(t, e === je, n ? e === pe : e === Se) || e === "Enter" || e == " " || e === "";
}
function Ir(e, t, n) {
  return qe(t, n ? e === pe : e === Se, e === je);
}
function Sr(e, t, n) {
  return qe(t, n ? e === Se : e === pe, e === lt);
}
function Je(e, t) {
  return z(e, {
    disabledIndices: t
  });
}
function Pt(e, t) {
  return z(e, {
    decrement: !0,
    startingIndex: e.current.length,
    disabledIndices: t
  });
}
const Kr = (e, t) => {
  const {
    open: n,
    onOpenChange: r,
    refs: o,
    elements: {
      domReference: i,
      floating: s
    }
  } = e, {
    listRef: c,
    activeIndex: u,
    onNavigate: a = () => {
    },
    enabled: h = !0,
    selectedIndex: m = null,
    allowEscape: v = !1,
    loop: l = !1,
    nested: p = !1,
    rtl: d = !1,
    virtual: w = !1,
    focusItemOnOpen: x = "auto",
    focusItemOnHover: y = !0,
    openOnArrowKeyDown: I = !0,
    disabledIndices: M = void 0,
    orientation: E = "vertical",
    cols: b = 1,
    scrollItemIntoView: B = !0
  } = t;
  process.env.NODE_ENV !== "production" && (v && (l || console.warn(["Floating UI: `useListNavigation` looping must be enabled to allow", "escaping."].join(" ")), w || console.warn(["Floating UI: `useListNavigation` must be virtual to allow", "escaping."].join(" "))), E === "vertical" && b > 1 && console.warn(["Floating UI: In grid list navigation mode (`cols` > 1), the", '`orientation` should be either "horizontal" or "both".'].join(" ")));
  const V = ut(), S = $e(), R = se(a), L = f.useRef(x), g = f.useRef(m ?? -1), C = f.useRef(null), T = f.useRef(!0), O = f.useRef(R), F = f.useRef(!!s), N = f.useRef(!1), P = f.useRef(!1), _ = ae(M), he = ae(n), Oe = ae(B), [at, on] = f.useState(), ve = se(function(k, Y, K) {
    K === void 0 && (K = !1);
    const W = k.current[Y.current];
    W && (w ? on(W.id) : Tt(W, {
      preventScroll: !0,
      // Mac Safari does not move the virtual cursor unless the focus call
      // is sync. However, for the very first focus call, we need to wait
      // for the position to be ready in order to prevent unwanted
      // scrolling. This means the virtual cursor will not move to the first
      // item when first opening the floating element, but will on
      // subsequent calls. `preventScroll` is supported in modern Safari,
      // so we can use that instead.
      // iOS Safari must be async or the first item will not be focused.
      sync: ar() && Qt() ? Mt || N.current : !1
    }), requestAnimationFrame(() => {
      const oe = Oe.current;
      oe && W && (K || !T.current) && (W.scrollIntoView == null || W.scrollIntoView(typeof oe == "boolean" ? {
        block: "nearest",
        inline: "nearest"
      } : oe));
    }));
  });
  $(() => {
    document.createElement("div").focus({
      get preventScroll() {
        return Mt = !0, !1;
      }
    });
  }, []), $(() => {
    h && (n && s ? L.current && m != null && (P.current = !0, R(m)) : F.current && (g.current = -1, O.current(null)));
  }, [h, n, s, m, R]), $(() => {
    if (h && n && s)
      if (u == null) {
        if (N.current = !1, m != null)
          return;
        if (F.current && (g.current = -1, ve(c, g)), !F.current && L.current && (C.current != null || L.current === !0 && C.current == null)) {
          let k = 0;
          const Y = () => {
            c.current[0] == null ? (k < 2 && (k ? requestAnimationFrame : queueMicrotask)(Y), k++) : (g.current = C.current == null || Ze(C.current, E, d) || p ? Je(c, _.current) : Pt(c, _.current), C.current = null, R(g.current));
          };
          Y();
        }
      } else
        be(c, u) || (g.current = u, ve(c, g, P.current), P.current = !1);
  }, [h, n, s, u, m, p, c, E, d, R, ve, _]), $(() => {
    if (h && F.current && !s && S) {
      var k, Y;
      const K = S.nodesRef.current, W = (k = K.find((H) => H.id === V)) == null || (Y = k.context) == null ? void 0 : Y.elements.floating, oe = Ke(Z(s)), A = K.some((H) => H.context && xe(H.context.elements.floating, oe));
      W && !A && W.focus({
        preventScroll: !0
      });
    }
  }, [h, s, S, V]), $(() => {
    O.current = R, F.current = !!s;
  }), $(() => {
    n || (C.current = null);
  }, [n]);
  const ft = u != null, dt = f.useMemo(() => {
    function k(K) {
      if (!n)
        return;
      const W = c.current.indexOf(K);
      W !== -1 && R(W);
    }
    return {
      onFocus(K) {
        let {
          currentTarget: W
        } = K;
        k(W);
      },
      onClick: (K) => {
        let {
          currentTarget: W
        } = K;
        return W.focus({
          preventScroll: !0
        });
      },
      // Safari
      ...y && {
        onMouseMove(K) {
          let {
            currentTarget: W
          } = K;
          k(W);
        },
        onPointerLeave(K) {
          let {
            pointerType: W
          } = K;
          !T.current || W === "touch" || (g.current = -1, ve(c, g), R(null), w || Tt(o.floating.current, {
            preventScroll: !0
          }));
        }
      }
    };
  }, [n, o, ve, y, c, R, w]);
  return f.useMemo(() => {
    if (!h)
      return {};
    const k = _.current;
    function Y(A) {
      if (T.current = !1, N.current = !0, !he.current && A.currentTarget === o.floating.current)
        return;
      if (p && Sr(A.key, E, d)) {
        X(A), r(!1), Ie(i) && i.focus();
        return;
      }
      const H = g.current, ee = Je(c, k), j = Pt(c, k);
      if (A.key === "Home" && (X(A), g.current = ee, R(g.current)), A.key === "End" && (X(A), g.current = j, R(g.current)), b > 1) {
        const D = g.current;
        if (A.key === lt) {
          if (X(A), D === -1)
            g.current = j;
          else if (g.current = z(c, {
            startingIndex: D,
            amount: b,
            decrement: !0,
            disabledIndices: k
          }), l && (D - b < ee || g.current < 0)) {
            const te = D % b, ye = j % b, mt = j - (ye - te);
            ye === te ? g.current = j : g.current = ye > te ? mt : mt - b;
          }
          be(c, g.current) && (g.current = D), R(g.current);
        }
        if (A.key === je && (X(A), D === -1 ? g.current = ee : (g.current = z(c, {
          startingIndex: D,
          amount: b,
          disabledIndices: k
        }), l && D + b > j && (g.current = z(c, {
          startingIndex: D % b - b,
          amount: b,
          disabledIndices: k
        }))), be(c, g.current) && (g.current = D), R(g.current)), E === "both") {
          const te = Math.floor(D / b);
          A.key === Se && (X(A), D % b !== b - 1 ? (g.current = z(c, {
            startingIndex: D,
            disabledIndices: k
          }), l && Me(g.current, b, te) && (g.current = z(c, {
            startingIndex: D - D % b - 1,
            disabledIndices: k
          }))) : l && (g.current = z(c, {
            startingIndex: D - D % b - 1,
            disabledIndices: k
          })), Me(g.current, b, te) && (g.current = D)), A.key === pe && (X(A), D % b !== 0 ? (g.current = z(c, {
            startingIndex: D,
            disabledIndices: k,
            decrement: !0
          }), l && Me(g.current, b, te) && (g.current = z(c, {
            startingIndex: D + (b - D % b),
            decrement: !0,
            disabledIndices: k
          }))) : l && (g.current = z(c, {
            startingIndex: D + (b - D % b),
            decrement: !0,
            disabledIndices: k
          })), Me(g.current, b, te) && (g.current = D));
          const ye = Math.floor(j / b) === te;
          be(c, g.current) && (l && ye ? g.current = A.key === pe ? j : z(c, {
            startingIndex: D - D % b - 1,
            disabledIndices: k
          }) : g.current = D), R(g.current);
          return;
        }
      }
      if (Lt(A.key, E)) {
        if (X(A), n && !w && Ke(A.currentTarget.ownerDocument) === A.currentTarget) {
          g.current = Ze(A.key, E, d) ? ee : j, R(g.current);
          return;
        }
        Ze(A.key, E, d) ? l ? g.current = H >= j ? v && H !== c.current.length ? -1 : ee : z(c, {
          startingIndex: H,
          disabledIndices: k
        }) : g.current = Math.min(j, z(c, {
          startingIndex: H,
          disabledIndices: k
        })) : l ? g.current = H <= ee ? v && H !== -1 ? c.current.length : j : z(c, {
          startingIndex: H,
          decrement: !0,
          disabledIndices: k
        }) : g.current = Math.max(ee, z(c, {
          startingIndex: H,
          decrement: !0,
          disabledIndices: k
        })), be(c, g.current) ? R(null) : R(g.current);
      }
    }
    function K(A) {
      x === "auto" && Zt(A.nativeEvent) && (L.current = !0);
    }
    function W(A) {
      L.current = x, x === "auto" && Jt(A.nativeEvent) && (L.current = !0);
    }
    const oe = w && n && ft && {
      "aria-activedescendant": at
    };
    return {
      reference: {
        ...oe,
        onKeyDown(A) {
          T.current = !1;
          const H = A.key.indexOf("Arrow") === 0;
          if (w && n)
            return Y(A);
          if (!n && !I && H)
            return;
          const ee = H || A.key === "Enter" || A.key.trim() === "", j = Lt(A.key, E), D = Ir(A.key, E, d);
          if (ee && (C.current = p && j ? null : A.key), p) {
            D && (X(A), n ? (g.current = Je(c, k), R(g.current)) : r(!0));
            return;
          }
          j && (m != null && (g.current = m), X(A), !n && I ? r(!0) : Y(A), n && R(g.current));
        },
        onFocus() {
          n && R(null);
        },
        onPointerDown: W,
        onMouseDown: K,
        onClick: K
      },
      floating: {
        "aria-orientation": E === "both" ? void 0 : E,
        ...oe,
        onKeyDown: Y,
        onPointerMove() {
          T.current = !0;
        }
      },
      item: dt
    };
  }, [i, o, at, _, he, c, h, E, d, w, n, ft, p, m, I, v, b, l, x, R, r, dt]);
};
function Hr(e) {
  return f.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  }, e);
}
const zr = function(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    floatingId: r
  } = e, {
    enabled: o = !0,
    role: i = "dialog"
  } = t, s = ct();
  return f.useMemo(() => {
    const c = {
      id: r,
      role: i
    };
    return o ? i === "tooltip" ? {
      reference: {
        "aria-describedby": n ? r : void 0
      },
      floating: c
    } : {
      reference: {
        "aria-expanded": n ? "true" : "false",
        "aria-haspopup": i === "alertdialog" ? "dialog" : i,
        "aria-controls": n ? r : void 0,
        ...i === "listbox" && {
          role: "combobox"
        },
        ...i === "menu" && {
          id: s
        }
      },
      floating: {
        ...c,
        ...i === "menu" && {
          "aria-labelledby": s
        }
      }
    } : {};
  }, [o, i, n, r, s]);
}, $r = (e, t) => {
  var n;
  const {
    open: r,
    dataRef: o
  } = e, {
    listRef: i,
    activeIndex: s,
    onMatch: c,
    onTypingChange: u,
    enabled: a = !0,
    findMatch: h = null,
    resetMs: m = 750,
    ignoreKeys: v = [],
    selectedIndex: l = null
  } = t, p = f.useRef(), d = f.useRef(""), w = f.useRef((n = l ?? s) != null ? n : -1), x = f.useRef(null), y = se(c), I = se(u), M = ae(h), E = ae(v);
  return $(() => {
    r && (clearTimeout(p.current), x.current = null, d.current = "");
  }, [r]), $(() => {
    if (r && d.current === "") {
      var b;
      w.current = (b = l ?? s) != null ? b : -1;
    }
  }, [r, l, s]), f.useMemo(() => {
    if (!a)
      return {};
    function b(S) {
      S ? o.current.typing || (o.current.typing = S, I(S)) : o.current.typing && (o.current.typing = S, I(S));
    }
    function B(S, R, L) {
      const g = M.current ? M.current(R, L) : R.find((C) => C?.toLocaleLowerCase().indexOf(L.toLocaleLowerCase()) === 0);
      return g ? S.indexOf(g) : -1;
    }
    function V(S) {
      const R = i.current;
      if (d.current.length > 0 && d.current[0] !== " " && (B(R, R, d.current) === -1 ? b(!1) : S.key === " " && X(S)), R == null || E.current.includes(S.key) || // Character key.
      S.key.length !== 1 || // Modifier key.
      S.ctrlKey || S.metaKey || S.altKey)
        return;
      r && S.key !== " " && (X(S), b(!0)), R.every((T) => {
        var O, F;
        return T ? ((O = T[0]) == null ? void 0 : O.toLocaleLowerCase()) !== ((F = T[1]) == null ? void 0 : F.toLocaleLowerCase()) : !0;
      }) && d.current === S.key && (d.current = "", w.current = x.current), d.current += S.key, clearTimeout(p.current), p.current = setTimeout(() => {
        d.current = "", w.current = x.current, b(!1);
      }, m);
      const g = w.current, C = B(R, [...R.slice((g || 0) + 1), ...R.slice(0, (g || 0) + 1)], d.current);
      C !== -1 ? (y(C), x.current = C) : (d.current = "", b(!1));
    }
    return {
      reference: {
        onKeyDown: V
      },
      floating: {
        onKeyDown: V
      }
    };
  }, [a, r, o, i, m, E, M, y, I]);
};
function _r(e) {
  e === void 0 && (e = {});
  const {
    open: t = !1,
    onOpenChange: n,
    nodeId: r
  } = e, o = Bn(e), i = $e(), s = f.useRef(null), c = f.useRef({}), u = f.useState(() => ir())[0], a = ct(), [h, m] = f.useState(null), v = f.useCallback((y) => {
    const I = J(y) ? {
      getBoundingClientRect: () => y.getBoundingClientRect(),
      contextElement: y
    } : y;
    o.refs.setReference(I);
  }, [o.refs]), l = f.useCallback((y) => {
    (J(y) || y === null) && (s.current = y, m(y)), (J(o.refs.reference.current) || o.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    y !== null && !J(y)) && o.refs.setReference(y);
  }, [o.refs]), p = f.useMemo(() => ({
    ...o.refs,
    setReference: l,
    setPositionReference: v,
    domReference: s
  }), [o.refs, l, v]), d = f.useMemo(() => ({
    ...o.elements,
    domReference: h
  }), [o.elements, h]), w = se(n), x = f.useMemo(() => ({
    ...o,
    refs: p,
    elements: d,
    dataRef: c,
    nodeId: r,
    floatingId: a,
    events: u,
    open: t,
    onOpenChange: w
  }), [o, r, a, u, t, w, p, d]);
  return $(() => {
    const y = i?.nodesRef.current.find((I) => I.id === r);
    y && (y.context = x);
  }), f.useMemo(() => ({
    ...o,
    context: x,
    refs: p,
    elements: d,
    reference: l,
    positionReference: v
  }), [o, p, d, x, l, v]);
}
function Qe(e, t, n) {
  const r = /* @__PURE__ */ new Map();
  return {
    ...n === "floating" && {
      tabIndex: -1
    },
    ...e,
    ...t.map((o) => o ? o[n] : null).concat(e).reduce((o, i) => (i && Object.entries(i).forEach((s) => {
      let [c, u] = s;
      if (c.indexOf("on") === 0) {
        if (r.has(c) || r.set(c, []), typeof u == "function") {
          var a;
          (a = r.get(c)) == null || a.push(u), o[c] = function() {
            for (var h, m = arguments.length, v = new Array(m), l = 0; l < m; l++)
              v[l] = arguments[l];
            return (h = r.get(c)) == null ? void 0 : h.map((p) => p(...v)).find((p) => p !== void 0);
          };
        }
      } else
        o[c] = u;
    }), o), {})
  };
}
const jr = function(e) {
  e === void 0 && (e = []);
  const t = e, n = f.useCallback(
    (i) => Qe(i, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), r = f.useCallback(
    (i) => Qe(i, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), o = f.useCallback(
    (i) => Qe(i, e, "item"),
    // Granularly check for `item` changes, because the `getItemProps` getter
    // should be as referentially stable as possible since it may be passed as
    // a prop to many components. All `item` key values must therefore be
    // memoized.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    e.map((i) => i?.item)
  );
  return f.useMemo(() => ({
    getReferenceProps: n,
    getFloatingProps: r,
    getItemProps: o
  }), [n, r, o]);
};
export {
  Nr as F,
  jr as a,
  Kr as b,
  Vr as c,
  Wr as d,
  Br as e,
  $r as f,
  kr as g,
  Mr as h,
  Pr as i,
  Fr as j,
  zr as k,
  Hr as l,
  Lr as o,
  Dr as s,
  _r as u
};
