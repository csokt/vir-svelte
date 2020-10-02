<script>
	import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'
  import {push, pop, replace} from 'svelte-spa-router'
  import Button from 'smelte/src/components/Button'
  import Checkbox from 'smelte/src/components/Checkbox'
  import TextField from "smelte/src/components/TextField"
  import Select from 'smelte/src/components/Select'
  import QrTextField from './core/QrTextField.svelte'

  export let card
  export let hidden

	const dispatch = createEventDispatcher()
  let disableFields = false

  function updateState() {
    for (const id in card.fields) {
      if (card.fields.hasOwnProperty(id)) {
        const field = card.fields[id]
        for (const prop in field) {
          if (field.hasOwnProperty(prop)) {
            const splits = prop.split('State')
            if (splits.length > 1) {
              field[splits[0]] = field[prop](card.fields)
            }
          }
        }
      }
    }
  }

  function exec_function(func) {
    if (!func) return
    disableFields = true
    const func_returned = func(card.fields)
    Promise.resolve(func_returned).then(result => { updateState(); dispatch('change') })
    .catch(error => console.log(error))
    .finally(() => { disableFields = false; card = card })
  }

  onMount(() => {
    if (card.hasOwnProperty('onMount')) {
      exec_function(card.onMount)
    } else {
      updateState()
    }
  })

</script>

<div hidden={hidden} class="Card w-full max-w-sm p-2 mb-6 border shadow-xl">
  {#if card.name}
    <div class="text-gray-500 text-lg py-1">{card.name}</div>
    <hr />
  {/if}
  {#each card.elements as element}
    <div hidden={card.fields[element.id].hidden}>
      {#if element.type === "line"}
        <hr />
      {/if}

      {#if element.type === "menu"}
        <div class="text-primary-600 text-lg py-2" on:click={() => push(element.path)}>
          {element.name}
        </div>
        <hr />
      {/if}

      {#if element.type === "list"}
        {#each card.fields[element.id].value as row}
          <div> {row[element.labelid]} </div>
          <div> {row[element.valueid]} </div>
          <hr />
        {/each}
      {/if}

      {#if element.type === "button"}
        <div class="py-2">
          <Button
            disabled={disableFields || card.fields[element.id].disabled}
            {...element.attributes}
            on:click={exec_function(element.onClick)}
          >
            {element.name}
          </Button>
        </div>
      {/if}

      {#if element.type === "buttongroup"}
        <div class="flex flex-row justify-start py-2">
          {#each element.buttons as button}
            <div class="pr-4" hidden={card.fields[button.id].hidden}>
              <Button
                disabled={disableFields || card.fields[button.id].disabled}
                {...button.attributes}
                on:click={exec_function(button.onClick)}
              >
                {button.name}
              </Button>
            </div>
          {/each}
        </div>
      {/if}

      {#if element.type === "checkbox"}
        <Checkbox
          label={element.name}
          bind:checked={card.fields[element.id].value}
          disabled={disableFields}
          {...element.attributes}
          on:change={exec_function(element.onChange)}
        />
      {/if}

      {#if element.type === "text"}
        <TextField
          label={element.name}
          bind:value={card.fields[element.id].value}
          disabled={disableFields}
          {...element.attributes}
          on:change={exec_function(element.onChange)}
        />
      {/if}

      {#if element.type === "qrtext"}
        <QrTextField
          label={element.name}
          bind:value={card.fields[element.id].value}
          disabled={disableFields}
          attributes={element.attributes}
          on:change={exec_function(element.onChange)}
        />
      {/if}

      {#if element.type === "select"}
        <Select
          label={element.name}
          bind:value={card.fields[element.id].value}
          items={card.fields[element.id].items}
          append=""
          disabled={disableFields}
          {...element.attributes}
        />
      {/if}
    </div>
  {/each}
</div>
