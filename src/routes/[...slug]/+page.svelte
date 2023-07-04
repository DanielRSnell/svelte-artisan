<script type="ts">
    import { page } from '$app/stores';
    let bodyContentKey = 0;
    let bodyContent = '';

    $: {
        // Assuming `data` comes from $page
        if ($page.data?.props?.bodyContent) {
            bodyContent = $page.data.props.bodyContent;
            bodyContentKey++; // increment the key to force a re-render
        }
    }
</script>

{#each [bodyContent] as html (bodyContentKey)}
    {@html html}
{/each}
