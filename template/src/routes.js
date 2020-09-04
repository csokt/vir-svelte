import Home from './routes/Home.svelte'
import Page1 from './routes/Page1.svelte'
import Page2 from './routes/Page2.svelte'
import NotFound from './routes/NotFound.svelte'

const routes = {
  '/': Home,
  '/page1': Page1,
  '/page2': Page2,

  // Catch-all
  // This is optional, but if present it must be the last
  '*': NotFound,
  }

export default routes
