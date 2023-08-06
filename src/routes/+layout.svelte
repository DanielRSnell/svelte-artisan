<script lang="ts">
	import { browser } from '$app/environment';
	import '../app.css';
</script>

<div class="svelte-wrapper flex flex-col justify-start items-stretch w-full">
	<slot />
</div>

<style>
	body > div > .skip-link {
		display: none;
	}
</style>
