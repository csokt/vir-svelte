<script>
  import {push, pop, replace} from 'svelte-spa-router'
  // import { Button, TextField } from 'attractions'
  import Button from 'smelte/src/components/Button'
  import TextField from "smelte/src/components/TextField"
  import Select from 'smelte/src/components/Select'

  export let card
  export let data

  let disableFields = false

  function exec_function(func) {
    console.log('disableFields =', disableFields)
    disableFields = true
    console.log('disableFields =', disableFields)
    const func_returned = func(data)
    // if (Promise.resolve(func_returned) == func_returned) {
    //   console.log('promise')
    // } else {
    //   console.log('not promise')
    // }
    Promise.resolve(func_returned).then(result => console.log(result))
    .catch(error => console.log(error))
    .finally(() => {console.log('finally'); disableFields = false; console.log('disableFields =', disableFields); data = data})
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

      {#if element.type === "button"}
        <Button
          on:click={exec_function(element.onclick)}
          disabled={disableFields}
          {...element.attributes}
        >
          {element.name}
        </Button>
      {/if}

      {#if element.type === "text"}
        <TextField
          label={element.name}
          bind:value={data[element.id]}
          disabled={disableFields}
          {...element.attributes}
        />
      {/if}

      {#if element.type === "select"}
        <Select
          label={element.name}
          bind:value={data[element.id].value}
          items={data[element.id].items}
          append=""
          disabled={disableFields}
          {...element.attributes}
        />
      {/if}
    </div>
	{/each}
</main>
          <!-- disabled={disableFields || data['text_field']} -->
          <!-- disabled={disableFields || element.disabled && element.disabled(data)} -->
