<script>
  export let form
  let disableFields = false

  function exec_function(func) {
    disableFields = true
    const func_returned = func(form)
    if (Promise.resolve(func_returned) == func_returned) {
      console.log('promise')
    } else {
      console.log('not promise')
    }
    Promise.resolve(func_returned).then(result => console.log(result))
    .catch(error => console.log(error))
    .finally(() => {disableFields = false; form.data = form.data})
    // form.data = form.data
  }

</script>

<main>
  {form.name}
	{#each form.fields as field}
    <div>
      {#if field.type === "text"}
        {field.label || field.name}
        <input type=text
          bind:value={form.data[field.valueid || field.id]}
          disabled={disableFields}
          {...field.attributes}
        >
      {/if}
      {#if field.type === "number"}
        {field.label || field.name}
        <input type=number
          bind:value={form.data[field.valueid || field.id]}
          disabled={disableFields}
          {...field.attributes}
        >
      {/if}
      {#if field.type === "button"}
        <button type="button"
          on:click={exec_function(field.onclick)}
          disabled={disableFields || field.disabled && field.disabled(form)}
        >
          {field.label || field.name}
        </button>
      {/if}

    </div>
	{/each}
</main>
