<script type="ts">
    export let data;
    const { bodyContent } = data.props;

</script>

<main class="bg-white">
{@html bodyContent}
</main>