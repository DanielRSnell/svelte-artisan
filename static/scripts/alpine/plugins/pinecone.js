(() => {
	var g = class {
			constructor(n, t = {}) {
				this.params = {};
				(this.path = n),
					Object.keys(t).forEach((o) => {
						this[o] = t[o];
					});
			}
		},
		m = g;
	var P = window.location;
	function v(e) {
		return e.replace(/(^\/+|\/+$)/g, '').split('/');
	}
	function b(e, n) {
		let t = /(?:\?([^#]*))?(#.*)?$/,
			o = e.match(t),
			i = {},
			a;
		if (o && o[1]) {
			let r = o[1].split('&');
			for (let l = 0; l < r.length; l++) {
				let u = r[l].split('=');
				i[decodeURIComponent(u[0])] = decodeURIComponent(u.slice(1).join('='));
			}
		}
		let d = v(e.replace(t, '')),
			c = v(n || ''),
			s = Math.max(d.length, c.length);
		for (let r = 0; r < s; r++)
			if (c[r] && c[r].charAt(0) === ':') {
				let l = c[r].replace(/(^:|[+*?]+$)/g, ''),
					u = (c[r].match(/[+*?]+$/) || {}).toString()[0],
					h = ~u.indexOf('+'),
					p = ~u.indexOf('*'),
					R = d[r] || '';
				if (!R && !p && (u.indexOf('?') < 0 || h)) {
					a = !1;
					break;
				}
				if (((i[l] = decodeURIComponent(R)), h || p)) {
					i[l] = d.slice(r).map(decodeURIComponent).join('/');
					break;
				}
			} else if (c[r] !== d[r]) {
				a = !1;
				break;
			}
		return a === !1 ? !1 : i;
	}
	function C(e) {
		if (typeof URL == 'function' && P) return new URL(e, window.location.toString());
		var n = window.document.createElement('a');
		return (n.href = e), n;
	}
	function k(e) {
		if (!e || !P) return !1;
		var n = C(e),
			t = window.location;
		return (
			t.protocol === n.protocol &&
			t.hostname === n.hostname &&
			(t.port === n.port || (t.port === '' && (n.port == '80' || n.port == '443')))
		);
	}
	function L(e) {
		if (!P) return !1;
		var n = window.location;
		return e.pathname === n.pathname && e.search === n.search;
	}
	function y(e, n) {
		let t = { valid: !1, link: '' };
		for (; e && e.nodeName.toUpperCase() !== 'A'; ) e = e.parentNode;
		if (!e || e.nodeName.toUpperCase() !== 'A') return t;
		var o = typeof e.href == 'object' && e.href.constructor.name === 'SVGAnimatedString';
		return (
			e.hasAttribute('download') ||
				e.getAttribute('rel') === 'external' ||
				((t.link = e.getAttribute('href') ?? ''), !n && L(e) && (e.hash || t.link === '#')) ||
				(t.link && t.link.indexOf('mailto:') > -1) ||
				(o ? e.target.baseVal : e.target) ||
				(!o && !k(e.href)) ||
				(t.valid = !0),
			t
		);
	}
	function x(e, n) {
		for (let t = 0; t < e.length; t++)
			if (typeof e[t] == 'function' && e[t](n) == 'stop') return !1;
		return !0;
	}
	function w(e, ...n) {
		if (!!window.PineconeRouterMiddlewares)
			for (let t in window.PineconeRouterMiddlewares) {
				let o = window.PineconeRouterMiddlewares[t];
				if (o[e] == null) return;
				if (o[e](...n) == 'stop') return 'stop';
			}
	}
	var S = {
		version: '3.1.1',
		name: 'pinecone-router',
		settings: { hash: !1, basePath: '/' },
		notfound: new m('notfound'),
		routes: [],
		currentContext: {},
		add(e, n) {
			if (this.routes.find((t) => t.path == e) != null)
				throw new Error('Pinecone Router: route already exist');
			this.routes.push(new m(e, n));
		},
		remove(e) {
			this.routes = this.routes.filter((n) => n.path != e);
		},
		loadStart: new Event('pinecone-start'),
		loadEnd: new Event('pinecone-end')
	};
	function A(e) {
		(window.PineconeRouter = e.reactive(S)),
			e.directive(
				'route',
				(n, { value: t, modifiers: o, expression: i }, { Alpine: a, effect: d, cleanup: c }) => {
					let s = i;
					if (s.indexOf('#') > -1)
						throw new Error("Pinecone Router: A route's path may not have a hash character.");
					w('onBeforeRouteProcessed', n, s),
						s != 'notfound' &&
							(window.PineconeRouter.settings.basePath != '/' &&
								(s = window.PineconeRouter.settings.basePath + s),
							window.PineconeRouter.add(s)),
						w('onAfterRouteProcessed', n, s);
				}
			),
			e.directive(
				'handler',
				(
					n,
					{ value: t, modifiers: o, expression: i },
					{ Alpine: a, effect: d, cleanup: c, evaluate: s }
				) => {
					if (!n.hasAttribute('x-route'))
						throw new Error('Pinecone Router: x-handler must be set alongside x-route.');
					let r;
					!(i.startsWith('[') && i.endsWith(']')) &&
						!(i.startsWith('Array(') && i.endsWith(')')) &&
						(i = `[${i}]`);
					let l = s(i),
						u = n.getAttribute('x-route');
					if (typeof l == 'object') r = l;
					else throw new Error(`Pinecone Router: Invalid handler type: ${typeof l}.`);
					if (u == 'notfound') window.PineconeRouter.notfound.handlers = r;
					else {
						window.PineconeRouter.settings.basePath != '/' &&
							(u = window.PineconeRouter.settings.basePath + u);
						let h = window.PineconeRouter.routes.findIndex((p) => p.path == u);
						window.PineconeRouter.routes[h].handlers = r;
					}
				}
			),
			e.magic('router', (n, t) => window.PineconeRouter.currentContext),
			document.addEventListener('alpine:initialized', () => {
				w('init'),
					window.PineconeRouter.settings.hash
						? f(window.location.hash.substring(1), !1, !0)
						: f(window.location.pathname, !1, !0);
			}),
			window.addEventListener('popstate', () => {
				window.PineconeRouter.settings.hash
					? window.location.hash != '' && f(window.location.hash.substring(1), !0)
					: f(window.location.pathname, !0);
			}),
			U();
	}
	function U() {
		window.document.body.addEventListener(
			document.ontouchstart ? 'touchstart' : 'click',
			function (e) {
				if (e.metaKey || e.ctrlKey || e.shiftKey || e.detail != 1 || e.defaultPrevented) return;
				let n = e.target,
					t = e.composedPath();
				if (t) {
					for (let i = 0; i < t.length; i++)
						if (!!t[i].nodeName && t[i].nodeName.toUpperCase() === 'A' && !!t[i].href) {
							n = t[i];
							break;
						}
				}
				if (n == null || n.hasAttribute('native')) return;
				let o = y(n, window.PineconeRouter.settings.hash);
				!o.valid ||
					(e.stopImmediatePropagation && e.stopImmediatePropagation(),
					e.stopPropagation && e.stopPropagation(),
					e.preventDefault(),
					f(o.link));
			}
		);
	}
	function f(e, n = !1, t = !1) {
		e || (e = '/'),
			(window.PineconeRouter.currentContext.path = e),
			window.PineconeRouter.settings.hash ||
				(window.PineconeRouter.settings.basePath != '/' &&
					!e.startsWith(window.PineconeRouter.settings.basePath) &&
					(e = window.PineconeRouter.settings.basePath + e),
				e == window.PineconeRouter.settings.basePath && !e.endsWith('/') && (e += '/'));
		let o = window.PineconeRouter.routes.find((a) => {
				let d = b(e, a.path);
				return (a.params = d != !1 ? d : {}), d != !1;
			}),
			i = typeof o > 'u' ? E('notfound', e, []) : E(o.path, e, o.params);
		if (
			((window.PineconeRouter.currentContext = i), w('onBeforeHandlersExecuted', o, e, t) != 'stop')
		) {
			if (!n) {
				let a = '';
				if (
					(window.PineconeRouter.settings.hash
						? ((a = '#'), (a += window.location.search + e))
						: (a = e + window.location.search + window.location.hash),
					!t)
				)
					history.pushState({ path: a }, '', a);
				else if (window.PineconeRouter.settings.hash && e == '/') return f('/', !1, !1);
			}
			if (
				((!o && !!window.PineconeRouter.notfound.handlers) || (o && !!o.handlers)) &&
				!x(o?.handlers ?? window.PineconeRouter.notfound.handlers, i)
			) {
				window.dispatchEvent(window.PineconeRouter.loadEnd);
				return;
			}
			w('onHandlersExecuted', o, e, t);
		}
	}
	function E(e, n, t) {
		return {
			route: e,
			path: n,
			params: t,
			query: window.location.search.substring(1),
			hash: window.location.hash.substring(1),
			redirect(o) {
				return f(o), 'stop';
			},
			navigate(o) {
				f(o);
			}
		};
	}
	document.addEventListener('alpine:init', () => {
		window.Alpine.plugin(A);
	});
})();
//# sourceMappingURL=router.min.js.map
Copied;
