<script lang="ts">
	import { browser } from '$app/environment';
	import '../app.css';
</script>

<div class="svelte-wrapper flex flex-col justify-start items-stretch w-full">
	<slot />
</div>

{#if browser}

		<script src="https://media.domartisan.com/scripts/htmx/core.js"></script>
		<!-- <script src="https://unpkg.com/htmx.org/dist/ext/morphdom-swap.js"></script> -->

{/if}

<style>
	body > div > .skip-link {
		display: none;
	}
</style>
