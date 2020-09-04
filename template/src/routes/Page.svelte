<script>
  import config from '../config'
  import Page from '../components/Page.svelte'

  export let params = {}

  let page = config.pages[params.id]

</script>

<main>
  <p class="bg-black text-white">Page components</p>
  <Page {page} />
</main>
