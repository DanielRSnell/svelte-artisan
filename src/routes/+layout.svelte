<script lang='ts'>
import { browser } from '$app/environment';
import '../app.css';

	// // The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	// import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file

	
</script>

<svelte:head>
	{#if browser}
		<script src="/scripts/alpine/core.js" defer />
		
	{/if}
</svelte:head>

<slot />