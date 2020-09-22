<script>
  import 'smelte/src/tailwind.css'
  import Router from 'svelte-spa-router'
  import { pop } from 'svelte-spa-router'
  import routes from './routes'
  import { pagetitle } from './stores.js'

  let title

  pagetitle.subscribe(value => {
    title = value
  })
</script>

<main>
  <div class="bg-primary-400 text-white py-0">
    <span class="text-2xl px-2" on:click={() => pop()}>&#9668;</span>
    <span class="text-xl">{title}</span>
  </div>
  <div class="App flex justify-center py-2">
    <Router {routes}/>
  </div>
</main>
  <!-- <div class="App container p-2"> -->
  <!-- <div class="App container flex flex-row flex-wrap justify-evenly"> -->

<style>
  :global(i) {
    font-style: normal
  }
</style>
