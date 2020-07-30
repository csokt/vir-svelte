<script>
  export let card
  let disableFields = false

  function exec_function(func) {
    disableFields = true
    const func_returned = func(card)
    if (Promise.resolve(func_returned) == func_returned) {
      console.log('promise')
    } else {
      console.log('not promise')
    }
    Promise.resolve(func_returned).then(result => console.log(result))
    .catch(error => console.log(error))
    .finally(() => {disableFields = false; card.data = card.data})
    // card.data = card.data
  }

</script>

<main>
  {card.name}
	{#each card.elements as element}
    <div>
      {#if element.type === "text"}
        {element.label || element.name}
        <input type=text
          bind:value={card.data[element.valueid || element.id]}
          disabled={disableFields}
          {...element.attributes}
        >
      {/if}
      {#if element.type === "number"}
        {element.label || element.name}
        <input type=number
          bind:value={card.data[element.valueid || element.id]}
          disabled={disableFields}
          {...element.attributes}
        >
      {/if}
      {#if element.type === "button"}
        <button type="button"
          on:click={exec_function(element.onclick)}
          disabled={disableFields || element.disabled && element.disabled(card)}
        >
          {element.label || element.name}
        </button>
      {/if}
      {#if element.type === "list"}
        {#each card.data[element.id] as row}
          <div> {row[element.labelid]} </div>
          <div> {row[element.valueid]} </div>
          <hr />
        {/each}
      {/if}

    </div>
	{/each}
</main>
