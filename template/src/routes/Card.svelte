<script>
  import config from '../config/index'
  import Card from '../components/Card.svelte'

  export let params = {}

  let card = config.cards[params.id]

</script>

<main>
  <Card {card} />
</main>
