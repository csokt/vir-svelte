<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'

  export let data = []
  export let selected = null
  export let rowClass
  export let columns = Object.keys(data[0] || {}).map(i => ({ label: (i || "").replace("_", " "), field: i }))

  const dispatch = createEventDispatcher()


	onMount(async () => {
	})

  onDestroy(() => {
  })
</script>

<table>
  <thead class="items-center">
    {#each columns as column, i}
      <th>
        <span>{column.label || column.field}</span>
      </th>
    {/each}
  </thead>
  <tbody>
    {#each data as item, index}
      <tr class="{rowClass && rowClass(item)}"
        on:click={() => { selected = item; dispatch('select') }}
      >
        {#each columns as column, i}
          <td>
            {#if column.value}
              {@html column.value(item)}
            {:else}
              {@html item[column.field]}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
