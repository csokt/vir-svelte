<script>
  import config from '../config'
  import Card from '../components/Card.svelte'

  export let page
  // let data = page.data
</script>

<main>
  {page.name}
	{#each page.cards as card}
    <div>
      <Card card={config.cards[card.cardid]} data={config.cards[card.cardid].data} />
    </div>
	{/each}
</main>
      <!-- <Card card={config.cards[card.cardid]} {data} /> -->
