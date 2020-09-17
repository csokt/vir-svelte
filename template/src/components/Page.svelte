<script>
  import { onMount } from 'svelte'
  import { pagetitle } from '../stores.js'
  import config from '../config/index'
  import Card from '../components/Card.svelte'

  export let page

	onMount(() => {
    pagetitle.set(page.name)
	})
</script>

<div class="flex flex-row">
	{#each page.cards as card}
    <div>
      <Card card={config.cards[card.cardid]} />
    </div>
	{/each}
</div>
