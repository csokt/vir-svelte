<script>
  import { createEventDispatcher } from 'svelte'

  export let data
  export let selected
  export let rowClass
  export let rows

  $: _rows = rows || Object.keys(data[0] || {}).map(i => ({ label: (i || "").replace("_", " "), field: i }))

  const dispatch = createEventDispatcher()
</script>

{#each data as item, index}
  <div class="{rowClass ? rowClass(item) : 'py-2'}"
    on:click={() => { selected = item; dispatch('select') }}
  >
    {#each _rows as row, i}
      <div class={row.class}>
        {#if row.value}
          {@html row.value(item)}
        {:else}
          {@html item[row.field]}
        {/if}
      </div>
    {/each}
  </div>
  <hr>
{/each}
