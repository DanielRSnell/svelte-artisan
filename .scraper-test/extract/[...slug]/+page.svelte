<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  export let data;
  let html = 'Editor is initializing...';
  let arr_html;
  let Editor;
  let isEditorMode = false; // Default is false (Editor mode is off)
  
  onMount(async () => {
    const module = await import('tailwind-editor');
    Editor = module.default;
    arr_html = [{html: data.props.bodyContent, klass: 'p-2 text-3xl'}];
  });
  
  // Function to toggle the editor mode
  function toggleEditorMode() {
    isEditorMode = !isEditorMode;
  }
</script>

<header class="bg-blue-500 text-white p-4">
  <button 
    class="px-4 py-2 border rounded-md text-blue-500 bg-white"
    on:click={toggleEditorMode}>
    {isEditorMode ? 'Exit Editor Mode' : 'Enter Editor Mode'}
  </button>
</header>

{#if browser}
  {#if isEditorMode}
    <main class="bg-white">
      <svelte:component this={Editor} bind:html={html} {arr_html} editable />
    </main>
  {:else}
    <main class="bg-white">
      <div class="p-2 text-3xl">
        {@html data.props.bodyContent}
      </div>
    </main>
  {/if}
{:else}
  <main class="bg-white">
    <div class="p-2 text-3xl">
      <p>Sorry, this page is not available in SSR mode.</p>
      <p>Please try again in CSR mode.</p>
    </div>
  </main>
{/if}
