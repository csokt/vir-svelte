<script>
	import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'
  import {push, pop, replace} from 'svelte-spa-router'
  import { Button, Checkbox, Textfield } from 'svelte-mui'
  import { debug } from '../stores.js'
  import QrTextField from './core/QrTextField.svelte'
  import SimpleList from './core/SimpleList.svelte'
  import SimpleObject from './core/SimpleObject.svelte'
  import SimpleTable from './core/SimpleTable.svelte'
  import Tags from './core/Tags.svelte'
  import TimePicker from './core/TimePicker.svelte'

  export let card
  export let hidden = false
  const fields = card.fields  // not reactive

  $: console.log('Card changed', card)

	const dispatch = createEventDispatcher()
  let disableFields = false

  $: {
    for (const id in card.fields) {
      if (card.fields.hasOwnProperty(id)) {
        const field = card.fields[id]
        for (const key in field.states) {
          if (field.states.hasOwnProperty(key)) {
            field[key] = field.states[key](card.fields)
            if (debug) console.log('Card', card.id, 'updateState field', field)

          }
        }
      }
    }
  }

  function exec_function(func, message) {
    if (!func) {
      card = card
      dispatch('event', message)
      return
    }
    if (debug) console.log('Card exec_function', message, '\n  ', func)
    disableFields = true
    const func_returned = func(card.fields, message)
    Promise.resolve(func_returned).then(result => {
      dispatch('event', message)
    })
    .catch(error => console.log('Card', card.id, 'error:', error))
    .finally(() => { disableFields = false; card = card })
  }

  onMount(() => {
    if (debug) console.log('Card', card.id, 'mounted')
    if (card.hasOwnProperty('onMount')) {
      exec_function(card.onMount, {message: 'mount', cardid: card.id})
    }
  })

</script>

<div hidden={hidden} class="Card w-full max-w-sm p-2 mb-6 border shadow-xl">
  {#if card.name}
    <div class="text-gray-500 text-lg py-1">{card.name}</div>
    <hr>
  {/if}
  {#each card.elements as element}
    <div hidden={card.fields[element.id].hidden}>
      {#if element.type === "menu"}
        <div class="text-gray-700 text-lg py-2" on:click={() => push(element.path)}>
          {element.name}
        </div>
        <hr>
      {/if}

      {#if element.type === "line"}
        <div class="{element.class ? element.class : 'pt-2'}">
          <hr>
        </div>
      {/if}

      {#if element.type === "button"}
        <div class="py-2">
          <Button
            raised
            color={card.fields[element.id].color || 'primary'}
            disabled={disableFields || card.fields[element.id].disabled}
            {...element.attributes}
            on:click={exec_function(element.onClick, {event: 'click', cardid: card.id, fieldid: element.id})}
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
                on:click={exec_function(button.onClick, {event: 'click', cardid: card.id, fieldid: button.id})}
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
          bind:checked={fields[element.id].value}
          disabled={disableFields || card.fields[element.id].disabled}
          {...element.attributes}
          on:change={exec_function(element.onChange, {event: 'change', cardid: card.id, fieldid: element.id, value: fields[element.id].value})}
        >
          <span>{element.name}</span>
        </Checkbox>
      {/if}

      {#if element.type === "text"}
        <Textfield
          dense
          label={element.name}
          bind:value={fields[element.id].value}
          disabled={disableFields || card.fields[element.id].disabled}
          readonly={card.fields[element.id].readonly}
          error={card.fields[element.id].error}
          {...element.attributes}
          on:change={exec_function(element.onChange, {event: 'change', cardid: card.id, fieldid: element.id, value: fields[element.id].value})}
        />
      {/if}

      {#if element.type === "qrtext"}
        <QrTextField
          label={element.name}
          bind:value={fields[element.id].value}
          disabled={disableFields || card.fields[element.id].disabled}
          readonly={card.fields[element.id].readonly}
          error={card.fields[element.id].error}
          attributes={element.attributes}
          on:change={exec_function(element.onChange, {event: 'change', cardid: card.id, fieldid: element.id, value: fields[element.id].value})}
        />
      {/if}

      {#if element.type === "time"}
        <TimePicker
          dense
          label={element.name}
          bind:time={fields[element.id].value}
          disabled={disableFields || card.fields[element.id].disabled}
          readonly={card.fields[element.id].readonly}
          {...element.attributes}
          on:change={exec_function(element.onChange, {event: 'change', cardid: card.id, fieldid: element.id, value: fields[element.id].value})}
        />
      {/if}

      {#if element.type === "tags"}
        <Tags
          placeholder={element.name}
          bind:tags={fields[element.id].value}
          disabled={disableFields || card.fields[element.id].disabled}
          attributes={element.attributes}
          on:tags={exec_function(element.onChange, {event: 'change', cardid: card.id, fieldid: element.id, value: fields[element.id].value})}
        />
      {/if}

      <!-- {#if element.type === "select"}
        <Select
          label={element.name}
          bind:value={fields[element.id].value}
          items={card.fields[element.id].items}
          append=""
          disabled={disableFields || card.fields[element.id].disabled}
          {...element.attributes}
          on:change={exec_function(element.onChange, {event: 'change', cardid: card.id, fieldid: element.id, value: fields[element.id].value})}
        />
      {/if} -->

      {#if element.type === "simplelist"}
        <SimpleList
          data={fields[element.id].value}
          bind:selected={fields[element.id].selected}
          rowClass={fields[element.id].rowClass}
          rows={fields[element.id].rows}
          on:select={exec_function(element.onSelect, {event: 'select', cardid: card.id, fieldid: element.id, value: fields[element.id].selected})}
          {...element.attributes}
        />
      {/if}

      {#if element.type === "simpletable"}
        <SimpleTable
          data={fields[element.id].value}
          bind:selected={fields[element.id].selected}
          rowClass={fields[element.id].rowClass}
          columns={fields[element.id].columns}
          on:select={exec_function(element.onSelect, {event: 'select', cardid: card.id, fieldid: element.id, value: fields[element.id].selected})}
          {...element.attributes}
        />
      {/if}

      {#if element.type === "simpleobject"}
        <SimpleObject
          data={fields[element.id].value}
          fields={fields[element.id].fields}
          {...element.attributes}
        />
      {/if}
    </div>
  {/each}
</div>
