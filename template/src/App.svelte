<script>
  import 'smelte/src/tailwind.css'
  import Router from 'svelte-spa-router'
  import {push, pop, replace} from 'svelte-spa-router'
  import routes from './routes'
  import Button from 'smelte/src/components/Button'
  import { pagetitle } from './stores.js'

  let title

  pagetitle.subscribe(value => {
    title = value
  })
</script>

<main>
  <div class="bg-primary-400 text-white p-1">
    <span class="text-xl" on:click={() => pop()}>&#11013;</span>
    <span class="text-lg pl-2">{title}</span>
  </div>
  <div class="App flex justify-center container p-2 mx-auto">
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
