<script>
  import { onMount } from 'svelte'
  import { debug, pagetitle } from '../stores.js'
  import Card from '../components/Card.svelte'

  export let page
  $: console.log('Page changed', page)

  $: {
    for (const id in page.cards) {
      if (page.cards.hasOwnProperty(id)) {
        const card = page.cards[id]
        for (const key in card.states) {
          if (card.states.hasOwnProperty(key)) {
            card[key] = card.states[key](page.cards)
            if (debug) console.log('Page', page.id, 'updateState Card', card)

          }
        }
      }
    }
  }

  function exec_function(func, message) {
    if (!func) return
    if (debug) console.log('Page', page.id, 'exec_function', message, '\n  ', func)
    const func_returned = func(page.cards)
    Promise.resolve(func_returned).then(result => {
      // updateState()
    })
    .catch(error => console.log('Page', page.id, 'error', error))
    .finally(() => { page = page })
  }

  onMount(() => {
    if (debug) console.log('Page', page.id, 'mounted')
    $pagetitle = page.name
    if (page.hasOwnProperty('onMount')) {
      exec_function(page.onMount, 'onMount')
    } else {
      // updateState()
    }
  })
</script>

<div class="Page w-full flex flex-row flex-wrap justify-evenly">
  {#each page.cardArray as card}
    <Card
      bind:card={page.cards[card.cardid].card}
      hidden={page.cards[card.cardid].hidden}
      on:event={(event) => {exec_function(card.onEvent, event.detail) }}
    />
  {/each}
</div>
