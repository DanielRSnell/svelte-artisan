<script lang='ts'>
	import { browser } from '$app/environment';
	import '../app.css';
	import '../bricks.css';
	import '../automatic.css';
	import '../frames.css';
</script>


	<svelte:head>
{#if browser}
	<script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
		<script src="https://unpkg.com/htmx.org@1.9.4"></script>
{/if}
	</svelte:head>

<slot />
