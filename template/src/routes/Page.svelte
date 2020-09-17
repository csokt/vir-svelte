<script>
  import config from '../config/index'
  import Page from '../components/Page.svelte'

  export let params = {}

  let page = config.pages[params.id]

</script>

<main>
  <Page {page} />
</main>
