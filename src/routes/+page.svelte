<script lang="ts">
	import { onMount } from 'svelte';
	import anime from 'animejs';
	import { fade } from 'svelte/transition';

	export let data;

	const { bodyContent } = data.props;

	function fitElementToParent(el, padding) {
		var timeout = null;

		function resize() {
			if (timeout) clearTimeout(timeout);
			anime.set(el, {
				scale: 1
			});
			var pad = padding || 0;
			var parentEl = el.parentNode;
			var elOffsetWidth = el.offsetWidth - pad;
			var parentOffsetWidth = parentEl.offsetWidth;
			var ratio = parentOffsetWidth / elOffsetWidth;
			timeout = setTimeout(
				anime.set(el, {
					scale: ratio
				}),
				10
			);
		}
		resize();
		window.addEventListener('resize', resize);
	}

	function sphereAnimation() {
		var sphereEl = document.querySelector('.sphere-animation');
		var spherePathEls = sphereEl.querySelectorAll('.sphere path');
		var pathLength = spherePathEls.length;
		var animations = [];
		fitElementToParent(sphereEl);
		var breathAnimation = anime({
			begin: function () {
				for (var i = 0; i < pathLength; i++) {
					animations.push(
						anime({
							targets: spherePathEls[i],
							stroke: {
								value: ['rgba(2, 6, 23, .2)', 'rgba(203, 213, 225, .15)'],
								duration: 500
							},
							translateX: [2, -4],
							translateY: [2, -4],
							easing: 'easeOutQuad',
							autoplay: false
						})
					);
				}
			},
			update: function (ins) {
				animations.forEach(function (animation, i) {
					var percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
					animation.seek(animation.duration * percent);
				});
			},
			duration: Infinity,
			autoplay: false
		});
		var introAnimation = anime
			.timeline({
				autoplay: false
			})
			.add(
				{
					targets: spherePathEls,
					strokeDashoffset: {
						value: [anime.setDashoffset, 0],
						duration: 3900,
						easing: 'easeInOutCirc',
						delay: anime.stagger(190, {
							direction: 'reverse'
						})
					},
					duration: 2000,
					delay: anime.stagger(60, {
						direction: 'reverse'
					}),
					easing: 'linear'
				},
				0
			);
		var shadowAnimation = anime(
			{
				targets: '#sphereGradient',
				x1: '25%',
				x2: '25%',
				y1: '0%',
				y2: '75%',
				duration: 30000,
				easing: 'easeOutQuint',
				autoplay: false
			},
			0
		);
		introAnimation.play();
		breathAnimation.play();
		shadowAnimation.play();
	}

	onMount(sphereAnimation);
</script>

<section hx-push-url="true">
	<div class="flex gap-4 px-2 py-4 bg-slate-100 items-center">
		<h3 class="text-base font-sans text-slate-800/40">HTMX Actions:</h3>
		<button
			class="px-4 py-2 rounded-lg border bg-white border-slate-500"
			hx-get="/blog"
			hx-swap="outerHTML"
			hx-select=".wrapper"
			hx-target=".wrapper"
			hx-trigger="click"
			hx-swap-oob="true">Fetch Blog</button
		>
		<button
			class="px-4 py-2 rounded-lg border bg-white border-slate-500"
			hx-get="/home-page"
			hx-swap="outerHTML"
			hx-select=".wrapper"
			hx-target=".wrapper"
			hx-trigger="click"
			hx-swap-oob="true">Fetch Home</button
		>
		<button
			class="px-4 py-2 rounded-lg border bg-white border-slate-500"
			hx-get="/login"
			hx-swap="outerHTML"
			hx-select=".wrapper"
			hx-target=".wrapper"
			hx-trigger="click"
			hx-swap-oob="true">Login</button
		>
	</div>
</section>


<main transition:fade>{@html bodyContent}</main>
