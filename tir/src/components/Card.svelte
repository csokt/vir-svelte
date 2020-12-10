<script>
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'
  import { debug, pagetitle } from '../stores.js'
  import Field from './Field.svelte'

  export let card
  export let inpage = false
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
    if (!params.func) {
      card = card
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
    if (!inpage) $pagetitle = card.name
    if (card.hasOwnProperty('onMount')) {
      exec_function({event: 'mount', cardid: card.id, func: card.onMount})
    }
  })

</script>

<div hidden={hidden} class="Card w-full max-w-sm p-2 mb-6 border shadow-xl">
  {#if card.name && inpage}
    <div class="text-gray-500 text-lg py-1">{card.name}</div>
    <hr>
  {/if}
  {#if card.layout}
    {#each card.layout as element}
      {#if Array.isArray(element)}
        <div class="flex flex-row justify-start py-2">
          {#each element as fieldid}
            <div class="pr-4" hidden={card.fields[fieldid].hidden}>
              <Field
                field={card.fields[fieldid]}
                disabled={disableFields}
                on:event={(event) => { event.detail.cardid=card.id, exec_function(event.detail) }}
              />
            </div>
          {/each}
        </div>
      {:else}
        <div hidden={card.fields[element].hidden}>
          <Field
            field={card.fields[element]}
            disabled={disableFields}
            on:event={(event) => { event.detail.cardid=card.id, exec_function(event.detail) }}
          />
        </div>
      {/if}
    {/each}
  {:else}
  {#each card.elements as element}
    <div hidden={card.fields[element.id].hidden}>
      <Field
        field={element}
        disabled={disableFields}
        on:event={(event) => { event.detail.cardid=card.id, exec_function(event.detail) }}
      />
    </div>
  {/each}
  {/if}
</div>
