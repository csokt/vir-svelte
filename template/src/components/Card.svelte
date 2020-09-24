<script>
  import { onMount } from 'svelte'
  import {push, pop, replace} from 'svelte-spa-router'
  import Card from 'smelte/src/components/Card'
  import Button from 'smelte/src/components/Button'
  import Checkbox from 'smelte/src/components/Checkbox'
  import TextField from "smelte/src/components/TextField"
  import Select from 'smelte/src/components/Select'
  import QrTextField from './core/QrTextField.svelte'

  export let card
  let fields = card.fields
  let disableFields = false

  function updateState() {
    for (const id in fields) {
      if (fields.hasOwnProperty(id)) {
        const field = fields[id]
        for (const prop in field) {
          if (field.hasOwnProperty(prop)) {
            const splits = prop.split('State')
            if (splits.length > 1) {
              field[splits[0]] = field[prop](fields)
            }
          }
        }
      }
    }
  }

  function exec_function(func) {
    if (!func) return
    disableFields = true
    const func_returned = func(fields)
    Promise.resolve(func_returned).then(result => { updateState() })
    .catch(error => console.log(error))
    .finally(() => { disableFields = false; fields = fields })
  }

	onMount(() => {
    if (card.hasOwnProperty('onMount')) {
      exec_function(card.onMount)
    } else {
      updateState()
    }
	})

</script>

<div class="Card w-full max-w-sm p-2 mb-6 border shadow-xl">
  {#if card.name}
    <div class="text-gray-500 text-lg py-1">{card.name}</div>
    <hr />
  {/if}
  {#each card.elements as element}
    {#if element.type === "menu"}
      <div class="text-primary-600 text-lg py-1" on:click={() => push(element.path)}>
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
      <div class="py-2">
        <Button
          disabled={disableFields || fields[element.id].disabled}
          {...element.attributes}
          on:click={exec_function(element.onClick)}
        >
          {element.name}
        </Button>
      </div>
    {/if}

    {#if element.type === "checkbox"}
      <Checkbox
        label={element.name}
        bind:checked={fields[element.id].value}
        disabled={disableFields}
        {...element.attributes}
        on:change={exec_function(element.onChange)}
      />
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
  {/each}
</div>
