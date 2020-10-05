<script>
  import { onMount } from 'svelte'
  import Router from 'svelte-spa-router'
  import { push, pop } from 'svelte-spa-router'
  import 'smelte/src/tailwind.css'
  import Icon from 'smelte/src/components/Icon'
  import { Notifications } from 'smelte/src/components/Snackbar'
  import routes from './routes'
  import { debug, facingmode, pagetitle, userinfo } from './stores.js'
  import api from './config/api'

  onMount(async () => {
    if (debug) console.log('App.svelte mounted')
    $facingmode = (window.screen.width < 800) ? 'environment' : 'user'
    if (localStorage.szefo_api2_token) {
      $userinfo = await api.get({ url: '/private/account/info', expect: 'object' })
    }
    //// Production verzióban kell
    // window.oncontextmenu = function (event) {
    //   event.preventDefault()
    //   event.stopPropagation()
    //   return false
    // }
	})
</script>

<main>
  <div class="bg-primary-400 text-white flex flex-row justify-between items-center">
    <div class="text-2xl px-2" on:click={() => pop()}>&#9668;</div>
    <div class="text-lg">{$pagetitle}</div>
    <Icon class="px-2" on:click={() => push('/setup/login')}>settings</Icon>
  </div>
  <div class="App flex justify-center py-2">
    <Router {routes}/>
  </div>
  <Notifications />
</main>

<style>
  :global(i) {
    font-style: normal
  }
</style>
