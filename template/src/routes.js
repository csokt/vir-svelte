import Home from './routes/Home.svelte'
import Page from './routes/Page.svelte'
import Card from './routes/Card.svelte'
import NotFound from './routes/NotFound.svelte'

const routes = {
  '/': Home,
  '/menu1/:id': Page,
  '/menu2/:id': Page,
  '/menu3/:id': Page,
  '/page/:id': Page,
  '/setup/:id': Card,
  '/card/:id': Card,
  '*': NotFound,
  }

export default routes
