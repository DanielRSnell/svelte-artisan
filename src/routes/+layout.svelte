<script lang='ts'>
	import { browser } from '$app/environment';
	import '../app.css';
</script>


	<svelte:head>
{#if browser}
	<script src="https://media.domartisan.com/scripts/htmx/core.js"></script>
	<script src="https://media.domartisan.com/scripts/_hyperscript/core.js"></script>
{/if}
	</svelte:head>

<slot />
