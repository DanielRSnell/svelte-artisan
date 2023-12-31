function $() {}
function K(t, n) {
	for (const e in n) t[e] = n[e];
	return t;
}
function k(t) {
	return t();
}
function j() {
	return Object.create(null);
}
function g(t) {
	t.forEach(k);
}
function B(t) {
	return typeof t == 'function';
}
function dt(t, n) {
	return t != t ? n == n : t !== n || (t && typeof t == 'object') || typeof t == 'function';
}
function R(t) {
	return Object.keys(t).length === 0;
}
function W(t, ...n) {
	if (t == null) return $;
	const e = t.subscribe(...n);
	return e.unsubscribe ? () => e.unsubscribe() : e;
}
function _t(t, n, e) {
	t.$$.on_destroy.push(W(n, e));
}
function ht(t, n, e, i) {
	if (t) {
		const r = O(t, n, e, i);
		return t[0](r);
	}
}
function O(t, n, e, i) {
	return t[1] && i ? K(e.ctx.slice(), t[1](i(n))) : e.ctx;
}
function mt(t, n, e, i) {
	if (t[2] && i) {
		const r = t[2](i(e));
		if (n.dirty === void 0) return r;
		if (typeof r == 'object') {
			const u = [],
				s = Math.max(n.dirty.length, r.length);
			for (let o = 0; o < s; o += 1) u[o] = n.dirty[o] | r[o];
			return u;
		}
		return n.dirty | r;
	}
	return n.dirty;
}
function pt(t, n, e, i, r, u) {
	if (r) {
		const s = O(n, e, i, u);
		t.p(s, r);
	}
}
function yt(t) {
	if (t.ctx.length > 32) {
		const n = [],
			e = t.ctx.length / 32;
		for (let i = 0; i < e; i++) n[i] = -1;
		return n;
	}
	return -1;
}
let E = !1;
function Q() {
	E = !0;
}
function U() {
	E = !1;
}
function V(t, n, e, i) {
	for (; t < n; ) {
		const r = t + ((n - t) >> 1);
		e(r) <= i ? (t = r + 1) : (n = r);
	}
	return t;
}
function X(t) {
	if (t.hydrate_init) return;
	t.hydrate_init = !0;
	let n = t.childNodes;
	if (t.nodeName === 'HEAD') {
		const l = [];
		for (let c = 0; c < n.length; c++) {
			const f = n[c];
			f.claim_order !== void 0 && l.push(f);
		}
		n = l;
	}
	const e = new Int32Array(n.length + 1),
		i = new Int32Array(n.length);
	e[0] = -1;
	let r = 0;
	for (let l = 0; l < n.length; l++) {
		const c = n[l].claim_order,
			f = (r > 0 && n[e[r]].claim_order <= c ? r + 1 : V(1, r, (x) => n[e[x]].claim_order, c)) - 1;
		i[l] = e[f] + 1;
		const a = f + 1;
		(e[a] = l), (r = Math.max(a, r));
	}
	const u = [],
		s = [];
	let o = n.length - 1;
	for (let l = e[r] + 1; l != 0; l = i[l - 1]) {
		for (u.push(n[l - 1]); o >= l; o--) s.push(n[o]);
		o--;
	}
	for (; o >= 0; o--) s.push(n[o]);
	u.reverse(), s.sort((l, c) => l.claim_order - c.claim_order);
	for (let l = 0, c = 0; l < s.length; l++) {
		for (; c < u.length && s[l].claim_order >= u[c].claim_order; ) c++;
		const f = c < u.length ? u[c] : null;
		t.insertBefore(s[l], f);
	}
}
function Y(t, n) {
	if (E) {
		for (
			X(t),
				(t.actual_end_child === void 0 ||
					(t.actual_end_child !== null && t.actual_end_child.parentNode !== t)) &&
					(t.actual_end_child = t.firstChild);
			t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

		)
			t.actual_end_child = t.actual_end_child.nextSibling;
		n !== t.actual_end_child
			? (n.claim_order !== void 0 || n.parentNode !== t) && t.insertBefore(n, t.actual_end_child)
			: (t.actual_end_child = n.nextSibling);
	} else (n.parentNode !== t || n.nextSibling !== null) && t.appendChild(n);
}
function Z(t, n, e) {
	t.insertBefore(n, e || null);
}
function tt(t, n, e) {
	E && !e ? Y(t, n) : (n.parentNode !== t || n.nextSibling != e) && t.insertBefore(n, e || null);
}
function w(t) {
	t.parentNode && t.parentNode.removeChild(t);
}
function D(t) {
	return document.createElement(t);
}
function nt(t) {
	return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function v(t) {
	return document.createTextNode(t);
}
function gt() {
	return v(' ');
}
function xt() {
	return v('');
}
function bt(t, n, e) {
	e == null ? t.removeAttribute(n) : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function et(t) {
	return Array.from(t.childNodes);
}
function G(t) {
	t.claim_info === void 0 && (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function q(t, n, e, i, r = !1) {
	G(t);
	const u = (() => {
		for (let s = t.claim_info.last_index; s < t.length; s++) {
			const o = t[s];
			if (n(o)) {
				const l = e(o);
				return l === void 0 ? t.splice(s, 1) : (t[s] = l), r || (t.claim_info.last_index = s), o;
			}
		}
		for (let s = t.claim_info.last_index - 1; s >= 0; s--) {
			const o = t[s];
			if (n(o)) {
				const l = e(o);
				return (
					l === void 0 ? t.splice(s, 1) : (t[s] = l),
					r ? l === void 0 && t.claim_info.last_index-- : (t.claim_info.last_index = s),
					o
				);
			}
		}
		return i();
	})();
	return (u.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1), u;
}
function it(t, n, e, i) {
	return q(
		t,
		(r) => r.nodeName === n,
		(r) => {
			const u = [];
			for (let s = 0; s < r.attributes.length; s++) {
				const o = r.attributes[s];
				e[o.name] || u.push(o.name);
			}
			u.forEach((s) => r.removeAttribute(s));
		},
		() => i(n)
	);
}
function $t(t, n, e) {
	return it(t, n, e, D);
}
function rt(t, n) {
	return q(
		t,
		(e) => e.nodeType === 3,
		(e) => {
			const i = '' + n;
			if (e.data.startsWith(i)) {
				if (e.data.length !== i.length) return e.splitText(i.length);
			} else e.data = i;
		},
		() => v(n),
		!0
	);
}
function wt(t) {
	return rt(t, ' ');
}
function H(t, n, e) {
	for (let i = e; i < t.length; i += 1) {
		const r = t[i];
		if (r.nodeType === 8 && r.textContent.trim() === n) return i;
	}
	return t.length;
}
function Et(t, n) {
	const e = H(t, 'HTML_TAG_START', 0),
		i = H(t, 'HTML_TAG_END', e);
	if (e === i) return new C(void 0, n);
	G(t);
	const r = t.splice(e, i - e + 1);
	w(r[0]), w(r[r.length - 1]);
	const u = r.slice(1, r.length - 1);
	for (const s of u)
		(s.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1);
	return new C(u, n);
}
function Tt(t, n) {
	(n = '' + n), t.data !== n && (t.data = n);
}
function Nt(t, n, e, i) {
	e == null ? t.style.removeProperty(n) : t.style.setProperty(n, e, i ? 'important' : '');
}
class st {
	constructor(n = !1) {
		(this.is_svg = !1), (this.is_svg = n), (this.e = this.n = null);
	}
	c(n) {
		this.h(n);
	}
	m(n, e, i = null) {
		this.e ||
			(this.is_svg
				? (this.e = nt(e.nodeName))
				: (this.e = D(e.nodeType === 11 ? 'TEMPLATE' : e.nodeName)),
			(this.t = e.tagName !== 'TEMPLATE' ? e : e.content),
			this.c(n)),
			this.i(i);
	}
	h(n) {
		(this.e.innerHTML = n),
			(this.n = Array.from(
				this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes
			));
	}
	i(n) {
		for (let e = 0; e < this.n.length; e += 1) Z(this.t, this.n[e], n);
	}
	p(n) {
		this.d(), this.h(n), this.i(this.a);
	}
	d() {
		this.n.forEach(w);
	}
}
class C extends st {
	constructor(n, e = !1) {
		super(e), (this.e = this.n = null), (this.l = n);
	}
	c(n) {
		this.l ? (this.n = this.l) : super.c(n);
	}
	i(n) {
		for (let e = 0; e < this.n.length; e += 1) tt(this.t, this.n[e], n);
	}
}
function At(t, n) {
	return new t(n);
}
let y;
function p(t) {
	y = t;
}
function z() {
	if (!y) throw new Error('Function called outside component initialization');
	return y;
}
function vt(t) {
	z().$$.on_mount.push(t);
}
function Mt(t) {
	z().$$.after_update.push(t);
}
const h = [],
	L = [];
let m = [];
const P = [],
	F = Promise.resolve();
let N = !1;
function I() {
	N || ((N = !0), F.then(J));
}
function St() {
	return I(), F;
}
function A(t) {
	m.push(t);
}
const T = new Set();
let _ = 0;
function J() {
	if (_ !== 0) return;
	const t = y;
	do {
		try {
			for (; _ < h.length; ) {
				const n = h[_];
				_++, p(n), lt(n.$$);
			}
		} catch (n) {
			throw ((h.length = 0), (_ = 0), n);
		}
		for (p(null), h.length = 0, _ = 0; L.length; ) L.pop()();
		for (let n = 0; n < m.length; n += 1) {
			const e = m[n];
			T.has(e) || (T.add(e), e());
		}
		m.length = 0;
	} while (h.length);
	for (; P.length; ) P.pop()();
	(N = !1), T.clear(), p(t);
}
function lt(t) {
	if (t.fragment !== null) {
		t.update(), g(t.before_update);
		const n = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, n), t.after_update.forEach(A);
	}
}
function ct(t) {
	const n = [],
		e = [];
	m.forEach((i) => (t.indexOf(i) === -1 ? n.push(i) : e.push(i))), e.forEach((i) => i()), (m = n);
}
const b = new Set();
let d;
function jt() {
	d = { r: 0, c: [], p: d };
}
function Ht() {
	d.r || g(d.c), (d = d.p);
}
function ot(t, n) {
	t && t.i && (b.delete(t), t.i(n));
}
function Ct(t, n, e, i) {
	if (t && t.o) {
		if (b.has(t)) return;
		b.add(t),
			d.c.push(() => {
				b.delete(t), i && (e && t.d(1), i());
			}),
			t.o(n);
	} else i && i();
}
function Lt(t) {
	t && t.c();
}
function Pt(t, n) {
	t && t.l(n);
}
function ut(t, n, e, i) {
	const { fragment: r, after_update: u } = t.$$;
	r && r.m(n, e),
		i ||
			A(() => {
				const s = t.$$.on_mount.map(k).filter(B);
				t.$$.on_destroy ? t.$$.on_destroy.push(...s) : g(s), (t.$$.on_mount = []);
			}),
		u.forEach(A);
}
function at(t, n) {
	const e = t.$$;
	e.fragment !== null &&
		(ct(e.after_update),
		g(e.on_destroy),
		e.fragment && e.fragment.d(n),
		(e.on_destroy = e.fragment = null),
		(e.ctx = []));
}
function ft(t, n) {
	t.$$.dirty[0] === -1 && (h.push(t), I(), t.$$.dirty.fill(0)),
		(t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function kt(t, n, e, i, r, u, s, o = [-1]) {
	const l = y;
	p(t);
	const c = (t.$$ = {
		fragment: null,
		ctx: [],
		props: u,
		update: $,
		not_equal: r,
		bound: j(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(n.context || (l ? l.$$.context : [])),
		callbacks: j(),
		dirty: o,
		skip_bound: !1,
		root: n.target || l.$$.root
	});
	s && s(c.root);
	let f = !1;
	if (
		((c.ctx = e
			? e(t, n.props || {}, (a, x, ...M) => {
					const S = M.length ? M[0] : x;
					return (
						c.ctx &&
							r(c.ctx[a], (c.ctx[a] = S)) &&
							(!c.skip_bound && c.bound[a] && c.bound[a](S), f && ft(t, a)),
						x
					);
			  })
			: []),
		c.update(),
		(f = !0),
		g(c.before_update),
		(c.fragment = i ? i(c.ctx) : !1),
		n.target)
	) {
		if (n.hydrate) {
			Q();
			const a = et(n.target);
			c.fragment && c.fragment.l(a), a.forEach(w);
		} else c.fragment && c.fragment.c();
		n.intro && ot(t.$$.fragment), ut(t, n.target, n.anchor, n.customElement), U(), J();
	}
	p(l);
}
class Bt {
	$destroy() {
		at(this, 1), (this.$destroy = $);
	}
	$on(n, e) {
		if (!B(e)) return $;
		const i = this.$$.callbacks[n] || (this.$$.callbacks[n] = []);
		return (
			i.push(e),
			() => {
				const r = i.indexOf(e);
				r !== -1 && i.splice(r, 1);
			}
		);
	}
	$set(n) {
		this.$$set && !R(n) && ((this.$$.skip_bound = !0), this.$$set(n), (this.$$.skip_bound = !1));
	}
}
export {
	ut as A,
	at as B,
	ht as C,
	pt as D,
	yt as E,
	mt as F,
	Y as G,
	$ as H,
	_t as I,
	C as J,
	Et as K,
	Bt as S,
	gt as a,
	tt as b,
	wt as c,
	Ct as d,
	xt as e,
	Ht as f,
	ot as g,
	w as h,
	kt as i,
	Mt as j,
	D as k,
	$t as l,
	et as m,
	bt as n,
	vt as o,
	Nt as p,
	v as q,
	rt as r,
	dt as s,
	St as t,
	Tt as u,
	jt as v,
	L as w,
	At as x,
	Lt as y,
	Pt as z
};
