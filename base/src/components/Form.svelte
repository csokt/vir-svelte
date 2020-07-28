<script>
  export let form

</script>

<main>
	{#each form.fields as field}
    <div>
      {#if field.type === "text"}
        {field.label || field.name}
        <input bind:value={form.data[field.valueid || field.id]} type=text {...field.attributes}>
      {/if}
      {#if field.type === "number"}
        {field.label || field.name}
        <input bind:value={form.data[field.valueid || field.id]} type=number {...field.attributes}>
      {/if}
      {#if field.type === "button"}
        <button type="button"
          on:click={() => {field.onclick(form); form.data = form.data} }
          disabled={field.disabled && field.disabled(form)}
        >
          {field.label || field.name}
        </button>
      {/if}

    </div>
	{/each}
</main>
