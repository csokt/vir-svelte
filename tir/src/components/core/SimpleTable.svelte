<script>
  import { createEventDispatcher } from 'svelte'

  export let data
  export let selected
  export let rowClass
  export let columns

  $: _columns = columns || Object.keys(data[0] || {}).map(i => ({ label: (i || "").replace("_", " "), field: i }))

  const dispatch = createEventDispatcher()
</script>

<table>
  <thead class="items-center">
    {#each _columns as column, i}
      <th>
        <span>{column.label || column.field}</span>
      </th>
    {/each}
  </thead>
  <tbody>
    {#each data as row, index}
      <tr class="{rowClass && rowClass(row)}"
        on:click={() => { selected = row; dispatch('select') }}
      >
        {#each _columns as column, i}
          <td class={column.class}>
            {#if column.value}
              {@html column.value(row)}
            {:else}
              {@html row[column.field]}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
