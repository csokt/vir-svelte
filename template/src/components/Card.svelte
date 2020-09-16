<script>
  import { onMount } from 'svelte'
  import {push, pop, replace} from 'svelte-spa-router'
  import Card from 'smelte/src/components/Card'
  import Button from 'smelte/src/components/Button'
  import TextField from "smelte/src/components/TextField"
  import Select from 'smelte/src/components/Select'
  import QrTextField from './core/QrTextField.svelte'

  export let card
  let fields = card.fields
  let disableFields = false

  function exec_function(func) {
    if (!func) return
    disableFields = true
    const func_returned = func(fields)
    Promise.resolve(func_returned).then(result => {})
    .catch(error => console.log(error))
    .finally(() => { disableFields = false; fields = fields })
  }

	onMount(() => {
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        const field = fields[key]
        if (field.hasOwnProperty('onMount')) {
          exec_function(field.onMount)
        }
      }
    }
	})

</script>

<div class="inline-flex flex-col">
  <div>{card.name}</div>
  {#each card.elements as element}
    <div>
      {#if element.type === "menu"}
        <div on:click={() => push(element.path)}>
          {element.name}
        </div>
        <hr />
      {/if}

      {#if element.type === "list"}
        {#each fields[element.id].value as row}
          <div> {row[element.labelid]} </div>
          <div> {row[element.valueid]} </div>
          <hr />
        {/each}
      {/if}

      {#if element.type === "button"}
        <Button
          disabled={disableFields}
          {...element.attributes}
          on:click={exec_function(element.onClick)}
        >
          {element.name}
        </Button>
      {/if}

      {#if element.type === "text"}
        <TextField
          label={element.name}
          bind:value={fields[element.id].value}
          disabled={disableFields}
          {...element.attributes}
          on:change={exec_function(element.onChange)}
        />
      {/if}

      {#if element.type === "qrtext"}
        <QrTextField
          label={element.name}
          bind:value={fields[element.id].value}
          disabled={disableFields}
          attributes={element.attributes}
          on:change={exec_function(element.onChange)}
        />
      {/if}

      {#if element.type === "select"}
        <Select
          label={element.name}
          bind:value={fields[element.id].value}
          items={fields[element.id].items}
          append=""
          disabled={disableFields}
          {...element.attributes}
        />
      {/if}
    </div>
  {/each}
</div>
