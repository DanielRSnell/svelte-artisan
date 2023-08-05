<script type="ts">
	import { browser } from '$app/environment';
	export let data;

	const { bodyContent } = data.props;
</script>

{@html bodyContent}
