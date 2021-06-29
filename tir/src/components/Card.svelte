<script>
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'
  import { debug, pagetitle } from '../stores.js'
  import Field from './Field.svelte'

  export let card
  export let pagepart = false
  export let hidden = false
  const fields = card.fields  // not reactive

  $: if (debug) console.log('Card changed', card)

  const dispatch = createEventDispatcher()
  let disableFields = false

  $: {
    for (const id in card.fields) {
      const field = card.fields[id]
      for (const key in field.states) {
        field[key] = field.states[key](card.fields)
        if (debug) console.log('Card', card.id, 'updateState field', field)
      }
    }
  }

  function exec_function(params) {
    params.cardid = card.id
    if (!params.func) {
      if (params.event === 'change') card = card
      dispatch('event', params)
      return
    }
    if (debug) console.log('Card exec_function', params, '\n  ', params.func)
    disableFields = true
    const func_returned = params.func(card.fields, params)
    Promise.resolve(func_returned).then(result => {
      dispatch('event', params)
    })
    .catch(error => console.log('Card', card.id, 'error:', error))
    .finally(() => { disableFields = false; card = card })
  }

  onMount(() => {
    if (debug) console.log('Card', card.id, 'mounted')
    if (!pagepart) $pagetitle = card.name
    if (card.hasOwnProperty('onMount')) {
      exec_function({event: 'mount', func: card.onMount})
    }
  })
</script>

<div hidden={hidden} class="Card w-full max-w-sm p-2 mb-6 border shadow-xl">
  {#if card.name && pagepart}
    <div class="text-gray-500 text-lg py-1">{card.name}</div>
    <hr>
  {/if}
  {#if card.layout}
    {#each card.layout as element}
      {#if Array.isArray(element)}
        <div class="flex flex-row justify-between py-2">
          {#each element as fieldid}
            <Field
              field={card.fields[fieldid]}
              disabled={disableFields}
              on:event={(event) => { exec_function(event.detail) }}
            />
          {/each}
        </div>
      {:else}
        <Field
          field={card.fields[element]}
          disabled={disableFields}
          on:event={(event) => { exec_function(event.detail) }}
        />
      {/if}
    {/each}
  {:else}
    {#each card.elements as element}
      <Field
        field={element}
        disabled={disableFields}
        on:event={(event) => { exec_function(event.detail) }}
      />
    {/each}
  {/if}
</div>
