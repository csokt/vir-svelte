<script>
  import config from '../config'
  import Card from '../components/Card.svelte'

  export let params = {}

  let card = config.cards[params.id]

</script>

<main>
  <p class="bg-black text-white">Card components</p>

  <Card {card} data={card.data} />
</main>
