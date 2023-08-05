<script type="ts">
	import { browser } from '$app/environment';
	export let data;

	const { bodyContent } = data.props;
</script>

<svelte:head>
	{#if browser}
		<script src="/scripts/anime/core.js" defer></script>
	{/if}
</svelte:head>

{@html bodyContent}
