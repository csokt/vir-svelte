<script>
  import Tailwindcss from './Tailwindcss.svelte'
  // Import the router component
  // Normally, this would be import: `import Router from 'svelte-spa-router'`
  import Router from 'svelte-spa-router'
  // Import the "link" action and the methods to control history programmatically from the same module, as well as the location store
  import { link, push, pop, replace, location, querystring } from 'svelte-spa-router'

  // Import the "active" action
  // Normally, this would be import: `import active from 'svelte-spa-router/active'`
  import active from 'svelte-spa-router/active'

  // Import the list of routes
  import routes from './routes'

  // Contains logging information used by tests
  let logbox = ''

  // Handles the "conditionsFailed" event dispatched by the router when a component can't be loaded because one of its pre-condition failed
  function conditionsFailed(event) {
    // eslint-disable-next-line no-console
    console.error('Caught event conditionsFailed', event.detail)
    logbox += 'conditionsFailed - ' + JSON.stringify(event.detail) + '\n'

    // Replace the route
    replace('/wild/conditions-failed')
  }

  // Handles the "routeLoaded" event dispatched by the router after a route has been successfully loaded
  function routeLoaded(event) {
    // eslint-disable-next-line no-console
    console.info('Caught event routeLoaded', event.detail)
    logbox += 'routeLoaded - ' + JSON.stringify(event.detail) + '\n'
  }

</script>

<style>
  /* Style for "active" links; need to mark this :global because the router adds the class directly */
  :global(a.active) {
    color: crimson;
  }
</style>

<main>
  <!-- Navigation links, using the "link" action -->
  <!-- Also, use the "active" action to add the "active" CSS class when the URL matches -->
  <ul class="navigation-links">
    <li>
      <a href="/page/page1" use:link use:active>Page1</a>
    </li>
    <li>
      <a href="/card/card1" use:link use:active>Card1</a>
    </li>
    <li>
      <a href="/card/card2" use:link use:active>Card2</a>
    </li>
    <li>
      <a href="/button" use:link use:active>Button</a>
    </li>
    <li>
      <a href="/input" use:link use:active>Input</a>
    </li>
  </ul>

  <hr />
  <!-- Show the router -->
  <Router {routes} on:conditionsFailed={conditionsFailed} on:routeLoaded={routeLoaded} />
  <hr />

</main>
