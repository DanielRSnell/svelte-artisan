<script lang="ts">
	import { browser } from '$app/environment';
	import '../app.css';
</script>

<svelte:head>
	{#if browser}
		<script src="https://media.domartisan.com/scripts/htmx/core.js"></script>
		<script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
	{/if}
</svelte:head>

<div class="svelte-wrapper flex flex-col justify-start items-stretch w-full">
	<slot />
</div>

<style>
	body > div > .skip-link {
		display: none;
	}
</style>
