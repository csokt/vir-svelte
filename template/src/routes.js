import Home from './routes/Home.svelte'
import Page from './routes/Page.svelte'
import Card from './routes/Card.svelte'
import Page1 from './routes/Page1.svelte'
import Page2 from './routes/Page2.svelte'
import NotFound from './routes/NotFound.svelte'

const routes = {
  '/': Home,
  '/page/:id': Page,
  '/card/:id': Card,
  '/page1': Page1,
  '/page2': Page2,
  '*': NotFound,
  }

export default routes
