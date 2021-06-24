<script>
  import { onMount } from 'svelte'
  import { debug, pagetitle } from '../stores.js'
  import api from '../api'
  import Card from '../components/Card.svelte'

  export let page
  $: if (debug) console.log('Page changed', page)

  $: {
    for (const id in page.cards) {
      const card = page.cards[id]
      for (const key in card.states) {
        card[key] = card.states[key](page.cards)
        if (debug) console.log('Page', page.id, 'updateState Card', card)
      }
    }
  }

  function exec_function(func, params) {
    if (!func) return
    if (debug) console.log('Page', page.id, 'exec_function', params, '\n  ', func)
    const func_returned = func(page.cards, params)
    Promise.resolve(func_returned).then(result => {
      // updateState()
    })
    .catch(error => console.log('Page', page.id, 'error', error))
    .finally(() => { page = page })
  }

  onMount(() => {
    if (debug) console.log('Page', page.id, 'mounted')
    $pagetitle = page.name
    if (page.id !== 'home') {
      api.log('Oldal', $pagetitle)
    }
    if (page.hasOwnProperty('onMount')) {
      exec_function(page.onMount, {event: 'mount', pageid: page.id})
    } else {
      // updateState()
    }
  })
</script>

<div class="Page w-full flex flex-row flex-wrap justify-evenly">
  {#each page.cardArray as card}
    <Card
      bind:card={page.cards[card.cardid].card}
      pagepart
      hidden={page.cards[card.cardid].hidden}
      on:event={(event) => {exec_function(card.onEvent, event.detail) }}
    />
  {/each}
</div>
