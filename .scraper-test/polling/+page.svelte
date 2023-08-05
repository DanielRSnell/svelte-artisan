<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	export let data;

	// Initialize the store with the initial HTML content
	let blockStore = writable(data.props.bodyContent);

	/**
	 * @type {number | undefined}
	 */
	let pollingInterval;
	onMount(async () => {
		console.log('page', page);
		pollingInterval = setInterval(async () => {
			try {
				// Fetch the current page content from the server
				const response = await fetch('/');
				const pageData = await response.text();
				// Update the store with the new HTML content
				blockStore.set(pageData);
			} catch (error) {
				console.error('Error updating HTML content:', error);
			}
		}, 5000); // Poll every 5 seconds
	});

	onDestroy(() => {
		if (pollingInterval) {
			clearInterval(pollingInterval);
		}
	});
</script>

<main>
	<!-- Use the {@html} tag to render the HTML from the store -->
	{@html $blockStore}
</main>
