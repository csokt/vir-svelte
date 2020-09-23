<script>
  import { onMount } from 'svelte'
  import 'smelte/src/tailwind.css'
  import Router from 'svelte-spa-router'
  import { pop } from 'svelte-spa-router'
  import routes from './routes'
  import { pagetitle, userinfo } from './stores.js'
  import api from './config/api'

  onMount(async () => {
    if (localStorage.szefo_api2_token) {
      $userinfo = await api.get({ url: '/private/account/info', expect: 'object' })
    }
	})
</script>

<main>
  <div class="bg-primary-400 text-white py-0">
    <span class="text-2xl px-2" on:click={() => pop()}>&#9668;</span>
    <span class="text-xl">{$pagetitle}</span>
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
