<script>
  import config from '../config'
  import Card from '../components/Card.svelte'

  export let page
</script>

<main>
  {page.name}
	{#each page.cards as card}
    <div>
      <Card card={config.cards[card.cardid]} />
    </div>
	{/each}
</main>
