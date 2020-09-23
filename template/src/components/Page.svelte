<script>
  import { onMount } from 'svelte'
  import { pagetitle } from '../stores.js'
  import config from '../config/index'
  import Card from '../components/Card.svelte'

  export let page

	onMount(() => {
    $pagetitle = page.name
	})
</script>

<div class="Page w-full flex flex-row flex-wrap justify-evenly">
	{#each page.cards as card}
    <Card card={config.cards[card.cardid]} />
	{/each}
</div>
