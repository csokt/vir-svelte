<script>
  import config from '../config'
  import List from '../components/List.svelte'

  export let params = {}

  let list = config.lists[params.id]

</script>

<main>
  <p class="bg-black text-white">List components</p>

  <List {list} />
</main>
