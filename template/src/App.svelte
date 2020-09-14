<script>
  import 'smelte/src/tailwind.css'
  import Router from 'svelte-spa-router'
  import {push, pop, replace} from 'svelte-spa-router'
  import routes from './routes'
  import Button from 'smelte/src/components/Button'
</script>

<main>
  <Button color='primary'   on:click={() => push('/')}>Home primary</Button>
  <Button color='secondary' on:click={() => push('/page1')}>Page 1 secondary</Button>
  <Button color='error'     on:click={() => push('/page2')}>Page 2 error</Button>
  <Button color='success'   on:click={() => push('/')}>Home success</Button>
  <Button color='alert'     on:click={() => push('/page1')}>Page 1 alert</Button>
  <Button color='blue'      on:click={() => push('/page2')}>Page 2 blue</Button>
  <Button color='dark'      on:click={() => push('/')}>Home dark</Button>
  <Router {routes}/>
</main>

<style>
  :global(i) {
    font-style: normal
  }
</style>
