(() => {
	function k(e) {
		let t = e.getAttribute('x-target');
		return t ? t.split(' ') : [e.id];
	}
	function N(e = []) {
		if (((e = e.filter((t) => t)), e.length === 0)) throw new H(el);
		return e.map((t) => {
			let i = document.getElementById(t);
			if (!i) throw new $(t);
			return i;
		});
	}
	function L(e) {
		return (
			document.querySelectorAll('[x-sync]').forEach((t) => {
				if (!t.id) throw new H(t);
				e.some((i) => i.id === t.id) || e.push(t);
			}),
			e
		);
	}
	function R(e) {
		return e.hasAttribute('x-target');
	}
	var H = class extends Error {
			constructor(t) {
				let i = (t.outerHTML.match(/<[^>]+>/) ?? [])[0] ?? '[Element]';
				super(`${i} is missing an ID to target.`), (this.name = 'Target Missing ID');
			}
		},
		$ = class extends Error {
			constructor(t) {
				super(`#${t} was not found in the current document.`), (this.name = 'Missing Target');
			}
		},
		A = class extends Error {
			constructor(t) {
				let i = (t.outerHTML.match(/<[^>]+>/) ?? [])[0] ?? '[Element]';
				super(`${i} received a failed response.`), (this.name = 'Failed Response');
			}
		};
	function F(e) {
		return e.closest('[data-source]')?.dataset.source;
	}
	function ae(e) {
		let t = document.createElement('template');
		return (t.innerHTML = e), t.content.firstElementChild;
	}
	function oe(e) {
		return e.nodeType === 3 || e.nodeType === 8;
	}
	var f = {
			replace(e, t, i) {
				let r = e.indexOf(t);
				if (r === -1) throw 'Cant find element in children';
				return t.replaceWith(i), (e[r] = i), e;
			},
			before(e, t, i) {
				let r = e.indexOf(t);
				if (r === -1) throw 'Cant find element in children';
				return t.before(i), e.splice(r, 0, i), e;
			},
			append(e, t, i) {
				let r = e[e.length - 1];
				return i(t), e.push(t), e;
			},
			remove(e, t) {
				if (e.indexOf(t) === -1) throw 'Cant find element in children';
				return t.remove(), e.filter((r) => r !== t);
			},
			first(e) {
				return this.teleportTo(e[0]);
			},
			next(e, t) {
				let i = e.indexOf(t);
				if (i !== -1) return this.teleportTo(this.teleportBack(e[i + 1]));
			},
			teleportTo(e) {
				return e && (e._x_teleport ? e._x_teleport : e);
			},
			teleportBack(e) {
				return e && (e._x_teleportBack ? e._x_teleportBack : e);
			}
		},
		ue = () => {},
		le = () => {};
	function j(e, t, i) {
		let r, o, l, m, b, c, g, _, v, D;
		function C(n = {}) {
			let a = (h) => h.getAttribute('key'),
				d = () => {};
			(b = n.updating || d),
				(c = n.updated || d),
				(g = n.removing || d),
				(_ = n.removed || d),
				(v = n.adding || d),
				(D = n.added || d),
				(l = n.key || a),
				(m = n.lookahead || !1);
		}
		function V(n, a) {
			if (ee(n, a)) return te(n, a);
			let d = !1;
			if (!q(b, n, a, () => (d = !0))) {
				if ((window.Alpine && se(n, a, () => (d = !0)), oe(a))) {
					ne(n, a), c(n, a);
					return;
				}
				d || re(n, a),
					c(n, a),
					U(Array.from(n.childNodes), Array.from(a.childNodes), (h) => {
						n.appendChild(h);
					});
			}
		}
		function ee(n, a) {
			return n.nodeType != a.nodeType || n.nodeName != a.nodeName || S(n) != S(a);
		}
		function te(n, a) {
			if (q(g, n)) return;
			let d = a.cloneNode(!0);
			q(v, d) || (f.replace([n], n, d), _(n), D(d));
		}
		function ne(n, a) {
			let d = a.nodeValue;
			n.nodeValue !== d && (n.nodeValue = d);
		}
		function re(n, a) {
			if ((n._x_isShown && !a._x_isShown) || (!n._x_isShown && a._x_isShown)) return;
			let d = Array.from(n.attributes),
				h = Array.from(a.attributes);
			for (let x = d.length - 1; x >= 0; x--) {
				let s = d[x].name;
				a.hasAttribute(s) || n.removeAttribute(s);
			}
			for (let x = h.length - 1; x >= 0; x--) {
				let s = h[x].name,
					u = h[x].value;
				n.getAttribute(s) !== u && n.setAttribute(s, u);
			}
		}
		function U(n, a, d) {
			let h = {},
				x = {},
				s = f.first(a),
				u = f.first(n);
			for (; s; ) {
				let w = S(s),
					E = S(u);
				if (!u)
					if (w && x[w]) {
						let p = x[w];
						(n = f.append(n, p, d)), (u = p);
					} else {
						if (!q(v, s)) {
							let p = s.cloneNode(!0);
							(n = f.append(n, p, d)), D(p);
						}
						s = f.next(a, s);
						continue;
					}
				let I = (p) => p.nodeType === 8 && p.textContent === ' __BLOCK__ ',
					K = (p) => p.nodeType === 8 && p.textContent === ' __ENDBLOCK__ ';
				if (I(s) && I(u)) {
					let p = [],
						B,
						T = 0;
					for (; u; ) {
						let y = f.next(n, u);
						if (I(y)) T++;
						else if (K(y) && T > 0) T--;
						else if (K(y) && T === 0) {
							(u = f.next(n, y)), (B = y);
							break;
						}
						p.push(y), (u = y);
					}
					let W = [];
					for (T = 0; s; ) {
						let y = f.next(a, s);
						if (I(y)) T++;
						else if (K(y) && T > 0) T--;
						else if (K(y) && T === 0) {
							s = f.next(a, y);
							break;
						}
						W.push(y), (s = y);
					}
					U(p, W, (y) => B.before(y));
					continue;
				}
				if (u.nodeType === 1 && m) {
					let p = f.next(a, s),
						B = !1;
					for (; !B && p; )
						u.isEqualNode(p) && ((B = !0), ([n, u] = G(n, s, u)), (E = S(u))), (p = f.next(a, p));
				}
				if (w !== E) {
					if (!w && E) {
						(x[E] = u),
							([n, u] = G(n, s, u)),
							(n = f.remove(n, x[E])),
							(u = f.next(n, u)),
							(s = f.next(a, s));
						continue;
					}
					if ((w && !E && h[w] && ((n = f.replace(n, u, h[w])), (u = h[w])), w && E)) {
						let p = h[w];
						if (p) (x[E] = u), (n = f.replace(n, u, p)), (u = p);
						else {
							(x[E] = u),
								([n, u] = G(n, s, u)),
								(n = f.remove(n, x[E])),
								(u = f.next(n, u)),
								(s = f.next(a, s));
							continue;
						}
					}
				}
				let ie = u && f.next(n, u);
				V(u, s), (s = s && f.next(a, s)), (u = ie);
			}
			let P = [];
			for (; u; ) q(g, u) || P.push(u), (u = f.next(n, u));
			for (; P.length; ) {
				let w = P.shift();
				w.remove(), _(w);
			}
		}
		function S(n) {
			return n && n.nodeType === 1 && l(n);
		}
		function Te(n) {
			let a = {};
			return (
				n.forEach((d) => {
					let h = S(d);
					h && (a[h] = d);
				}),
				a
			);
		}
		function G(n, a, d) {
			if (!q(v, a)) {
				let h = a.cloneNode(!0);
				return (n = f.before(n, d, h)), D(h), [n, h];
			}
			return [n, a];
		}
		return (
			C(i),
			(r = e),
			(o = typeof t == 'string' ? ae(t) : t),
			window.Alpine &&
				window.Alpine.closestDataStack &&
				!e._x_dataStack &&
				((o._x_dataStack = window.Alpine.closestDataStack(e)),
				o._x_dataStack && window.Alpine.clone(e, o)),
			V(e, o),
			(r = void 0),
			(o = void 0),
			e
		);
	}
	j.step = () => ue();
	j.log = (e) => {
		le = e;
	};
	function q(e, ...t) {
		let i = !1;
		return e(...t, () => (i = !0)), i;
	}
	function se(e, t, i) {
		e.nodeType === 1 && e._x_dataStack && window.Alpine.clone(e, t);
	}
	var M = {},
		de = {
			before(e, t) {
				return e.before(...t.childNodes), e;
			},
			replace(e, t) {
				return e.replaceWith(t), t;
			},
			update(e, t) {
				return e.replaceChildren(...t.childNodes), e;
			},
			prepend(e, t) {
				return e.prepend(...t.childNodes), e;
			},
			append(e, t) {
				return e.append(...t.childNodes), e;
			},
			after(e, t) {
				return e.after(...t.childNodes), e;
			},
			remove(e) {
				return e.remove(), null;
			},
			morph(e, t) {
				return j(e, t), document.getElementById(t.id);
			}
		};
	async function O(e, t, i, r = !0) {
		let o = (c, g = {}) =>
			i.dispatchEvent(new CustomEvent(c, { detail: g, bubbles: !0, composed: !0, cancelable: !0 }));
		if ((r || (o = () => !0), !o('ajax:before'))) return;
		t.forEach((c) => {
			c.setAttribute('aria-busy', 'true');
		});
		let l = await ce(e);
		if ((l.ok ? o('ajax:success', l) : o('ajax:error', l), o('ajax:after', l), !l.html)) return;
		let m = document.createRange().createContextualFragment(l.html);
		t = t.map((c) => {
			let g = m.getElementById(c.id),
				_ = c.getAttribute('x-arrange') || 'replace';
			if (!g) {
				if (!o('ajax:missing', l)) return;
				if (
					(c.hasAttribute('x-sync') || console.warn(`Target #${c.id} not found in AJAX response.`),
					l.ok)
				)
					return z(_, c, c.cloneNode(!1));
				throw new A(i);
			}
			let v = z(_, c, g);
			return v && (v.removeAttribute('aria-busy'), (v.dataset.source = l.url)), v;
		});
		let b = i.getAttribute('x-focus');
		return b && he(document.getElementById(b)), t;
	}
	function z(e, t, i) {
		return de[e](t, i);
	}
	async function ce({ method: e, action: t, body: i, referrer: r }) {
		let o,
			l = (c) => c,
			m = (c) => c;
		if (e === 'GET') {
			if (((o = fe(t)), pe(t))) return o;
			(l = (c) => X(t, (g) => g.resolve(c))), (m = (c) => X(t, (g) => g.reject(c)));
		}
		r = r || window.location.href;
		let b = fetch(t, { headers: { 'X-Alpine-Request': 'true' }, referrer: r, method: e, body: i })
			.then(me)
			.then(l)
			.catch(m);
		return e === 'GET' ? o : b;
	}
	function fe(e) {
		M[e] || (M[e] = []);
		let t = {},
			i = new Promise((r, o) => {
				(t.resolve = r), (t.reject = o);
			});
		return M[e].push(t), i;
	}
	function pe(e) {
		return M[e].length > 1;
	}
	function X(e, t) {
		(M[e] || []).forEach(t), (M[e] = void 0);
	}
	function me(e) {
		return e.text().then((t) => ((e.html = t), e));
	}
	function he(e) {
		setTimeout(() => {
			e.hasAttribute('tabindex') || e.setAttribute('tabindex', '0'), e.focus();
		}, 0);
	}
	function J(e) {
		let t = async (i) => {
			let r = i.target;
			if (!ye(r) || !R(r)) return;
			i.preventDefault(), i.stopPropagation();
			let o = L(N(k(r))),
				l = xe(r);
			try {
				return await O(l, o, r);
			} catch (m) {
				if (m instanceof A) {
					console.warn(m.message), (window.location.href = r.href);
					return;
				}
				throw m;
			}
		};
		return e.addEventListener('click', t), () => e.removeEventListener('click', t);
	}
	function xe(e) {
		return { method: 'GET', action: e.href, referrer: F(e), body: null };
	}
	function ye(e) {
		return e.href && !e.hash && e.origin == location.origin;
	}
	function Q(e) {
		let t = async (i) => {
			let r = i.target;
			if (!R(r)) return;
			i.preventDefault(), i.stopPropagation();
			let o = L(N(k(r))),
				l = we(r, i.submitter);
			try {
				return await ge(i.submitter, () => O(l, o, r));
			} catch (m) {
				if (m instanceof A) {
					console.warn(m.message), r.removeAttribute('x-target'), r.requestSubmit(i.submitter);
					return;
				}
				throw m;
			}
		};
		return e.addEventListener('submit', t), () => e.removeEventListener('submit', t);
	}
	function we(e, t = null) {
		let i = (e.getAttribute('method') || 'GET').toUpperCase(),
			r = F(e),
			o = e.getAttribute('action') || r || window.location.href,
			l = new FormData(e);
		return (
			t && t.name && l.append(t.name, t.value),
			i === 'GET' && ((o = Ee(l, o)), (l = null)),
			{ method: i, action: o, body: l, referrer: r }
		);
	}
	async function ge(e, t) {
		if (!e) return await t();
		let i = (o) => o.preventDefault();
		e.setAttribute('aria-disabled', 'true'), e.addEventListener('click', i);
		let r = await t();
		return e.removeAttribute('aria-disabled'), e.removeEventListener('click', i), r;
	}
	function Ee(e, t) {
		let i = Array.from(e.entries()).filter(([r, o]) => o !== '' || o !== null);
		if (i.length) {
			let r = t.split('#');
			(t = r[0]), t.includes('?') ? (t += '&') : (t += '?'), (t += new URLSearchParams(i));
			let o = r[1];
			o && (t += '#' + o);
		}
		return t;
	}
	var Y = new WeakMap();
	function be(e) {
		let t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null,
			i = t ? t.closest('input, button') : null;
		return i?.type == 'submit' ? i : null;
	}
	function ve(e) {
		let t = be(e.target);
		t && t.form && Y.set(t.form, t);
	}
	(function () {
		if ('submitter' in Event.prototype) return;
		let e = window.Event.prototype;
		if ('SubmitEvent' in window && /Apple Computer/.test(navigator.vendor))
			e = window.SubmitEvent.prototype;
		else if ('SubmitEvent' in window) return;
		addEventListener('click', ve, !0),
			Object.defineProperty(e, 'submitter', {
				get() {
					if (this.type == 'submit' && this.target instanceof HTMLFormElement)
						return Y.get(this.target);
				}
			});
	})();
	(function (e) {
		if (typeof e.requestSubmit == 'function') return;
		e.requestSubmit = function (r) {
			r
				? (t(r, this), r.click())
				: ((r = document.createElement('input')),
				  (r.type = 'submit'),
				  (r.hidden = !0),
				  this.appendChild(r),
				  r.click(),
				  this.removeChild(r));
		};
		function t(r, o) {
			r instanceof HTMLElement || i(TypeError, "parameter 1 is not of type 'HTMLElement'"),
				r.type == 'submit' || i(TypeError, 'The specified element is not a submit button'),
				r.form == o ||
					i(
						DOMException,
						'The specified element is not owned by this form element',
						'NotFoundError'
					);
		}
		function i(r, o, l) {
			throw new r("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + o + '.', l);
		}
	})(HTMLFormElement.prototype);
	function Z(e) {
		Q(window),
			J(window),
			e.magic('ajax', (t) => (i, r = {}) => {
				let o = r.target ? r.target.split(' ') : k(t),
					l = N(o);
				l = r.sync ? L(l) : l;
				let m = null;
				if (r.body)
					if (r.body instanceof HTMLFormElement) m = new FormData(r.body);
					else {
						m = new FormData();
						for (let c in r.body) m.append(c, r.body[c]);
					}
				let b = {
					action: i,
					method: r.method ? r.method.toUpperCase() : 'GET',
					body: m,
					referrer: F(t)
				};
				return O(b, l, t, !!r.events);
			}),
			e.addInitSelector(() => `[${e.prefixed('load')}]`),
			e.directive('load', (t, { expression: i }, { evaluate: r }) =>
				typeof i == 'string' ? !!i.trim() && r(i) : r(i)
			);
	}
	document.addEventListener('alpine:initializing', () => {
		Z(window.Alpine);
	});
})();
Copied;