import {
	S as r,
	i as m,
	s as c,
	J as h,
	e as l,
	K as d,
	b as f,
	H as o,
	h as p
} from '../chunks/index.0ab83589.js';
function _(s) {
	let a, e;
	return {
		c() {
			(a = new h(!1)), (e = l()), this.h();
		},
		l(t) {
			(a = d(t, !1)), (e = l()), this.h();
		},
		h() {
			a.a = e;
		},
		m(t, n) {
			a.m(s[0], t, n), f(t, e, n);
		},
		p: o,
		i: o,
		o,
		d(t) {
			t && p(e), t && a.d();
		}
	};
}
function u(s, a, e) {
	let { data: t } = a;
	const { bodyContent: n } = t.props;
	return (
		(s.$$set = (i) => {
			'data' in i && e(1, (t = i.data));
		}),
		[n, t]
	);
}
class g extends r {
	constructor(a) {
		super(), m(this, a, u, _, c, { data: 1 });
	}
}
export { g as component };
