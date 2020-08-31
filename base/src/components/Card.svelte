<script>
  import {push, pop, replace} from 'svelte-spa-router'
  import { Button, TextField } from 'attractions'

  export let card
  export let data

  let disableFields = false

  function exec_function(func) {
    disableFields = true
    const func_returned = func(data)
    // if (Promise.resolve(func_returned) == func_returned) {
    //   console.log('promise')
    // } else {
    //   console.log('not promise')
    // }
    Promise.resolve(func_returned).then(result => console.log(result))
    .catch(error => console.log(error))
    .finally(() => {disableFields = false; data = data})
  }

</script>

<main>
  <hr />
  {card.name}
	{#each card.elements as element}
    <div>
      {#if element.type === "menu"}
        <div on:click={() => push(element.path)}>
          {element.name}
        </div>
        <hr />
      {/if}
      {#if element.type === "list"}
        {#each data[element.id] as row}
          <div> {row[element.labelid]} </div>
          <div> {row[element.valueid]} </div>
          <hr />
        {/each}
      {/if}
      {#if element.type === "Xtext"}
        {element.label || element.name}
        <input type=text
          bind:value={data[element.valueid || element.id]}
          disabled={disableFields}
          {...element.attributes}
        >
      {/if}

      {#if element.type === "text"}
        <TextField
          outline
          label={element.label || element.name}
          bind:value={data[element.valueid || element.id]}
          disabled={disableFields}
          {...element.attributes}
        />
      {/if}

      {#if element.type === "Xnumber"}
        {element.label || element.name}
        <input type=number
          bind:value={data[element.valueid || element.id]}
          disabled={disableFields}
          {...element.attributes}
        >
      {/if}

      {#if element.type === "number"}
        <TextField
          type=number
          outline
          label={element.label || element.name}
          bind:value={data[element.valueid || element.id]}
          disabled={disableFields}
          {...element.attributes}
        />
      {/if}

      {#if element.type === "Xbutton"}
        <button type="button"
          on:click={exec_function(element.onclick)}
          disabled={disableFields || element.disabled && element.disabled(data)}
        >
          {element.label || element.name}
        </button>
      {/if}

      {#if element.type === "button"}
        <Button
          filled
          on:click={exec_function(element.onclick)}
          disabled={disableFields || element.disabled && element.disabled(data)}
          {...element.attributes}
        >
          {element.label || element.name}
        </Button>
      {/if}
    </div>
	{/each}
</main>
