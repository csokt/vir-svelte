<script>
  export let fields
  export let data

</script>

<main>
	{#each fields as field}
    <div>
      {#if field.type === 'text'}
        {field.name} <input bind:value={data[field.id]} type=text {...field.attributes}>
      {/if}
      {#if field.type === 'number'}
        {field.name} <input bind:value={data[field.id]} type=number {...field.attributes}>
      {/if}

    </div>
	{/each}
</main>
