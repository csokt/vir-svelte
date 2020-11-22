<script>
  import { onMount } from 'svelte'
  import Router from 'svelte-spa-router'
  import { push, pop } from 'svelte-spa-router'
  // import 'smelte/src/tailwind.css'
  import { Icon, Snackbar } from 'svelte-mui'
	import Tailwindcss from './Tailwindcss.svelte'
  import routes from './routes'
  import { debug, snackbar, facingmode, pagetitle, userinfo } from './stores.js'
  import api from './api'

  let snackbarVisible = false
  function showSnackbar() {
    snackbarVisible = true
  }
  $: if ($snackbar.message) { showSnackbar() }

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

<Tailwindcss/>
<main>
  <div class="bg-blue-600 text-white flex flex-row justify-between items-center">
    <div class="text-2xl px-2" on:click={() => pop()}>&#9668;</div>
    <div class="text-lg">{$pagetitle}</div>
    <Icon class="px-2"
      path="M21.886 14.303c-1.259-2.181-0.502-4.976 1.691-6.246l-2.358-4.085c-0.674 0.395-1.457 0.622-2.293 0.622-2.52 0-4.563-2.057-4.563-4.594h-4.717c0.006 0.783-0.189 1.577-0.608 2.303-1.259 2.181-4.058 2.923-6.255 1.658l-2.358 4.085c0.679 0.386 1.267 0.951 1.685 1.675 1.257 2.178 0.504 4.967-1.681 6.24l2.358 4.085c0.671-0.391 1.451-0.615 2.283-0.615 2.512 0 4.55 2.044 4.563 4.569h4.717c-0.002-0.775 0.194-1.56 0.609-2.279 1.257-2.177 4.049-2.92 6.244-1.664l2.358-4.085c-0.675-0.386-1.258-0.949-1.674-1.669zM12 16.859c-2.684 0-4.859-2.176-4.859-4.859s2.176-4.859 4.859-4.859c2.684 0 4.859 2.176 4.859 4.859s-2.176 4.859-4.859 4.859z"
      on:click={() => push('/setup/login')}
    />
  </div>
  <div class="App flex justify-center py-2">
    <Router {routes}/>
  </div>
  <Snackbar
    bind:visible={snackbarVisible}
    bottom
    bg={$snackbar.bg}
    timeout={$snackbar.timeout}
  >
    {$snackbar.message}
  </Snackbar>
</main>

<style global>
  .simple-datatables-full-height {
    height: calc(100vh - 52px);
}
</style>
<!--
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
 -->
