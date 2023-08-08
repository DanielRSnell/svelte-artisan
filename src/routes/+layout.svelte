<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import '../app.css';
	  let morphdom;

  onMount(async () => {
    morphdom = (await import('morphdom')).default;
    // Now you can use morphdom here
  });
</script>

<div class="svelte-wrapper flex flex-col justify-start items-stretch w-full">
	<slot />
</div>

<style>
	body > div > .skip-link {
		display: none;
	}
</style>
