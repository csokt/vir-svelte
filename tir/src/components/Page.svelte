<script>
  import { onMount } from 'svelte'
  import { pagetitle } from '../stores.js'
  import config from '../config/index'
  import Card from '../components/Card.svelte'

  export let page

  function updateState() {
    for (const id in page.cards) {
      if (page.cards.hasOwnProperty(id)) {
        const card = page.cards[id]
        for (const prop in card) {
          if (card.hasOwnProperty(prop)) {
            const splits = prop.split('State')
            if (splits.length > 1) {
              console.log('updateState', card)
              card[splits[0]] = card[prop](page.cards)
            }
          }
        }
      }
    }
  }

  function exec_function(func) {
    if (!func) return
    const func_returned = func(page.cards)
    Promise.resolve(func_returned).then(result => { updateState() })
    .catch(error => console.log(error))
    .finally(() => { page = page })
  }

  onMount(() => {
    $pagetitle = page.name
    if (page.hasOwnProperty('onMount')) {
      exec_function(page.onMount)
    } else {
      updateState()
    }
  })
</script>

<div class="Page w-full flex flex-row flex-wrap justify-evenly">
  {#each page.cardArray as card}
    <Card
      bind:card={page.cards[card.cardid].card}
      hidden={page.cards[card.cardid].hidden}
      on:change={exec_function(card.onChange)}
    />
  {/each}
</div>
    <!-- <Card card={card.card} /> -->
    <!-- <Card card={config.cards[card.cardid]} /> -->
