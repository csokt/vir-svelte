<script>
  import config from '../config'
  import Card from '../components/Card.svelte'

  export let page
</script>

<div>
  {page.name}
</div>
<div class="flex flex-row">
	{#each page.cards as card}
    <div>
      <Card card={config.cards[card.cardid]} />
    </div>
	{/each}
</div>
